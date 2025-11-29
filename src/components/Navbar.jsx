import React from 'react';
import { BookOpen, Code2, MessageSquare, Menu, X } from 'lucide-react';

const Navbar = ({ activeTab, setActiveTab }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('projects')}>
            <div className="bg-vedam-primary p-2 rounded-lg">
              <BookOpen className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 leading-none">Vedam</h1>
              <p className="text-xs text-slate-500 font-medium">School of Technology</p>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => setActiveTab('projects')}
              className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                activeTab === 'projects' ? 'text-vedam-primary' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Code2 className="w-4 h-4" />
              Projects
            </button>
            <button 
              onClick={() => setActiveTab('doubts')}
              className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                activeTab === 'doubts' ? 'text-vedam-primary' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              Doubt Portal
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white">
          <div className="container mx-auto px-4 py-4 space-y-2">
            <button 
              onClick={() => { setActiveTab('projects'); setIsMenuOpen(false); }}
              className={`w-full flex items-center gap-3 p-3 rounded-lg text-sm font-medium ${
                activeTab === 'projects' ? 'bg-blue-50 text-vedam-primary' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Code2 className="w-5 h-5" />
              Projects
            </button>
            <button 
              onClick={() => { setActiveTab('doubts'); setIsMenuOpen(false); }}
              className={`w-full flex items-center gap-3 p-3 rounded-lg text-sm font-medium ${
                activeTab === 'doubts' ? 'bg-blue-50 text-vedam-primary' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <MessageSquare className="w-5 h-5" />
              Doubt Portal
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
