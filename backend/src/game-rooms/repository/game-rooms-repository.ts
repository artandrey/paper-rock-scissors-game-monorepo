import { Injectable } from '@nestjs/common';
import { IGameRoomStorage } from '../common/types/game-room-storage.interface';
import { IGameRoom } from '../common/types/game-room.interface';
import { RoomId } from '../common/types/game-room-id';
import { SessionId } from 'src/user-session/common/session-id';

@Injectable()
export class GameRoomInMemoryRepository implements IGameRoomStorage {
  private readonly store: Map<RoomId, IGameRoom> = new Map();

  async createRoom(room: IGameRoom): Promise<IGameRoom> {
    this.store.set(room.id, room);

    return room;
  }
  async findRoom(roomId: string): Promise<IGameRoom> {
    return this.store.get(roomId);
  }
  async updateRoom(room: IGameRoom): Promise<IGameRoom> {
    this.store.set(room.id, room);
    return room;
  }
  async deleteRoom(roomId: string): Promise<void> {
    this.store.delete(roomId);
  }
  async findRoomByPlayerId(playerId: SessionId): Promise<IGameRoom> {
    return Array.from(this.store.values()).find(
      (room) =>
        room.player1?.user.id === playerId ||
        room.player2?.user.id === playerId,
    );
  }
}
