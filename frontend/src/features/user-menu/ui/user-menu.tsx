import {
    Button,
    Card,
    Popover,
    PopoverContent,
    PopoverTrigger,
    User,
} from '@nextui-org/react';
import React from 'react';
import SignOutButton from '../../sign-out/ui/sign-out-button';
import { useUserStore } from '../../../store/user-store';

const UserMenu: React.FC = () => {
    const { nickname } = useUserStore();

    return (
        <Popover>
            <PopoverTrigger>
                <Button
                    className="h-14"
                    variant="faded"
                >
                    <User name={nickname} />
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <Card className="w-20">
                    <SignOutButton />
                </Card>
            </PopoverContent>
        </Popover>
    );
};

export default UserMenu;
