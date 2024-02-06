import {
    Button as NextButton,
    ButtonProps as NextButtonProps,
} from '@nextui-org/react';
import React, { forwardRef } from 'react';
import { IWithControlled } from '../with-form-input-subscription';
import { withFormStateSubscription } from '../with-form-state-subscription';

interface ButtonProps extends IWithControlled, NextButtonProps {}

const StatefullButton: React.ForwardRefRenderFunction<
    HTMLButtonElement,
    ButtonProps
> = ({ formState, name, ...otherProps }, ref) => {
    const isLoading = formState?.isLoading;

    return (
        <NextButton
            ref={ref}
            {...otherProps}
            name={name}
            isLoading={isLoading}
        />
    );
};

export const FormButton = withFormStateSubscription(
    forwardRef(StatefullButton)
);
