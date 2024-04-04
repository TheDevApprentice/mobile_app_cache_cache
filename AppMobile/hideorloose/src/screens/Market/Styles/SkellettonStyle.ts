// modalStyles.ts
import { StyleSheet } from 'react-native';

export const skellettonStyle = StyleSheet.create({
  skeletonItemContainer: {
    width: 165,
    position: "relative",
    left: -8,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginTop: 9,
    margin: 7,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 7,
  },
  skeletonImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    backgroundColor: "#ddd", 
    marginRight: 10
  },
  skeletonCardBody: {
    flex: 1
  },
  skeletonTitle: {
    width: "50%", 
    height: 20,
    backgroundColor: "#ddd",
    marginBottom: 10
  },
  skeletonDescription: {
    width: "70%", 
    height: 20,
    backgroundColor: "#ddd",
    marginBottom: 10
  },
  skeletonCardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  skeletonPrice: {
    width: "30%",
    height: 20,
    backgroundColor: "#ddd",
    marginBottom: 10
  },
  skeletonQuantity: {
    width: "20%",
    height: 20,
    backgroundColor: "#ddd"
  },
});
