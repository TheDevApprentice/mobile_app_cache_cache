import { StyleSheet, Text, View, TouchableOpacity, TextInput, ImageBackground } from 'react-native';
import React, {useState} from 'react';
import {firebase} from "../firebaseConfig";
import { useNavigation } from '@react-navigation/native';

export default function RegistrationPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  registerUser = async (email, password, firstname, lastname) => {
    await firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(() => {
      firebase.firestore().collection("Users").doc(firebase.auth().currentUser.uid).set({firstname, lastname, email})
    .then(() => {
      firebase.auth().currentUser.sendEmailVerification({
        handleCodeInApp: true,
        url: "https://hideorloose.firebaseapp.com"
        });
      });
    })
    .catch((error) => {
      alert(error.message);
    });
  }
  return (
    <ImageBackground source={require('../assets/loginBackground.jpg')} style={styles.image}>
      <View style={styles.container}>
        <Text style={styles.titleText}>Créer un compte ici</Text>
        <View style={{marginTop:40}}>
          <TextInput
            style = {styles.textInput}
            placeholder = "Prenom"
            onChangeText = {(firstName) => setFirstName(firstName)}
          />
          <TextInput
            style={styles.textInput}
            placeholder= "Nom"
            onChangeText = {(lastName) => setLastName(lastName)}
          />
          <TextInput
            style={styles.textInput}
            placeholder= "Adresse courriel"
            keyboardType='email-address'
            onChangeText = {(email) => setEmail(email)}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Mot de passe"
            secureTextEntry={true}
            onChangeText = {(password) => setPassword(password)}
          />
        </View>
        <TouchableOpacity
          style= {styles.button}
          onPress={() => {registerUser(email, password, firstName, lastName); navigation.navigate("LoginPage");}}
        >
          <Text style={{fontWeight: 'bold', fontSize: 22}}>Créer un compte</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 100,
},
textInput: {
    paddingTop: 20,
    paddingBottom: 10,
    width: 250,
    fontSize: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    marginBottom: 10,
    textAlign: "center"
},
titleText: {
    fontSize: 26,
    fontWeight: "bold",
    marginLeft: 10,
    marginTop: 10
},
button: {
    marginTop: 50,
    height: 70,
    width: 250,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F4A460",
    borderRadius: 50
},
image: {
    flex: 1,
    justifyContent: 'center',
    resizeMode: 'cover',
    width: '100%',
    height: '100%'
}
});