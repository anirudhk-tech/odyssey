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

const Tooltip = styled.div`
  position: absolute;
  top: 50%;
  left: 120px;
  transform: translate(-10px, -50%);
  background: ${(p) => p.theme.colors.secondary};
  color: ${(p) => p.theme.colors.text};
  padding: 8px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.2s ease, transform 0.2s ease;
  z-index: 1000;
`;

const Container = styled.div<{
  $scene_active: boolean;
}>`
  display: flex;
  flex-shrink: 0;
  border-radius: 5px;
  background-color: ${(props) =>
    props.$scene_active
      ? props.theme.colors.secondary
      : props.theme.colors.primary};
  &:hover {
    background-color: ${(props) => props.theme.colors.secondary};
    box-shadow: ${(props) =>
      props.$scene_active
        ? "4px 4px 8px rgba(0, 0, 0, 0.3)"
        : "0px 10px 15px rgba(0, 0, 0, 0.3)"};
    z-index: 1000;
  }
  box-shadow: ${(props) =>
    props.$scene_active ? "inset 4px 4px 8px rgba(0, 0, 0, 0.3)" : "none"};
  &:hover ${Tooltip} {
    visibility: visible;
    opacity: 1;
    transform: translateX(0);
  }
  cursor: pointer;
  aspect-ratio: 1.5;
  height: 70px;
  position: absolute;
  align-items: center;
  justify-content: center;
  overflow: visible;
  z-index: 2;
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
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  z-index: 2;
`;

const Color = styled.div<{
  color: string | null | undefined;
  $fullheight: boolean;
}>`
  width: 100%;
  height: ${(props) => (props.$fullheight ? "100%" : "5px")};
  background-color: ${(props) => props.color || props.theme.colors.primary};
  position: absolute;
  top: 0;
  left: 0;
  border-radius: ${(props) =>
    props.$fullheight ? "5px 5px 0 0" : "5px 5px 5px 5px"};
  z-index: 1;
`;

const CountContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2px;
`;

const TooltipText = styled.span`
  color: ${(props) => props.theme.colors.text};
  font-size: ${(props) => props.theme.fontsize.xs};
  text-align: center;
  z-index: 2;
  white-space: nowrap;
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
  const {
    currentSceneId,
    handleSetCurrentSceneId,
    timelineSceneRef,
    fillSceneBoxesColor,
  } = useTimelineScene({
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
            $scene_active={currentSceneId === scene.id}
            onClick={handleSetCurrentSceneId}
          >
            <Color color={scene.color} $fullheight={fillSceneBoxesColor} />
            <Text>{scene.title}</Text>
            <Tooltip>
              <CountContainer>
                <TooltipText>{scene.wordCount ?? 0} words</TooltipText>
                <TooltipText>{scene.charCount ?? 0} chars</TooltipText>
              </CountContainer>
            </Tooltip>
          </Container>
        </Draggable>
      </DndDisabled>
    </>
  );
};
