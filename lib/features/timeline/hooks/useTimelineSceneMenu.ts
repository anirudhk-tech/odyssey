import { Scene } from "@/app/types/scene";
import { Timeline } from "@/app/types/timeline";
import { MainState } from "@/lib/store";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteSceneFromTimeline,
  deleteSceneFromAllTimelines,
} from "../store/timelineSlice";
import { changeMultipleScenesColor } from "../../scenes/store/scenesSlice";

export const useTimelineSceneMenu = ({
  scene,
  timeline,
}: {
  scene: Scene;
  timeline: Timeline | "narrativeTimeline";
}) => {
  const currentBookId = useSelector(
    (state: MainState) => state.current.currentBookId
  );
  const dispatch = useDispatch();

  const handleRemoveOneFromTimeline = async () => {
    if (!currentBookId) return;

    if (timeline !== "narrativeTimeline") {
      const response = await window.odysseyAPI.deleteSceneFromTimeline(
        currentBookId,
        timeline.id,
        scene.id
      );

      if (response.success) {
        dispatch(
          deleteSceneFromTimeline({
            sceneId: scene.id,
            timelineId: timeline.id,
          })
        );
      }
    } else {
    }
  };

  const handleRemoveAllFromTimeline = async () => {
    if (!currentBookId) return;

    if (timeline !== "narrativeTimeline") {
      const response = await window.odysseyAPI.deleteSceneFromAllTimelines(
        currentBookId,
        scene.id
      );

      if (response.success) {
        dispatch(
          deleteSceneFromAllTimelines({
            sceneId: scene.id,
          })
        );
        dispatch(
          changeMultipleScenesColor([
            {
              id: scene.id,
              color: null,
            },
          ])
        );
      }
    }
  };

  const options = [
    {
      label: "Remove one from timeline",
      onClick: handleRemoveOneFromTimeline,
    },
    {
      label: "Remove all from timeline",
      onClick: handleRemoveAllFromTimeline,
    },
  ];

  return {
    options,
  };
};
