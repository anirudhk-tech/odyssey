import { useTimelineDrawer } from "@/lib/features/timeline/hooks/useTimelineDrawer";
import styled from "styled-components";
import { IoAdd } from "react-icons/io5";
import { useFetchTimelines } from "@/lib/features/timeline/hooks/useFetchTimelines";
import { TimelineSections } from "./timelineSections";
import { useMenu } from "@/lib/common/hooks/useMenu";
import { Menu } from "@/app/components/menu";
import { useTimelineAddMenu } from "@/lib/features/timeline/hooks/useTimelineAddMenu";
import { useDndTimelines } from "@/lib/features/timeline/hooks/useDndTimelines";
import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import { DndTimelineListing } from "./dndTimelineListing";
import { DndNarrativeTimelineListing } from "./dndNarrativeTimelineListing";
import { RefObject } from "react";

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

const Container = styled.div<{
  open: boolean;
  timelinedrawerheight: number;
}>`
  width: 100%;
  height: ${(props) =>
    props.open ? `${props.timelinedrawerheight}px` : "0px"};
  background-color: ${(props) => props.theme.colors.background};
  transition: height 0.3s ease, padding 0.3s ease;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  border-top: 1px solid ${(props) => props.theme.colors.secondary};
  padding: ${(props) => (props.open ? "10px" : "0px")};
`;

const TimelinesContainer = styled.div`
  width: fit-content;
  height: calc(100% - 50px);
  display: flex;
  flex-direction: column;
  overflow: auto;
  padding-bottom: 50px;
  scrollbar-width: none;
  scroll-behavior: smooth;
  gap: 10px;
`;

const TimelineSectionsContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: auto;
  scrollbar-width: thin;
`;

const AddIcon = styled(IoAdd)`
  scale: 1.5;
  position: absolute;
  top: 20px;
  left: 20px;
`;

export const TimelineDrawer = ({
  timelineSideBarDndRef,
  timelineScrollContainerRef,
}: {
  timelineSideBarDndRef: RefObject<HTMLDivElement>;
  timelineScrollContainerRef: RefObject<HTMLDivElement>;
}) => {
  const {
    isDrawerOpen,
    handleToggleTimelineDrawer,
    timelineDrawerHeight,
    handleMouseResizeDown,
    handleScroll,
    scrollLeft,
  } = useTimelineDrawer();
  useFetchTimelines();
  const { menuPos, setMenuPos, handleMenuOpenFromIcon } = useMenu();
  const { options } = useTimelineAddMenu();
  const { timelinesOrder } = useDndTimelines();

  return (
    <Container
      ref={timelineSideBarDndRef}
      open={isDrawerOpen}
      timelinedrawerheight={timelineDrawerHeight}
    >
      <Menu menuPos={menuPos} setMenuPos={setMenuPos} options={options} />
      <ResizeHandle onMouseDown={handleMouseResizeDown} />
      <Button onClick={handleToggleTimelineDrawer}>Timeline</Button>
      <TimelineSectionsContainer onScroll={handleScroll}>
        <AddIcon onClick={handleMenuOpenFromIcon} />
        <TimelineSections />
        <TimelinesContainer ref={timelineScrollContainerRef}>
          <SortableContext
            items={(timelinesOrder || []).map((timeline) => timeline.id)}
            strategy={rectSortingStrategy}
          >
            {isDrawerOpen &&
              timelinesOrder.map((timeline) => (
                <DndTimelineListing
                  key={timeline.id}
                  scrollLeft={scrollLeft}
                  timeline={timeline}
                />
              ))}
            <DndNarrativeTimelineListing scrollLeft={scrollLeft} />
          </SortableContext>
        </TimelinesContainer>
      </TimelineSectionsContainer>
    </Container>
  );
};
