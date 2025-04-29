import { Timeline } from "@/app/types/timeline";
import { MainState } from "@/lib/store";
import { useDispatch, useSelector } from "react-redux";
import { setTimelineToBeEdited } from "../store/timelineSlice";
import { useEffect, useState } from "react";
import { Scene } from "@/app/types/scene";

export const useTimeline = ({ timeline }: { timeline: Timeline }) => {
  const dispatch = useDispatch();
  const currentSceneId = useSelector(
    (state: MainState) => state.current.currentSceneId
  );
  const timelineScenes = useSelector(
    (state: MainState) =>
      state.timeline.timelines.find((t) => t.id === timeline.id)?.scenes || []
  );
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
