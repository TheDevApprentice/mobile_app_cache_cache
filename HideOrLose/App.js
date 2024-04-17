import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from "react";
import 'react-native-gesture-handler';
import LoginPage from './Components/LoginPage';
import HomePage from './Components/HomePage';
import RegisterPage from './Components/RegisterPage';
import ForgotPassword from './Components/ForgotPassword';
import LobbyPage from './Components/LobbyPage';
import {firebase} from "./firebaseConfig";

function App() {
  const Stack = createStackNavigator();
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

  return (
    <Stack.Navigator>
      <Stack.Screen name='LoginPage' component={LoginPage} options={{headerShown:false}}/>
      <Stack.Screen name='RegisterPage' component={RegisterPage} options={{headerShown:false}}/>
      <Stack.Screen name='ForgotPassword' component={ForgotPassword} options={{headerShown:false}}/>
      <Stack.Screen name='HomePage' component={HomePage} options={{headerShown:false}}/>
      <Stack.Screen name='LobbyPage' component={LobbyPage} options={{headerShown:false}}/>
    </Stack.Navigator>
  )
}

export default () => {
  return (
    <NavigationContainer>
      <App/>
    </NavigationContainer>
  )
}