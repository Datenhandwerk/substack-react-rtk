import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

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

export const substackApi = createApi({
  reducerPath: 'substackApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_SUBSTACK_API_URL || 'https://api.substackapi.dev',
    prepareHeaders: (headers) => {
      const apiKey = import.meta.env.VITE_SUBSTACK_API_KEY;
      if (apiKey) {
        headers.set('X-API-Key', apiKey);
      }
      return headers;
    }
  }),
  tagTypes: ['Post', 'LatestPosts', 'TopPosts', 'SearchPosts'],
  endpoints: (builder) => ({
    getPost: builder.query<Post, { publication_url: string; slug: string }>({
      query: ({ publication_url, slug}) => ({
        url: '/post',
        params: { publication_url, slug }
      }),
      providesTags: ['Post']
    }),
    getLatestPosts: builder.query<Post[], { publication_url: string, limit?: number, offset?: number }>({
      query: ({ publication_url, limit = 10, offset = 0 }) => ({
        url: '/posts/latest',
        params: {publication_url, limit, offset}
      }),
      providesTags: ['LatestPosts']
    }),
    getTopPosts: builder.query<Post[], { publication_url: string, limit?: number, offset?: number }>({
      query: ({ publication_url, limit = 10, offset = 0 }) => ({
        url: '/posts/top',
        params: {publication_url, limit, offset}
      }),
      providesTags: ['TopPosts']
    }),
    searchPosts: builder.query<Post[], { publication_url: string, query: string, limit?: number, offset?: number }>({
      query: ({ publication_url, query, limit = 10, offset = 0 }) => ({
        url: '/posts/search',
        params: {publication_url, query, limit, offset}
      }),
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
