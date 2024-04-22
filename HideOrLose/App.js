import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { createContext, useEffect, useRef, useState } from "react";
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

function App() {
  const Stack = createStackNavigator();
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [socket, setSocket] = useState();
  const {appRef} = useRef(this).current;
  const [pingInterval, setPingInterval] = useState(null);

  function onAuthStateChanged(user)
  {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  const StartPing = () => {
    const id = setInterval(()=>{
      socket.emit('ping');
    }, 4000);
    setPingInterval(id);
  };

  const StopPing = () => {
    clearInterval(pingInterval);
    setPingInterval(null);
  };

  useEffect(() => {
    setSocket(io("http://10.4.1.181:3000", {
        autoConnect: false
    }));

    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    
    if(appRef){
      console.log("Unmounted App Disconnect should happen on close app")
      socket.disconnect(); 
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
      {()=> <HomePage socket={socket} StartPing={StartPing} StopPing={StopPing}/>}
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