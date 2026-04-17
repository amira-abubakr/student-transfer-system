import React from 'react';
import Navbar from './components/Navbar';
import { 
  ArrowRight, 
  GraduationCap, 
  Globe, 
  FileCheck, 
  ShieldCheck,
  TrendingUp,
  Clock
} from 'lucide-react';

const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-white pt-16 pb-32 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-12 lg:gap-8">
              <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
                <h1>
                  <span className="block text-sm font-semibold uppercase tracking-wide text-primary-600 sm:text-base lg:text-sm xl:text-base">
                    Next-Gen Education
                  </span>
                  <span className="mt-1 block text-4xl tracking-tight font-extrabold sm:text-5xl xl:text-6xl text-slate-900">
                    Distributed Student <span className="text-primary-600">Transfer System</span>
                  </span>
                </h1>
                <p className="mt-3 text-base text-slate-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                  Seamlessly transfer credits, manage admissions, and navigate your educational journey across multiple institutions with our blockchain-powered distributed system.
                </p>
                <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all">
                      Get Started
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </button>
                    <button className="inline-flex items-center px-6 py-3 border border-slate-200 text-base font-medium rounded-xl text-slate-700 bg-white hover:bg-slate-50 focus:outline-none transition-all">
                      View Institutions
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
                <div className="relative mx-auto w-full rounded-3xl shadow-2xl overflow-hidden aspect-video bg-slate-900 flex items-center justify-center">
                   <div className="absolute inset-0 bg-gradient-to-br from-primary-600/20 to-purple-600/20 mix-blend-overlay"></div>
                   <div className="flex flex-col items-center">
                      <div className="p-4 bg-white/10 backdrop-blur-md rounded-full mb-4">
                        <Globe className="w-12 h-12 text-white animate-pulse" />
                      </div>
                      <span className="text-white font-medium text-lg">Connecting Universities Worldwide</span>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-slate-50 py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">Core Features</h2>
              <p className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
                Everything you need for a smooth transfer
              </p>
            </div>

            <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <FeatureCard 
                icon={<FileCheck className="w-6 h-6" />}
                title="Verified Credentials"
                description="Securely store and share your academic records using tamper-proof digital certificates."
              />
              <FeatureCard 
                icon={<Clock className="w-6 h-6" />}
                title="Automated Credit Matching"
                description="Our AI-powered engine automatically matches your current credits with target university requirements."
              />
              <FeatureCard 
                icon={<ShieldCheck className="w-6 h-6" />}
                title="Secure Admission"
                description="End-to-end encrypted application process ensuring your private data remains protected."
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center text-slate-500">
          <div className="flex items-center mb-4 md:mb-0">
            <School className="h-6 w-6 text-primary-600 mr-2" />
            <span className="font-bold text-slate-900">EduTransfer</span>
          </div>
          <p>© 2024 EduTransfer System. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-primary-600">Terms</a>
            <a href="#" className="hover:text-primary-600">Privacy</a>
            <a href="#" className="hover:text-primary-600">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all border border-slate-100 group">
      <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600 mb-6 group-hover:bg-primary-600 group-hover:text-white transition-colors">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
      <p className="text-slate-500 leading-relaxed">
        {description}
      </p>
    </div>
  )
}

export default App;
