import { Scene } from "@/app/types/scene";
import { setCurrentSceneId } from "@/lib/common/store/currentSlice";
import { MainState } from "@/lib/store";
import { useDispatch, useSelector } from "react-redux";

export const useTimelineScene = ({ scene }: { scene: Scene }) => {
  const dispatch = useDispatch();
  const currentSceneId = useSelector(
    (state: MainState) => state.current.currentSceneId
  );
  const handleSetCurrentSceneId = () => {
    dispatch(setCurrentSceneId(scene.id));
  };

  return { handleSetCurrentSceneId, currentSceneId };
};
