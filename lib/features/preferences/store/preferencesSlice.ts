import { Preferences } from "@/app/types/preferences";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface PreferencesSlice {
  preferences: Preferences;
}

const initialState: PreferencesSlice = {
  preferences: {
    showWordCount: true,
    fillSceneBoxesColor: false,
  },
};

export const preferencesSlice = createSlice({
  name: "preferences",
  initialState,
  reducers: {
    setPreferences: (state, action) => {
      state.preferences = action.payload;
    },
    updatePreference: (
      state,
      action: PayloadAction<{
        key: keyof Preferences;
        value: Preferences[keyof Preferences];
      }>
    ) => {
      if (!action.payload || !state.preferences) return;
      const { key, value } = action.payload;
      state.preferences[key] = value;
    },
  },
});

export const { updatePreference, setPreferences } = preferencesSlice.actions;
export default preferencesSlice.reducer;
