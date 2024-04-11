import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TextInput, Image } from 'react-native';
import React, {useEffect, useState} from "react"
import { useNavigation } from '@react-navigation/native';
import {firebase} from "../firebaseConfig";

export default function DashboardPage() {
  const navigation = useNavigation();
  return (
    <View style = {styles.container}>

    <Text style ={styles.titleText}>Bonjour</Text>

    <TouchableOpacity
      style = {styles.button}
      onPress={()=> {
        firebase.auth().signOut(); 
        navigation.navigate("LoginPage");
      }}
    >
      <Text style={styles.buttonText}>Se déconnecter</Text>
    </TouchableOpacity>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 100,
},
titleText: {
    fontSize: 26,
    fontWeight: "bold",
    marginLeft: 10,
    marginTop: 10
},
button: {
    marginTop: 20,
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
});