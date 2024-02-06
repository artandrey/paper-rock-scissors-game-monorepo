import React, { useMemo } from 'react';
import { GameClient } from '../../../shared/api/game-client/client';
import { gameClientConfig } from './config';
import { GameClientProvider } from './game-client-provider';

export const withGameClientProvider =
    (Component: React.ComponentType) => () => {
        const gameClient = useMemo(() => new GameClient(gameClientConfig), []);

        return (
            <GameClientProvider client={gameClient}>
                <Component />
            </GameClientProvider>
        );
    };
