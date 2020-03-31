import React from 'react';
import Card from './src/components/Card';
import Footer from './src/components/Footer';

import { ScrollView, StatusBar } from 'react-native';

import { Header, Typography, Content, Container } from './src/styles/global';

export default function App() {
  return (
    <Container>
      <StatusBar
        barStyle='light-content'
        hidden={false}
        backgroundColor='#0000'
        translucent={false}
        networkActivityIndicatorVisible={true}
      />
      <Header>
        <Typography
          uppercase
          fontSize={'25px'}
          color={'#FFFF'}
          align={'center'}
        >
          Comparaki
        </Typography>
      </Header>
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
      <Footer />
    </Container>
  );
}
