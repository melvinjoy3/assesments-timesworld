import { configureStore } from "@reduxjs/toolkit";
import countriesReducer from "./countriesSlice";
import uiReducer from "./uiSlice";

export const store = configureStore({
  reducer: {
    countries: countriesReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
