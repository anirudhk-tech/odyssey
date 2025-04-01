import { MainState } from "@/lib/store";
import { useDispatch, useSelector } from "react-redux";
import { setTimelineSections } from "../store/timelineSectionsSlice";
import { useEffect } from "react";

export const useFetchTimelineSections = () => {
  const dispatch = useDispatch();
  const currentBookId = useSelector(
    (state: MainState) => state.current.currentBookId
  );
  const timelineSections = useSelector(
    (state: MainState) => state.timelineSections.sections
  );

  const handleFetchTimelineSections = async () => {
    if (!currentBookId) return;
    const response = await window.odysseyAPI.getTimelineSections(currentBookId);
    if (response.success) {
      dispatch(setTimelineSections(response.data.sections));
    }
  };

  useEffect(() => {
    handleFetchTimelineSections();
  }, [currentBookId]);

  return { timelineSections };
};
