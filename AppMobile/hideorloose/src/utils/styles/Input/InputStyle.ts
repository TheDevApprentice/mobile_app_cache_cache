import { StyleSheet } from 'react-native';

export const inputStyles = StyleSheet.create({
    input: {
      marginBottom: 15,
    },
    label: {
      fontSize: 14,
      marginBottom: 5,
      color: '#78757c',
    },
    inputField: {
      borderWidth: 1,
      borderColor: '#78757c',
      borderRadius: 5,
      flexDirection: 'row',
      alignItems: 'center',
    },
    inputText: {
      flex: 1,
      paddingVertical: 10,
      paddingHorizontal: 15,
      fontSize: 16,
      color: 'black',
    },
    image: {
      position: "absolute", 
      right: 10, 
      width: 30,
      height: 20,
      resizeMode: 'contain',
    }
  });