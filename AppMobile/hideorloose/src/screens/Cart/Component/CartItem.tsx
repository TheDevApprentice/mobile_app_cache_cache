import React, { memo, useRef } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useTheme } from 'react-native-rapi-ui';
import { cartStyles } from '../Styles/CartStyle';
import { ProductInCart } from '../../../utils/Types/product';

const CartItem: React.FC<{
  product: ProductInCart;
  onQuantityChange: (productId: number, newQuantity: number) => void;
  onRemoveProduct: (productId: number) => void;
  quantityStep: number;
}> = ({ product, onQuantityChange, onRemoveProduct, quantityStep }) => {
  const { isDarkmode } = useTheme();
  const textColor = isDarkmode ? '#FFFFFF' : '#000000';
  const backgroundColor = isDarkmode ? '#293241' : '#FFFFFF';
  const styles = useRef(cartStyles).current;

  const handleQuantityChange = (newQuantity: number) => {
    onQuantityChange(product.id, newQuantity);
  };

  const handleRemoveProduct = () => {
    onRemoveProduct(product.id);
  };

  const handleIncrementQuantity = () => {
    handleQuantityChange(product.quantity + quantityStep);
  };

  const handleDecrementQuantity = () => {
    if (product.quantity > 1) {
      handleQuantityChange(product.quantity - quantityStep);
    }
  };

  return (
    <View 
      style={[    
        styles.itemContainer, 
        { 
          backgroundColor: backgroundColor,
          borderColor: '#8a817c',
          borderWidth: 1,
        }
      ]}>
      <Image source={{ uri: product.thumbnail }} style={styles.image} />
      <View>
        <View>
          <Text style={[styles.title, { color: textColor }]}>{product.title}</Text>
          <Text style={[styles.description, { color: textColor }]}>
            {product.description} • ${product.unit_price / 100}
          </Text>
        </View>
        <View style={styles.quantityContainer}>
          <Text style={[styles.price, { color: textColor }]}>${product.total / 100}</Text> 
        </View>
        <View style={styles.quantityContainer}>
          <View style={styles.quantityContainer}>
            <TouchableOpacity style={styles.quantityButton} onPress={handleDecrementQuantity}>
              <Text style={[styles.quantityButtonText, { color: textColor }]}>-</Text>
            </TouchableOpacity>
            <Text style={[styles.quantity, { color: textColor }]}>x{product.quantity}</Text>
            <TouchableOpacity style={styles.quantityButton} onPress={handleIncrementQuantity}>
              <Text style={[styles.quantityButtonText, { color: textColor }]}>+</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.removeContainer}>
            <TouchableOpacity style={styles.removeButton} onPress={handleRemoveProduct}>
                <Text style={[styles.removeText, { color: "#ffffff" }]}>Remove</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default memo(CartItem);
