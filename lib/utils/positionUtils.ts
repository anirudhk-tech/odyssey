import { TimelineSlice } from "../features/timeline/store/timelineSlice";

export const calculateRightMostScenePositionOnTimelines = (
  state: TimelineSlice
) => {
  if (!state.timelines) return;
  let maxX = 0;
  state.timelines.forEach((timeline) => {
    timeline.scenes.forEach((scene) => {
      if (!scene.x) return;
      if (scene.x > maxX) {
        maxX = scene.x;
      }
    });
  });

  if (state.narrativeTimeline) {
    state.narrativeTimeline.scenes.forEach((scene) => {
      if (!scene.x) return;
      if (scene.x > maxX) {
        maxX = scene.x;
      }
    });
  }

  state.rightMostScenePosition = maxX;
};
