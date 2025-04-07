import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { scenesDrawerSlice } from "./features/scenes/store/scenesDrawerSlice";
import { timelineDrawerSlice } from "./features/timeline/store/timelineDrawerSlice";
import { booksSlice } from "./features/books/store/booksSlice";
import { snackbarSlice } from "./common/store/snackbarSlice";
import { editorSlice } from "./features/editor/store/editorSlice";
import { scenesSlice } from "./features/scenes/store/scenesSlice";
import { currentSlice } from "./common/store/currentSlice";
import { timelineSlice } from "./features/timeline/store/timelineSlice";
import { timelineSectionsSlice } from "./features/timeline/store/timelineSectionsSlice";
import { dndBooksSlice } from "./features/books/store/dndBooksSlice";

const rootReducer = combineSlices(
  scenesDrawerSlice,
  timelineDrawerSlice,
  booksSlice,
  snackbarSlice,
  editorSlice,
  scenesSlice,
  currentSlice,
  timelineSlice,
  timelineSectionsSlice,
  dndBooksSlice
);

export type MainState = ReturnType<typeof rootReducer>;

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat();
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];
