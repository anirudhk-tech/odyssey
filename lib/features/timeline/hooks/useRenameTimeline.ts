import { useSnackbar } from "@/lib/common/hooks/useSnackbar";
import { MainState } from "@/lib/store";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearTimelineToBeEdited,
  renameTimeline,
  toggleTimelineBeingRenamed,
} from "../store/timelineSlice";

export const useRenameTimeline = () => {
  const dispatch = useDispatch();
  const timelineToBeEdited = useSelector(
    (state: MainState) => state.timeline.timelineToBeEdited
  );
  const timelineBeingRenamed = useSelector(
    (state: MainState) => state.timeline.timelineBeingRenamed
  );
  const currentBookId = useSelector(
    (state: MainState) => state.current.currentBookId
  );

  const [timelineName, setTimelineName] = useState<string>(
    timelineToBeEdited?.title || ""
  );
  const { showSnackbar } = useSnackbar();

  const handleRenameTimeline = async () => {
    if (!timelineToBeEdited || !currentBookId) return;

    if (timelineName === timelineToBeEdited.title) {
      dispatch(toggleTimelineBeingRenamed());
      dispatch(clearTimelineToBeEdited());
      return;
    }

    if (timelineName.length <= 3) {
      showSnackbar("Timeline name must be longer than 3 characters.");
      setTimelineName(timelineToBeEdited.title);
      dispatch(toggleTimelineBeingRenamed());
      dispatch(clearTimelineToBeEdited());
      return;
    }

    const response = await window.odysseyAPI.renameTimeline(
      currentBookId,
      timelineToBeEdited.id,
      timelineName
    );

    if (response.success) {
      dispatch(
        renameTimeline({
          title: timelineName,
          id: timelineToBeEdited.id,
          scenes: timelineToBeEdited.scenes,
        })
      );
      showSnackbar(`Timeline renamed to ${timelineName}.`);
    } else {
      setTimelineName(timelineToBeEdited.title);

      if (response.message === "Timeline name already exists") {
        showSnackbar("Timeline name already exists");
        dispatch(toggleTimelineBeingRenamed());
        dispatch(clearTimelineToBeEdited());
        return;
      }

      showSnackbar("Something went wrong. Please try again.");
      console.log(response.message);
    }

    dispatch(toggleTimelineBeingRenamed());
    dispatch(clearTimelineToBeEdited());
  };

  return {
    handleRenameTimeline,
    timelineBeingRenamed,
    timelineName,
    setTimelineName,
    timelineToBeEdited,
  };
};
