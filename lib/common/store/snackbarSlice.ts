import { createSlice } from "@reduxjs/toolkit";

export interface SnackbarSlice {
  message: string | null;
}

const initialState: SnackbarSlice = {
  message: null,
};

export const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    clearMessage: (state) => {
      if (!state.message) return;
      state.message = null;
    },
  },
});

export const { setMessage, clearMessage } = snackbarSlice.actions;
export default snackbarSlice.reducer;
