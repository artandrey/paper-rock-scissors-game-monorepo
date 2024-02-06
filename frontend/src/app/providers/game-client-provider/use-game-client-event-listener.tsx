import { useEffect, useLayoutEffect, useRef } from 'react';
import { useGameClient } from './use-game-client';
import { GameClientListeners } from '../../../shared/api/game-client/models';

export const useGameClientEventListener = <K extends keyof GameClientListeners>(
    event: K,
    callback: GameClientListeners[K]
) => {
    const gameClient = useGameClient();

    const callbackRef = useRef<GameClientListeners[K]>(callback);

    useLayoutEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    useEffect(() => {
        const callback = callbackRef.current;

        gameClient.on(event, callback);

        return () => {
            gameClient.off(event, callback);
        };
    }, [event, gameClient]);
};
