import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, Image, View, Dimensions, TouchableOpacity } from 'react-native';
import { Magnetometer } from 'expo-sensors';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import { Grid, Col, Row } from 'react-native-easy-grid';

export default function InGameView({socket}) {
  const navigation = useNavigation();
  const height = Dimensions.get('window').height;
  const width = Dimensions.get('window').width;
  const decallagePoints = ((width - 80) / 2) - 6;

  const [subscription, setSubscription] = useState(null);
  const [magnetometer, setMagnetometer] = useState(0);
  const [timer,setTimer]= useState(0);

  const [gameInfo, setGameInfo] = useState();

  const [locationPermission, setLocationPermission] = useState(true);

  const [myPosition, setMyPosition] = useState({ lattitude: null, longitude: null });
  const [room, setRoom] = useState({
    name: "", 
    gameIsActive: false, 
    users: [], 
    time: 999999999, 
    nbEliminated: 0
  }); // Information de la game en cours
  const [isHunter, setIsHunter] = useState(false);

  useEffect(() => {
    _requestLocationPermission();
    _subscribe();
    socket.on('is-hunter',()=>{setIsHunter(true)});
    socket.on('update-game',
      (room)=>{
        setRoom(room);
        if (locationPermission){
          _getCurrentLocation().then((coordinates)=>{
            socket.emit("user-game-update", coordinates);
          });
        }
      });
    socket.on("game-end", (won) => {
      setGameInfo(won);
      const today = new Date().toISOString().slice(0,10);
      try {
        const userId = firebase.auth().currentUser.uid;
        firebase.firestore().collection("Games").doc(firebase.auth().currentUser.uid).collection("Game").doc().set({today, won, userId});
        console.log("Donnée de partie sauvegardée avec succès!");
      } catch (error) {
        console.error("Erreur lors de la sauvegarde de la partie : ", error);
      }
    });
        
    return () => {
      _unsubscribe();
      socket.off('update-game');
      socket.off('is-hunter');
      socket.off('game-end');
    };
  }, []);

  const _requestLocationPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status === 'granted') {
      setLocationPermission(true);
    }
  };

  socket.on("update-game", (room)=>{
    setTimer(room.time);

});

  const timeFormat = (time) =>{

    const seconds = time % 60;
    const minutes = (time - seconds)/60;

    const minuteStr = minutes < 10 ? "0"+ minutes:minutes;
    const secondStr = seconds < 10 ? "0"+seconds:seconds;
    return minuteStr + ":" + secondStr;
  }

  const _subscribe = () => {
    setSubscription(
      Magnetometer.addListener((data) => {
        setMagnetometer(_angle(data));
      })
    );
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  const _getCurrentLocation = async () => {
    try {
      let { coords } = await Location.getCurrentPositionAsync({});
      console.log("Current Position:", coords);
      setMyPosition({ lattitude: coords.latitude, longitude: coords.longitude });
      return { lattitude: coords.latitude, longitude: coords.longitude };
    } catch (error) {
      console.error("Error getting current location:", error);
    }
  };

  const _angle = (magnetometer) => {
    let angle = 0;
    if (magnetometer) {
      let { x, y, z } = magnetometer;
      if (Math.atan2(y, x) >= 0) {
        angle = Math.atan2(y, x) * (180 / Math.PI);
      } else {
        angle = (Math.atan2(y, x) + 2 * Math.PI) * (180 / Math.PI);
      }
    }
    return Math.round(angle);
  };

  const _direction = (degree) => {
    if (degree >= 22.5 && degree < 67.5) {
      return 'NE';
    }
    else if (degree >= 67.5 && degree < 112.5) {
      return 'E';
    }
    else if (degree >= 112.5 && degree < 157.5) {
      return 'SE';
    }
    else if (degree >= 157.5 && degree < 202.5) {
      return 'S';
    }
    else if (degree >= 202.5 && degree < 247.5) {
      return 'SW';
    }
    else if (degree >= 247.5 && degree < 292.5) {
      return 'W';
    }
    else if (degree >= 292.5 && degree < 337.5) {
      return 'NW';
    }
    else {
      return 'N';
    }
  };

  const _degree = (radian) => {
    return radian * (180/Math.PI);
  };
 
  const _getUserDirection = (coordinate) => {
    if (myPosition.lattitude !== null && myPosition.longitude !== null && coordinate.lattitude !== null && coordinate.longitude !== null) {

      const dLon = myPosition.longitude - coordinate.longitude;

      y = Math.sin(dLon) * Math.cos(myPosition.lattitude);
      x = Math.cos(coordinate.lattitude) * Math.sin(myPosition.lattitude) - Math.sin(coordinate.lattitude)
          * Math.cos(myPosition.lattitude) * Math.cos(dLon);

      let brng = Math.atan2(y, x);
      brng = _degree(brng);
      brng = (brng + 360) % 360;
      brng = 360 - brng;

      return brng;
    }
    return 0;
  };

  return (
    <Grid style={{ backgroundColor: 'black' }}>
        <Row style={{ alignItems: 'center' }} size={.9}>
          <Col style={{ alignItems: 'center' }}>
          <Text style={styles.timer}>{timeFormat(timer)}</Text>
            <Text
              style={{
                color: '#fff',
                fontSize: height / 26,
                fontWeight: 'bold'
              }}>
                {isHunter ? 'Chasseur' : 'Chassé'}
            </Text>
            {gameInfo &&(
          <Text style={styles.endGameBanner}>{gameInfo ? 'Victoire':'Défaite'}</Text>
        )}
          </Col>
        </Row>

        <Row style={{ alignItems: 'center' }} size={.1}>
          <Col style={{ alignItems: 'center' }}>
            <View style={{ position: 'absolute', width: width, alignItems: 'center', top: 0 }}>
              <Image source={require('../../assets/compass_pointer.png')} style={{
                height: height / 26,
                resizeMode: 'contain'
              }} />
            </View>
          </Col>
        </Row>

        <Row style={{ alignItems: 'center' }} size={2}>
          <Col style={{ 
            alignItems: 'center', 
            justifyContent: 'center', 
            position: 'relative', 
            transform: [
                {
                  rotate: `${magnetometer - 360}deg`
                }
              ]
          }}>
            <Image source={require("../../assets/compass_bg.png")} style={{
              height: width - 80,
              justifyContent: 'center',
              alignItems: 'center',
              resizeMode: 'contain'
            }} />

            {/* Point indiquant la direction de l'user en game */}
            {room.users.map((user, key) => {
              if(user.ioId !== socket.id){
                return (
                  <View
                        key={key}
                        style={{
                          position: 'absolute',
                            transform: [
                              {
                                rotate: `${_getUserDirection(user.coordinate)}deg`
                              }
                            ]
                          }}
                        >
                          <View style={{
                            width: 15,
                            height: 15,
                            marginTop: -decallagePoints,
                            borderRadius: 7.5,
                            backgroundColor: 'red',
                          }}
                        />
                      </View>
                );
              }
            }
            )}
        </Col>
        </Row>

        <Row style={{ alignItems: 'center' }} size={1}>
          <Col style={{ alignItems: 'center' }}>
            <Text style={{ color: '#fff' }}>Nombre d'éliminés : {room.nbEliminated} / {room.users.length}</Text>
            {isHunter && (<TouchableOpacity 
                    style={{    
                      borderWidth: 1,
                      backgroundColor: '#DC143C',
                      borderRadius: 5,
                      paddingLeft: 5,
                      paddingRight: 5,
                      height: 40,
                      marginTop: 10, 
                      fontSize: 70, 
                      justifyContent: "center", 
                      alignContent: "center"
                    }}
                    onPress={()=>{socket.emit('eliminate-user')}}
                >
                    <Text style={{color:"white"}}>Jt'ai trouvé !</Text>
            </TouchableOpacity>)}
            
          </Col>
        </Row>
      </Grid>
  );
}
const styles = StyleSheet.create({
  timer: {
    fontSize:50, 
    color: "white"
  },
  endGameBanner: {
    color: "white"
  }
})