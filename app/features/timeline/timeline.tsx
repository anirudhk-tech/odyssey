import { Menu } from "@/app/components/menu";
import { Timeline } from "@/app/types/timeline";
import { useAutoHighlight } from "@/lib/common/hooks/useAutoHighlight";
import { useInputClickOut } from "@/lib/common/hooks/useInputClickOut";
import { useMenu } from "@/lib/common/hooks/useMenu";
import { useRenameTimeline } from "@/lib/features/timeline/hooks/useRenameTimeline";
import { useTimeline } from "@/lib/features/timeline/hooks/useTimeline";
import { useTimelineMenu } from "@/lib/features/timeline/hooks/useTimelineMenu";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 80px;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
  border-bottom: 1px solid ${(props) => props.theme.colors.secondary};
`;

const ScenesContainer = styled.div`
  width: 90%;
  height: 100%;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 10%;
  justify-content: center;
  align-items: flex-end;
`;
const Title = styled.span`
  width: 100%;
  height: 100%;
  text-align: right;
  padding-right: 10px;
  text-overflow: ellipsis;
  word-break: normal;
  overflow-wrap: normal;
  overflow: hidden;
`;

const Input = styled.textarea`
  width: 100%;
  height: 100%;
  border: none;
  background-color: transparent;
  color: ${(props) => props.theme.colors.text};
  font-size: ${(props) => props.theme.fontsize.sm};
  outline: none;
  padding: 0 10px;
  text-align: right;
  resize: none;
`;

export const TimelineListing = ({ timeline }: { timeline: Timeline }) => {
  const { menuPos, setMenuPos, handleMenuOpen } = useMenu();
  const { options } = useTimelineMenu({ setMenuPos });
  const { handleSetTimelineToBeEdited } = useTimeline({ timeline });
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
      <TitleContainer>
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
      <ScenesContainer></ScenesContainer>
    </Container>
  );
};
