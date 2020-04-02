import React, { useState, useEffect } from 'react';

import { ScrollView } from 'react-native';

import { withTheme, Button, Modal } from 'react-native-paper';

import { AntDesign } from '@expo/vector-icons';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Content, Container, Navbar } from '../../styles/global';

import Calendar from '../../components/Calendar';

import { Input, Image, Row } from './styles';

const moment = require('moment');

function Product({ route, navigation, theme }) {
  const [visible, setVisible] = useState(false);
  const [date, setDate] = useState(
    moment()
      .add(1, 'week')
      .format('YYYY-MM-DD')
  );
  const [formattedDate, setFormattedDate] = useState(null);

  useEffect(() => {
    if (moment(date).isValid) {
      setDate(date);
      setFormattedDate(moment(date).format('DD/MM/YYYY'));
      setVisible(false);
    }
  }, [date]);

  return (
    <Container>
      <Navbar>
        <AntDesign
          onPress={() => navigation.navigate('Home')}
          size={28}
          color={theme.colors.primary}
          name={'arrowleft'}
        />
        {route.params && route.params.product && (
          <MaterialCommunityIcons
            size={28}
            color={'red'}
            name={'delete-forever'}
          />
        )}
        <AntDesign size={28} color={theme.colors.primary} name={'question'} />
      </Navbar>
      <Content>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Image />
          <Input mode='outlined' label='Nome' />
          <Input mode='outlined' label='Descrição' />

          <Input
            mode='outlined'
            keyboardType={'number-pad'}
            label='Preço desejado'
          />

          <Row>
            <MaterialCommunityIcons
              size={28}
              color={theme.colors.secondary}
              name={'calendar'}
              onPress={() => setVisible(true)}
            />

            <Input
              style={{ marginLeft: 10, maxWidth: '85%' }}
              mode='outlined'
              disabled
              value={formattedDate}
              label='Data máxima para compra'
            />
          </Row>

          <Button
            style={{ marginTop: 10 }}
            color={theme.colors.secondary}
            mode='contained'
            onPress={() => console.log('Pressed')}
          >
            Salvar
          </Button>
        </ScrollView>
        <Modal onDismiss={() => setVisible(false)} visible={visible}>
          <Calendar setDate={setDate} />
        </Modal>
      </Content>
    </Container>
  );
}

export default withTheme(Product);
