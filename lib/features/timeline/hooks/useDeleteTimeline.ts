import { MainState } from "@/lib/store";
import { useDispatch, useSelector } from "react-redux";
import {
  clearTimelineToBeEdited,
  deleteTimeline,
  toggleDeleteTimelineConfirmDialog,
} from "../store/timelineSlice";
import { useSnackbar } from "@/lib/common/hooks/useSnackbar";

export const useDeleteTimeline = () => {
  const dispatch = useDispatch();
  const timelineToBeEdited = useSelector(
    (state: MainState) => state.timeline.timelineToBeEdited
  );
  const currentBookId = useSelector(
    (state: MainState) => state.current.currentBookId
  );
  const deleteTimelineConfirmDialogOpen = useSelector(
    (state: MainState) => state.timeline.deleteTimelineConfirmDialogOpen
  );
  const { showSnackbar } = useSnackbar();

  const handleDelete = async () => {
    if (!timelineToBeEdited || !currentBookId) return;
    const response = await window.odysseyAPI.deleteTimeline(
      currentBookId,
      timelineToBeEdited.id
    );
    if (response.success) {
      dispatch(deleteTimeline(timelineToBeEdited.id));
      showSnackbar("Timeline deleted!");
    } else {
      showSnackbar("Something went wrong. Please try again.");
      console.error("Error deleting timeline: ", response.message);
    }

    dispatch(clearTimelineToBeEdited());
    dispatch(toggleDeleteTimelineConfirmDialog());
  };

  const handleCancel = () => {
    dispatch(clearTimelineToBeEdited());
    dispatch(toggleDeleteTimelineConfirmDialog());
  };

  const toggleDialog = () => {
    dispatch(toggleDeleteTimelineConfirmDialog());
  };

  return {
    handleDelete,
    handleCancel,
    toggleDialog,
    deleteTimelineConfirmDialogOpen,
  };
};
