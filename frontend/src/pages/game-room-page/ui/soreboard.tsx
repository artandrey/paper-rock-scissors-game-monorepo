import React from 'react';
import { useRoom } from '../room-provider';
import { Card, CardBody, CardHeader } from '@nextui-org/react';

interface PlayerScoreProps {
    score: number | null | undefined;
    nickname: string | null | undefined;
}

const PlayerScoreView: React.FC<PlayerScoreProps> = ({ nickname, score }) => {
    return (
        <Card className="min-w-24 lg:min-w-40">
            <CardHeader>
                <span>{nickname}:</span>
            </CardHeader>
            <CardBody>
                <span className="text-3xl">{score ?? 0}</span>
            </CardBody>
        </Card>
    );
};

const Scoreboard: React.FC = () => {
    const { room } = useRoom();

    return (
        <Card className="w-full lg:w-max lg:mx-auto">
            <CardBody className="flex-row justify-between lg:justify-center gap-4 lg:gap-64">
                <PlayerScoreView
                    nickname={room?.player1?.nickname}
                    score={room?.player1?.score}
                />
                <PlayerScoreView
                    nickname={room?.player2?.nickname}
                    score={room?.player2?.score}
                />
            </CardBody>
        </Card>
    );
};

export default Scoreboard;
