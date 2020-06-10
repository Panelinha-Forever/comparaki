import React, { useState, useEffect } from 'react';

import { ScrollView } from 'react-native';

import { getHistoricProducts } from '../../services/storage';

import HistoricCard from '../../components/HistoricCard';

import { Content, Container } from '../../styles/global';

import { withTheme } from 'react-native-paper';

import InfoCard from '../../components/InfoCard';

function History({ navigation, theme }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      await getProducts();
    });
    return unsubscribe;
  }, [navigation]);

  async function getProducts() {
    const prodList = await getHistoricProducts();
    setProducts(prodList);
  }

  return (
    <Container>
      <Content>
        <ScrollView showsVerticalScrollIndicator={false}>
          {products.length > 0 ? (
            products.map((p) => (
              <HistoricCard
                key={p.id}
                navigation={navigation}
                product={p}
                theme={theme}
                getProducts={getProducts}
              />
            ))
          ) : (
            <InfoCard />
          )}
        </ScrollView>
      </Content>
    </Container>
  );
}

export default withTheme(History);
