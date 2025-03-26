import { Scene } from "@/app/types/scene";
import styled from "styled-components";

const Container = styled.div`
  width: 150px;
  aspect-ratio: 1/1;
  background-color: ${(props) => props.theme.colors.primary};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  transition: transform 0.3s ease, box-shadow 0.3s ease,
    background-color 0.3s ease;
  &:hover {
    background-color: ${(props) => props.theme.colors.secondary};
    transform: translateY(-5px);
    box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.3);
  }
  cursor: pointer;
  margin-top: 20px;
`;

const Title = styled.span`
  color: ${(props) => props.theme.colors.text};
  font-size: ${(props) => props.theme.fontsize.sm};
`;

export const SceneListing = ({ scene }: { scene: Scene }) => {
  return (
    <Container>
      <Title>{scene.title}</Title>
    </Container>
  );
};
