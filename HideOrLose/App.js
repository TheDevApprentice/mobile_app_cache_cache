import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from "react";
import 'react-native-gesture-handler';
import LoginPage from './Components/LoginPage';
import HomePage from './Components/HomePage';
import RegisterPage from './Components/RegisterPage';
const Stack = createStackNavigator();

import {firebase} from "./firebaseConfig";

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
        <Stack.Screen name='Login' component={LoginPage} options={{headerShown:false}}/>
        <Stack.Screen name='RegisterPage' component={RegisterPage} options={{headerShown:false}}/>
      </Stack.Navigator>
    )
  }
  return (
    <Stack.Navigator>
      <Stack.Screen name='HomePage' component={HomePage} options={{headerShown:false}}/>
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