
# DHWK Substack React

A modern React library for Substack API integration with Redux Toolkit Query.

## ✨ Features

- 🚀 **RTK Query Integration** - Automatic caching and state management
- 📦 **TypeScript Support** - Full type definitions included
- ⚡ **React Hooks** - Simple API integration with hooks
- 🔄 **Automatic Refetching** - Smart cache invalidation
- 🎯 **Tree-shakeable** - Optimized bundle size

## 📦 Installation
``` bash

# With Yarn
yarn add @datenhandwerk/substack-react-rtk

# With npm
npm install @datenhandwerk/substack-react-rtk
```
### Peer Dependencies

Make sure you have the following packages installed:
``` bash
  yarn add react react-dom react-redux @reduxjs/toolkit
```
## 🚀 Quick Start

### 1. Setup Provider

Wrap your app with the `SubstackProvider`:
``` typescript
import React from 'react';
import ReactDOM from 'react-dom/client';
import { SubstackProvider } from '@datenhandwerk/substack-react-rtk';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SubstackProvider>
      <App />
    </SubstackProvider>
  </React.StrictMode>
);
```
### 2. Configure Environment Variables

Create a `.env` file:
``` env
VITE_SUBSTACK_API_URL=https://api.substackapi.dev
VITE_SUBSTACK_API_KEY=your-api-key-here
VITE_SUBSTACK_PUBLICATION=publication_url (e.g. example.substack.com)
```
### 3. Use Hooks
``` typescript
import React from 'react';
import { useGetLatestPostsQuery } from '@datenhandwerk/substack-react-rtk';

export const BlogPosts: React.FC = () => {
const { data, isLoading, error } = useGetLatestPostsQuery({
    publication_url: 'example.substack.com', // or use import.meta.env.VITE_SUBSTACK_PUBLICATION
    limit: 10
});

if (isLoading) return <div>Loading...</div>;
if (error) return <div>Error loading posts</div>;

return (
    <div>
        {data?.map((post) => (
            <article key={post.slug}>
                <h2>{post.title}</h2>
                <p>{post.excerpt}</p>
            </article>
        ))}
    </div>
);
};
```
## 📚 API Reference

### Hooks

#### `useGetPostQuery`

Fetches a single post.
``` typescript
const { data, isLoading, error } = useGetPostQuery({
    publication_url: 'example.substack.com', // or use import.meta.env.VITE_SUBSTACK_PUBLICATION
    slug: 'my-post-slug'
});
```
**Parameters:**
- `publication_url` (string, required) - The Substack publication URL
- `slug` (string, required) - The post slug

**Returns:** `Post` object

#### `useGetLatestPostsQuery`

Fetches the latest posts.
``` typescript
const { data, isLoading, error } = useGetLatestPostsQuery({
    publication_url: 'example.substack.com',  // or use import.meta.env.VITE_SUBSTACK_PUBLICATION
    limit: 10,
    offset: 0
});
```
**Parameters:**
- `publication_url` (string, required) - The Substack publication URL
- `limit` (number, optional, default: 10) - Number of posts to fetch
- `offset` (number, optional, default: 0) - Offset for pagination

**Returns:** Array of `Post` objects

#### `useGetTopPostsQuery`

Fetches the most popular posts.
``` typescript
const { data, isLoading, error } = useGetTopPostsQuery({
    publication_url: 'example.substack.com', // or use import.meta.env.VITE_SUBSTACK_PUBLICATION
    limit: 10,
    offset: 0
});
```
**Parameters:**
- `publication_url` (string, required) - The Substack publication URL
- `limit` (number, optional, default: 10) - Number of posts to fetch
- `offset` (number, optional, default: 0) - Offset for pagination

**Returns:** Array of `Post` objects

#### `useSearchPostsQuery`

Searches through posts.
```
typescript
const { data, isLoading, error } = useSearchPostsQuery({
    publication_url: 'example.substack.com', // or use import.meta.env.VITE_SUBSTACK_PUBLICATION
    query: 'react',
    limit: 10,
    offset: 0
});
```
**Parameters:**
- `publication_url` (string, required) - The Substack publication URL
- `query` (string, required) - Search term
- `limit` (number, optional, default: 10) - Number of posts to fetch
- `offset` (number, optional, default: 0) - Offset for pagination

**Returns:** Array of `Post` objects

### Types

#### `Post`
```typescript
interface Post {
  slug: string;
  url: string;
  title: string;
  description: string;
  excerpt: string;
  body_html: string;
  reading_time_minutes: number;
  audio_url: string;
  date: string;
  likes: number;
  paywall: boolean;
  cover_image: CoverImage;
  cover_image_color_palette: ColorPalette;
  author: string;
  author_image: ImageVariants;
}
```
#### `CoverImage`
```typescript
interface CoverImage {
  original: string;
  og: string;
  small: string;
  medium: string;
  large: string;
}
```
#### `ColorPalette`
```typescript
interface ColorPalette {
  vibrant: string;
  light_vibrant: string;
  dark_vibrant: string;
  muted: string;
  light_muted: string;
  dark_muted: string;
}
```
#### `ImageVariants`
```typescript
interface ImageVariants {
  original: string;
  small: string;
  medium: string;
  large: string;
}
```
## 🎨 Examples

