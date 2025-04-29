import { MainState } from "@/lib/store";
import { useDispatch, useSelector } from "react-redux";
import {
  setSceneQuery,
  setScenes,
  setSearchedScenes,
} from "../store/scenesSlice";
import { useEffect } from "react";
import { Scene } from "@/app/types/scene";
import Fuse from "fuse.js";

export const useFetchScenes = () => {
  const dispatch = useDispatch();
  const searchedScenes = useSelector(
    (state: MainState) => state.scenes.searchedScenes
  );
  const sceneQuery = useSelector((state: MainState) => state.scenes.sceneQuery);
  const scenes = useSelector((state: MainState) => state.scenes.scenes);
  const currentBookId = useSelector(
    (state: MainState) => state.current.currentBookId
  );

  const searchScenes = (scenes: Scene[]) => {
    const options = {
      includeScore: true,
      keys: ["title"],
    };

    const fuse = new Fuse(scenes, options);
    const results = fuse.search(sceneQuery);

    return results;
  };

  const setSceneSearchQuery = (query: string) => {
    dispatch(setSceneQuery(query));
  };

  const fetchScenes = async () => {
    if (!scenes && currentBookId) {
      const response = await window.odysseyAPI.getScenes(currentBookId);
      if (response.success) {
        dispatch(setScenes(response.data.scenes));
      } else {
        console.error("Error fetching scenes: ", response.message);
      }
    }

    if (scenes && currentBookId && sceneQuery.trim().length > 0) {
      const results = searchScenes(scenes);
      dispatch(
        setSearchedScenes(
          results
            .sort((a, b) => (b.score ?? 1) - (a.score ?? 1))
            .map((result) => result.item)
        )
      );
    } else if (sceneQuery.trim().length === 0) {
      dispatch(setSearchedScenes(null));
    }
  };

  useEffect(() => {
    fetchScenes();
  }, [sceneQuery]);

  return { scenes, searchedScenes, setSceneSearchQuery };
};
