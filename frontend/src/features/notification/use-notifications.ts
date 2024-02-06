import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { INotificationMessage } from './models';
import { notificationOptions } from './config';

export const useNotifications = () => {
    const showNotification = (message: INotificationMessage) => {
        if (message.type === 'error') {
            toast.error(message.body, notificationOptions);
        } else {
            toast.info(message.body, notificationOptions);
        }
    };

    return {
        showNotification,
    };
};
