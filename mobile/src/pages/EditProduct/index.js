import React, { useState, useEffect } from 'react';

import { ScrollView, TouchableOpacity } from 'react-native';

import { withTheme, Button, Modal, IconButton } from 'react-native-paper';

import { Tooltip } from 'react-native-elements';

import { AntDesign } from '@expo/vector-icons';

import {
  Content,
  Typography,
  Container,
  Row,
  Input,
  Navbar,
} from '../../styles/global';

import Calendar from '../../components/Calendar';

import { putProduct, deleteProduct } from '../../services/storage';

import { validator } from '../../utils/functions';

const moment = require('moment');

function EditProduct({ route, navigation, theme }) {
  const [errors, setErrors] = useState({
    name: false,
    desiredPrice: false,
  });

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

      setErrors({
        name: false,
        desiredPrice: false,
      });
    });

    return unsubscribe;
  }, [navigation]);

  async function handleSaveProduct() {
    const validate = validator([
      { field: 'name', value: name },
      { field: 'desiredPrice', value: desiredPrice },
    ]);

    if (validate.length !== 0) {
      let newErrors = {};
      for (const validation of validate) {
        newErrors[validation.field] = true;
      }

      setErrors(newErrors);
      return;
    }

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
        <Tooltip
          overlayColor='transparent'
          popover={
            <Typography color={theme.colors.inactive} fontSize={12}>
              Edite o produto que deseja comprar
            </Typography>
          }
        >
          <AntDesign
            size={28}
            color={theme.colors.primary}
            name={'questioncircleo'}
          />
        </Tooltip>
      </Navbar>

      <Content>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Input
            mb={10}
            mode='outlined'
            label='Nome'
            value={name}
            onChangeText={(text) => {
              setName(text);
              setErrors({ ...errors, name: false });
            }}
            inputContainerStyle={{
              borderBottomColor: `${errors.name ? 'red' : '#86939e'}`,
            }}
            labelStyle={{
              color: `${errors.name ? 'red' : '#86939e'}`,
            }}
          />

          <Input
            mb={10}
            mode='outlined'
            keyboardType={'number-pad'}
            label='Preço de compra desejado'
            value={desiredPrice}
            onChangeText={(text) => {
              setDesiredPrice(text);
              setErrors({ ...errors, desiredPrice: false });
            }}
            inputContainerStyle={{
              borderBottomColor: `${errors.desiredPrice ? 'red' : '#86939e'}`,
            }}
            labelStyle={{
              color: `${errors.desiredPrice ? 'red' : '#86939e'}`,
            }}
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
              color={theme.colors.primary}
              icon='calendar'
              size={30}
              onPress={() => setVisible(true)}
            />
          </Row>

          <Button
            color={theme.colors.secondary}
            mode='contained'
            onPress={handleSaveProduct}
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
