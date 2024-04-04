import { Notification } from '../../types/Notifications/notification'; 
import * as Notifications from 'expo-notifications';

export type NotificationContextType = {
    notification?: Notification | null;
    notifications?: Notification[];
    
    expoPushToken: string, 
    setNotification: any;
    addNotification: any;
    clearNotification: any;

    addNotificationtoNotifications: any;
    removeNotifications: any;
    clearNotifications: any;
    
    title: string, 
    body: string; 
    data: Record<string, any> | undefined; 
    trigger: Notifications.NotificationTriggerInput
}