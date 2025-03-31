import { useTimeline } from "@/lib/features/timeline/hooks/useTimeline";
import styled from "styled-components";

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  height: 100px;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
`;

const ScenesContainer = styled.div`
  flex: 1;
  height: 100%;
`;

const Title = styled.div`
  width: "fit-content";
  height: "fit-content";
  text-align: center;
`;

export const Timeline = () => {
  return (
    <Container>
      <Title>Some Timeline</Title>
      <ScenesContainer></ScenesContainer>
    </Container>
  );
};
