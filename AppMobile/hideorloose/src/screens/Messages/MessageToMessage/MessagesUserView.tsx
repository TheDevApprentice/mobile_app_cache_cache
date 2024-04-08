import React, { memo, useRef } from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import { MainStackParamList } from "../../../utils/Types/navigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Layout, Text, Button, Avatar, TextInput, useTheme, themeColor } from "react-native-rapi-ui";
import { messagesStyles } from "../Styles/MessagesStyle";
import { Ionicons } from "@expo/vector-icons";
import { useMessageContext } from "../../../provider/MessageDataProvider";
import { UserMessage } from "../../../utils/Types/user";

interface Props{
  friendId?: string; 
  navigation: NativeStackNavigationProp<MainStackParamList, "MainTabs", undefined>
}

export default memo(function ({
  navigation,
  friendId,
}: Props) {
  const { message, setInputFieldMessage, selectedUser, sendMessage, handleFriendSelect } = useMessageContext();
  const styles = useRef(messagesStyles).current;

  const {isDarkmode} = useTheme(); 
  
  const renderMessageItem = ({ item }: { item: UserMessage }) => (
    <View key={item.id} style={styles.messageItemContainer}>
      <Text fontWeight="bold" style={{ marginBottom: 8, marginLeft: 15 }}>
        {selectedUser?.username}
      </Text>
      <Text>{item.message}</Text>
    </View>
  );

  return (
    <Layout>
      <View style={{ flex: 1, flexDirection: "column" }}>
        <View
          style={{ 
            flexDirection: "row",
            justifyContent: "flex-start",
          }}
        >
          <TouchableOpacity>   
            <Ionicons
              style={{ 
              position: "relative", 
              top: 20,
              left: 30
              }}
              onPress={()=> {
                handleFriendSelect(null)
              }}
              name="arrow-back"
              size={20}
              color={isDarkmode ? themeColor.white100 : themeColor.dark}
            />
          </TouchableOpacity>
       
          <Text 
            fontWeight="bold" 
            style={{ 
              marginBottom: 8, 
              position: "relative", 
              top: 20,
              left: 60
            }}
          >
            {selectedUser?.username}
          </Text>
        </View>
        <View style={{ paddingHorizontal: 16, paddingVertical: 8, height: 460 }}>
          <FlatList
            data={selectedUser?.messages}
            renderItem={renderMessageItem}
            keyExtractor={(UserMessage) => UserMessage.id.toString()}
          />
        </View>
        
        <View style={{ 
          paddingHorizontal: 16, 
          paddingVertical: 75 
        }}
        >
          <Text 
          fontWeight="bold" 
          style={{ 
            marginBottom: 8 
          }}
          >
            Send a Message
          </Text>
          <TextInput
            placeholder="Type your message here..."
            value={message}
            onChangeText={setInputFieldMessage}
            multiline
            style={styles.messageTextInput}
          />
          <Button text="Send" onPress={sendMessage} style={{ marginTop: 8 }} />
        </View>
      </View>
    </Layout>
  );
});
