import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ProjectBoard from './components/ProjectBoard';
import DoubtPortal from './components/DoubtPortal';

function App() {
  const [activeTab, setActiveTab] = useState('projects');

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="container mx-auto px-4 py-8">
        {activeTab === 'projects' && <ProjectBoard />}
        {activeTab === 'doubts' && <DoubtPortal />}
      </main>
    </div>
  );
}

export default App;
