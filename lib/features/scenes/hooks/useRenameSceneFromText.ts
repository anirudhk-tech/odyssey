import { Scene } from "@/app/types/scene";
import { MainState } from "@/lib/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { renameScene } from "../store/scenesSlice";

export const useRenameSceneFromText = ({
  currentScene,
}: {
  currentScene: Scene | null;
}) => {
  const dispatch = useDispatch();
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

    const sceneResponse = await window.odysseyAPI.renameScene(
      currentBookId,
      currentScene.id,
      sceneName
    );

    const timelineResponse = await window.odysseyAPI.renameTimelinesSceneName(
      currentBookId,
      currentScene.id,
      sceneName
    );

    if (sceneResponse.success && timelineResponse.success) {
      dispatch(renameScene({ title: sceneName, id: currentScene.id }));
    } else {
      setSceneName(currentScene.title);
    }
  };

  return { sceneName, setSceneName, handleRenameSceneFromText };
};
