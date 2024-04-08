// CardStyle.ts
import { StyleSheet } from 'react-native';

export const cardStyle = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    height: 100, 
    width: 400, 
    maxHeight: "60%",
    maxWidth: "90%",
    margin: 20
  },
  cardIcon: {
    width: 50,
    height: 30,
    marginRight: 16,
  },
  cardNumber: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: "#000000",
    position: "relative",
    top: -19,  
    left: 35
  },
  expirationDate: {
    fontSize: 14,
    color: '#666',
  },
});
