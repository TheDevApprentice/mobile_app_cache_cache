import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, Animated, Dimensions } from 'react-native';
import { Magnetometer, Gyroscope, Accelerometer } from 'expo-sensors';
import { useNavigation } from '@react-navigation/native';
import { requestForegroundPermissionsAsync, watchPositionAsync, Accuracy } from 'expo-location';
import Svg, { Circle, Path } from 'react-native-svg';

export default function InGameView() {
  const navigation = useNavigation();
  const [arrowRotation, setArrowRotation] = useState(0);
  const [userLocation, setUserLocation] = useState(null);
  const [circleAnimation] = useState(new Animated.Value(0));
  const [colorsArray, setColorsArray] = useState(['#FF0000', '#00FF00', '#0000FF']);
  const [strokeOffsets, setStrokeOffsets] = useState([]);

  useEffect(() => {
    const requestLocationPermission = async () => {
      const { status } = await requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const subscription = watchPositionAsync(
          {
            accuracy: Accuracy.High,
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
      const { x, y } = data;
      const rotation = Math.atan2(y, x) * (180 / Math.PI);
      setArrowRotation(rotation);
    });

    animateCircle();

    return () => {
      Gyroscope.removeAllListeners();
    };
  }, []);

  const animateCircle = () => {
    const circleColorsAnimation = colorsArray.map((color, index) => {
      return Animated.timing(circleAnimation, {
        toValue: (index + 1) / colorsArray.length,
        duration: 1000,
        useNativeDriver: true
      });
    });

    Animated.sequence(circleColorsAnimation).start();
  };

  useEffect(() => {
    const offsets = colorsArray.map((color, index) => {
      return circleAnimation.interpolate({
        inputRange: [(index) / colorsArray.length, (index + 1) / colorsArray.length],
        outputRange: [(index) * 100, (index + 1) * 100]
      });
    });

    setStrokeOffsets(offsets);
  }, [circleAnimation, colorsArray]);

  const screenWidth = Dimensions.get('window').width;

  return (
    <ImageBackground source={require('../assets/backgroundLobby.jpg')} style={styles.image}>
      <View style={styles.container}>
        <View style={styles.container_infos}>
          <TouchableOpacity style={styles.quitButton} onPress={() => navigation.goBack()}>
            <Text>Exit</Text>
          </TouchableOpacity>
          <Text style={styles.containerTitle}>Chasseur</Text>
        </View>
        
        <Svg
          height={screenWidth * 0.8}
          width={screenWidth * 0.8}
          viewBox={`0 0 ${screenWidth} ${screenWidth}`}
          style={[styles.boussolecontainer, { transform: [{ rotate: `${arrowRotation}deg` }] }]}
        >
          {colorsArray.map((color, index) => (
            <Path
              key={index}
              d={describeArc(screenWidth / 2, screenWidth / 2, (screenWidth * 0.8) / 2, -235, 360 / colorsArray.length)}
              fill="transparent"
              stroke={color}
              strokeWidth="20"
              strokeDasharray={[1000, 1000]}
              strokeDashoffset={strokeOffsets[index]}
            />
          ))}
        </Svg>
      </View>
    </ImageBackground>
  );
}

const describeArc = (x, y, radius, startAngle, endAngle) => {
  const startRadians = (startAngle - 90) * Math.PI / 180;
  const endRadians = (endAngle - 90) * Math.PI / 180;

  const largeArcFlag = endRadians - startRadians <= Math.PI ? "0" : "1";

  const startX = x + radius * Math.cos(startRadians);
  const startY = y + radius * Math.sin(startRadians);
  const endX = x + radius * Math.cos(endRadians);
  const endY = y + radius * Math.sin(endRadians);

  const arc = [
    "M", startX, startY,
    "A", radius, radius, 0, largeArcFlag, 1, endX, endY
  ].join(" ");

  return arc;
};

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
  }
});
