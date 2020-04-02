import 'react-native-gesture-handler';

import React from 'react';

import { Ionicons } from '@expo/vector-icons';

import { NavigationContainer } from '@react-navigation/native';

import {
  createStackNavigator,
  TransitionPresets
} from '@react-navigation/stack';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { HomeTabNavigator } from './tabNavigation';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

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
          headerBackTitleVisible: false,
          ...TransitionPresets.ModalPresentationIOS
        }}
      >
        <Stack.Screen name='Home' component={HomeTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
