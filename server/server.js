const express = require('express');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// --- Database Setup ---
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, 'database.sqlite'),
  logging: false
});

// --- Models ---
const User = sequelize.define('User', {
  username: { type: DataTypes.STRING, unique: true, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  githubUrl: { type: DataTypes.STRING }
});

const Project = sequelize.define('Project', {
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  owner: { type: DataTypes.STRING }, // Keeping simple string for now, could be linked to User
  tags: { 
    type: DataTypes.STRING, 
    get() {
      const rawValue = this.getDataValue('tags');
      return rawValue ? JSON.parse(rawValue) : [];
    },
    set(value) {
      this.setDataValue('tags', JSON.stringify(value));
    }
  },
  githubUrl: { type: DataTypes.STRING },
  helpNeeded: { type: DataTypes.BOOLEAN, defaultValue: false }
});

const Doubt = sequelize.define('Doubt', {
  subject: { type: DataTypes.STRING },
  question: { type: DataTypes.TEXT, allowNull: false },
  status: { type: DataTypes.ENUM('Resolved', 'Unresolved'), defaultValue: 'Unresolved' }
});

const Comment = sequelize.define('Comment', {
  author: { type: DataTypes.STRING },
  text: { type: DataTypes.TEXT }
});

// Relationships
Doubt.hasMany(Comment, { as: 'comments' });
Comment.belongsTo(Doubt);

// --- Initialization ---
const initDb = async () => {
  try {
    await sequelize.sync(); // Use { force: true } to reset DB
    console.log('Database synced');
    
    // Seed data if empty
    const projectCount = await Project.count();
    if (projectCount === 0) {
      await Project.bulkCreate([
        {
          title: "AI Study Buddy",
          description: "An AI-powered assistant that helps students summarize lecture notes and generate quizzes.",
          owner: "alex-dev",
          tags: ["React", "OpenAI", "Node.js"],
          githubUrl: "https://github.com/facebook/react",
          helpNeeded: true
        },
        {
          title: "Campus Marketplace",
          description: "Buy and sell used textbooks and dorm essentials within the campus network.",
          owner: "sarah-codes",
          tags: ["Vue", "Firebase", "Tailwind"],
          githubUrl: "https://github.com/vuejs/core",
          helpNeeded: false
        }
      ]);
    }
  } catch (err) {
    console.error('Failed to sync db:', err);
  }
};

initDb();

// --- API Endpoints ---

// Projects
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.findAll();
    // Add dummy stats since we don't store them
    const projectsWithStats = projects.map(p => ({
      ...p.toJSON(),
      stats: { stars: 0, forks: 0 }
    }));
    res.json(projectsWithStats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/projects', async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Doubts
app.get('/api/doubts', async (req, res) => {
  try {
    const doubts = await Doubt.findAll({
      include: [{ model: Comment, as: 'comments' }]
    });
    res.json(doubts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/doubts', async (req, res) => {
  try {
    const doubt = await Doubt.create(req.body);
    // Return with empty comments array to match frontend expectation
    res.status(201).json({ ...doubt.toJSON(), comments: [] });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post('/api/doubts/:id/comments', async (req, res) => {
  try {
    const doubt = await Doubt.findByPk(req.params.id);
    if (!doubt) return res.status(404).json({ error: 'Doubt not found' });
    
    const comment = await Comment.create({
      ...req.body,
      DoubtId: doubt.id
    });
    res.status(201).json(comment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Users (Basic placeholder)
app.post('/api/users', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
