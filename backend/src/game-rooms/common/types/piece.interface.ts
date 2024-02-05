import { PlayerChoiseOption } from './player-choise-option';

export interface IPiece {
  readonly value: PlayerChoiseOption;
  readonly weakneses: PlayerChoiseOption[];
}
