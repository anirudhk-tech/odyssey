import { MainState } from "@/lib/store";
import { useDispatch, useSelector } from "react-redux";
import { setScenes } from "../store/scenesSlice";
import { useEffect } from "react";

export const useFetchScenes = () => {
  const dispatch = useDispatch();
  const scenes = useSelector((state: MainState) => state.scenes.scenes);
  const currentBookId = useSelector(
    (state: MainState) => state.current.currentBookId
  );

  const fetchScenes = async () => {
    if (!scenes && currentBookId) {
      const response = await window.odysseyAPI.getScenes(currentBookId);
      if (response.success) dispatch(setScenes(response.data.scenes));
    }
  };

  useEffect(() => {
    fetchScenes();
  }, []);

  return { scenes };
};
