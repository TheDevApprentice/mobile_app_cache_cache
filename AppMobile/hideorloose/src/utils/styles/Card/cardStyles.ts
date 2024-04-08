import { StyleSheet } from "react-native";

export const cardStyles = StyleSheet.create({
    card: {
      backgroundColor: "#fff",
      borderRadius: 8,
      padding: 0,
      marginBottom: 16,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 6,
      flex: 1,
      aspectRatio: 1, // Forcing square aspect ratio
      margin: 8,
    },
    image: {
      width: "20%",
      height: 0, // Adjust as needed
      borderRadius: 8,
      marginBottom: 8,
    },
    content: {
      flex: 1,
    },
    title: {
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: 4,
    },
    description: {
      fontSize: 14,
      color: "#666",
    },
  });
  