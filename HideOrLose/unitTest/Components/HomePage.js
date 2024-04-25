import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React,{useEffect} from "react"
import { useNavigation } from '@react-navigation/native';
import {firebase} from "../firebaseConfig";

export default function HomePage({socket}) {
  const navigation = useNavigation();

  useEffect(() => {
    socket.on('user-infos-request', ()=>{socket.emit('send-user-infos',{firebaseId: "a",username : "b"})});
  
    return ()=>{
      socket.off('user-infos-request', ()=>{socket.emit('send-user-infos',{firebaseId: "a",username : "b"})});
    }
  
  }, []);

  const JoinLobby = ()=>{
    socket.emit('join-room','1');
  }

  return (
    <View style = {styles.container}>

    <Text style ={styles.titleText}>Bonjour</Text>

    <TouchableOpacity
      style = {styles.button}
      onPress={()=> {
        JoinLobby();
        navigation.navigate("LobbyPage");
      }}
    >
      <Text style={styles.buttonText}>Jouer</Text>
    </TouchableOpacity>

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