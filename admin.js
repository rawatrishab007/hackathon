// Security Check
const password = prompt("Enter Admin Password:");
if (password !== "admin123") {
    alert("Access Denied");
    window.location.href = "index.html";
}

// Configuration
const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:3000'
  : '';

// DOM Elements
const projectList = document.getElementById('project-list');

// Fetch Projects
async function fetchProjects() {
    try {
        const res = await fetch(`${API_BASE_URL}/api/projects`, {
            headers: { 
                'ngrok-skip-browser-warning': 'true'
            }
        });
        
        if (!res.ok) throw new Error('Failed to fetch projects');
        
        const projects = await res.json();
        renderProjects(projects);
    } catch (error) {
        console.error('Error:', error);
        projectList.innerHTML = `
            <tr>
                <td colspan="5" class="p-8 text-center text-red-400">
                    Failed to load projects. Is the backend running?
                </td>
            </tr>
        `;
    }
}

// Render Projects
function renderProjects(projects) {
    if (projects.length === 0) {
        projectList.innerHTML = `
            <tr>
                <td colspan="5" class="p-8 text-center text-slate-500 italic">
                    No projects found in database.
                </td>
            </tr>
        `;
        return;
    }

    projectList.innerHTML = projects.map(project => `
        <tr class="hover:bg-white/5 transition-colors group">
            <td class="p-4 text-slate-400 font-mono text-sm">#${project.id}</td>
            <td class="p-4 font-medium text-white">${project.title}</td>
            <td class="p-4 text-slate-400 text-sm max-w-md truncate" title="${project.description}">
                ${project.description}
            </td>
            <td class="p-4 text-slate-300">
                <div class="flex items-center gap-2">
                    <span class="w-6 h-6 rounded-full bg-violet-500/20 flex items-center justify-center text-xs text-violet-300 font-bold">
                        ${project.owner ? project.owner[0].toUpperCase() : '?'}
                    </span>
                    <span>${project.owner || 'Unknown'}</span>
                    <span class="text-xs text-slate-600 ml-1">(ID: ${project.ownerId})</span>
                </div>
            </td>
            <td class="p-4 text-right">
                <button 
                    onclick="deleteProject(${project.id})"
                    class="px-3 py-1.5 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded-lg text-sm font-medium transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                >
                    Force Delete
                </button>
            </td>
        </tr>
    `).join('');
}

// Delete Project
async function deleteProject(id) {
    if (!confirm(`Are you sure you want to FORCE DELETE project #${id}? This cannot be undone.`)) {
        return;
    }

    try {
        const res = await fetch(`${API_BASE_URL}/api/projects/${id}`, {
            method: 'DELETE',
            headers: { 
                'ngrok-skip-browser-warning': 'true'
            }
        });

        if (res.ok) {
            // Optimistic update
            fetchProjects();
        } else {
            alert('Failed to delete project');
        }
    } catch (error) {
        console.error('Error deleting project:', error);
        alert('Error connecting to server');
    }
}

// Initialize
fetchProjects();
