import React from 'react';

import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import { Container } from './styles';

export default function Navbar() {
  return (
    <Container>
      <MaterialIcons size={28} color={'#191FB4'} name={'translate'} />
    </Container>
  );
}
