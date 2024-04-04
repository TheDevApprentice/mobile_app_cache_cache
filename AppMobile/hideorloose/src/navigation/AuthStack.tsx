import React, { memo, useRef } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/auth/Login";
import Register from "../screens/auth/Register";
import ForgetPassword from "../screens/auth/ForgetPassword";

const AuthStack = createNativeStackNavigator();

const Auth: React.FC = () => {
  const login = useRef<React.ComponentType<any>>(Login);
  const register = useRef<React.ComponentType<any>>(Register);
  const forgetPassword = useRef<React.ComponentType<any>>(ForgetPassword);

  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen name="Login" component={login.current} />
      <AuthStack.Screen name="Register" component={register.current} />
      <AuthStack.Screen name="ForgetPassword" component={forgetPassword.current} />
    </AuthStack.Navigator>
  );
};

export default memo(Auth);
