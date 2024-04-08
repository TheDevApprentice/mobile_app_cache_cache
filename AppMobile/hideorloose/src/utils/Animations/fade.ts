import { useRef } from "react";
import { Animated } from 'react-native';

export const fadeAnim = useRef(new Animated.Value(0)).current;

export const fadeIn = () => {
  Animated.timing(fadeAnim, {
    toValue: 1,
    duration: 400,
    useNativeDriver: true,
  }).start();
};

export const fadeOut = () => {
  Animated.timing(fadeAnim, {
    toValue: 0,
    duration: 400,
    useNativeDriver: true,
  }).start();
};