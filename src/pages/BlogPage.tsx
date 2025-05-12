import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';

export const BlogPage: React.FC = () => {
  const { blogPosts } = useAdmin();
  const [selectedAuthor, setSelectedAuthor] = useState<any | null>(null);
  const [showModal, setShowModal] = useState(false);

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
              {post.image && (
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              )}
              <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
              <button
                className="text-gray-500 text-sm mb-2 flex items-center gap-2 hover:underline focus:outline-none"
                style={{ textAlign: 'left' }}
                onClick={() => {
                  // Try to find the author in localStorage allUsers
                  const allUsers = JSON.parse(localStorage.getItem('allUsers') || '[]');
                  const authorUser = allUsers.find((u: any) => u.role === post.author);
                  setSelectedAuthor(authorUser || {
                    username: post.author,
                    profilePhoto: post.authorProfilePhoto,
                    role: post.author
                  });
                  setShowModal(true);
                }}
              >
                {post.authorProfilePhoto && (
                  <img src={post.authorProfilePhoto} alt={post.author} className="w-6 h-6 rounded-full object-cover border" />
                )}
                {new Date(post.date).toLocaleDateString()} by {post.author.toUpperCase()}
                {post.author === 'admin' && (
                  <span className="ml-2 px-2 py-1 rounded-full text-xs bg-red-100 text-red-700 font-semibold">Admin</span>
                )}
                {post.author === 'dev' && (
                  <span className="ml-2 px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-700 font-semibold">Developer</span>
                )}
                {post.author === 'hr' && (
                  <span className="ml-2 px-2 py-1 rounded-full text-xs bg-green-100 text-green-700 font-semibold">HR</span>
                )}
              </button>
              <p className="text-gray-700 flex-grow">{post.content.slice(0, 120)}{post.content.length > 120 ? '...' : ''}</p>
            </div>
          ))}
        </div>
        {/* Author Profile Modal */}
        {showModal && selectedAuthor && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-xs w-full shadow-lg relative">
              <button
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl"
                onClick={() => setShowModal(false)}
                aria-label="Close"
              >
                ×
              </button>
              <div className="flex flex-col items-center gap-3">
                <img
                  src={selectedAuthor.profilePhoto || '/assets/default-profile.png'}
                  alt={selectedAuthor.username}
                  className="w-20 h-20 rounded-full object-cover border mb-2"
                />
                <div className="text-lg font-bold">{selectedAuthor.username || selectedAuthor.role}</div>
                <div className="flex items-center gap-2">
                  <div className="text-sm text-gray-500 capitalize">{selectedAuthor.role}</div>
                  {selectedAuthor.role === 'admin' && (
                    <span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-700 font-semibold">Admin</span>
                  )}
                  {selectedAuthor.role === 'dev' && (
                    <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-700 font-semibold">Developer</span>
                  )}
                  {selectedAuthor.role === 'hr' && (
                    <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-700 font-semibold">HR</span>
                  )}
                </div>
                {/* Add more info if available */}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}; 