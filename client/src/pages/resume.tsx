import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useState } from 'react';

export default function Resume() {
  const [showFullPreview, setShowFullPreview] = useState(false);

  const resumePath = "/Syed Murtaza Ali Resume.pdf";

  return (
    <div className="min-h-screen bg-slate-900 dark:bg-slate-900 text-slate-50 overflow-x-hidden">
      <Navigation />
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">My Resume</h1>

        <div className="flex flex-col md:flex-row justify-center items-start gap-8">
          {/* Small Preview and Buttons */}
          <div className="flex flex-col items-center md:w-1/3 lg:w-1/4">
            <div className="relative w-full h-63 mb-4 border border-gray-700 rounded-lg overflow-hidden">
              <iframe
                src={resumePath}
                title="Syed Murtaza Ali Resume Preview"
                className="w-full h-full border-0" // Removed transform, iframe fills parent
              />
            </div>
            <div className="flex flex-col space-y-4 w-full">
              <button
                onClick={() => setShowFullPreview(!showFullPreview)}
                className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
              >
                {showFullPreview ? 'Hide Preview' : 'Show Full Preview'}
              </button>
              <a
                href={resumePath}
                download="Syed Murtaza Ali Resume.pdf"
                className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200 inline-block"
              >
                Download Resume
              </a>
            </div>
          </div>

          {/* Full Preview Modal (Conditional) */}
          {showFullPreview && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
              <div className="relative w-11/12 h-5/6 bg-slate-800 rounded-lg p-4">
                <button
                  onClick={() => setShowFullPreview(false)}
                  className="absolute top-2 right-2 text-white bg-red-600 hover:bg-red-700 rounded-full p-2"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
                <iframe
                  src={resumePath}
                  title="Syed Murtaza Ali Full Resume"
                  className="w-full h-full border-0"
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}