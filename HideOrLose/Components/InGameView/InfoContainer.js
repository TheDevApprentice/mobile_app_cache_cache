// InfoContainer.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const InfoContainer = ({ title }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.container_infos}>
        <TouchableOpacity style={styles.quitButton} onPress={() => navigation.goBack()}>
          <Text>Exit</Text>
        </TouchableOpacity>
        <Text style={styles.containerTitle}>{title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  container_infos: {
    alignItems: "center",
  },
  containerTitle: {
    fontSize: 70,
    fontWeight: "bold"
  },
  quitButton: {
    borderWidth: 1,
    backgroundColor: '#DC143C',
    borderRadius: 5,
    paddingLeft: 5,
    paddingRight: 5,
    fontSize: 20
  },
});

export default InfoContainer;
