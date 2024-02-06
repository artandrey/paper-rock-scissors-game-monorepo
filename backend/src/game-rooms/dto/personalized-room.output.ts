import { UserSessionOutput } from 'src/user-session/dto/user-session.output';
import { GameRoomOutput } from './game-room.output';
import { IGameRoom } from '../common/types/game-room.interface';
import { IUserSession } from 'src/user-session/common/user-session.interface';

export class PersonalizedRoomOutput {
  session: UserSessionOutput;
  room: GameRoomOutput;

  constructor(roomAggregate: IGameRoom, session: IUserSession) {
    this.room = new GameRoomOutput(roomAggregate, session.id);
    this.session = session;
  }
}
