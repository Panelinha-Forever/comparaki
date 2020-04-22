import React, { useState, useEffect } from 'react';

import { ScrollView, TouchableOpacity } from 'react-native';

import { withTheme, Button, Modal, IconButton } from 'react-native-paper';

import { AntDesign } from '@expo/vector-icons';

import { Content, Container, Row, Input, Navbar } from '../../styles/global';

import Calendar from '../../components/Calendar';

import { putProduct, deleteProduct } from '../../services/storage';

const moment = require('moment');

function EditProduct({ route, navigation, theme }) {
  const [name, setName] = useState('');
  const [desiredPrice, setDesiredPrice] = useState('');
  const [formattedDesireDate, setFormattedDesiredDate] = useState(null);
  const [visible, setVisible] = useState(false);
  const [desiredDate, setDesiredDate] = useState(null);

  useEffect(() => {
    setFormattedDesiredDate(moment(desiredDate).format('DD/MM/YYYY'));
  }, [desiredDate]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      const {
        name: prodName,
        desiredPrice: prodDesiredPrice,
        formattedDesireDate: prodFormattedDesireDate,
        desiredDate: prodDesiredDate,
      } = route.params;

      setName(prodName);
      setDesiredPrice(prodDesiredPrice);
      setFormattedDesiredDate(prodFormattedDesireDate);
      setDesiredDate(prodDesiredDate);
    });

    return unsubscribe;
  }, [navigation]);

  async function handleSaveProduct() {
    await putProduct(route.params.id, {
      name,
      desiredPrice,
      desiredDate,
      formattedDesireDate,
      update_at: new Date(),
    });

    navigation.navigate('Home');
  }

  async function deleteProductRequest() {
    await deleteProduct(route.params.id);
    navigation.navigate('Home');
  }

  return (
    <Container>
      <Navbar>
        <TouchableOpacity onPress={() => navigation.pop(1)}>
          <AntDesign
            size={28}
            color={theme.colors.primary}
            name={'arrowleft'}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={deleteProductRequest}>
          <AntDesign size={28} color={theme.colors.error} name={'delete'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log('Ajuda')}>
          <AntDesign size={28} color={theme.colors.primary} name={'question'} />
        </TouchableOpacity>
      </Navbar>

      <Content>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Input
            mb={10}
            mode='outlined'
            label='Nome'
            value={name}
            onChange={(e) => setName(e.nativeEvent.text)}
          />

          <Input
            mb={10}
            mode='outlined'
            keyboardType={'number-pad'}
            label='Preço de compra desejado'
            value={desiredPrice}
            onChange={(e) => setDesiredPrice(e.nativeEvent.text)}
          />

          <Row mb={25}>
            <Input
              minWidth={'100%'}
              mode='outlined'
              disabled
              value={formattedDesireDate}
              label='Data máxima para compra'
            />

            <IconButton
              style={{ position: 'absolute', right: 0, height: '100%' }}
              color={theme.colors.secondary}
              icon='calendar'
              size={30}
              onPress={() => setVisible(true)}
            />
          </Row>

          <Button
            style={{ marginTop: 30 }}
            color={theme.colors.secondary}
            mode='contained'
            onPress={() => handleSaveProduct()}
          >
            Salvar
          </Button>
        </ScrollView>
      </Content>

      <Modal onDismiss={() => setVisible(false)} visible={visible}>
        <Calendar
          date={desiredDate}
          setModalVisibility={setVisible}
          setDate={(e) => setDesiredDate(e)}
        />
      </Modal>
    </Container>
  );
}

export default withTheme(EditProduct);
