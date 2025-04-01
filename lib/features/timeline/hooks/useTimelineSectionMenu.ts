import { useDispatch } from "react-redux";
import {
  toggleDeleteTimelineSectionConfirmDialog,
  toggleEditTimelineSectionDialog,
} from "../store/timelineSectionsSlice";

export const useTimelineSectionMenu = ({
  setMenuPos,
}: {
  setMenuPos: React.Dispatch<
    React.SetStateAction<{ x: number | null; y: number | null }>
  >;
}) => {
  const dispatch = useDispatch();

  const toggleDeleteDialog = () => {
    dispatch(toggleDeleteTimelineSectionConfirmDialog());
    setMenuPos({ x: null, y: null });
  };

  const toggleEditDialog = () => {
    dispatch(toggleEditTimelineSectionDialog());
    setMenuPos({ x: null, y: null });
  };

  const options = [
    {
      label: "Delete Section",
      onClick: toggleDeleteDialog,
    },
    {
      label: "Edit Section",
      onClick: toggleEditDialog,
    },
  ];

  return {
    options,
  };
};
