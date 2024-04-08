import React, { memo, useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  ScrollView,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Image,
  Platform,
} from "react-native";
import { AuthStackParamList } from "../../utils/Types/navigation";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  Layout,
  Text,
  TextInput,
  Button,
  useTheme,
  themeColor,
} from "react-native-rapi-ui";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import * as Location from 'expo-location';

export default memo(function ({
  navigation,
}: NativeStackScreenProps<AuthStackParamList, "Register">) {
  const { isDarkmode, setTheme } = useTheme();
  const auth = getAuth();
  const firestore = getFirestore();

  const [email, setEmail] = useState<string>("");
  const [userType, setUserType] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordVerification, setPasswordVerification] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedType, setSelectedType] = useState<string>("");
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [passwordError, setPasswordError] = useState<string>("");

  useEffect(() => {
    (async () => {
      if (Platform.OS === 'android' && !(await Location.isBackgroundLocationAvailableAsync())) {
        return;
      }
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  async function register() {
    setLoading(true);

    if (password !== passwordVerification) {
      setPasswordError("Passwords do not match");
      setLoading(false);
      return;
    }

    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;

        await setDoc(doc(firestore, "users", user.uid), {
          firstName: firstName,
          lastName: lastName,
          email: email,
          uid: user.uid,
          type: userType,
          avatar: "https://sm.ign.com/t/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.300.jpg",
          transactions: [],
          badges: [],
          cart: [],
          location: location ? { latitude: location.coords.latitude, longitude: location.coords.longitude } : null,
        });
      })
      .catch(function (error: any) {
        var errorMessage = error.message;
        setLoading(false);
      });
  }

  return (
    <KeyboardAvoidingView behavior="height" enabled style={{ flex: 1 }}>
      <Layout>
        <View
          style={{
            flexGrow: 1,
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: isDarkmode ? "#17171E" : themeColor.white100,
              height:"100%"
            }}
          >
            <Image
              resizeMode="contain"
              style={{
                height: 200,
                width: 240,
              }}
              source={require("../../../assets/images/register.png")}
            />
          </View>
          <View
            style={{
              flex: 3,
              paddingHorizontal: 20,
              paddingBottom: 10,
              backgroundColor: isDarkmode ? themeColor.dark : themeColor.white,
              position: "relative", top: -10
            }}
          >
            <Text
              fontWeight="bold"
              size="h3"
              style={{
                alignSelf: "center",
                padding: 30,
                position: "relative", top: -20
              }}
            >
              Register
            </Text>

            <View style={{ flexDirection: "column", justifyContent: "center", position: "relative", top: -20, marginBottom: 0}}>
              <View style={{ flexDirection: "row", justifyContent: "center", marginBottom: 10}}>
                <Button
                  text="Farmer"
                    onPress={() => {
                      setUserType("farmer");
                      setSelectedType("farmer");
                    }}
                    style={{ marginRight: 10, backgroundColor: selectedType === "farmer" ? "#007bff" : "#ffffff", borderColor: "#007bff" }}
                  color={selectedType === "farmer" ? "#48cae4" : "#023e8a"}
                />
                <Button
                  text="Customer"
                    onPress={() => {
                      setUserType("customer");
                      setSelectedType("customer");
                    }}
                    style={{ marginLeft: 10, backgroundColor: selectedType === "customer" ? "#007bff" : "#ffffff", borderColor: "#007bff" }}
                  color={selectedType === "customer" ? "#48cae4" : "#023e8a"}
                />
              </View>

              <View style={{ flexDirection: "row", marginTop: 10}}>
                <View style={{ flex: 1, marginRight: 10 }}>
                  <Text>First Name</Text>
                  <TextInput
                    containerStyle={{ marginTop: 15 }}
                    placeholder="First name"
                    value={firstName}
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={(text) => setFirstName(text)}
                  />
                </View>
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text>Last Name</Text>
                  <TextInput
                    containerStyle={{ marginTop: 15 }}
                    placeholder="Last name"
                    value={lastName}
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={(text) => setLastName(text)}
                  />
                </View>
              </View>

              <Text style={{ marginTop: 15 }}>Email</Text>
              <TextInput
                containerStyle={{ marginTop: 15 }}
                placeholder="Enter your email"
                value={email}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                onChangeText={(text) => setEmail(text)}
              />

              <View style={{ flexDirection: "row", marginTop: 15 }}>
                <View style={{ flex: 1, marginRight: 10 }}>
                  <Text>Password</Text>
                  <TextInput
                    containerStyle={{ marginTop: 15 }}
                    placeholder="Enter your password"
                    value={password}
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={true}
                    onChangeText={(text) => setPassword(text)}
                  />
                  {passwordError && <Text style={{ color: 'red' }}>{passwordError}</Text>}
                </View>
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text>Confirm Password</Text>
                  <TextInput
                    containerStyle={{ marginTop: 15 }}
                    placeholder="Confirm your password"
                    value={passwordVerification}
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={true}
                    onChangeText={(text) => setPasswordVerification(text)}
                  />
                  {passwordError && <Text style={{ color: 'red' }}>{passwordError}</Text>}
                </View>
              </View>

              <Button
                text={loading ? "Loading" : "Create an account"}
                onPress={() => {
                  register();
                }}
                style={{
                  marginTop: 20
                }}
                disabled={loading}
              />
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 15,
                justifyContent: "center",
              }}
            >
              <Text size="md">Already have an account?</Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Login");
                }}
              >
                <Text
                  size="md"
                  fontWeight="bold"
                  style={{
                    marginLeft: 5,
                  }}
                >
                  Login here
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 30,
                justifyContent: "center",
              }}
            >
            </View>
          </View>
        </View>
      </Layout>
    </KeyboardAvoidingView>
  );
})
