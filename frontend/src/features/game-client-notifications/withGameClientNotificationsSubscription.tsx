import { useGameClientEventListener } from '../../app/providers/game-client-provider/use-game-client-event-listener';
import { useNotifications } from '../notification/use-notifications';

export const withGameClientNotificationsSubscription =
    (Component: React.ComponentType) => () => {
        const { showNotification } = useNotifications();
        const handleException = (message: string) => {
            showNotification({
                type: 'error',
                header: 'Error',
                body: message,
            });
        };

        useGameClientEventListener('exception', handleException);

        return <Component />;
    };
