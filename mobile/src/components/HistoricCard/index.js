import React, { useState, useEffect } from 'react';

import {
  FontAwesome,
  MaterialCommunityIcons,
  AntDesign,
} from '@expo/vector-icons';

import { Typography, Button } from '../../styles/global';

import { withTheme } from 'react-native-paper';

import { Container, Toolbar, Content } from '../Card/styles';

import { TouchableOpacity, Linking, Share } from 'react-native';

const moment = require('moment');

function HistoricCard({ navigation, product, deleteProduct }) {
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
  async function handleDelete() {
    await deleteProduct(product.id);
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
          Finalizado em {product.formattedDesireDate}
        </Typography>

        <Typography
          uppercase
          fontSize={17}
          color={product.status === 1 ? '#2FB92C' : '#828282'}
          align={'center'}
          fontWeight={'bold'}
          mb={10}
          mt={10}
        >
          {product.status === 1 ? 'COMPRADO' : 'DESISTIDO'}
        </Typography>
        <Typography
          uppercase
          fontSize={12}
          color={'#505050'}
          align={'left'}
          fontWeight={'bold'}
        >
          {`SITE: `}
          <Typography
            uppercase
            fontSize={12}
            fontWeight={'bold'}
            color={'#4200FF'}
          >
            {`${bestOffer.site} `}
          </Typography>
        </Typography>
        <Typography
          uppercase
          fontSize={12}
          color={'#505050'}
          align={'left'}
          fontWeight={'bold'}
        >
          {`VALOR: `}
          <Typography
            uppercase
            fontSize={12}
            fontWeight={'bold'}
            color={'#4200FF'}
          >
            {`R$${product.desiredPrice} `}
          </Typography>
        </Typography>
        <Typography
          uppercase
          fontSize={12}
          color={'#505050'}
          align={'left'}
          fontWeight={'bold'}
        >
          {`ÚLTIMA ATUALIZAÇÃO: `}
          <Typography
            uppercase
            fontSize={12}
            fontWeight={'bold'}
            color={'#4200FF'}
          >
            {`${moment(bestOffer.created_at).format('DD/MM/YYYY')} `}
          </Typography>
        </Typography>
        <Typography
          uppercase
          fontSize={12}
          color={'#505050'}
          align={'left'}
          fontWeight={'bold'}
        >
          {`VALOR DESEJADO: `}
          <Typography
            uppercase
            fontSize={12}
            fontWeight={'bold'}
            color={'#4200FF'}
          >
            {`R$${product.desiredPrice} `}
          </Typography>
        </Typography>
      </Content>
      <Toolbar>
        <TouchableOpacity onPress={handleDelete}>
          <AntDesign size={28} color={'white'} name={'delete'} />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleBrowser}>
          <MaterialCommunityIcons size={28} color={'white'} name={'earth'} />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleShare}>
          <FontAwesome size={28} color={'white'} name={'share-alt-square'} />
        </TouchableOpacity>
      </Toolbar>
    </Container>
  );
}

export default withTheme(HistoricCard);
