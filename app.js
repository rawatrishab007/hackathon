const { useState, useEffect } = React;

// --- Icons (Inline SVGs) ---
const Icons = {
  GraduationCap: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
      <path d="M6 12v5c3 3 9 3 12 0v-5"/>
    </svg>
  ),
  Github: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
      <path d="M9 18c-4.51 2-5-2-7-2"/>
    </svg>
  ),
  Star: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  ),
  GitFork: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="18" r="3"/>
      <circle cx="6" cy="6" r="3"/>
      <circle cx="18" cy="6" r="3"/>
      <path d="M18 9v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9"/>
      <path d="M12 12v3"/>
    </svg>
  ),
  ExternalLink: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
      <polyline points="15 3 21 3 21 9"/>
      <line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  ),
  AlertCircle: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10"/>
      <line x1="12" y1="8" x2="12" y2="12"/>
      <line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
  ),
  MessageSquare: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  ),
  ChevronDown: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m6 9 6 6 6-6"/>
    </svg>
  ),
  ChevronUp: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m18 15-6-6-6 6"/>
    </svg>
  ),
  Send: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <line x1="22" y1="2" x2="11" y2="13"/>
      <polygon points="22 2 15 22 11 13 2 9 22 2"/>
    </svg>
  )
};

const { GraduationCap, Github, Star, GitFork, ExternalLink, AlertCircle, MessageSquare, ChevronDown, ChevronUp, Send } = Icons;

// --- Mock Data (Fallback) ---
const initialProjects = [
  {
    id: 1,
    title: "AI Study Buddy",
    description: "An AI-powered assistant that helps students summarize lecture notes and generate quizzes.",
    owner: "alex-dev",
    tags: ["React", "OpenAI", "Node.js"],
    githubUrl: "https://github.com/facebook/react",
    helpNeeded: true,
    stats: { stars: 0, forks: 0 }
  },
  {
    id: 2,
    title: "Campus Marketplace",
    description: "Buy and sell used textbooks and dorm essentials within the campus network.",
    owner: "sarah-codes",
    tags: ["Vue", "Firebase", "Tailwind"],
    githubUrl: "https://github.com/vuejs/core",
    helpNeeded: false,
    stats: { stars: 0, forks: 0 }
  },
  {
    id: 3,
    title: "AlgoVisualizer",
    description: "Visualizing sorting and pathfinding algorithms for CS students.",
    owner: "algo-master",
    tags: ["D3.js", "React", "Algorithms"],
    githubUrl: "https://github.com/d3/d3",
    helpNeeded: true,
    stats: { stars: 0, forks: 0 }
  },
  {
    id: 4,
    title: "NoteShare",
    description: "A collaborative platform for sharing handwritten notes.",
    owner: "note-taker",
    tags: ["React Native", "Express", "MongoDB"],
    githubUrl: "https://github.com/facebook/react-native",
    helpNeeded: true,
    stats: { stars: 0, forks: 0 }
  }
];

const initialDoubts = [
  {
    id: 1,
    subject: "CS",
    question: "How does useEffect dependency array work exactly?",
    status: "Resolved",
    comments: [
      { id: 1, author: "SeniorDev", text: "It runs the effect whenever any value in the array changes." },
      { id: 2, author: "Newbie", text: "Thanks! That makes sense." }
    ]
  },
  {
    id: 2,
    subject: "Math",
    question: "Can someone explain Eigenvalues in simple terms?",
    status: "Unresolved",
    comments: []
  },
  {
    id: 3,
    subject: "Physics",
    question: "Help with Quantum Mechanics wave function collapse.",
    status: "Unresolved",
    comments: [
      { id: 1, author: "PhysicsGeek", text: "It's complicated..." }
    ]
  },
  {
    id: 4,
    subject: "CS",
    question: "Best way to center a div?",
    status: "Resolved",
    comments: [
      { id: 1, author: "CSSWizard", text: "Flexbox or Grid!" }
    ]
  }
];

// --- Components ---

