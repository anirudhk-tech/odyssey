import { MainState } from "@/lib/store";
import { useDispatch, useSelector } from "react-redux";
import { toggleAddBookDialog } from "../store/booksSlice";

export const useAddBook = () => {
  const dispatch = useDispatch();
  const addBookDialogOpen = useSelector(
    (state: MainState) => state.books.addBookDialogOpen
  );

  const toggleDialog = () => dispatch(toggleAddBookDialog());

  return { addBookDialogOpen, toggleDialog };
};
