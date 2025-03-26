import { Book } from "@/app/types/book";
import { createSlice } from "@reduxjs/toolkit";

export interface BooksSlice {
  books: Book[] | null;
  addBookDialogOpen: boolean;
  deleteBookConfirmDialogOpen: boolean;
  renameBookDialogOpen: boolean;
  bookToBeEdited: Book | null;
}

const initialState: BooksSlice = {
  books: null,
  addBookDialogOpen: false,
  deleteBookConfirmDialogOpen: false,
  renameBookDialogOpen: false,
  bookToBeEdited: null,
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
      state.books = state.books.filter((book) => book.id !== action.payload);
    },
    setBookToBeEdited: (state, action) => {
      state.bookToBeEdited = action.payload;
    },
    clearBookToBeEdited: (state) => {
      state.bookToBeEdited = null;
    },
    renameBook: (state, action) => {
      if (!state.books) return;
      state.books = state.books.map((book) => {
        if (book.id === action.payload.id) {
          return {
            title: action.payload.title,
            id: book.id,
            bookFolderPath: book.bookFolderPath,
          };
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
  setBookToBeEdited,
  clearBookToBeEdited,
  renameBook,
  toggleRenameBookDialog,
} = booksSlice.actions;
export default booksSlice.reducer;
