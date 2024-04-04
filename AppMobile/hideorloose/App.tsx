import React from "react";
import Navigation from "./src/navigation";
import { AuthProvider } from "./src/provider/AuthProvider";
import { ThemeProvider } from "react-native-rapi-ui";
import { LogBox } from "react-native";
import { GlobalContextProvider } from "./src/provider/GlobalContextProvider";
import { CartProvider } from "./src/provider/CartDataContext";
import { NotificationProvider } from "./src/provider/NotificationContextProvider";

export default function App() {
  const images = [
    require("./assets/images/login.png"),
    require("./assets/images/register.png"),
    require("./assets/images/forget.png"),
  ];

  // Ignore firebase v9 AsyncStorage warning
  React.useEffect(() => {
    LogBox.ignoreLogs([
      "AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-async-storage/async-storage' instead of 'react-native'. See https://github.com/react-native-async-storage/async-storage",
    ]);
  }, []);

  return (
    <ThemeProvider theme="light" images={images}>
       <GlobalContextProvider>
        <AuthProvider>
          <CartProvider>
            <NotificationProvider>
              <Navigation />
            </NotificationProvider>
          </CartProvider>
        </AuthProvider>
      </GlobalContextProvider>
    </ThemeProvider>
  );
}
