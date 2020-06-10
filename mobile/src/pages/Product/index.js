import React, { useState, useEffect } from 'react';

import { ScrollView, TouchableOpacity } from 'react-native';

import { Tooltip, Divider } from 'react-native-elements';

import { withTheme, Modal } from 'react-native-paper';

import { AntDesign } from '@expo/vector-icons';

import { retrieveSiteName, validator } from '../../utils/functions';

import {
  Content,
  Container,
  Navbar,
  Typography,
  Row,
  Button,
  Input,
} from '../../styles/global';

import Calendar from '../../components/Calendar';

import { storeProduct } from '../../services/storage';

const moment = require('moment');

function Product({ navigation, theme }) {
  const [errors, setErrors] = useState({
    name: false,
    desiredPrice: false,
  });
  const [name, setName] = useState('');
  const [desiredPrice, setDesiredPrice] = useState('');
  const [formattedDesireDate, setFormattedDesiredDate] = useState(null);
  const [visible, setVisible] = useState(false);
  const [desiredDate, setDesiredDate] = useState(
    moment().add(8, 'days').format('YYYY-MM-DD')
  );

  const [quotations, setQuotations] = useState([]);
  const [site, setSite] = useState('');
  const [value, setValue] = useState('');

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      resetFields();
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (moment(desiredDate).isValid) {
      setDesiredDate(desiredDate);
      setFormattedDesiredDate(moment(desiredDate).format('DD/MM/YYYY'));
      setVisible(false);
    }
  }, [desiredDate]);

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

    await storeProduct({
      name,
      desiredPrice,
      desiredDate,
      formattedDesireDate,
      quotations,
      created_at: new Date(),
      update_at: new Date(),
    });

    resetFields();
    navigation.navigate('Home');
  }

  function resetFields() {
    setDesiredDate(moment().add(1, 'week').format('YYYY-MM-DD'));
    setQuotations([]);
    setSite(null);
    setName(null);
    setDesiredPrice(null);
    setValue(null);
    setErrors({
      name: false,
      desiredPrice: false,
    });
  }

  function handleAddQuotation() {
    const siteName = retrieveSiteName(site);

    let newQuotations = [
      ...quotations,
      {
        site,
        siteName,
        value,
        created_at: new Date(),
        update_at: new Date(),
      },
    ];
    setQuotations(newQuotations);
    setSite(null);
    setValue(null);
    setErrors({ ...errors, site: false, value: false });
  }

  function removeFromQuotions(idx) {
    setQuotations(quotations.filter((_, i) => i !== idx));
  }

  return (
    <Container>
      <Navbar>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <AntDesign
            size={28}
            color={theme.colors.primary}
            name={'arrowleft'}
          />
        </TouchableOpacity>
        <Tooltip
          containerStyle={{
            height: 'auto',
          }}
          overlayColor='transparent'
          popover={
            <Typography color={theme.colors.inactive} fontSize={12}>
              Preencha os campos abaixo com o nome do produto e o preço de
              compra desejado.
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
            placeholder='Produto Exemplo'
            label='Nome do produto *'
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

          <Row mb={25} mt={25}>
            <Input
              mode='outlined'
              keyboardType={'number-pad'}
              label='Preço de compra desejado *'
              placeholder={'1000'}
              value={desiredPrice}
              onChangeText={(text) => {
                setDesiredPrice(text.replace(/\D/g, ''));
                setErrors({ ...errors, desiredPrice: false });
              }}
              inputContainerStyle={{
                borderBottomColor: `${errors.desiredPrice ? 'red' : '#86939e'}`,
              }}
              labelStyle={{
                color: `${errors.desiredPrice ? 'red' : '#86939e'}`,
              }}
            />
          </Row>

          <Row mb={25}>
            <Input
              mode='outlined'
              disabled
              value={formattedDesireDate}
              label='Data máxima para compra'
              style={{ width: '100%' }}
            />

            <TouchableOpacity
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                position: 'absolute',
                right: 0,
                top: '10%',
                height: '90%',
                paddingLeft: 10,
                paddingRight: 10,
              }}
              onPress={() => setVisible(true)}
            >
              <AntDesign
                size={28}
                color={theme.colors.primary}
                name={'calendar'}
              />
            </TouchableOpacity>
          </Row>

          <Divider style={{ backgroundColor: 'black' }} />

          <Row align='center' justify='space-evenly' padding={15}>
            <Typography
              fontSize={22}
              color={theme.colors.primary}
              fontWeight='bold'
              uppercase
            >
              Cotação de valores
            </Typography>

            <Tooltip
              overlayColor='transparent'
              popover={
                <Typography color={theme.colors.inactive} fontSize={10}>
                  Cole os links do produto e informe os valores
                </Typography>
              }
            >
              <AntDesign
                size={28}
                color={theme.colors.primary}
                name={'questioncircleo'}
              />
            </Tooltip>
          </Row>

          {quotations.length > 0 &&
            quotations.map((q, idx) => (
              <Container mt={10} mb={10} padding={15} key={idx}>
                <Row justify='space-between'>
                  <Typography
                    color={theme.colors.secondary}
                    fontWeight='bold'
                    uppercase
                    fontSize={25}
                  >
                    {idx + 1}
                  </Typography>

                  <TouchableOpacity
                    onPress={() => {
                      removeFromQuotions(idx);
                    }}
                  >
                    <AntDesign
                      size={30}
                      color={theme.colors.error}
                      name={'delete'}
                    />
                  </TouchableOpacity>
                </Row>
                <Input
                  disabled
                  dense
                  mb={10}
                  mt={10}
                  mode='outlined'
                  value={q.site}
                  label='Site'
                />
                <Input
                  disabled
                  dense
                  mode='outlined'
                  value={q.value}
                  keyboardType={'number-pad'}
                  label='Valor'
                />
              </Container>
            ))}

          <Container padding={10}>
            <Input
              mode='outlined'
              label='Site *'
              placeholder='https://www.exemplo.com.br/produto'
              value={site}
              onChangeText={(text) => {
                setSite(text);
              }}
            />

            <Input
              mode='outlined'
              label='Valor *'
              value={value}
              placeholder='1000'
              keyboardType='number-pad'
              onChangeText={(text) => {
                setValue(text.replace(/\D/g, ''));
              }}
            />

            <Row justify='flex-end'>
              <Button
                mt={10}
                disabled={
                  site === null || site === '' || value === null || value === ''
                }
                color={theme.colors.primary}
                mode='contained'
                onPress={handleAddQuotation}
              >
                Adicionar
              </Button>
            </Row>
          </Container>

          <Button
            mt={10}
            mb={20}
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
          setDate={setDesiredDate}
        />
      </Modal>
    </Container>
  );
}

export default withTheme(Product);
