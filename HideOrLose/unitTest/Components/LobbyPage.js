import { StyleSheet, Text, View, TouchableOpacity,ImageBackground, Button, Pressable} from 'react-native';
import React, {useEffect, useState} from "react"
import { useNavigation } from '@react-navigation/native';
import {firebase} from "../firebaseConfig";


export default function LobbyPage({socket}){
    const navigation = useNavigation();
    const [room,setRoom] = useState({name:'',users:[{name:''}]});

    useEffect(()=>{

        socket.on('update-lobby',(room)=>{setRoom(room)});

    },[])

    

    const ExitRoom= ()=>{
        socket.emit('leave-room','1')
    }
    return(
    <ImageBackground source={require('../assets/backgroundLobby.jpg')} style={styles.image}>
        <View>
            <TouchableOpacity onPress={()=>{ExitRoom(); navigation.navigate("HomePage");}}>
                <Text style={styles.quitButton}>Quitter</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.container}>
            <Text style={styles.containerTitle}>Lobby</Text>
            <Text style={styles.containerTitle}>{room.name}</Text>
        
            <View style={styles.PlayerList}>
                {room.users.map((key,user)=>(<Text key={key} style={styles.Player}>{user.name}</Text>))}
            </View>
    
            <TouchableOpacity>
                <Text style={styles.buttonReady}>Prêt</Text>
            </TouchableOpacity>
        </View>
    </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      marginTop: 50,
  },
    containerTitle:{
        alignItems: "center",
        marginTop: 50,
        marginBottom:50,
        fontSize: 100,
        fontWeight: "bold"
    },
    Player:{
        marginTop:20,
        borderWidth:1,
        borderRadius:5,
        paddingLeft:25,
        paddingRight:25,
        textAlign: 'center',
        fontSize:20

    },
    PlayerList:{
        
    },
    quitButton:{
        borderWidth: 1,
        backgroundColor: '#DC143C',
        borderRadius:5,
        marginLeft: 25,
        marginTop: 40,
        paddingTop: 2,
        fontSize: 20,
        width: 50,
        height: 30,
        textAlign: 'center',
    },
    image: {
        flex: 1,
        justifyContent: 'center',
        resizeMode: 'cover',
        width: '100%',
        height: '100%'
    },
    buttonReady:{
        fontSize:50,
        borderWidth:0,
        borderRadius:17,
        backgroundColor: 'green',
        paddingLeft:10,
        paddingRight:10,
        bottom:-170
    }
    
});