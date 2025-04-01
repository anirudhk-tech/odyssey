import { useDispatch, useSelector } from "react-redux";
import {
  addTimelineSection,
  toggleAddTimelineSectionDialog,
} from "../store/timelineSectionsSlice";
import { MainState } from "@/lib/store";
import { useRef, useState } from "react";
import { useSnackbar } from "@/lib/common/hooks/useSnackbar";

export const useAddTimelineSection = () => {
  const dispatch = useDispatch();
  const addTimelineSectionDialogOpen = useSelector(
    (state: MainState) => state.timelineSections.addTimelineSectionDialogOpen
  );
  const currentBookId = useSelector(
    (state: MainState) => state.current.currentBookId
  );
  const sections = useSelector(
    (state: MainState) => state.timelineSections.sections
  );
  const { showSnackbar } = useSnackbar();

  const [sectionName, setSectionName] = useState("");
  const [error, setError] = useState("");
  const [colorPickerOpen, setColorPickerOpen] = useState(false);
  const [color, setColor] = useState("#ffffff");
  const colorPickerRef = useRef(null);

  const toggleDialog = () => {
    dispatch(toggleAddTimelineSectionDialog());
  };

  const handleAddTimelineSection = async () => {
    if (!currentBookId) return;

    if (sectionName.length <= 3) {
      setError("Section name must be longer than 3 characters");
      return;
    }

    const xStart =
      sections.map((section) => section.width).reduce((a, b) => a + b, 0) + 170;
    const response = await window.odysseyAPI.createTimelineSection(
      currentBookId,
      sectionName,
      color,
      xStart
    );

    if (response.success) {
      dispatch(addTimelineSection(response.data.section));
      dispatch(toggleAddTimelineSectionDialog());
    } else {
      if (response.message === "Section already exists") {
        setError("Section already exists.");
      } else {
        dispatch(toggleAddTimelineSectionDialog());
        showSnackbar("Something went wrong. Please try again.");
      }
    }
  };

  const toggleColorPicker = () => {
    setColorPickerOpen(!colorPickerOpen);
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
    setColor,
    color,
  };
};
