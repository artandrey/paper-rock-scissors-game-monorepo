import { SessionId } from 'src/user-session/common/session-id';
import { RoomId } from './game-room-id';
import { IGameRoom } from './game-room.interface';

export interface IGameRoomStorage {
  createRoom(room: IGameRoom): Promise<IGameRoom>;
  findRoom(roomId: RoomId): Promise<IGameRoom>;
  updateRoom(room: IGameRoom): Promise<IGameRoom>;
  deleteRoom(roomId: RoomId): Promise<void>;
  findRoomByPlayerId(playerId: SessionId): Promise<IGameRoom>;
}
