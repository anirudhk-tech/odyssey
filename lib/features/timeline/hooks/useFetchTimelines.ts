import { MainState } from "@/lib/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTimelines } from "../store/timelineSlice";
import { useSnackbar } from "@/lib/common/hooks/useSnackbar";
import { PositionScene, Scene } from "@/app/types/scene";
import { Timeline } from "@/app/types/timeline";
import { setTimelinesScenesDict } from "../../books/store/dndBooksSlice";
import { changeSceneColor } from "../../scenes/store/scenesSlice";

export const useFetchTimelines = () => {
  const dispatch = useDispatch();
  const timelines = useSelector((state: MainState) => state.timeline.timelines);
  const timelineSections = useSelector(
    (state: MainState) => state.timelineSections.sections
  );
  const currentBookId = useSelector(
    (state: MainState) => state.current.currentBookId
  );
  const { showSnackbar } = useSnackbar();

  const handleFetchTimelines = async (sceneId: string) => {
    const response = await window.odysseyAPI.getTimelines(sceneId);
    if (response.success) {
      dispatch(setTimelines(response.data.timelines));

      const timelinesScenesDict: Record<string, PositionScene[]> = {};

      response.data.timelines.forEach((timeline: Timeline) => {
        timelinesScenesDict[timeline.id] = timeline.scenes;
        for (const scene of timeline.scenes) {
          dispatch(
            changeSceneColor(
              timelineSections.find(
                (section) =>
                  section.xStart <= scene.x && section.xEnd >= scene.x
              )?.color ?? "#000000"
            )
          );
        }
      });

      dispatch(setTimelinesScenesDict(timelinesScenesDict));
    } else {
      showSnackbar("Something went wrong while fetching timelines.");
    }
  };

  useEffect(() => {
    if (currentBookId) {
      handleFetchTimelines(currentBookId);
    }
  }, [currentBookId]);

  return { timelines };
};
