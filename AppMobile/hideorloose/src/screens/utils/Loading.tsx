import React, { memo } from "react";
import { View, ActivityIndicator } from "react-native";
import { Layout, themeColor } from "react-native-rapi-ui";

export default memo(function () {
  return (
    <Layout>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator size="large" color={themeColor.primary} />
      </View>
    </Layout>
  );
})
