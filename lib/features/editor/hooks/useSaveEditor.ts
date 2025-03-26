import { useSnackbar } from "@/lib/common/hooks/useSnackbar";
import { MainState } from "@/lib/store";
import { EditorState, convertToRaw } from "draft-js";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

export const useSaveEditor = ({
  editorState,
}: {
  editorState: EditorState;
}) => {
  const [saving, setSaving] = useState(false);
  const { showSnackbar } = useSnackbar();
  const currentBookId = useSelector(
    (state: MainState) => state.current.currentBookId
  );
  const currentSceneId = useSelector(
    (state: MainState) => state.current.currentSceneId
  );
  const previousSceneId = useRef<string | null>(null);

  const handleSaveEditor = async (sceneId: string | null = null) => {
    if (!currentBookId || !sceneId) return;

    const contentState = editorState.getCurrentContent();
    const rawJsonState = convertToRaw(contentState);

    const response = await window.odysseyAPI.writeTextIntoScene(
      currentBookId,
      sceneId,
      JSON.stringify(rawJsonState)
    );

    if (response.success) {
      setSaving(false);
    } else {
      showSnackbar("Something went wrong while saving your file.");
      setSaving(false);
    }
  };

  useEffect(() => {
    const debouncedSave = setTimeout(() => {
      setSaving(true);
      handleSaveEditor(currentSceneId);
    }, 2000);

    return () => clearTimeout(debouncedSave);
  }, [editorState]);

  useEffect(() => {
    if (previousSceneId.current && previousSceneId.current !== currentSceneId) {
      handleSaveEditor(previousSceneId.current);
    }
    previousSceneId.current = currentSceneId;
  }, [currentSceneId]);

  return { saving };
};
