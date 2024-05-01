import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from "react";
import 'react-native-gesture-handler';
import LoginPage from './Components/LoginPage';
import HomePage from './Components/HomePage';
import RegisterPage from './Components/RegisterPage';
import ForgotPassword from './Components/ForgotPassword';
import LobbyPage from './Components/LobbyPage';
import InGameView from './Components/InGameView';
import {firebase} from "./firebaseConfig";
import { io } from "socket.io-client";
import { Stop } from 'react-native-svg';
import Constants from 'expo-constants';
import GameHistory from './Components/GameHistory';

function App() {
  const Stack = createStackNavigator();
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [socket, setSocket] = useState();

  function onAuthStateChanged(user)
  {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const hostUri = Constants.expoConfig.hostUri;
    const ipAddress = hostUri.split(":")[0].trim();
    const socketUrl = `http://${ipAddress}:3000`;
    setSocket(io(socketUrl));
    
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return ()=>{
      subscriber();
    }

  }, []);

  if (initializing) return null;

  return (
    <Stack.Navigator>
      <Stack.Screen name='LoginPage' component={LoginPage} options={{headerShown:false}}/>
      <Stack.Screen name='RegisterPage' component={RegisterPage} options={{headerShown:false}}/>
      <Stack.Screen name='ForgotPassword' component={ForgotPassword} options={{headerShown:false}}/>

      <Stack.Screen name='HomePage' options={{headerShown:false}}>
      {()=> <HomePage socket={socket}/>}
      </Stack.Screen>

      <Stack.Screen name='LobbyPage' options={{headerShown:false}}>
      {()=> <LobbyPage socket={socket}/>}
      </Stack.Screen>

      <Stack.Screen name='InGameView' options={{headerShown:false}}>
      {()=> <InGameView socket={socket}/>}
      </Stack.Screen>

      <Stack.Screen default name='GameHistory' options={{headerShown:false}}>
      {()=> <GameHistory socket={socket}/>}
      </Stack.Screen>

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