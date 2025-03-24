import { Book } from "@/app/types/book";
import { createSlice } from "@reduxjs/toolkit";

export interface BooksSlice {
  books: Book[] | null;
  addBookDialogOpen: boolean;
  deleteBookConfirmDialogOpen: boolean;
  renameBookDialogOpen: boolean;
  bookToBeDeleted: Book | null;
  bookToBeRenamed: Book | null;
}

const initialState: BooksSlice = {
  books: null,
  addBookDialogOpen: false,
  deleteBookConfirmDialogOpen: false,
  renameBookDialogOpen: false,
  bookToBeDeleted: null,
  bookToBeRenamed: null,
};

export const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    addBook: (state, action) => {
      if (!state.books) return;
      state.books.push(action.payload);
    },
    emptyBooks: (state) => {
      state.books = null;
    },
    setBooks: (state, action) => {
      state.books = action.payload;
    },
    toggleAddBookDialog: (state) => {
      state.addBookDialogOpen = !state.addBookDialogOpen;
    },
    toggleDeleteBookConfirmDialog: (state) => {
      state.deleteBookConfirmDialogOpen = !state.deleteBookConfirmDialogOpen;
    },
    deleteBook: (state, action) => {
      if (!state.books) return;
      state.books = state.books.filter((book) => book.uuid !== action.payload);
    },
    setBookToBeDeleted: (state, action) => {
      state.bookToBeDeleted = action.payload;
    },
    clearBookToBeDeleted: (state) => {
      state.bookToBeDeleted = null;
    },
    setBookToBeRenamed: (state, action) => {
      state.bookToBeRenamed = action.payload;
    },
    clearBookToBeRenamed: (state) => {
      state.bookToBeRenamed = null;
    },
    renameBook: (state, action) => {
      if (!state.books) return;
      state.books = state.books.map((book) => {
        if (book.uuid === action.payload.uuid) {
          return { title: action.payload.title, uuid: book.uuid };
        }
        return book;
      });
    },
    toggleRenameBookDialog: (state) => {
      state.renameBookDialogOpen = !state.renameBookDialogOpen;
    },
  },
});

export const {
  addBook,
  emptyBooks,
  setBooks,
  toggleAddBookDialog,
  toggleDeleteBookConfirmDialog,
  deleteBook,
  setBookToBeDeleted,
  clearBookToBeDeleted,
  setBookToBeRenamed,
  clearBookToBeRenamed,
  renameBook,
  toggleRenameBookDialog,
} = booksSlice.actions;
export default booksSlice.reducer;
