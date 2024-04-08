import { StyleSheet } from 'react-native';

export const messagesStyles = StyleSheet.create({
  friendItemContainer: {
    flex: 1,
    maxWidth: "100%", 
    maxHeight: "100%", 
    width: 500,
    height: 90,
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 3,
    position: "relative", 
    left: -5
  },
  messageItemContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    color: "#00000"
  },
  messageTextInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    minHeight: 100,
  },
});
