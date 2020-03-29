import React from 'react';
import Card from './src/components/Card';

import { StyleSheet, Text, View, ScrollView, StatusBar } from 'react-native';

import { Header, Typography } from './src/styles/global';

export default function App() {
  return (
    <View>
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
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
