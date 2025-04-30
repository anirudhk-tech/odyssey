import { Timeline } from "@/app/types/timeline";
import { MainState } from "@/lib/store";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteSceneFromTimeline,
  deleteSceneFromAllTimelines,
  deleteSceneFromNarrativeTimeline,
} from "../store/timelineSlice";
import { changeMultipleScenesColor } from "../../scenes/store/scenesSlice";
import { TimelineScene } from "@/app/types/scene";

export const useTimelineSceneMenu = ({
  scene,
  timeline,
}: {
  scene: TimelineScene;
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
      const response = await window.odysseyAPI.deleteSceneFromNarrativeTimeline(
        currentBookId,
        scene.id
      );

      if (response.success) {
        dispatch(deleteSceneFromNarrativeTimeline(scene.id));
        dispatch(
          changeMultipleScenesColor([
            {
              id: scene.id,
              color: null,
            },
          ])
        );
      } else {
        console.error(
          "Error deleting scene from narrative timeline: ",
          response.message
        );
      }
    }
  };

  const handleRemoveAllFromTimeline = async () => {
    if (!currentBookId) return;

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
    } else {
      console.error(
        "Error deleting scene from all timelines: ",
        response.message
      );
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
