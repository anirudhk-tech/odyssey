import { Book } from "@/app/types/book";
import { createSlice } from "@reduxjs/toolkit";

interface currentSlice {
  currentBookId: string | null;
}

const initialState: currentSlice = {
  currentBookId: null,
};

export const currentSlice = createSlice({
  name: "current",
  initialState,
  reducers: {
    setCurrentBookId: (state, action) => {
      state.currentBookId = action.payload;
    },
    resetCurrentBookId: (state) => {
      state.currentBookId = null;
    },
  },
});

export const { setCurrentBookId, resetCurrentBookId } = currentSlice.actions;
export default currentSlice.reducer;
