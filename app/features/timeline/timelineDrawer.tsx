import { useTimelineDrawer } from "@/lib/features/timeline/hooks/useTimelineDrawer";
import styled from "styled-components";
import { TimelineListing } from "./timelineListing";
import { IoAdd } from "react-icons/io5";
import { useFetchTimelines } from "@/lib/features/timeline/hooks/useFetchTimelines";
import { TimelineBeingAdded } from "./timelineBeingAdded";
import { TimelineSections } from "./timelineSections";
import { useMenu } from "@/lib/common/hooks/useMenu";
import { Menu } from "@/app/components/menu";
import { useTimelineAddMenu } from "@/lib/features/timeline/hooks/useTimelineAddMenu";
import { useDndTimelines } from "@/lib/features/timeline/hooks/useDndTimelines";
import { DndContext, rectIntersection } from "@dnd-kit/core";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import { DndTimelineListing } from "./dndTimelineListing";
import { NarrativeTimelineListing } from "./narrativeTimelineListing";

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
  transition: height 0.3s ease;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  border-top: 1px solid ${(props) => props.theme.colors.secondary};
  padding: 10px;
`;

const TimelinesContainer = styled.div`
  width: 100%;
  height: calc(100% - 50px);
  display: flex;
  flex-direction: column;
  overflow: auto;
  padding-bottom: 50px;
  scrollbar-width: none;
  gap: 10px;
`;

const TimelineScrollContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  scrollbar-width: thin;
  position: relative;
`;

const AddIcon = styled(IoAdd)`
  scale: 1.5;
  position: absolute;
  top: 20px;
  left: 20px;
`;

export const TimelineDrawer = () => {
  const {
    isDrawerOpen,
    handleToggleTimelineDrawer,
    timelineDrawerHeight,
    handleMouseResizeDown,
    timelineBeingAdded,
    handleScroll,
    scrollLeft,
  } = useTimelineDrawer();
  const { timelines } = useFetchTimelines();
  const { menuPos, setMenuPos, handleMenuOpenFromIcon } = useMenu();
  const { options } = useTimelineAddMenu();
  const { sensors, handleDragEnd, timelinesOrder } = useDndTimelines({
    timelines,
  });

  return (
    <Container open={isDrawerOpen} timelinedrawerheight={timelineDrawerHeight}>
      <Menu menuPos={menuPos} setMenuPos={setMenuPos} options={options} />
      <ResizeHandle onMouseDown={handleMouseResizeDown} />
      <Button onClick={handleToggleTimelineDrawer}>Timeline</Button>
      <TimelineScrollContainer onScroll={handleScroll}>
        <AddIcon onClick={handleMenuOpenFromIcon} />
        <TimelineSections />
        <TimelinesContainer>
          <DndContext
            sensors={sensors}
            onDragEnd={handleDragEnd}
            collisionDetection={rectIntersection}
            modifiers={[restrictToParentElement]}
          >
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
              <NarrativeTimelineListing scrollLeft={scrollLeft} />
            </SortableContext>
          </DndContext>
          {timelineBeingAdded && <TimelineBeingAdded />}
        </TimelinesContainer>
      </TimelineScrollContainer>
    </Container>
  );
};
