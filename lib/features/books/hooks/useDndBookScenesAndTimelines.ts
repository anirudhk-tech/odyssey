import {
  DragEndEvent,
  DragMoveEvent,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

export const useDndBookScenesAndTimelines = ({
  handleSceneDragStart,
  handleSceneDragMove,
  handleTimelineDragEnd,
  handleSceneDragEnd,
}: {
  handleSceneDragStart: (e: DragStartEvent) => void;
  handleSceneDragMove: (e: DragMoveEvent) => void;
  handleTimelineDragEnd: (e: DragEndEvent) => void;
  handleSceneDragEnd: (e: DragEndEvent) => void;
}) => {
  const scenesSensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );
  const timelinesSensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const handleDragStart = (e: DragStartEvent) => {
    if (e.active.data.current?.type === "scene") {
      handleSceneDragStart(e);
    }
  };

  const handleDragMove = (e: DragMoveEvent) => {
    if (e.active.data.current?.type === "scene") {
      handleSceneDragMove(e);
    }
  };

  const handleDragEnd = (e: DragEndEvent) => {
    "1.0";
    const { active, over } = e;

    if (!over) return;

    if (
      active.data.current?.type === "scene" &&
      over.data.current?.type === "timeline"
    ) {
    }
    if (active.data.current?.type === "scene") {
      handleSceneDragEnd(e);
    } else if (active.data.current?.type === "timeline") {
      handleTimelineDragEnd(e);
    }
  };

  const sensors = [...scenesSensors, ...timelinesSensors];

  return { handleDragEnd, handleDragMove, handleDragStart, sensors };
};
