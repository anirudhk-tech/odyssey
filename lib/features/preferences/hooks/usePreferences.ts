import { Preferences } from "@/app/types/preferences";
import {
  setPreferences,
  updatePreference,
} from "@/lib/features/preferences/store/preferencesSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const usePreferences = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    window.odysseyAPI.getPreferences().then((prefs) => {
      dispatch(setPreferences(prefs.data));
    });

    const handler = (change: {
      key: keyof Preferences;
      value: Preferences[keyof Preferences];
    }) => {
      dispatch(updatePreference(change));
    };
    window.odysseyAPI.onPreferenceChanged(handler);
  }, [dispatch]);
};
