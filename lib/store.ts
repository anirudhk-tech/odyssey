import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { scenesDrawerSlice } from "./features/scenes/store/scenesDrawerSlice";
import { timelineDrawerSlice } from "./features/timeline/store/timelineDrawerSlice";
import { booksSlice } from "./features/books/store/booksSlice";
import { snackbarSlice } from "./common/store/snackbarSlice";
import { editorSlice } from "./features/editor/store/editorSlice";
import { scenesSlice } from "./features/scenes/store/scenesSlice";
import { currentSlice } from "./common/store/currentSlice";

// `combineSlices` automatically combines the reducers using
// their `reducerPath`s, therefore we no longer need to call `combineReducers`.
const rootReducer = combineSlices(
  scenesDrawerSlice,
  timelineDrawerSlice,
  booksSlice,
  snackbarSlice,
  editorSlice,
  scenesSlice,
  currentSlice
);

// Infer the `RootState` type from the root reducer
export type MainState = ReturnType<typeof rootReducer>;

// `makeStore` encapsulates the store configuration to allow
// creating unique store instances, which is particularly important for
// server-side rendering (SSR) scenarios. In SSR, separate store instances
// are needed for each request to prevent cross-request state pollution.
export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,

    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat();
    },
  });
};

// Infer the return type of `makeStore`
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore["dispatch"];
