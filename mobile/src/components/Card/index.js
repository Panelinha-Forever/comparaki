import React, { useState, useEffect } from 'react';

import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

import { Typography, Button } from '../../styles/global';

import { Container, Toolbar, Content, SideButton } from './styles';

import { Tooltip } from 'react-native-elements';

import { Linking, Share } from 'react-native';

const moment = require('moment');

export default function ProdCard({ theme, navigation, product }) {
  const [bestOffer, setBestOffer] = useState({});
  const [canOpenSite, setCanOpenSite] = useState(false);

  useEffect(() => {
    async function getProduct() {
      if (product.quotations.length > 0) {
        let tempBestOffer = product.quotations[0];

        for (const quotation of product.quotations) {
          if (quotation.value < tempBestOffer.value) {
            tempBestOffer = quotation;
          }
        }

        tempBestOffer.site.length > 10
          ? tempBestOffer.site.substring(0, 10 - 3) + '...'
          : tempBestOffer.site;

        const canOpenSite = await Linking.canOpenURL(tempBestOffer.site);

        setCanOpenSite(canOpenSite);
        setBestOffer(tempBestOffer);
      }

      calculateDaysRemaining();
    }
    getProduct();
  }, [product]);

  function calculateDaysRemaining() {
    return moment(product.desiredDate).diff(moment(), 'days') + 1;
  }

  async function handleShare() {
    try {
      await Share.share({
        message: `COMPARANDOAKI encontrei o melhor preço para ${product.name} com o valor R$${bestOffer.value} em ${bestOffer.site}`,
      });
    } catch (error) {
      alert(error.message);
    }
  }
  function handleEdit() {
    navigation.navigate('EditProduct', product);
  }

  function handleBrowser() {
    Linking.openURL(bestOffer.site);
  }

  return (
    <Container>
      <Content>
        <Typography
          uppercase
          fontSize={18}
          color={theme.colors.active}
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
          {calculateDaysRemaining() < 1
            ? `TEMPO EXPIRADO`
            : `${calculateDaysRemaining()} dias para acabar`}
        </Typography>

        {product.quotations.length > 0 ? (
          <>
            <Typography
              uppercase
              fontSize={17}
              color={theme.colors.secondary}
              align={'center'}
              fontWeight={'bold'}
              mb={10}
              mt={10}
            >
              Melhor oferta
            </Typography>
            <Typography uppercase color={'#505050'} fontWeight={'bold'}>
              {`NO SITE `}
              <Typography uppercase fontWeight={'bold'} color={'#2E5E96'}>
                {bestOffer.siteName}
                <Typography uppercase color={'#505050'} fontWeight={'bold'}>
                  {` POR `}
                  <Typography uppercase color={'#2E5E96'} fontWeight={'bold'}>
                    {`R$${bestOffer.value} `}
                    <Typography uppercase color={'#505050'} fontWeight={'bold'}>
                      {`ATUALIZADO EM `}
                    </Typography>
                    <Typography
                      uppercase
                      color={theme.colors.accent}
                      fontWeight={'bold'}
                    >
                      {`${moment(bestOffer.created_at).format('DD/MM/YYYY')} `}
                    </Typography>
                  </Typography>
                </Typography>
              </Typography>
            </Typography>

            <Typography uppercase mt={5} color={'#505050'} fontWeight={'bold'}>
              {`VALOR DE COMPRA DESEJADO DE `}
              <Typography uppercase color={'#2F5CCE'} fontWeight={'bold'}>
                {`R$${product.desiredPrice} `}

                <Typography color={'#505050'} fontWeight={'bold'}>
                  {`ATÉ `}
                </Typography>
                <Typography
                  uppercase
                  color={theme.colors.accent}
                  fontWeight={'bold'}
                >
                  {`${product.formattedDesireDate}`}
                </Typography>
              </Typography>
            </Typography>
          </>
        ) : (
          <>
            <Typography
              uppercase
              fontSize={14}
              align={'center'}
              fontWeight={'bold'}
              mb={10}
              mt={10}
            >
              Parece que você ainda não adicionou valores para esse produto
            </Typography>
          </>
        )}
      </Content>
      <Toolbar>
        <SideButton onPress={handleEdit}>
          <FontAwesome size={28} color={'white'} name={'edit'} />
        </SideButton>
        <SideButton onPress={handleBrowser}>
          <MaterialCommunityIcons size={28} color={'white'} name={'earth'} />
        </SideButton>
        <SideButton onPress={handleShare}>
          <FontAwesome size={28} color={'white'} name={'share-alt-square'} />
        </SideButton>
      </Toolbar>
    </Container>
  );
}
