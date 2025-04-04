import { Scene } from "@/app/types/scene";
import styled from "styled-components";

const Container = styled.div`
  flex: 0 0 150px;
  width: 150px;
  height: 150px;
  background-color: ${(props) => props.theme.colors.secondary};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  cursor: pointer;
  position: relative;
  padding: 1rem;
  rotate: 10deg;
`;

const Title = styled.span`
  color: ${(props) => props.theme.colors.text};
  font-size: ${(props) => props.theme.fontsize.sm};
  text-align: center;
`;

export const SceneListingGhost = ({ scene }: { scene: Scene }) => {
  return (
    <Container>
      <Title>{scene.title}</Title>
    </Container>
  );
};
