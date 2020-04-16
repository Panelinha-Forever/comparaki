import React from 'react';

import { FontAwesome } from '@expo/vector-icons';

import { Typography } from '../../styles/global';

import { Container, Image, Info, Toolbar, Wrap, CompButton } from './styles';

import { Button, Linking, Share } from 'react-native';

export default function Card({ navigation, product }) {
  async function handleShare() {
    try {
      const result = await Share.share({
        message: `COMPARANDOAKI encontrei o melhor preço para ${product.name} com o valor R$${product.desiredPrice} em www.kabum.com`,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  }
  function handleEdit() {
    navigation.navigate('Product', product);
  }

  function handleBrowser() {
    Linking.openURL(
      'https://www.kabum.com.br/produto/101268/placa-de-video-galax-nvidia-geforce-gtx-1660-1-click-oc-6gb-gddr5-60srh7dsy91c'
    );
  }
  return (
    <Container>
      <Wrap>
        <Typography
          uppercase
          fontSize={22}
          color={'#2f2cb9'}
          align={'center'}
          fontWeight={'bold'}
        >
          {product.name}
        </Typography>

        <Image resizeMode={'cover'} source={{ uri: product.imagePath }} />
        <Info>
          <Typography
            uppercase
            fontSize={13}
            color={'#6F9441'}
            align={'center'}
            fontWeight={'bold'}
            mb={13}
            mt={13}
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
            NO SITE{' '}
            <Typography
              uppercase
              fontSize={12}
              color={'#4200FF'}
              align={'left'}
              fontWeight={'bold'}
            >
              KABUM{' '}
              <Typography
                uppercase
                fontSize={12}
                color={'#505050'}
                align={'left'}
                fontWeight={'bold'}
              >
                POR{' '}
                <Typography
                  uppercase
                  fontSize={12}
                  color={'#2F5CCE'}
                  align={'left'}
                  fontWeight={'bold'}
                >
                  R$4000{' '}
                  <Typography
                    uppercase
                    color={'#505050'}
                    fontSize={12}
                    align={'left'}
                    fontWeight={'bold'}
                  >
                    EM{' '}
                  </Typography>
                  <Typography
                    uppercase
                    fontSize={12}
                    color={'#D9B600'}
                    align={'left'}
                    fontWeight={'bold'}
                  >
                    25/03/20{' '}
                  </Typography>
                </Typography>
              </Typography>
            </Typography>
          </Typography>

          <Typography
            uppercase
            fontSize={12}
            color={'#505050'}
            align={'left'}
            fontWeight={'bold'}
          >
            VALOR DESEJADO{' '}
            <Typography
              uppercase
              fontSize={12}
              color={'#2F5CCE'}
              align={'left'}
              fontWeight={'bold'}
            >
              R${product.desiredPrice}{' '}
              <Typography
                fontSize={12}
                color={'#505050'}
                align={'left'}
                fontWeight={'bold'}
              >
                ATÉ{' '}
              </Typography>
              <Typography
                uppercase
                fontSize={12}
                color={'#FF9900'}
                align={'left'}
                fontWeight={'bold'}
              >
                {' '}
                {product.formattedDesireDate}
              </Typography>
            </Typography>
          </Typography>
        </Info>
        <CompButton color={'#191FB4'} title='finalizar' />
      </Wrap>
      <Toolbar>
        <FontAwesome
          size={28}
          onPress={handleEdit}
          color={'white'}
          name={'edit'}
        />
        <FontAwesome
          onPress={handleBrowser}
          size={28}
          color={'white'}
          name={'internet-explorer'}
        />
        <FontAwesome size={28} color={'white'} name={'dollar'} />
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
