import { MainState } from "@/lib/store";
import { useDispatch, useSelector } from "react-redux";
import { addBook, toggleAddBookDialog } from "../store/booksSlice";
import { useState } from "react";
import { useSnackbar } from "@/lib/common/hooks/useSnackbar";

export const useAddBook = () => {
  const [error, setError] = useState<string | null>(null);
  const [bookName, setBookName] = useState<string>("");
  const { showSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const addBookDialogOpen = useSelector(
    (state: MainState) => state.books.addBookDialogOpen
  );

  const invalidRegex = /[\\\/:*?"<>|]/;

  const toggleDialog = () => {
    dispatch(toggleAddBookDialog());
    setError(null);
    setBookName("");
  };

  const handleAddBook = async () => {
    if (bookName.length <= 3) {
      setError("Book name must be longer than 3 characters!");
      return;
    } else if (invalidRegex.test(bookName)) {
      setError(
        `Invalid title. Please avoid using these characters: \ / : * ? " < > |`
      );
      return;
    } else {
      const response = await window.odysseyAPI.createBook(bookName);

      if (response.success) {
        dispatch(
          addBook({
            title: bookName,
            id: response.data.id,
            bookFolderPath: response.data.bookFolderPath,
          })
        );
        toggleDialog();
        showSnackbar("Book created!");
      } else {
        toggleDialog();
        showSnackbar("Something went wrong. Please try again.");
      }
    }
  };

  return { addBookDialogOpen, toggleDialog, error, handleAddBook, setBookName };
};
