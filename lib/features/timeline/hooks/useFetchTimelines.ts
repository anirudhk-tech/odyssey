import { MainState } from "@/lib/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTimelines } from "../store/timelineSlice";
import { useSnackbar } from "@/lib/common/hooks/useSnackbar";

export const useFetchTimelines = () => {
  const dispatch = useDispatch();
  const timelines = useSelector((state: MainState) => state.timeline.timelines);
  const currentBookId = useSelector(
    (state: MainState) => state.current.currentBookId
  );
  const { showSnackbar } = useSnackbar();

  const handleFetchTimelines = async (sceneId: string) => {
    const response = await window.odysseyAPI.getTimelines(sceneId);
    if (response.success) {
      dispatch(setTimelines(response.data.timelines));
    } else {
      showSnackbar("Something went wrong while fetching timelines.");
    }
  };
  useEffect(() => {
    if (currentBookId) {
      handleFetchTimelines(currentBookId);
    }
  }, [currentBookId]);

  return { timelines };
};
