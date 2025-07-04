import { Book } from "@/app/types/book";
import { useDispatch } from "react-redux";
import {
  setBookToBeEdited,
  toggleDeleteBookConfirmDialog,
  toggleRenameBookDialog,
} from "../store/booksSlice";

export const useBookMenu = (book: Book | undefined) => {
  const dispatch = useDispatch();

  const toggleDeleteDialog = () => {
    if (!book) return;
    dispatch(setBookToBeEdited(book));
    dispatch(toggleDeleteBookConfirmDialog());
  };

  const toggleRenameDialog = () => {
    if (!book) return;
    dispatch(setBookToBeEdited(book));
    dispatch(toggleRenameBookDialog());
  };

  const options = [
    {
      label: "Delete Book",
      onClick: toggleDeleteDialog,
    },
    {
      label: "Rename Book",
      onClick: toggleRenameDialog,
    },
  ];

  return {
    options,
  };
};
