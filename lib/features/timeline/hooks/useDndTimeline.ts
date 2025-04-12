import { Scene } from "@/app/types/scene";
import { MainState } from "@/lib/store";
import { useRef } from "react";
import { DraggableData, DraggableEvent } from "react-draggable";
import { useDispatch, useSelector } from "react-redux";
import { Timeline } from "@/app/types/timeline";
import { changeScenePositionOnTimeline } from "../store/timelineSlice";

export const useDndTimeline = ({
  scene,
  timeline,
}: {
  scene: Scene | null;
  timeline: Timeline | "narrativeTimeline";
}) => {
  const dispatch = useDispatch();
  const currentBookId = useSelector(
    (state: MainState) => state.current.currentBookId
  );
  const startX = useRef<number>(0);

  const handleMoveScene = async (newX: number) => {
    if (!currentBookId || !scene || timeline === "narrativeTimeline") return;

    const response = await window.odysseyAPI.moveSceneOnTimeline(
      currentBookId,
      scene.id,
      timeline.id,
      newX
    );

    if (response.success) {
      dispatch(
        changeScenePositionOnTimeline({
          sceneId: scene.id,
          timelineId: timeline.id,
          newX: response.data.newX,
        })
      );
    }
  };

  const handleTimelineDragStart = (e: DraggableEvent, data: DraggableData) => {
    if (!currentBookId) return;
    startX.current = data.x;
  };

  const handleTimelineDragEnd = (e: DraggableEvent, data: DraggableData) => {
    if (!currentBookId || !scene) return;

    const deltaX = data.x - startX.current;
    const newX = scene.x ? scene.x + deltaX : deltaX;

    handleMoveScene(newX);
  };

  return {
    handleTimelineDragEnd,
    handleTimelineDragStart,
  };
};
