import { useNavigate } from 'react-router-dom';
import { useGameClient } from '../../app/providers/game-client-provider/use-game-client';
import { useGameClientEventListener } from '../../app/providers/game-client-provider/use-game-client-event-listener';

export function useJoinRoom() {
    const gameClient = useGameClient();
    const navigate = useNavigate();

    useGameClientEventListener('playerJoined', (room) => {
        navigate('/app/room/' + room.id);
    });

    return (roomId: string) => {
        gameClient.joinRoom(roomId);
    };
}
