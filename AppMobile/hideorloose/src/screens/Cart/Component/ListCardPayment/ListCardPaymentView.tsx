// ListUserRegisteredCardPaymentView.tsx
import React from 'react';
import { View, Text } from 'react-native';
import CardPaymentRegistered from '../CardPayment/CardPaymentRegistered';
import { userCardData } from '../../Data/UserCardData';

const ListUserRegisteredCardPaymentView: React.FC = () => {
  return (
    <View 
        style={{
            marginTop: "20%"
        }}
    >
      {userCardData.map((card, index) => (
        <CardPaymentRegistered 
            key={index} 
            cardNumber={card.cardNumber} 
            expirationDate={card.expirationDate} 
            ccv={card.ccv} 
        />
      ))}
    </View>
  );
}

export default ListUserRegisteredCardPaymentView;
