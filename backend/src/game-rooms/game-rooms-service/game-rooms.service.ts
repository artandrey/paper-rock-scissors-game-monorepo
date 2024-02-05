import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IGameRoomStorage } from '../common/types/game-room-storage.interface';
import { GameRoomOutput } from '../dto/game-room.output/game-room.output';
import { RoomId } from '../common/types/game-room-id';
import { GameRoomArgregate } from '../agregate/game-room.argregate/game-room.argregate';
import { IUser } from 'src/user-session/common/user.interface';
import { PlayerEntity } from '../entities/player.entity/player.entity';
import { PlayerChoiseOption } from '../common/types/player-choise-option';
import { IGameRoomManager } from '../common/types/game-room-manager.interface';
import { IGameRoom } from '../common/types/game-room.interface';
import { GameRoomState } from '../common/types/game-room-state';

@Injectable()
export class GameRoomsService implements IGameRoomManager {
  constructor(
    @Inject('Room-Repository')
    private readonly _roomRepository: IGameRoomStorage,
  ) {}

  async createRoom(creator: IUser): Promise<GameRoomOutput> {
    const isUserInRoom = await this.isUserInRoom(creator);
    if (isUserInRoom) {
      throw new BadRequestException('You are already in the room');
    }
    const gameRoomAgregate = new GameRoomArgregate();
    gameRoomAgregate.join(new PlayerEntity(creator));

    const createdGameRoom = await this._roomRepository.createRoom(
      gameRoomAgregate,
    );

    return new GameRoomOutput(createdGameRoom);
  }

  async getRoomById(roomId: RoomId): Promise<GameRoomOutput> {
    const gameRoomAgregate = await this._roomRepository.findRoom(roomId);
    return new GameRoomOutput(gameRoomAgregate);
  }

  async addUserToRoom(roomId: RoomId, user: IUser): Promise<GameRoomOutput> {
    const isUserInRoom = await this.isUserInRoom(user);
    if (isUserInRoom) {
      throw new BadRequestException('User is already in the room');
    }
    const gameRoomAgregate = await this.getRoomAgregate(roomId);
    gameRoomAgregate.join(new PlayerEntity(user));
    const updatedRoom = await this._roomRepository.updateRoom(gameRoomAgregate);
    return new GameRoomOutput(updatedRoom);
  }

  async removeUserFromRoom(
    roomId: RoomId,
    user: IUser,
  ): Promise<GameRoomOutput> {
    const gameRoomAgregate = await this.getRoomAgregate(roomId);
    gameRoomAgregate.disconnect(user.id);
    if (!gameRoomAgregate.player1 && !gameRoomAgregate.player2) {
      await this._roomRepository.deleteRoom(gameRoomAgregate.id);
      return new GameRoomOutput(gameRoomAgregate);
    }
    const updatedRoom = await this._roomRepository.updateRoom(gameRoomAgregate);
    return new GameRoomOutput(updatedRoom);
  }

  async disconnectUser(user: IUser): Promise<GameRoomOutput> {
    const gameRoomAgregate = await this._roomRepository.findRoomByPlayerId(
      user.id,
    );
    const updatedRoom = await this.removeUserFromRoom(
      gameRoomAgregate.id,
      user,
    );
    return updatedRoom;
  }

  async makeChoice(roomId: RoomId, user: IUser, choice: PlayerChoiseOption) {
    const gameRoomAgregate = await this.getRoomAgregate(roomId);
    if (gameRoomAgregate.satate !== GameRoomState.PLAYING) {
      throw new BadRequestException('Game in this room in not started yet');
    }
    gameRoomAgregate.setPlayerChoice(user.id, choice);
    const updatedRoom = await this._roomRepository.updateRoom(gameRoomAgregate);
    return new GameRoomOutput(updatedRoom);
  }

  async isUserInRoom(user: IUser): Promise<boolean> {
    const room = await this._roomRepository.findRoomByPlayerId(user.id);
    return !!room;
  }

  async startNewRound(roomId: RoomId): Promise<GameRoomOutput> {
    const gameRoomAgregate = await this.getRoomAgregate(roomId);
    gameRoomAgregate.startNextRound();
    const updatedGame = await this._roomRepository.updateRoom(gameRoomAgregate);
    return new GameRoomOutput(updatedGame);
  }

  private async getRoomAgregate(roomId: RoomId): Promise<IGameRoom> {
    const gameRoomAgregate = await this._roomRepository.findRoom(roomId);
    if (!gameRoomAgregate) {
      throw new BadRequestException('This room was not found');
    }
    return gameRoomAgregate;
  }
}
