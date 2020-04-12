import styled from 'styled-components/native';

import { View } from 'react-native';

import { TextInput } from 'react-native-paper';

export const Input = styled(TextInput)`
  min-width: 100%;
  margin: 10px 0;
`;

export const Image = styled.Image`
  width: 100%;
  height: 100%;
`;

export const ImageContainer = styled.View`
  width: 100%;
  height: 200px;
  background: #cccccc;
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const ImageActions = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  position: absolute;
  width: 100%;
  height: 100%;
`;

export const ImageActions2 = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 100%;
`;
