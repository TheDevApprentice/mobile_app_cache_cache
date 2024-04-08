import React, { memo, useRef } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PaymentScreen from "../screens/Payment/PaymentScreen";
import MainTabs from "./MainTabs";

const MainStack = createNativeStackNavigator();

const Main: React.FC = () => {
  const mainTabs = useRef<React.ComponentType<any>>(MainTabs);
  const secondScreen = useRef<React.ComponentType<any>>(PaymentScreen);

  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <MainStack.Screen name="MainTabs" component={mainTabs.current} />
      <MainStack.Screen name="SecondScreen" component={secondScreen.current} />
    </MainStack.Navigator>
  );
};

export default memo(Main);
