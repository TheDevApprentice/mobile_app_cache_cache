import { StyleSheet } from 'react-native';
import { themeColor, useTheme } from 'react-native-rapi-ui';

const mainTabsStyle = StyleSheet.create({
  tabBarStyle: {
    position: 'relative',
    bottom: 0,
    borderTopColor: themeColor.dark100,
    backgroundColor: themeColor.dark200,
  },
  tabBarLabel: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  tabBarIconContainer: {
    marginLeft: 5,
    justifyContent: 'center',
    alignContent: 'center',
  },
  tabBarBadge: {
    backgroundColor: '#219ebc',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    paddingHorizontal: 9,
    paddingVertical: 1,
    borderRadius: 10,
  },
  tabBarBadgeCart: {
    backgroundColor: '#d00000',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    paddingHorizontal: 9,
    paddingVertical: 1,
    borderRadius: 10,
  },
});

export default mainTabsStyle;
