import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, Briefcase, Star, LogOut } from 'lucide-react';
import { useAdmin, JobOpening, Testimonial, BlogPost } from '../context/AdminContext';

// Define types
type User = {
  username: string;
  role: 'admin' | 'dev' | 'hr';
};

export const AdminPanel: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<'jobs' | 'testimonials' | 'users' | 'blog'>('jobs');

  const { jobs, testimonials, blogPosts, addBlogPost, updateBlogPost, deleteBlogPost } = useAdmin();

  // Analytics
  const totalJobs = jobs.length;
  const openJobs = jobs.filter(job => job.status === 'open').length;
  const totalTestimonials = testimonials.length;

  // Recent Activity (last 3 jobs and testimonials by createdAt/id)
  const recentJobs = [...jobs]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);
  const recentTestimonials = [...testimonials]
    .sort((a, b) => Number(b.id) - Number(a.id))
    .slice(0, 3);

  // Check authentication on component mount
  useEffect(() => {
    const userData = localStorage.getItem('adminUser');
    if (!userData) {
      navigate('/admin/login');
      return;
    }

    try {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
    } catch (error) {
      console.error('Error parsing user data:', error);
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminUser');
    navigate('/admin/login');
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">
              Welcome, {user.username} ({user.role})
            </span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-red-600 hover:text-red-700"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Analytics Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <span className="text-3xl font-bold text-[#E60028]">{totalJobs}</span>
            <span className="text-gray-600 mt-2">Total Jobs</span>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <span className="text-3xl font-bold text-green-600">{openJobs}</span>
            <span className="text-gray-600 mt-2">Open Jobs</span>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <span className="text-3xl font-bold text-[#E60028]">{totalTestimonials}</span>
            <span className="text-gray-600 mt-2">Total Testimonials</span>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <span className="font-semibold text-gray-700">Recent Activity</span>
            <div className="mt-2">
              <span className="text-sm font-bold text-gray-500">Jobs:</span>
              <ul className="text-xs text-gray-600 list-disc ml-4">
                {recentJobs.map(job => (
                  <li key={job.id}>{job.title} ({job.status})</li>
                ))}
              </ul>
              <span className="text-sm font-bold text-gray-500 mt-2 block">Testimonials:</span>
              <ul className="text-xs text-gray-600 list-disc ml-4">
                {recentTestimonials.map(t => (
                  <li key={t.id}>{t.name} ({t.rating}★)</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('jobs')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              activeTab === 'jobs' ? 'bg-[#E60028] text-white' : 'bg-white text-gray-600'
            }`}
          >
            <Briefcase className="w-5 h-5" />
            Job Openings
          </button>
          <button
            onClick={() => setActiveTab('testimonials')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              activeTab === 'testimonials' ? 'bg-[#E60028] text-white' : 'bg-white text-gray-600'
            }`}
          >
            <Star className="w-5 h-5" />
            Testimonials
          </button>
          {user.role === 'admin' && (
            <button
              onClick={() => setActiveTab('users')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                activeTab === 'users' ? 'bg-[#E60028] text-white' : 'bg-white text-gray-600'
              }`}
            >
              <Users className="w-5 h-5" />
              User Management
            </button>
          )}
          <button
            onClick={() => setActiveTab('blog')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              activeTab === 'blog' ? 'bg-[#E60028] text-white' : 'bg-white text-gray-600'
            }`}
          >
            <Star className="w-5 h-5" />
            Blog Posts
          </button>
        </div>

        {/* Content Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-lg p-6"
        >
          {activeTab === 'jobs' && <JobOpeningsManager />}
          {activeTab === 'testimonials' && <TestimonialsManager />}
          {activeTab === 'users' && user.role === 'admin' && <UserManager />}
          {activeTab === 'blog' && <BlogPostsManager user={user} />}
        </motion.div>
      </div>
    </div>
  );
};

// Job Openings Manager Component
const JobOpeningsManager: React.FC = () => {
  const { jobs, addJob, updateJob, deleteJob } = useAdmin();
  const [isAdding, setIsAdding] = useState(false);
  const [editingJob, setEditingJob] = useState<JobOpening | null>(null);
  const [newJob, setNewJob] = useState<Partial<JobOpening>>({
    title: '',
    department: '',
    location: '',
    description: '',
    requirements: [],
    status: 'open'
  });

  const handleAddJob = () => {
    if (newJob.title && newJob.department && newJob.location && newJob.description) {
      addJob(newJob as Omit<JobOpening, 'id' | 'createdAt'>);
      setNewJob({
        title: '',
        department: '',
        location: '',
        description: '',
        requirements: [],
        status: 'open'
      });
      setIsAdding(false);
    }
  };

  const handleUpdateJob = (id: string) => {
    if (editingJob) {
      updateJob(id, editingJob);
      setEditingJob(null);
    }
  };

  const handleDeleteJob = (id: string) => {
    if (window.confirm('Are you sure you want to delete this job opening?')) {
      deleteJob(id);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage Job Openings</h2>
        <button
          onClick={() => setIsAdding(true)}
          className="bg-[#E60028] text-white px-4 py-2 rounded-lg hover:bg-[#c4001f] transition-colors"
        >
          Add New Job
        </button>
      </div>

      {/* Add/Edit Job Form */}
      {(isAdding || editingJob) && (
        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <h3 className="text-xl font-semibold mb-4">
            {editingJob ? 'Edit Job Opening' : 'Add New Job Opening'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Job Title"
              value={editingJob?.title || newJob.title}
              onChange={(e) => editingJob 
                ? setEditingJob({ ...editingJob, title: e.target.value })
                : setNewJob({ ...newJob, title: e.target.value })
              }
              className="px-4 py-2 rounded-lg border border-gray-300"
            />
            <input
              type="text"
              placeholder="Department"
              value={editingJob?.department || newJob.department}
              onChange={(e) => editingJob
                ? setEditingJob({ ...editingJob, department: e.target.value })
                : setNewJob({ ...newJob, department: e.target.value })
              }
              className="px-4 py-2 rounded-lg border border-gray-300"
            />
            <input
              type="text"
              placeholder="Location"
              value={editingJob?.location || newJob.location}
              onChange={(e) => editingJob
                ? setEditingJob({ ...editingJob, location: e.target.value })
                : setNewJob({ ...newJob, location: e.target.value })
              }
              className="px-4 py-2 rounded-lg border border-gray-300"
            />
            <select
              value={editingJob?.status || newJob.status}
              onChange={(e) => editingJob
                ? setEditingJob({ ...editingJob, status: e.target.value as 'open' | 'closed' })
                : setNewJob({ ...newJob, status: e.target.value as 'open' | 'closed' })
              }
              className="px-4 py-2 rounded-lg border border-gray-300"
            >
              <option value="open">Open</option>
              <option value="closed">Closed</option>
            </select>
            <textarea
              placeholder="Job Description"
              value={editingJob?.description || newJob.description}
              onChange={(e) => editingJob
                ? setEditingJob({ ...editingJob, description: e.target.value })
                : setNewJob({ ...newJob, description: e.target.value })
              }
              className="px-4 py-2 rounded-lg border border-gray-300 md:col-span-2"
              rows={4}
            />
            <div className="md:col-span-2 flex justify-end gap-2">
              <button
                onClick={() => {
                  setIsAdding(false);
                  setEditingJob(null);
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={() => editingJob ? handleUpdateJob(editingJob.id) : handleAddJob()}
                className="bg-[#E60028] text-white px-4 py-2 rounded-lg hover:bg-[#c4001f] transition-colors"
              >
                {editingJob ? 'Update Job' : 'Add Job'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Jobs List */}
      <div className="space-y-4">
        {jobs.map((job) => (
          <div key={job.id} className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold">{job.title}</h3>
                <p className="text-gray-600">{job.department} • {job.location}</p>
                <p className="mt-2 text-gray-700">{job.description}</p>
                <div className="mt-2">
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    job.status === 'open' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {job.status}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setEditingJob(job)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteJob(job.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Testimonials Manager Component
const TestimonialsManager: React.FC = () => {
  const { testimonials, addTestimonial, updateTestimonial, deleteTestimonial } = useAdmin();
  const [isAdding, setIsAdding] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [newTestimonial, setNewTestimonial] = useState<Partial<Testimonial>>({
    name: '',
    position: '',
    content: '',
    rating: 5
  });

  const handleAddTestimonial = () => {
    if (newTestimonial.name && newTestimonial.position && newTestimonial.content) {
      addTestimonial(newTestimonial as Omit<Testimonial, 'id'>);
      setNewTestimonial({
        name: '',
        position: '',
        content: '',
        rating: 5
      });
      setIsAdding(false);
    }
  };

  const handleUpdateTestimonial = (id: string) => {
    if (editingTestimonial) {
      updateTestimonial(id, editingTestimonial);
      setEditingTestimonial(null);
    }
  };

  const handleDeleteTestimonial = (id: string) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      deleteTestimonial(id);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage Testimonials</h2>
        <button
          onClick={() => setIsAdding(true)}
          className="bg-[#E60028] text-white px-4 py-2 rounded-lg hover:bg-[#c4001f] transition-colors"
        >
          Add New Testimonial
        </button>
      </div>

      {/* Add/Edit Testimonial Form */}
      {(isAdding || editingTestimonial) && (
        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <h3 className="text-xl font-semibold mb-4">
            {editingTestimonial ? 'Edit Testimonial' : 'Add New Testimonial'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Name"
              value={editingTestimonial?.name || newTestimonial.name}
              onChange={(e) => editingTestimonial
                ? setEditingTestimonial({ ...editingTestimonial, name: e.target.value })
                : setNewTestimonial({ ...newTestimonial, name: e.target.value })
              }
              className="px-4 py-2 rounded-lg border border-gray-300"
            />
            <input
              type="text"
              placeholder="Position"
              value={editingTestimonial?.position || newTestimonial.position}
              onChange={(e) => editingTestimonial
                ? setEditingTestimonial({ ...editingTestimonial, position: e.target.value })
                : setNewTestimonial({ ...newTestimonial, position: e.target.value })
              }
              className="px-4 py-2 rounded-lg border border-gray-300"
            />
            <textarea
              placeholder="Testimonial Content"
              value={editingTestimonial?.content || newTestimonial.content}
              onChange={(e) => editingTestimonial
                ? setEditingTestimonial({ ...editingTestimonial, content: e.target.value })
                : setNewTestimonial({ ...newTestimonial, content: e.target.value })
              }
              className="px-4 py-2 rounded-lg border border-gray-300 md:col-span-2"
              rows={4}
            />
            <div className="flex items-center gap-2">
              <label className="text-gray-700">Rating:</label>
              <select
                value={editingTestimonial?.rating || newTestimonial.rating}
                onChange={(e) => editingTestimonial
                  ? setEditingTestimonial({ ...editingTestimonial, rating: Number(e.target.value) })
                  : setNewTestimonial({ ...newTestimonial, rating: Number(e.target.value) })
                }
                className="px-4 py-2 rounded-lg border border-gray-300"
              >
                {[1, 2, 3, 4, 5].map(rating => (
                  <option key={rating} value={rating}>{rating} Stars</option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2 flex justify-end gap-2">
              <button
                onClick={() => {
                  setIsAdding(false);
                  setEditingTestimonial(null);
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={() => editingTestimonial ? handleUpdateTestimonial(editingTestimonial.id) : handleAddTestimonial()}
                className="bg-[#E60028] text-white px-4 py-2 rounded-lg hover:bg-[#c4001f] transition-colors"
              >
                {editingTestimonial ? 'Update Testimonial' : 'Add Testimonial'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Testimonials List */}
      <div className="space-y-4">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold">{testimonial.name}</h3>
                <p className="text-gray-600">{testimonial.position}</p>
                <p className="mt-2 text-gray-700">{testimonial.content}</p>
                <div className="mt-2 flex items-center gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setEditingTestimonial(testimonial)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteTestimonial(testimonial.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// User Manager Component
const UserManager: React.FC = () => {
  const [users, setUsers] = useState<User[]>([
    { username: 'admin', role: 'admin' },
    { username: 'dev', role: 'dev' },
    { username: 'hr', role: 'hr' }
  ]);
  const [isAdding, setIsAdding] = useState(false);
  const [newUser, setNewUser] = useState<Partial<User>>({
    username: '',
    role: 'dev'
  });

  const handleAddUser = () => {
    if (newUser.username && newUser.role) {
      setUsers(prev => [...prev, newUser as User]);
      setNewUser({ username: '', role: 'dev' });
      setIsAdding(false);
    }
  };

  const handleDeleteUser = (username: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(prev => prev.filter(user => user.username !== username));
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage Users</h2>
        <button
          onClick={() => setIsAdding(true)}
          className="bg-[#E60028] text-white px-4 py-2 rounded-lg hover:bg-[#c4001f] transition-colors"
        >
          Add New User
        </button>
      </div>

      {/* Add User Form */}
      {isAdding && (
        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <h3 className="text-xl font-semibold mb-4">Add New User</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Username"
              value={newUser.username}
              onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
              className="px-4 py-2 rounded-lg border border-gray-300"
            />
            <select
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value as User['role'] })}
              className="px-4 py-2 rounded-lg border border-gray-300"
            >
              <option value="admin">Admin</option>
              <option value="dev">Developer</option>
              <option value="hr">HR</option>
            </select>
            <div className="md:col-span-2 flex justify-end gap-2">
              <button
                onClick={() => setIsAdding(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleAddUser}
                className="bg-[#E60028] text-white px-4 py-2 rounded-lg hover:bg-[#c4001f] transition-colors"
              >
                Add User
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Users List */}
      <div className="space-y-4">
        {users.map((user) => (
          <div key={user.username} className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-semibold">{user.username}</h3>
                <p className="text-gray-600 capitalize">{user.role}</p>
              </div>
              <button
                onClick={() => handleDeleteUser(user.username)}
                className="text-red-600 hover:text-red-800"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Blog Posts Manager Component
const BlogPostsManager: React.FC<{ user: User }> = ({ user }) => {
  const { blogPosts, addBlogPost, updateBlogPost, deleteBlogPost } = useAdmin();
  const [isAdding, setIsAdding] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [newPost, setNewPost] = useState<Partial<BlogPost>>({
    title: '',
    content: '',
  });

  const handleAddPost = () => {
    if (newPost.title && newPost.content) {
      addBlogPost({
        title: newPost.title,
        content: newPost.content,
        author: user.role,
      });
      setNewPost({ title: '', content: '' });
      setIsAdding(false);
    }
  };

  const handleUpdatePost = (id: string) => {
    if (editingPost) {
      updateBlogPost(id, editingPost);
      setEditingPost(null);
    }
  };

  const handleDeletePost = (id: string) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      deleteBlogPost(id);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage Blog Posts</h2>
        <button
          onClick={() => setIsAdding(true)}
          className="bg-[#E60028] text-white px-4 py-2 rounded-lg hover:bg-[#c4001f] transition-colors"
        >
          Add New Post
        </button>
      </div>

      {/* Add/Edit Blog Post Form */}
      {(isAdding || editingPost) && (
        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <h3 className="text-xl font-semibold mb-4">
            {editingPost ? 'Edit Blog Post' : 'Add New Blog Post'}
          </h3>
          <div className="grid grid-cols-1 gap-4">
            <input
              type="text"
              placeholder="Title"
              value={editingPost?.title || newPost.title}
              onChange={(e) => editingPost
                ? setEditingPost({ ...editingPost, title: e.target.value })
                : setNewPost({ ...newPost, title: e.target.value })
              }
              className="px-4 py-2 rounded-lg border border-gray-300"
            />
            <textarea
              placeholder="Content"
              value={editingPost?.content || newPost.content}
              onChange={(e) => editingPost
                ? setEditingPost({ ...editingPost, content: e.target.value })
                : setNewPost({ ...newPost, content: e.target.value })
              }
              className="px-4 py-2 rounded-lg border border-gray-300"
              rows={4}
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setIsAdding(false);
                  setEditingPost(null);
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={() => editingPost ? handleUpdatePost(editingPost.id) : handleAddPost()}
                className="bg-[#E60028] text-white px-4 py-2 rounded-lg hover:bg-[#c4001f] transition-colors"
              >
                {editingPost ? 'Update Post' : 'Add Post'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Blog Posts List */}
      <div className="space-y-4">
        {blogPosts.map((post) => (
          <div key={post.id} className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold">{post.title}</h3>
                <p className="text-gray-500 text-sm mb-2">{new Date(post.date).toLocaleDateString()} by {post.author.toUpperCase()}</p>
                <p className="mt-2 text-gray-700">{post.content.slice(0, 120)}{post.content.length > 120 ? '...' : ''}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setEditingPost(post)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeletePost(post.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 