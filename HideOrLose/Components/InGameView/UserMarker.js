// UserMarker.js
import React from 'react';
import { Circle } from 'react-native-svg';

const UserMarker = ({ screenWidth, userPosition }) => (
  <Circle
    cx={screenWidth / 2 + (screenWidth * 0.8) / 2 * Math.cos((userPosition - 90) * Math.PI / 180)}
    cy={screenWidth / 2 + (screenWidth * 0.8) / 2 * Math.sin((userPosition - 90) * Math.PI / 180)}
    r={10} // Rayon du cercle représentant l'utilisateur
    fill="red" // Couleur du cercle représentant l'utilisateur
  />
);

export default UserMarker;
