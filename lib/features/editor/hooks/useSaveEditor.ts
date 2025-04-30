import { useSnackbar } from "@/lib/common/hooks/useSnackbar";
import { MainState } from "@/lib/store";
import { EditorState, convertToRaw } from "draft-js";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleEditorSaving } from "../store/editorSlice";
import { updateSceneTextCounts } from "../../scenes/store/scenesSlice";

export const useSaveEditor = ({
  editorState,
}: {
  editorState: EditorState;
}) => {
  const dispatch = useDispatch();
  const editorSaving = useSelector(
    (state: MainState) => state.editor.editorSaving
  );
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
      dispatch(toggleEditorSaving(false));
      dispatch(
        updateSceneTextCounts({
          charCount: response.data.charCount,
          wordCount: response.data.wordCount,
          id: sceneId,
        })
      );
    } else {
      showSnackbar("Something went wrong while saving your file.");
      dispatch(toggleEditorSaving(false));
      console.error("Error saving editor:", response.message);
    }
  };

  useEffect(() => {
    dispatch(toggleEditorSaving(true));
    const debouncedSave = setTimeout(() => {
      handleSaveEditor(currentSceneId);
    }, 2000);

    return () => clearTimeout(debouncedSave);
  }, [editorState]); // Saves every 2 second of inactivity

  useEffect(() => {
    if (previousSceneId.current && previousSceneId.current !== currentSceneId) {
      handleSaveEditor(previousSceneId.current);
    }
    previousSceneId.current = currentSceneId;
  }, [currentSceneId]); // Saves upon scene changes

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "s" && (event.ctrlKey || event.metaKey)) {
        event.preventDefault();
        handleSaveEditor(currentSceneId);
      }
    };

    if (window) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSceneId]); // Saves on ctrl + s
};