const Navbar = ({ activeTab, setActiveTab, backendStatus }) => {
  const [githubUser, setGithubUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('campusCollab_githubUser');
    if (storedUser) setGithubUser(storedUser);
  }, []);

  const handleConnectGithub = () => {
    const username = prompt("Enter your GitHub username:");
    if (username) {
      localStorage.setItem('campusCollab_githubUser', username);
      setGithubUser(username);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('projects')}>
            <div className="p-2 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-lg">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              CampusCollab
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => setActiveTab('projects')}
              className={`text-sm font-medium transition-colors ${
                activeTab === 'projects' ? 'text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Projects
            </button>
            <button
              onClick={() => setActiveTab('doubts')}
              className={`text-sm font-medium transition-colors ${
                activeTab === 'doubts' ? 'text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Doubt Portal
            </button>
          </div>

          <div className="flex items-center gap-4">
             {/* Connection Status Indicator */}
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${
              backendStatus === 'connected' 
                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
                : 'bg-amber-500/10 border-amber-500/20 text-amber-400'
            }`}>
              <div className={`w-2 h-2 rounded-full ${
                backendStatus === 'connected' ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
              }`} />
              {backendStatus === 'connected' ? 'Live Database' : 'Local Mode'}
            </div>

            <button 
              onClick={handleConnectGithub}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all rounded-full border ${
                githubUser 
                  ? 'bg-violet-600/10 border-violet-500/20 text-violet-400 hover:bg-violet-600/20' 
                  : 'text-white bg-white/5 hover:bg-white/10 border-white/10'
              }`}
            >
              <Github className="w-4 h-4" />
              <span>{githubUser ? githubUser : 'Connect GitHub'}</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

const ProjectCard = ({ project, currentUserId, onDelete }) => {
  const [stats, setStats] = useState({ stars: 0, forks: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGithubStats = async () => {
      try {
        const parts = project.githubUrl.split('/');
        const owner = parts[parts.length - 2];
        const repo = parts[parts.length - 1];

        if (owner && repo) {
          const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
          if (response.ok) {
            const data = await response.json();
            setStats({ stars: data.stargazers_count, forks: data.forks_count });
          }
        }
      } catch (error) {
        console.error('Failed to fetch GitHub stats', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGithubStats();
  }, [project.githubUrl]);

  const handleCollaborate = () => {
    if (project.githubUrl) {
      const title = encodeURIComponent(`Collaboration Request: ${project.title}`);
      const body = encodeURIComponent(`Hi, I'm interested in collaborating on your project "${project.title}".\n\nMy skills include: [Your Skills Here]\n\nI'd like to help with...`);
      const issueUrl = `${project.githubUrl}/issues/new?title=${title}&body=${body}`;
      window.open(issueUrl, '_blank');
    } else {
      alert(`This project doesn't have a GitHub repository linked.`);
    }
  };

  const isOwner = currentUserId && project.ownerId === currentUserId;

  return (
    <div className="group relative flex flex-col h-full p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-white group-hover:text-violet-400 transition-colors">
            {project.title}
          </h3>
          <p className="text-sm text-slate-400">
            by <a href={project.User?.githubUrl || `https://github.com/${project.User?.username || project.owner}`} target="_blank" rel="noopener noreferrer" className="hover:text-violet-400 transition-colors">@{project.owner}</a>
          </p>
        </div>
        {project.helpNeeded && (
          <span className="px-2 py-1 text-xs font-medium text-amber-300 bg-amber-500/10 border border-amber-500/20 rounded-full flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            Help Needed
          </span>
        )}
      </div>

      <p className="text-slate-300 text-sm mb-6 flex-grow">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-6">
        {project.tags.map((tag, index) => (
          <span key={index} className="px-2 py-1 text-xs text-slate-300 bg-slate-800 rounded-md border border-slate-700">
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
        <div className="flex items-center gap-4 text-slate-400 text-sm">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4" />
            <span>{loading ? '-' : stats.stars}</span>
          </div>
          <div className="flex items-center gap-1">
            <GitFork className="w-4 h-4" />
            <span>{loading ? '-' : stats.forks}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isOwner && (
            <button
              onClick={() => onDelete(project.id)}
              className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
              title="Delete Project"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
            </button>
          )}
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
          <button
            onClick={handleCollaborate}
            className="px-3 py-1.5 text-sm font-medium text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 rounded-lg shadow-lg shadow-indigo-500/20 transition-all"
          >
            Collaborate
          </button>
        </div>
      </div>
    </div>
  );
};

const DoubtPortal = ({ doubts, currentUserId, onDelete, onAddComment }) => {
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [expandedDoubtId, setExpandedDoubtId] = useState(null);
  const [newComment, setNewComment] = useState('');

  const subjects = ['All', 'CS', 'Math', 'Physics'];

  const filteredDoubts = selectedSubject === 'All'
    ? doubts
    : doubts.filter(d => d.subject === selectedSubject);

  const toggleExpand = (id) => {
    setExpandedDoubtId(expandedDoubtId === id ? null : id);
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 h-[calc(100vh-100px)]">
      <div className="w-full md:w-64 flex-shrink-0">
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 sticky top-24">
          <h3 className="text-lg font-semibold text-white mb-4 px-2">Subjects</h3>
          <div className="space-y-2">
            {subjects.map(subject => (
              <button
                key={subject}
                onClick={() => setSelectedSubject(subject)}
                className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                  selectedSubject === subject
                    ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/20'
                    : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                }`}
              >
                {subject}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 pb-20">
        <div className="space-y-4">
          {filteredDoubts.map(doubt => (
            <div
              key={doubt.id}
              className={`bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl transition-all duration-300 ${
                expandedDoubtId === doubt.id ? 'bg-white/10 border-white/20 ring-1 ring-white/20' : 'hover:bg-white/10'
              }`}
            >
              <div
                onClick={() => toggleExpand(doubt.id)}
                className="p-6 cursor-pointer"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${
                        doubt.status === 'Resolved'
                          ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
                          : 'text-amber-400 bg-amber-500/10 border-amber-500/20'
                      }`}>
                        {doubt.status}
                      </span>
                      <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                        {doubt.subject}
                      </span>
                    </div>
                    <h3 className="text-lg font-medium text-slate-200 leading-snug">
                      {doubt.question}
                    </h3>
                  </div>
                  <div className="text-slate-500">
                    {expandedDoubtId === doubt.id ? <ChevronUp /> : <ChevronDown />}
                  </div>
                </div>

                  <div className="flex items-center gap-4 mt-4 text-slate-500 text-sm">
                  <div className="flex items-center gap-1">
                    <MessageSquare className="w-4 h-4" />
                    <span>{doubt.comments.length} comments</span>
                  </div>
                  {currentUserId && doubt.userId === currentUserId && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(doubt.id);
                      }}
                      className="text-red-400 hover:text-red-300 hover:bg-red-500/10 px-2 py-1 rounded transition-colors text-xs"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>

              {expandedDoubtId === doubt.id && (
                <div className="px-6 pb-6 pt-2 border-t border-white/5">
                  <div className="space-y-4 mt-4">
                    {doubt.comments.length > 0 ? (
                      doubt.comments.map(comment => (
                        <div key={comment.id} className="flex gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-700 to-slate-600 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                            {comment.author[0]}
                          </div>
                          <div className="bg-slate-800/50 rounded-r-xl rounded-bl-xl p-3 text-sm text-slate-300 flex-1">
                            <span className="block text-xs text-slate-500 font-semibold mb-1">{comment.author}</span>
                            {comment.text}
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-slate-500 text-sm italic text-center py-4">No comments yet. Be the first to help!</p>
                    )}
                  </div>

                  <div className="mt-6 flex gap-2">
                    <input
                      type="text"
                      placeholder="Write a solution..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && newComment.trim()) {
                          onAddComment(doubt.id, newComment);
                          setNewComment('');
                        }
                      }}
                      className="flex-1 bg-slate-900/50 border border-white/10 rounded-lg px-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all"
                    />
                    <button 
                      onClick={() => {
                        if (newComment.trim()) {
                          onAddComment(doubt.id, newComment);
                          setNewComment('');
                        }
                      }}
                      className="p-2 bg-violet-600 hover:bg-violet-500 text-white rounded-lg transition-colors">
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- Configuration ---
// CHANGE THIS URL if you deploy your backend (e.g., to Render or using Ngrok)
// Example: const API_BASE_URL = 'https://my-backend.onrender.com';
// --- Configuration ---
// CHANGE THIS URL if you deploy your backend (e.g., to Render or using Ngrok)
// Example: const API_BASE_URL = 'https://my-backend.onrender.com';
const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.protocol === 'file:'
  ? 'http://localhost:3000'
  : 'https://unwaved-birgit-heterologous.ngrok-free.dev'; 

const Login = ({ onLogin, onSwitchToSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const res = await fetch(`${API_BASE_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'ngrok-skip-browser-warning': 'true' },
        body: JSON.stringify({ email, password })
      });
      
      const data = await res.json();
      if (res.ok) {
        onLogin(data);
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 p-4">
      <div className="w-full max-w-md bg-slate-800/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
        <h2 className="text-3xl font-bold text-white mb-2 text-center">Welcome Back</h2>
        <p className="text-slate-400 text-center mb-8">Sign in to continue to CampusCollab</p>
        
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all"
              placeholder="you@university.edu"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold py-3 px-4 rounded-lg transition-all shadow-lg shadow-indigo-500/20 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-400">
          Don't have an account?{' '}
          <button onClick={onSwitchToSignup} className="text-violet-400 hover:text-violet-300 font-medium transition-colors">
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
};

const Signup = ({ onSignup, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    githubUrl: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const res = await fetch(`${API_BASE_URL}/api/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'ngrok-skip-browser-warning': 'true' },
        body: JSON.stringify(formData)
      });
      
      const data = await res.json();
      if (res.ok) {
        onSignup(data);
      } else {
        setError(data.error || 'Signup failed');
      }
    } catch (err) {
      setError('Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 p-4">
      <div className="w-full max-w-md bg-slate-800/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
        <h2 className="text-3xl font-bold text-white mb-2 text-center">Create Account</h2>
        <p className="text-slate-400 text-center mb-8">Join the CampusCollab community</p>
        
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Username</label>
            <input 
              type="text" 
              required
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
              className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all"
              placeholder="johndoe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Email Address</label>
            <input 
              type="email" 
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all"
              placeholder="you@university.edu"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Password</label>
            <input 
              type="password" 
              required
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">GitHub Profile (Optional)</label>
            <input 
              type="url" 
              value={formData.githubUrl}
              onChange={(e) => setFormData({...formData, githubUrl: e.target.value})}
              className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all"
              placeholder="https://github.com/johndoe"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold py-3 px-4 rounded-lg transition-all shadow-lg shadow-indigo-500/20 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-400">
          Already have an account?{' '}
          <button onClick={onSwitchToLogin} className="text-violet-400 hover:text-violet-300 font-medium transition-colors">
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

const ProjectModal = ({ isOpen, onClose, onSubmit, githubUser }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: '',
    githubUrl: '',
    helpNeeded: false
  });
  const [repos, setRepos] = useState([]);
  const [loadingRepos, setLoadingRepos] = useState(false);

  useEffect(() => {
    if (isOpen && githubUser) {
      fetchRepos();
    }
  }, [isOpen, githubUser]);

  const fetchRepos = async () => {
    setLoadingRepos(true);
    try {
      const res = await fetch(`https://api.github.com/users/${githubUser}/repos?sort=updated&per_page=100`);
      if (res.ok) {
        const data = await res.json();
        setRepos(data);
      }
    } catch (error) {
      console.error("Failed to fetch repos", error);
    } finally {
      setLoadingRepos(false);
    }
  };

  const handleRepoSelect = (e) => {
    const repoId = e.target.value;
    if (!repoId) return;
    
    const repo = repos.find(r => r.id.toString() === repoId);
    if (repo) {
      setFormData({
        ...formData,
        title: repo.name,
        description: repo.description || '',
        githubUrl: repo.html_url,
        tags: repo.language ? repo.language : ''
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      tags: formData.tags.split(',').map(t => t.trim()).filter(t => t),
      owner: githubUser || 'me' // Use GitHub username if available
    });
    onClose();
    setFormData({ title: '', description: '', tags: '', githubUrl: '', helpNeeded: false });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-md p-6 shadow-2xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
        
        <h2 className="text-2xl font-bold text-white mb-6">Post New Project</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {githubUser && (
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Import from GitHub</label>
              <select 
                onChange={handleRepoSelect}
                className="w-full bg-slate-800 border border-white/10 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-violet-500 outline-none"
              >
                <option value="">Select a repository...</option>
                {loadingRepos ? (
                  <option disabled>Loading...</option>
                ) : (
                  repos.map(repo => (
                    <option key={repo.id} value={repo.id}>{repo.name}</option>
                  ))
                )}
              </select>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Project Title</label>
            <input 
              required
              type="text" 
              value={formData.title}
              onChange={e => setFormData({...formData, title: e.target.value})}
              className="w-full bg-slate-800 border border-white/10 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-violet-500 outline-none"
              placeholder="e.g. AI Study Buddy"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Description</label>
            <textarea 
              required
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
              className="w-full bg-slate-800 border border-white/10 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-violet-500 outline-none h-24 resize-none"
              placeholder="Describe your project..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Tags (comma separated)</label>
              <input 
                type="text" 
                value={formData.tags}
                onChange={e => setFormData({...formData, tags: e.target.value})}
                className="w-full bg-slate-800 border border-white/10 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-violet-500 outline-none"
                placeholder="React, Node.js"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">GitHub URL</label>
              <input 
                type="url" 
                value={formData.githubUrl}
                onChange={e => setFormData({...formData, githubUrl: e.target.value})}
                className="w-full bg-slate-800 border border-white/10 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-violet-500 outline-none"
                placeholder="https://github.com/..."
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input 
              type="checkbox" 
              id="helpNeeded"
              checked={formData.helpNeeded}
              onChange={e => setFormData({...formData, helpNeeded: e.target.checked})}
              className="w-4 h-4 rounded border-white/10 bg-slate-800 text-violet-600 focus:ring-violet-500"
            />
            <label htmlFor="helpNeeded" className="text-sm text-slate-300">Help Needed</label>
          </div>

          <button 
            type="submit"
            className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold py-2 px-4 rounded-lg transition-all shadow-lg shadow-indigo-500/20 mt-2"
          >
            Post Project
          </button>
        </form>
      </div>
    </div>
  );
}; 

function App() {
  const [user, setUser] = useState(null);
  const [authView, setAuthView] = useState('login'); // 'login' or 'signup'
  const [activeTab, setActiveTab] = useState('projects');
  const [projects, setProjects] = useState([]);
  const [doubts, setDoubts] = useState([]);
  const [backendStatus, setBackendStatus] = useState('checking');
  const [backendError, setBackendError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [githubUser, setGithubUser] = useState(null);

  const getGithubUsername = (user) => {
    if (user.githubUrl) {
      try {
        const url = new URL(user.githubUrl);
        const pathParts = url.pathname.split('/').filter(p => p);
        if (pathParts.length > 0) return pathParts[0];
      } catch (e) {
        console.log('Invalid GitHub URL', e);
      }
    }
    return user.username;
  };

  useEffect(() => {
    // Check for stored user
    const storedUser = localStorage.getItem('campusCollab_user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      
      // Try to get GitHub user from stored preference first, then derived from user
      const storedGithubUser = localStorage.getItem('campusCollab_githubUser');
      setGithubUser(storedGithubUser || getGithubUsername(parsedUser));
    }

    const initData = async () => {
      try {
        const headers = { 
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true' 
        };

        // Try connecting to Backend
        const projectsRes = await fetch(`${API_BASE_URL}/api/projects`, { headers });
        if (!projectsRes.ok) throw new Error('Backend offline');
        
        const projectsData = await projectsRes.json();
        const doubtsRes = await fetch(`${API_BASE_URL}/api/doubts`, { headers });
        
        if (!doubtsRes.ok) throw new Error('Doubts fetch failed');
        const doubtsData = await doubtsRes.json();

        setProjects(projectsData);
        setDoubts(doubtsData);
        setBackendStatus('connected');
        console.log(`Connected to Backend at ${API_BASE_URL}`);
      } catch (err) {
        console.log('Backend offline or blocked, switching to Browser Database (LocalStorage)', err);
        setBackendStatus('disconnected');
        setBackendError(err.message);
        
        // Fallback to LocalStorage
        const storedProjects = localStorage.getItem('campusCollab_projects');
        const storedDoubts = localStorage.getItem('campusCollab_doubts');

        if (storedProjects) setProjects(JSON.parse(storedProjects));
        else {
          setProjects(initialProjects);
          localStorage.setItem('campusCollab_projects', JSON.stringify(initialProjects));
        }

        if (storedDoubts) setDoubts(JSON.parse(storedDoubts));
        else {
          setDoubts(initialDoubts);
          localStorage.setItem('campusCollab_doubts', JSON.stringify(initialDoubts));
        }
      }
    };

    initData();
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('campusCollab_user', JSON.stringify(userData));
    const ghUser = getGithubUsername(userData);
    setGithubUser(ghUser);
    localStorage.setItem('campusCollab_githubUser', ghUser);
  };

  const handleSignup = (userData) => {
    setUser(userData);
    localStorage.setItem('campusCollab_user', JSON.stringify(userData));
    const ghUser = getGithubUsername(userData);
    setGithubUser(ghUser);
    localStorage.setItem('campusCollab_githubUser', ghUser);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('campusCollab_user');
    setGithubUser(null);
    localStorage.removeItem('campusCollab_githubUser');
  };

  const handleConnectGithub = () => {
    const username = prompt("Enter your GitHub username:", githubUser || "");
    if (username) {
      setGithubUser(username);
      localStorage.setItem('campusCollab_githubUser', username);
    }
  };

  // Helper to save projects (Hybrid)
  const addProject = async (newProject) => {
    const projectWithMeta = { ...newProject, ownerId: user ? user.id : 'local' };

    if (backendStatus === 'connected') {
      try {
        const res = await fetch(`${API_BASE_URL}/api/projects`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true'
          },
          body: JSON.stringify(projectWithMeta)
        });
        if (res.ok) {
          const savedProject = await res.json();
          console.log('Project saved to backend:', savedProject);
          alert('Project posted successfully!');
          setProjects(prev => [...prev, savedProject]);
        } else {
          const errorData = await res.json();
          console.error('Backend failed to save project:', errorData);
          alert(`Failed to post project: ${errorData.error}`);
        }
      } catch (err) {
        console.error('Failed to save to backend:', err);
        alert(`Network error: ${err.message}`);
      }
    } else {
      // LocalStorage Fallback
      const projectWithId = { ...projectWithMeta, id: Date.now(), stats: { stars: 0, forks: 0 } };
      const updatedProjects = [...projects, projectWithId];
      setProjects(updatedProjects);
      localStorage.setItem('campusCollab_projects', JSON.stringify(updatedProjects));
    }
  };

  // Helper to delete projects (Hybrid)
  const deleteProject = async (projectId) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    if (backendStatus === 'connected') {
      try {
        const res = await fetch(`${API_BASE_URL}/api/projects/${projectId}`, {
          method: 'DELETE',
          headers: { 'ngrok-skip-browser-warning': 'true' }
        });
        if (res.ok) {
          setProjects(prev => prev.filter(p => p.id !== projectId));
        }
      } catch (err) {
        console.error('Failed to delete from backend:', err);
      }
    } else {
      // LocalStorage Fallback
      const updatedProjects = projects.filter(p => p.id !== projectId);
      setProjects(updatedProjects);
      localStorage.setItem('campusCollab_projects', JSON.stringify(updatedProjects));
    }
  };

  // Helper to save doubts (Hybrid)
  const addDoubt = async (newDoubt) => {
    const doubtWithMeta = { ...newDoubt, userId: user ? user.id : 'local' };

    if (backendStatus === 'connected') {
      try {
        const res = await fetch(`${API_BASE_URL}/api/doubts`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true'
          },
          body: JSON.stringify(doubtWithMeta)
        });
        if (res.ok) {
          const savedDoubt = await res.json();
          setDoubts(prev => [...prev, savedDoubt]);
        }
      } catch (err) {
        console.error('Failed to save to backend:', err);
      }
    } else {
      // LocalStorage Fallback
      const doubtWithId = { ...doubtWithMeta, id: Date.now(), status: 'Unresolved', comments: [] };
      const updatedDoubts = [...doubts, doubtWithId];
      setDoubts(updatedDoubts);
      localStorage.setItem('campusCollab_doubts', JSON.stringify(updatedDoubts));
    }
  };

  // Helper to delete doubts (Hybrid)
  const deleteDoubt = async (doubtId) => {
    if (!confirm('Are you sure you want to delete this doubt?')) return;

    if (backendStatus === 'connected') {
      try {
        const res = await fetch(`${API_BASE_URL}/api/doubts/${doubtId}`, {
          method: 'DELETE',
          headers: { 'ngrok-skip-browser-warning': 'true' }
        });
        if (res.ok) {
          setDoubts(prev => prev.filter(d => d.id !== doubtId));
        }
      } catch (err) {
        console.error('Failed to delete doubt from backend:', err);
      }
    } else {
      // LocalStorage Fallback
      const updatedDoubts = doubts.filter(d => d.id !== doubtId);
      setDoubts(updatedDoubts);
      localStorage.setItem('campusCollab_doubts', JSON.stringify(updatedDoubts));
    }
  };

  // Helper to add comments (Hybrid)
  const addComment = async (doubtId, text) => {
    console.log('addComment called with:', doubtId, text);
    const commentData = { author: user ? user.username : 'Anonymous', text, userId: user ? user.id : null };
    console.log('commentData:', commentData);
    console.log('backendStatus:', backendStatus);

    if (backendStatus === 'connected') {
      try {
        const res = await fetch(`${API_BASE_URL}/api/doubts/${doubtId}/comments`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true'
          },
          body: JSON.stringify(commentData)
        });
        if (res.ok) {
          const savedComment = await res.json();
          setDoubts(prev => prev.map(d => {
            if (d.id === doubtId) {
              return { ...d, comments: [...d.comments, savedComment] };
            }
            return d;
          }));
        }
      } catch (err) {
        console.error('Failed to add comment to backend:', err);
        alert('Failed to add comment: ' + err.message);
      }
    } else {
      // LocalStorage Fallback
      const newComment = { ...commentData, id: Date.now() };
      const updatedDoubts = doubts.map(d => {
        if (d.id === doubtId) {
          return { ...d, comments: [...d.comments, newComment] };
        }
        return d;
      });
      setDoubts(updatedDoubts);
      localStorage.setItem('campusCollab_doubts', JSON.stringify(updatedDoubts));
    }
  };

  if (!user) {
    return authView === 'login' 
      ? <Login onLogin={handleLogin} onSwitchToSignup={() => setAuthView('signup')} />
      : <Signup onSignup={handleSignup} onSwitchToLogin={() => setAuthView('login')} />;
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans selection:bg-violet-500/30">
      <div className="fixed inset-0 opacity-20 pointer-events-none z-0" style={{backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")'}}></div>
      <div className="fixed top-[-20%] right-[-10%] w-[600px] h-[600px] bg-violet-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="fixed bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      
      <ProjectModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={addProject}
        githubUser={githubUser}
      />

      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('projects')}>
              <div className="p-2 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-lg">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                CampusCollab
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => setActiveTab('projects')}
                className={`text-sm font-medium transition-colors ${
                  activeTab === 'projects' ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Projects
              </button>
              <button
                onClick={() => setActiveTab('doubts')}
                className={`text-sm font-medium transition-colors ${
                  activeTab === 'doubts' ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Doubt Portal
              </button>
            </div>

            <div className="flex items-center gap-4">
               {/* Connection Status Indicator */}
              <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${
                backendStatus === 'connected' 
                  ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
                  : 'bg-amber-500/10 border-amber-500/20 text-amber-400'
              }`}>
                <div className={`w-2 h-2 rounded-full ${
                  backendStatus === 'connected' ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
                }`} />
                {backendStatus === 'connected' ? 'Live Database' : 'Local Mode'}
              </div>
              {backendStatus !== 'connected' && (
                <span className="text-xs text-red-400 ml-2" title={backendError}>
                  ({backendError || 'Connection Failed'})
                </span>
              )}

              <div className="flex items-center gap-3">
                <button 
                  onClick={handleConnectGithub}
                  className={`flex items-center gap-2 px-3 py-1 text-xs font-medium transition-all rounded-full border ${
                    githubUser 
                      ? 'bg-violet-600/10 border-violet-500/20 text-violet-400 hover:bg-violet-600/20' 
                      : 'text-slate-400 bg-white/5 hover:bg-white/10 border-white/10'
                  }`}
                  title={githubUser ? `Connected as ${githubUser}` : "Connect GitHub"}
                >
                  <Github className="w-3 h-3" />
                  <span className="hidden sm:inline">{githubUser || 'Connect'}</span>
                </button>

                <span className="text-sm text-slate-300">@{user.username}</span>
                <button 
                  onClick={handleLogout}
                  className="text-xs text-red-400 hover:text-red-300 border border-red-500/20 px-2 py-1 rounded hover:bg-red-500/10 transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        {activeTab === 'projects' ? (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-white">Project Marketplace</h2>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 text-sm font-medium text-white bg-white/10 hover:bg-white/15 border border-white/10 rounded-lg transition-all">
                + Post Project
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map(project => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  currentUserId={user.id}
                  onDelete={deleteProject}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-white">Doubt Portal</h2>
              <button 
                onClick={() => {
                  const question = prompt('Your Question:');
                  if (question) addDoubt({ subject: 'General', question });
                }}
                className="px-4 py-2 text-sm font-medium text-white bg-white/10 hover:bg-white/15 border border-white/10 rounded-lg transition-all">
                + Ask Question
              </button>
            </div>
            <DoubtPortal 
              doubts={doubts} 
              currentUserId={user.id}
              onDelete={deleteDoubt}
              onAddComment={addComment}
            />
          </div>
        )}
      </main>

      <footer className="mt-12 py-6 text-center text-slate-500 text-sm border-t border-white/5">
        <p>© 2025 CampusCollab. All rights reserved.</p>
        <a href="/admin.html" className="mt-2 inline-block text-slate-600 hover:text-slate-400 transition-colors text-xs">
          Admin Panel
        </a>
      </footer>
    </div>
  );
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white p-8">
          <div className="max-w-2xl w-full bg-slate-800 p-6 rounded-xl border border-red-500/50">
            <h1 className="text-2xl font-bold text-red-400 mb-4">Something went wrong.</h1>
            <p className="mb-4 text-slate-300">Please report this error to the developer:</p>
            <pre className="bg-black/50 p-4 rounded text-sm text-red-300 overflow-auto whitespace-pre-wrap">
              {this.state.error && this.state.error.toString()}
              <br />
              {this.state.errorInfo && this.state.errorInfo.componentStack}
            </pre>
            <button 
              onClick={() => window.location.reload()}
              className="mt-6 px-4 py-2 bg-violet-600 hover:bg-violet-500 rounded-lg transition-colors"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children; 
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
