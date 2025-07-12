import { useState, useEffect } from 'react';
import { useThemeContext } from '@/components/ThemeProvider';
import { useLocation } from 'wouter';
import logoImage from '@assets/logo_1751278240532.webp';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { theme, toggleTheme } = useThemeContext();
  const [location, setLocation] = useLocation();

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#projects', label: 'Projects' },
    { href: '#contact', label: 'Contact' },
    { href: '/resume', label: 'Resume', isRoute: true }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'contact'];
      const scrollPos = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const bottom = top + element.offsetHeight;
          if (scrollPos >= top && scrollPos < bottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string, isRoute?: boolean) => {
    if (isRoute) {
      setLocation(href);
    } else if (href.startsWith('#')) {
      if (location !== '/') {
        setLocation('/');
        setTimeout(() => {
          const target = document.querySelector(href);
          if (target) {
            const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 80;
            window.scrollTo({
              top: offsetTop,
              behavior: 'smooth'
            });
          }
        }, 100);
      } else {
        const target = document.querySelector(href);
        if (target) {
          const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 80;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      }
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-effect animate-slide-down">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="w-12 h-12 flex items-center justify-center transition-all duration-300 hover:scale-105 cursor-pointer">
              <img
                src={logoImage}
                alt="Syed Murtaza Ali Logo"
                className="w-full h-full object-contain filter brightness-110"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href, link.isRoute)}
                  className={`hover:text-cyan-400 transition-colors duration-200 nav-link ${
                    link.isRoute ? (location === link.href ? 'active text-cyan-400' : '') : 
                    (activeSection === link.href.substring(1) ? 'active text-cyan-400' : '')
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Theme Toggle & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-slate-800 dark:hover:bg-slate-700 transition-colors"
            >
              <i className={`${theme === 'light' ? 'fas fa-moon' : 'fas fa-sun'} text-xl`}></i>
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-slate-800 dark:hover:bg-slate-700 transition-colors"
            >
              <i className={`${isOpen ? 'fas fa-times' : 'fas fa-bars'} text-xl`}></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-900/95 backdrop-blur-lg dark:bg-slate-900/95">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href, link.isRoute)}
                className="block w-full text-left px-3 py-2 hover:text-cyan-400 transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
