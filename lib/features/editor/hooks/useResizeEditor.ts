import { MainState } from "@/lib/store";
import { useDispatch, useSelector } from "react-redux";
import { setEditorWidth } from "../store/editorSlice";
import { useEffect } from "react";

export const useResizeEditor = () => {
  const dispatch = useDispatch();
  const sceneDrawerWidth = useSelector(
    (state: MainState) => state.scenesDrawer.scenesDrawerWidth
  );
  const editorWidth = useSelector(
    (state: MainState) => state.editor.editorWidth
  );
  const isDrawerOpen = useSelector(
    (state: MainState) => state.scenesDrawer.isDrawerOpen
  );

  const handleResizeEditor = () => {
    if (!isDrawerOpen) {
      dispatch(setEditorWidth(window.innerWidth));
      return;
    }

    if (window) {
      dispatch(setEditorWidth(window.innerWidth - sceneDrawerWidth));
    }
  };

  useEffect(() => {
    handleResizeEditor();
  }, [sceneDrawerWidth, isDrawerOpen]);

  return { editorWidth };
};
