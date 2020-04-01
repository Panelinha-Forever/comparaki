import React from 'react';

import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

import { Container } from './styles';

export default function Navbar() {
  return (
    <Container>
      <AntDesign size={28} color={'#191FB4'} name={'arrowleft'} />
      <Feather size={28} color={'#191FB4'} name={'x'} />
      <FontAwesome size={28} color={'#191FB4'} name={'question'} />
    </Container>
  );
}
