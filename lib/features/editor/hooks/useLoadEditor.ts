import { Scene } from "@/app/types/scene";
import { useSnackbar } from "@/lib/common/hooks/useSnackbar";
import { MainState } from "@/lib/store";
import { convertFromRaw, EditorState } from "draft-js";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

export const useLoadEditor = ({
  editorState,
  setEditorState,
}: {
  editorState: EditorState;
  setEditorState: (editorState: EditorState) => void;
}) => {
  const [currentScene, setCurrentScene] = useState<Scene | null>(null);

  const currentSceneId = useSelector(
    (state: MainState) => state.current.currentSceneId
  );
  const currentBookId = useSelector(
    (state: MainState) => state.current.currentBookId
  );

  const scenes = useSelector((state: MainState) => state.scenes.scenes);
  const { showSnackbar } = useSnackbar();
  const handleRestoreEditorState = async () => {
    if (!currentSceneId || !currentBookId) return;
    const response = await window.odysseyAPI.getTextFromScene(
      currentBookId,
      currentSceneId
    );

    if (response.success) {
      const contentState = convertFromRaw(
        JSON.parse(response.data.raw_json_text)
      );
      setEditorState(EditorState.createWithContent(contentState));
    } else {
      showSnackbar("Something went wrong while loading your file.");
      console.error("Error loading content: ", response.message);
    }
  };

  useEffect(() => {
    setCurrentScene(
      scenes?.find((scene) => scene.id === currentSceneId) || null
    );
  }, [scenes, currentSceneId]);

  useEffect(() => {
    handleRestoreEditorState();
  }, [currentSceneId, currentBookId]);

  return {
    currentScene,
  };
};
