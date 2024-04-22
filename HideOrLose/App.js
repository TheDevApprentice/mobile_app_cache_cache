import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from "react";
import 'react-native-gesture-handler';
import LoginPage from './Components/LoginPage';
import HomePage from './Components/HomePage';
import RegisterPage from './Components/RegisterPage';
import ForgotPassword from './Components/ForgotPassword';
const Stack = createStackNavigator();

import {firebase} from "./firebaseConfig";
import LobbyPage from './Components/LobbyPage';
import InGameView from './Components/InGameView';

function App() {

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user)
  {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <Stack.Navigator>
        <Stack.Screen name='LoginPage' component={LoginPage} options={{headerShown:false}}/>
        <Stack.Screen name='RegisterPage' component={RegisterPage} options={{headerShown:false}}/>
        <Stack.Screen name='ForgotPassword' component={ForgotPassword} options={{headerShown:false}}/>
      </Stack.Navigator>
    )
  }
  return (
    <Stack.Navigator>
      <Stack.Screen name='HomePage' component={HomePage} options={{headerShown:false}}/>
      <Stack.Screen name='LobbyPage' component={InGameView} options={{headerShown:false}}/>
    </Stack.Navigator>
  );
}

export default () => {
  return (
    <NavigationContainer>
      <App/>
    </NavigationContainer>
  )
}