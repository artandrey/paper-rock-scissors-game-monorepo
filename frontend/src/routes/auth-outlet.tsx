import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useGameClient } from '../app/providers/game-client-provider/use-game-client';

interface AuthOutletProps {
    redirectUnauthorisedTo: string;
}

const AuthOutlet: React.FC<AuthOutletProps> = ({
    redirectUnauthorisedTo: redirectUnauthorised,
}) => {
    const gameClient = useGameClient();

    if (!gameClient.connected) return <Navigate to={redirectUnauthorised} />;

    return <Outlet />;
};

export default AuthOutlet;
