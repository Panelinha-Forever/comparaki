import React, { useState, useEffect } from 'react';

import { ScrollView, TouchableOpacity } from 'react-native';

import { withTheme, Modal, Divider, IconButton } from 'react-native-paper';

import { AntDesign } from '@expo/vector-icons';

import { retrieveSiteName } from '../../utils/functions';

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

function Product({ route, navigation, theme }) {
  const [name, setName] = useState('');
  const [desiredPrice, setDesiredPrice] = useState('');
  const [formattedDesireDate, setFormattedDesiredDate] = useState(null);
  const [visible, setVisible] = useState(false);
  const [desiredDate, setDesiredDate] = useState(
    moment().add(1, 'week').format('YYYY-MM-DD')
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
    setName('');
    setDesiredPrice('');
    setDesiredDate(moment().add(1, 'week').format('YYYY-MM-DD'));
    setQuotations([]);
    setSite('');
    setValue('');
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
    setSite('');
    setValue('');
  }

  function removeFromQuotions(idx) {
    setQuotations(quotations.filter((item, i) => i !== idx));
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

        <TouchableOpacity onPress={() => console.log('AJUDA')}>
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

            <AntDesign
              size={30}
              color={theme.colors.primary}
              name={'questioncircle'}
            />
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
                  dense
                  mb={10}
                  mt={10}
                  mode='outlined'
                  value={q.site}
                  onChange={(e) => {
                    quotations[idx].site = e.nativeEvent.text;
                    setQuotations([...quotations]);
                  }}
                  label='Site'
                />
                <Input
                  dense
                  minWidth={'100%'}
                  mode='outlined'
                  value={q.value}
                  onChange={(e) => {
                    quotations[idx].value = e.nativeEvent.text;
                    setQuotations([...quotations]);
                  }}
                  keyboardType={'number-pad'}
                  label='Valor'
                />
              </Container>
            ))}

          <Container padding={10}>
            <Input
              mb={10}
              mode='flat'
              value={site}
              label='Site'
              style={{ backgroundColor: '#fff' }}
              onChange={(e) => setSite(e.nativeEvent.text)}
            />
            <Input
              minWidth={'100%'}
              mode='flat'
              style={{ backgroundColor: '#fff' }}
              value={value}
              keyboardType={'number-pad'}
              label='Valor'
              onChange={(e) => setValue(e.nativeEvent.text)}
            />
            <Row justify='flex-end'>
              <Button
                style={{ marginTop: 10 }}
                color={theme.colors.primary}
                mode='contained'
                onPress={() => handleAddQuotation()}
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
