import { useDispatch } from "react-redux";
import {
  toggleDeleteTimelineConfirmDialog,
  toggleTimelineBeingRenamed,
} from "../store/timelineSlice";

export const useTimelineMenu = ({
  setMenuPos,
}: {
  setMenuPos: React.Dispatch<
    React.SetStateAction<{ x: number | null; y: number | null }>
  >;
}) => {
  const dispatch = useDispatch();

  const toggleDeleteDialog = () => {
    dispatch(toggleDeleteTimelineConfirmDialog());
    setMenuPos({ x: null, y: null });
  };

  const toggleTimelineRename = () => {
    dispatch(toggleTimelineBeingRenamed());
    setMenuPos({ x: null, y: null });
  };

  const options = [
    {
      label: "Delete Timeline",
      onClick: toggleDeleteDialog,
    },
    {
      label: "Rename Timeline",
      onClick: toggleTimelineRename,
    },
  ];

  return {
    options,
  };
};
