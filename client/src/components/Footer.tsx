export default function Footer() {
  const footerLinks = [
    { name: 'Privacy Policy', url: '#' },
    { name: 'Terms of Service', url: '#' },
    { name: 'Sitemap', url: '#' }
  ];

  return (
    <footer className="py-8 bg-slate-800/50 border-t border-slate-700 dark:bg-slate-800/50 dark:border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className="text-slate-400">
              &copy; 2024 Syed Murtaza Ali. All rights reserved.
            </p>
          </div>

          <div className="flex space-x-6">
            {footerLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                className="text-slate-400 hover:text-cyan-400 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
