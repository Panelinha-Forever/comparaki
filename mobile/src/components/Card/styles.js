import styled from 'styled-components/native';

export const Container = styled.View`
  border: 0.5px solid #c4c4c4;
  margin-bottom: 20px;
  display: flex;
  flex: 1;
  flex-direction: row;
  height: 333px;
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
  background: #191fb4;
  justify-content: space-around;
  align-items: center;
  width: 15%;
`;

// export const Title = styled.View`
//   position: absolute;
//   left: 15px;
//   padding: 15px;
//   padding-bottom: 40px;
//   border-top-right-radius: 10px;
//   border-top-left-radius: 10px;
//   border-bottom-left-radius: 10px;
//   border-bottom-right-radius: 10px;
//   background-color: #2f2cb9;
// `;
