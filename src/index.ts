// API
export {
  substackApi,
  useGetPostQuery,
  useGetLatestPostsQuery,
  useGetTopPostsQuery,
  useSearchPostsQuery
} from './api/substackApi';

export type {
  Post,
  ImageVariants,
  CoverImage,
  ColorPalette
} from './api/substackApi';

// Store
export { createSubstackStore } from './store/store';
export type { SubstackStore, RootState, AppDispatch } from './store/store';

// Components
export { SubstackProvider } from './components/SubstackProvider';
export type { SubstackProviderProps } from './components/SubstackProvider';

export { setConfig } from './store/configSlice';
export type { ApiConfigState } from './store/configSlice';
