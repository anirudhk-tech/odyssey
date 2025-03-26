import { useSnackbar } from "@/lib/common/hooks/useSnackbar";
import { MainState } from "@/lib/store";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { renameBook, toggleRenameBookDialog } from "../store/booksSlice";

export const useRenameBook = () => {
  const [error, setError] = useState<string | null>(null);
  const [bookName, setBookName] = useState<string>("");
  const { showSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const renameBookDialogOpen = useSelector(
    (state: MainState) => state.books.renameBookDialogOpen
  );
  const bookToBeEdited = useSelector(
    (state: MainState) => state.books.bookToBeEdited
  );

  const invalidRegex = /[\\\/:*?"<>|]/;

  const toggleDialog = () => {
    dispatch(toggleRenameBookDialog());
    setError(null);
    setBookName("");
  };

  const handleRenameBook = async () => {
    if (!bookToBeEdited) return;

    if (bookName.length <= 3) {
      setError("Book name must be longer than 3 characters!");
      return;
    } else if (invalidRegex.test(bookName)) {
      setError(
        `Invalid title. Please avoid using these characters: \ / : * ? " < > |`
      );
      return;
    } else {
      const response = await window.odysseyAPI.renameBook(
        bookToBeEdited.id,
        bookName
      );

      if (response.success) {
        dispatch(renameBook({ title: bookName, id: bookToBeEdited.id }));
        toggleDialog();
        showSnackbar(`Book renamed to ${bookName}.`);
      } else {
        if (response.message === "Book name already exists") {
          setError("Book name already exists");
          return;
        }

        toggleDialog();
        showSnackbar("Something went wrong. Please try again.");
      }
    }
  };

  return {
    error,
    setError,
    setBookName,
    renameBookDialogOpen,
    toggleDialog,
    handleRenameBook,
    bookToBeEdited,
  };
};
