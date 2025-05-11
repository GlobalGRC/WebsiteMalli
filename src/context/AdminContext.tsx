import React, { createContext, useContext, useState, useEffect } from 'react';

// Types
export type JobOpening = {
  id: string;
  title: string;
  department: string;
  location: string;
  description: string;
  requirements: string[];
  status: 'open' | 'closed';
  createdAt: string;
};

export type Testimonial = {
  id: string;
  name: string;
  position: string;
  content: string;
  rating: number;
};

type AdminContextType = {
  jobs: JobOpening[];
  testimonials: Testimonial[];
  addJob: (job: Omit<JobOpening, 'id' | 'createdAt'>) => void;
  updateJob: (id: string, job: Partial<JobOpening>) => void;
  deleteJob: (id: string) => void;
  addTestimonial: (testimonial: Omit<Testimonial, 'id'>) => void;
  updateTestimonial: (id: string, testimonial: Partial<Testimonial>) => void;
  deleteTestimonial: (id: string) => void;
};

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state from localStorage or use defaults
  const [jobs, setJobs] = useState<JobOpening[]>(() => {
    const savedJobs = localStorage.getItem('jobs');
    return savedJobs ? JSON.parse(savedJobs) : [];
  });

  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    const savedTestimonials = localStorage.getItem('testimonials');
    return savedTestimonials ? JSON.parse(savedTestimonials) : [];
  });

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('jobs', JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    localStorage.setItem('testimonials', JSON.stringify(testimonials));
  }, [testimonials]);

  // Job management functions
  const addJob = (job: Omit<JobOpening, 'id' | 'createdAt'>) => {
    const newJob: JobOpening = {
      ...job,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setJobs(prev => [...prev, newJob]);
  };

  const updateJob = (id: string, updatedJob: Partial<JobOpening>) => {
    setJobs(prev => prev.map(job => 
      job.id === id ? { ...job, ...updatedJob } : job
    ));
  };

  const deleteJob = (id: string) => {
    setJobs(prev => prev.filter(job => job.id !== id));
  };

  // Testimonial management functions
  const addTestimonial = (testimonial: Omit<Testimonial, 'id'>) => {
    const newTestimonial: Testimonial = {
      ...testimonial,
      id: Date.now().toString()
    };
    setTestimonials(prev => [...prev, newTestimonial]);
  };

  const updateTestimonial = (id: string, updatedTestimonial: Partial<Testimonial>) => {
    setTestimonials(prev => prev.map(testimonial => 
      testimonial.id === id ? { ...testimonial, ...updatedTestimonial } : testimonial
    ));
  };

  const deleteTestimonial = (id: string) => {
    setTestimonials(prev => prev.filter(testimonial => testimonial.id !== id));
  };

  return (
    <AdminContext.Provider value={{
      jobs,
      testimonials,
      addJob,
      updateJob,
      deleteJob,
      addTestimonial,
      updateTestimonial,
      deleteTestimonial
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}; 