import { Scene } from "@/app/types/scene";
import { MainState } from "@/lib/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { renameScene } from "../store/scenesSlice";
import { useSnackbar } from "@/lib/common/hooks/useSnackbar";

export const useRenameSceneFromText = ({
  currentScene,
}: {
  currentScene: Scene | null;
}) => {
  const dispatch = useDispatch();
  const { showSnackbar } = useSnackbar();
  const currentBookId = useSelector(
    (state: MainState) => state.current.currentBookId
  );
  const [sceneName, setSceneName] = useState<string>(currentScene?.title || "");

  useEffect(() => setSceneName(currentScene?.title || ""), [currentScene]);

  const handleRenameSceneFromText = async () => {
    if (
      !currentScene ||
      !currentBookId ||
      sceneName === currentScene.title ||
      sceneName.length <= 3
    ) {
      setSceneName(currentScene?.title || "");
      return;
    }

    const response = await window.odysseyAPI.renameScene(
      currentBookId,
      currentScene.id,
      sceneName
    );

    if (response.success) {
      dispatch(renameScene({ title: sceneName, id: currentScene.id }));
    } else {
      setSceneName(currentScene.title);

      if (response.message === "Scene name already exists") {
        showSnackbar("Scene name already exists");
        return;
      }

      showSnackbar("Something went wrong. Please try again.");
    }
  };

  return { sceneName, setSceneName, handleRenameSceneFromText };
};
