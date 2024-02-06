import {
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Spacer,
} from '@nextui-org/react';
import React from 'react';
import SelectionView from '../pages/game-room-page/ui/selection-view';
import Scoreboard from '../pages/game-room-page/ui/soreboard';
import { GameKeyboard } from '../pages/game-room-page/ui/game-keyboard';
import { useRoom } from '../pages/game-room-page/room-provider';
import LeaveRoomButton from '../pages/game-room-page/ui/leave-room-button';
import { GameRoomState } from '../shared/api/game-client/models';
import { JoinCodeBadge } from '../pages/game-room-page/ui/join-code-badge';

const GameRoomWidget: React.FC = () => {
    const { makeMove, room } = useRoom();

    const diableKeyboard = room?.state !== GameRoomState.PLAYING;
    const isPending = room?.state === GameRoomState.PENDING;

    return (
        <Card>
            <CardHeader className="justify-center">
                {isPending && <JoinCodeBadge code={room?.id} />}
            </CardHeader>
            <CardBody>
                <Scoreboard />
                <Spacer y={5} />
                <SelectionView />
                <Spacer y={10} />
                <GameKeyboard
                    onSelect={makeMove}
                    disabled={diableKeyboard}
                />
            </CardBody>
            <CardFooter className="justify-center">
                <LeaveRoomButton />
            </CardFooter>
        </Card>
    );
};

export default GameRoomWidget;
