import React from 'react';
import { CurrentPlayerState } from '../room-provider/models';

interface CurrentUserSatusViewProps {
    status: CurrentPlayerState;
}

const statusMessages: Record<CurrentPlayerState, string> = {
    [CurrentPlayerState.DRAW]: 'Draw',
    [CurrentPlayerState.LOST]: 'You loose',
    [CurrentPlayerState.PLAYING]: 'VS',
    [CurrentPlayerState.WON]: 'You won!',
};

const CurrentUserSatusView: React.FC<CurrentUserSatusViewProps> = ({
    status,
}) => {
    return (
        <span className="lg:min-w-32 text-center lg:text-4xl">
            {statusMessages[status]}
        </span>
    );
};

export default CurrentUserSatusView;
