import { PropsWithChildren, createContext, useEffect, useState } from 'react';
import {
    IGameRoom,
    PlayerChoiseOption,
} from '../../../shared/api/game-client/models';
import { useGameClient } from '../../../app/providers/game-client-provider/use-game-client';
import { useGameClientEventListener } from '../../../app/providers/game-client-provider/use-game-client-event-listener';
import { useUserStore } from '../../../store/user-store';
import { useNavigate } from 'react-router-dom';
import { AUTHORISED_PATH } from '../../../routes/routing';
import { getCurrentPlayerState } from './helpers';
import { CurrentPlayerState } from './models';
import { useRoomCleanup } from './use-room-cleanup';

export interface RoomProviderProps extends PropsWithChildren {
    roomId: string;
}

export interface IRoomControls {
    room: IGameRoom | null;
    currentPlayerState: CurrentPlayerState;
    makeMove(choice: PlayerChoiseOption): void;
    leaveRoom(): void;
    startNewRound(): void;
}

export const RoomContext = createContext<IRoomControls | undefined>(undefined);

export const RoomProvider: React.FC<RoomProviderProps> = ({
    roomId,
    children,
}) => {
    const gameClient = useGameClient();
    const navigate = useNavigate();
    const [room, setRoom] = useState<IGameRoom | null>(null);
    const { nickname } = useUserStore();

    const currentPlayerState =
        nickname && room
            ? getCurrentPlayerState(nickname, room)
            : CurrentPlayerState.PLAYING;

    const leaveRoom = () => {
        gameClient.leaveRoom(roomId);
        navigate(AUTHORISED_PATH);
    };

    const makeMove = (choice: PlayerChoiseOption) => {
        gameClient.makeChoice(choice, roomId);
    };

    const startNewRound = () => {
        gameClient.startNewRound();
    };

    useEffect(() => {
        gameClient.getRoom(roomId);
    }, [gameClient, roomId]);

    useGameClientEventListener('roomReceived', (receivedRoom: IGameRoom) => {
        setRoom(receivedRoom);
    });

    useGameClientEventListener('roomUpdated', (receivedRoom: IGameRoom) => {
        setRoom(receivedRoom);
    });

    useRoomCleanup(leaveRoom);

    return (
        <RoomContext.Provider
            value={{
                room,
                makeMove,
                leaveRoom,
                startNewRound,
                currentPlayerState,
            }}
        >
            {children}
        </RoomContext.Provider>
    );
};
