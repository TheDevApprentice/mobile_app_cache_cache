import React, { useContext } from "react";
import { getApps, initializeApp } from "firebase/app";
import { AuthContext } from "../provider/AuthProvider";

import { NavigationContainer } from "@react-navigation/native";

import Main from "./MainStack";
import Auth from "./AuthStack";
import Loading from "../screens/utils/Loading";

// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBPZHqN-259ZBkxAkxg9SXOKsi-MrImgjA",
  authDomain: "hideorloose.firebaseapp.com",
  projectId: "hideorloose",
  storageBucket: "hideorloose.appspot.com",
  messagingSenderId: "820410943037",
  appId: "1:820410943037:web:617b98129bd11a604e4c54",
  measurementId: "G-3WTZPX5961"
};

// Initialize Firebase
if (getApps().length === 0) {
  // const app = initializeApp(firebaseConfig);
  initializeApp(firebaseConfig);
  // const analytics = getAnalytics(app);
}

export default () => {
  const auth = useContext(AuthContext);
  const user = auth.user;
  return (
    <NavigationContainer>
      {user == null && <Loading />}
      {user?.isConnected == false && <Auth />}
      {user?.isConnected  == true && <Main />}
    </NavigationContainer>
  );
};
