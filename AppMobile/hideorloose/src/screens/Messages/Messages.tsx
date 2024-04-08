import React, { memo } from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Layout, Text, Avatar } from "react-native-rapi-ui";
import { MainStackParamList } from "../../utils/Types/navigation";
import { messagesStyles } from "./Styles/MessagesStyle";
import MessagesUserView from "./MessageToMessage/MessagesUserView";
import { Friend, User, UserMessage } from "../../utils/Types/user";
import { useGlobalContext } from "../../provider/GlobalContextProvider";
import { useMessageContext } from "../../provider/MessageDataProvider";

export default memo(function ({
  navigation,
}: NativeStackScreenProps<MainStackParamList, "MainTabs">) {
  const { message, setInputFieldMessage, selectedUser, sendMessage, handleFriendSelect, getSelectedFriendData } = useMessageContext();
  const { friends } = useGlobalContext();
  const styles = messagesStyles;
  {console.log(friends)}
  
  const renderFriendItem: React.FC<{ item: Friend }> = ({ item }) => (
    <TouchableOpacity onPress={() => handleFriendSelect(item)}>
      <View style={styles.friendItemContainer}>
        <Avatar
          source={{ uri: item?.avatar }}
          size="lg"
          shape="round"
          style={{
            position: "relative",
            top: 20,
            left: -128,
          }}
        />
        <Text
          fontWeight="bold"
          size="md"
          style={{
            marginBottom: 8,
            marginLeft: 15,
            position: "relative",
            top: -30,
            left: -70,
          }}
        >
          {item?.username}
        </Text>
        <Text
          fontWeight="bold"
          size="md"
          style={{
            marginBottom: 8,
            marginLeft: 15,
            position: "relative",
            top: -30,
            left: 52,
            width: "80%",
          }}
        >
          {/* {item?.messages[1].message} */}
        </Text>
      </View>
    </TouchableOpacity>
  );
  
  return (
    <Layout>
    {selectedUser !== null ? ( 
      <MessagesUserView 
        friendId={selectedUser?.uid} 
        navigation={navigation}
      />
    ) : ( 
      <View 
        style={{ 
          flex: 1, 
          flexDirection: "column" 
        }}
        >
        <View 
          style={{ 
            flex: 1, 
            flexDirection: "column",
            height: 10 
          }}
          >
          <View 
            style={{ 
              flex: 1, 
              flexDirection: "column", 
              alignItems: "center" 
            }}
          >
            <FlatList
              style={{ 
                flex: 1,
              }}
              data={friends}
              renderItem={renderFriendItem}
              keyExtractor={(item) => item.id.toString()}
              horizontal={false}
            />
          </View>
        </View>
      </View>
    )}
  </Layout>
  );
});