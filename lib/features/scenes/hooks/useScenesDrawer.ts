import { MainState } from "@/lib/store";
import { useDispatch, useSelector } from "react-redux";
import {
  setScenesDrawerWidth,
  toggleScenesDrawer,
} from "../store/scenesDrawerSlice";
import { useRef } from "react";

export const useScenesDrawer = () => {
  const dispatch = useDispatch();
  const isDrawerOpen = useSelector(
    (state: MainState) => state.scenesDrawer.isDrawerOpen
  );
  const isTimelineDrawerOpen = useSelector(
    (state: MainState) => state.timelineDrawer.isDrawerOpen
  );
  const scenesDrawerWidth = useSelector(
    (state: MainState) => state.scenesDrawer.scenesDrawerWidth
  );
  const timelineDrawerHeight = useSelector(
    (state: MainState) => state.timelineDrawer.timelineDrawerHeight
  );

  const handleToggleScenesDrawer = () => dispatch(toggleScenesDrawer());

  const startXRef = useRef<number>(0);
  const initialWidthRef = useRef<number>(scenesDrawerWidth);

  const handleMouseResizeDown = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    startXRef.current = e.clientX;
    initialWidthRef.current = scenesDrawerWidth;
    document.addEventListener("mousemove", handleMouseResizeMove);
    document.addEventListener("mouseup", handleMouseResizeUp);
  };

  const handleMouseResizeMove = (e: MouseEvent) => {
    const dx = startXRef.current - e.clientX;
    const newWidth = initialWidthRef.current + dx;
    dispatch(setScenesDrawerWidth(newWidth));
  };

  const handleMouseResizeUp = () => {
    document.removeEventListener("mousemove", handleMouseResizeMove);
    document.removeEventListener("mouseup", handleMouseResizeUp);
  };

  return {
    isDrawerOpen,
    toggleScenesDrawer,
    handleToggleScenesDrawer,
    scenesDrawerWidth,
    timelineDrawerHeight,
    handleMouseResizeDown,
    isTimelineDrawerOpen,
  };
};
