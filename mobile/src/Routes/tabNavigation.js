import 'react-native-gesture-handler';

import React from 'react';

import { Ionicons } from '@expo/vector-icons';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '../pages/Home/';
import Product from '../pages/Product';
import History from '../pages/History';

const Tab = createBottomTabNavigator();

function getHeaderTitle(route) {
  const routeName = route.state
    ? route.state.routes[route.state.index].name
    : 'COMPARAKI';

  switch (routeName) {
    case 'Home':
      return 'COMPARAKI';
    case 'Product':
      return 'PRODUTO';
    case 'History':
      return 'HISTÓRICO';
  }
}

export const HomeTabNavigator = ({ navigation, route }) => {
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name == 'Product') {
            iconName = 'md-add-circle-outline';
          } else if (route.name == 'Home') {
            iconName = 'ios-home';
          } else if (route.name == 'History') {
            iconName = 'ios-list';
          }

          return <Ionicons size={size} color={color} name={iconName} />;
        }
      })}
    >
      <Tab.Screen
        options={{ title: 'Adicionar Produto' }}
        name='Product'
        component={Product}
      />
      <Tab.Screen options={{ title: 'Home' }} name='Home' component={Home} />
      <Tab.Screen
        options={{ title: 'Histórico' }}
        name='History'
        component={History}
      />
    </Tab.Navigator>
  );
};
