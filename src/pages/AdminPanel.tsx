import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Briefcase, Star, LogOut, Code, Monitor, Palette, Network } from 'lucide-react';
import { useAdmin, JobOpening, Testimonial, BlogPost } from '../context/AdminContext';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Define types
type User = {
  username: string;
  role: 'admin' | 'dev' | 'hr';
};

// Add type definitions
interface NetworkCall {
  url: string;
  time: number;
  size?: number;
  status?: number;
  timestamp?: string;
  error?: string;
}

interface PerformanceMetrics {
  memory: number[];
  cpu: number[];
  fps: number[];
  timestamps: string[];
}

interface NetworkStats {
  totalRequests: number;
  averageResponseTime: number;
  successRate: number;
  errorRate: number;
  bandwidth: number;
}

interface DebuggerState {
  breakpoints: Set<string>;
  watchExpressions: string[];
  callStack: any[];
  variables: Record<string, any>;
}

interface ProfilerState {
  isRecording: boolean;
  startTime: number;
  measurements: Array<{
    component: string;
    renderTime: number;
    timestamp: number;
  }>;
}





export const AdminPanel: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<'jobs' | 'testimonials' | 'blog' | 'devtools' | 'admintools' | 'usermanagement' | 'settings'>('jobs');

  const { jobs, testimonials } = useAdmin();

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
      <div className="container mx-auto px-4 py-8 mt-24">
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
            <button
            onClick={() => setActiveTab('blog')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              activeTab === 'blog' ? 'bg-[#E60028] text-white' : 'bg-white text-gray-600'
            }`}
          >
            <Star className="w-5 h-5" />
            Blog Posts
          </button>
          {user.role === 'dev' && (
            <button
              onClick={() => setActiveTab('devtools')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                activeTab === 'devtools' ? 'bg-[#E60028] text-white' : 'bg-white text-gray-600'
              }`}
            >
              <Code className="w-5 h-5" />
              Dev Tools
            </button>
          )}
          {user.role === 'dev' && (
            <button
              onClick={() => setActiveTab('admintools')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                activeTab === 'admintools' ? 'bg-[#E60028] text-white' : 'bg-white text-gray-600'
              }`}
            >
              <Monitor className="w-5 h-5" />
              Admin Tools
            </button>
          )}
          {user.role === 'dev' && (
            <button
              onClick={() => setActiveTab('usermanagement')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                activeTab === 'usermanagement' ? 'bg-[#E60028] text-white' : 'bg-white text-gray-600'
              }`}
            >
              <Network className="w-5 h-5" />
              User Management
            </button>
          )}
          {user.role === 'dev' && (
            <button
              onClick={() => setActiveTab('settings')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                activeTab === 'settings' ? 'bg-[#E60028] text-white' : 'bg-white text-gray-600'
              }`}
            >
              <Palette className="w-5 h-5" />
              Settings
            </button>
          )}
        </div>

        {/* Content Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-lg p-6"
        >
          {activeTab === 'jobs' && <JobOpeningsManager />}
          {activeTab === 'testimonials' && <TestimonialsManager />}
          {activeTab === 'blog' && <BlogPostsManager user={user} />}
          {activeTab === 'devtools' && user.role === 'dev' && <DevTools />}
          {activeTab === 'admintools' && user.role === 'dev' && <AdminTools user={user} />}
          {activeTab === 'usermanagement' && user.role === 'dev' && <UserManagement />}
          {activeTab === 'settings' && user.role === 'dev' && <SettingsConfiguration />}
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

// Dev Tools Component
const DevTools: React.FC = () => {
  const [showGrid] = useState(false);
  const [showViewport] = useState(false);
  const [viewportSize, setViewportSize] = useState({ width: 0, height: 0 });
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [, setConsoleLogs] = useState<Array<{ type: string; message: string }>>([]);
  const [] = useState('');
  const [networkCalls, setNetworkCalls] = useState<NetworkCall[]>([]);
  const [networkFilter, setNetworkFilter] = useState('');
  const [networkStats, setNetworkStats] = useState<NetworkStats>({
    totalRequests: 0,
    averageResponseTime: 0,
    successRate: 0,
    errorRate: 0,
    bandwidth: 0
  });
  const [debuggerState, setDebuggerState] = useState<DebuggerState>({
    breakpoints: new Set<string>(),
    watchExpressions: [],
    callStack: [],
    variables: {}
  });
  const [profilerState, setProfilerState] = useState<ProfilerState>({
    isRecording: false,
    startTime: 0,
    measurements: []
  });
  const [gridSettings] = useState({
    columns: 12,
    gap: 20,
    color: '#ff0000',
    opacity: 0.5
  });
  const [themeSettings, setThemeSettings] = useState(() => {
    const savedSettings = localStorage.getItem('themeSettings');
    return savedSettings ? JSON.parse(savedSettings) : {
      primaryColor: '#E60028',
      backgroundColor: '#ffffff',
      textColor: '#000000'
    };
  });
  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetrics>({
    memory: [],
    cpu: [],
    fps: [],
    timestamps: []
  });

  useEffect(() => {
    // Update viewport size
    const updateViewportSize = () => {
      setViewportSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    updateViewportSize();
    window.addEventListener('resize', updateViewportSize);

    // Monitor network calls
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      const startTime = performance.now();
      const response = await originalFetch(...args);
      const endTime = performance.now();
      setNetworkCalls(prev => [...prev, {
        url: args[0].toString(),
        time: endTime - startTime
      } as NetworkCall].slice(-10)); // Keep last 10 calls
      return response;
    };

    // Capture console logs
    const originalConsole = {
      log: console.log,
      error: console.error,
      warn: console.warn,
      info: console.info
    };

    console.log = (...args) => {
      originalConsole.log(...args);
      setConsoleLogs(prev => [...prev, { type: 'log', message: args.join(' ') }].slice(-20));
    };
    console.error = (...args) => {
      originalConsole.error(...args);
      setConsoleLogs(prev => [...prev, { type: 'error', message: args.join(' ') }].slice(-20));
    };
    console.warn = (...args) => {
      originalConsole.warn(...args);
      setConsoleLogs(prev => [...prev, { type: 'warn', message: args.join(' ') }].slice(-20));
    };
    console.info = (...args) => {
      originalConsole.info(...args);
      setConsoleLogs(prev => [...prev, { type: 'info', message: args.join(' ') }].slice(-20));
    };

    return () => {
      window.removeEventListener('resize', updateViewportSize);
      window.fetch = originalFetch;
      console.log = originalConsole.log;
      console.error = originalConsole.error;
      console.warn = originalConsole.warn;
      console.info = originalConsole.info;
    };
  }, []);

  // Performance monitoring
  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animationFrameId: number;

    const measurePerformance = () => {
      const currentTime = performance.now();
      const elapsed = currentTime - lastTime;
      
      if (elapsed >= 1000) {
        const fps = Math.round((frameCount * 1000) / elapsed);
        const memory = (performance as any).memory?.usedJSHeapSize / 1024 / 1024 || 0;
        const cpu = Math.random() * 100; // Simulated CPU usage

        setPerformanceMetrics(prev => ({
          memory: [...prev.memory.slice(-30), memory],
          cpu: [...prev.cpu.slice(-30), cpu],
          fps: [...prev.fps.slice(-30), fps],
          timestamps: [...prev.timestamps.slice(-30), new Date().toLocaleTimeString()]
        }));

        frameCount = 0;
        lastTime = currentTime;
      }

      frameCount++;
      animationFrameId = requestAnimationFrame(measurePerformance);
    };

    animationFrameId = requestAnimationFrame(measurePerformance);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // Network monitoring
  useEffect(() => {
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      const startTime = performance.now();
      const startSize = (performance as any).memory?.usedJSHeapSize || 0;
      
      try {
        const response = await originalFetch(...args);
        const endTime = performance.now();
        const endSize = (performance as any).memory?.usedJSHeapSize || 0;
        
        const responseTime = endTime - startTime;
        const memoryDelta = endSize - startSize;
        
        setNetworkCalls(prev => {
          const newCalls = [...prev, {
            url: args[0].toString(),
            time: responseTime,
            size: memoryDelta,
            status: response.status,
            timestamp: new Date().toISOString()
          } as NetworkCall].slice(-50);

          // Calculate network statistics
          const totalRequests = newCalls.length;
          const averageResponseTime = newCalls.reduce((sum, call) => sum + call.time, 0) / totalRequests;
          const successCount = newCalls.filter(call => call.status && call.status >= 200 && call.status < 300).length;
          const errorCount = newCalls.filter(call => call.status && call.status >= 400).length;
          const totalBandwidth = newCalls.reduce((sum, call) => sum + (call.size || 0), 0);

          setNetworkStats({
            totalRequests,
            averageResponseTime,
            successRate: (successCount / totalRequests) * 100,
            errorRate: (errorCount / totalRequests) * 100,
            bandwidth: totalBandwidth
          });

          return newCalls;
        });

        return response;
      } catch (error) {
        setNetworkCalls(prev => [...prev, {
          url: args[0].toString(),
          time: performance.now() - startTime,
          size: 0,
          status: 0,
          timestamp: new Date().toISOString(),
          error: error instanceof Error ? error.message : 'Unknown error'
        } as NetworkCall].slice(-50));
        throw error;
      }
    };

    return () => {
      window.fetch = originalFetch;
    };
  }, []);

  // Component profiling
  const startProfiling = () => {
    setProfilerState(prev => ({
      ...prev,
      isRecording: true,
      startTime: performance.now(),
      measurements: []
    }));
  };

  const stopProfiling = () => {
    setProfilerState(prev => ({
      ...prev,
      isRecording: false
    }));
  };


  // Debugger functions
  const addBreakpoint = (line: string) => {
    setDebuggerState(prev => ({
      ...prev,
      breakpoints: new Set([...prev.breakpoints, line])
    }));
  };

  const addWatchExpression = (expression: string) => {
    setDebuggerState(prev => ({
      ...prev,
      watchExpressions: [...prev.watchExpressions, expression]
    }));
  };

  const evaluateExpression = (expression: string) => {
    try {
      const result = Function(`"use strict"; return (${expression})`)();
      setDebuggerState(prev => ({
        ...prev,
        variables: {
          ...prev.variables,
          [expression]: result
        }
      }));
    } catch (error) {
      console.error('Expression evaluation failed:', error);
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    
    // Apply dark theme colors
    if (newTheme === 'dark') {
      setThemeSettings((prev: typeof themeSettings) => ({
        ...prev,
        backgroundColor: '#1a1a1a',
        textColor: '#ffffff'
      }));
    } else {
      setThemeSettings((prev: typeof themeSettings) => ({
        ...prev,
        backgroundColor: '#ffffff',
        textColor: '#000000'
      }));
    }
    
    // Save theme preference
    localStorage.setItem('theme', newTheme);
  };

  const getNetworkStatusColor = (time: number) => {
    if (time > 1000) return 'text-red-600';
    if (time > 500) return 'text-yellow-600';
    return 'text-green-600';
  };

  const filteredNetworkCalls = networkCalls.filter(call => {
    const matchesSearch = call.url.toLowerCase().includes(networkFilter.toLowerCase());
    const matchesTime = call.time >= Number(networkFilter.split(' ')[0]) || !networkFilter;
    return matchesSearch && matchesTime;
  });


  const updateThemeSettings = (key: keyof typeof themeSettings, value: string) => {
    setThemeSettings((prev: typeof themeSettings) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    // Apply theme settings on mount and when they change
    document.documentElement.style.setProperty('--primary-color', themeSettings.primaryColor);
    document.documentElement.style.setProperty('--background-color', themeSettings.backgroundColor);
    document.documentElement.style.setProperty('--text-color', themeSettings.textColor);
    
    // Save to localStorage
    localStorage.setItem('themeSettings', JSON.stringify(themeSettings));
  }, [themeSettings]);

  // Load saved theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === 'dark') {
        setThemeSettings((prev: typeof themeSettings) => ({
          ...prev,
          backgroundColor: '#1a1a1a',
          textColor: '#ffffff'
        }));
      }
    }
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">Advanced Development Tools</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Performance Monitor */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Monitor className="w-5 h-5" />
            Performance Monitor
          </h3>
          <div className="space-y-4">
            <div className="h-40">
              <Line
                data={{
                  labels: performanceMetrics.timestamps,
                  datasets: [
                    {
                      label: 'FPS',
                      data: performanceMetrics.fps,
                      borderColor: 'rgb(75, 192, 192)',
                      tension: 0.1
                    },
                    {
                      label: 'Memory (MB)',
                      data: performanceMetrics.memory,
                      borderColor: 'rgb(255, 99, 132)',
                      tension: 0.1
                    },
                    {
                      label: 'CPU %',
                      data: performanceMetrics.cpu,
                      borderColor: 'rgb(54, 162, 235)',
                      tension: 0.1
                    }
                  ]
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true
                    }
                  }
                }}
              />
            </div>
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div className="bg-white p-2 rounded">
                <p className="font-medium">Current FPS</p>
                <p className="text-2xl">{performanceMetrics.fps[performanceMetrics.fps.length - 1] || 0}</p>
              </div>
              <div className="bg-white p-2 rounded">
                <p className="font-medium">Memory Usage</p>
                <p className="text-2xl">{performanceMetrics.memory[performanceMetrics.memory.length - 1]?.toFixed(1) || 0} MB</p>
              </div>
              <div className="bg-white p-2 rounded">
                <p className="font-medium">CPU Usage</p>
                <p className="text-2xl">{performanceMetrics.cpu[performanceMetrics.cpu.length - 1]?.toFixed(1) || 0}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Network Monitor */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Network className="w-5 h-5" />
            Network Monitor
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="bg-white p-2 rounded">
                <p className="font-medium">Total Requests</p>
                <p className="text-2xl">{networkStats.totalRequests}</p>
              </div>
              <div className="bg-white p-2 rounded">
                <p className="font-medium">Avg Response Time</p>
                <p className="text-2xl">{networkStats.averageResponseTime.toFixed(2)}ms</p>
              </div>
              <div className="bg-white p-2 rounded">
                <p className="font-medium">Success Rate</p>
                <p className="text-2xl">{networkStats.successRate.toFixed(1)}%</p>
              </div>
              <div className="bg-white p-2 rounded">
                <p className="font-medium">Error Rate</p>
                <p className="text-2xl">{networkStats.errorRate.toFixed(1)}%</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Search URLs..."
                  value={networkFilter}
                  onChange={(e) => setNetworkFilter(e.target.value)}
                  className="text-sm px-2 py-1 border rounded flex-1"
                />
              </div>
              <div className="max-h-40 overflow-y-auto space-y-2">
                {filteredNetworkCalls.map((call, index) => (
                  <div key={index} className="text-sm p-2 bg-white rounded">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="font-medium truncate">{call.url}</p>
                        <p className={`${getNetworkStatusColor(call.time)}`}>
                          {call.time.toFixed(2)}ms
                        </p>
                      </div>
                      <div className="text-xs text-gray-500">
                        {call.timestamp ? new Date(call.timestamp).toLocaleTimeString() : 'N/A'}
                      </div>
                    </div>
                    {call.error && (
                      <p className="text-red-600 text-xs mt-1">{call.error}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Component Profiler */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Code className="w-5 h-5" />
            Component Profiler
          </h3>
          <div className="space-y-4">
            <div className="flex gap-2">
              <button
                onClick={startProfiling}
                disabled={profilerState.isRecording}
                className="px-3 py-1 bg-green-600 text-white rounded text-sm disabled:opacity-50"
              >
                Start Profiling
              </button>
              <button
                onClick={stopProfiling}
                disabled={!profilerState.isRecording}
                className="px-3 py-1 bg-red-600 text-white rounded text-sm disabled:opacity-50"
              >
                Stop Profiling
              </button>
            </div>
            <div className="max-h-40 overflow-y-auto space-y-2">
              {profilerState.measurements.map((measurement, index) => (
                <div key={index} className="text-sm p-2 bg-white rounded">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{measurement.component}</p>
                      <p className="text-gray-600">{measurement.renderTime.toFixed(2)}ms</p>
                    </div>
                    <div className="text-xs text-gray-500">
                      {measurement.timestamp.toFixed(2)}ms
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Debugger */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Code className="w-5 h-5" />
            Debugger
          </h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add breakpoint..."
                  className="text-sm px-2 py-1 border rounded flex-1"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      addBreakpoint((e.target as HTMLInputElement).value);
                      (e.target as HTMLInputElement).value = '';
                    }
                  }}
                />
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add watch expression..."
                  className="text-sm px-2 py-1 border rounded flex-1"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      addWatchExpression((e.target as HTMLInputElement).value);
                      (e.target as HTMLInputElement).value = '';
                    }
                  }}
                />
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Breakpoints</h4>
              <div className="max-h-20 overflow-y-auto space-y-1">
                {Array.from(debuggerState.breakpoints).map((breakpoint, index) => (
                  <div key={index} className="text-sm p-2 bg-white rounded flex justify-between items-center">
                    <span>{breakpoint}</span>
                    <button
                      onClick={() => {
                        setDebuggerState(prev => ({
                          ...prev,
                          breakpoints: new Set([...prev.breakpoints].filter(bp => bp !== breakpoint))
                        }));
                      }}
                      className="text-red-600 hover:underline text-xs"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Watch Expressions</h4>
              <div className="max-h-20 overflow-y-auto space-y-1">
                {debuggerState.watchExpressions.map((expression, index) => (
                  <div key={index} className="text-sm p-2 bg-white rounded">
                    <div className="flex justify-between items-start">
                      <span>{expression}</span>
                      <button
                        onClick={() => evaluateExpression(expression)}
                        className="text-blue-600 hover:underline text-xs"
                      >
                        Evaluate
                      </button>
                    </div>
                    {debuggerState.variables[expression] && (
                      <p className="text-gray-600 text-xs mt-1">
                        = {JSON.stringify(debuggerState.variables[expression])}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Theme Switcher */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Palette className="w-5 h-5" />
            Theme Switcher
          </h3>
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-sm">Primary Color:</label>
                <input
                  type="color"
                  value={themeSettings.primaryColor}
                  onChange={(e) => updateThemeSettings('primaryColor', e.target.value)}
                  className="w-full h-8"
                />
              </div>
              <div>
                <label className="text-sm">Background Color:</label>
                <input
                  type="color"
                  value={themeSettings.backgroundColor}
                  onChange={(e) => updateThemeSettings('backgroundColor', e.target.value)}
                  className="w-full h-8"
                />
              </div>
              <div>
                <label className="text-sm">Text Color:</label>
                <input
                  type="color"
                  value={themeSettings.textColor}
                  onChange={(e) => updateThemeSettings('textColor', e.target.value)}
                  className="w-full h-8"
                />
              </div>
            </div>
            <button
              onClick={toggleTheme}
              className="text-sm text-[#E60028] hover:underline"
            >
              Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
            </button>
          </div>
        </div>
      </div>

      {/* Overlays */}
      {showGrid && (
        <div className="fixed inset-0 pointer-events-none z-50">
          <div 
            className="grid h-full"
            style={{
              gridTemplateColumns: `repeat(${gridSettings.columns}, 1fr)`,
              gap: `${gridSettings.gap}px`,
            }}
          >
            {Array.from({ length: gridSettings.columns }).map((_, i) => (
              <div 
                key={i} 
                className="border"
                style={{
                  borderColor: gridSettings.color,
                  opacity: gridSettings.opacity
                }}
              />
            ))}
          </div>
        </div>
      )}

      {showViewport && (
        <div className="fixed bottom-4 right-4 bg-black text-white px-4 py-2 rounded-lg text-sm z-50">
          {viewportSize.width} x {viewportSize.height}
        </div>
      )}
    </div>
  );
};

const AdminTools: React.FC<{ user: User }> = () => {
  // System settings state
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [logRetention, setLogRetention] = useState(30);
  const [backupTime, setBackupTime] = useState<string | null>(null);
  // Analytics state
  const [userStats] = useState({ total: 100, active: 80, newThisMonth: 10 });
  const [systemMetrics] = useState({ responseTime: 120, errorRate: 0.5 });
  // Audit log state
  const [auditLogs] = useState<Array<{ id: string; user: string; action: string; details: string; timestamp: string }>>([
    { id: '1', user: 'admin', action: 'login', details: 'Logged in', timestamp: new Date().toISOString() }
  ]);
  // Session management state
  const [sessions, setSessions] = useState<Array<{ id: string; user: string; started: string; active: boolean }>>([
    { id: 'sess1', user: 'admin', started: new Date().toISOString(), active: true }
  ]);

  // Handlers for system settings
  const handleBackup = () => setBackupTime(new Date().toISOString());

  return (
    <div className="space-y-8">
      {/* System Settings */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">System Settings</h2>
        <div className="flex flex-col gap-4">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={maintenanceMode} onChange={e => setMaintenanceMode(e.target.checked)} />
            Maintenance Mode
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={emailNotifications} onChange={e => setEmailNotifications(e.target.checked)} />
            Email Notifications
          </label>
          <label className="flex items-center gap-2">
            Log Retention (days):
            <input type="number" value={logRetention} min={1} max={365} onChange={e => setLogRetention(Number(e.target.value))} className="border rounded px-2 py-1 w-20" />
          </label>
          <button onClick={handleBackup} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Backup Now</button>
          {backupTime && <div className="text-sm text-gray-500">Last backup: {new Date(backupTime).toLocaleString()}</div>}
        </div>
      </div>
      {/* Enhanced Analytics */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Analytics</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold">{userStats.total}</div>
            <div className="text-gray-600">Total Users</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{userStats.active}</div>
            <div className="text-gray-600">Active Users</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{userStats.newThisMonth}</div>
            <div className="text-gray-600">New This Month</div>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <div className="font-medium">Avg. Response Time</div>
            <div className="text-lg">{systemMetrics.responseTime} ms</div>
          </div>
          <div>
            <div className="font-medium">Error Rate</div>
            <div className="text-lg">{systemMetrics.errorRate}%</div>
          </div>
        </div>
      </div>
      {/* Audit Log */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Audit Log</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Details</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {auditLogs.map(log => (
                <tr key={log.id}>
                  <td className="px-4 py-2">{log.user}</td>
                  <td className="px-4 py-2">{log.action}</td>
                  <td className="px-4 py-2">{log.details}</td>
                  <td className="px-4 py-2">{new Date(log.timestamp).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Session Management */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">User Sessions</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Started</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Active</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map(session => (
                <tr key={session.id}>
                  <td className="px-4 py-2">{session.user}</td>
                  <td className="px-4 py-2">{new Date(session.started).toLocaleString()}</td>
                  <td className="px-4 py-2">{session.active ? 'Yes' : 'No'}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => setSessions(prev => prev.map(s => s.id === session.id ? { ...s, active: false } : s))}
                      className="text-red-600 hover:underline text-xs"
                      disabled={!session.active}
                    >
                      Revoke
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// User Management Component (dev only)
const UserManagement: React.FC = () => {
  type UserStatus = 'active' | 'inactive' | 'suspended';
  type User = {
    username: string;
    password: string;
    role: string;
    status: UserStatus;
    lastLogin?: string;
    permissions: string[];
    activityLog: Array<{ action: string; timestamp: string }>;
  };

  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('allUsers');
    return saved ? JSON.parse(saved) : [
      { 
        username: 'MalliKarjuna', 
        password: 'malli@123', 
        role: 'admin',
        status: 'active',
        permissions: ['manage_jobs', 'manage_testimonials', 'manage_blog'],
        activityLog: [{ action: 'Initial setup', timestamp: new Date().toISOString() }]
      },
      { 
        username: 'AlonePlayZz', 
        password: 'alone#2009', 
        role: 'dev',
        status: 'active',
        permissions: ['manage_jobs', 'manage_testimonials', 'manage_blog', 'manage_users', 'dev_tools'],
        activityLog: [{ action: 'Initial setup', timestamp: new Date().toISOString() }]
      },
      { 
        username: 'Manager', 
        password: 'manager@123', 
        role: 'hr',
        status: 'active',
        permissions: ['manage_jobs'],
        activityLog: [{ action: 'Initial setup', timestamp: new Date().toISOString() }]
      }
    ];
  });

  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [newUser, setNewUser] = useState<User>({
    username: '',
    password: '',
    role: 'admin',
    status: 'active',
    permissions: [],
    activityLog: [{ action: 'User created', timestamp: new Date().toISOString() }]
  });
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [showActivityLog, setShowActivityLog] = useState(false);

  const availablePermissions = {
    admin: ['manage_jobs', 'manage_testimonials', 'manage_blog'],
    dev: ['manage_jobs', 'manage_testimonials', 'manage_blog', 'manage_users', 'dev_tools'],
    hr: ['manage_jobs']
  };

  useEffect(() => {
    localStorage.setItem('allUsers', JSON.stringify(users));
  }, [users]);

  const handleAddUser = () => {
    if (!newUser.username || !newUser.password) return;
    const userWithPermissions: User = {
      ...newUser,
      permissions: availablePermissions[newUser.role as keyof typeof availablePermissions] || []
    };
    setUsers([...users, userWithPermissions]);
    setNewUser({
      username: '',
      password: '',
      role: 'admin',
      status: 'active',
      permissions: [],
      activityLog: [{ action: 'User created', timestamp: new Date().toISOString() }]
    });
  };

  const handleEditUser = (index: number) => {
    setEditingIndex(index);
    setNewUser(users[index]);
  };

  const handleUpdateUser = () => {
    if (editingIndex === null) return;
    const updated = [...users];
    const updatedUser: User = {
      ...newUser,
      permissions: availablePermissions[newUser.role as keyof typeof availablePermissions] || [],
      activityLog: [
        ...users[editingIndex].activityLog,
        { action: 'User updated', timestamp: new Date().toISOString() }
      ]
    };
    updated[editingIndex] = updatedUser;
    setUsers(updated);
    setEditingIndex(null);
    setNewUser({
      username: '',
      password: '',
      role: 'admin',
      status: 'active',
      permissions: [],
      activityLog: [{ action: 'User created', timestamp: new Date().toISOString() }]
    });
  };

  const handleDeleteUser = (index: number) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter((_, i) => i !== index));
    }
  };

  const handleStatusChange = (index: number, newStatus: UserStatus) => {
    const updated = [...users];
    updated[index] = {
      ...updated[index],
      status: newStatus,
      activityLog: [
        ...updated[index].activityLog,
        { action: `Status changed to ${newStatus}`, timestamp: new Date().toISOString() }
      ]
    };
    setUsers(updated);
  };

  const handlePermissionChange = (index: number, permission: string, checked: boolean) => {
    const updated = [...users];
    const user = updated[index];
    user.permissions = checked
      ? [...user.permissions, permission]
      : user.permissions.filter(p => p !== permission);
    user.activityLog = [
      ...user.activityLog,
      { action: `${permission} permission ${checked ? 'added' : 'removed'}`, timestamp: new Date().toISOString() }
    ];
    setUsers(updated);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold mb-4">Advanced User Management</h2>
      
      {/* Add/Edit User Form */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">
          {editingIndex !== null ? 'Edit User' : 'Add New User'}
        </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Username"
              value={newUser.username}
            onChange={e => setNewUser({ ...newUser, username: e.target.value })}
            className="px-4 py-2 rounded-lg border border-gray-300"
          />
          <input
            type="password"
            placeholder="Password"
            value={newUser.password}
            onChange={e => setNewUser({ ...newUser, password: e.target.value })}
              className="px-4 py-2 rounded-lg border border-gray-300"
            />
            <select
              value={newUser.role}
            onChange={e => setNewUser({ ...newUser, role: e.target.value })}
              className="px-4 py-2 rounded-lg border border-gray-300"
            >
              <option value="admin">Admin</option>
              <option value="dev">Developer</option>
              <option value="hr">HR</option>
            </select>
          <select
            value={newUser.status}
            onChange={e => setNewUser({ ...newUser, status: e.target.value as UserStatus })}
            className="px-4 py-2 rounded-lg border border-gray-300"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="suspended">Suspended</option>
          </select>
            <div className="md:col-span-2 flex justify-end gap-2">
            {editingIndex !== null && (
              <button
                onClick={() => {
                  setEditingIndex(null);
                  setNewUser({
                    username: '',
                    password: '',
                    role: 'admin',
                    status: 'active',
                    permissions: [],
                    activityLog: [{ action: 'User created', timestamp: new Date().toISOString() }]
                  });
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
            )}
              <button
              onClick={editingIndex !== null ? handleUpdateUser : handleAddUser}
                className="bg-[#E60028] text-white px-4 py-2 rounded-lg hover:bg-[#c4001f] transition-colors"
              >
              {editingIndex !== null ? 'Update User' : 'Add User'}
              </button>
            </div>
          </div>
        </div>

      {/* Users List */}
      <div className="space-y-4">
        {users.map((user, i) => (
          <div key={i} className="border rounded-lg p-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold">{user.username}</h3>
                <p className="text-gray-600">Role: {user.role}</p>
                <p className="text-gray-600">Status: 
                  <span className={`ml-2 px-2 py-1 rounded-full text-sm ${
                    user.status === 'active' ? 'bg-green-100 text-green-800' :
                    user.status === 'inactive' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {user.status}
                  </span>
                </p>
              </div>
              <div className="flex gap-2">
              <button
                  onClick={() => handleEditUser(i)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteUser(i)}
                className="text-red-600 hover:text-red-800"
              >
                Delete
              </button>
                <button
                  onClick={() => {
                    setSelectedUser(i);
                    setShowActivityLog(true);
                  }}
                  className="text-green-600 hover:text-green-800"
                >
                  Activity
                </button>
            </div>
          </div>

            {/* Status Management */}
            <div className="mb-4">
              <h4 className="font-medium mb-2">Status Management</h4>
              <div className="flex gap-2">
                <button
                  onClick={() => handleStatusChange(i, 'active')}
                  className={`px-3 py-1 rounded ${
                    user.status === 'active' ? 'bg-green-600 text-white' : 'bg-gray-200'
                  }`}
                >
                  Active
                </button>
                <button
                  onClick={() => handleStatusChange(i, 'inactive')}
                  className={`px-3 py-1 rounded ${
                    user.status === 'inactive' ? 'bg-yellow-600 text-white' : 'bg-gray-200'
                  }`}
                >
                  Inactive
                </button>
                <button
                  onClick={() => handleStatusChange(i, 'suspended')}
                  className={`px-3 py-1 rounded ${
                    user.status === 'suspended' ? 'bg-red-600 text-white' : 'bg-gray-200'
                  }`}
                >
                  Suspended
                </button>
              </div>
            </div>

            {/* Permissions Management */}
            <div>
              <h4 className="font-medium mb-2">Permissions</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {Object.values(availablePermissions).flat().filter((v, i, a) => a.indexOf(v) === i).map(permission => (
                  <label key={permission} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={user.permissions.includes(permission)}
                      onChange={e => handlePermissionChange(i, permission, e.target.checked)}
                      className="rounded"
                    />
                    <span className="text-sm">{permission.replace('_', ' ')}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Activity Log Modal */}
      {showActivityLog && selectedUser !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Activity Log - {users[selectedUser].username}</h3>
              <button
                onClick={() => setShowActivityLog(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="space-y-2">
              {users[selectedUser].activityLog.map((log, index) => (
                <div key={index} className="border-b pb-2">
                  <p className="font-medium">{log.action}</p>
                  <p className="text-sm text-gray-500">{new Date(log.timestamp).toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const SettingsConfiguration: React.FC = () => {
  const [branding, setBranding] = useState(() => {
    const saved = localStorage.getItem('siteBranding');
    return saved ? JSON.parse(saved) : { siteName: 'My Company', logoUrl: '', faviconUrl: '' };
  });
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('siteTheme');
    return saved ? JSON.parse(saved) : { primary: '#E60028', background: '#ffffff', text: '#000000' };
  });
  const [maintenance, setMaintenance] = useState(() => {
    const saved = localStorage.getItem('siteMaintenance');
    return saved ? JSON.parse(saved) : false;
  });
  const [featureToggles, setFeatureToggles] = useState(() => {
    const saved = localStorage.getItem('featureToggles');
    return saved ? JSON.parse(saved) : {
      blog: true,
      testimonials: true,
      jobs: true,
      adminPanel: true
    };
  });

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem('siteBranding', JSON.stringify(branding));
  }, [branding]);
  useEffect(() => {
    localStorage.setItem('siteTheme', JSON.stringify(theme));
  }, [theme]);
  useEffect(() => {
    localStorage.setItem('siteMaintenance', JSON.stringify(maintenance));
  }, [maintenance]);
  useEffect(() => {
    localStorage.setItem('featureToggles', JSON.stringify(featureToggles));
  }, [featureToggles]);

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold mb-6">Settings & Configuration</h2>
      {/* Branding */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Branding</h3>
        <div className="flex flex-col gap-4">
          <label>
            Site Name:
            <input
              type="text"
              value={branding.siteName}
              onChange={e => setBranding({ ...branding, siteName: e.target.value })}
              className="ml-2 px-2 py-1 border rounded"
            />
          </label>
          <label>
            Logo URL:
            <input
              type="text"
              value={branding.logoUrl}
              onChange={e => setBranding({ ...branding, logoUrl: e.target.value })}
              className="ml-2 px-2 py-1 border rounded"
            />
          </label>
          <label>
            Favicon URL:
            <input
              type="text"
              value={branding.faviconUrl}
              onChange={e => setBranding({ ...branding, faviconUrl: e.target.value })}
              className="ml-2 px-2 py-1 border rounded"
            />
          </label>
        </div>
      </div>
      {/* Theme */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Theme</h3>
        <div className="flex flex-col gap-4">
          <label>
            Primary Color:
            <input
              type="color"
              value={theme.primary}
              onChange={e => setTheme({ ...theme, primary: e.target.value })}
              className="ml-2"
            />
          </label>
          <label>
            Background Color:
            <input
              type="color"
              value={theme.background}
              onChange={e => setTheme({ ...theme, background: e.target.value })}
              className="ml-2"
            />
          </label>
          <label>
            Text Color:
            <input
              type="color"
              value={theme.text}
              onChange={e => setTheme({ ...theme, text: e.target.value })}
              className="ml-2"
            />
          </label>
        </div>
      </div>
      {/* Maintenance Mode */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Maintenance Mode</h3>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={maintenance}
            onChange={e => setMaintenance(e.target.checked)}
          />
          Enable Maintenance Mode
        </label>
      </div>
      {/* Feature Toggles */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Feature Toggles</h3>
        <div className="flex flex-col gap-2">
          {Object.keys(featureToggles).map(key => (
            <label key={key} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={featureToggles[key]}
                onChange={e => setFeatureToggles({ ...featureToggles, [key]: e.target.checked })}
              />
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}; 