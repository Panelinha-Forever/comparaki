import styled from 'styled-components/native';

import { TextInput, Button as PaperButton } from 'react-native-paper';

export const Typography = styled.Text`
  font-size: ${({ fontSize }) => `${fontSize || 20}px`};
  color: ${({ color }) => color || '#000'};
  font-weight: ${({ fontWeight }) => fontWeight || 'normal'};
  text-transform: ${({ uppercase }) => (uppercase && 'uppercase') || 'none'};
  text-align: ${({ align }) => `${align || 'left'}`};
  margin-bottom: ${({ mb }) => `${mb || 0}px`};
  margin-right: ${({ mr }) => `${mr || 0}px`};
  margin-left: ${({ ml }) => `${ml || 0}px`};
  margin-top: ${({ mt }) => `${mt || 0}px`};
`;

export const Content = styled.View`
  flex: 1;
  height: 100%;
  padding: 20px 20px 0 20px;
`;

export const Container = styled.View`
  height: ${({ height }) => `${height || '100%'}`};
  width: 100%;
  flex: 1;

  ${({ border }) => border && `border: 1px solid #ccc;`}
  margin-top: ${({ mt }) => `${mt || 0}px`};
  margin-bottom: ${({ mb }) => `${mb || 0}px`};

  padding: ${({ padding }) => `${padding || 0}px`};
  background-color: ${({ backColor }) => `${backColor || 'transparent'}`};
`;

export const Navbar = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
`;

export const Row = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: ${({ justify }) => `${justify || 'flex-start'}`};
  align-items: ${({ align }) => `${align || 'flex-start'}`};
  padding: ${({ padding }) => `${padding || 0}px`};

  ${({ borderTop }) =>
    borderTop &&
    `border-top-color: #ccc;
  border-top-width: 1px;`}

  margin: ${({ ma }) => `${ma || 0}px`};
  margin-top: ${({ mt }) => `${mt || 0}px`};
  margin-bottom: ${({ mb }) => `${mb || 0}px`};
  margin-left: ${({ ml }) => `${ml || 0}px`};
  margin-right: ${({ mr }) => `${mr || 0}px`};
`;

export const Col = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: ${({ justify }) => `${justify || 'flex-start'}`};
  align-items: ${({ align }) => `${align || 'flex-start'}`};
  padding: ${({ padding }) => `${padding || 0}px`};

  ${({ borderTop }) =>
    borderTop &&
    `border-top-color: #ccc;
  border-top-width: 1px;`}

  width: ${({ width }) => `${width || '100%'}`};
  margin: ${({ ma }) => `${ma || 0}px`};
  margin-top: ${({ mt }) => `${mt || 0}px`};
  margin-bottom: ${({ mb }) => `${mb || 0}px`};
  margin-left: ${({ ml }) => `${ml || 0}px`};
  margin-right: ${({ mr }) => `${mr || 0}px`};
`;

export const Input = styled(TextInput)`
  margin: ${({ ma }) => `${ma || 0}px`};
  margin-top: ${({ mt }) => `${mt || 0}px`};
  margin-bottom: ${({ mb }) => `${mb || 0}px`};
  margin-left: ${({ ml }) => `${ml || 0}px`};
  margin-right: ${({ mr }) => `${mr || 0}px`};
`;

export const Button = styled(PaperButton)`
  margin-bottom: ${({ mb }) => `${mb || 0}px`};
  margin-right: ${({ mr }) => `${mr || 0}px`};
  margin-left: ${({ ml }) => `${ml || 0}px`};
  margin-top: ${({ mt }) => `${mt || 0}px`};
`;

export const Image = styled.Image`
  margin-bottom: ${({ mb }) => `${mb || 0}px`};
  margin-right: ${({ mr }) => `${mr || 0}px`};
  margin-left: ${({ ml }) => `${ml || 0}px`};
  margin-top: ${({ mt }) => `${mt || 0}px`};
  width: ${({ width }) => `${width || '100%'}`};
  height: ${({ height }) => `${height || '100%'}`};
`;

export const ImageContainer = styled.View`
  width: 100%;
  height: 200px;
`;

export const ImageActions = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  position: absolute;
  width: 100%;
  height: 100%;
`;