### Pagination
```typescript
import { useState } from 'react';
import { useGetLatestPostsQuery } from 'substack-react-rtk';

export const PaginatedPosts: React.FC = () => {
  const [page, setPage] = useState(0);
  const limit = 5;

  const { data, isLoading } = useGetLatestPostsQuery({
    publication_url: 'example.substack.com',
    limit,
    offset: page * limit
  });

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      
      {data?.map(post => (
        <article key={post.slug}>
          <h3>{post.title}</h3>
          <p>{post.excerpt}</p>
        </article>
      ))}
      
      <div>
        <button 
          onClick={() => setPage(p => Math.max(0, p - 1))}
          disabled={page === 0}
        >
          Previous
        </button>
        <span>Page {page + 1}</span>
        <button onClick={() => setPage(p => p + 1)}>
          Next
        </button>
      </div>
    </div>
  );
};
```
### Search with Debouncing
```typescript
import { useState, useEffect } from 'react';
import { useSearchPostsQuery } from 'substack-react-rtk';

export const SearchPosts: React.FC = () => {
const [searchTerm, setSearchTerm] = useState('');
const [debouncedTerm, setDebouncedTerm] = useState('');

useEffect(() => {
  const timer = setTimeout(() => setDebouncedTerm(searchTerm), 500);
  return () => clearTimeout(timer);
}, [searchTerm]);

const { data, isLoading } = useSearchPostsQuery({
    publication_url: 'example.substack.com',
    query: debouncedTerm
  },
  { skip: !debouncedTerm }
);

return (
  <div>
  <input 
    type="text"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    placeholder="Search posts..."
  />

      {isLoading && <p>Searching...</p>}
      
      {data?.map(post => (
        <article key={post.slug}>
          <h3>{post.title}</h3>
          <p>{post.excerpt}</p>
        </article>
      ))}
    </div>
  );
};
```
### Display Post with Cover Image

```typescript
import { useGetPostQuery } from 'substack-react-rtk';

export const PostDetail: React.FC<{ slug: string }> = ({ slug }) => {
  const { data: post, isLoading, error } = useGetPostQuery({
    publication_url: 'example.substack.com',
    slug
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading post</div>;
  if (!post) return <div>Post not found</div>;

  return (
    <article>
      {post.cover_image && (
        <img 
          src={post.cover_image.large} 
          alt={post.title}
          style={{ width: '100%' }}
        />
      )}
      
      <h1>{post.title}</h1>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <img 
          src={post.author_image.small} 
          alt={post.author}
          style={{ borderRadius: '50%', width: '40px' }}
        />
        <div>
          <strong>{post.author}</strong>
          <p>{new Date(post.date).toLocaleDateString()}</p>
        </div>
      </div>
      
      <p>{post.description}</p>
      
      <div dangerouslySetInnerHTML={{ __html: post.body_html }} />
      
      <p>❤️ {post.likes} likes • ⏱️ {post.reading_time_minutes} min read</p>
    </article>
  );
};
```
```


## 🛠️ Development
```shell script
# Install dependencies
yarn install

# Start development server
yarn dev

# Build library
yarn build

# Preview build
yarn preview
```


### Project Structure

```
substack-react-rtk/
├── src/
│   ├── api/
│   │   └── substackApi.ts      # API definitions
│   ├── store/
│   │   └── store.ts            # Redux store configuration
│   ├── components/
│   │   └── SubstackProvider.tsx # Provider component
│   └── index.ts                # Public exports
├── dev/                        # Development/testing
│   ├── main.tsx
│   ├── App.tsx
│   └── index.html
└── dist/                       # Build output
```


## 🔧 Configuration

### Custom API URL

You can override the API URL via environment variables or by passing it to the provider:

```typescript
<SubstackProvider apiUrl="https://custom-api.example.com">
  <App />
</SubstackProvider>
```


### TypeScript Configuration

The library includes full TypeScript definitions. For better IDE support, add this to your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "types": ["vite/client"]
  }
}
```


## 📄 License

MIT © DHWK

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🐛 Issues

If you find a bug or have a feature request, please open an issue on [GitHub](https://github.com/your-username/substack-react-rtk/issues).

## 🔗 Links

- [Substack API Documentation](https://substackapi.dev)
- [Redux Toolkit Query](https://redux-toolkit.js.org/rtk-query/overview)
- [React Documentation](https://react.dev)

## 📊 Status

![npm version](https://img.shields.io/npm/v/substack-react-rtk)
![license](https://img.shields.io/npm/l/substack-react-rtk)

---

Made with ❤️ by dhwk
