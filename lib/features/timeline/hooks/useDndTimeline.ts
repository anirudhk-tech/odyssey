import { Scene } from "@/app/types/scene";
import { MainState } from "@/lib/store";
import { useRef } from "react";
import { DraggableData, DraggableEvent } from "react-draggable";
import { useDispatch, useSelector } from "react-redux";
import { Timeline } from "@/app/types/timeline";

export const useDndTimeline = ({ scene }: { scene: Scene }) => {
  const currentBookId = useSelector(
    (state: MainState) => state.current.currentBookId
  );
  const deltaX = useRef<number>(0);

  const handleMoveScene = async (newX: number) => {
    if (!currentBookId) return;

    await window.odysseyAPI.moveSceneOnNarrativeTimeline(
      currentBookId,
      scene.id,
      newX
    );
  };

  const handleTimelineDragStart = (e: DraggableEvent, data: DraggableData) => {
    if (!currentBookId) return;
    deltaX.current = 0;
  };

  const handleTimelineDrag = (e: DraggableEvent, data: DraggableData) => {
    if (!currentBookId) return;
    deltaX.current += data.deltaX;
  };

  const handleTimelineDragEnd = (e: DraggableEvent, data: DraggableData) => {
    if (!currentBookId) return;

    const newX = scene.x ? scene.x + deltaX.current : deltaX.current;

    handleMoveScene(newX);
  };

  return { handleTimelineDragEnd, handleTimelineDrag, handleTimelineDragStart };
};
