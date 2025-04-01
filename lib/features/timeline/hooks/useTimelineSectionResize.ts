import { TimelineSection } from "@/app/types/timeline";
import { useDispatch, useSelector } from "react-redux";
import { resizeTimelineSection } from "../store/timelineSectionsSlice";
import { MainState } from "@/lib/store";

export const useTimelineSectionResize = () => {
  const dispatch = useDispatch();
  const currentBookId = useSelector(
    (state: MainState) => state.current.currentBookId
  );

  const handleMouseDown = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    section: TimelineSection
  ) => {
    if (!currentBookId) return;
    e.preventDefault();

    const startX = e.clientX;
    const initialWidth = section.width;
    const initialXStart = section.xStart;
    const initialXEnd = section.xEnd;

    const onMouseMove = (moveE: MouseEvent) => {
      const deltaX = moveE.clientX - startX;
      const newWidth = initialWidth + deltaX;
      const newXStart = initialXStart + deltaX;
      const newXEnd = initialXEnd + deltaX;

      if (newWidth <= 100) return;

      dispatch(
        resizeTimelineSection({
          id: section.id,
          width: newWidth,
          xStart: newXStart,
          xEnd: newXEnd,
        })
      );
    };

    const onMouseUp = async () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);

      const newWidth = initialWidth + (e.clientX - startX);
      const newXStart = initialXStart + (e.clientX - startX);
      const newXEnd = initialXEnd + (e.clientX - startX);

      await window.odysseyAPI.resizeTimelineSection(
        currentBookId,
        section.id,
        newXStart,
        newXEnd,
        newWidth
      );
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  return { handleMouseDown };
};
