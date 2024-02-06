import { z } from 'zod';
import { IWithListeners } from './with-listeners';

export enum PlayerState {
    IN_GAME = 'in-game',
    MADE_MOVE = 'made-move',
}

export enum GameRoomState {
    PENDING = 'pending',
    PLAYING = 'playing',
    ROUND_FINISHED = 'round-finished',
}

export interface IPlayerOutput {
    nickname: string;
    score: number;
    state: PlayerState;
}

export enum PlayerChoiseOption {
    STONE = 'stone',
    SCISSORS = 'scissors',
    PAPER = 'paper',
}

export interface IGameRoom {
    id: string;
    player1: IPlayerOutput | null;
    player2: IPlayerOutput | null;
    state: GameRoomState;
    winner: IPlayerOutput | null;
    player1Piece: PlayerChoiseOption | null;
    player2Piece: PlayerChoiseOption | null;
}

export interface IAuthenticationCredentials {
    login: string;
}

export enum GameInputEvent {
    CREATE = 'create',
    JOIN = 'join',
    MAKE_CHOICE = 'make-choice',
    LEAVE = 'leave',
    GET_ROOM = 'get-room',
    NEW_GAME = 'new-game',
}

export enum GameOutputEvent {
    CREATED = 'created',
    ROOM_UPDATED = 'room-updated',
    JOINED = 'joined',
    ROOM_DATA = 'room-data',
    EXCEPTION = 'exception',
}

export type GameClientListeners = {
    connected: (cridentials: IAuthenticationCredentials) => void;
    disconnected: () => void;
    roomReceived: (room: IGameRoom) => void;
    roomCreated: (room: IGameRoom) => void;
    playerJoined: (room: IGameRoom) => void;
    roomUpdated: (room: IGameRoom) => void;
    exception: (message: string) => void;
};

export interface IGameClient extends IWithListeners<GameClientListeners> {
    readonly connected: boolean;
    connect(credentials: IAuthenticationCredentials): void;
    createRoom(): void;
    leaveRoom(roomId: string): void;
    getRoom(roomId: string): void;
    joinRoom(roomId: string): void;
    makeChoice(choice: PlayerChoiseOption, roomId: string): void;
    disconnect(): void;
    startNewRound(): void;
}

export interface IGameClientException {
    type: 'error';
    message: string;
}

export const authValidationScheme = z.object({
    login: z.string().min(3).max(26),
});
