import { Scene } from "@/app/types/scene";
import styled from "styled-components";

const Container = styled.div`
  flex: 0 0 150px;
  aspect-ratio: 1.5;
  height: 70px;
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
  font-size: ${(props) => props.theme.fontsize.xs};
  text-align: center;
`;

const Color = styled.div<{
  color: string | null | undefined;
}>`
  width: 100%;
  height: 5px;
  background-color: ${(props) => props.color || props.theme.colors.secondary};
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 5px 5px 0 0;
  z-index: 1010;
`;

export const SceneListingGhost = ({ scene }: { scene: Scene }) => {
  return (
    <Container>
      <Color color={scene.color} />
      <Title>{scene.title}</Title>
    </Container>
  );
};
