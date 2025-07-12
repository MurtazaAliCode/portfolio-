import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactSection() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const { toast } = useToast();

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const response = await apiRequest('POST', '/api/contact', data);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Message sent successfully!",
        description: data.message,
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    },
    onError: (error) => {
      toast({
        title: "Failed to send message",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    contactMutation.mutate(formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const socialLinks = [
    { name: 'GitHub', icon: 'fab fa-github', url: '#' },
    { name: 'LinkedIn', icon: 'fab fa-linkedin', url: '#' },
    { name: 'Twitter', icon: 'fab fa-twitter', url: '#' },
    { name: 'Website', icon: 'fas fa-globe', url: '#' }
  ];

  return (
    <section id="contact" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Let's{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
              Connect
            </span>
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            I'm always interested in new opportunities and exciting projects.
            Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="glass-effect rounded-2xl p-8">
            <h3 className="text-2xl font-semibold mb-6">Send me a message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-200 text-slate-100 placeholder-slate-400"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-200 text-slate-100 placeholder-slate-400"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-slate-300 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-200 text-slate-100 placeholder-slate-400"
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-200 text-slate-100 placeholder-slate-400 resize-none"
                  placeholder="Tell me about your project or just say hello!"
                />
              </div>

              <button
                type="submit"
                disabled={contactMutation.isPending}
                className="w-full bg-gradient-to-r from-cyan-500 to-violet-500 text-white font-semibold py-3 px-6 rounded-lg hover:scale-105 hover-glow transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {contactMutation.isPending ? (
                  <>
                    <i className="fas fa-spinner fa-spin mr-2"></i>
                    Sending...
                  </>
                ) : (
                  <>
                    <i className="fas fa-paper-plane mr-2"></i>
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Information & Social Links */}
          <div className="space-y-8">
            {/* Contact Info */}
            <div className="glass-effect rounded-2xl p-8">
              <h3 className="text-2xl font-semibold mb-6">Get in touch</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-violet-500 rounded-lg flex items-center justify-center">
                    <i className="fas fa-envelope text-white text-xl"></i>
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-slate-400">syedmurtazaali756@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-violet-500 rounded-lg flex items-center justify-center">
                    <i className="fas fa-map-marker-alt text-white text-xl"></i>
                  </div>
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-slate-400">karachi, pakistan</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-violet-500 rounded-lg flex items-center justify-center">
                    <i className="fas fa-clock text-white text-xl"></i>
                  </div>
                  <div>
                    <p className="font-medium">Response Time</p>
                    <p className="text-slate-400">Usually within 24 hours</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="glass-effect rounded-2xl p-8">
              <h3 className="text-2xl font-semibold mb-6">Follow me</h3>
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    className="flex items-center space-x-3 p-4 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 transition-all duration-200 group"
                  >
                    <i className={`${social.icon} text-2xl group-hover:text-cyan-400 transition-colors`}></i>
                    <span className="font-medium group-hover:text-cyan-400 transition-colors">
                      {social.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
