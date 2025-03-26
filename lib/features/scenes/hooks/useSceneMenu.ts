import { useDispatch } from "react-redux";
import {
  toggleDeleteSceneConfirmDialog,
  toggleSceneBeingRenamed,
} from "../store/scenesSlice";

export const useSceneMenu = ({
  setMenuPos,
}: {
  setMenuPos: React.Dispatch<
    React.SetStateAction<{ x: number | null; y: number | null }>
  >;
}) => {
  const dispatch = useDispatch();

  const toggleDeleteDialog = () => {
    dispatch(toggleDeleteSceneConfirmDialog());
  };

  const toggleSceneRename = () => {
    setMenuPos({ x: null, y: null });
    dispatch(toggleSceneBeingRenamed());
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
  ];

  return { options };
};
