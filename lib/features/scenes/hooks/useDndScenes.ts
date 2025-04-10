import {
  DragEndEvent,
  DragMoveEvent,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { RefObject, useEffect, useState } from "react";
import { arrayMove } from "@dnd-kit/sortable";
import { useDispatch, useSelector } from "react-redux";
import { MainState } from "@/lib/store";
import {
  setActiveDragScene,
  setIsSceneDraggingOut,
  setScenesOrder,
} from "../../books/store/dndBooksSlice";

export const useDndScenes = ({
  sceneSideBarDndRef,
  timelineSideBarDndRef,
}: {
  sceneSideBarDndRef: RefObject<HTMLDivElement>;
  timelineSideBarDndRef: RefObject<HTMLDivElement>;
}) => {
  const dispatch = useDispatch();
  const scenes = useSelector((state: MainState) => state.scenes.scenes);
  const [dragStartedInSiderbar, setDragStartedInSiderbar] = useState(false);

  const isSceneDraggingOut = useSelector(
    (state: MainState) => state.dndBooks.isSceneDraggingOut
  );
  const scenesOrder = useSelector(
    (state: MainState) => state.dndBooks.scenesOrder
  );
  const activeDragScene = useSelector(
    (state: MainState) => state.dndBooks.activeDragScene
  );

  useEffect(() => {
    dispatch(setScenesOrder(scenes ? scenes : []));
  }, [scenes]);

  const handleSceneDragStart = (e: DragStartEvent) => {
    const pointerEvent = e.activatorEvent as PointerEvent;
    const sidebarRect = sceneSideBarDndRef.current?.getBoundingClientRect();

    if (!sidebarRect) return;

    const { clientX, clientY } = pointerEvent;

    const isInSidebar =
      clientX >= sidebarRect.left &&
      clientX <= sidebarRect.right &&
      clientY >= sidebarRect.top &&
      clientY <= sidebarRect.bottom;

    setDragStartedInSiderbar(isInSidebar);

    const draggedScene =
      scenesOrder.find((scene) => scene.id === e.active.id) || null;

    dispatch(setActiveDragScene(draggedScene));
  };

  const handleSceneDragMove = (e: DragMoveEvent) => {
    if (
      !sceneSideBarDndRef?.current ||
      !timelineSideBarDndRef?.current ||
      !activeDragScene
    )
      return;
    const currentClientX = (e.activatorEvent as PointerEvent).clientX;
    const currentClientY = (e.activatorEvent as PointerEvent).clientY;
    const currentDeltaX = e.delta.x;
    const currentDeltaY = e.delta.y;

    const sceneRect = sceneSideBarDndRef.current.getBoundingClientRect();
    const timelineRect = timelineSideBarDndRef.current.getBoundingClientRect();

    const isOutsideSidebar =
      currentClientX + currentDeltaX < sceneRect.left ||
      currentClientY + currentDeltaY > timelineRect.top;

    if (dragStartedInSiderbar) {
      dispatch(setIsSceneDraggingOut(isOutsideSidebar));
    }
  };

  const handleSceneDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;

    if (!over) return;

    if (active.id !== over?.id) {
      const oldIndex = scenesOrder.findIndex((scene) => scene.id === active.id);
      const newIndex = scenesOrder.findIndex((scene) => scene.id === over?.id);

      const newOrder = arrayMove(scenesOrder, oldIndex, newIndex);
      dispatch(setScenesOrder(newOrder));
    }

    dispatch(setIsSceneDraggingOut(false));
  };

  return {
    handleSceneDragEnd,
    handleSceneDragStart,
    handleSceneDragMove,
    scenesOrder,
    isSceneDraggingOut,
    activeDragScene,
  };
};
