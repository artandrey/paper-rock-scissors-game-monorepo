import { NextUIProvider } from '@nextui-org/react';

export const withNextUiProvider = (Component: React.ComponentType) => () => {
    return (
        <NextUIProvider>
            <Component />
        </NextUIProvider>
    );
};
