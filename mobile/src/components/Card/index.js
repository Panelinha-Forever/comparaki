import React, { useState, useEffect } from 'react';

import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

import { Typography, Button, Image } from '../../styles/global';

import { Container, Toolbar, Content } from './styles';

import { Linking, Share } from 'react-native';

const moment = require('moment');

export default function ProdCard({ navigation, product }) {
  const [bestOffer, setBestOffer] = useState({});

  useEffect(() => {
    if (product.quotations.length > 0) {
      let tempBestOffer = product.quotations[0];

      for (const quotation of product.quotations) {
        if (quotation.value < tempBestOffer.value) {
          tempBestOffer = quotation;
        }
      }

      setBestOffer(tempBestOffer);
    }
  }, [product]);

  async function handleShare() {
    try {
      await Share.share({
        message: `COMPARANDOAKI encontrei o melhor preço para ${product.name} com o valor R$${product.desiredPrice} em www.kabum.com`,
      });
    } catch (error) {
      alert(error.message);
    }
  }
  function handleEdit() {
    navigation.navigate('EditProduct', product);
  }
  function handlePrice() {
    navigation.navigate('Price', product);
  }

  /** COLOCAR O SITE DO PREÇO */
  function handleBrowser() {
    Linking.openURL(
      'https://www.kabum.com.br/produto/101268/placa-de-video-galax-nvidia-geforce-gtx-1660-1-click-oc-6gb-gddr5-60srh7dsy91c'
    );
  }
  return (
    <Container>
      <Content>
        <Typography
          uppercase
          fontSize={18}
          color={'#4200FF'}
          align={'center'}
          fontWeight={'bold'}
        >
          {product.name.length > 42
            ? product.name.substring(0, 42 - 3) + '...'
            : product.name}
        </Typography>
        <Typography
          uppercase
          fontSize={14}
          color={'#C4C4C4'}
          align={'center'}
          fontWeight={'bold'}
        >
          {moment(product.desiredDate).diff(new Date(), 'days')} dias para
          acabar
        </Typography>
        <Image
          mt={10}
          height={'100px'}
          resizeMode={'cover'}
          source={{ uri: product.imagePath }}
        />

        <Typography
          uppercase
          fontSize={17}
          color={'#6F9441'}
          align={'center'}
          fontWeight={'bold'}
          mb={10}
          mt={10}
        >
          Melhor oferta
        </Typography>
        <Typography
          uppercase
          fontSize={12}
          color={'#505050'}
          align={'left'}
          fontWeight={'bold'}
        >
          {`NO SITE `}
          <Typography
            uppercase
            fontSize={12}
            fontWeight={'bold'}
            color={'#4200FF'}
          >
            {`${bestOffer.site} `}
            <Typography
              uppercase
              fontSize={12}
              color={'#505050'}
              align={'left'}
              fontWeight={'bold'}
            >
              {`POR `}
              <Typography
                uppercase
                fontSize={12}
                color={'#2F5CCE'}
                align={'left'}
                fontWeight={'bold'}
              >
                {`R$${bestOffer.value} `}
                <Typography
                  uppercase
                  color={'#505050'}
                  fontSize={12}
                  align={'left'}
                  fontWeight={'bold'}
                >
                  {`ATUALIZADO EM `}
                </Typography>
                <Typography
                  uppercase
                  fontSize={12}
                  color={'#D9B600'}
                  align={'left'}
                  fontWeight={'bold'}
                >
                  {`${moment(bestOffer.created_at).format('DD/MM/YYYY')} `}
                </Typography>
              </Typography>
            </Typography>
          </Typography>
        </Typography>

        <Typography
          uppercase
          fontSize={12}
          mt={5}
          color={'#505050'}
          align={'left'}
          fontWeight={'bold'}
        >
          {`VALOR DE COMPRA DESEJADO `}
          <Typography
            uppercase
            fontSize={12}
            color={'#2F5CCE'}
            align={'left'}
            fontWeight={'bold'}
          >
            {`R$${product.desiredPrice} `}

            <Typography
              fontSize={12}
              color={'#505050'}
              align={'left'}
              fontWeight={'bold'}
            >
              {`ATÉ `}
            </Typography>
            <Typography
              uppercase
              fontSize={12}
              color={'#FF9900'}
              align={'left'}
              fontWeight={'bold'}
            >
              {`${product.formattedDesireDate}`}
            </Typography>
          </Typography>
        </Typography>

        <Button
          dark
          mt={10}
          contentStyle={{ backgroundColor: '#191FB4' }}
          color={'white'}
        >
          Finalizar
        </Button>
      </Content>
      <Toolbar>
        <FontAwesome
          size={28}
          onPress={handleEdit}
          color={'white'}
          name={'edit'}
        />
        <MaterialCommunityIcons
          onPress={handleBrowser}
          size={28}
          color={'white'}
          name={'earth'}
        />
        <FontAwesome
          onPress={handlePrice}
          size={28}
          color={'white'}
          name={'dollar'}
        />
        <FontAwesome
          onPress={handleShare}
          size={28}
          color={'white'}
          name={'share-alt-square'}
        />
      </Toolbar>
    </Container>
  );
}
