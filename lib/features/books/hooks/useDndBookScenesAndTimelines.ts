import { DragEndEvent } from "@dnd-kit/core";

export const useDndBookScenesAndTimelines = () => {
  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;

    if (!over) return;

    console.log(active, over);
  };

  return { handleDragEnd };
};
