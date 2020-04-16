import styled from 'styled-components/native';

export const Typography = styled.Text`
  font-size: ${({ fontSize }) => `${fontSize || 20}px`};
  color: ${(props) => props.color || '#000'};
  font-weight: ${(props) => props.fontWeight || 'normal'};
  text-transform: ${(props) => (props.uppercase && 'uppercase') || 'none'};
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
  height: 100%;
  width: 100%;
  flex: 1;
`;

export const Navbar = styled.View`
  height: 8%;
  /* border-bottom: 1px solid #ccc; */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
`;

export const Row = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: ${({ justify }) => `${justify || 'flex-start'}`};
  align-items: ${({ align }) => `${align || 'flex-start'}`};
  padding: ${({ padding }) => `${padding || 0}px`};
`;
