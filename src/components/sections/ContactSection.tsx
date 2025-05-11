import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { Button } from '../ui/Button';
import { MotionCard } from '../animations/MotionCard';
import emailjs from '@emailjs/browser';

export const ContactSection: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    service: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });
  
  // Initialize EmailJS
  useEffect(() => {
    emailjs.init('V5iMSPTDEgpVfrCCB'); // Your EmailJS public key
  }, []);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const templateParams = {
        from_name: formState.name,
        from_email: formState.email,
        company: formState.company,
        service: formState.service,
        message: formState.message,
        to_name: 'SCIA Global Team' // Add recipient name
      };

      const response = await emailjs.send(
        'service_8gnojdl', // Your EmailJS service ID
        'template_88rokkn', // Your EmailJS template ID
        templateParams
      );

      if (response.status === 200) {
        setSubmitStatus({
          type: 'success',
          message: 'Thank you for your message. We will get back to you soon!'
        });
        
        setFormState({
          name: '',
          email: '',
          company: '',
          message: '',
          service: ''
        });
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('Email sending error:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Sorry, there was an error sending your message. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-gray-50" id="contact">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get in Touch</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Connect with our technology experts to discuss your digital transformation and innovation needs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <MotionCard>
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10">
              <h3 className="text-2xl font-bold mb-6">Contact Us</h3>
              
              {submitStatus.type && (
                <div className={`mb-6 p-4 rounded-lg ${
                  submitStatus.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
                }`}>
                  {submitStatus.message}
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name*
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E60028] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address*
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E60028] focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formState.company}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E60028] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
                      Service Interested In
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formState.service}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E60028] focus:border-transparent"
                    >
                      <option value="">Select a service</option>
                      <option value="cybersecurity">Cybersecurity Services</option>
                      <option value="compliance">Compliance & Audit</option>
                      <option value="risk">Risk Management</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message*
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E60028] focus:border-transparent"
                  ></textarea>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="privacy"
                    required
                    className="h-4 w-4 text-[#E60028] focus:ring-[#E60028] border-gray-300 rounded"
                  />
                  <label htmlFor="privacy" className="ml-2 block text-sm text-gray-700">
                    I agree to the <a href="#" className="text-[#E60028]">Privacy Policy</a>
                  </label>
                </div>
                
                <Button 
                  variant="primary" 
                  type="submit" 
                  className="w-full flex items-center justify-center"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-5 w-5" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </div>
          </MotionCard>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-6">Our Information</h3>
              <div className="space-y-6">
                <ContactInfo 
                  icon={<Phone className="h-6 w-6 text-[#E60028]" />}
                  title="Phone Number"
                  details={['+91 8309943648']}
                />
                <ContactInfo 
                  icon={<Mail className="h-6 w-6 text-[#E60028]" />}
                  title="Email Address"
                  details={['mallikarjuna@sciaglobal.com']}
                />
                <ContactInfo 
                  icon={<MapPin className="h-6 w-6 text-[#E60028]" />}
                  title="Office Location"
                  details={[
                    'Block A, 3rd Floor Victory Plaza',
                    'Brindavan Colony Road, Street Number 1',
                    'Sabza Colony, Toli Chowki',
                    'Hyderabad, Telangana 500008'
                  ]}
                />
                <ContactInfo 
                  icon={<Clock className="h-6 w-6 text-[#E60028]" />}
                  title="Working Hours"
                  details={['Monday - Friday: 9am - 6pm', 'Saturday: 10am - 2pm', 'Sunday: Closed']}
                />
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3785.099603546097!2d78.40716281499922!3d17.403844785029855!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb978bad7eb1c3%3A0x4272b5c8740f9916!2sSCIA%20Global!5e0!3m2!1sen!2sin!4v1709211104996!5m2!1sen!2sin"
                width="100%"
                height="320"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

type ContactInfoProps = {
  icon: React.ReactNode;
  title: string;
  details: string[];
};

const ContactInfo: React.FC<ContactInfoProps> = ({ icon, title, details }) => {
  return (
    <div className="flex">
      <div className="h-12 w-12 bg-white rounded-full shadow-md flex items-center justify-center mr-4 flex-shrink-0">
        {icon}
      </div>
      <div>
        <h4 className="font-medium text-lg mb-1">{title}</h4>
        {details.map((detail, index) => (
          <p key={index} className="text-gray-600">{detail}</p>
        ))}
      </div>
    </div>
  );
};