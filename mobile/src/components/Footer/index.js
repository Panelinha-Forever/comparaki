import React from 'react';

import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import { Container } from './styles';

export default function Footer() {
  return (
    <Container>
      <MaterialIcons size={28} color={'white'} name={'add-circle-outline'} />
      <FontAwesome size={28} color={'white'} name={'home'} />
      <MaterialIcons size={28} color={'white'} name={'format-list-bulleted'} />
    </Container>
  );
}
