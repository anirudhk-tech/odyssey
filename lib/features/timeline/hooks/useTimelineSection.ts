import { TimelineSection } from "@/app/types/timeline";
import { useDispatch } from "react-redux";
import { setTimelineSectionToBeEdited } from "../store/timelineSectionsSlice";

export const useTimelineSection = () => {
  const dispatch = useDispatch();

  const handleSetTimelineSectionToBeEdited = (
    timelineSection: TimelineSection
  ) => {
    if (!timelineSection) return;
    dispatch(setTimelineSectionToBeEdited(timelineSection));
  };

  return { handleSetTimelineSectionToBeEdited };
};
