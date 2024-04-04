// modalStyles.ts
import { StyleSheet } from 'react-native';

export const modalStyles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

    height: 200
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    elevation: 5,
    position: "relative", 
    top: "30%",
    margin: 30,
    height: 240
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  quantitySelector: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    marginBottom: 30,
  },
  selectedQuantityTotalContainer: {
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 15,
    position: "relative", 
    left: 100
  },
  selectedQuantityTotalText: {
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 15,
    position: "relative", 
    top: -12, 
    left: 5,
    color: "#2a9134"
  },
  selectedQuantityTotalQuantity: {
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 15,
    position: "relative", 
    top: -1, 
    left: 13, 
    color: "#2a9134"
  },
  selectedPriceTotalContainer: {
    fontSize: 16,
    fontWeight: "bold",
    // marginHorizontal: 15,
    position: "relative", 
    left: 100, 
    
  },
  selectedPriceTotalText: {
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 15,
    position: "relative", 
    top: -190, 
    left: 5, 
    color: "#2a9134"
  },
  selectedPriceTotalQuantity: {
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 15,
    position: "relative", 
    top: -180, 
    left: 13,
    color: "#2a9134"
  },
  selectedQuantity: {
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 15,
  },
  confirmButton: {
    backgroundColor: "#05668d",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  confirmButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
});
