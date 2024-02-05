import { SessionId } from 'src/user-session/common/session-id';
import { RoomId } from './game-room-id';
import { GameRoomState } from './game-room-state';
import { PlayerChoiseOption } from './player-choise-option';
import { IPlayer } from './player.interface';

export interface IGameRoom {
  readonly id: RoomId;
  readonly player1: IPlayer | null;
  readonly player2: IPlayer | null;
  readonly satate: GameRoomState;
  readonly winner: IPlayer | null;

  join(player: IPlayer): void;
  disconnect(id: SessionId): void;
  setPlayerChoice(playerId: SessionId, choice: PlayerChoiseOption): void;
  startNextRound(): void;
}
