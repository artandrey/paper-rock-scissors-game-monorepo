import React, { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from '../shared/ui/layouts/app-layout';
import AuthOutlet from './auth-outlet';

export const AUTHORISED_PATH = '/app';

const SignUpPage = lazy(() => import('../pages/sign-up-page/'));
const DashboardPage = lazy(() => import('../pages/dashboard-page'));
const GameRoomPage = lazy(() => import('../pages/game-room-page'));

export const Routing: React.FC = () => {
    return (
        <Routes>
            <Route path="/auth">
                <Route
                    path="sign-up"
                    element={<SignUpPage />}
                />
                <Route
                    path=""
                    element={<Navigate to="/auth/sign-up" />}
                />
            </Route>
            <Route element={<AuthOutlet redirectUnauthorisedTo="/auth" />}>
                <Route
                    path="/app"
                    element={<AppLayout />}
                >
                    <Route
                        path="dashboard"
                        element={<DashboardPage />}
                    />
                    <Route
                        path="room/:roomId"
                        element={<GameRoomPage />}
                    />
                    <Route
                        path=""
                        element={<Navigate to="dashboard" />}
                    />
                </Route>
            </Route>
            <Route
                path=""
                element={<Navigate to={AUTHORISED_PATH} />}
            />
        </Routes>
    );
};
