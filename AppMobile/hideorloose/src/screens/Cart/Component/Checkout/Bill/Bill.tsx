import React, { memo } from 'react';
import { View, Text, FlatList } from 'react-native';
import { useTheme } from 'react-native-rapi-ui';
import { BillProps } from '../../../Types/Bill/BillProps';
import  Button from '../../../../../utils/components/Buttons/Button';
import { billStyle } from '../../../Styles/BillStyle';

const Bill: React.FC<BillProps> = ({ 
  setModalVisible,
  navigation, 
  items, 
  taxRate
 }) => {
  const subtotal = items.reduce((acc, item) => acc + item.unit_price * item.quantity / 100, 0);
  const taxAmount = subtotal * taxRate / 100;
  const total = subtotal + taxAmount;
  const { isDarkmode } = useTheme(); 

  return (
    <View style={[billStyle.container, { backgroundColor: isDarkmode ? '#000000' : '#FFFFFF', borderColor: isDarkmode ? '#FFFFFF' : '#000000'}]}>
      <Text style={[billStyle.heading, { backgroundColor: isDarkmode ? '#000000' : '#FFFFFF', color: isDarkmode ? '#FFFFFF' : '#000000' }]}>Your Bill</Text>
      <View style={[billStyle.containerFlow, { backgroundColor: isDarkmode ? '#000000' : '#FFFFFF' }]}>
      <View style={[billStyle.itemsContainerinList, { backgroundColor: isDarkmode ? '#000000' : '#FFFFFF' }]}>
        <FlatList
          contentContainerStyle={[billStyle.list, { backgroundColor: isDarkmode ? '#000000' : '#FFFFFF' }]}
          data={items}
          key={1}
          numColumns={1}
          renderItem={({ item, index }) => (
            <View key={index} style={[billStyle.item, { backgroundColor: isDarkmode ? '#000000' : '#FFFFFF' }]}>
              <Text style={[billStyle.totalText, { color: isDarkmode ? '#FFFFFF' : '#000000' }]}>{item.title} x {item.quantity}</Text>
              <Text style={[billStyle.totalText, { color: isDarkmode ? '#FFFFFF' : '#000000' }]}>${(item.unit_price * item.quantity / 100).toFixed(2)}</Text>
            </View>
          )} 
          keyExtractor={
            (item) => 
              (
                item.id.toString()
              )
          }
        />
      </View>
      </View>
      <View style={[billStyle.totalsContainer, { backgroundColor: isDarkmode ? '#000000' : '#FFFFFF' }]}>
        <View style={[billStyle.row, { backgroundColor: isDarkmode ? '#000000' : '#FFFFFF' }]}>
          <Text style={[billStyle.totalText, { color: isDarkmode ? '#FFFFFF' : '#000000' }]}>Subtotal:</Text>
          <Text style={[billStyle.totalText, { color: isDarkmode ? '#FFFFFF' : '#000000' }]}>${subtotal.toFixed(2)}</Text>
        </View>
        <View style={[billStyle.row, { backgroundColor: isDarkmode ? '#000000' : '#FFFFFF' }]}>
          <Text style={[billStyle.totalText, { color: isDarkmode ? '#FFFFFF' : '#000000' }]}>Tax ({((taxRate * 100 ) / 100).toFixed(2)}%):</Text>
          <Text style={[billStyle.totalText, { color: isDarkmode ? '#FFFFFF' : '#000000' }]}>${taxAmount.toFixed(2)}</Text>
        </View>
        <View style={[billStyle.row, { backgroundColor: isDarkmode ? '#000000' : '#FFFFFF' }]}>
          <Text style={[billStyle.totalText, { color: isDarkmode ? '#FFFFFF' : '#000000' }]}>Total:</Text>
          <Text style={[billStyle.totalText, { color: isDarkmode ? '#FFFFFF' : '#000000' }]}>${total.toFixed(2)}</Text>
        </View>
        </View>
      <Button OnPress={setModalVisible} styles={billStyle} navigation={navigation} isDarkmode={isDarkmode} text="Place my order" />
    </View>
  );
};

export default memo(Bill);
