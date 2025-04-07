import { useSnackbar } from "@/lib/common/hooks/useSnackbar";
import { MainState } from "@/lib/store";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTimeline, toggleTimelineBeingAdded } from "../store/timelineSlice";

export const useAddTimeline = () => {
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [timelineName, setTimelineName] = useState("");
  const { showSnackbar } = useSnackbar();
  const currentBookId = useSelector(
    (state: MainState) => state.current.currentBookId
  );

  const handleAddTimeline = async () => {
    if (!currentBookId) return;

    if (timelineName.length <= 3) {
      showSnackbar("Timeline name must be longer than 3 characters.");
      return;
    }

    const response = await window.odysseyAPI.createTimeline(
      currentBookId,
      timelineName
    );
    if (response.success) {
      dispatch(addTimeline(response.data));
    } else {
      if (response.message === "Timeline already exists") {
        showSnackbar("Timeline already exists.");
      } else {
        showSnackbar("Something went wrong. Please try again.");
      }
    }

    setTimelineName("");
    dispatch(toggleTimelineBeingAdded());
  };

  return { setTimelineName, handleAddTimeline, inputRef };
};
