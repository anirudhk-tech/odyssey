import { useTimelineDrawer } from "@/lib/features/timeline/hooks/useTimelineDrawer";
import styled from "styled-components";

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
  position: absolute;
  top: -20px;
  left: 0;
`;

const ResizeHandle = styled.div`
  width: 100%;
  height: 20px;
  cursor: ns-resize;
  position: absolute;
  top: -20px;
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
  position: relative;
  border-top: 1px solid ${(props) => props.theme.colors.secondary};
`;

export const TimelineDrawer = () => {
  const {
    isDrawerOpen,
    handleToggleTimelineDrawer,
    timelineDrawerHeight,
    handleMouseResizeDown,
  } = useTimelineDrawer();

  return (
    <Container open={isDrawerOpen} timelinedrawerheight={timelineDrawerHeight}>
      <ResizeHandle onMouseDown={handleMouseResizeDown} />
      <Button onClick={handleToggleTimelineDrawer}>Timeline</Button>
    </Container>
  );
};
