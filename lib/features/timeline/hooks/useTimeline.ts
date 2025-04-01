import { Timeline } from "@/app/types/timeline";
import { MainState } from "@/lib/store";
import { useDispatch, useSelector } from "react-redux";
import { setTimelineToBeEdited } from "../store/timelineSlice";

export const useTimeline = ({ timeline }: { timeline: Timeline }) => {
  const dispatch = useDispatch();

  const handleSetTimelineToBeEdited = () => {
    if (!timeline) return;
    dispatch(setTimelineToBeEdited(timeline));
  };

  return { handleSetTimelineToBeEdited };
};
