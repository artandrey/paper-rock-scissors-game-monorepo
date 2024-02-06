import { useNavigate } from 'react-router-dom';
import { IAuthenticationCredentials } from '../../shared/api/game-client/models';
import { useGameClient } from '../../app/providers/game-client-provider/use-game-client';
import { useGameClientEventListener } from '../../app/providers/game-client-provider/use-game-client-event-listener';
import { AUTHORISED_PATH } from '../../routes/routing';
import { useUserStore } from '../../store/user-store';
import { useCallback, useMemo } from 'react';
import { useLoginStorage } from '../../shared/username-storage/use-username-store';

interface ISignUpResult {
    signUp(cridentials: IAuthenticationCredentials): void;
}

export function useSignUp(): ISignUpResult {
    const navigate = useNavigate();
    const gameClient = useGameClient();
    const { setUser } = useUserStore();
    const { saveLogin } = useLoginStorage();

    useGameClientEventListener('connected', (cridentials) => {
        setUser(cridentials.login);
        navigate(AUTHORISED_PATH);
        saveLogin(cridentials.login);
    });

    const signUp = useCallback(
        (cridentials: IAuthenticationCredentials) => {
            gameClient.connect(cridentials);
        },
        [gameClient]
    );

    return useMemo(() => ({ signUp }), [signUp]);
}
