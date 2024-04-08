// import { useState } from "react";
// import { Animated } from 'react-native';

// export const springValue = useState(new Animated.Value(0))[0];

// const spring = () => {
//     Animated.spring(springValue, {
//       toValue: 1.05,
//       friction: 1,
//       tension: 50,
//       velocity: 2, 
//       useNativeDriver: true,
//     }).start(() => {
//       Animated.spring(springValue, {
//         toValue: 1,
//         useNativeDriver: true,
//       }).start();
//     });
//   };