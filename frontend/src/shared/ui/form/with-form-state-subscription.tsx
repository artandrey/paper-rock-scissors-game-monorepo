import { UseFormStateReturn, useFormState } from 'react-hook-form';

interface IWithFormState {
    formState?: UseFormStateReturn<Record<string, unknown>>;
}

export const withFormStateSubscription = <T extends IWithFormState>(
    Component: React.ComponentType<T>
) => {
    const HocComponent: React.FC<Omit<T, 'formState'>> = ({
        ...otherProps
    }) => {
        const formState = useFormState();

        return (
            <Component
                {...(otherProps as T)}
                formState={formState}
            />
        );
    };

    HocComponent.displayName =
        'Statefull' + (HocComponent.displayName ?? 'Unknown');

    return HocComponent;
};
