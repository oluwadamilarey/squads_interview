import { configureStore } from "@reduxjs/toolkit";
import { squadsApi } from "../services/api";
import uiReducer from "./slices/uiSlice";

// Configure Redux store with RTK Query and UI slice
export const store = configureStore({
  reducer: {
    [squadsApi.reducerPath]: squadsApi.reducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types from serializability checks
        ignoredActions: [squadsApi.util.resetApiState.type],
        // Ignore these field paths in all actions
        ignoredActionsPaths: ["meta.arg", "payload.timestamp"],
        // Ignore these paths in the state
        ignoredPaths: [squadsApi.reducerPath],
      },
    }).concat(squadsApi.middleware),
  // Enable Redux DevTools in development
  devTools: process.env.NODE_ENV !== "production",
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
