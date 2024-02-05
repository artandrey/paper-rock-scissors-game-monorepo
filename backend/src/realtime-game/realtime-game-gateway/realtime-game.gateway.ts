import {
  BadRequestException,
  HttpException,
  Inject,
  UseFilters,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
  WsResponse,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { IGameRoomManager } from 'src/game-rooms/common/types/game-room-manager.interface';
import { AuthorizedSocket } from '../interfaces/authorized-socket.interface';
import { JoinInput } from '../dto/join.input';
import { GameInputEvent } from '../common/types/game-input-event';
import { GameRoomOutput } from 'src/game-rooms/dto/game-room.output/game-room.output';
import { GameOutputEvent } from '../common/types/game-output-event';
import { ChoiceInput } from '../dto/choice.input';
import { WsSessionAuthGuard } from 'src/auth/guards/ws-session-auth/ws-session-auth.guard';
import { IAuthManager } from 'src/auth/common/auth-manager.interface';
import { WebsocketExceptionsFilter } from '../helpers/websocket-exception-filter';
import { plainToInstance } from 'class-transformer';
import { SignInInput } from '../dto/sign-in.input';

@UsePipes(
  new ValidationPipe({
    exceptionFactory: () => new WsException('Bad request.'),
  }),
)
@WebSocketGateway()
@UseFilters(WebsocketExceptionsFilter)
export class GameRoomsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server = new Server();

  constructor(
    @Inject('Room-Manager') private readonly _roomService: IGameRoomManager,
    @Inject('Auth-Manager') private readonly _authManager: IAuthManager,
  ) {}

  @UseGuards(WsSessionAuthGuard)
  @SubscribeMessage(GameInputEvent.CREATE)
  async handleCreate(
    @ConnectedSocket() client: AuthorizedSocket,
  ): Promise<WsResponse<GameRoomOutput>> {
    const room = await this._roomService.createRoom(client.handshake.user);
    await client.join(room.id);

    return {
      event: GameOutputEvent.CREATED,
      data: room,
    };
  }

  @UseGuards(WsSessionAuthGuard)
  @SubscribeMessage(GameInputEvent.JOIN)
  async handleJoin(
    @ConnectedSocket() client: AuthorizedSocket,
    @MessageBody() body: JoinInput,
  ): Promise<WsResponse<GameRoomOutput>> {
    await this._roomService.addUserToRoom(body.roomId, client.handshake.user);
    const room = await this._roomService.getRoomById(body.roomId);
    this.server.to(room.id).emit(GameOutputEvent.ROOM_UPDATED, room);
    await client.join(room.id);
    return {
      event: GameOutputEvent.JOINED,
      data: room,
    };
  }

  @UseGuards(WsSessionAuthGuard)
  @SubscribeMessage(GameInputEvent.MAKE_CHOICE)
  async handlePlayerChoice(
    @ConnectedSocket() client: AuthorizedSocket,
    @MessageBody() body: ChoiceInput,
  ) {
    const updatedRoom = await this._roomService.makeChoice(
      body.roomId,
      client.handshake.user,
      body.choice,
    );

    this.server
      .to(updatedRoom.id)
      .emit(GameOutputEvent.ROOM_UPDATED, updatedRoom);
  }

  @UseGuards(WsSessionAuthGuard)
  @SubscribeMessage(GameInputEvent.LEAVE)
  async handlePlayerLeave(@ConnectedSocket() client: AuthorizedSocket) {
    const updatedRoom = await this._roomService.disconnectUser(
      client.handshake.user,
    );

    this.server
      .to(updatedRoom.id)
      .emit(GameOutputEvent.ROOM_UPDATED, updatedRoom);
  }

  async handleConnection(client: Socket) {
    try {
      const cridentials = plainToInstance(
        SignInInput,
        client.handshake.auth.login,
      );
      if (!cridentials) throw new BadRequestException('Invalid data');

      await this._authManager.signIn({
        connectionId: client.id,
        login: cridentials.login,
      });
    } catch (error) {
      if (error instanceof WsException || error instanceof HttpException) {
        client.emit('exception', { type: 'error', message: error.message });
      } else {
        console.error(error);
      }
      client.disconnect();
    }
  }

  async handleDisconnect(client: Socket) {
    try {
      await this._authManager.signOut({
        connectionId: client.id,
      });
    } catch (error) {
      console.error(error);
    }
  }
}
