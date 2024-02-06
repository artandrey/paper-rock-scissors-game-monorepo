import { ToastContainer } from 'react-toastify';

export const withNotificationWrapper = (Component: React.ComponentType) => {
    return () => (
        <>
            <Component />
            <ToastContainer position="top-right" />
        </>
    );
};
