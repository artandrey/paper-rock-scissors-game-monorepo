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
import { GameRoomOutput } from 'src/game-rooms/dto/game-room.output';
import { GameOutputEvent } from '../common/types/game-output-event';
import { ChoiceInput } from '../dto/choice.input';
import { WsSessionAuthGuard } from 'src/auth/guards/ws-session-auth/ws-session-auth.guard';
import { IAuthManager } from 'src/auth/common/auth-manager.interface';
import { WebsocketExceptionsFilter } from '../helpers/websocket-exception-filter';
import { plainToInstance } from 'class-transformer';
import { SignInInput } from '../dto/sign-in.input';
import { GetRoomInput } from '../dto/get-room.input';

@UsePipes(
  new ValidationPipe({
    exceptionFactory: () => new WsException('Bad request.'),
  }),
)
@WebSocketGateway({
  cors: '*',
})
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
    const personalizedUpdatedRooms = await this._roomService.makeChoice(
      body.roomId,
      client.handshake.user,
      body.choice,
    );

    personalizedUpdatedRooms.forEach((personalizedRoom) => {
      this.getClient(personalizedRoom.session.connectionId).emit(
        GameOutputEvent.ROOM_UPDATED,
        personalizedRoom.room,
      );
    });
  }

  @UseGuards(WsSessionAuthGuard)
  @SubscribeMessage(GameInputEvent.LEAVE)
  async handlePlayerLeave(@ConnectedSocket() client: AuthorizedSocket) {
    const updatedRoom = await this._roomService.disconnectUser(
      client.handshake.user,
    );

    client.leave(updatedRoom.id);

    this.server
      .to(updatedRoom.id)
      .emit(GameOutputEvent.ROOM_UPDATED, updatedRoom);
  }

  @UseGuards(WsSessionAuthGuard)
  @SubscribeMessage(GameInputEvent.NEW_GAME)
  async handleNewGameRequest(
    @ConnectedSocket() client: AuthorizedSocket,
  ): Promise<WsResponse<GameRoomOutput>> {
    const restartedRoom = await this._roomService.startNewRound(
      client.handshake.user,
    );
    return {
      event: GameOutputEvent.ROOM_UPDATED,
      data: restartedRoom,
    };
  }

  @UseGuards(WsSessionAuthGuard)
  @SubscribeMessage(GameInputEvent.GET_ROOM)
  async handleRoomDataRequest(
    @ConnectedSocket() client: AuthorizedSocket,
    @MessageBody() body: GetRoomInput,
  ): Promise<WsResponse<GameRoomOutput>> {
    const roomData = await this._roomService.getRoomData(
      body.roomId,
      client.handshake.user,
    );
    return {
      event: GameOutputEvent.ROOM_DATA,
      data: roomData,
    };
  }

  async handleConnection(client: Socket) {
    try {
      const cridentials = plainToInstance(SignInInput, client.handshake.auth);

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

  private getClient(id: string): AuthorizedSocket {
    return this.server.sockets.sockets.get(id) as AuthorizedSocket;
  }
}
