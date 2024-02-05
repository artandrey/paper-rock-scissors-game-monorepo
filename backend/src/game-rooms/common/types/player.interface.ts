import { IUser } from 'src/user-session/common/user.interface';
import { PlayerState } from './player-state';
import { PlayerChoiseOption } from './player-choise-option';

export interface IPlayer {
  score: number;
  state: PlayerState;
  readonly user: IUser;
  choice: PlayerChoiseOption | null;
}
