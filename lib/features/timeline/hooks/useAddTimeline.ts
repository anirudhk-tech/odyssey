import { useSnackbar } from "@/lib/common/hooks/useSnackbar";
import { MainState } from "@/lib/store";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTimeline, toggleAddTimelineDialog } from "../store/timelineSlice";

export const useAddTimeline = () => {
  const dispatch = useDispatch();
  const [timelineName, setTimelineName] = useState("");
  const [error, setError] = useState("");
  const { showSnackbar } = useSnackbar();
  const currentBookId = useSelector(
    (state: MainState) => state.current.currentBookId
  );
  const addTimelineDialogOpen = useSelector(
    (state: MainState) => state.timeline.addTimelineDialogOpen
  );

  const toggleDialog = () => {
    dispatch(toggleAddTimelineDialog());
    setError("");
  };

  const handleAddTimeline = async () => {
    if (!currentBookId) return;

    if (timelineName.length <= 3) {
      setError("Timeline name must be longer than 3 characters.");
      return;
    }

    const response = await window.odysseyAPI.createTimeline(
      currentBookId,
      timelineName
    );
    if (response.success) {
      dispatch(addTimeline(response.data));
      showSnackbar("Timeline added!");
      toggleDialog();
      setTimelineName("");
    } else {
      if (response.message === "Timeline already exists") {
        setError("Timeline already exists.");
      } else {
        setError("Something went wrong. Please try again.");
      }
      console.error("Error creating timeline: ", response.message);
    }
  };

  return {
    setTimelineName,
    handleAddTimeline,
    addTimelineDialogOpen,
    toggleDialog,
    error,
  };
};
