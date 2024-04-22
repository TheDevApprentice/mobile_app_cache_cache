import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useRef, useState } from "react";
import 'react-native-gesture-handler';
import LoginPage from './Components/LoginPage';
import HomePage from './Components/HomePage';
import RegisterPage from './Components/RegisterPage';
import ForgotPassword from './Components/ForgotPassword';
import LobbyPage from './Components/LobbyPage';
import InGameView from './Components/InGameView';
import {firebase} from "./firebaseConfig";
import { io } from "socket.io-client";

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
    setSocket(io("http://10.4.1.181:3000", {
        autoConnect: false
    })); 

    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
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