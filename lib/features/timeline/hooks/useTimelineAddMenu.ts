import { useDispatch } from "react-redux";
import { toggleAddTimelineDialog } from "../store/timelineSlice";
import { toggleAddTimelineSectionDialog } from "../store/timelineSectionsSlice";

export const useTimelineAddMenu = () => {
  const dispatch = useDispatch();
  const handleToggleAddTimeline = () => {
    dispatch(toggleAddTimelineDialog());
  };

  const handleToggleAddSection = () => {
    dispatch(toggleAddTimelineSectionDialog());
  };

  const options = [
    {
      label: "Add Timeline",
      onClick: handleToggleAddTimeline,
    },
    {
      label: "Add Section",
      onClick: handleToggleAddSection,
    },
  ];

  return { options };
};
