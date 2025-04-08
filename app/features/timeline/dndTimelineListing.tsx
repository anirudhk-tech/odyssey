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
  const { attributes, listeners, setNodeRef, transform, transition, isOver } =
    useSortable({
      id: timeline.id,
      data: { type: "timeline", timelineId: timeline.id },
    });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    userSelect: "none",
    touchAction: "none",
    boxShadow: isOver
      ? "0 4px 10px rgba(0,0,0,0.3), 0 0 8px rgba(128,128,128,0.7)"
      : "0 2px 4px rgba(0,0,0,0.1)",
    border: isOver ? "2px solid rgba(128,128,128,0.7)" : "none",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <TimelineListing timeline={timeline} scrollLeft={scrollLeft} />
    </div>
  );
};
