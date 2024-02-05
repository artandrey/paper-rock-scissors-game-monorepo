import { GameRoomOutput } from 'src/game-rooms/dto/game-room.output/game-room.output';
import { RoomId } from './game-room-id';
import { PlayerChoiseOption } from './player-choise-option';
import { IUser } from 'src/user-session/common/user.interface';

export interface IGameRoomManager {
  createRoom(creator: IUser): Promise<GameRoomOutput>;
  getRoomById(roomId: RoomId): Promise<GameRoomOutput>;
  addUserToRoom(roomId: RoomId, user: IUser): Promise<GameRoomOutput>;
  removeUserFromRoom(roomId: RoomId, user: IUser): Promise<GameRoomOutput>;
  makeChoice(
    roomId: RoomId,
    user: IUser,
    choice: PlayerChoiseOption,
  ): Promise<GameRoomOutput>;
  disconnectUser(user: IUser): Promise<GameRoomOutput>;
  startNewRound(roomId: RoomId): Promise<GameRoomOutput>;
}
