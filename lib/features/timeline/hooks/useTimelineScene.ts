import { Scene, TimelineScene } from "@/app/types/scene";
import { setCurrentSceneId } from "@/lib/common/store/currentSlice";
import { MainState } from "@/lib/store";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useTimelineScene = ({ scene }: { scene: TimelineScene }) => {
  const dispatch = useDispatch();
  const currentSceneId = useSelector(
    (state: MainState) => state.current.currentSceneId
  );
  const timelineSceneRef = useRef<HTMLDivElement>(null);
  const fillSceneBoxesColor = useSelector(
    (state: MainState) => state.preferences.preferences.fillSceneBoxesColor
  );

  const handleSetCurrentSceneId = () => {
    dispatch(setCurrentSceneId(scene.id));
  };

  return {
    handleSetCurrentSceneId,
    currentSceneId,
    timelineSceneRef,
    fillSceneBoxesColor,
  };
};
