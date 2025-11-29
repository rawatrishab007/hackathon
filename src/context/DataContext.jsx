import React, { createContext, useState, useContext, useEffect } from 'react';

// --- Mock Data (Replace with API calls later) ---
const initialProjects = [
  {
    id: 1,
    title: "Vedam Library System",
    description: "A digital library management system for the college.",
    githubUrl: "https://github.com/vedam-student/library-sys",
    author: "Rahul Kumar",
    tags: ["React", "Node.js"],
    likes: 12
  },
  {
    id: 2,
    title: "Campus Navigation App",
    description: "AR-based navigation for the Vedam campus.",
    githubUrl: "https://github.com/vedam-student/campus-nav",
    author: "Priya Singh",
    tags: ["Flutter", "ARKit"],
    likes: 25
  }
];

const initialDoubts = [
  {
    id: 1,
    subject: "Data Structures",
    question: "How does Dijkstra's algorithm handle negative weights?",
    author: "Amit Patel",
    answers: [
      { id: 101, text: "It doesn't! You should use Bellman-Ford for negative edges.", author: "Prof. Sharma" }
    ],
    resolved: true
  },
  {
    id: 2,
    subject: "Web Development",
    question: "Why is my React useEffect running twice?",
    author: "Sneha Gupta",
    answers: [],
    resolved: false
  }
];

// --- Context ---
const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [projects, setProjects] = useState(initialProjects);
  const [doubts, setDoubts] = useState(initialDoubts);

  // --- Actions (Backend-Ready) ---
  
  const addProject = (project) => {
    // TODO: Replace with API call
    // await fetch('/api/projects', { method: 'POST', body: JSON.stringify(project) })
    const newProject = { ...project, id: Date.now(), likes: 0 };
    setProjects([newProject, ...projects]);
  };

  const addDoubt = (doubt) => {
    // TODO: Replace with API call
    const newDoubt = { ...doubt, id: Date.now(), answers: [], resolved: false };
    setDoubts([newDoubt, ...doubts]);
  };

  const addAnswer = (doubtId, answerText) => {
    // TODO: Replace with API call
    setDoubts(doubts.map(d => {
      if (d.id === doubtId) {
        return {
          ...d,
          answers: [...d.answers, { id: Date.now(), text: answerText, author: "You" }]
        };
      }
      return d;
    }));
  };

  const value = {
    projects,
    doubts,
    addProject,
    addDoubt,
    addAnswer
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};
