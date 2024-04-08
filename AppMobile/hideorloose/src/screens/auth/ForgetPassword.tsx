import React, { memo, useState } from "react";
import { TouchableOpacity, View, KeyboardAvoidingView, Image } from "react-native";
import { AuthStackParamList } from "../../utils/Types/navigation";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Layout, Text, TextInput, Button, useTheme, themeColor } from "react-native-rapi-ui";
import { forgetpasswordStyle } from "./Styles/ForgetPasswordStyles";

export default memo(function ({ navigation }: NativeStackScreenProps<AuthStackParamList, "ForgetPassword">) {
  const { isDarkmode, setTheme } = useTheme();
  const auth = getAuth();
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  async function handleForget() {
    setLoading(true);
    await sendPasswordResetEmail(auth, email)
      .then(function () {
        setLoading(false);
        navigation.navigate("Login");
        alert("Your password reset has been sent to your email");
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        setLoading(false);
      });
  }
  return (
    <KeyboardAvoidingView behavior="height" enabled style={forgetpasswordStyle.container}>
      <Layout>
        <View style={forgetpasswordStyle.imageContainer}>
          <Image
            resizeMode="contain"
            style={forgetpasswordStyle.image}
            source={require("../../../assets/images/forget.png")}
          />
        </View>
        <View style={forgetpasswordStyle.formContainer}>
          <Text size="h3" fontWeight="bold" style={forgetpasswordStyle.title}>
            Forget Password
          </Text>
          <Text>Email</Text>
          <TextInput
            containerStyle={forgetpasswordStyle.textInput}
            placeholder="Enter your email"
            value={email}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            onChangeText={(text) => setEmail(text)}
          />
          <Button
            text={loading ? "Loading" : "Send email"}
            onPress={() => {
              handleForget();
            }}
            style={forgetpasswordStyle.button}
            disabled={loading}
          />
          <View style={forgetpasswordStyle.row}>
            <Text size="md">Already have an account?</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Login");
              }}
            >
              <Text size="md" fontWeight="bold" style={{ marginLeft: 5 }}>
                Login here
              </Text>
            </TouchableOpacity>
          </View>
          <View style={forgetpasswordStyle.row}>
            <TouchableOpacity
              onPress={() => {
                isDarkmode ? setTheme("light") : setTheme("dark");
              }}
            >
              <Text size="md" fontWeight="bold" style={forgetpasswordStyle.themeButton}>
                {isDarkmode ? "☀️ light theme" : "🌑 dark theme"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Layout>
    </KeyboardAvoidingView>
  );
});
