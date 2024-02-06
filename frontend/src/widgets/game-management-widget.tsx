import React from 'react';
import CreateGameButton from '../features/create-game/ui/create-room-button';
import JoinGameForm from '../features/join-room/ui/join-room-form';
import { Divider } from '@nextui-org/react';

const GameManagementWidget: React.FC = () => {
    return (
        <div className="w-full flex flex-col items-center py-10">
            <span className="text-foreground text-center text-3xl lg:text-5xl">
                Here you can join the room <br /> Or create a new one
            </span>
            <div className="max-w-2xl lg:w-3/5 flex flex-col gap-10">
                <CreateGameButton />
                <Divider />
                <JoinGameForm />
            </div>
        </div>
    );
};

export default GameManagementWidget;
