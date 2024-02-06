import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { RoomProvider } from './room-provider/room-provider';
import GameRoomWidget from '../../widgets/game-room-widget';

interface GameRoomPageProps {}

export const GameRoomPage: React.FC<GameRoomPageProps> = ({}) => {
    const { roomId } = useParams();

    if (!roomId) {
        return <Navigate to={'/'} />;
    }

    return (
        <RoomProvider roomId={roomId}>
            <GameRoomWidget />
        </RoomProvider>
    );
};
