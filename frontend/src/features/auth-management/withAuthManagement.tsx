import { useEffect } from 'react';
import { useSignUp } from '../sign-up/use-sign-up';
import { useLoginStorage } from '../../shared/username-storage/use-username-store';

export const withAuthManagement = (Component: React.ComponentType) => () => {
    const { savedLogin } = useLoginStorage();

    const { signUp } = useSignUp();

    useEffect(() => {
        if (savedLogin) {
            signUp({ login: savedLogin });
        }
    }, [signUp, savedLogin]);

    return <Component />;
};
