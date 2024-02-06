export interface INotificationMessage {
    type: 'error' | 'info';
    header: string;
    body: string;
}
