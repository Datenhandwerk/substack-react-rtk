```markdown
# DHWK Substack React

A modern React library for Substack API integration with Redux Toolkit Query.

## ✨ Features

- 🚀 **RTK Query Integration** - Automatic caching and state management
- 📦 **TypeScript Support** - Full type definitions included
- ⚡ **React Hooks** - Simple API integration with hooks
- 🔄 **Automatic Refetching** - Smart cache invalidation
- 🎯 **Tree-shakeable** - Optimized bundle size
- ⚙️ **Runtime Configuration** - Configure via props, not environment variables

## 📦 Installation

```bash
# With Yarn
yarn add @datenhandwerk/substack-react-rtk

# With npm
npm install @datenhandwerk/substack-react-rtk
```
```


### Peer Dependencies

Make sure you have the following packages installed:

```shell script
yarn add react react-dom react-redux @reduxjs/toolkit
```


## 🚀 Quick Start

### 1. Setup Provider

Wrap your app with the `SubstackProvider` and pass your configuration:

```typescript
import React from 'react';
import ReactDOM from 'react-dom/client';
import { SubstackProvider } from '@datenhandwerk/substack-react-rtk';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SubstackProvider
      apiKey="your-api-key-here"
      apiUrl="https://api.substackapi.dev"
      publicationUrl="example.substack.com"
    >
      <App />
    </SubstackProvider>
  </React.StrictMode>
);
```


**Important:** Configuration is passed via **props at runtime**, not via environment variables. This ensures the library works correctly when published to npm.

### 2. Using Environment Variables (Optional)

If you want to use environment variables in your consuming app:

```typescript
<SubstackProvider
  apiKey={import.meta.env.VITE_SUBSTACK_API_KEY}
  apiUrl={import.meta.env.VITE_SUBSTACK_API_URL}
  publicationUrl={import.meta.env.VITE_SUBSTACK_PUBLICATION}
>
  <App />
</SubstackProvider>
```


Create a `.env` file in your project:

```
VITE_SUBSTACK_API_KEY=your-api-key-here
VITE_SUBSTACK_API_URL=https://api.substackapi.dev
VITE_SUBSTACK_PUBLICATION=example.substack.com
```


### 3. Use Hooks

```typescript
import React from 'react';
import { useGetLatestPostsQuery } from '@datenhandwerk/substack-react-rtk';

export const BlogPosts: React.FC = () => {
  const { data, isLoading, error } = useGetLatestPostsQuery({
    publication_url: 'example.substack.com',
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

### SubstackProvider

The main provider component that configures the library.

```typescript
interface SubstackProviderProps {
  children: React.ReactNode;
  apiKey?: string;          // Your Substack API key
  apiUrl?: string;          // API base URL (default: 'https://api.substackapi.dev')
  publicationUrl?: string;  // Your default publication URL
}
```


**Example:**

```typescript
<SubstackProvider
  apiKey="sk_live_..."
  apiUrl="https://api.substackapi.dev"
  publicationUrl="myblog.substack.com"
>
  <App />
</SubstackProvider>
```


### Hooks

#### `useGetPostQuery`

Fetches a single post.

```typescript
const { data, isLoading, error } = useGetPostQuery({
  publication_url: 'example.substack.com',
  slug: 'my-post-slug'
});
```


**Parameters:**
- `publication_url` (string, required) - The Substack publication URL
- `slug` (string, required) - The post slug

**Returns:** `Post` object

#### `useGetLatestPostsQuery`

Fetches the latest posts.

```typescript
const { data, isLoading, error } = useGetLatestPostsQuery({
  publication_url: 'example.substack.com',
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

```typescript
const { data, isLoading, error } = useGetTopPostsQuery({
  publication_url: 'example.substack.com',
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

```typescript
const { data, isLoading, error } = useSearchPostsQuery({
  publication_url: 'example.substack.com',
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
import { useGetLatestPostsQuery } from '@datenhandwerk/substack-react-rtk';

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
import { useSearchPostsQuery } from '@datenhandwerk/substack-react-rtk';

export const SearchPosts: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedTerm(searchTerm), 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const { data, isLoading } = useSearchPostsQuery(
    {
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
import { useGetPostQuery } from '@datenhandwerk/substack-react-rtk';

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


## 🔧 Configuration

### Runtime Configuration vs Environment Variables

**Important:** This library uses **runtime configuration** via props, not build-time environment variables.

❌ **This won't work** (environment variables are embedded at build-time of the library):
```typescript
// Inside the library - this doesn't work for published packages
const apiKey = import.meta.env.VITE_SUBSTACK_API_KEY;
```


✅ **This works** (configuration passed at runtime):
```typescript
// In your consuming app
<SubstackProvider apiKey="your-key">
  <App />
</SubstackProvider>
```


### Why Runtime Configuration?

When you publish a library to npm, it's built once. Environment variables like `import.meta.env` are replaced with their values at **build time** of the library, not the consuming application. By using runtime configuration via props, each application can provide its own configuration.

### Dynamic Configuration

You can change configuration at runtime by remounting the provider with new props:

```typescript
const [apiKey, setApiKey] = useState('initial-key');

<SubstackProvider apiKey={apiKey}>
  <App />
</SubstackProvider>

// Later: setApiKey('new-key') will recreate the store with new config
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
@datenhandwerk/substack-react-rtk/
├── src/
│   ├── api/
│   │   └── substackApi.ts      # API definitions
│   ├── store/
│   │   ├── store.ts            # Redux store configuration
│   │   └── configSlice.ts      # Configuration slice
│   ├── components/
│   │   └── SubstackProvider.tsx # Provider component
│   └── index.ts                # Public exports
├── dev/                        # Development/testing
│   ├── main.tsx
│   ├── App.tsx
│   └── index.html
└── dist/                       # Build output
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

If you find a bug or have a feature request, please open an issue on [GitHub](https://github.com/datenhandwerk/substack-react-rtk/issues).

## 🔗 Links

- [Substack API Documentation](https://substackapi.dev)
- [Redux Toolkit Query](https://redux-toolkit.js.org/rtk-query/overview)
- [React Documentation](https://react.dev)

## 📊 Package Info

![npm version](https://img.shields.io/npm/v/@datenhandwerk/substack-react-rtk)
![license](https://img.shields.io/npm/l/@datenhandwerk/substack-react-rtk)

---

Made with ❤️ by DHWK
