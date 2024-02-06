import { Button } from '@nextui-org/react';
import React from 'react';
import { useCreateRoom } from '../use-create-room';

const CreateGameButton: React.FC = () => {
    const createRoom = useCreateRoom();

    return (
        <Button
            onClick={createRoom}
            className="mt-16"
            color="primary"
            size="lg"
        >
            Create room
        </Button>
    );
};

export default CreateGameButton;
