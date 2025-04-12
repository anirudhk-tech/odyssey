import { DndDisabled } from "@/app/components/dndDisabled";
import { Menu } from "@/app/components/menu";
import { Scene } from "@/app/types/scene";
import { Timeline } from "@/app/types/timeline";
import { useMenu } from "@/lib/common/hooks/useMenu";
import { useDndNarrativeTimeline } from "@/lib/features/timeline/hooks/useDndNarrativeTimeline";
import { useDndTimeline } from "@/lib/features/timeline/hooks/useDndTimeline";
import { useTimelineScene } from "@/lib/features/timeline/hooks/useTimelineScene";
import { useTimelineSceneMenu } from "@/lib/features/timeline/hooks/useTimelineSceneMenu";
import Draggable from "react-draggable";
import styled from "styled-components";

const Container = styled.div<{
  scene_active: "true" | "false";
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
  z-index: 1000;
`;

export const TimelineSceneListing = ({
  scene,
  timeline,
}: {
  scene: Scene;
  timeline: Timeline | "narrativeTimeline";
}) => {
  const { setMenuPos, menuPos, handleMenuOpen } = useMenu();
  const { options } = useTimelineSceneMenu({ scene, timeline });
  const { currentSceneId, handleSetCurrentSceneId, timelineSceneRef } =
    useTimelineScene({
      scene,
    });
  const {
    handleNarrativeDragEnd,
    handleNarrativeDragStart,
    handleNarrativeDrag,
    narrativePositionState,
  } = useDndNarrativeTimeline({ scene });

  const {
    handleTimelineDragEnd,
    handleTimelineDragStart,
    handleTimelineDrag,
    positionState,
  } = useDndTimeline({
    scene,
    timeline,
  });

  return (
    <>
      <DndDisabled>
        <Menu options={options} menuPos={menuPos} setMenuPos={setMenuPos} />
        <Draggable
          nodeRef={timelineSceneRef}
          axis="x"
          position={
            timeline === "narrativeTimeline"
              ? narrativePositionState
              : positionState
          }
          onStart={
            timeline === "narrativeTimeline"
              ? handleNarrativeDragStart
              : handleTimelineDragStart
          }
          onDrag={
            timeline === "narrativeTimeline"
              ? handleNarrativeDrag
              : handleTimelineDrag
          }
          onStop={
            timeline === "narrativeTimeline"
              ? handleNarrativeDragEnd
              : handleTimelineDragEnd
          }
        >
          <Container
            ref={timelineSceneRef}
            onContextMenu={handleMenuOpen}
            scene_active={currentSceneId === scene.id ? "true" : "false"}
            onClick={handleSetCurrentSceneId}
          >
            <Color color={scene.color} />
            <Text>{scene.title}</Text>
          </Container>
        </Draggable>
      </DndDisabled>
    </>
  );
};
