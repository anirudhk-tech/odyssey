import { useDispatch, useSelector } from "react-redux";
import {
  toggleDeleteSceneConfirmDialog,
  toggleSceneBeingRenamed,
  toggleSceneImageDialog,
} from "../store/scenesSlice";
import { MainState } from "@/lib/store";
import { useSceneImage } from "./useSceneImage";

export const useSceneMenu = ({
  setMenuPos,
}: {
  setMenuPos: React.Dispatch<
    React.SetStateAction<{ x: number | null; y: number | null }>
  >;
}) => {
  const dispatch = useDispatch();
  const sceneToBeEdited = useSelector(
    (state: MainState) => state.scenes.sceneToBeEdited
  );
  const { handleDeleteImage } = useSceneImage();

  const toggleDeleteDialog = () => {
    dispatch(toggleDeleteSceneConfirmDialog());
  };

  const toggleSceneRename = () => {
    setMenuPos({ x: null, y: null });
    dispatch(toggleSceneBeingRenamed());
  };

  const toggleImageDialog = () => {
    dispatch(toggleSceneImageDialog());
  };

  const toggleImageRemove = () => {
    setMenuPos({ x: null, y: null });
    handleDeleteImage();
  };

  const options: { label: string; onClick: () => void }[] = [
    {
      label: "Delete",
      onClick: toggleDeleteDialog,
    },
    {
      label: "Rename",
      onClick: toggleSceneRename,
    },
    {
      label: sceneToBeEdited?.imagePath ? "Remove image" : "Add image",
      onClick: sceneToBeEdited?.imagePath
        ? toggleImageRemove
        : toggleImageDialog,
    },
  ];

  return { options, toggleSceneRename };
};
