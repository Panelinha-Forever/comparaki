import React, { useState, useEffect } from 'react';
import { ScrollView, Button } from 'react-native';

import { getProducts, clearProducts } from '../../services/storage';

import Card from '../../components/Card';

import { Content, Container } from '../../styles/global';

export default function Home({ navigation }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function getProds(params) {
      const prodList = await getProducts();

      setProducts(prodList);
    }

    getProds();
  }, [products]);

  return (
    <Container>
      {/* <Navbar>
        <MaterialIcons size={28} color={'#191FB4'} name={'translate'} />
      </Navbar> */}
      <Content>
        <Button title={'Reset'} onPress={clearProducts}></Button>
        <ScrollView showsVerticalScrollIndicator={false}>
          {products.map((p) => (
            <Card navigation={navigation} key={p.id} product={p} />
          ))}
        </ScrollView>
      </Content>
    </Container>
  );
}
