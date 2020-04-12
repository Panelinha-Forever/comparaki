import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  height: 350px;
  border: 0.5px solid #c4c4c4;
  display: flex;
  flex-direction: row;
  box-shadow: 10px 5px 5px black;
  margin-bottom: 20px;
`;

export const Image = styled.Image`
  width: 100%;
  height: 50%;
  margin: 5px;
`;

export const Info = styled.View`
  width: 100%;
  padding: 0px 10px;
  align-items: center;
  margin-bottom: 10px;
`;

export const Content = styled.View`
  padding: 10px 0px;
  width: 100%;
  display: flex;
  flex-direction: row;
`;

export const Toolbar = styled.View`
  background: #191fb4;
  width: 15%;
  height: 100%;
  justify-content: space-evenly;
  align-items: center;
`;

export const Wrap = styled.View`
  width: 85%;
  height: 100%;
  padding: 10px;
`;

export const CompButton = styled.Button`
  width: 40px;
  height: 20px;
`;
