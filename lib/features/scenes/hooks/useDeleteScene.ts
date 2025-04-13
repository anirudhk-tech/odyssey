import { useDispatch, useSelector } from "react-redux";
import {
  clearSceneToBeEdited,
  deleteScene,
  toggleDeleteSceneConfirmDialog,
} from "../store/scenesSlice";
import { MainState } from "@/lib/store";
import { useSnackbar } from "@/lib/common/hooks/useSnackbar";
import { deleteSceneFromAllTimelines } from "../../timeline/store/timelineSlice";

export const useDeleteScene = () => {
  const dispatch = useDispatch();
  const deleteSceneConfirmDialogOpen = useSelector(
    (state: MainState) => state.scenes.deleteSceneConfirmDialogOpen
  );
  const currentBookId = useSelector(
    (state: MainState) => state.current.currentBookId
  );
  const sceneToBeEdited = useSelector(
    (state: MainState) => state.scenes.sceneToBeEdited
  );
  const { showSnackbar } = useSnackbar();

  const toggleDialog = () => {
    dispatch(toggleDeleteSceneConfirmDialog());
  };

  const handleCancel = () => {
    dispatch(toggleDeleteSceneConfirmDialog());
    dispatch(clearSceneToBeEdited());
  };

  const handleDeleteScene = async () => {
    if (!sceneToBeEdited || !currentBookId) return;
    const response = await window.odysseyAPI.deleteScene(
      currentBookId,
      sceneToBeEdited.id
    );

    if (response.success) {
      dispatch(deleteScene(sceneToBeEdited.id));
      dispatch(deleteSceneFromAllTimelines({ sceneId: sceneToBeEdited.id }));
      showSnackbar("Scene deleted!");
    } else {
      showSnackbar("Something went wrong. Please try again.");
    }
    dispatch(toggleDeleteSceneConfirmDialog());
    dispatch(clearSceneToBeEdited());
  };

  return {
    toggleDialog,
    deleteSceneConfirmDialogOpen,
    handleCancel,
    handleDeleteScene,
  };
};
