import { TimelineSection } from "@/app/types/timeline";
import { useDispatch, useSelector } from "react-redux";
import {
  resizeTimelineSection,
  toggleSectionIsResizing,
} from "../store/timelineSectionsSlice";
import { MainState } from "@/lib/store";
import { changeMultipleSceneColorsOnTimelines } from "../store/timelineSlice";
import { Scene } from "@/app/types/scene";
import { changeMultipleScenesColor } from "../../scenes/store/scenesSlice";

export const useTimelineSectionResize = () => {
  const dispatch = useDispatch();
  const currentBookId = useSelector(
    (state: MainState) => state.current.currentBookId
  );
  const sections = useSelector(
    (state: MainState) => state.timelineSections.sections
  );
  const sectionIsResizing = useSelector(
    (state: MainState) => state.timelineSections.sectionIsResizing
  );

  const handleMouseDown = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    section: TimelineSection
  ) => {
    if (!currentBookId) return;
    e.preventDefault();

    dispatch(toggleSectionIsResizing());

    const startX = e.clientX;
    const initialWidth = section.width;
    const initialXStart = section.xStart;
    const initialXEnd = section.xEnd;
    const sectionIndex = sections.findIndex((s) => s.id === section.id);

    const onMouseMove = (moveE: MouseEvent) => {
      const deltaX = moveE.clientX - startX;
      const firstSectionNewWidth = initialWidth + deltaX;
      const firstSectionNewXStart = initialXStart;
      const firstSectionNewXEnd = initialXEnd + deltaX;

      if (firstSectionNewWidth <= 100) return;

      dispatch(
        resizeTimelineSection({
          id: section.id,
          width: firstSectionNewWidth,
          xStart: firstSectionNewXStart,
          xEnd: firstSectionNewXEnd,
        })
      );

      if (sectionIndex < sections.length - 1) {
        const nextSection = sections[sectionIndex + 1];
        const nextSectionWidth = nextSection.width;
        const nextSectionNewXStart = firstSectionNewXEnd;
        const nextSectionNewXEnd = firstSectionNewXEnd + nextSectionWidth;

        dispatch(
          resizeTimelineSection({
            id: nextSection.id,
            width: nextSectionWidth,
            xStart: nextSectionNewXStart,
            xEnd: nextSectionNewXEnd,
          })
        );
      }
    };

    const onMouseUp = async (e: MouseEvent) => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);

      const firstSectionNewWidth = initialWidth + (e.clientX - startX);
      const firstSectionNewXStart = initialXStart;
      const firstSectionNewXEnd = initialXEnd + (e.clientX - startX);

      const response = await window.odysseyAPI.resizeTimelineSection(
        currentBookId,
        section.id,
        firstSectionNewXStart,
        firstSectionNewXEnd,
        firstSectionNewWidth
      );

      if (response.success) {
        const { changedScenes } = response.data;
        if (changedScenes) {
          dispatch(
            changeMultipleSceneColorsOnTimelines(
              changedScenes.map((scene: Scene) => ({
                color: scene.color,
                sceneId: scene.id,
              }))
            )
          );

          dispatch(
            changeMultipleScenesColor(
              changedScenes.map((scene: Scene) => ({
                color: scene.color,
                id: scene.id,
              }))
            )
          );
        }
      } else {
        console.error("Error resizing timeline section: ", response.message);
      }

      if (sectionIndex < sections.length - 1) {
        const nextSection = sections[sectionIndex + 1];
        const nextSectionWidth = nextSection.width;
        const nextSectionNewXStart = firstSectionNewXEnd;
        const nextSectionNewXEnd = firstSectionNewXEnd + nextSectionWidth;

        const response = await window.odysseyAPI.resizeTimelineSection(
          currentBookId,
          nextSection.id,
          nextSectionNewXStart,
          nextSectionNewXEnd,
          nextSectionWidth
        );

        if (response.success) {
          const { changedScenes } = response.data;
          if (changedScenes) {
            dispatch(
              changeMultipleSceneColorsOnTimelines(
                changedScenes.map((scene: Scene) => ({
                  color: scene.color,
                  sceneId: scene.id,
                }))
              )
            );

            dispatch(
              changeMultipleScenesColor(
                changedScenes.map((scene: Scene) => ({
                  color: scene.color,
                  id: scene.id,
                }))
              )
            );
          }
        } else {
          console.error("Error resizing timeline section: ", response.message);
        }
      }

      dispatch(toggleSectionIsResizing());
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  return { handleMouseDown, sectionIsResizing };
};
