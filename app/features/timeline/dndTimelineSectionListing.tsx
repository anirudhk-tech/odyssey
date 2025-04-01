import { TimelineSection } from "@/app/types/timeline";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { TimelineSectionListing } from "./timelineSectionListing";

export const DndTimelineSectionListing = ({
  timelineSection,
  handleMenuOpen,
}: {
  timelineSection: TimelineSection;
  handleMenuOpen: (e: React.MouseEvent<HTMLDivElement>) => void;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: timelineSection.id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    userSelect: "none",
    touchAction: "none",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <TimelineSectionListing
        timelineSection={timelineSection}
        handleMenuOpen={handleMenuOpen}
      />
    </div>
  );
};
