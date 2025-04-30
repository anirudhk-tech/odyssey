import { MainState } from "@/lib/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNarrativeTimeline } from "../store/timelineSlice";
import { useSnackbar } from "@/lib/common/hooks/useSnackbar";

export const useFetchNarrativeTimeline = () => {
  const dispatch = useDispatch();
  const narrativeTimeline = useSelector(
    (state: MainState) => state.timeline.narrativeTimeline
  );
  const currentBookId = useSelector(
    (state: MainState) => state.current.currentBookId
  );
  const narrativeTimelineScenes = useSelector((state: MainState) => {
    const entry = state.timeline.narrativeTimeline;
    if (!entry) return [];

    return entry.scenes.map(({ id, x }) => {
      const scene = state.scenes.scenes?.find((s) => s.id === id);
      if (!scene) return null;
      return {
        ...scene,
        x,
      };
    });
  });

  const { showSnackbar } = useSnackbar();

  const handleFetchNarrativeTimeline = async (bookId: string) => {
    const response = await window.odysseyAPI.getNarrativeTimeline(bookId);
    if (response.success) {
      dispatch(setNarrativeTimeline(response.data.narrativeTimeline));
    } else {
      showSnackbar("Something went wrong while fetching timelines.");
      console.error("Error fetching narrative timeline: ", response.message);
    }
  };

  useEffect(() => {
    if (currentBookId) {
      handleFetchNarrativeTimeline(currentBookId);
    }
  }, [currentBookId]);

  return { narrativeTimeline, narrativeTimelineScenes };
};
