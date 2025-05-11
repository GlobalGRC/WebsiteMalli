import React from 'react';
import { useAdmin } from '../context/AdminContext';

export const BlogPage: React.FC = () => {
  const { blogPosts } = useAdmin();

  return (
    <div className="min-h-screen bg-white py-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl font-bold mb-8 text-center mt-24">Blog & Insights</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogPosts.length === 0 && (
            <div className="col-span-2 text-center text-gray-500">No blog posts yet.</div>
          )}
          {blogPosts.map(post => (
            <div key={post.id} className="bg-gray-50 rounded-xl shadow p-6 flex flex-col h-full">
              <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
              <p className="text-gray-500 text-sm mb-2">{new Date(post.date).toLocaleDateString()} by {post.author.toUpperCase()}</p>
              <p className="text-gray-700 flex-grow">{post.content.slice(0, 120)}{post.content.length > 120 ? '...' : ''}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}; 