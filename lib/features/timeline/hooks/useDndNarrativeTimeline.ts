import { Scene } from "@/app/types/scene";
import { MainState } from "@/lib/store";
import { DraggableData, DraggableEvent } from "react-draggable";
import { useDispatch, useSelector } from "react-redux";
import { changeMultipleScenesColor } from "../../scenes/store/scenesSlice";
import { changeMultipleSceneColorsOnTimelines } from "../store/timelineSlice";
import { useRef } from "react";

export const useDndNarrativeTimeline = ({ scene }: { scene: Scene }) => {
  const dispatch = useDispatch();
  const currentBookId = useSelector(
    (state: MainState) => state.current.currentBookId
  );
  const deltaX = useRef<number>(0);

  const handleMoveScene = async (newX: number) => {
    if (!currentBookId) return;

    const response = await window.odysseyAPI.moveSceneOnNarrativeTimeline(
      currentBookId,
      scene.id,
      newX
    );

    if (response.success) {
      dispatch(
        changeMultipleScenesColor([
          { id: scene.id, color: response.data.newColor },
        ])
      );
      dispatch(
        changeMultipleSceneColorsOnTimelines(
          response.data.changedScenes.map((scene: Scene) => ({
            color: scene.color,
            sceneId: scene.id,
          }))
        )
      );
    }
  };

  const handleNarrativeDragStart = (e: DraggableEvent, data: DraggableData) => {
    if (!currentBookId) return;
    deltaX.current = 0;
  };

  const handleNarrativeDrag = (e: DraggableEvent, data: DraggableData) => {
    if (!currentBookId) return;
    deltaX.current += data.deltaX;
  };

  const handleNarrativeDragEnd = (e: DraggableEvent, data: DraggableData) => {
    if (!currentBookId) return;

    const newX = scene.x ? scene.x + deltaX.current : deltaX.current;

    handleMoveScene(newX);
  };

  return {
    handleNarrativeDragEnd,
    handleNarrativeDrag,
    handleNarrativeDragStart,
  };
};
