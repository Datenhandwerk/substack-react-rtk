import { configureStore } from '@reduxjs/toolkit';
import { substackApi } from '../api/substackApi';
import configReducer from './configSlice';

export const createSubstackStore = (preloadedState = {}) => {
  return configureStore({
    reducer: {
      [substackApi.reducerPath]: substackApi.reducer,
      config: configReducer
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(substackApi.middleware),
    preloadedState
  });
};

export type SubstackStore = ReturnType<typeof createSubstackStore>;
export type RootState = ReturnType<SubstackStore['getState']>;
export type AppDispatch = SubstackStore['dispatch'];
