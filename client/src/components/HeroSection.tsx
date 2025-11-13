import { useState, useEffect } from 'react';
import profileImage from '../assets/WhatsApp Image 2024-08-30 at 20.15.15_7b77b7profile_1751277671914.jpgprofile_1751277671914.jpgprofile_1751277671914.jpg';
import logoImage from '../assets/logo_1751278240532.webp';

export default function HeroSection() {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const fullText = 'Full Stack Developer | UI/UX Enthusiast | Problem Solver';

  useEffect(() => {
    const typeText = () => {
      if (currentIndex < fullText.length) {
        setDisplayText(fullText.slice(0, currentIndex + 1));
        setCurrentIndex(prev => prev + 1);
      } else {
        setTimeout(() => {
          setCurrentIndex(0);
          setDisplayText('');
        }, 3000);
      }
    };

    const timer = setTimeout(typeText, 100);
    return () => clearTimeout(timer);
  }, [currentIndex, fullText]);

  const handleDownloadResume = () => {
    // Download user's provided resume
    const link = document.createElement('a');
    link.href = '/Syed Murtaza Ali Resume.pdf'; // This will be replaced with actual resume path
    link.download = 'Syed Murtaza Ali Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleViewProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      const offsetTop = projectsSection.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-violet-900/20 dark:from-slate-900 dark:via-slate-800 dark:to-violet-900/20"></div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '0.7s' }}></div>
        {/* Subtle Logo Watermark */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-5">
          <img
            src={logoImage}
            alt=""
            className="w-96 h-96 object-contain"
          />
        </div>
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Professional Headshot */}
        <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-cyan-400 to-violet-500 p-1 animate-scale-in">
          <img
            src={profileImage}
            alt="Syed Murtaza Ali"
            className="w-full h-full rounded-full object-cover"
          />
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
          Hi, I'm{' '}
          <span className="bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
            Syed Murtaza Ali
          </span>
        </h1>

        {/* Typed Effect Text */}
        <div className="text-xl md:text-2xl text-slate-300 mb-8 h-8 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <span className="typing-text">
            {displayText}
          </span>
        </div>

        <p className="text-lg text-slate-400 mb-12 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.5s' }}>
          I create beautiful, responsive web applications with modern technologies.
          Passionate about clean code, user experience, and bringing ideas to life.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up" style={{ animationDelay: '0.7s' }}>
          <button
            onClick={handleViewProjects}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-violet-500 text-white font-semibold rounded-lg hover:scale-105 hover-glow transition-all duration-300"
          >
            <i className="fas fa-code mr-2"></i>
            View My Work
          </button>

          <button
            onClick={handleDownloadResume}
            className="inline-flex items-center px-8 py-4 border-2 border-cyan-400 text-cyan-400 font-semibold rounded-lg hover:bg-cyan-400 hover:text-slate-900 hover:scale-105 transition-all duration-300"
          >
            <i className="fas fa-download mr-2"></i>
            Download Resume
          </button>
        </div>
      </div>
    </section>
  );
}
