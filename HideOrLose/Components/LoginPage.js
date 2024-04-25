import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import React, {useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import {firebase} from "../firebaseConfig";

export default function LoginPage() {
    const navigation = useNavigation();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({}); 
    const [isFormValid, setIsFormValid] = useState(false);

    const Validate = () => {
        let errors = {};

        if (!/\S+@\S+\.\S+/.test(email) && email != "") {
            errors.email = 'Le format du email n\'est pas valide';
        }

        if (!password) {
          errors.password = 'Veuillez entrer votre mot de passe!';
        }

        setErrors(errors);
        setIsFormValid(Object.keys(errors).length === 0);
    }

    const handleLogin = async () => {
        try {
          await firebase.auth().signInWithEmailAndPassword(email, password);
          setEmail('');
          setPassword('');
          navigation.navigate("HomePage");
        } catch (error) {
            if (error.message == "Firebase: The supplied auth credential is incorrect, malformed or has expired. (auth/invalid-credential).")
            {
                alert("Le courriel ou le mot de passe est invalide!");
            }
        }
      };

    return (
        <ImageBackground source={require('../assets/loginBackground.jpg')} style={styles.image}>
            <View style={styles.container}>
              <Text style= {styles.titleText}>Connexion</Text>
              <View style={{marginTop:40}}>
              <TextInput 
                  style={styles.textInput}
                  placeholder="Adresse courriel"
                  autoCorrect = {false}
                  keyboardType='email-address'
                  onChangeText = {(email) => setEmail(email)}
                  value = {email}
              />
              <Text style={styles.error}> 
                {errors.email} 
              </Text>
              <TextInput 
                  style={styles.textInput}
                  placeholder="Mot de passe"
                  autoCorrect = {false}
                  secureTextEntry={true}
                  onChangeText = {(password) => setPassword(password)}
                  value = {password}
              />
              <Text style={styles.error}> 
                {errors.password} 
              </Text>
              </View>
              <TouchableOpacity 
                  style={styles.button}
                  onPress={() => {
                    Validate();
                    if (isFormValid) {
                        handleLogin();
                    }
                  }}
              >
                  <Text style = {styles.buttonText}>Se connecter</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                  style={{marginTop:20}}
                  onPress={()=>navigation.navigate("RegisterPage")}
              >
                  <Text style = {styles.SecondaryButtonText}>Créer un compte</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                  style={{marginTop:20}}
                  onPress={()=>navigation.navigate("ForgotPassword")}
              >
                  <Text style = {styles.SecondaryButtonText}>Mot de passe oublié?</Text>
              </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        marginTop: 100
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
        marginTop: 40,
        height: 70,
        width: 250,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F4A460",
        borderRadius: 50
    },
    buttonText: {
        fontWeight: "bold",
        fontSize: 22
    },
    SecondaryButtonText: {
        fontWeight: "bold",
        fontSize: 16,
        textDecorationLine: 'underline'
    },
    image: {
        flex: 1,
        justifyContent: 'center',
        resizeMode: 'cover',
        width: '100%',
        height: '100%'
    }
});