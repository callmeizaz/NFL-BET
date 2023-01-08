import { configureStore } from "@reduxjs/toolkit";
import { APP_ENV } from "../constants/config";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import * as Sentry from "@sentry/react";
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import loggerMiddleware from "./middleware/logger";
import persistedRootReducer from "./reducers";

let enhancers:any[] = [];

if (APP_ENV !== "development") {
  const sentryReduxEnhancer = Sentry.createReduxEnhancer({
    // Optionally pass options listed below
  });

  enhancers = [sentryReduxEnhancer];
}

export type RootState = ReturnType<typeof persistedRootReducer>;

const store = configureStore({
  reducer: persistedRootReducer,
  enhancers: enhancers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(loggerMiddleware),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
