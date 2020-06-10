import React from 'react';

import { Row, Typography } from '../../styles/global';

import { Ionicons } from '@expo/vector-icons';

import { View } from 'react-native';

export default function InfoCard() {
  return (
    <View style={{ marginTop: '50%', marginLeft: 'auto', marginRight: 'auto' }}>
      <Row height={60}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '30%',
          }}
        >
          <Ionicons
            size={30}
            color={'#9b9b9b'}
            name={'md-add-circle-outline'}
          />
          <Typography color={'#9b9b9b'} mt={5} fontSize={11}>
            Adicionar Produto
          </Typography>
        </View>
        <View style={{ marginLeft: 20, maxWidth: '65%' }}>
          <Typography color={'#9b9b9b'} fontSize={15}>
            Cadastre um produto e adicione os sites com os valores para realizar
            a cotação
          </Typography>
        </View>
      </Row>
      <Row mt={20} height={60}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '30%',
          }}
        >
          <Ionicons size={30} color={'#9b9b9b'} name={'ios-home'} />
          <Typography color={'#9b9b9b'} mt={5} fontSize={11}>
            Home
          </Typography>
        </View>
        <View style={{ marginLeft: 20, maxWidth: '65%' }}>
          <Typography fontSize={15} color={'#9b9b9b'}>
            Acompanhe os valores dos seus produtos em uma home minimalista
          </Typography>
        </View>
      </Row>
      <Row mt={20} height={60}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '30%',
          }}
        >
          <Ionicons size={30} color={'#9b9b9b'} name={'ios-list'} />
          <Typography mt={5} color={'#9b9b9b'} fontSize={11}>
            Histórico
          </Typography>
        </View>
        <View style={{ marginLeft: 20, maxWidth: '65%' }}>
          <Typography fontSize={15} color={'#9b9b9b'}>
            Veja o histórico dos produtos que você adquiriu ou que não teve mais
            interesse
          </Typography>
        </View>
      </Row>
    </View>
  );
}
