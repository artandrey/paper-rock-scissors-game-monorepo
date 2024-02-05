import { IPiece } from 'src/game-rooms/common/types/piece.interface';
import { PlayerChoiseOption } from 'src/game-rooms/common/types/player-choise-option';

export class PieceEntity implements IPiece {
  constructor(
    readonly value: PlayerChoiseOption,
    readonly weakneses: PlayerChoiseOption[],
  ) {}
}
