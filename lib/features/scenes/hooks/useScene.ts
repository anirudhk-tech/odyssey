import { Scene } from "@/app/types/scene";
import { setCurrentSceneId } from "@/lib/common/store/currentSlice";
import { MainState } from "@/lib/store";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSceneToBeEdited } from "../store/scenesSlice";

export const useScene = ({ scene }: { scene: Scene }) => {
  const [hovering, isHovering] = useState(false);

  const dispatch = useDispatch();
  const currentSceneId = useSelector(
    (state: MainState) => state.current.currentSceneId
  );
  const fillSceneBoxesColor = useSelector(
    (state: MainState) => state.preferences.preferences.fillSceneBoxesColor
  );

  const handleSetCurrentSceneId = () => {
    dispatch(setCurrentSceneId(scene.id));
  };

  const handleSetSceneToBeEdited = () => {
    dispatch(setSceneToBeEdited(scene));
  };

  const handleMouseEnter = () => isHovering(true);
  const handleMouseLeave = () => isHovering(false);

  console.log(fillSceneBoxesColor);

  return {
    currentSceneId,
    handleSetCurrentSceneId,
    hovering,
    handleMouseEnter,
    handleMouseLeave,
    handleSetSceneToBeEdited,
    fillSceneBoxesColor,
  };
};
