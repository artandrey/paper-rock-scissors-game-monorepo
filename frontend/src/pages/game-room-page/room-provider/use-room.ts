import { useContext } from 'react';
import { IRoomControls, RoomContext } from './room-provider';

export const useRoom = (): IRoomControls => {
    const context = useContext(RoomContext);

    if (!context) {
        throw new Error('useRoom must be used within a RoomProvider');
    }

    return context;
};
