// Configuration - Fill in your credentials here
const CONFIG = {
  GITHUB_TOKEN: 'YOUR_GITHUB_TOKEN',
  SUPABASE_URL: 'https://dyjyrsyyorqmqtigzocw.supabase.co',
  SUPABASE_KEY: 'YOUR_SUPABASE_KEY'
};

// Utility: Format date to relative time (e.g., "2 days ago")
function formatRelativeDate(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);

  if (seconds < 60) return 'just now';
  if (seconds < 3600) return Math.floor(seconds / 60) + 'm ago';
  if (seconds < 86400) return Math.floor(seconds / 3600) + 'h ago';
  if (seconds < 604800) return Math.floor(seconds / 86400) + 'd ago';

  return date.toLocaleDateString();
}

// Utility: Format date to readable format
function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

// Update last-updated timestamp
function updateLastUpdated() {
  document.getElementById('last-updated').textContent = 'just now';
  setTimeout(() => {
    document.getElementById('last-updated').textContent = new Date().toLocaleTimeString();
  }, 100);
}

// Fetch GitHub PRs
async function fetchGitHubPRs() {
  try {
    const response = await fetch(
      'https://api.github.com/repos/beerberidie/garasonbot/pulls?state=open&per_page=10',
      {
        headers: {
          'Authorization': `token ${CONFIG.GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      }
    );

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Invalid GitHub token. Check your CONFIG.GITHUB_TOKEN.');
      }
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const prs = await response.json();
    renderGitHubPRs(prs);
  } catch (error) {
    renderError('prs-content', error.message);
    console.error('GitHub fetch error:', error);
  }
}

// Render GitHub PRs
function renderGitHubPRs(prs) {
  const container = document.getElementById('prs-content');

  if (prs.length === 0) {
    container.innerHTML = '<div class="empty">No open PRs 🎉</div>';
    document.getElementById('prs-count').textContent = '(0)';
    return;
  }

  container.innerHTML = prs.map(pr => `
    <div class="item-card">
      <div class="item-title">
        <a href="${pr.html_url}" target="_blank" rel="noopener">#${pr.number} ${pr.title}</a>
      </div>
      <div class="item-meta">
        <span>👤 ${pr.user.login}</span>
        <span>📅 ${formatRelativeDate(pr.created_at)}</span>
      </div>
    </div>
  `).join('');

  document.getElementById('prs-count').textContent = `(${prs.length})`;
  updateLastUpdated();
}

// Fetch Supabase Projects
async function fetchSupabaseProjects() {
  try {
    const url = new URL('https://dyjyrsyyorqmqtigzocw.supabase.co/rest/v1/projects');
    url.searchParams.set('status', 'eq.active');
    url.searchParams.set('select', '*');

    const response = await fetch(url.toString(), {
      headers: {
        'Authorization': `Bearer ${CONFIG.SUPABASE_KEY}`,
        'apikey': CONFIG.SUPABASE_KEY,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Invalid Supabase key. Check your CONFIG.SUPABASE_KEY.');
      }
      throw new Error(`Supabase API error: ${response.status}`);
    }

    const projects = await response.json();
    renderSupabaseProjects(projects);
  } catch (error) {
    renderError('projects-content', error.message);
    console.error('Supabase projects fetch error:', error);
  }
}

// Render Supabase Projects
function renderSupabaseProjects(projects) {
  const container = document.getElementById('projects-content');

  if (projects.length === 0) {
    container.innerHTML = '<div class="empty">No active projects</div>';
    document.getElementById('projects-count').textContent = '(0)';
    return;
  }

  container.innerHTML = projects.map(project => `
    <div class="item-card">
      <div class="item-title">${project.name}</div>
      <div class="item-meta">
        <span class="meta-badge">${project.status}</span>
        <span>📅 ${formatDate(project.created_at)}</span>
      </div>
      ${project.description ? `<div class="item-description">${project.description}</div>` : ''}
    </div>
  `).join('');

  document.getElementById('projects-count').textContent = `(${projects.length})`;
  updateLastUpdated();
}

// Fetch Supabase Tasks
async function fetchSupabaseTasks() {
  try {
    const url = new URL('https://dyjyrsyyorqmqtigzocw.supabase.co/rest/v1/tasks');
    url.searchParams.set('status', 'eq.pending');
    url.searchParams.set('select', '*');

    const response = await fetch(url.toString(), {
      headers: {
        'Authorization': `Bearer ${CONFIG.SUPABASE_KEY}`,
        'apikey': CONFIG.SUPABASE_KEY,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Invalid Supabase key. Check your CONFIG.SUPABASE_KEY.');
      }
      throw new Error(`Supabase API error: ${response.status}`);
    }

    const tasks = await response.json();
    renderSupabaseTasks(tasks);
  } catch (error) {
    renderError('tasks-content', error.message);
    console.error('Supabase tasks fetch error:', error);
  }
}

// Render Supabase Tasks
function renderSupabaseTasks(tasks) {
  const container = document.getElementById('tasks-content');

  if (tasks.length === 0) {
    container.innerHTML = '<div class="empty">No pending tasks 🎉</div>';
    document.getElementById('tasks-count').textContent = '(0)';
    return;
  }

  container.innerHTML = tasks.map(task => {
    const priorityClass = task.priority ? `priority-${task.priority.toLowerCase()}` : '';
    return `
      <div class="item-card">
        <div class="item-title">${task.title}</div>
        <div class="item-meta">
          ${task.priority ? `<span class="meta-badge ${priorityClass}">${task.priority}</span>` : ''}
          <span>📅 ${formatDate(task.created_at)}</span>
        </div>
        ${task.notes ? `<div class="item-description">${task.notes}</div>` : ''}
      </div>
    `;
  }).join('');

  document.getElementById('tasks-count').textContent = `(${tasks.length})`;
  updateLastUpdated();
}

// Render error state
function renderError(elementId, errorMessage) {
  const container = document.getElementById(elementId);
  container.innerHTML = `<div class="error">❌ ${errorMessage}</div>`;
}

// Initialize app
function init() {
  // Check if config is filled in
  if (CONFIG.GITHUB_TOKEN === 'YOUR_GITHUB_TOKEN') {
    document.getElementById('prs-content').innerHTML =
      '<div class="error">⚠️ Add your GitHub token to CONFIG in app.js</div>';
  } else {
    fetchGitHubPRs();
  }

  if (CONFIG.SUPABASE_KEY === 'YOUR_SUPABASE_KEY') {
    document.getElementById('projects-content').innerHTML =
      '<div class="error">⚠️ Add your Supabase key to CONFIG in app.js</div>';
    document.getElementById('tasks-content').innerHTML =
      '<div class="error">⚠️ Add your Supabase key to CONFIG in app.js</div>';
  } else {
    fetchSupabaseProjects();
    fetchSupabaseTasks();
  }

  updateLastUpdated();
}

// Start app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
