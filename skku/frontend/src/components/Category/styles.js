import styled from "styled-components/macro";

export const ContainerTest = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  안녕하세요 푸시 되나 확인중 삐빕
`;

export const Submenu = styled.div`
  width: 100%;
  box-sizing: content-box;
  color: black;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin-bottom: 20px;
  align-items: center;
`;

export const MenuItem = styled.a`
  font-size: 17px;
  ${(props) => props.focused && `color: blue`}
`;

export const Subcontainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

export const Subtitle = styled.p`
  font-color: black;
  font-size: 16px;
  align-items: center;
`;

export const Title = styled.h1`
  font-color: black;
  font-size: 40px;
`;
