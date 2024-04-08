import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import * as Notifications from 'expo-notifications';
import { NotificationContextType } from '../Types/Notification/notificationContextType';
import { Notification } from '../Types/Notification/notification';
import * as Device from 'expo-device';
import { Platform } from 'react-native';
import { sampleNotification } from '../Types/Notification/Sample/SampleNotification';

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

async function testNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: sampleNotification.title,
      body: sampleNotification.body,
      data: sampleNotification.data,
    },
    trigger: sampleNotification.trigger,
  });
}

async function schedulePushNotification(
  notification: Notification
  ) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: notification.title,
      body: notification.body,
      data: notification.data,
    },
    trigger: notification.trigger,
  });
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
  
    token = (await Notifications.getExpoPushTokenAsync({ projectId: 'b4b86d39-bb1b-480e-b614-d992ae2a6fbf' })).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [expoPushToken, setExpoPushToken] = useState<string>('');
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [notification, setNotification] = useState<Notification>();

  const notificationListener = useRef<any>();
  const responseListener = useRef<any>();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => {
      if(token !== undefined){
        setExpoPushToken(token); 
      }
    });

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      if(notification !== null){
        setNotification(notification);
      }
    });

    responseListener.current = Notifications
    .addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications
        .removeNotificationSubscription(notificationListener.current);
      Notifications
        .removeNotificationSubscription(responseListener.current);
    };
  }, []);

  useEffect(() => {
    const requestNotificationPermissions = async () => {
      const { status } = await Notifications
        .getPermissionsAsync();
      if (status !== 'granted') {
        const { status: newStatus } = await Notifications
          .requestPermissionsAsync();
        if (newStatus !== 'granted') {
          throw new Error('Permission to send notifications was denied');
        }
      } else {
        console.log("Notification permission status:", status);
      }
    }; 

    requestNotificationPermissions(); 
    testNotification();
  }, []);

  const addNotification = (newNotification: Notification) => {
    setNotification(newNotification);
    schedulePushNotification(newNotification)
  };
  const addNotificationtoNotifications = (notification: Notification) => {
    setNotifications((prevNotifications) => [...prevNotifications, notification]);
  };

  const removeNotifications = (id: string) => {
    setNotifications((prevNotifications) => prevNotifications.filter((n) => n.id !== id));
  };

  const clearNotification = () => {
    setNotification(null);
  };
  const clearNotifications = () => {
    setNotifications([]);
  };

  return (
    <NotificationContext.Provider
    value={{
      expoPushToken,
      notification,
      notifications,
      setNotification,
      addNotificationtoNotifications,
      removeNotifications,
      clearNotifications,
      addNotification: addNotification,
      clearNotification: clearNotification,
    }}
  >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('NotificationContext must be used within a NotificationProvider');
  }
  return context;
};
