import {
  DragEndEvent,
  DragMoveEvent,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { RefObject, useEffect } from "react";
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
}: {
  sceneSideBarDndRef: RefObject<HTMLDivElement>;
}) => {
  const dispatch = useDispatch();
  const scenes = useSelector((state: MainState) => state.scenes.scenes);
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
    const draggedScene =
      scenesOrder.find((scene) => scene.id === e.active.id) || null;

    dispatch(setActiveDragScene(draggedScene));
  };

  const handleSceneDragMove = (e: DragMoveEvent) => {
    if (!sceneSideBarDndRef?.current || !activeDragScene) return;
    const currentClientX = (e.activatorEvent as PointerEvent).clientX;
    const currentDelta = e.delta.x;
    const rect = sceneSideBarDndRef.current.getBoundingClientRect();
    const isOutsideSidebar = currentClientX + currentDelta < rect.left;

    dispatch(setIsSceneDraggingOut(isOutsideSidebar));
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
