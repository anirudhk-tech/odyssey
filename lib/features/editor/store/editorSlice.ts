import { createSlice } from "@reduxjs/toolkit";
import { EditorState } from "draft-js";

export interface EditorSlice {
  editorState: EditorState | null;
}

const initialState: EditorSlice = {
  editorState: null,
};

export const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    setEditorState: (state, action) => {
      state.editorState = action.payload;
    },
  },
});

export const { setEditorState } = editorSlice.actions;
export default editorSlice.reducer;
