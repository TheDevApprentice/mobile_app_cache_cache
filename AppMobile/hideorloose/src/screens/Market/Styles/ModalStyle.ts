// modalStyles.ts
import { StyleSheet } from 'react-native';

export const modalStyles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    elevation: 20
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    elevation: 20,
    position: "relative", 
    top: "71%",
    left: -30,
    margin: 30,
    height: 200,
    width: 400, 
    maxHeight: "100%", 
    maxWidth: "100%",
    borderWidth: 0.4,
    borderColor: "#", 
    borderCurve: "circular"
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
    left: 100, 
    top: -140
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
    left: -110,
    top: -5 
    
  },
  selectedPriceTotalText: {
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 15,
    position: "relative", 
    top: -190, 
    left: 5, 
    color: "#457b9d"
  },
  selectedPriceTotalQuantity: {
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 15,
    position: "relative", 
    top: -180, 
    left: 13,
    color: "#457b9d"
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
