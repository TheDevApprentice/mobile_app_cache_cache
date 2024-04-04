import { StyleSheet } from 'react-native';

export const profileStyles = StyleSheet.create({
  container: {
    flex: 1
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 0,
    elevation: 0,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  messageButton: {
    padding: 10,
    backgroundColor: '#00afb9',
    borderRadius: 10,
    marginTop: 10, 
    alignItems: 'center',
  },
  infoContainer: {
    flex: 1,
  },
  userNameText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statsText: {
    fontSize: 16,
  },
  statsLabel: {
    fontSize: 12,
    marginLeft: 5,
  },
  boldStatsText: {
    fontWeight: 'bold',
  },
  badgesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  badge: {
    backgroundColor: '#e09f3e',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginRight: 10,
    marginTop: 10,
    elevation: 5
  },
  badgeText: {
    color: '#333',
    fontSize: 12,
  },
  actionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 20,
  },
  actionButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    height: '33%',
    width: '48%',
    alignItems: 'center',
    justifyContent: "center",
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation:10
  },
  actionText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});
