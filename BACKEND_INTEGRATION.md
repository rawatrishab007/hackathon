# Backend Integration Guide

This project is designed with a "Backend-Ready" architecture using React Context. Currently, it uses local state (`useState`) to mock a database.

## How to Connect a Real Backend

The only file you need to modify is `src/context/DataContext.jsx`.

### 1. Setup your API

Ensure you have API endpoints ready, for example:

- `GET /api/projects` - Fetch all projects
- `POST /api/projects` - Create a new project
- `GET /api/doubts` - Fetch all doubts
- `POST /api/doubts` - Create a new doubt

### 2. Fetch Data on Load

Replace the initial state with `useEffect` to fetch data from your API.

```javascript
// src/context/DataContext.jsx

export const DataProvider = ({ children }) => {
  const [projects, setProjects] = useState([]); // Start empty
  const [doubts, setDoubts] = useState([]);

  useEffect(() => {
    // Fetch Projects
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => setProjects(data));

    // Fetch Doubts
    fetch('/api/doubts')
      .then(res => res.json())
      .then(data => setDoubts(data));
  }, []);
```

### 3. Update Actions

Modify `addProject` and `addDoubt` to send data to your server.

```javascript
const addProject = async (project) => {
  try {
    const response = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(project),
    });
    const newProject = await response.json();
    setProjects([newProject, ...projects]); // Update UI
  } catch (error) {
    console.error("Failed to add project", error);
  }
};
```

That's it! Your UI components (`ProjectBoard`, `DoubtPortal`) do not need any changes.
