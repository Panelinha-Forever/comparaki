import { AsyncStorage } from 'react-native';

export const getProduct = async function (id) {
  const savedProducts = JSON.parse(await AsyncStorage.getItem('products'));

  return savedProducts.find((p) => p.id === id);
};

export const putProduct = async function (newProduct) {
  let savedProducts = JSON.parse(await AsyncStorage.getItem('products'));

  savedProducts.forEach((element) => {
    if (element.id === newProduct.id) {
      element.name = newProduct.name;
      element.desiredPrice = newProduct.desiredPrice;
      element.desiredDate = newProduct.desiredDate;
      element.formattedDesireDate = newProduct.formattedDesireDate;
      element.update_at = new Date();
    }
  });

  await AsyncStorage.setItem('products', JSON.stringify(savedProducts));
};

export const getProducts = async function () {
  let products = JSON.parse(await AsyncStorage.getItem('products'));
  if (!products) {
    return [];
  }

  // products.sort((a, b) => (a.id > b.id ? -1 : 1));

  return products;
};

export const storeProduct = async function (product) {
  let savedProducts = JSON.parse(await AsyncStorage.getItem('products'));

  if (!savedProducts) {
    savedProducts = [];
  }

  savedProducts.push({
    ...product,
    id: savedProducts && savedProducts.length + 1,
  });

  await AsyncStorage.setItem('products', JSON.stringify(savedProducts));

  return savedProducts;
};

export const clearProducts = async function () {
  await AsyncStorage.clear();
};
