import { withAuthManagement } from '../features/auth-management/withAuthManagement';
import { withGameClientNotificationsSubscription } from '../features/game-client-notifications/withGameClientNotificationsSubscription';
import { Routing } from '../routes/routing';
import { withGameClientProvider } from './providers/game-client-provider/withGameClientProvider';
import { withNextUiProvider } from './providers/next-ui-provider/withNextUiProvider';
import { withRouter } from './providers/router-provider/withRouter';
import { withNotificationWrapper } from './providers/with-notification-provider/withNotificationWrapper';

function App() {
    return (
        <>
            <Routing />
        </>
    );
}

export const WrappedApp = withNextUiProvider(
    withNotificationWrapper(
        withGameClientProvider(
            withGameClientNotificationsSubscription(
                withRouter(withAuthManagement(App))
            )
        )
    )
);
