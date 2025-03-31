import { useTimelineDrawer } from "@/lib/features/timeline/hooks/useTimelineDrawer";
import styled from "styled-components";
import { Timeline } from "./timeline";
import { IoAdd } from "react-icons/io5";
import { useFetchTimelines } from "@/lib/features/timeline/hooks/useFetchTimelines";
import { TimelineBeingAdded } from "./timelineBeingAdded";

const Button = styled.button`
  background-color: ${(props) => props.theme.colors.secondary};
  height: 30px;
  width: 100px;
  border: none;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  font-size: ${(props) => props.theme.fontsize.sm};
  &:active {
    background-color: ${(props) => props.theme.colors.primary};
  }
  position: absolute;
  top: -30px;
  right: 10px;
`;

const ResizeHandle = styled.div`
  width: 100%;
  height: 20px;
  cursor: ns-resize;
  position: absolute;
  top: -20px;
`;

const AddButton = styled.button`
  background-color: ${(props) => props.theme.colors.background};
  height: 30px;
  aspect-ratio: 1/1;
  border: none;
  position: absolute;
  top: 5px;
  left: 5px;
  &:active {
    opacity: 0.5;
  }
`;

const Container = styled.div<{
  open: boolean;
  timelinedrawerheight: number;
}>`
  width: 100%;
  height: ${(props) =>
    props.open ? `${props.timelinedrawerheight}px` : "0px"};
  background-color: ${(props) => props.theme.colors.background};
  transition: height 0.3s ease;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  border-top: 1px solid ${(props) => props.theme.colors.secondary};
  padding-left: 10px;
  padding-right: 10px;
`;

const TimelinesContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

const TimelineSectionsContainer = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
`;

export const TimelineDrawer = () => {
  const {
    isDrawerOpen,
    handleToggleTimelineDrawer,
    timelineDrawerHeight,
    handleMouseResizeDown,
    timelineBeingAdded,
    handleToggleTimelineBeingAdded,
  } = useTimelineDrawer();
  const { timelines } = useFetchTimelines();

  return (
    <Container open={isDrawerOpen} timelinedrawerheight={timelineDrawerHeight}>
      <ResizeHandle onMouseDown={handleMouseResizeDown} />
      <AddButton onClick={handleToggleTimelineBeingAdded}>
        <IoAdd style={{ scale: 1.5 }} />
      </AddButton>
      <Button onClick={handleToggleTimelineDrawer}>Timeline</Button>
      <TimelineSectionsContainer></TimelineSectionsContainer>
      <TimelinesContainer>
        {isDrawerOpen &&
          timelines.map((timeline) => <Timeline key={timeline.id} />)}
        {timelineBeingAdded && <TimelineBeingAdded />}
      </TimelinesContainer>
    </Container>
  );
};
