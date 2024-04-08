// CheckoutPaymentView.tsx
import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from 'react-native-rapi-ui';
import AddCardPaymentView from '../../CardPayment/AddCardPaymentView';
import ListUserRegisteredCardPaymentView from '../../ListCardPayment/ListCardPaymentView';

const CheckoutPaymentView: React.FC = () => {
  const { isDarkmode } = useTheme();
  const [showAddCardPaymentView, setShowAddCardPaymentView] = useState(false);

  return (
    <View style={{ flex: 1, flexDirection: "column" }}>
      {showAddCardPaymentView ? (
        <AddCardPaymentView showAddCardPaymentView={showAddCardPaymentView} setShowAddCardPaymentView={setShowAddCardPaymentView} />
      ) : (
        <View 
          style={{
            backgroundColor: isDarkmode ? '#000' : '#fff',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: "20%"
          }}
        >
          <TouchableOpacity
            onPress={() => setShowAddCardPaymentView(true)}
            style={{
              borderWidth: 1,
              borderColor: isDarkmode ? '#fff' : '#000',
              height: 50,
              borderRadius: 50,
              backgroundColor: isDarkmode ? '#000' : '#fff',
              justifyContent: 'center',
              alignContent: 'center',
            }}
          >
            <Ionicons 
            name="add-outline" 
            size={32} 
            color={isDarkmode ? '#fff' : '#000'} />
          </TouchableOpacity>
          <Text
            style={{
              marginVertical: 8,
            }}>
            Add a new card
          </Text>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: isDarkmode ? '#fff' : '#000',
              width: '50%',
              marginVertical: 4,
              position:"relative", 
              top: 40
            }}
          />
          <ListUserRegisteredCardPaymentView />
        </View>
      )}
    </View>
  );
}

export default CheckoutPaymentView;
