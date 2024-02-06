import { PlayerState } from 'src/game-rooms/common/types/player-state';
import { IPlayer } from 'src/game-rooms/common/types/player.interface';

export class PlayerOutput {
  nickname: string;
  score: number;
  state: PlayerState;

  constructor(playerEntity: IPlayer) {
    this.score = playerEntity.score;
    this.state = playerEntity.state;
    this.nickname = playerEntity.user.login;
  }
}
