import { useDispatch, useSelector } from "react-redux";
import {
  clearBookToBeDeleted,
  deleteBook,
  setBookToBeDeleted,
  toggleDeleteBookConfirmDialog,
} from "../store/booksSlice";
import { useSnackbar } from "@/lib/common/hooks/useSnackbar";
import { MainState } from "@/lib/store";

export const useDeleteBook = () => {
  const dispatch = useDispatch();
  const { showSnackbar } = useSnackbar();
  const bookToBeDeleted = useSelector(
    (state: MainState) => state.books.bookToBeDeleted
  );
  const deleteBookConfirmDialogOpen = useSelector(
    (state: MainState) => state.books.deleteBookConfirmDialogOpen
  );

  const handleDeleteBook = async () => {
    if (!bookToBeDeleted) return;
    const response = await window.odysseyAPI.deleteBook(bookToBeDeleted.id);

    if (response.success) {
      dispatch(deleteBook(bookToBeDeleted.id));
      showSnackbar("Book deleted!");
      dispatch(toggleDeleteBookConfirmDialog());
    } else {
      showSnackbar("Something went wrong. Please try again.");
    }
    dispatch(clearBookToBeDeleted());
  };

  const handleCancel = () => {
    dispatch(clearBookToBeDeleted());
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
