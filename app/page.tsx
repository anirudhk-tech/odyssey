"use client";

import styled from "styled-components";

const Container = styled.div`
  background-color: ${(props) => props.theme.colors.background};
  width: 100vw;
  height: 100vh;
`;

export default function HomePage() {
  return <Container></Container>;
}
