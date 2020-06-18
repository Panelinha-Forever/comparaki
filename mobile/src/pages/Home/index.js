import React, { useState, useEffect } from 'react';

import { getProducts } from '../../services/storage';

import Card from '../../components/Card';

import { Content, Container } from '../../styles/global';

import { withTheme } from 'react-native-paper';

import { ScrollView, TouchableOpacity } from 'react-native';

import { Icon } from 'react-native-elements';

function Home({ navigation, theme }) {
  const [products, setProducts] = useState([]);

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

  function navigateToProduct() {
    navigation.navigate('Product');
  }

  return (
    <Container>
      <Content>
        <ScrollView showsVerticalScrollIndicator={false}>
          {products.map((p) => (
            <Card
              key={p.id}
              navigation={navigation}
              product={p}
              theme={theme}
            />
          ))}
        </ScrollView>
        <TouchableOpacity
          style={{
            position: 'absolute',
            bottom: 40,
            right: 20,
          }}
          onPress={navigateToProduct}
        >
          <Icon
            reverse
            name='ios-add'
            type='ionicon'
            size={30}
            color={theme.colors.active}
          />
        </TouchableOpacity>
      </Content>
    </Container>
  );
}

export default withTheme(Home);
