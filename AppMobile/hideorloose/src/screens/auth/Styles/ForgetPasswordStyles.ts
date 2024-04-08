import { StyleSheet } from 'react-native';
import { themeColor } from 'react-native-rapi-ui';

export const forgetpasswordStyle =  StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColor.white100, // Fond blanc par défaut
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: themeColor.white100, // Fond blanc par défaut
  },
  image: {
    height: 220,
    width: 220,
  },
  formContainer: {
    flex: 3,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: themeColor.white100, // Fond blanc par défaut
  },
  title: {
    alignSelf: 'center',
    padding: 30,
    fontWeight: 'bold',
  },
  textInput: {
    marginTop: 15,
  },
  button: {
    marginTop: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    justifyContent: 'center',
  },
  themeButton: {
    marginLeft: 5,
    fontWeight: 'bold',
  },
});
