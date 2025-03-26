import styled from "styled-components";

const Container = styled.div`
  background-color: ${(props) => props.theme.colors.primary};
  display: flex;
  flex: 1;
  height: 100%;
`;

export const TextEditor = () => {
  return <Container></Container>;
};
