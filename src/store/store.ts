import { configureStore } from '@reduxjs/toolkit';
import { substackApi } from '../api/substackApi';

export const createSubstackStore = (preloadedState = {}) => {
  return configureStore({
    reducer: {
      [substackApi.reducerPath]: substackApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(substackApi.middleware),
    preloadedState
  });
};

export type SubstackStore = ReturnType<typeof createSubstackStore>;
export type RootState = ReturnType<SubstackStore['getState']>;
export type AppDispatch = SubstackStore['dispatch'];
