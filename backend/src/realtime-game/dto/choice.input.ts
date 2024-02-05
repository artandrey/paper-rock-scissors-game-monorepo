import { IsEnum, IsUUID } from 'class-validator';
import { PlayerChoiseOption } from 'src/game-rooms/common/types/player-choise-option';

export class ChoiceInput {
  @IsUUID('4')
  roomId: string;

  @IsEnum(PlayerChoiseOption)
  choice: PlayerChoiseOption;
}
