import { RoomId } from 'src/game-rooms/common/types/game-room-id';
import { PlayerOutput } from './player.output';
import { GameRoomState } from 'src/game-rooms/common/types/game-room-state';
import { IGameRoom } from 'src/game-rooms/common/types/game-room.interface';
import { PlayerChoiseOption } from 'src/game-rooms/common/types/player-choise-option';

export class GameRoomOutput {
  id: RoomId;
  player1: PlayerOutput | null = null;
  player2: PlayerOutput | null = null;
  state: GameRoomState;
  winner: PlayerOutput | null = null;
  player1Piece: PlayerChoiseOption | null = null;
  player2Piece: PlayerChoiseOption | null = null;

  constructor(gameRoomAgregate: IGameRoom, personalUserId?: string) {
    this.id = gameRoomAgregate.id;

    this.state = gameRoomAgregate.state;
    if (gameRoomAgregate.player1) {
      this.player1 = new PlayerOutput(gameRoomAgregate.player1);
      if (gameRoomAgregate.player1.user.id === personalUserId) {
        this.player1Piece = gameRoomAgregate.player1.choice;
      }
    }
    if (gameRoomAgregate.player2) {
      this.player2 = new PlayerOutput(gameRoomAgregate.player2);
      if (gameRoomAgregate.player2.user.id === personalUserId) {
        this.player2Piece = gameRoomAgregate.player2.choice;
      }
    }
    if (gameRoomAgregate.state === GameRoomState.ROUND_FINISHED) {
      this.player1Piece = gameRoomAgregate.player1.choice;
      this.player2Piece = gameRoomAgregate.player2.choice;
    }
    if (gameRoomAgregate.winner) {
      this.winner = new PlayerOutput(gameRoomAgregate.winner);
    }
  }
}
