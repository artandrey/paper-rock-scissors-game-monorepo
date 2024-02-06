import React from 'react';
import { PlayerChoiseOption } from '../../../../shared/api/game-client/models';
import { iconsIds } from './config';

interface ItemIconProps extends React.ComponentProps<'svg'> {
    item: PlayerChoiseOption;
}

const ItemIcon: React.FC<ItemIconProps> = ({ item, ...svgProps }) => {
    return (
        <svg {...svgProps}>
            <use xlinkHref={'/game-items-icons.svg#' + iconsIds[item]} />
        </svg>
    );
};

export default ItemIcon;
