import React, { useContext } from "react";
import { getApps, initializeApp } from "firebase/app";
import { AuthContext } from "../provider/Auth/AuthProvider";
import { NavigationContainer } from "@react-navigation/native";
import Main from "./MainStack";
import Auth from "./AuthStack";
import Loading from "../screens/Loading/Loading";

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
