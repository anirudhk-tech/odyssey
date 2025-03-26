import { createSlice } from "@reduxjs/toolkit";

export interface EditorSlice {}

const initialState: EditorSlice = {};

export const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {},
});

export const {} = editorSlice.actions;
export default editorSlice.reducer;
