import { RoomId } from 'src/game-rooms/common/types/game-room-id';
import { GameRoomState } from 'src/game-rooms/common/types/game-room-state';
import { IGameRoom } from 'src/game-rooms/common/types/game-room.interface';
import { IPiece } from 'src/game-rooms/common/types/piece.interface';
import { PlayerChoiseOption } from 'src/game-rooms/common/types/player-choise-option';
import { PlayerState } from 'src/game-rooms/common/types/player-state';
import { IPlayer } from 'src/game-rooms/common/types/player.interface';
import { PieceEntity } from 'src/game-rooms/entities/piece.entity/piece.entity';
import { SessionId } from 'src/user-session/common/session-id';
import { v4 as uuidv4 } from 'uuid';

export class GameRoomArgregate implements IGameRoom {
  private _players: [IPlayer | null, IPlayer | null] = [null, null];
  private _id: RoomId = uuidv4();
  private _state: GameRoomState = GameRoomState.PENDING;
  private _winner: IPlayer | null;
  private readonly _availableChoises: readonly IPiece[] = [
    new PieceEntity(PlayerChoiseOption.PAPER, [PlayerChoiseOption.SCISSORS]),
    new PieceEntity(PlayerChoiseOption.SCISSORS, [PlayerChoiseOption.STONE]),
    new PieceEntity(PlayerChoiseOption.STONE, [PlayerChoiseOption.PAPER]),
  ];

  startNextRound(): void {
    this._state = GameRoomState.PLAYING;
    this._players.forEach((player) => {
      if (player) {
        player.choice = null;
      }
    });
    this._winner = null;
  }

  join(player: IPlayer): void {
    if (this.player1 === null) {
      this.player1 = player;
    } else if (this.player2 === null) {
      this.player2 = player;
    }
    if (this.player1 && this.player2) {
      this._state = GameRoomState.PLAYING;
    }
  }

  disconnect(id: SessionId): void {
    this._players = this._players.map((player) => {
      if (!player) return null;

      if (player.user.id === id) {
        return null;
      }
      player.score = 0;
      player.state = PlayerState.IN_GAME;
      return player;
    }) as [IPlayer, IPlayer];
    this._state = GameRoomState.PENDING;
  }

  setPlayerChoice(playerId: SessionId, choice: PlayerChoiseOption): void {
    const player = this._players.find((player) => player.user.id === playerId);
    player.choice = choice;
    player.state = PlayerState.MADE_MOVE;
    if (this.state !== GameRoomState.PLAYING) return;
    if (this.player1.choice === null || this.player2.choice === null) return;
    this.calculateGameResult();
  }

  isPlayerInRoom(id: string): boolean {
    return !!this._players.find((player) => player.user.id === id);
  }

  get id(): string {
    return this._id;
  }
  get player1(): IPlayer | null {
    return this._players[0];
  }
  private set player1(player: IPlayer) {
    this._players[0] = player;
  }
  get player2(): IPlayer | null {
    return this._players[1];
  }
  private set player2(player: IPlayer) {
    this._players[1] = player;
  }
  get state(): GameRoomState {
    return this._state;
  }
  get winner(): IPlayer | null {
    return this._winner;
  }

  private getPieceByValue(value: PlayerChoiseOption) {
    return this._availableChoises.find((choice) => choice.value === value);
  }

  private calculateGameResult() {
    this._state = GameRoomState.ROUND_FINISHED;
    const gameResult = this.comparePieces(
      this.getPieceByValue(this.player1.choice),
      this.getPieceByValue(this.player2.choice),
    );
    if (gameResult === 0) return;
    if (gameResult > 0) {
      this._winner = this.player1;
    } else {
      this._winner = this.player2;
    }
    this._winner.score++;
  }

  private comparePieces(pieceA: IPiece, pieceB: IPiece): number {
    if (pieceA.value === pieceB.value) return 0;
    if (pieceA.weakneses.includes(pieceB.value)) return -1;
    return 1;
  }
}
