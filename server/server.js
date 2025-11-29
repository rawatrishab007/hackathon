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
const bcrypt = require('bcryptjs');

// --- Models ---
const User = sequelize.define('User', {
  username: { type: DataTypes.STRING, unique: true, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false }, // Hashed password
  githubUrl: { type: DataTypes.STRING }
});

const Project = sequelize.define('Project', {
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  owner: { type: DataTypes.STRING }, // Username of the owner
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
  helpNeeded: { type: DataTypes.BOOLEAN, defaultValue: false },
  ownerId: { type: DataTypes.INTEGER } // ID of the User
});

const Doubt = sequelize.define('Doubt', {
  subject: { type: DataTypes.STRING },
  question: { type: DataTypes.TEXT, allowNull: false },
  status: { type: DataTypes.ENUM('Resolved', 'Unresolved'), defaultValue: 'Unresolved' },
  userId: { type: DataTypes.INTEGER } // ID of the User
});

const Comment = sequelize.define('Comment', {
  author: { type: DataTypes.STRING },
  text: { type: DataTypes.TEXT },
  userId: { type: DataTypes.INTEGER } // ID of the User
});

// Relationships
User.hasMany(Project, { foreignKey: 'ownerId' });
Project.belongsTo(User, { foreignKey: 'ownerId' });

User.hasMany(Doubt, { foreignKey: 'userId' });
Doubt.belongsTo(User, { foreignKey: 'userId' });

Doubt.hasMany(Comment, { as: 'comments' });
Comment.belongsTo(Doubt);

// --- Initialization ---
const initDb = async () => {
  try {
    await sequelize.sync({ alter: true }); // Update schema without deleting data
    console.log('Database synced');

    // Seed Projects if empty
    const projectCount = await Project.count();
    if (projectCount === 0) {
      await Project.bulkCreate([
        {
          title: "AI Study Buddy",
          description: "An AI-powered assistant that helps students summarize lecture notes and generate quizzes.",
          owner: "alex-dev",
          tags: ["React", "OpenAI", "Node.js"],
          githubUrl: "https://github.com/facebook/react",
          helpNeeded: true,
          ownerId: 1 // Assuming user 1 exists or will exist
        },
        {
          title: "Campus Marketplace",
          description: "Buy and sell used textbooks and dorm essentials within the campus network.",
          owner: "sarah-codes",
          tags: ["Vue", "Firebase", "Tailwind"],
          githubUrl: "https://github.com/vuejs/core",
          helpNeeded: false,
          ownerId: 1
        }
      ]);
      console.log('Seeded Projects');
    }

    // Seed Doubts if empty
    const doubtCount = await Doubt.count();
    if (doubtCount === 0) {
      const doubt = await Doubt.create({
        subject: "CS",
        question: "How does useEffect dependency array work exactly?",
        status: "Resolved",
        userId: 1
      });
      
      await Comment.create({
        author: "SeniorDev",
        text: "It runs the effect whenever any value in the array changes.",
        DoubtId: doubt.id,
        userId: 2
      });
      console.log('Seeded Doubts');
    }

  } catch (err) {
    console.error('Failed to sync db:', err);
  }
};

initDb();

// --- API Endpoints ---

// Auth
app.post('/api/signup', async (req, res) => {
  try {
    const { username, email, password, githubUrl } = req.body;
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      githubUrl
    });
    
    // Return user without password
    const { password: _, ...userWithoutPassword } = user.toJSON();
    res.status(201).json(userWithoutPassword);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    
    const { password: _, ...userWithoutPassword } = user.toJSON();
    res.json(userWithoutPassword);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Projects
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.findAll({
      include: [{
        model: User,
        attributes: ['username', 'githubUrl']
      }]
    });
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
    console.log('Received project creation request:', req.body);
    const project = await Project.create(req.body);
    console.log('Project created successfully:', project.toJSON());
    res.status(201).json(project);
  } catch (err) {
    console.error('Error creating project:', err);
    res.status(400).json({ error: err.message });
  }
});

app.delete('/api/projects/:id', async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) return res.status(404).json({ error: 'Project not found' });
    await project.destroy();
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
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

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
