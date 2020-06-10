import { DefaultTheme } from 'react-native-paper';

export const Theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#332B68',
    primaryLighten: '#9d95d3',
    secondary: '#1C9B64',
    active: '#fb5607',
    inactive: '#FCFCFC',
    accent: '#f1c40f',
    disabled: '#c4c4c4',
  },
};
