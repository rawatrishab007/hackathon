import React, { useState } from 'react';
import { Github, Star, GitFork, Plus, Search } from 'lucide-react';
import { useData } from '../context/DataContext';

const ProjectBoard = () => {
  const { projects, addProject } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    addProject({
      title: formData.get('title'),
      description: formData.get('description'),
      githubUrl: formData.get('githubUrl'),
      tags: formData.get('tags').split(',').map(t => t.trim()),
      author: "Current User" // In real app, get from auth
    });
    setIsModalOpen(false);
  };

  const filteredProjects = projects.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Project Showcase</h2>
          <p className="text-slate-500">Discover and collaborate on student projects.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="vedam-button flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Upload Project
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
        <input 
          type="text" 
          placeholder="Search projects by title or technology..." 
          className="vedam-input pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map(project => (
          <div key={project.id} className="vedam-card p-6 flex flex-col h-full">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-blue-50 p-2 rounded-lg">
                <Github className="w-6 h-6 text-vedam-primary" />
              </div>
              <div className="flex items-center gap-1 text-slate-500 text-sm">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{project.likes}</span>
              </div>
            </div>

            <h3 className="text-lg font-bold text-slate-900 mb-2">{project.title}</h3>
            <p className="text-slate-500 text-sm mb-4 flex-grow">{project.description}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map(tag => (
                <span key={tag} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-md">
                  {tag}
                </span>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
              <span className="text-xs text-slate-400">By {project.author}</span>
              <a 
                href={project.githubUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm font-medium text-vedam-primary hover:underline"
              >
                View Repo →
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative animate-in fade-in zoom-in duration-200">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              ✕
            </button>
            
            <h3 className="text-xl font-bold mb-6">Upload Project</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Project Title</label>
                <input name="title" required className="vedam-input" placeholder="e.g. Library System" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                <textarea name="description" required className="vedam-input h-24" placeholder="What does your project do?"></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">GitHub Repository URL</label>
                <input name="githubUrl" type="url" required className="vedam-input" placeholder="https://github.com/..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Tags (comma separated)</label>
                <input name="tags" className="vedam-input" placeholder="React, Node.js, AI" />
              </div>
              <button type="submit" className="w-full vedam-button">
                Upload Project
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectBoard;
