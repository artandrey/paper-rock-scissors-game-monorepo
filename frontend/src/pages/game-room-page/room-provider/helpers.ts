import {
    GameRoomState,
    IGameRoom,
} from '../../../shared/api/game-client/models';
import { CurrentPlayerState } from './models';

export function getCurrentPlayerState(
    login: string,
    gameRoom: IGameRoom
): CurrentPlayerState {
    if (gameRoom.state === GameRoomState.PLAYING) {
        return CurrentPlayerState.PLAYING;
    }
    if (gameRoom.state === GameRoomState.ROUND_FINISHED) {
        if (gameRoom.winner === null) return CurrentPlayerState.DRAW;
        if (gameRoom.winner.nickname === login) return CurrentPlayerState.WON;
        return CurrentPlayerState.LOST;
    }
    return CurrentPlayerState.PLAYING;
}
