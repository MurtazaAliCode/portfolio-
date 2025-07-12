import Navigation from '@/components/Navigation';
import ResumeGenerator from '@/components/ResumeGenerator';
import Footer from '@/components/Footer';

export default function Resume() {
  return (
    <div className="min-h-screen bg-slate-900 dark:bg-slate-900 text-slate-50 overflow-x-hidden">
      <Navigation />
      <ResumeGenerator />
      <Footer />
    </div>
  );
}