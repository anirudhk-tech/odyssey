import { MainState } from "@/lib/store";
import { useDispatch, useSelector } from "react-redux";
import {
  setTimelineDrawerHeight,
  toggleTimelineDrawer,
} from "../store/timelineDrawerSlice";
import { useRef } from "react";
import { toggleTimelineBeingAdded } from "../store/timelineSlice";

export const useTimelineDrawer = () => {
  const dispatch = useDispatch();
  const isDrawerOpen = useSelector(
    (state: MainState) => state.timelineDrawer.isDrawerOpen
  );

  const timelineDrawerHeight = useSelector(
    (state: MainState) => state.timelineDrawer.timelineDrawerHeight
  );

  const handleToggleTimelineDrawer = () => dispatch(toggleTimelineDrawer());
  const handleToggleTimelineBeingAdded = () =>
    dispatch(toggleTimelineBeingAdded());

  const startYRef = useRef<number>(0);
  const initialHeightRef = useRef<number>(timelineDrawerHeight);
  const timelineBeingAdded = useSelector(
    (state: MainState) => state.timeline.timelineBeingAdded
  );

  const handleMouseResizeDown = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    startYRef.current = e.clientY;
    initialHeightRef.current = timelineDrawerHeight;
    document.addEventListener("mousemove", handleMouseResizeMove);
    document.addEventListener("mouseup", handleMouseResizeUp);
  };

  const handleMouseResizeMove = (e: MouseEvent) => {
    const dy = startYRef.current - e.clientY;
    const newHeight = initialHeightRef.current + dy;
    dispatch(setTimelineDrawerHeight(newHeight));
  };

  const handleMouseResizeUp = () => {
    document.removeEventListener("mousemove", handleMouseResizeMove);
    document.removeEventListener("mouseup", handleMouseResizeUp);
  };

  return {
    isDrawerOpen,
    toggleTimelineDrawer,
    handleToggleTimelineDrawer,
    timelineDrawerHeight,
    handleMouseResizeDown,
    timelineBeingAdded,
    handleToggleTimelineBeingAdded,
  };
};
