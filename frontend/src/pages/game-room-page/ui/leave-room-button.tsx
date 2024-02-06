import React from 'react';
import { useRoom } from '../room-provider';
import { Button } from '@nextui-org/react';

interface LeaveRoomButtonProps {}

const LeaveRoomButton: React.FC<LeaveRoomButtonProps> = () => {
    const { leaveRoom } = useRoom();

    return (
        <Button
            size="lg"
            color="danger"
            onClick={leaveRoom}
        >
            Leave room
        </Button>
    );
};

export default LeaveRoomButton;
