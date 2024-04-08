import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GlobalContextProviderType } from './Types/globalContextProvider';
import { getFirestore, setDoc, doc } from "firebase/firestore";
import * as Location from 'expo-location';
import { User } from '../utils/Types/user';
import { Platform } from 'react-native';
import { AuthContext } from './Auth/AuthProvider';
import { firebaseConfig } from "../config/firebase";
import { getApps, initializeApp } from 'firebase/app';

const GlobalContext = createContext<GlobalContextProviderType | undefined>(undefined);

if (getApps().length === 0) {
  initializeApp(firebaseConfig);
}

export const GlobalContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const firestore = getFirestore();
  const { auth } = useContext(AuthContext);
  const [userData, setUserData] = useState<User>();
  
  useEffect(() => {
    (async () => {
      if (Platform.OS === 'android' && !(await Location.isBackgroundLocationAvailableAsync())) {
        // Gestion des erreurs pour les services Google non disponibles sur Android
        return;
      }
      
      // Demandez la permission d'accéder à la localisation de l'utilisateur
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        // Gestion des erreurs si l'utilisateur refuse la permission
        return;
      }

      // Obtenez la localisation actuelle de l'utilisateur
      let location = await Location.getCurrentPositionAsync({});
      // Stockez la localisation en base de données si l'utilisateur est connecté
      
      if (auth?.currentUser && auth?.currentUser !== undefined) {
        await setDoc(doc(firestore, "users", auth.currentUser.uid), {
          location: { latitude: location.coords.latitude, longitude: location.coords.longitude },
        }, { merge: true });
      }
    })();
  }, []);

  useEffect(() => {
    const saveLocationPeriodically = setInterval(() => {
      saveUserLocation();
    }, 120000);

    return () => {
      clearInterval(saveLocationPeriodically);
    };
  }, [userData]);

  const saveUserLocation = async () => {
    if (userData && userData.uid) {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted') {
          const location = await Location.getCurrentPositionAsync({});
          console.log("location user modified = ", location)
          await setDoc(doc(firestore, "users", userData.uid), {
            location: { latitude: location.coords.latitude, longitude: location.coords.longitude },
          }, { merge: true });
        }
      } catch (error) {
        console.error('Error saving user location:', error);
      }
    }
  };

  return (
    <GlobalContext.Provider 
    value={{
      ...userData,
      setUserData, 
      auth
    }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobalContext must be used within a GlobalContextProvider');
  }
  return context;
};
