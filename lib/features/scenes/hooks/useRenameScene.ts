import { useSnackbar } from "@/lib/common/hooks/useSnackbar";
import { MainState } from "@/lib/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearSceneToBeEdited,
  renameScene,
  toggleSceneBeingRenamed,
} from "../store/scenesSlice";

export const useRenameScene = () => {
  const dispatch = useDispatch();
  const sceneToBeEdited = useSelector(
    (state: MainState) => state.scenes.sceneToBeEdited
  );
  const sceneBeingRenamed = useSelector(
    (state: MainState) => state.scenes.sceneBeingRenamed
  );
  const currentBookId = useSelector(
    (state: MainState) => state.current.currentBookId
  );
  const [sceneName, setSceneName] = useState<string>(
    sceneToBeEdited?.title || ""
  );

  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    setSceneName(sceneToBeEdited?.title || "");
  }, [sceneToBeEdited]);

  const handleRenameScene = async () => {
    if (!sceneToBeEdited || !currentBookId) return;

    if (sceneName === sceneToBeEdited.title) {
      dispatch(toggleSceneBeingRenamed());
      dispatch(clearSceneToBeEdited());
      return;
    }

    if (sceneName.length <= 3) {
      showSnackbar("Scene name must be longer than 3 characters.");
      setSceneName(sceneToBeEdited.title);
      dispatch(toggleSceneBeingRenamed());
      dispatch(clearSceneToBeEdited());
      return;
    }

    const response = await window.odysseyAPI.renameScene(
      currentBookId,
      sceneToBeEdited.id,
      sceneName
    );

    if (response.success) {
      dispatch(renameScene({ title: sceneName, id: sceneToBeEdited.id }));

      showSnackbar(`Scene renamed to ${sceneName}.`);
    } else {
      setSceneName(sceneToBeEdited.title);

      if (response.message === "Scene name already exists") {
        showSnackbar("Scene name already exists");
        dispatch(toggleSceneBeingRenamed());
        dispatch(clearSceneToBeEdited());
        return;
      }

      showSnackbar("Something went wrong. Please try again.");
    }

    dispatch(toggleSceneBeingRenamed());
    dispatch(clearSceneToBeEdited());
  };

  return {
    sceneName,
    setSceneName,
    handleRenameScene,
    sceneBeingRenamed,
    sceneToBeEdited,
  };
};
