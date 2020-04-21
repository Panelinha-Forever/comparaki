import React, { useState, useEffect } from 'react';

import { ScrollView, View } from 'react-native';

import { withTheme, Button, Modal, IconButton } from 'react-native-paper';

import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';

import {
  Content,
  Container,
  Navbar,
  Typography,
  Row,
  Input,
  Image,
  ImageContainer,
  ImageActions,
} from '../../styles/global';

import Calendar from '../../components/Calendar';

import * as ImagePicker from 'expo-image-picker';

import { storeProduct } from '../../services/storage';

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

  const [quotations, setQuotations] = useState([]);
  const [site, setSite] = useState('');
  const [value, setValue] = useState('');

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
      quotations,
      created_at: new Date(),
      update_at: new Date(),
    });

    resetFields();

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
    setImagePath(null);
    setQuotations([]);
    setSite('');
    setValue('');
  }

  function handleAddQuotation() {
    let newQuotations = [
      ...quotations,
      { site, value, created_at: new Date(), update_at: new Date() },
    ];
    setQuotations(newQuotations);
    setSite('');
    setValue('');
  }

  function removeFromQuotions(idx) {
    setQuotations(quotations.filter((item, i) => i !== idx));
  }
  return (
    <Container>
      <Navbar>
        <AntDesign
          onPress={() => navigation.navigate('Home')}
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

          <Row borderTop align='center' justify='space-evenly' padding={15}>
            <Typography
              fontSize={22}
              color={theme.colors.primary}
              fontWeight='bold'
              uppercase
            >
              Cotação de valores
            </Typography>

            <AntDesign
              size={30}
              color={theme.colors.primary}
              name={'questioncircle'}
            />
          </Row>

          {quotations.length > 0 &&
            quotations.map((q, idx) => (
              <Container mt={10} mb={10} padding={15} key={idx}>
                <Row justify='space-between'>
                  <Typography
                    color={theme.colors.secondary}
                    fontWeight='bold'
                    uppercase
                    fontSize={25}
                  >
                    {idx + 1}
                  </Typography>

                  <AntDesign
                    size={30}
                    onPress={() => {
                      removeFromQuotions(idx);
                    }}
                    color={theme.colors.error}
                    name={'delete'}
                  />
                </Row>
                <Input
                  dense
                  mb={10}
                  mt={10}
                  mode='outlined'
                  value={q.site}
                  onChange={(e) => {
                    quotations[idx].site = e.nativeEvent.text;
                    setQuotations([...quotations]);
                  }}
                  label='Site'
                />
                <Input
                  dense
                  minWidth={'100%'}
                  mode='outlined'
                  value={q.value}
                  onChange={(e) => {
                    quotations[idx].value = e.nativeEvent.text;
                    setQuotations([...quotations]);
                  }}
                  keyboardType={'number-pad'}
                  label='Valor'
                />
              </Container>
            ))}

          <Container backColor='#e4e4e4' padding={10}>
            <Input
              mb={10}
              mode='flat'
              value={site}
              label='Site'
              style={{ backgroundColor: '#fff' }}
              onChange={(e) => setSite(e.nativeEvent.text)}
            />
            <Input
              minWidth={'100%'}
              mode='flat'
              style={{ backgroundColor: '#fff' }}
              value={value}
              keyboardType={'number-pad'}
              label='Valor'
              onChange={(e) => setValue(e.nativeEvent.text)}
            />
            <Row justify='flex-end'>
              <Button
                style={{ marginTop: 10 }}
                color={theme.colors.primary}
                mode='contained'
                onPress={() => handleAddQuotation()}
              >
                Adicionar
              </Button>
            </Row>
          </Container>

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

export default withTheme(Product);
