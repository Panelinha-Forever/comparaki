import React, { useState, useEffect } from 'react';

import { ScrollView, TouchableOpacity, Keyboard } from 'react-native';

import { withTheme, Modal } from 'react-native-paper';

import { Tooltip, Divider } from 'react-native-elements';

import { AntDesign } from '@expo/vector-icons';

import {
  Content,
  Typography,
  Container,
  Row,
  Input,
  Navbar,
  Button,
} from '../../styles/global';

import Calendar from '../../components/Calendar';

import { putProduct, deleteProduct } from '../../services/storage';

import { validator } from '../../utils/functions';

import { retrieveSiteName } from '../../utils/functions';

import IconButton from '../../components/IconButton';

const moment = require('moment');

function EditProduct({ route, navigation, theme }) {
  const [errors, setErrors] = useState({
    name: false,
    desiredPrice: false,
  });

  const [scrollviewRef, setScrollViewRef] = useState({});

  const [name, setName] = useState('');
  const [desiredPrice, setDesiredPrice] = useState('');
  const [formattedDesireDate, setFormattedDesiredDate] = useState(null);
  const [visible, setVisible] = useState(false);
  const [desiredDate, setDesiredDate] = useState(null);

  const [quotations, setQuotations] = useState([]);
  const [site, setSite] = useState('');
  const [value, setValue] = useState('');

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
        quotations: prodQuotations,
      } = route.params;

      setName(prodName);
      setDesiredPrice(prodDesiredPrice);
      setFormattedDesiredDate(prodFormattedDesireDate);
      setDesiredDate(prodDesiredDate);
      setQuotations(prodQuotations);

      setErrors({
        name: false,
        desiredPrice: false,
      });
    });

    return unsubscribe;
  }, [navigation]);

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
    setTimeout(() => {
      scrollviewRef.scrollToEnd({ animated: true });
    }, 300);
  }

  function removeFromQuotions(idx) {
    setQuotations(quotations.filter((_, i) => i !== idx));
  }

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

    let sanatizedArray = [];
    quotations.map((q) => {
      if (q && q.site && q.value) {
        sanatizedArray.push(q);
      }
    });

    await putProduct(route.params.id, {
      name,
      desiredPrice,
      desiredDate,
      formattedDesireDate,
      quotations: sanatizedArray,
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
        <IconButton
          onPress={() => navigation.navigate('Home')}
          size={28}
          color={theme.colors.primary}
          name={'arrow-left'}
        />
        <IconButton
          onPress={deleteProductRequest}
          size={28}
          color={theme.colors.error}
          name={'trash-alt'}
        />
      </Navbar>

      <Content>
        <ScrollView
          showsVerticalScrollIndicator={false}
          ref={(ref) => setScrollViewRef(ref)}
        >
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
              mode='outlined'
              value={formattedDesireDate}
              label='Data máxima para compra'
              rightIcon={
                <AntDesign
                  size={28}
                  color={theme.colors.primary}
                  name={'calendar'}
                />
              }
              onFocus={() => {
                Keyboard.dismiss();
                setVisible(true);
              }}
            />
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
              onFocus={() => {
                setTimeout(() => {
                  scrollviewRef.scrollToEnd({ animated: true });
                }, 300);
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
              onFocus={() => {
                setTimeout(() => {
                  scrollviewRef.scrollToEnd({ animated: true });
                }, 300);
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
          setDate={(e) => setDesiredDate(e)}
        />
      </Modal>
    </Container>
  );
}

export default withTheme(EditProduct);
