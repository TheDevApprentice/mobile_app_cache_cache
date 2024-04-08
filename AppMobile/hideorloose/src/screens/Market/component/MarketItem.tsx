import React, { memo } from 'react';
import { TouchableOpacity, View, Image } from 'react-native';
import { Text, useTheme } from 'react-native-rapi-ui';
import { marketStyles } from '../Styles/MarketStyle';
import { MarketProductProps } from '../Types/marketProductProps';

const MarketProduct: React.FC<MarketProductProps> = ({ product, onPress }) => {
  const { isDarkmode } = useTheme();
  return (
    <TouchableOpacity
      style={
              [
                marketStyles.cardProduct, 
                { backgroundColor: isDarkmode ? '#013a63' : '#FFFFFF' },
                { borderRadius: 20 }
              ]
            }
      onPress={onPress}
    >
      <Image 
        source={{ uri: product.thumbnail }} 
        style={marketStyles.image} 
      />
      <View style={marketStyles.cardBody}>
        <Text 
          style={marketStyles.name}>
            {product.title}
        </Text>
        <Text 
          style={marketStyles.description}>
            {product.description}
        </Text>
      </View>
      <View 
        style={
          [
            marketStyles.cardFooter, 
            { 
              backgroundColor: isDarkmode ? 
              '#0d3b66' 
              : 
              '#FFFFFF',
              borderRadius: 12 
            }
          ]
        }
        >
        <Text 
          style={marketStyles.quantity}>
            {product.unit_price / 100}$
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default memo(MarketProduct);
