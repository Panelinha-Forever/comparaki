import React, { useState, useEffect } from 'react';

import { ScrollView } from 'react-native';

import { withTheme } from 'react-native-paper';

import { AntDesign } from '@expo/vector-icons';

import {
  Content,
  Container,
  Typography,
  Row,
  Input,
  Button,
  Navbar,
} from '../../styles/global';

import { putProduct } from '../../services/storage';

function Price({ route, navigation, theme }) {
  const [name, setName] = useState('');
  const [quotations, setQuotations] = useState([]);
  const [site, setSite] = useState('');
  const [value, setValue] = useState('');

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      const { name: prodName, quotations: prodQuotations } = route.params;

      setName(prodName);
      setQuotations(prodQuotations);
    });

    return unsubscribe;
  }, [navigation]);

  function handleAddQuotation() {
    let newQuotations = [
      ...quotations,
      { site, value, created_at: new Date(), update_at: new Date() },
    ];
    setQuotations(newQuotations);
    setSite('');
    setValue('');
  }

  function removeFromQuotions(idx) {
    setQuotations(quotations.filter((item, i) => i !== idx));
  }

  async function handleSaveProduct() {
    await putProduct(route.params.id, {
      quotations,
      update_at: new Date(),
    });
    navigation.navigate('Home');
  }

  return (
    <Container>
      <Navbar>
        <AntDesign
          onPress={() => navigation.pop(1)}
          size={28}
          color={theme.colors.primary}
          name={'arrowleft'}
        />
        <AntDesign size={28} color={theme.colors.primary} name={'question'} />
      </Navbar>

      <Content>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Typography align='center' color='#2E5E96' uppercase fontSize={25}>
            {name}
          </Typography>

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

                  <AntDesign
                    size={30}
                    onPress={() => {
                      removeFromQuotions(idx);
                    }}
                    color={theme.colors.error}
                    name={'delete'}
                  />
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
                  onChange={(e) => {
                    quotations[idx].value = e.nativeEvent.text;
                    setQuotations([...quotations]);
                  }}
                  value={q.value}
                  keyboardType={'number-pad'}
                  label='Valor'
                />
              </Container>
            ))}

          <Container mt={10} padding={10}>
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
    </Container>
  );
}

export default withTheme(Price);
