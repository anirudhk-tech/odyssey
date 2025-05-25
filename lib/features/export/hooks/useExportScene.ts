import { MainState } from "@/lib/store";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSelectedScene, removeSelectedScene } from "../store/exportSlice";
import { Scene } from "@/app/types/scene";

export const useExportScene = (scene: Scene) => {
  const dispatch = useDispatch();
  const fillSceneBoxesColor = useSelector(
    (state: MainState) => state.preferences.preferences.fillSceneBoxesColor
  );
  const order = useSelector(
    (state: MainState) =>
      state.export.selectedScenes.find(
        (selected) => selected.scene.id === scene.id
      )?.order ?? null
  );
  const selected = order !== null;

  const toggleSelected = () => {
    if (selected) {
      dispatch(removeSelectedScene({ id: scene.id }));
    } else {
      dispatch(addSelectedScene(scene));
    }
  };

  return {
    selected,
    fillSceneBoxesColor,
    toggleSelected,
    order,
  };
};
