import { Scene } from "@/app/types/scene";
import { useTimelineScene } from "@/lib/features/timeline/hooks/useTimelineScene";
import styled from "styled-components";

const Container = styled.div<{
  scene_active: "true" | "false";
  x: number | null;
}>`
  display: flex;
  flex-shrink: 0;
  border-radius: 5px;
  background-color: ${(props) =>
    props.scene_active === "true"
      ? props.theme.colors.secondary
      : props.theme.colors.primary};
  &:hover {
    background-color: ${(props) => props.theme.colors.secondary};
    box-shadow: ${(props) =>
      props.scene_active === "true"
        ? "4px 4px 8px rgba(0, 0, 0, 0.3)"
        : "0px 10px 15px rgba(0, 0, 0, 0.3)"};
  }
  box-shadow: ${(props) =>
    props.scene_active === "true"
      ? "inset 4px 4px 8px rgba(0, 0, 0, 0.3)"
      : "none"};
  cursor: pointer;
  aspect-ratio: 1.5;
  height: 70px;
  position: absolute;
  left: ${(props) => (props.x ? props.x : 0)}px;
  align-items: center;
  justify-content: center;
`;

const Text = styled.span`
  width: 100%;
  height: fit-content;
  text-align: center;
  padding-left: 5px;
  padding-right: 5px;
  text-overflow: ellipsis;
  word-break: normal;
  overflow-wrap: normal;
  color: ${(props) => props.theme.colors.text};
  font-size: ${(props) => props.theme.fontsize.xs};
`;

const Color = styled.div<{
  color: string | null | undefined;
}>`
  width: 100%;
  height: 5px;
  background-color: ${(props) => props.color || props.theme.colors.primary};
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 5px 5px 0 0;
  z-index: 1010;
`;

export const TimelineSceneListing = ({ scene }: { scene: Scene }) => {
  const { currentSceneId, handleSetCurrentSceneId } = useTimelineScene({
    scene,
  });

  return (
    <Container
      scene_active={currentSceneId === scene.id ? "true" : "false"}
      x={scene.x}
      onClick={handleSetCurrentSceneId}
    >
      <Color color={scene.color} />
      <Text>{scene.title}</Text>
    </Container>
  );
};
