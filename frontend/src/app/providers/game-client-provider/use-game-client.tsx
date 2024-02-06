import { useContext } from 'react';
import { IGameClient } from '../../../shared/api/game-client/models';
import { GameClientContext } from './game-client-provider';

export function useGameClient(): IGameClient {
    const gameClientContext = useContext(GameClientContext);
    if (!gameClientContext) {
        throw new Error('Wrap your app inside GameClientProvider');
    }
    return gameClientContext.client;
}
