import React from 'react';
import { useGetPostQuery, useGetLatestPostsQuery } from '../src/api/substackApi';

export const TestSubstack: React.FC = () => {

  // Test für einzelnen Post
  const { data: post, error: postError, isLoading: postLoading } = useGetPostQuery({
    publication_url: import.meta.env.VITE_SUBSTACK_PUBLICATION,
    slug: 'test-post'
  });

  // Test für Latest Posts
  const { data: posts, error: postsError, isLoading: postsLoading } = useGetLatestPostsQuery({
    publication_url: import.meta.env.VITE_SUBSTACK_PUBLICATION,
    offset: 0,
    limit: 5
  });

  return (
    <div style={{ padding: '20px' }}>
      <h1>Substack API Test</h1>
      
      <section>
        <h2>Single Post</h2>
        {postLoading && <p>Loading post...</p>}
        {postError && <p style={{ color: 'red' }}>Error: {JSON.stringify(postError)}</p>}
        {post && (
          <div>
            <h3>{post.title}</h3>
            <p>{post.description}</p>
            <p>Author: {post.author}</p>
            <p>Likes: {post.likes}</p>
          </div>
        )}
      </section>

      <section>
        <h2>Latest Posts</h2>
        {postsLoading && <p>Loading posts...</p>}
        {postsError && <p style={{ color: 'red' }}>Error: {JSON.stringify(postsError)}</p>}
        {posts && (
          <ul>
            {posts.length > 0 && (posts.map((p) => (
              <li key={p.slug}>
                <h4>{p.title}</h4>
                <p>{p.excerpt}</p>
              </li>
            )))}
          </ul>
        )}
      </section>
    </div>
  );
};
