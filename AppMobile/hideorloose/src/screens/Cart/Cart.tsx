import React, { memo, useEffect, useRef, useState } from 'react';
import { View, Text, ScrollView, FlatList } from 'react-native';
import { Layout, useTheme, Button } from 'react-native-rapi-ui';
import { cartStyles } from './Styles/CartStyle';
import CartItem from './Component/CartItem';
import { useCartContext } from '../../provider/Cart/CartDataContext';
import CheckoutModal from './Component/Checkout/Checkout';
import { Product, ProductInCart } from '../../utils/Types/product';
import { CartComponentProps } from './Types/cart';

const Cart: React.FC<CartComponentProps> = ({ navigation }) => {
  const { isDarkmode } = useTheme();
  const quantityStep = useRef<number>(1).current;
  const numColumns = useRef<number>(1).current;
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedQuantity, setSelectedQuantity] = useState<number>(1);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const { handleAddProductToCart } = useCartContext();
  const [total, setTotal] = useState(0); 
  const { cartList, handleQuantityChange, handleRemoveProduct, getTotalPrice, taxRate } = useCartContext();

  const handleConfirmQuantity = () => {
    if (selectedProduct) {
      const productInCart: ProductInCart = {
        ...selectedProduct,
        quantity: selectedQuantity,
        total: selectedQuantity * selectedProduct.unit_price,
      };
      handleAddProductToCart(productInCart);
      setModalVisible(false);
      setSelectedQuantity(0); 
    }
  };

  return (
    <Layout style={[cartStyles.container, { backgroundColor: isDarkmode ? '#333333' : '#FFFFFF' }]}>
      {cartList.length === 0 ? (
        <View style={cartStyles.emptyCartContainer}>
          <Text style={[cartStyles.emptyCartText, { color: isDarkmode ? '#FFFFFF' : '#000000' }]}>
            There is no articles in your cart
          </Text>
        </View>
      ) : (
        <>
          <FlatList
              contentContainerStyle={cartStyles.scrollView}
              key={numColumns}
              data={cartList}
              numColumns={numColumns}
              renderItem={({ item }) => (
                <CartItem
                product={item}
                key={item.id}
                onQuantityChange={handleQuantityChange}
                onRemoveProduct={handleRemoveProduct}
                quantityStep={quantityStep}
              />
              )}
              keyExtractor={(item) => item.id.toString()}
            />
          <View style={[cartStyles.totalContainer, { backgroundColor: isDarkmode ? '#5e60ce' : '#7209b7' }]}>
            <Text style={[cartStyles.totalText, { color: '#FFFFFF' }]}>
              Total: ${getTotalPrice() / 100}
            </Text>
          </View>
          <CheckoutModal
            navigation={navigation}
            cartList={cartList}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            selectedProduct={selectedProduct}
            selectedQuantity={selectedQuantity}
            setSelectedQuantity={setSelectedQuantity}
            handleConfirmQuantity={handleConfirmQuantity}
            total={total}
            setTotal={setTotal}
            taxRate={taxRate}/>
          <Button 
            style={cartStyles.checkoutContainer} 
            color='#4895ef' 
            text='Checkout' 
            onPress={() => {
              setModalVisible(!modalVisible)
            }}
          />
        </>
        
      )}
    </Layout>
  );
};

export default memo(Cart);
