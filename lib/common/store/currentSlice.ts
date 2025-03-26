import { createSlice } from "@reduxjs/toolkit";

interface currentSlice {
  currentBookId: string | null;
  currentSceneId: string | null;
}

const initialState: currentSlice = {
  currentBookId: null,
  currentSceneId: null,
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
    setCurrentSceneId: (state, action) => {
      state.currentSceneId = action.payload;
    },
    resetCurrentSceneId: (state) => {
      state.currentSceneId = null;
    },
  },
});

export const {
  setCurrentBookId,
  resetCurrentBookId,
  setCurrentSceneId,
  resetCurrentSceneId,
} = currentSlice.actions;
export default currentSlice.reducer;
