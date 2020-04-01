import React from 'react';

import { Button } from 'react-native';

import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import { Container } from './styles';

export default function Footer({ navigation }) {
  return (
    <Container>
      <MaterialIcons
        onPress={() => navigation.navigate('Product')}
        size={28}
        color={'white'}
        name={'add-circle-outline'}
      />
      <FontAwesome
        onPress={() => navigation.navigate('Home')}
        size={28}
        color={'white'}
        name={'home'}
      />
      <MaterialIcons
        onPress={() => navigation.navigate('History')}
        size={28}
        color={'white'}
        name={'format-list-bulleted'}
      />
    </Container>
  );
}
