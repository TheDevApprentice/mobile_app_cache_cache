import React, { memo } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { cardStyles } from "../../styles/Card/cardStyles";
import { CardProps } from "../../Types/Card/CardTypeProps";

const Card: React.FC<CardProps> = ({ title, description, imageUri, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={cardStyles.card}>
        <Image source={{ uri: imageUri }} style={cardStyles.image} />
        <View style={cardStyles.content}>
          <Text style={cardStyles.title}>{title}</Text>
          <Text style={cardStyles.description}>{description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default memo(Card);
