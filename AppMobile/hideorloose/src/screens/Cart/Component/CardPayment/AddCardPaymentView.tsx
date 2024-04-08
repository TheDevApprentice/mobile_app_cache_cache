// AddCardPaymentView.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Input from '../../../../utils/components/Input/Input';
import Button from '../../../../utils/components/Buttons/Button';
import { paymentViewStyle } from '../../Styles/PaymentViewStyle';
import { themeColor, useTheme } from 'react-native-rapi-ui';
import { InputType } from '../../../../utils/Types/Input/InputType';
import { Ionicons } from '@expo/vector-icons';

interface Props{
  showAddCardPaymentView: boolean; 
  setShowAddCardPaymentView: any; 
}

const AddCardPaymentView: React.FC<Props> = ({ showAddCardPaymentView, setShowAddCardPaymentView }) => {
    const { isDarkmode } = useTheme(); 
    const getCurrentDate = () => {
        const currentDate = new Date();
        const day = currentDate.getDate().toString().padStart(2, '0');
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        return `${day}/${month}`;
    };
    
  return (
    <View style={[paymentViewStyle.container, { backgroundColor: isDarkmode ? '#000000' : '#FFFFFF' }]}>
    <View style={[paymentViewStyle.modal, { backgroundColor: isDarkmode ? '#000000' : '#FFFFFF' }]}>
    <View
          style={{ 
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity>   
            <Ionicons
              style={{ 
              position: "relative", 
              top: 4,
              left: -100
              }}
              onPress={()=> {
                setShowAddCardPaymentView(!showAddCardPaymentView); 
              }}
              name="arrow-back-outline"
              size={20}
              color={isDarkmode ? themeColor.white100 : themeColor.dark}
            />
          </TouchableOpacity>
          <Text style={[paymentViewStyle.heading, { color: isDarkmode ? '#FFFFFF' : '#000000' }]}>Add Card</Text>
        </View>
      <View style={[paymentViewStyle.containerInfo, { backgroundColor: isDarkmode ? '#000000' : '#FFFFFF' }]}>
        <Input placeholder="Cardholder's Name" label="Cardholder's Name" />
        <Input placeholder="Card Number" label="Card Number" imgSrc="https://seeklogo.com/images/V/visa-logo-6F4057663D-seeklogo.com.png" />
        <View style={[paymentViewStyle.row, { backgroundColor: isDarkmode ? '#000000' : '#FFFFFF' }]}>
          <View style={[paymentViewStyle.col, { backgroundColor: isDarkmode ? '#000000' : '#FFFFFF' }]}>
            <Input placeholder={getCurrentDate()} label="Expiration Date" type={InputType.Date} />
          </View>
          <View style={[paymentViewStyle.col, { backgroundColor: isDarkmode ? '#000000' : '#FFFFFF' }]}>
            <Input placeholder="CVV" label="CVV" />
          </View>
        </View>
      </View>
      <Button  
        OnPress={function (visible: boolean): void {
            throw new Error('Function not implemented.');
          } 
        } 
        styles={paymentViewStyle}
        isDarkmode={isDarkmode}
        text="Add new card"
        navigation={null}/>
    </View>
  </View>
  );
}

export default AddCardPaymentView;
