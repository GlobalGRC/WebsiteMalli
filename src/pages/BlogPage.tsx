import React, { useState } from 'react';

interface BlogPost {
  id: number;
  title: string;
  date: string;
  content: string;
}

const initialPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Welcome to the SCIA Global Blog',
    date: '2024-05-01',
    content: 'This is the first post on our new blog! Stay tuned for updates on cybersecurity, compliance, and more.'
  },
  {
    id: 2,
    title: 'Cybersecurity Best Practices',
    date: '2024-05-10',
    content: 'Learn about the top cybersecurity best practices to keep your business safe in the digital age.'
  }
];

export const BlogPage: React.FC = () => {
  const [posts] = useState<BlogPost[]>(initialPosts);

  return (
    <div className="min-h-screen bg-white py-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl font-bold mb-8 text-center">Blog & Insights</h1>
        <div className="space-y-8">
          {posts.map(post => (
            <div key={post.id} className="bg-gray-50 rounded-xl shadow p-6">
              <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
              <p className="text-gray-500 text-sm mb-4">{post.date}</p>
              <p className="text-gray-700">{post.content.slice(0, 120)}{post.content.length > 120 ? '...' : ''}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}; 