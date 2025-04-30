import { TimelineScene } from "@/app/types/scene";
import { MainState } from "@/lib/store";
import { useEffect, useRef, useState } from "react";
import { DraggableData, DraggableEvent } from "react-draggable";
import { useDispatch, useSelector } from "react-redux";
import { Timeline } from "@/app/types/timeline";
import {
  changeScenePositionOnTimeline,
  setRightMostScenePosition,
} from "../store/timelineSlice";

export const useDndTimeline = ({
  scene,
  timeline,
}: {
  scene: TimelineScene;
  timeline: Timeline | "narrativeTimeline";
}) => {
  const dispatch = useDispatch();
  const currentBookId = useSelector(
    (state: MainState) => state.current.currentBookId
  );
  const rightMostScenePosition = useSelector(
    (state: MainState) => state.timeline.rightMostScenePosition
  );
  const startX = useRef<number>(0);
  const positionX = useRef<number>(scene.x ?? 0);
  const [positionState, setPositionState] = useState<{ x: number; y: number }>({
    x: scene.x ?? 0,
    y: 0,
  });

  useEffect(() => {
    if (!scene || !scene.x) return;
    positionX.current = scene.x;
    setPositionState({ x: scene.x, y: 0 });
  }, [scene.x]);

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
          newPosition: newX,
        })
      );
    } else {
      console.error("Error moving scene on timeline: ", response.message);
    }
  };

  const handleTimelineDragStart = (e: DraggableEvent, data: DraggableData) => {
    if (!currentBookId) return;
    startX.current = data.x;
  };

  const handleTimelineDrag = (e: DraggableEvent, data: DraggableData) => {
    if (!currentBookId || !scene) return;

    setPositionState({ x: data.x, y: 0 });
    if (data.x > rightMostScenePosition) {
      dispatch(setRightMostScenePosition(data.x));
    }
  };

  const handleTimelineDragEnd = (e: DraggableEvent, data: DraggableData) => {
    if (!currentBookId || !scene) return;

    const deltaX = data.x - startX.current;
    const newX = positionX.current + deltaX;

    if (newX < 0) {
      setPositionState({ x: positionX.current, y: 0 });
      return;
    }

    positionX.current = newX;

    handleMoveScene(newX);
  };

  return {
    handleTimelineDragEnd,
    handleTimelineDragStart,
    handleTimelineDrag,
    positionState,
    positionX: positionX.current,
  };
};
