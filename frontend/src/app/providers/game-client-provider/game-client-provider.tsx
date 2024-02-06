import React, { PropsWithChildren, createContext, useMemo } from 'react';
import { IGameClient } from '../../../shared/api/game-client/models';

interface IGameClientContextResult {
    client: IGameClient;
}

export const GameClientContext = createContext<IGameClientContextResult | null>(
    null
);

interface GameClientProviderProps extends PropsWithChildren {
    client: IGameClient;
}

export const GameClientProvider: React.FC<GameClientProviderProps> = ({
    children,
    client,
}) => {
    const value = useMemo(
        () => ({
            client,
        }),
        [client]
    );

    return (
        <GameClientContext.Provider value={value}>
            {children}
        </GameClientContext.Provider>
    );
};
