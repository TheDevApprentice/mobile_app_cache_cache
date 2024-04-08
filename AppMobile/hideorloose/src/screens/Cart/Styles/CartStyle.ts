import { StyleSheet } from 'react-native';

export const cartStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  removeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 80
  },
  quantityButton: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 4,
    paddingHorizontal: 8, 
    marginHorizontal: 5,
  },
  quantityButtonText: {
    fontSize: 16,
    color: '#333',
  },
  removeButton: {
    backgroundColor: '#dc2f02',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
    position: "relative", 
    right: 20,
  },
  scrollView: {
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
    elevation: 10,
    borderColor: "#463f3a",
    borderWidth: 10,
    borderRadius: 10
  },
  image: {
    position: "relative",
    top: -40,
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    marginBottom: 5,
  },
  statsText: {
    fontSize: 14,
    marginBottom: 5,
  },
  removeText: {
    fontSize: 14,
    marginBottom: 5,
  },
  price: {
    position: "relative", 
    left: -70,
    top: 61,  
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  quantity: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalContainer: {
    padding: 10,
    // backgroundColor: '#333333',
    borderRadius: 10,
    alignItems: 'center',
  },
  checkoutContainer: {
    padding: 10,
    // backgroundColor: '#333333',
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 0
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center",
      fontSize: 18,
      fontWeight: 'bold'
    },
    quantitySelector: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 15
    },
    selectedQuantity: {
      fontSize: 18,
      fontWeight: 'bold',
      marginHorizontal: 15
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    emptyCartContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 50,
    },
    emptyCartText: {
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });