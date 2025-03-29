import { Scene } from "@/app/types/scene";
import {
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useEffect, useState } from "react";
import { arrayMove } from "@dnd-kit/sortable";

export const useDndScenes = ({ scenes }: { scenes: Scene[] | null }) => {
  const [scenesOrder, setScenesOrder] = useState<Scene[]>([]);

  useEffect(() => {
    setScenesOrder(scenes ? scenes : []);
  }, [scenes]);

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
      const oldIndex = scenesOrder.findIndex((scene) => scene.id === active.id);
      const newIndex = scenesOrder.findIndex((scene) => scene.id === over?.id);

      setScenesOrder((items) => arrayMove(items, oldIndex, newIndex));
    }
  };

  return { scenesOrder, sensors, handleDragEnd };
};
