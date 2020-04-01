import React from 'react';

import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../pages/Home/';
import Product from '../pages/Product';
import History from '../pages/History';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Home'
        screenOptions={{
          headerTitleAlign: 'center',
          gestureEnabled: true,
          headerStyle: {
            backgroundColor: '#2E5E96'
          },
          headerTintColor: '#ffffff',
          headerBackTitleVisible: false
        }}
        headerMode='float'
      >
        <Stack.Screen
          name='Home'
          options={{ title: 'COMPARAKI' }}
          component={Home}
        />
        <Stack.Screen
          name='Product'
          options={{ title: 'PRODUTO' }}
          component={Product}
        />
        <Stack.Screen
          name='History'
          options={{ title: 'HISTÓRICO' }}
          component={History}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
