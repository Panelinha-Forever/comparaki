import React, { useState, useEffect } from 'react';

import { getProducts, putProduct } from '../../services/storage';

import Card from '../../components/Card';

import { Content, Row, Container, Typography } from '../../styles/global';

import { CheckBox } from 'react-native-elements';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import { withTheme, Button, Dialog } from 'react-native-paper';

import { ScrollView } from 'react-native';

import InfoCard from '../../components/InfoCard';

function Home({ navigation, theme }) {
  const [products, setProducts] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(1);
  const [selectedProdId, setSelectedProdId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const prodList = await getProducts();
      setProducts(prodList);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      const prodList = await getProducts();
      setProducts(prodList);
    });

    return unsubscribe;
  }, [navigation]);

  async function getSetProducts() {
    const prodList = await getProducts();
    setProducts(prodList);
  }

  async function handleFinish() {
    await putProduct(selectedProdId, { status: selectedOption });
    await getSetProducts();

    setVisible(false);
    navigation.navigate('History');
  }

  function showFinishOptions(prodId) {
    setVisible(true);
    setSelectedProdId(prodId);
  }

  return (
    <Container>
      <Content>
        <ScrollView showsVerticalScrollIndicator={false}>
          {products.length > 0 ? (
            products.map((p) => (
              <Card
                key={p.id}
                navigation={navigation}
                product={p}
                showFinishOptions={showFinishOptions}
                theme={theme}
              />
            ))
          ) : (
            <InfoCard />
          )}
        </ScrollView>
      </Content>

      <Dialog dismissable={false} visible={visible}>
        <Dialog.Title>
          <Typography color='#2E5E96'>Finalizar produto</Typography>
        </Dialog.Title>
        <Typography ml={20} mt={'-15'} mb={10} fontSize={16} color={'#919191'}>
          Escolha uma das opções abaixo para finalizar
        </Typography>
        <Dialog.Content>
          <Row mb={10} align='center'>
            <CheckBox
              checkedIcon={
                <MaterialCommunityIcons
                  size={28}
                  color={theme.colors.active}
                  name={'radiobox-marked'}
                />
              }
              uncheckedIcon={
                <MaterialCommunityIcons
                  size={28}
                  color={theme.colors.primary}
                  name={'radiobox-blank'}
                />
              }
              checked={selectedOption === 1}
              onPress={() => setSelectedOption(1)}
            />

            <Typography
              color={theme.colors.primary}
              fontWeight={selectedOption === 1 && 'bold'}
            >
              Eu comprei o produto
            </Typography>
          </Row>
          <Row align='center'>
            <CheckBox
              checkedIcon={
                <MaterialCommunityIcons
                  size={28}
                  color={theme.colors.active}
                  name={'radiobox-marked'}
                />
              }
              uncheckedIcon={
                <MaterialCommunityIcons
                  size={28}
                  color={theme.colors.primary}
                  name={'radiobox-blank'}
                />
              }
              checked={selectedOption === 2}
              onPress={() => setSelectedOption(2)}
            />
            <Typography
              color={theme.colors.primary}
              fontWeight={selectedOption === 2 && 'bold'}
            >
              Eu desisti do produto
            </Typography>
          </Row>
        </Dialog.Content>
        <Dialog.Actions>
          <Button color={theme.colors.secondary} onPress={handleFinish}>
            Finalizar
          </Button>
          <Button onPress={() => setVisible(false)}>Cancelar</Button>
        </Dialog.Actions>
      </Dialog>
    </Container>
  );
}

export default withTheme(Home);
