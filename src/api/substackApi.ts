import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import type { RootState } from '../store/store';

export interface ImageVariants {
  original: string;
  small: string;
  medium: string;
  large: string;
}

export interface CoverImage extends ImageVariants {
  og: string;
}

export interface ColorPalette {
  vibrant: string;
  light_vibrant: string;
  dark_vibrant: string;
  muted: string;
  light_muted: string;
  dark_muted: string;
}


export interface Post {
  slug: string;
  url: string;
  title: string;
  description: string;
  excerpt: string;
  body_html: string;
  reading_time_minutes: number;
  audio_url: string;
  "date": string;
  "likes": number;
  "paywall": boolean;
  "cover_image": CoverImage,
  "cover_image_color_palette": ColorPalette,
  "author": string;
  "author_image": ImageVariants
}

interface SubstackApiResponse<T> {
  data: T;
  status: string;
  endpointName: string;
  requestId: string;
  startedTimeStamp: number;
  fulfilledTimeStamp: number;
}

const dynamicBaseQuery: BaseQueryFn = async (args, api, extraOptions) => {
  const state = api.getState() as RootState;
  const { apiUrl, apiKey } = state.config;

  const baseQuery = fetchBaseQuery({
    baseUrl: apiUrl || 'https://api.substackapi.dev',
    prepareHeaders: (headers) => {
      if (apiKey) {
        headers.set('X-API-Key', apiKey);
      }
      return headers;
    }
  });

  return baseQuery(args, api, extraOptions);
};


export const substackApi = createApi({
  reducerPath: 'substackApi',
  baseQuery: dynamicBaseQuery,
  tagTypes: ['Post', 'LatestPosts', 'TopPosts', 'SearchPosts'],
  endpoints: (builder) => ({
    getPost: builder.query<Post, { publication_url: string; slug: string }>({
      query: ({ publication_url, slug}) => ({
        url: '/post',
        params: { publication_url, slug }
      }),
      transformResponse: (response: SubstackApiResponse<Post>) => response.data,
      providesTags: ['Post']
    }),
    getLatestPosts: builder.query<Post[], { publication_url: string, limit?: number, offset?: number }>({
      query: ({ publication_url, limit = 10, offset = 0 }) => ({
        url: '/posts/latest',
        params: {publication_url, limit, offset}
      }),
      transformResponse: (response: SubstackApiResponse<Post[]>) => response.data,
      providesTags: ['LatestPosts']
    }),
    getTopPosts: builder.query<Post[], { publication_url: string, limit?: number, offset?: number }>({
      query: ({ publication_url, limit = 10, offset = 0 }) => ({
        url: '/posts/top',
        params: {publication_url, limit, offset}
      }),
      transformResponse: (response: SubstackApiResponse<Post[]>) => response.data,
      providesTags: ['TopPosts']
    }),
    searchPosts: builder.query<Post[], { publication_url: string, query: string, limit?: number, offset?: number }>({
      query: ({ publication_url, query, limit = 10, offset = 0 }) => ({
        url: '/posts/search',
        params: {publication_url, query, limit, offset}
      }),
      transformResponse: (response: SubstackApiResponse<Post[]>) => response.data,
      providesTags: ['SearchPosts']
    })
  })
});

export const {
  useGetPostQuery,
  useGetLatestPostsQuery,
  useGetTopPostsQuery,
  useSearchPostsQuery
} = substackApi;
