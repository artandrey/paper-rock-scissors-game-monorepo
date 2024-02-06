import { PlayerChoiseOption } from '../../../../shared/api/game-client/models';

export const iconsIds: Record<PlayerChoiseOption, string> = {
    [PlayerChoiseOption.SCISSORS]: 'scissors',
    [PlayerChoiseOption.PAPER]: 'paper',
    [PlayerChoiseOption.STONE]: 'rock',
};
