import React, { useState, useEffect } from 'react';

import { ScrollView } from 'react-native';

import { withTheme } from 'react-native-paper';

import { Tooltip } from 'react-native-elements';

import { AntDesign } from '@expo/vector-icons';

import { retrieveSiteName } from '../../utils/functions';

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
  const [site, setSite] = useState(null);
  const [value, setValue] = useState(null);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      const { name: prodName, quotations: prodQuotations } = route.params;
      setName(prodName);
      setQuotations(prodQuotations);
    });

    return unsubscribe;
  }, [navigation]);

  function handleAddQuotation() {
    if (site && value) {
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
    }
  }

  function removeFromQuotions(idx) {
    setQuotations(quotations.filter((_, i) => i !== idx));
  }

  async function handleSaveProduct() {
    let sanatizedArray = [];
    quotations.map((q) => {
      if (q && q.site && q.value) {
        sanatizedArray.push(q);
      }
    });

    await putProduct(route.params.id, {
      quotations: sanatizedArray,
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
        <Tooltip
          containerStyle={{
            height: 'auto',
          }}
          overlayColor='transparent'
          popover={
            <Typography color={theme.colors.inactive} fontSize={12}>
              Altere ou adicione os links com os valores do produto que deseja
              comprar
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
          <Typography
            align='center'
            color={theme.colors.primary}
            uppercase
            fontSize={25}
          >
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
                  onChangeText={(text) => {
                    quotations[idx].site = text;
                    setQuotations([...quotations]);
                  }}
                  placeholder='https://www.exemplo.com.br/produto'
                  label='Site *'
                />
                <Input
                  dense
                  minWidth={'100%'}
                  mode='outlined'
                  onChangeText={(text) => {
                    quotations[idx].value = text.replace(/\D/g, '');
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
              value={site}
              placeholder='https://www.exemplo.com.br/produto'
              label='Site *'
              onChangeText={(text) => {
                setSite(text);
              }}
            />
            <Input
              value={value}
              keyboardType={'number-pad'}
              placeholder='1000'
              label='Valor'
              onChangeText={(text) => {
                setValue(text.replace(/\D/g, ''));
              }}
            />
            <Row justify='flex-end'>
              <Button
                style={{ marginTop: 10 }}
                color={theme.colors.primary}
                disabled={
                  site === null || site === '' || value === null || value === ''
                }
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
    </Container>
  );
}

export default withTheme(Price);
