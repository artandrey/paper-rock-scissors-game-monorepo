import React from 'react';
import AuthPageLayout from '../../shared/ui/layouts/auth-page-layout';
import SignUpForm from '../../features/sign-up/ui/sign-up-form';

export const SignUpPage: React.FC = () => {
    return (
        <AuthPageLayout header="Sign up">
            <SignUpForm />
        </AuthPageLayout>
    );
};
