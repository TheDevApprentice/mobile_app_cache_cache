import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, Image, View, Dimensions } from 'react-native';
import { Magnetometer } from 'expo-sensors';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import { Grid, Col, Row } from 'react-native-easy-grid';

export default function InGameView() {
  const navigation = useNavigation();
  const height = Dimensions.get('window').height;
  const width = Dimensions.get('window').width;

  const [subscription, setSubscription] = useState(null);
  const [magnetometer, setMagnetometer] = useState(0);

  const [locationPermission, setLocationPermission] = useState(false);

  const [myPosition, setMyPosition] = useState({ latitude: null, longitude: null });
  const [otherUserPosition, setOtherUserPosition] = useState({ latitude: 43.598079, longitude: -51.660771 }); // Position d'un autre utilisateur
  
  useEffect(() => {
    _requestLocationPermission();
    _subscribe();
    return () => {
      _unsubscribe();
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
        setMagnetometer(_angle(data));
      })
    );
    _getCurrentLocation();
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  const _getCurrentLocation = async () => {
    try {
      let { coords } = await Location.getCurrentPositionAsync({});
      console.log("Current Position:", coords);
      setMyPosition({ latitude: coords.latitude, longitude: coords.longitude });
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

  const _getUserDirection = () => {
    if (myPosition.latitude !== null && myPosition.longitude !== null && otherUserPosition.latitude !== null && otherUserPosition.longitude !== null) {
      // Calculate the angle between my position and the other user's position
      const userAngle = Math.atan2(
        otherUserPosition.latitude - myPosition.latitude,
        otherUserPosition.longitude - myPosition.longitude
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
    <Grid style={{ backgroundColor: 'black' }}>
      <Row style={{ alignItems: 'center' }} size={.9}>
        <Col style={{ alignItems: 'center' }}>
          <Text
            style={{
              color: '#fff',
              fontSize: height / 26,
              fontWeight: 'bold'
            }}>
            {_direction(_degree(magnetometer))}
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
        <Col style={{ alignItems: 'center', position: 'relative' }}>
          <Image source={require("../../assets/compass_bg.png")} style={{
            height: width - 80,
            justifyContent: 'center',
            alignItems: 'center',
            resizeMode: 'contain',
            transform: [{ rotate: 360 - magnetometer + 'deg' }]
          }} />

          {/* Fleche indiquant la direction de l' */}
          <View style={{
              width: 0,
              height: 0,

              position: 'absolute',
              // left:  `${50  * Math.PI / 180 * 50}%`,
              // top: `${50  * Math.PI / 180 * 50}%`,
              
              borderLeftWidth: 10,
              borderLeftColor: 'transparent',
              borderRightWidth: 10,
              borderRightColor: 'transparent',
              borderBottomWidth: 20,
              borderBottomColor: 'red',
              transform: [
                {
                  rotate: `${_getUserDirection() * 360 - magnetometer}deg`
                }
              ]
            }}
          />
      </Col>
      </Row>

      <Row style={{ alignItems: 'center' }} size={1}>
        <Col style={{ alignItems: 'center' }}>
          <Text style={{ color: '#fff' }}>The dev team</Text>
        </Col>
      </Row>
    </Grid>
  );
}