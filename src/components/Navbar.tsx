import React from 'react';
import { School, UserCircle, LogIn, Menu } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <School className="h-8 w-8 text-primary-600" />
            <span className="ml-2 text-xl font-bold text-slate-900">EduTransfer</span>
            <div className="hidden md:ml-8 md:flex md:space-x-8">
              <a href="#" className="text-slate-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">Home</a>
              <a href="#" className="text-slate-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">Universities</a>
              <a href="#" className="text-slate-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">About</a>
              <a href="#" className="text-slate-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">Support</a>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="hidden md:flex items-center text-slate-600 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors">
              <LogIn className="w-4 h-4 mr-2" />
              Sign In
            </button>
            <button className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary-700 transition-all shadow-sm hover:shadow-md">
              Apply Now
            </button>
            <div className="md:hidden">
              <Menu className="h-6 w-6 text-slate-600" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
