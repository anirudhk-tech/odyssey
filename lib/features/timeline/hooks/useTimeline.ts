import { Timeline } from "@/app/types/timeline";
import { MainState } from "@/lib/store";
import { useDispatch, useSelector } from "react-redux";
import { setTimelineToBeEdited } from "../store/timelineSlice";
import { useEffect, useState } from "react";
import { PositionScene } from "@/app/types/scene";

export const useTimeline = ({ timeline }: { timeline: Timeline }) => {
  const dispatch = useDispatch();
  const timelinesScenesDict = useSelector(
    (state: MainState) => state.dndBooks.timelinesScenesDict
  );
  const scenes = useSelector((state: MainState) => state.scenes.scenes);

  const [timelinePositionScenes, setTimelinePositionScenes] = useState<
    PositionScene[]
  >([]);

  const handleSetTimelineToBeEdited = () => {
    if (!timeline) return;
    dispatch(setTimelineToBeEdited(timeline));
  };

  const handleSetTimelineScenes = async () => {
    if (!timeline) return;
    const positionScenes = timelinesScenesDict[timeline.id] || [];

    setTimelinePositionScenes(positionScenes);
  };

  useEffect(() => {
    handleSetTimelineScenes();
  }, [timelinesScenesDict, timeline]);

  return { handleSetTimelineToBeEdited, timelinePositionScenes };
};
