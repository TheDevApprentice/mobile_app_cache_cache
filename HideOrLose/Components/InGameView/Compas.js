// Compass.js
import React from 'react';
import { View, StyleSheet, Dimensions, Animated } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const Compass = ({ arrowRotation, colorsArray, strokeOffsets }) => {
  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={styles.container}>
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
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  boussolecontainer: {
    width: 300, 
    height: 300, 
    position: "relative",
    left: 0, 
    right: 0
  }
});

export default Compass;
