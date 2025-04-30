import { useDispatch, useSelector } from "react-redux";
import {
  editTimelineSection,
  toggleEditTimelineSectionDialog,
} from "../store/timelineSectionsSlice";
import { MainState } from "@/lib/store";
import { useEffect, useRef, useState } from "react";
import { useSnackbar } from "@/lib/common/hooks/useSnackbar";
import { changeMultipleScenesColor } from "../../scenes/store/scenesSlice";
import { Scene } from "@/app/types/scene";

export const useEditTimelineSection = () => {
  const dispatch = useDispatch();
  const timelineSectionToBeEdited = useSelector(
    (state: MainState) => state.timelineSections.timelineSectionToBeEdited
  );
  const currentBookId = useSelector(
    (state: MainState) => state.current.currentBookId
  );
  const editTimelineSectionDialogOpen = useSelector(
    (state: MainState) => state.timelineSections.editTimelineSectionDialogOpen
  );
  const { showSnackbar } = useSnackbar();

  const [sectionName, setSectionName] = useState(
    timelineSectionToBeEdited?.title || ""
  );
  const [error, setError] = useState("");
  const [colorPickerOpen, setColorPickerOpen] = useState(false);
  const [color, setColor] = useState(
    timelineSectionToBeEdited?.color || "#ffffff"
  );
  const colorPickerRef = useRef(null);

  useEffect(() => {
    if (timelineSectionToBeEdited) {
      setSectionName(timelineSectionToBeEdited.title);
      setColor(timelineSectionToBeEdited.color);
    }
  }, [timelineSectionToBeEdited]);

  const toggleDialog = () => {
    dispatch(toggleEditTimelineSectionDialog());
  };

  const handleEditTimelineSection = async () => {
    if (!currentBookId || !timelineSectionToBeEdited) return;

    if (sectionName.length <= 3) {
      setError("Section name must be longer than 3 characters");
      return;
    }

    const response = await window.odysseyAPI.editTimelineSection(
      currentBookId,
      timelineSectionToBeEdited.id,
      sectionName,
      color
    );

    if (response.success) {
      dispatch(
        editTimelineSection({
          ...timelineSectionToBeEdited,
          title: sectionName,
          color: color,
        })
      );
      dispatch(
        changeMultipleScenesColor(
          response.data.changedScenes.map((scene: Scene) => ({
            color: scene.color,
            id: scene.id,
          }))
        )
      );
      dispatch(toggleEditTimelineSectionDialog());
    } else {
      if (response.message === "Section already exists") {
        setError("Section already exists.");
      } else {
        dispatch(toggleEditTimelineSectionDialog());
        showSnackbar("Something went wrong. Please try again.");
      }
      console.error("Error editing timeline section: ", response.message);
    }
  };

  const toggleColorPicker = () => {
    setColorPickerOpen(!colorPickerOpen);
  };

  return {
    toggleDialog,
    handleEditTimelineSection,
    setSectionName,
    editTimelineSectionDialogOpen,
    error,
    colorPickerOpen,
    toggleColorPicker,
    colorPickerRef,
    setColor,
    color,
  };
};
