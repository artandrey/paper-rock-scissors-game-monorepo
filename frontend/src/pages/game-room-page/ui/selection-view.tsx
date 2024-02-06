import { Card, CardBody, CardFooter } from '@nextui-org/react';
import React from 'react';
import { useRoom } from '../room-provider';
import {
    GameRoomState,
    PlayerChoiseOption,
    PlayerState,
} from '../../../shared/api/game-client/models';
import ItemIcon from './item-icon/item-icon';
import CurrentUserSatusView from './current-user-status-view';
import StartNewRoundButton from '../../../features/start-new-round/ui/start-new-round-button';

interface PlayerBadgeProps {
    nickname: string | null | undefined;
    status: PlayerState | null | undefined;
}

const PlayerBadge: React.FC<PlayerBadgeProps> = ({ nickname, status }) => {
    return (
        <div className="flex flex-col items-center">
            <span
                className={nickname ? 'text-foreground' : 'text-foreground-500'}
            >
                {nickname ?? '(Empty)'}
            </span>

            <span className="text-xs capitalize text-foreground-500">
                {status ?? 'Out of game'}
            </span>
        </div>
    );
};

interface SelectionItemProps {
    item: PlayerChoiseOption | null | undefined;
    nickname: string | null | undefined;
    status: PlayerState | null | undefined;
}

const SelectionItem: React.FC<SelectionItemProps> = ({
    item,
    nickname,
    status,
}) => {
    return (
        <Card className="w-32 h-32 lg:w-44 lg:h-44">
            <CardBody className="h-full justify-center items-center">
                {item ? (
                    <ItemIcon
                        className="w-full"
                        item={item}
                    />
                ) : (
                    <span className="text-2xl lg:text-6xl">?</span>
                )}
            </CardBody>
            <CardFooter className="flex justify-center">
                <PlayerBadge
                    nickname={nickname}
                    status={status}
                />
            </CardFooter>
        </Card>
    );
};

const SelectionView: React.FC = () => {
    const { room, currentPlayerState } = useRoom();

    return (
        <Card className="w-full lg:w-max mx-auto">
            <CardBody className="flex-row justify-center items-center gap-4 lg:gap-12">
                <SelectionItem
                    nickname={room?.player1?.nickname}
                    item={room?.player1Piece}
                    status={room?.player1?.state}
                />
                <CurrentUserSatusView status={currentPlayerState} />
                <SelectionItem
                    nickname={room?.player2?.nickname}
                    item={room?.player2Piece}
                    status={room?.player2?.state}
                />
            </CardBody>
            <CardFooter className="justify-center">
                {room?.state === GameRoomState.ROUND_FINISHED && (
                    <StartNewRoundButton />
                )}
            </CardFooter>
        </Card>
    );
};

export default SelectionView;
