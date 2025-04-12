import { Menu } from "@/app/components/menu";
import { Timeline } from "@/app/types/timeline";
import { useAutoHighlight } from "@/lib/common/hooks/useAutoHighlight";
import { useInputClickOut } from "@/lib/common/hooks/useInputClickOut";
import { useMenu } from "@/lib/common/hooks/useMenu";
import { useRenameTimeline } from "@/lib/features/timeline/hooks/useRenameTimeline";
import { useTimeline } from "@/lib/features/timeline/hooks/useTimeline";
import { useTimelineMenu } from "@/lib/features/timeline/hooks/useTimelineMenu";
import styled from "styled-components";
import { TimelineSceneListing } from "./timelineSceneListing";
import { useDndTimeline } from "@/lib/features/timeline/hooks/useDndTimeline";
import { TIMELINE_TITLE_MARGIN } from "@/app/GlobalStyles";

const Container = styled.div`
  display: flex;
  flex-shrink: 0;
  flex-direction: row;
  height: 80px;
  align-items: center;
  scrollbar-width: none;
  width: fit-content;
  z-index: 3;
`;

const ScenesContainer = styled.div`
  width: fit-content;
  height: 100%;
  display: flex;
  flex-shrink: 0;
  flex-direction: row;
  position: relative;
  overflow-x: visible;
`;

const TitleContainer = styled.div<{ scrollleft: number; width: number }>`
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  height: 100%;
  width: ${(props) => props.width}px;
  justify-content: center;
  align-items: flex-end;
  transform: translateX(${(props) => props.scrollleft}px);
  transition: transform 0.3s ease;
  background-color: ${(props) => props.theme.colors.background};
`;

const Title = styled.span`
  width: 100%;
  height: fit-content;
  text-align: right;
  padding-right: 5px;
  text-overflow: ellipsis;
  word-break: normal;
  overflow-wrap: normal;
`;

const Input = styled.textarea`
  width: 100%;
  height: fit-content;
  border: none;
  background-color: transparent;
  color: ${(props) => props.theme.colors.text};
  font-size: ${(props) => props.theme.fontsize.sm};
  outline: none;
  padding-right: 5px;
  text-align: right;
  resize: none;
`;

const Spacer = styled.div`
  width: 10000px;
  height: 1px;
  flex-shrink: 0;
`;

export const TimelineListing = ({
  timeline,
  scrollLeft,
}: {
  timeline: Timeline;
  scrollLeft: number;
}) => {
  const { menuPos, setMenuPos, handleMenuOpen } = useMenu();
  const { options } = useTimelineMenu({ setMenuPos });
  const { handleSetTimelineToBeEdited, timelineScenes } = useTimeline({
    timeline,
  });
  const {
    timelineToBeEdited,
    handleRenameTimeline,
    timelineName,
    timelineBeingRenamed,
    setTimelineName,
  } = useRenameTimeline();
  const { inputRef } = useAutoHighlight();
  useInputClickOut({ inputRef, onClickOut: handleRenameTimeline });

  return (
    <Container
      onContextMenu={(e) => {
        handleMenuOpen(e);
        handleSetTimelineToBeEdited();
      }}
    >
      <Menu menuPos={menuPos} setMenuPos={setMenuPos} options={options} />
      <TitleContainer scrollleft={scrollLeft} width={TIMELINE_TITLE_MARGIN}>
        {timelineBeingRenamed &&
        timelineToBeEdited &&
        timelineToBeEdited.id === timeline.id ? (
          <Input
            ref={inputRef}
            value={timelineName}
            onChange={(e) => setTimelineName(e.target.value)}
            autoFocus
            rows={1}
          />
        ) : (
          <Title>{timeline.title}</Title>
        )}
      </TitleContainer>
      <ScenesContainer>
        {timelineScenes.map((scene) => {
          return (
            <TimelineSceneListing
              key={scene.id}
              scene={scene}
              timeline={timeline}
            />
          );
        })}
        <Spacer />
      </ScenesContainer>
    </Container>
  );
};
