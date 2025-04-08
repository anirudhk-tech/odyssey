import { NarrativeTimelineListing } from "./narrativeTimelineListing";
import { useDroppable } from "@dnd-kit/core";

export const DndNarrativeTimelineListing = ({
  scrollLeft,
}: {
  scrollLeft: number;
}) => {
  const { isOver, setNodeRef } = useDroppable({
    id: "narrative_timeline",
    data: { type: "narrative_timeline" },
  });

  const style: React.CSSProperties = {
    transition: "all 0.2s ease-out",
    boxShadow: isOver
      ? "0 4px 10px rgba(0,0,0,0.3), 0 0 8px rgba(128,128,128,0.7)"
      : "0 2px 4px rgba(0,0,0,0.1)",
    border: isOver ? "2px solid rgba(128,128,128,0.7)" : "none",
  };

  return (
    <div ref={setNodeRef} style={style}>
      <NarrativeTimelineListing scrollLeft={scrollLeft} />
    </div>
  );
};
