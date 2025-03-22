import { useTimelineDrawer } from "@/lib/features/timeline/hooks/useTimelineDrawer";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: fit-content;
  background-color: ${(props) => props.theme.colors.primary};
  position: absolute;
  bottom: 0;
`;

const Button = styled.button`
  background-color: ${(props) => props.theme.colors.secondary};
  height: 20px;
  width: 80px;
  border: none;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  font-size: 0.6rem;
  &:active {
    background-color: ${(props) => props.theme.colors.primary};
  }
  transform: translateY(20px);
`;

const ResizeHandle = styled.div`
  width: 100%;
  height: 20px;
  cursor: ns-resize;
`;

const TabContainer = styled.div<{
  open: boolean;
  timelinedrawerheight: number;
}>`
  width: 100%;
  height: ${(props) =>
    props.open ? `${props.timelinedrawerheight}px` : "0px"};
  background-color: ${(props) => props.theme.colors.background};
  transition: height 0.3s ease;
`;

export const TimelineDrawer = () => {
  const {
    isDrawerOpen,
    handleToggleTimelineDrawer,
    timelineDrawerHeight,
    handleMouseResizeDown,
  } = useTimelineDrawer();

  return (
    <Container>
      <Button onClick={handleToggleTimelineDrawer}>Timeline</Button>
      <ResizeHandle onMouseDown={handleMouseResizeDown} />
      <TabContainer
        open={isDrawerOpen}
        timelinedrawerheight={timelineDrawerHeight}
      ></TabContainer>
    </Container>
  );
};
