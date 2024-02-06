import React from 'react';
import { useSignOut } from '../use-sign-out';
import { Button } from '@nextui-org/react';

const SignOutButton: React.FC = () => {
    const { signOut } = useSignOut();

    return <Button onPress={signOut}>Sign out</Button>;
};

export default SignOutButton;
