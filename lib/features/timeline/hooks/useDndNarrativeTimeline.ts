import { Scene, TimelineScene } from "@/app/types/scene";
import { MainState } from "@/lib/store";
import { DraggableData, DraggableEvent } from "react-draggable";
import { useDispatch, useSelector } from "react-redux";
import { changeMultipleScenesColor } from "../../scenes/store/scenesSlice";
import {
  changeScenePositionOnNarrativeTimeline,
  setRightMostScenePosition,
} from "../store/timelineSlice";
import { useEffect, useRef, useState } from "react";

export const useDndNarrativeTimeline = ({
  scene,
}: {
  scene: TimelineScene;
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
  const [narrativePositionState, setNarrativePositionState] = useState<{
    x: number;
    y: number;
  }>({
    x: scene.x ?? 0,
    y: 0,
  });

  useEffect(() => {
    positionX.current = scene.x ?? 0;
    setNarrativePositionState({ x: scene.x ?? 0, y: 0 });
  }, [scene.x]);

  const handleMoveScene = async (newX: number) => {
    if (!currentBookId) return;

    const response = await window.odysseyAPI.moveSceneOnNarrativeTimeline(
      currentBookId,
      scene.id,
      newX
    );

    if (response.success) {
      dispatch(
        changeScenePositionOnNarrativeTimeline({
          sceneId: scene.id,
          newPosition: newX,
        })
      );

      dispatch(
        changeMultipleScenesColor([
          { id: scene.id, color: response.data.newColor },
        ])
      );
    } else {
      console.error(
        "Error moving scene on narrative timeline: ",
        response.message
      );
    }
  };

  const handleNarrativeDragStart = (e: DraggableEvent, data: DraggableData) => {
    if (!currentBookId) return;
    startX.current = data.x;
  };

  const handleNarrativeDrag = (e: DraggableEvent, data: DraggableData) => {
    if (!currentBookId || !scene) return;

    setNarrativePositionState({ x: data.x, y: 0 });
    if (data.x > rightMostScenePosition) {
      dispatch(setRightMostScenePosition(data.x));
    }
  };

  const handleNarrativeDragEnd = (e: DraggableEvent, data: DraggableData) => {
    if (!currentBookId) return;

    const deltaX = data.x - startX.current;
    const newX = positionX.current + deltaX;

    if (newX < 0) {
      setNarrativePositionState({ x: positionX.current, y: 0 });
      return;
    }

    handleMoveScene(newX);
    positionX.current = newX;
  };

  return {
    handleNarrativeDragEnd,
    handleNarrativeDragStart,
    handleNarrativeDrag,
    narrativePositionState,
    positionX: positionX.current,
  };
};
