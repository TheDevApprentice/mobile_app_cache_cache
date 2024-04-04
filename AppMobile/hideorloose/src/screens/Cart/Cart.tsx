import React, { memo, useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Layout, useTheme, Button } from 'react-native-rapi-ui';
import { cartStyles } from './Styles/CartStyle';
import CartItem from './Component/CartItem';
import { useCartContext } from '../../provider/CartDataContext';
const Cart: React.FC = () => {
  const { isDarkmode } = useTheme();
  const [quantityStep, setQuantityStep] = useState(1); // state to track quantity step
  
  const { cartList, handleQuantityChange, handleRemoveProduct, getTotalPrice } = useCartContext();

//   useEffect(() => {
//     console.log("cartList in Cart:", cartList);
// }, [cartList]);

  return (
    <Layout style={[cartStyles.container, { backgroundColor: isDarkmode ? '#333333' : '#FFFFFF' }]}>
      {cartList.length === 0 ? (
        <View style={cartStyles.emptyCartContainer}>
          <Text style={[cartStyles.emptyCartText, { color: isDarkmode ? '#FFFFFF' : '#000000' }]}>
            There is no article in your cart
          </Text>
        </View>
      ) : (
        <>
          <ScrollView style={cartStyles.scrollView}>
            {cartList.map((product) => (
              <CartItem
                product={product}
                key={product.id}
                onQuantityChange={handleQuantityChange}
                onRemoveProduct={handleRemoveProduct}
                quantityStep={quantityStep}
              />
            ))}
          </ScrollView>
          <View style={[cartStyles.totalContainer, { backgroundColor: isDarkmode ? '#5e60ce' : '#7209b7' }]}>
            <Text style={[cartStyles.totalText, { color: '#FFFFFF' }]}>
              Total: ${getTotalPrice() / 100}
            </Text>
          </View>
          <Button style={cartStyles.checkoutContainer} color='#4895ef' text='Checkout' />
        </>
      )}
    </Layout>
  );
};

export default memo(Cart);
