import { MainState } from "@/lib/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNarrativeTimeline, setTimelines } from "../store/timelineSlice";
import { useSnackbar } from "@/lib/common/hooks/useSnackbar";

export const useFetchNarrativeTimeline = () => {
  const dispatch = useDispatch();
  const narrativeTimeline = useSelector(
    (state: MainState) => state.timeline.narrativeTimeline
  );
  const currentBookId = useSelector(
    (state: MainState) => state.current.currentBookId
  );
  const { showSnackbar } = useSnackbar();

  const handleFetchNarrativeTimeline = async (bookId: string) => {
    const response = await window.odysseyAPI.getNarrativeTimeline(bookId);
    if (response.success) {
      dispatch(setNarrativeTimeline(response.data.narrativeTimeline));
    } else {
      showSnackbar("Something went wrong while fetching timelines.");
    }
  };

  useEffect(() => {
    if (currentBookId) {
      handleFetchNarrativeTimeline(currentBookId);
    }
  }, [currentBookId]);

  return { narrativeTimeline };
};
