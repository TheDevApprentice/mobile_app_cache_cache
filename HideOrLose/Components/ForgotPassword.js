import React, { useState } from 'react'
import {StyleSheet, Text, View, TouchableOpacity, TextInput,ImageBackground } from 'react-native';
import {firebase} from "../firebaseConfig";
import { useNavigation } from '@react-navigation/native';

export default function ForgotPassword () {
    const [email, setEmail] = useState('');
    const navigation = useNavigation();

    return (
      <ImageBackground source={require('../assets/loginBackground.jpg')} style={styles.image}>

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <TextInput 
                  placeholder="Adresse courriel"
                  autoCorrect = {false}
                  keyboardType='email-address'
                  style={styles.textInput}
                  onChangeText = {(email) => setEmail(email)}
              />
        <TouchableOpacity
          onPress={() => {
            firebase.auth().sendPasswordResetEmail(email).then(
                alert("Courriel envoyé", "Veuillez vérifier votre boîte de réception pour réinitialiser votre mot de passe.")
              ).catch((error) => {
                alert('Erreur', error.message);
              });
            navigation.nagivate("LoginPage");
          }}
        >
          <Text>Réinitialiser votre mot de passe</Text>
        </TouchableOpacity>
      </View>
      </ImageBackground>
    )
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: 'center',
    resizeMode: 'cover',
    width: '100%',
    height: '100%'
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
  }
});