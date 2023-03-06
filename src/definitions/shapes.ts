export interface ToastyEvent {
    channel: 'info' | 'alert';
    message: string;
    duration?: number;
};
