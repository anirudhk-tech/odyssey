import { Book } from "@/app/types/book";
import { createSlice } from "@reduxjs/toolkit";

export interface BooksSlice {
  books: Book[] | null;
  addBookDialogOpen: boolean;
}

const initialState: BooksSlice = {
  books: null,
  addBookDialogOpen: false,
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
  },
});

export const { addBook, emptyBooks, setBooks, toggleAddBookDialog } =
  booksSlice.actions;
export default booksSlice.reducer;
