import { MainState } from "@/lib/store";
import { useDispatch, useSelector } from "react-redux";
import {
  setSceneImagePath,
  toggleSceneImageDialog,
} from "../store/scenesSlice";
import { useSnackbar } from "@/lib/common/hooks/useSnackbar";

export const useSceneImage = () => {
  const dispatch = useDispatch();
  const sceneImageDialogOpen = useSelector(
    (state: MainState) => state.scenes.sceneImageDialogOpen
  );
  const currentBookId = useSelector(
    (state: MainState) => state.current.currentBookId
  );
  const sceneToBeEdited = useSelector(
    (state: MainState) => state.scenes.sceneToBeEdited
  );
  const { showSnackbar } = useSnackbar();

  const toggleDialog = () => {
    dispatch(toggleSceneImageDialog());
  };

  const handleUpload = async () => {
    if (!currentBookId || !sceneToBeEdited) return;
    const filePath = await window.odysseyAPI.pickImage();

    const response = await window.odysseyAPI.addSceneImage(
      currentBookId,
      sceneToBeEdited.id,
      filePath
    );

    if (response.success) {
      dispatch(
        setSceneImagePath({
          id: sceneToBeEdited.id,
          imagePath: response.data.imagePath,
        })
      );
      dispatch(toggleSceneImageDialog());
    } else {
      console.error("Error uploading image:", response.message);
      dispatch(toggleSceneImageDialog());
      showSnackbar("Something went wrong while uploading the image.");
    }
  };

  const handleDeleteImage = async () => {
    if (!currentBookId || !sceneToBeEdited) return;
    const response = await window.odysseyAPI.removeSceneImage(
      currentBookId,
      sceneToBeEdited.id
    );

    if (response.success) {
      dispatch(setSceneImagePath({ id: sceneToBeEdited.id, imagePath: null }));
      console.log(response.data);
    } else {
      console.error("Error removing image:", response.message);
      showSnackbar("Something went wrong while removing the image.");
    }
  };

  return {
    sceneImageDialogOpen,
    toggleDialog,
    handleUpload,
    handleDeleteImage,
  };
};
