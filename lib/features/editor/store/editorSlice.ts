import { createSlice } from "@reduxjs/toolkit";

export interface EditorSlice {
  editorWidth: number;
  editorSaving: boolean;
}

const initialState: EditorSlice = {
  editorWidth: window ? window.innerWidth : 2000,
  editorSaving: false,
};

export const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    setEditorWidth: (state, action) => {
      state.editorWidth = action.payload;
    },
    toggleEditorSaving: (state, action) => {
      state.editorSaving = action.payload;
    },
  },
});

export const { setEditorWidth, toggleEditorSaving } = editorSlice.actions;
export default editorSlice.reducer;
