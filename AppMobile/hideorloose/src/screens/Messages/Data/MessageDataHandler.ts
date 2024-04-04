// MessageDataHandler.tsx
import { useState } from 'react';

// Exemple de données d'utilisateurs amis
export const friendsData = [
    { id: "1", username: "User 1" },
    { id: "2", username: "User 2" },
    { id: "3", username: "User 3" },
    // { id: "4", username: "User 4" },
    // { id: "5", username: "User 5" },
    // { id: "6", username: "User 6" },
  ];
  
  // Exemple de données de messages
  export const messagesData = [
    { id: "0", friendId: "1", text: "Hello, User !" },
    { id: "0", friendId: "2", text: "Hi, yooo!" },
    { id: "0", friendId: "3", text: "Hey, yeah !" },
    // { id: "4", friendId: "1", text: "How are you, User 1?" },
    // { id: "5", friendId: "2", text: "What's up, User 2?" },
    // { id: "6", friendId: "3", text: "Good, User 3?" },
  ];

export const useMessageDataHandler = () => {
  const [message, setMessage] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('');

  const sendMessage = () => {
    // Logique pour envoyer le message
    console.log('Message sent:', message, 'To :', selectedUserId);
    // Réinitialiser le champ de saisie après l'envoi du message
    setMessage('');
  };

  const handleFriendSelect = (userId: string) => {
    setSelectedUserId(userId);
  };

  return { message, setMessage, selectedUserId, sendMessage, handleFriendSelect };
};
