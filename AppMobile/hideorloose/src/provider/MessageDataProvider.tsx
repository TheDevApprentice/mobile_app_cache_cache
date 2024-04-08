import React, { createContext, useContext, useState, useEffect } from 'react';
import { getDatabase, ref, push } from 'firebase/database';
import { AuthContext } from './Auth/AuthProvider';
import { Friend } from '../utils/Types/user';
import { MessageDataContextType } from './Types/messageDataContext';
import { getMessaging, getToken } from 'firebase/messaging'; // Importer getMessaging depuis Firebase Messaging

const MessageDataContext = createContext<MessageDataContextType | undefined>(undefined);

export const MessageDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [message, setInputFieldMessage] = useState('');
  const [selectedUser, setSelectedUser] = useState<Friend | null>(null);
  const { auth } = useContext(AuthContext);
  const messaging = getMessaging(); // Initialiser Firebase Messaging

  // useEffect(() => {
  //   messaging.onMessage((payload) => {
  //     console.log('Message reçu:', payload);
  //     // Gérer le message reçu ici, par exemple, mettre à jour l'état ou afficher une notification
  //   });

  //   return () => {
  //     // Nettoyer les abonnements si nécessaire
  //   };
  // }, []);

  const sendMessage = () => {
    if (!selectedUser || !message.trim()) return;

    const database = getDatabase();
    const messagesRef = ref(database, `messages/${selectedUser.uid}`);

    push(messagesRef, {
      sender: auth?.currentUser?.uid,
      message: message,
    });

    setInputFieldMessage('');
  };

  const handleFriendSelect = (user: Friend | null) => {
    setSelectedUser(user);
  };

  const getSelectedFriendData = (user: Friend) => {
    if (selectedUser !== null && user.uid === selectedUser?.uid) {
      return selectedUser.messages.filter(message => message.uid === user.uid);
    } else {
      return [];
    }
  };

  return (
    <MessageDataContext.Provider 
      value={{
        message,
        setInputFieldMessage,
        selectedUser,
        sendMessage,
        handleFriendSelect,
        getSelectedFriendData,
      }}
    >
      {children}
    </MessageDataContext.Provider>
  );
};

export const useMessageContext = () => {
  const context = useContext(MessageDataContext);
  if (!context) {
    throw new Error('useMessageContext must be used within a GlobalContextProvider');
  }
  return context;
};
