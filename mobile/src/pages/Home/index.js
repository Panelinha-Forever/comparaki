import React from 'react';
import { ScrollView } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';

import Card from '../../components/Card';
import Footer from '../../components/Footer';

import { Content, Container, Navbar } from '../../styles/global';
// import { Container } from './styles';

export default function Home({ navigation }) {
  return (
    <Container>
      <Navbar>
        <MaterialIcons size={28} color={'#191FB4'} name={'translate'} />
      </Navbar>
      <Content>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </ScrollView>
      </Content>
      <Footer navigation={navigation} />
    </Container>
  );
}
