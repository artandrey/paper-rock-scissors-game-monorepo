import { Card, CardBody, CardHeader, Divider } from '@nextui-org/react';
import React from 'react';
import UserMenu from '../../../features/user-menu/ui/user-menu';
import { Outlet } from 'react-router-dom';

const AppLayout: React.FC = () => {
    return (
        <Card className="w-full min-h-screen">
            <CardHeader className="justify-between">
                <h2 className="text-foreground">App dashboard</h2>
                <UserMenu />
            </CardHeader>
            <Divider />
            <CardBody>
                <Outlet />
            </CardBody>
        </Card>
    );
};

export default AppLayout;
