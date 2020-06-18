import styled from 'styled-components/native';

import { TouchableOpacity } from 'react-native';

export const Container = styled.View`
  border: 0.5px solid #c4c4c4;
  margin-bottom: 20px;
  display: flex;
  flex: 1;
  flex-direction: row;
  height: 180px;
`;

export const Image = styled.Image`
  width: 50%;
  height: 150px;
`;

export const Content = styled.View`
  width: 85%;
  padding: 10px;
  background: white;
`;

export const Toolbar = styled.View`
  background: #312298;
  width: 15%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const SideButton = styled(TouchableOpacity)`
  display: flex;
  width: 100%;
  height: 33%;
  align-items: center;
  justify-content: center;
`;
