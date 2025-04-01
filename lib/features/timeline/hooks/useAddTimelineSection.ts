import { useDispatch, useSelector } from "react-redux";
import { toggleAddTimelineSectionDialog } from "../store/timelineSectionsSlice";
import { MainState } from "@/lib/store";
import { useRef, useState } from "react";

export const useAddTimelineSection = () => {
  const dispatch = useDispatch();
  const addTimelineSectionDialogOpen = useSelector(
    (state: MainState) => state.timelineSections.addTimelineSectionDialogOpen
  );
  const [sectionName, setSectionName] = useState("");
  const [error, setError] = useState("");
  const [colorPickerOpen, setColorPickerOpen] = useState(false);
  const [color, setColor] = useState("red");
  const colorPickerRef = useRef(null);

  const toggleDialog = () => {
    dispatch(toggleAddTimelineSectionDialog());
  };

  const handleAddTimelineSection = async () => {};

  const toggleColorPicker = () => {
    setColorPickerOpen(!colorPickerOpen);
  };

  const handlePickColor = (color: string) => {
    setColor(color);
    setColorPickerOpen(false);
  };

  return {
    toggleDialog,
    addTimelineSectionDialogOpen,
    handleAddTimelineSection,
    setSectionName,
    error,
    colorPickerOpen,
    toggleColorPicker,
    colorPickerRef,
    handlePickColor,
    color,
  };
};
