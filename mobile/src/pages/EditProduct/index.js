import React, { useState, useEffect } from 'react';

import { ScrollView, View, Text } from 'react-native';

import { withTheme, Button, Modal, IconButton } from 'react-native-paper';

import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';

import {
  Content,
  Container,
  Typography,
  Row,
  Input,
  Navbar,
  Image,
  ImageContainer,
  ImageActions,
} from '../../styles/global';

import Calendar from '../../components/Calendar';

import * as ImagePicker from 'expo-image-picker';

import { putProduct, deleteProduct } from '../../services/storage';

const moment = require('moment');

function EditProduct({ route, navigation, theme }) {
  const [chooseImageModal, setChooseImageModal] = useState(false);

  const [name, setName] = useState('');
  const [imagePath, setImagePath] = useState(null);
  const [desiredPrice, setDesiredPrice] = useState('');
  const [formattedDesireDate, setFormattedDesiredDate] = useState(null);
  const [visible, setVisible] = useState(false);
  const [desiredDate, setDesiredDate] = useState(
    // moment().add(1, 'week').format('YYYY-MM-DD')
    null
  );

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      const {
        name: prodName,
        imagePath: prodImagePath,
        desiredPrice: prodDesiredPrice,
        formattedDesireDate: prodFormattedDesireDate,
        desiredDate: prodDesiredDate,
      } = route.params;

      setName(prodName);
      setImagePath(prodImagePath);
      setDesiredPrice(prodDesiredPrice);
      setFormattedDesiredDate(prodFormattedDesireDate);
      setDesiredDate(prodDesiredDate);
    });

    return unsubscribe;
  }, [navigation]);

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
    await putProduct(route.params.id, {
      name,
      desiredPrice,
      desiredDate,
      formattedDesireDate,
      imagePath,
      update_at: new Date(),
    });

    navigation.navigate('Home');
  }

  async function deleteProductRequest() {
    await deleteProduct(route.params.id);

    navigation.navigate('Home');
  }

  function selectImagePicker(params) {
    setChooseImageModal(true);
  }

  return (
    <Container>
      <Navbar>
        <AntDesign
          onPress={() => navigation.pop(1)}
          size={28}
          color={theme.colors.primary}
          name={'arrowleft'}
        />
        <AntDesign
          onPress={deleteProductRequest}
          size={28}
          color={theme.colors.error}
          name={'delete'}
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
                name={`${imagePath ? 'circle-edit-outline' : 'plus-box'}`}
                onPress={selectImagePicker}
              />
            </ImageActions>
          </ImageContainer>
          <Input
            mb={10}
            mode='outlined'
            label='Nome'
            value={name}
            onChange={(e) => setName(e.nativeEvent.text)}
          />

          <Input
            mb={10}
            mode='outlined'
            keyboardType={'number-pad'}
            label='Preço de compra desejado'
            value={desiredPrice}
            onChange={(e) => setDesiredPrice(e.nativeEvent.text)}
          />

          <Row mb={25}>
            <Input
              minWidth={'100%'}
              mode='outlined'
              disabled
              value={formattedDesireDate}
              label='Data máxima para compra'
            />

            <IconButton
              style={{ position: 'absolute', right: 0, height: '100%' }}
              color={theme.colors.secondary}
              icon='calendar'
              size={30}
              onPress={() => setVisible(true)}
            />
          </Row>

          <Button
            style={{ marginTop: 30 }}
            color={theme.colors.secondary}
            mode='contained'
            onPress={() => handleSaveProduct()}
          >
            Salvar
          </Button>
        </ScrollView>
      </Content>

      <Modal onDismiss={() => setVisible(false)} visible={visible}>
        <Calendar
          date={desiredDate}
          setModalVisibility={setVisible}
          setDate={setDesiredDate}
        />
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
              mb={50}
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
    </Container>
  );
}

export default withTheme(EditProduct);
