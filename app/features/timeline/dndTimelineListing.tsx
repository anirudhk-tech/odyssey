import { Timeline } from "@/app/types/timeline";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { TimelineListing } from "./timelineListing";

export const DndTimelineListing = ({
  timeline,
  scrollLeft,
}: {
  timeline: Timeline;
  scrollLeft: number;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: timeline.id, data: { type: "timeline" } });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    userSelect: "none",
    touchAction: "none",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <TimelineListing timeline={timeline} scrollLeft={scrollLeft} />
    </div>
  );
};
