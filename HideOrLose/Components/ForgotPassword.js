import React, { useState } from 'react'
import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import {firebase} from "../firebaseConfig";
import { useNavigation } from '@react-navigation/native';

export default function ForgotPassword () {
    const [email, setEmail] = useState('');
    const navigation = useNavigation();

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <TextInput 
                  placeholder="Adresse courriel"
                  autoCorrect = {false}
                  keyboardType='email-address'
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
    )
}
