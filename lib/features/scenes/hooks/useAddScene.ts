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

    const response = await window.odysseyAPI.createScene(
      currentBookId,
      sceneName
    );

    if (response.success) {
      dispatch(
        addScene({
          id: response.data.id,
          title: response.data.title,
          textFilePath: response.data.text_file_path,
        })
      );
      dispatch(toggleSceneBeingAdded());
    } else {
      showSnackbar("Something went wrong. Please try again.");
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
