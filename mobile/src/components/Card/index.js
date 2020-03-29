import React from 'react';

const ProductImage = require('../../../assets/t-home.png');
import { FontAwesome } from '@expo/vector-icons';

import { Typography } from '../../styles/global';

import { Container, Image, Info, Toolbar, Wrap, CompButton } from './styles';

import { Button, Text } from 'react-native';

export default function Card() {
  return (
    <Container>
      <Wrap>
        <Typography
          uppercase
          fontSize={'22px'}
          color={'#2f2cb9'}
          align={'center'}
          fontWeight={'bold'}
        >
          Notebook
        </Typography>

        <Image resizeMode={'contain'} source={ProductImage}></Image>
        <Info>
          <Typography
            uppercase
            fontSize={'13px'}
            color={'#6F9441'}
            align={'center'}
            fontWeight={'bold'}
            mb={'13px'}
            mt={'13px'}
          >
            Melhor oferta
          </Typography>
          <Typography
            uppercase
            fontSize={'12px'}
            color={'#505050'}
            align={'left'}
            fontWeight={'bold'}
          >
            NO SITE{' '}
            <Typography
              uppercase
              fontSize={'12px'}
              color={'#4200FF'}
              align={'left'}
              fontWeight={'bold'}
            >
              KABUM{' '}
              <Typography
                uppercase
                fontSize={'12px'}
                color={'#505050'}
                align={'left'}
                fontWeight={'bold'}
              >
                POR{' '}
                <Typography
                  uppercase
                  fontSize={'12px'}
                  color={'#2F5CCE'}
                  align={'left'}
                  fontWeight={'bold'}
                >
                  R$4000{' '}
                  <Typography
                    uppercase
                    color={'#505050'}
                    fontSize={'12px'}
                    align={'left'}
                    fontWeight={'bold'}
                  >
                    EM{' '}
                  </Typography>
                  <Typography
                    uppercase
                    fontSize={'12px'}
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
            fontSize={'12px'}
            color={'#505050'}
            align={'left'}
            fontWeight={'bold'}
          >
            VALOR DESEJADO{' '}
            <Typography
              uppercase
              fontSize={'12px'}
              color={'#2F5CCE'}
              align={'left'}
              fontWeight={'bold'}
            >
              R$4000{' '}
              <Typography
                fontSize={'12px'}
                color={'#505050'}
                align={'left'}
                fontWeight={'bold'}
              >
                ATÉ{' '}
              </Typography>
              <Typography
                uppercase
                fontSize={'12px'}
                color={'#FF9900'}
                align={'left'}
                fontWeight={'bold'}
              >
                {' '}
                25/03/20
              </Typography>
            </Typography>
          </Typography>
        </Info>
        <CompButton color={'#191FB4'} title='finalizar' />
      </Wrap>
      <Toolbar>
        <FontAwesome size={28} color={'white'} name={'edit'} />
        <FontAwesome size={28} color={'white'} name={'internet-explorer'} />
        <FontAwesome size={28} color={'white'} name={'dollar'} />
        <FontAwesome size={28} color={'white'} name={'share-alt-square'} />
      </Toolbar>
    </Container>
  );
}
