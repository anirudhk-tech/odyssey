import { Timeline } from "@/app/types/timeline";
import { MainState } from "@/lib/store";
import { useDispatch, useSelector } from "react-redux";
import { setTimelineToBeEdited } from "../store/timelineSlice";

export const useTimeline = ({ timeline }: { timeline: Timeline }) => {
  const dispatch = useDispatch();
  const currentSceneId = useSelector(
    (state: MainState) => state.current.currentSceneId
  );
  const timelineScenes = useSelector((state: MainState) => {
    const entry = state.timeline.timelines.find((t) => t.id === timeline.id);
    if (!entry) return [];

    return entry.scenes.map(({ id, x }) => {
      const scene = state.scenes.scenes?.find((s) => s.id === id);
      if (!scene) return null;
      return {
        ...scene,
        x,
      };
    });
  });

  const rightMostScenePosition = useSelector(
    (state: MainState) => state.timeline.rightMostScenePosition
  );

  const handleSetTimelineToBeEdited = () => {
    if (!timeline) return;
    dispatch(setTimelineToBeEdited(timeline));
  };

  return {
    handleSetTimelineToBeEdited,
    timelineScenes,
    currentSceneId,
    rightMostScenePosition,
  };
};
