import React, { useState, useEffect } from 'react';

import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

import { Typography, Button } from '../../styles/global';

import { Container, Toolbar, Content } from './styles';

import { Tooltip } from 'react-native-elements';

import { Linking, Share, TouchableOpacity } from 'react-native';

const moment = require('moment');

export default function ProdCard({
  theme,
  navigation,
  product,
  showFinishOptions,
}) {
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

  function handlePrice() {
    navigation.navigate('Price', product);
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
                color={'#2E5E96'}
              >
                {bestOffer.siteName}
                <Typography
                  uppercase
                  fontSize={12}
                  color={'#505050'}
                  align={'left'}
                  fontWeight={'bold'}
                >
                  {` POR `}
                  <Typography
                    uppercase
                    fontSize={12}
                    color={'#2E5E96'}
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
                      color={theme.colors.accent}
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
              {`VALOR DE COMPRA DESEJADO DE `}
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
                  color={theme.colors.accent}
                  align={'left'}
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

        <Button
          dark
          mt={10}
          contentStyle={{ backgroundColor: '#312298' }}
          color={'white'}
          onPress={() => showFinishOptions(product.id)}
        >
          Finalizar
        </Button>
      </Content>
      <Toolbar>
        <TouchableOpacity onPress={handleEdit}>
          <FontAwesome size={28} color={'white'} name={'edit'} />
        </TouchableOpacity>
        {canOpenSite ? (
          <TouchableOpacity onPress={handleBrowser}>
            <MaterialCommunityIcons size={28} color={'white'} name={'earth'} />
          </TouchableOpacity>
        ) : (
          <Tooltip
            overlayColor='transparent'
            popover={
              <Typography color={theme.colors.inactive} fontSize={11}>
                O link do produto é inválido
              </Typography>
            }
          >
            <MaterialCommunityIcons
              size={28}
              color={theme.colors.disabled}
              name={'earth'}
            />
          </Tooltip>
        )}
        <TouchableOpacity onPress={handlePrice}>
          <FontAwesome size={28} color={'white'} name={'dollar'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleShare}>
          <FontAwesome size={28} color={'white'} name={'share-alt-square'} />
        </TouchableOpacity>
      </Toolbar>
    </Container>
  );
}
