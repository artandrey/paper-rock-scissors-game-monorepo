import { IsUUID } from 'class-validator';
import { RoomId } from 'src/game-rooms/common/types/game-room-id';

export class GetRoomInput {
  @IsUUID('4')
  roomId: RoomId;
}
