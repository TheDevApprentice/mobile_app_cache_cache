import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GlobalContextProviderType } from '../types/Contexts/globalContextProvider';
import { getFirestore, setDoc, doc } from "firebase/firestore";
import * as Location from 'expo-location';
import { User } from '../types/user';

const GlobalContext = createContext<GlobalContextProviderType | undefined>(undefined);

export const GlobalContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userData, setUserData] = useState<User>();
  const firestore = getFirestore();

  useEffect(() => {
    const loadUserData = async () => {
      if (typeof window !== 'undefined') {
        try {
          const storedUserData = await AsyncStorage.getItem('userData');
          if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
          }
        } catch (error) {
          console.error('Error loading user data:', error);
        }
      }
    };

    loadUserData();
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
      setUserData
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
