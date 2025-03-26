import { useDispatch, useSelector } from "react-redux";
import {
  clearBookToBeEdited,
  deleteBook,
  toggleDeleteBookConfirmDialog,
} from "../store/booksSlice";
import { useSnackbar } from "@/lib/common/hooks/useSnackbar";
import { MainState } from "@/lib/store";

export const useDeleteBook = () => {
  const dispatch = useDispatch();
  const { showSnackbar } = useSnackbar();
  const bookToBeEdited = useSelector(
    (state: MainState) => state.books.bookToBeEdited
  );
  const deleteBookConfirmDialogOpen = useSelector(
    (state: MainState) => state.books.deleteBookConfirmDialogOpen
  );

  const handleDeleteBook = async () => {
    if (!bookToBeEdited) return;
    const response = await window.odysseyAPI.deleteBook(bookToBeEdited.id);

    if (response.success) {
      dispatch(deleteBook(bookToBeEdited.id));
      showSnackbar("Book deleted!");
    } else {
      showSnackbar("Something went wrong. Please try again.");
    }
    dispatch(toggleDeleteBookConfirmDialog());
    dispatch(clearBookToBeEdited());
  };

  const handleCancel = () => {
    dispatch(clearBookToBeEdited());
    dispatch(toggleDeleteBookConfirmDialog());
  };

  const toggleDialog = () => {
    dispatch(toggleDeleteBookConfirmDialog());
  };

  return {
    handleDeleteBook,
    handleCancel,
    toggleDialog,
    deleteBookConfirmDialogOpen,
  };
};
