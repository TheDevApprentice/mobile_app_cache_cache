import { StyleSheet } from 'react-native';

export const marketStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    height: "auto"
  },
  searchInputContainer: {
    margin: 1,
    marginTop: 9,
    width: 100,
    marginBottom: 20,
    position: "relative",
    left: -40,
    paddingHorizontal: 50,
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#dcdcdc',
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15
  },
  propertyListContainer: {
    width: "103%",
    paddingHorizontal: 10,
    paddingVertical: 0,
  },
  cardProduct: {
    width: 165,
    position: "relative",
    left: -8,
    backgroundColor: '#fff',
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
    elevation:10,
  },
  image: {
    height: 130,
    marginBottom: 10,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  cardBody: {
    height: 55,
    color: '#05668d',
    marginBottom: 10,
    padding: 10,
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold'
  },
  name: {
    fontSize: 16,
    color: '#adb5bd',
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#adb5bd',
    fontWeight: 'bold'
  },
  cardFooter: {
    height: 40,
    padding: 10,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#dcdcdc',
    justifyContent: 'space-between',
  },
  quantity: {
    fontSize: 14,
    color: '#c1121f',
    fontWeight: 'bold', 
    position: "relative", 
    left: 120
  },
});
