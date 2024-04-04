import { StyleSheet } from 'react-native';

export const messagesStyles = StyleSheet.create({
  friendItemContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 16,
  },
  messageItemContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  messageTextInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    minHeight: 100,
  },
});
