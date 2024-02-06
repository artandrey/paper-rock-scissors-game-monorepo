import { Card, CardBody, CardHeader } from '@nextui-org/react';
import React, { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';

interface AuthPageLayoutProps {
    children?: ReactNode;
    header?: string;
}

const AuthPageLayout: React.FC<AuthPageLayoutProps> = ({ children }) => {
    return (
        <Card className="w-full min-h-screen">
            <CardHeader className="justify-center">
                <h2 className="text-3xl text-foreground">
                    Stone paper scissors game
                </h2>
            </CardHeader>
            <CardBody>
                <Card className="mx-auto w-96">
                    <CardHeader>
                        <span className="text-2xl text-foreground"></span>
                    </CardHeader>
                    <CardBody className="py-8 px-4">
                        {children || <Outlet />}
                    </CardBody>
                </Card>
            </CardBody>
        </Card>
    );
};

export default AuthPageLayout;
