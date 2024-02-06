import { Chip } from '@nextui-org/react';
import React from 'react';

interface JoinCodeBadgeProps {
    code: string;
}

export const JoinCodeBadge: React.FC<JoinCodeBadgeProps> = ({ code }) => {
    return (
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-2">
            <span>Share this code to invite another user:</span>
            <Chip
                variant="solid"
                color="primary"
            >
                {code}
            </Chip>
        </div>
    );
};
