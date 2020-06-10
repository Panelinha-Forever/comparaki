import React from 'react';

import { Provider } from 'react-native-paper';

import { Theme } from './src/styles/theme';

import Routes from './src/Routes';

export default function App() {
  return (
    <Provider theme={Theme}>
      <Routes />
    </Provider>
  );
}
