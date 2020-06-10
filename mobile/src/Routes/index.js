import 'react-native-gesture-handler';

import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';

import { HomeTabNavigator } from './tabNavigation';

const Stack = createStackNavigator();

import EditProduct from '../pages/EditProduct';
import Price from '../pages/Price';

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Home'
        screenOptions={{
          headerLeft: null,
          headerTitleAlign: 'center',
          gestureEnabled: true,
          headerStyle: {
            backgroundColor: '#332B68',
          },
          headerTintColor: '#ffffff',
          headerBackTitleVisible: false,
          ...TransitionPresets.ModalPresentationIOS,
        }}
      >
        <Stack.Screen
          options={{ title: 'COMPARAKI' }}
          name='Home'
          component={HomeTabNavigator}
        />
        <Stack.Screen
          options={{
            title: 'EDIÇÃO DE PRODUTO',
          }}
          name='EditProduct'
          component={EditProduct}
        />
        <Stack.Screen
          options={{
            title: 'ATUALIZAÇÃO DE VALORES',
          }}
          name='Price'
          component={Price}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
