import { StyleSheet } from 'react-native';

export const paymentViewStyle = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    containerInfo: {
      position: 'relative', 
      top: 50
    },
    modal: {
      flex: 1,
      backgroundColor: '#fff',
      borderRadius: 10,
      borderBlockColor: "#ccc",
      padding: 20,
      width: 320,
      maxHeight: '90%',
      maxWidth: '100%',
    },
    heading: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
    },
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
    },
    button: {
      borderRadius: 5,
      position: "relative", 
      bottom: -115 , 
      paddingVertical: 12,
    },
    buttonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: 'white',
      textAlign: 'center',
    },
    row: {
      color: "#fff",
      flexDirection: 'row',
      marginBottom: 15,
    },
    col: {
      color: "#fff",
      flex: 1,
      marginRight: 10,
    },
  });
  