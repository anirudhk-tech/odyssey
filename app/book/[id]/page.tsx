"use client";

import styled from "styled-components";
import { ScenesDrawer } from "@/app/features/scenes/scenesDrawer";
import { TextEditor } from "@/app/features/editor/textEditor";
import { TimelineDrawer } from "@/app/features/timeline/timelineDrawer";
import { useMounted } from "@/lib/common/hooks/useMounted";
import { useRouter } from "next/router";
import { useSetCurrent } from "@/lib/common/hooks/useSetCurrent";
import { useParams } from "next/navigation";
import { DeleteSceneConfirmDialog } from "@/app/features/scenes/deleteSceneConfirmDialog";
import { DeleteTimelineConfirmDialog } from "@/app/features/timeline/deleteTimelineConfirmDialog";
import { AddTimelineSectionDialog } from "@/app/features/timeline/addTimelineSectionDialog";
import { EditTimelineSectionDialog } from "@/app/features/timeline/editTimelineSectionDialog";
import { DeleteTimelineSectionConfirmDialog } from "@/app/features/timeline/deleteTimelineSectionConfirmDialog";
import { closestCenter, DndContext } from "@dnd-kit/core";
import { useDndBookScenesAndTimelines } from "@/lib/features/books/hooks/useDndBookScenesAndTimelines";
import { useDndScenes } from "@/lib/features/scenes/hooks/useDndScenes";
import { useDndTimelines } from "@/lib/features/timeline/hooks/useDndTimelines";
import { useRef } from "react";
import { useTimelineSectionResize } from "@/lib/features/timeline/hooks/useTimelineSectionResize";

const Container = styled.div`
  background-color: ${(props) => props.theme.colors.primary};
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-y: hidden;
  scrollbar-width: none;
`;

export default function EditingPage() {
  const { mounted } = useMounted();
  const params = useParams();
  useSetCurrent({ bookId: params.id as string });
  const sceneSideBarDndRef = useRef<HTMLDivElement>(null);
  const timelineSideBarDndRef = useRef<HTMLDivElement>(null);
  const { handleSceneDragEnd, handleSceneDragStart, handleSceneDragMove } =
    useDndScenes({ sceneSideBarDndRef, timelineSideBarDndRef });
  const { handleTimelineDragEnd } = useDndTimelines();
  const { handleDragEnd, handleDragMove, handleDragStart, sensors } =
    useDndBookScenesAndTimelines({
      handleSceneDragStart,
      handleSceneDragMove,
      handleTimelineDragEnd,
      handleSceneDragEnd,
    });
  const { sectionIsResizing } = useTimelineSectionResize();

  if (!mounted) return null;

  return (
    <Container>
      <DeleteTimelineSectionConfirmDialog />
      <EditTimelineSectionDialog />
      <AddTimelineSectionDialog />
      <DeleteTimelineConfirmDialog />
      <DeleteSceneConfirmDialog />
      <TextEditor />
      {sectionIsResizing ? (
        <>
          <ScenesDrawer
            sceneSideBarDndRef={sceneSideBarDndRef}
            timelineSideBarDndRef={timelineSideBarDndRef}
          />
          <TimelineDrawer timelineSideBarDndRef={timelineSideBarDndRef} />
        </>
      ) : (
        <DndContext
          onDragStart={handleDragStart}
          onDragMove={handleDragMove}
          onDragEnd={handleDragEnd}
          sensors={sensors}
          collisionDetection={closestCenter}
        >
          <ScenesDrawer
            sceneSideBarDndRef={sceneSideBarDndRef}
            timelineSideBarDndRef={timelineSideBarDndRef}
          />
          <TimelineDrawer timelineSideBarDndRef={timelineSideBarDndRef} />
        </DndContext>
      )}
    </Container>
  );
}
