import styled from 'styled-components/native';

import { TextInput } from 'react-native-paper';

export const Input = styled(TextInput)`
  min-width: 100%;
  margin: 10px 0;
`;

export const Image = styled.Image`
  background: #cccccc;
  width: 100%;
  height: 200px;
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
