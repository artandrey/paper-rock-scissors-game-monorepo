import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../store/user-store';
import { useGameClient } from '../../app/providers/game-client-provider/use-game-client';
import { useGameClientEventListener } from '../../app/providers/game-client-provider/use-game-client-event-listener';
import { useCallback, useMemo } from 'react';
import { useLoginStorage } from '../../shared/username-storage/use-username-store';

export interface ISignOutResult {
    signOut(): void;
}

export function useSignOut(): ISignOutResult {
    const navigate = useNavigate();
    const gameClient = useGameClient();
    const { removeUser } = useUserStore();
    const { saveLogin } = useLoginStorage();

    useGameClientEventListener('disconnected', () => {
        removeUser();
        saveLogin(null);
        navigate('/auth');
    });

    const signOut = useCallback(() => {
        gameClient.disconnect();
    }, [gameClient]);

    return useMemo(() => ({ signOut }), [signOut]);
}
