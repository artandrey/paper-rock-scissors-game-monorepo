import { io, Socket } from 'socket.io-client';
import {
    GameClientListeners,
    GameInputEvent,
    GameOutputEvent,
    IAuthenticationCredentials,
    IGameClient,
    IGameClientException,
    IGameRoom,
    PlayerChoiseOption,
} from './models';
import { IWithListeners, WithListeners } from './with-listeners';

export interface IGameClientOptions {
    url: string;
}

export class GameClient
    extends WithListeners<GameClientListeners>
    implements IGameClient, IWithListeners<GameClientListeners>
{
    private _socket: Socket;
    private _isConnected: boolean = false;
    constructor(options: IGameClientOptions) {
        super();
        this._socket = io(options.url, {
            autoConnect: false,
        });
        this._socket.on('connect', () => this.handleConnected());
        this._socket.on('disconnect', () => this.handleDisconnected());
        this._socket.on(GameOutputEvent.CREATED, (room) =>
            this.handleRoomCreated(room)
        );
        this._socket.on(GameOutputEvent.JOINED, (room) =>
            this.handlePlayerJoined(room)
        );
        this._socket.on(GameOutputEvent.ROOM_UPDATED, (room) =>
            this.handleRoomUpdated(room)
        );
        this._socket.on(GameOutputEvent.ROOM_DATA, (room) => {
            this.handleRoomData(room);
        });
        this._socket.on(GameOutputEvent.EXCEPTION, (exception) => {
            this.handleException(exception);
        });
    }

    get connected() {
        return this._isConnected;
    }

    connect(cridentials: IAuthenticationCredentials) {
        this._socket.auth = cridentials;
        this._socket.connect();
    }

    createRoom() {
        this._socket.emit(GameInputEvent.CREATE);
    }

    getRoom(roomId: string): void {
        this._socket.emit(GameInputEvent.GET_ROOM, { roomId });
    }

    joinRoom(roomId: string): void {
        this._socket.emit(GameInputEvent.JOIN, {
            roomId,
        });
    }

    leaveRoom() {
        this._socket.emit(GameInputEvent.LEAVE);
    }

    makeChoice(choice: PlayerChoiseOption, roomId: string) {
        this._socket.emit(GameInputEvent.MAKE_CHOICE, {
            choice,
            roomId,
        });
    }

    startNewRound(): void {
        this._socket.emit(GameInputEvent.NEW_GAME);
    }

    private handleRoomCreated(room: IGameRoom) {
        this.invokeListener('roomCreated', room);
    }

    private handleRoomUpdated(room: IGameRoom) {
        this.invokeListener('roomUpdated', room);
    }

    private handlePlayerJoined(room: IGameRoom) {
        this.invokeListener('playerJoined', room);
    }

    private handleRoomData(room: IGameRoom) {
        this.invokeListener('roomReceived', room);
    }

    private handleException(exception: IGameClientException) {
        this.invokeListener('exception', exception.message);
    }

    disconnect() {
        this._socket?.disconnect();
    }

    private handleConnected() {
        this._isConnected = true;
        this.invokeListener(
            'connected',
            this._socket.auth as IAuthenticationCredentials
        );
    }

    private handleDisconnected() {
        this._isConnected = false;
        this.invokeListener('disconnected');
    }
}
