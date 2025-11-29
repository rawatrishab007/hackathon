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

  module.exports = { initialProjects, initialDoubts };
