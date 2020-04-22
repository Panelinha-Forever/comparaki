import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';

import { getProducts, putProduct } from '../../services/storage';

import Card from '../../components/Card';

import { Content, Row, Container, Typography } from '../../styles/global';

import { View } from 'react-native';

import { Button, Dialog, RadioButton } from 'react-native-paper';

export default function Home({ navigation }) {
  const [products, setProducts] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(1);
  const [selectedProdId, setSelectedProdId] = useState(null);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      const prodList = await getProducts();
      setProducts(prodList);
    });

    return unsubscribe;
  }, [navigation]);

  async function handleFinish() {
    await putProduct(selectedProdId, { status: selectedOption });
    setVisible(false);
  }

  function showFinishOptions(prodId) {
    setVisible(true);
    setSelectedProdId(prodId);
  }

  return (
    <Container>
      {/* <Navbar>
        <MaterialIcons size={28} color={'#191FB4'} name={'translate'} />
      </Navbar> */}
      <Content>
        <ScrollView showsVerticalScrollIndicator={false}>
          {products.map((p) => (
            <Card
              key={p.id}
              navigation={navigation}
              product={p}
              showFinishOptions={showFinishOptions}
            />
          ))}
        </ScrollView>
      </Content>

      <Dialog dismissable={false} visible={visible}>
        <Dialog.Title>Finalizar produto</Dialog.Title>
        <Typography ml={20} mt={'-15'} mb={10} fontSize={16} color={'#c5c5c5'}>
          Escolha uma das opções abaixo para finalizar
        </Typography>
        <Dialog.Content>
          <Row mb={10} align='center'>
            <RadioButton
              value='1'
              status={selectedOption === 1 ? 'checked' : 'unchecked'}
              onPress={() => setSelectedOption(1)}
            />
            <Typography fontWeight={selectedOption === 1 && 'bold'}>
              Eu comprei o produto
            </Typography>
          </Row>
          <Row align='center'>
            <RadioButton
              value='2'
              status={selectedOption === 2 ? 'checked' : 'unchecked'}
              onPress={() => setSelectedOption(2)}
            />
            <Typography fontWeight={selectedOption === 2 && 'bold'}>
              Eu desisti do produto
            </Typography>
          </Row>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={handleFinish}>Finalizar</Button>
          <Button onPress={() => setVisible(false)}>Cancelar</Button>
        </Dialog.Actions>
      </Dialog>
    </Container>
  );
}
