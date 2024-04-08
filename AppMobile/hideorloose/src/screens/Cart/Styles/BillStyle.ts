import { StyleSheet } from 'react-native';

export const billStyle = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center", 
      alignContent: "center",
      position: "relative", 
      top: 176,  
      width: 400,
      maxHeight: "90%",
      maxWidth: "100%",
      padding: 20,
      backgroundColor: '#fff',
      borderRadius: 10,
      elevation: 20,
      borderWidth: 0.4
    },
    containerFlow: {
      flex: 1,
      justifyContent: "center", 
      alignContent: "center",
      padding: 20,
      backgroundColor: '#fff',
      borderRadius: 10,
    },
    heading: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
      textAlign: 'center',
    },
    list: {
      padding: 20,
      backgroundColor: '#fff',
    },
    itemsContainer: {
      flex: 1,
      marginBottom: 20,
    },
    itemsContainerinList: {
      flex: 1,
      marginBottom: 20,
    },
    subheading: {
      position: 'absolute', 
      top: -12,
      left: -8,  
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    item: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 5,
    },
    totalsContainer: {
      position: "relative", 
      top: -20,
      borderTopWidth: 1,
      borderTopColor: '#ccc',
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 5,
    },
    rowButton: {
      width: 500,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 5,
    },
    totalText: {
      fontWeight: 'bold',
    },
    button: {
      position: "relative", 
      top: 0, 
      borderRadius: 5,
      bottom: -115 , 
      paddingVertical: 12,
    },
    buttonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: 'white',
      textAlign: 'center',
    },
  });
  