import { StyleSheet, Text, View, TouchableOpacity,ImageBackground, Button, Pressable, Dimensions} from 'react-native';
import React, {useEffect, useState} from "react"
import { useNavigation } from '@react-navigation/native';

export default function LobbyPage({socket}){
    const navigation = useNavigation();
    const [room, setRoom] = useState({name:'',users:[{name:''}]});
    
    useEffect(()=>{
        socket.on('update-lobby',(room)=>{setRoom(room)});

        return ()=>{
            socket.off('update-lobby');
          }
    },[])

    const ExitRoom= ()=>{
        socket.emit('leave-room','1')
    }

    const SendReadyNotification= ()=>{
        socket.emit('switch-ready')
    }

    socket.on('everyone-ready',()=>{navigation.navigate("InGameView")});

    return(
    <ImageBackground source={require('../assets/backgroundLobby.jpg')} style={styles.image}>
        <View>
            <TouchableOpacity onPress={()=>{ExitRoom(); navigation.navigate("HomePage");}}>
                <Text style={styles.quitButton}>Quitter</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.container}>
            <Text style={styles.containerTitle}>Lobby</Text>
            <Text style={styles.roomTitle}>{room.name}</Text>
        
            <View style={styles.PlayerList}>
                {room.users.map((user, key)=>(
                <Text key={key} style={[styles.Player, { backgroundColor: user.ready ? 'green' :'transparent' }]}>
                    {user.name} 
                </Text>))}
                
            </View>
        </View>
        <TouchableOpacity onPress={()=>{
            SendReadyNotification(); 
        }}>
            <Text style={[styles.buttonReady]}>Prêt</Text>
        </TouchableOpacity>
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
        marginTop: 40,
        marginLeft: 10,

        marginBottom:2,
        fontSize: 75,
        fontWeight: "bold"
    },
    roomTitle:{
        alignItems: "center",
        marginTop: 2,
        marginLeft: 10,
        marginBottom:50,
        fontSize: 50,
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
        margin:2,
        padding: 2,
        fontSize: 20,
        width: 80,
        height: 38,
        textAlignVertical: "center",
        textAlign: "center"
    },
    image: {
        flex: 1,
        position: 'relative',
        justifyContent: 'center',
        resizeMode: 'cover',
        width: '100%',
        height: '100%'
    },
    buttonReady:{
        height: Dimensions.get("screen").height * 0.1,
        width : Dimensions.get("screen").width * 0.35,
        position: 'absolute',
        bottom: 130,
        fontSize:50,
        borderRadius: 10,
        backgroundColor: 'green',
        alignSelf: "center",
        textAlign: "center",
        textAlignVertical: 'center'
    }
    
});