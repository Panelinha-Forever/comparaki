import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';

import { getProducts } from '../../services/storage';

import Card from '../../components/Card';

import { Content, Container } from '../../styles/global';

export default function Home({ navigation }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      const prodList = await getProducts();
      setProducts(prodList);
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <Container>
      {/* <Navbar>
        <MaterialIcons size={28} color={'#191FB4'} name={'translate'} />
      </Navbar> */}
      <Content>
        <ScrollView showsVerticalScrollIndicator={false}>
          {products.map((p) => (
            <Card navigation={navigation} key={p.id} product={p} />
          ))}
        </ScrollView>
      </Content>
    </Container>
  );
}
