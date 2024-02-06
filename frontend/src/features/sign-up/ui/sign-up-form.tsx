import React from 'react';
import { useSignUp } from '../use-sign-up';
import FormBase from '../../../shared/ui/form/form-base';
import { FormInput } from '../../../shared/ui/form/controlled-fields/input';
import FormLayout from '../../../shared/ui/layouts/form-layout';
import { authValidationScheme } from '../../../shared/api/game-client/models';
import { FormButton } from '../../../shared/ui/form/controlled-fields/button';

const SignUpForm: React.FC = () => {
    const { signUp } = useSignUp();
    return (
        <FormBase
            onSubmit={signUp}
            validation={authValidationScheme}
        >
            <FormLayout>
                <FormInput
                    name="login"
                    type="name"
                    label="Username"
                />
                <FormButton
                    className="w-full"
                    name="submit-button"
                    type="submit"
                >
                    Sign up
                </FormButton>
            </FormLayout>
        </FormBase>
    );
};

export default SignUpForm;
