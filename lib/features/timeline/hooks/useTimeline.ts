import { MainState } from "@/lib/store";
import { useSelector } from "react-redux";

export const useTimeline = () => {
  const timelineBeingAdded = useSelector(
    (state: MainState) => state.timeline.timelineBeingAdded
  );

  return { timelineBeingAdded };
};
