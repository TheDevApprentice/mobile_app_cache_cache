import React, { memo, useRef } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { themeColor, useTheme } from "react-native-rapi-ui";

import Home from "../screens/Market/Market";
import About from "../screens/Profile/Profile";
import Profile from "../screens/Messages/Messages";
import Cart from "../screens/Cart/Cart";
import TabBarText from "../utils/components/Tabs/TabBar/TabBarText/TabBarText";
import TabBarIcon from "../utils/components/Tabs/TabBar/TabBarIcon/TabBarIcon";

const Tabs = createBottomTabNavigator();

const MainTabs: React.FC = () => {
  const { isDarkmode } = useTheme();
  const home = useRef<React.ComponentType<any>>(Home);
  const about = useRef<React.ComponentType<any>>(About);
  const profile = useRef<React.ComponentType<any>>(Profile);
  const cart = useRef<React.ComponentType<any>>(Cart);

  const shouldShowBadgeNotificationMessage: boolean = true;
  const shouldShowBadgeNotificationCart: boolean = true;

  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: "relative",
          bottom: 0,
          borderTopColor: isDarkmode ? themeColor.dark100 : "#c0c0c0",
          backgroundColor: isDarkmode ? themeColor.dark200 : "#ffffff",
        },
      }}
    >
      <Tabs.Screen
        name="Home"
        component={home.current}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabBarText focused={focused} title="Market" />
          ),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={"compass"} />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        component={profile.current}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabBarText focused={focused} title="Messages" />
          ),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={"paper-plane-outline"} />
          ),
          tabBarBadge: shouldShowBadgeNotificationMessage ? '1' : undefined,
          tabBarBadgeStyle: {
            backgroundColor: "#219ebc",
            color: "white",
            fontWeight: "bold",
            fontSize: 14,
            paddingHorizontal: 9,
            paddingVertical: 1,
            borderRadius: 10,
            marginLeft: 5,
            justifyContent: "center",
            alignContent: "center"
          },
        }}
      />
      <Tabs.Screen
        name="Cart"
        component={cart.current}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabBarText focused={focused} title="Panier" />
          ),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={"cart"} />
          ),
          tabBarBadge: shouldShowBadgeNotificationCart ? '' : undefined,
          tabBarBadgeStyle: { 
            backgroundColor: "#d00000",
            color: "white",
            fontWeight: "bold",
            fontSize: 14,
            paddingHorizontal: 9,
            paddingVertical: 1,
            borderRadius: 10,
            marginLeft: 5,
            justifyContent: "center",
            alignContent: "center"
          },
        }}
      />
      <Tabs.Screen
        name="About"
        component={about.current}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabBarText focused={focused} title="Profile" />
          ),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={"person"} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
};

export default memo(MainTabs);
