import { Menu } from "@/app/components/menu";
import { useMenu } from "@/lib/common/hooks/useMenu";
import { useFetchTimelineSections } from "@/lib/features/timeline/hooks/useFetchTimelineSections";
import { useTimelineSectionMenu } from "@/lib/features/timeline/hooks/useTimelineSectionMenu";
import styled from "styled-components";
import { useDndTimelineSections } from "@/lib/features/timeline/hooks/useDndTimelineSections";
import { DndContext, rectIntersection } from "@dnd-kit/core";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import {
  horizontalListSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import { DndTimelineSectionListing } from "./dndTimelineSectionListing";

const Container = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  margin-left: 170px;
`;

export const TimelineSections = () => {
  const { timelineSections } = useFetchTimelineSections();
  const { menuPos, setMenuPos, handleMenuOpen } = useMenu();
  const { options } = useTimelineSectionMenu({ setMenuPos });
  const { sensors, handleDragEnd, sectionsOrder } = useDndTimelineSections({
    sections: timelineSections,
  });

  return (
    <Container>
      <Menu menuPos={menuPos} setMenuPos={setMenuPos} options={options} />
      <DndContext
        sensors={sensors}
        onDragEnd={handleDragEnd}
        collisionDetection={rectIntersection}
        modifiers={[restrictToParentElement]}
      >
        <SortableContext
          items={(sectionsOrder || []).map((section) => section.id)}
          strategy={horizontalListSortingStrategy}
        >
          {sectionsOrder.map((section) => (
            <DndTimelineSectionListing
              key={section.id}
              timelineSection={section}
              handleMenuOpen={handleMenuOpen}
            />
          ))}
        </SortableContext>
      </DndContext>
    </Container>
  );
};
