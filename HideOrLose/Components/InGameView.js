import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, Animated, Easing, Dimensions } from 'react-native';
import { Magnetometer, Gyroscope, Accelerometer } from 'expo-sensors';
import { useNavigation } from '@react-navigation/native';
import { requestForegroundPermissionsAsync, watchPositionAsync, Accuracy } from 'expo-location';
import Svg, { Circle, Polygon } from 'react-native-svg';
import {firebase} from "../firebaseConfig";

export default function InGameView({socket}) {

  const navigation = useNavigation();

  const [magnetometerData, setMagnetometerData] = useState({});
  const [arrowRotation, setArrowRotation] = useState(0);
  const [arrowPosition, setArrowPosition] = useState({ x: 0, y: 0 });
  const [userLocation, setUserLocation] = useState(null);
  const [gameInfo, setGameInfo] = useState("");
  const targetLocation = { latitude: 40.7128, longitude: -74.0060 };

  useEffect(() => {
    const requestLocationPermission = async () => {
      const { status } = await requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const subscription = watchPositionAsync(
          {
            accuracy: 6,
            timeInterval: 1000,
            distanceInterval: 10,
          },
          location => {
            setUserLocation(location.coords);
          }
        );

        return () => {
          subscription.remove();
        };
      } else {
        console.log('Permission denied for location access');
      }
    };
    requestLocationPermission();

    Magnetometer.addListener(data => {
      const { x, y, z } = data;
      const rotation = Math.atan2(y, x) * (180 / Math.PI);
      setArrowRotation(rotation);
    });

    socket.on("game-end", (won) => {
      setGameInfo(won);
      const today = Date.now();
      
      try {
        const userId = firebase.auth().currentUser.uid;
        const gameInfos = firebase.firestore().collection("Game");

        gameInfos.set({
          date: today,
          asWin: gameInfo,
          userId: userId
        });
        console.log("Donnée de partie sauvegardée avec succès!");
      } catch (error) {
        console.error("Erreur lors de la sauvegarde de la partie : ", error);
      }
    });

    return () => {
      Gyroscope.removeAllListeners();

      socket.off("game-end");
   };
  }, []);
  

  const updateArrowPosition = (data) => {
    if (!userLocation) return;
    const { latitude, longitude } = userLocation;
    const angle = data?.magneticHeading || 0;
    const radius = 150;

    const x = screenWidth / 2 + radius * Math.cos(angle * Math.PI / 180); // Conversion degrés en radians
    const y = screenWidth / 2 + radius * Math.sin(angle * Math.PI / 180); // Conversion degrés en radians

    setArrowPosition({ x, y });
  };

  const timeFormat = (time) =>{

    const seconds = time % 60;
    const minutes = (time - seconds)/60;

    const minuteStr = minutes < 10 ? "0"+ minutes:minutes;
    const secondStr = seconds < 10 ? "0"+seconds:seconds;
    return minuteStr + ":" + secondStr;
  }

  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  return (
    <ImageBackground source={require('../assets/backgroundLobby.jpg')} style={styles.image}>
      <View style={styles.container}>
        <View style={styles.container_infos}>
          <TouchableOpacity style={styles.quitButton} onPress={() => navigation.goBack()}>
            <Text>Exit</Text>
          </TouchableOpacity>
          <Text>{timeFormat(timer)}</Text>
          <Text style={styles.containerTitle}>Chasseur</Text>
        </View>
        
        <Animated.View style={[styles.arrowContainer, { transform: [{ rotate: `${arrowRotation}deg` }] }]}>
          <Svg
            height={screenWidth * 0.8}
            width={screenWidth * 0.8}
            viewBox={`0 0 ${screenWidth} ${screenWidth}`}
            style={styles.boussolecontainer}
          >
            <Circle
              cx={screenWidth / 2}
              cy={screenWidth / 2}
              r={(screenWidth * 0.8) / 2}
              stroke="black"
              strokeWidth="2"
              fill="transparent"
            />
              <Polygon
                points={`${screenWidth / 2},${screenWidth / 2} ${screenWidth / 2 - 10},${screenWidth / 2 + 20} ${screenWidth / 2 + 10},${screenWidth / 2 + 20}`}
                fill="black"
              />
          </Svg>
        </Animated.View>
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

  container_infos: {

  },
  containerTitle: {
    position: "relative",
    top: -40,
    alignItems: "center",
    marginTop: 50,
    marginBottom: 50,
    fontSize: 70,
    fontWeight: "bold"
  },
  quitButton: {
    borderWidth: 1,
    backgroundColor: '#DC143C',
    borderRadius: 5,
    paddingLeft: 5,
    paddingRight: 5,
    fontSize: 20
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    resizeMode: 'cover',
    width: '100%',
    height: '100%'
  },
  boussolecontainer: {
    width: 300, 
    height: 300, 
    position: "relative",
    left: 0, 
    right: 0
  },
  arrow: {
  }
});
