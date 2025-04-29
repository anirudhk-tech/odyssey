import { MainState } from "@/lib/store";
import { useDispatch, useSelector } from "react-redux";
import { addScene, toggleSceneBeingAdded } from "../store/scenesSlice";
import { useSnackbar } from "@/lib/common/hooks/useSnackbar";
import { useState } from "react";

export const useAddScene = () => {
  const [sceneName, setSceneName] = useState<string>("Untitled");

  const dispatch = useDispatch();
  const currentBookId = useSelector(
    (state: MainState) => state.current.currentBookId
  );
  const sceneBeingAdded = useSelector(
    (state: MainState) => state.scenes.sceneBeingAdded
  );
  const { showSnackbar } = useSnackbar();

  const handleSceneBeingAdded = () => {
    dispatch(toggleSceneBeingAdded());
  };

  const handleAddScene = async () => {
    if (!currentBookId) return;

    if (sceneName.length <= 3) {
      showSnackbar("Scene name must be longer than 3 characters.");
      dispatch(toggleSceneBeingAdded());
      return;
    }

    const response = await window.odysseyAPI.createScene(
      currentBookId,
      sceneName
    );

    if (response.success) {
      dispatch(
        addScene({
          id: response.data.id,
          title: response.data.title,
          textFilePath: response.data.textFilePath,
        })
      );
      dispatch(toggleSceneBeingAdded());
    } else {
      if (response.message === "Scene name already exists") {
        showSnackbar("Scene name already exists.");
        dispatch(toggleSceneBeingAdded());
        return;
      }
      showSnackbar("Something went wrong. Please try again.");
      dispatch(toggleSceneBeingAdded());
      console.error("Error creating scene: ", response.message);
    }
  };

  return {
    handleAddScene,
    handleSceneBeingAdded,
    sceneBeingAdded,
    setSceneName,
    sceneName,
  };
};
