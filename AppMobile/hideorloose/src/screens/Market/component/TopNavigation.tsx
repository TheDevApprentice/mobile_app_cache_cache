import React, { memo } from "react";
import { View } from "react-native";
import { TopNav, TextInput, useTheme, themeColor } from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";
import { TopNavigationBarProps } from "../../../utils/Types/Headers/topNavigationBar";

const TopNavigationBar: React.FC<TopNavigationBarProps> = ({
  searchText,
  handleSearch,
}) => {
  const { isDarkmode, setTheme } = useTheme();

  return (
    <TopNav
      leftContent={
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", width: 155 }}>
          <TextInput
            style={{ backgroundColor: themeColor.white100 }}
            placeholder="Search..."
            onChangeText={handleSearch}
            value={searchText}
          />
        </View>
      }
      rightContent={
        <Ionicons
          style={{ }}
          name={isDarkmode ? "sunny" : "moon"}
          size={20}
          color={isDarkmode ? themeColor.white100 : themeColor.dark}
        />
      }
      rightAction={() => {
        if (isDarkmode) {
          setTheme("light");
        } else {
          setTheme("dark");
        }
      }}
    />
  );
};

export default memo(TopNavigationBar);
