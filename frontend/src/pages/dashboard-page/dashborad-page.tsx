import { Card, CardBody } from '@nextui-org/react';
import React from 'react';
import GameManagementWidget from '../../widgets/game-management-widget';

export const DashboardPage: React.FC = () => {
    return (
        <Card className="mx-auto max-w-7xl lg:min-w-[90%]">
            <CardBody>
                <GameManagementWidget />
            </CardBody>
        </Card>
    );
};
