// ProfileDataHandler.tsx

import { useRef } from 'react';
import { useGlobalContext } from '../../../provider/GlobalContextProvider';
import { User } from '../../../types/user';
import { profileStyles } from '../Styles/ProfileStyle';

export const useProfileDataHandler = () => {
  const styles = useRef(profileStyles).current;
  const { name, email, avatar, userType, uid, isConnected, cart, location } = useGlobalContext();

  const userData: User = {
    uid: uid,
    isConnected: isConnected,
    email: email,
    name: name,
    userType: userType,
    avatar: avatar,
    transactions: [
      {
        id: 1,
        productName: 'Apples',
        quantity: 5,
        price: 100,
        date: '2022-01-01',
      },
      {
        id: 2,
        productName: 'Carrots',
        quantity: 10,
        price: 50,
        date: '2022-02-01',
      },
    ],
    badges: [
      // {
      //   id: 1,
      //   name: "Bronze",
      //   color: "#aa6c2a",
      // },
      // {
      //   id: 2,
      //   name: 'Silver',
      //   color: "#d9d9d9",
      // },
      {
        id: 3,
        name: 'Gold',
        color: "#e09f3e",
      },
    ],
    cart: cart,
    location: location
  };

  const actions = [
    {
      name: 'Order History',
      endpoint: '/orders',
      backgroundColor: '#f9c74f',
      iconName: 'pricetags',
    },
    {
      name: 'My Farms',
      endpoint: '/favorites',
      backgroundColor: '#dc2f02',
      iconName: 'home-outline',
    },
    {
      name: 'Payment Methods',
      endpoint: '/payments',
      backgroundColor: '#43aa8b',
      iconName: 'card',
    },
    {
      name: 'My Reviews',
      endpoint: '/reviews',
      backgroundColor: '#f48c06',
      iconName: 'list',
    },
    {
      name: 'Help & Support',
      endpoint: '/help',
      backgroundColor: '#90be6d',
      iconName: 'help-circle',
    },
  ];

  return { userData, actions, styles };
};
