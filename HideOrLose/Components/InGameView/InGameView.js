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

  const [subscription, setSubscription] = useState(null);
  const [magnetometer, setMagnetometer] = useState(0);

  const [locationPermission, setLocationPermission] = useState(false);

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
      socket.on('update-game',
      (room)=>{
        setRoom(room); 
        socket.emit("user-game-update", {myPosition}); 
      });
      socket.on('is-hunter',()=>{setIsHunter(true)});
      // console.log(room)
    return () => {
      _unsubscribe();
      socket.off('update-game');
      socket.off('is-hunter');
    };
  }, []);

  const _requestLocationPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status === 'granted') {
      setLocationPermission(true);
    }
  };

  const _subscribe = () => {
    setSubscription(
      Magnetometer.addListener((data) => {
        _getCurrentLocation();

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
      // console.log("Current Position:", coords);
      setMyPosition({ lattitude: coords.latitude, longitude: coords.longitude });
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

  const _degree = (magnetometer) => {
    return magnetometer - 90 >= 0 ? magnetometer - 90 : magnetometer + 271;
  };
 
  const _getUserDirection = (coordinate) => {
    if (myPosition.lattitude !== null && myPosition.longitude !== null && coordinate.lattitude !== null && coordinate.longitude !== null) {
      // Calculate the angle between my position and the other user's position
      const userAngle = Math.atan2(
        coordinate.lattitude - myPosition.lattitude,
        coordinate.longitude - myPosition.longitude
      ) * (180 / Math.PI);
  
      // Calculate the difference between userAngle and magnetometer angle
      const userDirection = userAngle - magnetometer;
  
      // Adjust userDirection based on the current rotation of the phone
      const adjustedDirection = userDirection + _degree(magnetometer);
  
      // Return the adjusted user direction
      return adjustedDirection >= 0 ? adjustedDirection : 360 + adjustedDirection;
    }
    return 0;
  };

  return (
    isHunter ? (
      <Grid style={{ backgroundColor: 'black' }}>
        <Row style={{ alignItems: 'center' }} size={.9}>
          <Col style={{ alignItems: 'center' }}>
            <Text
              style={{
                color: '#fff',
                fontSize: height / 26,
                fontWeight: 'bold'
              }}>
                Chasseur
            </Text>
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
                  rotate: `${360 - magnetometer}deg`
                }
              ]
          }}>
            <Image source={require("../../assets/compass_bg.png")} style={{
              height: width - 80,
              justifyContent: 'center',
              alignItems: 'center',
              resizeMode: 'contain',
              // transform: [{ rotate: 360 - magnetometer + 'deg' }]
            }} />

            {/* Point indiquant la direction de l'user en game */}
            {room.users.map((user) => {
              // {console.log(user)}
                        <View 
                        style={{
                          position: 'absolute',
                            transform: [
                              {
                                rotate: `${_getUserDirection(user.coordinate) }deg`
                              }
                            ]
                          }}
                        >
                          <View style={{
                            width: 15,
                            height: 15,
                            marginTop: -136,
                            borderRadius: 7.5,
                            backgroundColor: 'red',
                          }}
                        />
                      </View>
            })}
        </Col>
        </Row>

        <Row style={{ alignItems: 'center' }} size={1}>
          <Col style={{ alignItems: 'center' }}>
            <Text style={{ color: '#fff' }}>Nombre d'éliminés : {room.nbEliminated} / {room.users.length}</Text>
            <TouchableOpacity 
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
            </TouchableOpacity>
            
          </Col>
        </Row>
      </Grid>
    )
    : 
    (
      <Grid style={{ backgroundColor: 'black' }}>
      <Row style={{ alignItems: 'center' }} size={.9}>
        <Col style={{ alignItems: 'center' }}>
          <Text
            style={{
              color: '#fff',
              fontSize: height / 26,
              fontWeight: 'bold'
            }}>
              Chassé
          </Text>
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
                rotate: `${360 - magnetometer}deg`
              }
            ]
         }}>
          <Image source={require("../../assets/compass_bg.png")} style={{
            height: width - 80,
            justifyContent: 'center',
            alignItems: 'center',
            resizeMode: 'contain',
            // transform: [{ rotate: 360 - magnetometer + 'deg' }]
          }} />

          {/* Point indiquant la direction de l'user en game */}
          {room.users.map((user) => {
            {console.log(user)}
                      <View 
                      style={{
                        position: 'absolute',
                          transform: [
                            {
                              rotate: `${_getUserDirection(user.coordinate) }deg`
                            }
                          ]
                        }}
                      >
                        <View style={{
                          width: 15,
                          height: 15,
                          marginTop: -136,
                          borderRadius: 7.5,
                          backgroundColor: 'red',
                        }}
                      />
                     </View>
          })}
      </Col>
      </Row>

      <Row style={{ alignItems: 'center' }} size={1}>
        <Col style={{ alignItems: 'center' }}>
          <Text style={{ color: '#fff' }}>Nombre d'éliminés : {room.nbEliminated} / {room.users.length}</Text>
        </Col>
      </Row>
      </Grid>
    )

  );
}