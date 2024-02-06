import { IGameClientOptions } from '../../../shared/api/game-client/client';

export const gameClientConfig: IGameClientOptions = {
    url: import.meta.env.VITE_WS_API_BASE_URL,
};
