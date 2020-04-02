import React from 'react';

import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import { Theme } from './src/styles/theme';

import Routes from './src/Routes';

export default function App() {
  return (
    <PaperProvider theme={Theme}>
      <Routes />
    </PaperProvider>
  );
}
