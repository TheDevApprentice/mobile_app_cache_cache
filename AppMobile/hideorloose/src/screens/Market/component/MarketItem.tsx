import React from 'react';
import { TouchableOpacity, View, Image } from 'react-native';
import { Text, useTheme, themeColor } from 'react-native-rapi-ui';
import { Product } from '../../../types/product';
import { marketStyles } from '../Styles/MarketStyle';
import { MarketProductProps } from '../../../types/Market/marketProduct';

const MarketProduct: React.FC<MarketProductProps> = ({ product, onPress }) => {
  const { isDarkmode } = useTheme();
//   cardProduct: {
//     width: 165,
//     position: "relative",
//     left: -8,
//     backgroundColor: '#fff',
//     marginTop: 9,
//     margin: 7,
//     marginBottom: 10,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 7,
//   },
  return (
    <TouchableOpacity
      style={[marketStyles.cardProduct, 
              { backgroundColor: isDarkmode ? '#013a63' : '#FFFFFF' },
              { borderRadius: 20 }]}
      onPress={onPress}
    >
      <Image source={{ uri: product.thumbnail }} style={marketStyles.image} />
      <View style={marketStyles.cardBody}>
        <Text style={marketStyles.name}>{product.title} </Text>
        <Text style={marketStyles.description}>{product.description} </Text>
      </View>
      <View style={[marketStyles.cardFooter, { backgroundColor: isDarkmode ? '#0d3b66' : '#FFFFFF', borderRadius: 12 }]}>
        {/* <Text style={styles.price}>{product.unit_price / 100}$</Text> */}
        <Text style={marketStyles.quantity}>{product.unit_price / 100}$</Text>
      </View>
    </TouchableOpacity>
  );
};

export default MarketProduct;
