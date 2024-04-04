import React, { memo, useRef } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import SecondScreen from "../screens/SecondScreen";
import MainTabs from "./MainTabs";

const MainStack = createNativeStackNavigator();

const Main: React.FC = () => {
  const mainTabs = useRef<React.ComponentType<any>>(MainTabs);
  // const secondScreen = useRef<React.ComponentType<any>>(SecondScreen);

  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <MainStack.Screen name="MainTabs" component={mainTabs.current} />
      {/* <MainStack.Screen name="SecondScreen" component={secondScreen.current} /> */}
    </MainStack.Navigator>
  );
};

export default memo(Main);
