import React, { useState, useEffect } from 'react';

import { FontAwesome, AntDesign } from '@expo/vector-icons';

import { Typography } from '../../styles/global';

import { Container, Toolbar, Content } from '../Card/styles';

import { Share, TouchableOpacity } from 'react-native';

import { deleteProduct } from '../../services/storage';

const moment = require('moment');

export default function HistoricCard({
  theme,
  product,
  getProducts,
  navigation,
}) {
  const [bestOffer, setBestOffer] = useState({});

  useEffect(() => {
    async function getProduct() {
      if (product.quotations.length > 0) {
        let tempBestOffer = product.quotations[0];

        for (const quotation of product.quotations) {
          if (quotation.value < tempBestOffer.value) {
            tempBestOffer = quotation;
          }

          tempBestOffer.site.length > 10
            ? tempBestOffer.site.substring(0, 10 - 3) + '...'
            : tempBestOffer.site;
        }

        setBestOffer(tempBestOffer);
      }
    }
    getProduct();
  }, [product]);

  async function handleShare() {
    try {
      await Share.share({
        message: `COMPARANDOAKI encontrei ${product.name} com o valor de R$${product.desiredPrice} em www.kabum.com`,
      });
    } catch (error) {
      alert(error.message);
    }
  }
  async function handleDelete() {
    await deleteProduct(product.id);

    await getProducts();
  }

  return (
    <Container>
      <Content>
        <Typography
          uppercase
          fontSize={18}
          color={theme.colors.primary}
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
          color={theme.colors.disabled}
          align={'center'}
          fontWeight={'bold'}
        >
          Finalizado em {product.formattedDesireDate}
        </Typography>

        <Typography
          uppercase
          fontSize={17}
          color={product.status === 1 ? theme.colors.secondary : '#828282'}
          align={'center'}
          fontWeight={'bold'}
          mb={10}
          mt={10}
        >
          {product.status === 1 ? 'COMPRADO' : 'DESISTIDO'}
        </Typography>

        {product.quotations.length > 0 ? (
          <>
            <Typography
              uppercase
              color={'#505050'}
              align={'left'}
              fontWeight={'bold'}
            >
              {`SITE: `}
              <Typography
                uppercase
                fontWeight={'bold'}
                color={theme.colors.primary}
              >
                {`${bestOffer.site} `}
              </Typography>
            </Typography>
            <Typography
              uppercase
              color={'#505050'}
              align={'left'}
              fontWeight={'bold'}
            >
              {`VALOR: `}
              <Typography uppercase fontWeight={'bold'} color={'#4200FF'}>
                {`R$${product.desiredPrice} `}
              </Typography>
            </Typography>
            <Typography
              uppercase
              color={'#505050'}
              align={'left'}
              fontWeight={'bold'}
            >
              {`ÚLTIMA ATUALIZAÇÃO: `}
              <Typography uppercase fontWeight={'bold'} color={'#4200FF'}>
                {`${moment(bestOffer.created_at).format('DD/MM/YYYY')} `}
              </Typography>
            </Typography>
            <Typography
              uppercase
              color={'#505050'}
              align={'left'}
              fontWeight={'bold'}
            >
              {`VALOR DESEJADO: `}
              <Typography uppercase fontWeight={'bold'} color={'#4200FF'}>
                {`R$${product.desiredPrice} `}
              </Typography>
            </Typography>
          </>
        ) : (
          <>
            <Typography
              uppercase
              color={'#505050'}
              align={'center'}
              fontWeight={'bold'}
            >
              Acompanhamento finalizado sem nenhum valor cadastrado
            </Typography>
          </>
        )}
      </Content>
      <Toolbar>
        <TouchableOpacity onPress={handleDelete}>
          <AntDesign size={28} color={'white'} name={'delete'} />
        </TouchableOpacity>

        {product.quotations.length > 0 && (
          <TouchableOpacity onPress={handleShare}>
            <FontAwesome size={28} color={'white'} name={'share-alt-square'} />
          </TouchableOpacity>
        )}
      </Toolbar>
    </Container>
  );
}
