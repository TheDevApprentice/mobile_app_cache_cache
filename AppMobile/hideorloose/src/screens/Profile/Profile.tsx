// Profile.tsx
import React, { memo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Avatar, Layout, useTheme } from 'react-native-rapi-ui';
import { useProfileDataHandler } from './Data/ProfileDataHandler';
import { Ionicons } from '@expo/vector-icons';

const Profile: React.FC<{}> = () => {
  const { userData, actions, styles } = useProfileDataHandler();
  const { isDarkmode, setTheme } = useTheme();
  const textColor = isDarkmode ? '#FFFFFF' : '#000000';

  return (
    <Layout>
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <Avatar
            source={{ uri: userData.avatar }}
            size="lg"
            shape="round"
            style={styles.avatar}
          />
          <View style={styles.infoContainer}>
            <Text style={[styles.userNameText, { color: textColor }]}>{userData.name}</Text>
            {userData.userType === 'farmer' || userData.userType === 'customer' && (
              <View style={styles.badgesContainer}>
                {userData.badges.map((badge) => (
                  <View style={[styles.badge, { backgroundColor: badge.color }]} key={badge.id}>
                    <Text style={[styles.statsText, { color: textColor }]}>{badge.name}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>
        <View style={styles.actionsContainer}>
        {actions.map((action, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.actionButton, { backgroundColor: action.backgroundColor }]}
            onPress={() => {
              console.log(`Action button pressed: ${action.name}`);
            }}
          >
            <Ionicons 
              name={action.iconName} 
              size={26} 
              color="white" 
              style={{position: "relative", 
                top: -38, 
                left: -50, 
                
              }} 
            />
            <Text style={styles.actionText}>{action.name}</Text>
          </TouchableOpacity>
        ))}
        </View>
      </View>
    </Layout>
  );
};

export default memo(Profile);
