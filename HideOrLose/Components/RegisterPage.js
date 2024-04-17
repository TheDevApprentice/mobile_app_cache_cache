import { StyleSheet, Text, View, TouchableOpacity, TextInput, ImageBackground } from 'react-native';
import React, {useState, useEffect} from 'react';
import {firebase} from "../firebaseConfig";
import { useNavigation } from '@react-navigation/native';

export default function RegistrationPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({}); 
  const [isFormValid, setIsFormValid] = useState(false);
  const navigation = useNavigation();

  const validateForm = () => {
    let errors = {};

    if (!firstName) {
      errors.firstName = 'Le prenom est obligatoire';
    }

    if (!lastName) {
      errors.lastName = 'Le nom est obligatoire';
    }

    if (!email) {
      errors.email = 'L\'email est obligatoire';
    } else if (!/\S+@\S+\.\S+/.test(email) && email != "") {
      errors.email = 'Le format du email n\'est pas valide';
    }

    if (!password) {
      errors.password = 'Le mot de passe est obligatoire';
    } else if (password.length < 6 && password != "") {
      errors.password = 'Le mot de passe doit contenir au \n moins 6 caractères';
    }

    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  }


  if (isFormValid) {
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
          <Text style={styles.error}> 
            {errors.firstName} 
          </Text> 
          <TextInput
            style={styles.textInput}
            placeholder= "Nom"
            onChangeText = {(lastName) => setLastName(lastName)}
          />
          <Text style={styles.error}> 
            {errors.lastName} 
          </Text> 
          <TextInput
            style={styles.textInput}
            placeholder= "Adresse courriel"
            keyboardType='email-address'
            onChangeText = {(email) => setEmail(email)}
          />
          <Text style={styles.error}> 
            {errors.email} 
          </Text> 
          <TextInput
            style={styles.textInput}
            placeholder="Mot de passe"
            secureTextEntry={true}
            onChangeText = {(password) => setPassword(password)}
          />
          <Text style={styles.error}> 
            {errors.password} 
          </Text> 
        </View>
        <TouchableOpacity
          style= {styles.button}
          onPress={() => {
            validateForm();
            if (isFormValid) {
              registerUser(email, password, firstName, lastName); navigation.navigate("LoginPage");
            }
          }}
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
},
error: { 
  color: 'red', 
  fontSize: 15,
  justifyContent: 'center',
  marginLeft: 25
},
});