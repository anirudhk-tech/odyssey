import { Scene } from "@/app/types/scene";
import {
  DragEndEvent,
  DragMoveEvent,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useEffect, useRef, useState } from "react";
import { arrayMove } from "@dnd-kit/sortable";

export const useDndScenes = ({ scenes }: { scenes: Scene[] | null }) => {
  const [scenesOrder, setScenesOrder] = useState<Scene[]>([]);
  const [activeDragScene, setActiveDragScene] = useState<Scene | null>(null);
  const [isDraggingOut, setIsDraggingOut] = useState(false);
  const [initialClientX, setInitialClientX] = useState(0);
  const sideBarDndRef = useRef<HTMLDivElement>(null);

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

  const handleDragStart = (e: DragStartEvent) => {
    const draggedScene =
      scenesOrder.find((scene) => scene.id === e.active.id) || null;

    setActiveDragScene(draggedScene);
    setInitialClientX((e.activatorEvent as PointerEvent).clientX);
  };

  const handleDragMove = (e: DragMoveEvent) => {
    if (!sideBarDndRef.current || !activeDragScene) return;

    const currentClientX = (e.activatorEvent as PointerEvent).clientX;
    const currentDelta = e.delta.x;
    const rect = sideBarDndRef.current.getBoundingClientRect();
    const isOutsideSidebar = currentClientX + currentDelta < rect.left;

    setIsDraggingOut(isOutsideSidebar);
  };

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;

    if (!over) return;

    if (active.id !== over?.id) {
      const oldIndex = scenesOrder.findIndex((scene) => scene.id === active.id);
      const newIndex = scenesOrder.findIndex((scene) => scene.id === over?.id);

      setScenesOrder((items) => arrayMove(items, oldIndex, newIndex));
    }
  };

  return {
    scenesOrder,
    sensors,
    handleDragEnd,
    handleDragStart,
    handleDragMove,
    sideBarDndRef,
    isDraggingOut,
    activeDragScene,
  };
};
