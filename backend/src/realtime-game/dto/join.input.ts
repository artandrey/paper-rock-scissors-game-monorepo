import { IsUUID } from 'class-validator';
import { RoomId } from 'src/game-rooms/common/types/game-room-id';

export class JoinInput {
  @IsUUID('4')
  roomId: RoomId;
}
