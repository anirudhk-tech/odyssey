import { MainState } from "@/lib/store";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "@/lib/common/hooks/useSnackbar";
import {
  cleartimelineSectionToBeEdited,
  deleteTimelineSection,
  toggleDeleteTimelineSectionConfirmDialog,
} from "../store/timelineSectionsSlice";

export const useDeleteTimelineSection = () => {
  const dispatch = useDispatch();
  const timelineSectionToBeEdited = useSelector(
    (state: MainState) => state.timelineSections.timelineSectionToBeEdited
  );
  const currentBookId = useSelector(
    (state: MainState) => state.current.currentBookId
  );
  const deleteTimelineSectionConfirmDialogOpen = useSelector(
    (state: MainState) =>
      state.timelineSections.deleteTimelineSectionConfirmDialogOpen
  );
  const { showSnackbar } = useSnackbar();

  const handleDelete = async () => {
    if (!timelineSectionToBeEdited || !currentBookId) return;
    const response = await window.odysseyAPI.deleteTimelineSection(
      currentBookId,
      timelineSectionToBeEdited.id
    );
    if (response.success) {
      dispatch(deleteTimelineSection(timelineSectionToBeEdited.id));
      showSnackbar("Timeline section deleted!");
    } else {
      showSnackbar("Something went wrong. Please try again.");
      console.error("Error deleting timeline section: ", response.message);
    }

    dispatch(cleartimelineSectionToBeEdited());
    dispatch(toggleDeleteTimelineSectionConfirmDialog());
  };

  const handleCancel = () => {
    dispatch(cleartimelineSectionToBeEdited());
    dispatch(toggleDeleteTimelineSectionConfirmDialog());
  };

  const toggleDialog = () => {
    dispatch(toggleDeleteTimelineSectionConfirmDialog());
  };

  return {
    handleDelete,
    handleCancel,
    toggleDialog,
    deleteTimelineSectionConfirmDialogOpen,
  };
};
