import { UseFormStateReturn, useController } from 'react-hook-form';

export type IWithControlled = {
    name?: string;
    defaultValue?: any;
    disabled?: boolean;
    isInvalid?: boolean;
    errorMessage?: any;
    onValueChange?: (value: any) => void;
    formState?: UseFormStateReturn<Record<string, unknown>>;
};

export interface IWithName {
    name: string;
}

export const withFormInputSubscription = <T extends IWithControlled>(
    Component: React.ComponentType<T>
) => {
    const HocComponent: React.FC<T & IWithName> = ({
        name,
        defaultValue,
        disabled,
        ...otherProps
    }) => {
        const {
            field: { value = '', ...otherFields },
            formState,
        } = useController({
            name,
            defaultValue,
            disabled,
        });

        const { errors } = formState;
        const error = errors[name];

        return (
            <Component
                {...(otherProps as T)}
                {...otherFields}
                value={value}
                isInvalid={!!error}
                errorMessage={error?.message}
                formState={formState}
            />
        );
    };

    HocComponent.displayName =
        'Controlled' + (HocComponent.displayName ?? 'Unknown');

    return HocComponent;
};
