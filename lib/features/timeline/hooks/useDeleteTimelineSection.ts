import { MainState } from "@/lib/store";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "@/lib/common/hooks/useSnackbar";
import {
  cleartimelineSectionToBeEdited,
  deleteTimelineSection,
  toggleDeleteTimelineSectionConfirmDialog,
} from "../store/timelineSectionsSlice";
import { changeMultipleScenesColor } from "../../scenes/store/scenesSlice";
import { Scene } from "@/app/types/scene";

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
      dispatch(
        changeMultipleScenesColor(
          response.data.changedScenes.map((scene: Scene) => ({
            id: scene.id,
            color: scene.color,
          }))
        )
      );
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
