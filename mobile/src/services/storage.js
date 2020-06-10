import { AsyncStorage } from 'react-native';

export const getProduct = async function (id) {
  const savedProducts = JSON.parse(await AsyncStorage.getItem('products'));

  return savedProducts.find((p) => p.id === id);
};

export const deleteProduct = async function (id) {
  let savedProducts = JSON.parse(await AsyncStorage.getItem('products'));

  const idx = savedProducts.findIndex((i) => i.id === id);

  savedProducts.splice(idx, 1);

  await AsyncStorage.setItem('products', JSON.stringify(savedProducts));
};

export const putProduct = async function (id, newProduct) {
  let savedProducts = JSON.parse(await AsyncStorage.getItem('products'));

  const idx = savedProducts.findIndex((i) => i.id === id);

  savedProducts[idx] = {
    ...savedProducts[idx],
    ...newProduct,
  };

  let teste = JSON.parse(await AsyncStorage.getItem('products'));

  await AsyncStorage.setItem('products', JSON.stringify(savedProducts));
};

export const getProducts = async function () {
  let products = JSON.parse(await AsyncStorage.getItem('products'));
  if (!products) {
    return [];
  }

  let filteredProducts = products.filter((p) => {
    return !p.status;
  });

  filteredProducts.sort((a, b) => (a.id > b.id ? -1 : 1));

  return filteredProducts;
};

export const getHistoricProducts = async function () {
  let products = JSON.parse(await AsyncStorage.getItem('products'));
  if (!products) {
    return [];
  }

  let filteredProducts = products.filter((p) => {
    return p.status;
  });

  filteredProducts.sort((a, b) => (a.id > b.id ? -1 : 1));

  return filteredProducts;
};

export const storeProduct = async function (product) {
  let savedProducts = JSON.parse(await AsyncStorage.getItem('products'));

  if (!savedProducts) {
    savedProducts = [];
  }

  const id = savedProducts && savedProducts.length + 1;

  savedProducts.push({
    ...product,
    id,
  });

  await AsyncStorage.setItem('products', JSON.stringify(savedProducts));

  return { savedProducts, id };
};

export const clearProducts = async function () {
  await AsyncStorage.clear();
};
