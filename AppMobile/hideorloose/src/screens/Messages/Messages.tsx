// MessagesScreen.tsx

import React, { memo, useRef } from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import { MainStackParamList } from "../../types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Layout, Text, Button, Avatar, TextInput } from "react-native-rapi-ui";
import { messagesStyles } from "./Styles/MessagesStyle";
import { useMessageDataHandler, friendsData, messagesData } from "./Data/MessageDataHandler";

export default memo(function ({
  navigation,
}: NativeStackScreenProps<MainStackParamList, "MainTabs">) {
  const { message, setMessage, selectedUserId, sendMessage, handleFriendSelect } = useMessageDataHandler();
  const styles = useRef(messagesStyles).current;

  const renderFriendItem = ({ item }: { item: { id: string; username: string } }) => (
    <TouchableOpacity onPress={() => handleFriendSelect(item.id)}>
      <View style={styles.friendItemContainer}>
        <Avatar
          source={{ uri: 'https://sm.ign.com/t/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.300.jpg' }}
          size="lg"
          shape="round"
        />
        <Text fontWeight="bold" style={{ marginBottom: 8, marginLeft: 15 }}>
          {item.username}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderMessageItem = ({ item }: { item: { id: string; friendId: string; text: string } }) => (
    <View style={styles.messageItemContainer}>
      <Text fontWeight="bold" style={{ marginBottom: 8, marginLeft: 15 }}>
        {friendsData.find(friend => friend.id === item.friendId)?.username}
      </Text>
      <Text>{item.text}</Text>
    </View>
  );

  return (
    <Layout>
      <View style={{ flex: 1, flexDirection: "column" }}>
        <View style={{ flex: 1, flexDirection: "column", height: 10}}>
          <View style={{ flex: 1, flexDirection: "column", alignItems: "center" }}>
            <FlatList
              data={friendsData}
              renderItem={renderFriendItem}
              keyExtractor={(item) => item.id}
              horizontal={true}
              ListFooterComponent={<View style={{ height: 16 }} />}
            />
          </View>
        </View>

        <View style={{ paddingHorizontal: 16, paddingVertical: 8, height: 460 }}>
          <FlatList
            data={messagesData.filter(message => message.friendId === selectedUserId)}
            renderItem={renderMessageItem}
            keyExtractor={(item) => item.id}
          />
        </View>
        
        <View style={{ paddingHorizontal: 16, paddingVertical: 8 }}>
          <Text fontWeight="bold" style={{ marginBottom: 8 }}>
            Send a Message
          </Text>
          <TextInput
            placeholder="Type your message here..."
            value={message}
            onChangeText={setMessage}
            multiline
            style={styles.messageTextInput}
          />
          <Button text="Send" onPress={sendMessage} style={{ marginTop: 8 }} />
        </View>
      </View>
    </Layout>
  );
});
