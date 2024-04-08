// CardPaymentRegistered.tsx
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { cardStyle } from '../../Styles/Card/CardStyle';
import { Ionicons } from '@expo/vector-icons';
import { themeColor, useTheme } from 'react-native-rapi-ui';

type CardPaymentRegisteredProps = {
  cardNumber: string;
  expirationDate: string;
  ccv: string;
}

const CardPaymentRegistered: React.FC<CardPaymentRegisteredProps> = ({ cardNumber, expirationDate }) => {
  const { isDarkmode } = useTheme(); 
  return (
    <TouchableOpacity style={cardStyle.container}>
        <TouchableOpacity>
            <Ionicons
                name="card"
                size={20}
                color={isDarkmode ? themeColor.white100 : themeColor.dark}
            />
            <Text style={cardStyle.cardNumber}>**** **** **** {cardNumber.slice(-4)}</Text>
            <Text style={cardStyle.expirationDate}>Exp. Date: {expirationDate}</Text>
        </TouchableOpacity>
    </TouchableOpacity>
  );
}

export default CardPaymentRegistered;
