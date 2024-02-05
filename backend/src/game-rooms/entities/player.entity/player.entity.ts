import { PlayerChoiseOption } from 'src/game-rooms/common/types/player-choise-option';
import { PlayerState } from 'src/game-rooms/common/types/player-state';
import { IPlayer } from 'src/game-rooms/common/types/player.interface';
import { IUser } from 'src/user-session/common/user.interface';

export class PlayerEntity implements IPlayer {
  score: number = 0;
  state: PlayerState = PlayerState.IN_GAME;
  choice: PlayerChoiseOption = null;
  constructor(readonly user: IUser) {}
}
