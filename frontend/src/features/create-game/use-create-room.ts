import { useNavigate } from 'react-router-dom';
import { useGameClient } from '../../app/providers/game-client-provider/use-game-client';
import { useGameClientEventListener } from '../../app/providers/game-client-provider/use-game-client-event-listener';

export function useCreateRoom() {
    const navigate = useNavigate();
    const gameClient = useGameClient();
    useGameClientEventListener('roomCreated', (room) => {
        navigate('/app/room/' + room.id);
    });

    return () => {
        gameClient.createRoom();
    };
}
