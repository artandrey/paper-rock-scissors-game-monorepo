import { Button } from '@nextui-org/react';
import React from 'react';
import { useRoom } from '../../../pages/game-room-page/room-provider';

const StartNewRoundButton: React.FC = () => {
    const { startNewRound } = useRoom();
    return (
        <Button
            size="lg"
            onClick={startNewRound}
            color="primary"
        >
            Start new round
        </Button>
    );
};

export default StartNewRoundButton;
