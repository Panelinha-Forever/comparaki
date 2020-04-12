import React, { useState, useEffect } from 'react';

import { ScrollView, Alert, View, Text } from 'react-native';

import { withTheme, Button, Modal } from 'react-native-paper';

import { AntDesign } from '@expo/vector-icons';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Content, Container, Navbar, Typography } from '../../styles/global';

import Calendar from '../../components/Calendar';

import {
  Input,
  Image,
  ImageContainer,
  Row,
  ImageActions,
  ImageActions2,
} from './styles';

import * as ImagePicker from 'expo-image-picker';

import {
  storeProduct,
  putProduct,
  clearProducts,
} from '../../services/storage';

const moment = require('moment');

function Product({ route, navigation, theme }) {
  const [chooseImageModal, setChooseImageModal] = useState(false);

  const [name, setName] = useState('');
  const [imagePath, setImagePath] = useState(null);
  const [desiredPrice, setDesiredPrice] = useState('');
  const [formattedDesireDate, setFormattedDesiredDate] = useState(null);
  const [visible, setVisible] = useState(false);
  const [desiredDate, setDesiredDate] = useState(
    moment().add(1, 'week').format('YYYY-MM-DD')
  );

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      resetFields();
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (moment(desiredDate).isValid) {
      setDesiredDate(desiredDate);
      setFormattedDesiredDate(moment(desiredDate).format('DD/MM/YYYY'));
      setVisible(false);
    }
  }, [desiredDate]);

  function goBack(params) {
    navigation.navigate('Home');
  }

  async function pickImageFromCamera() {
    try {
      let response = await ImagePicker.launchCameraAsync({
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      });

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        setImagePath(response.uri);
      }
    } catch (E) {
      console.log(E);
    }

    setChooseImageModal(false);
  }

  async function pickImageFromGallery() {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        setImagePath(result.uri);
      }
    } catch (E) {
      console.log(E);
    }

    setChooseImageModal(false);
  }

  async function handleSaveProduct() {
    await storeProduct({
      name,
      desiredPrice,
      desiredDate,
      formattedDesireDate,
      imagePath,
      created_at: new Date(),
      update_at: new Date(),
    });

    resetFields();

    Alert.alert('Notificação', 'Produto salvo com sucesso');

    navigation.navigate('Home');
  }

  function selectImagePicker(params) {
    setChooseImageModal(true);
  }

  function resetFields() {
    setName('');
    setImagePath(null);
    setDesiredPrice('');
    setDesiredDate(moment().add(1, 'week').format('YYYY-MM-DD'));
    setImagePath(null);
  }

  return (
    <Container>
      <Navbar>
        <AntDesign
          onPress={goBack}
          size={28}
          color={theme.colors.primary}
          name={'arrowleft'}
        />
        <AntDesign size={28} color={theme.colors.primary} name={'question'} />
      </Navbar>
      <Content>
        <ScrollView showsVerticalScrollIndicator={false}>
          <ImageContainer>
            <Image source={{ uri: imagePath }} />
            <ImageActions>
              <MaterialCommunityIcons
                size={55}
                color={theme.colors.secondary}
                name={'plus-box'}
                onPress={selectImagePicker}
              />
            </ImageActions>
          </ImageContainer>
          <Input
            mode='outlined'
            label='Nome'
            value={name}
            onChange={(e) => setName(e.nativeEvent.text)}
          />

          <Input
            mode='outlined'
            keyboardType={'number-pad'}
            label='Preço desejado'
            value={desiredPrice}
            onChange={(e) => setDesiredPrice(e.nativeEvent.text)}
          />

          <Row>
            <MaterialCommunityIcons
              size={28}
              color={theme.colors.secondary}
              name={'calendar'}
              onPress={() => setVisible(true)}
            />

            <Input
              style={{ marginLeft: 10, maxWidth: '85%' }}
              mode='outlined'
              disabled
              value={formattedDesireDate}
              label='Data máxima para compra'
            />
          </Row>

          <Button
            style={{ marginTop: 10 }}
            color={theme.colors.secondary}
            mode='contained'
            onPress={() => handleSaveProduct()}
          >
            Salvar
          </Button>
        </ScrollView>

        <Modal onDismiss={() => setVisible(false)} visible={visible}>
          <Calendar setDate={setDesiredDate} />
        </Modal>

        <Modal
          animationType='slide'
          transparent={false}
          visible={chooseImageModal}
          onDismiss={() => setChooseImageModal(false)}
        >
          <View style={{ marginTop: 22 }}>
            <View
              style={{
                marginLeft: 'auto',
                marginRight: 'auto',
                width: '90%',
                backgroundColor: 'white',
                height: '60%',
              }}
            >
              <Typography
                fontSize={15}
                color={theme.colors.primary}
                align={'center'}
                mb={20}
                mt={10}
              >
                Escolha uma das fontes
              </Typography>
              <ImageActions>
                <MaterialCommunityIcons
                  size={55}
                  color={theme.colors.secondary}
                  name={'camera'}
                  onPress={pickImageFromCamera}
                />
                <MaterialCommunityIcons
                  size={55}
                  color={theme.colors.secondary}
                  name={'folder-image'}
                  onPress={pickImageFromGallery}
                />
              </ImageActions>
            </View>
          </View>
        </Modal>
      </Content>
    </Container>
  );
}

export default withTheme(Product);
