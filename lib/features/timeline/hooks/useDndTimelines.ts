import { Timeline } from "@/app/types/timeline";
import {
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useEffect, useState } from "react";

export const useDndTimelines = ({
  timelines,
}: {
  timelines: Timeline[] | null;
}) => {
  const [timelinesOrder, setTimelinesOrder] = useState<Timeline[]>([]);

  useEffect(() => {
    setTimelinesOrder(timelines ? timelines : []);
  }, [timelines]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;

    if (!over) return;

    if (active.id !== over?.id) {
      const oldIndex = timelinesOrder.findIndex(
        (timeline) => timeline.id === active.id
      );
      const newIndex = timelinesOrder.findIndex(
        (timeline) => timeline.id === over.id
      );

      setTimelinesOrder((items) => arrayMove(items, oldIndex, newIndex));
    }
  };

  return { timelinesOrder, sensors, handleDragEnd };
};
