# Garason Dashboard

A personal dashboard showing live GitHub PRs, active projects, and pending tasks.

## Features

- **📝 Open PRs** — Real-time list of open pull requests from your GitHub repos
- **📊 Active Projects** — Track active projects from your Supabase database
- **✓ Pending Tasks** — View pending tasks with priority levels and notes
- **🎨 Dark Theme** — Clean GitHub-styled dark interface
- **📱 Responsive** — Works on desktop, tablet, and mobile
- **⚡ Zero Build** — Plain HTML, CSS, and JavaScript — no frameworks or build tools

## Setup

### 1. Clone the repo
```bash
git clone https://github.com/beerberidie/garason-dashboard.git
cd garason-dashboard
```

### 2. Add your credentials
Open `app.js` and fill in the configuration object at the top:

```javascript
const CONFIG = {
  GITHUB_TOKEN: 'ghp_xxxxxxxxxxxx',  // GitHub Personal Access Token
  SUPABASE_URL: 'https://dyjyrsyyorqmqtigzocw.supabase.co',  // Your Supabase project URL
  SUPABASE_KEY: 'your_supabase_anon_key'  // Supabase anon key
};
```

### 3. Get your credentials

**GitHub Token:**
1. Go to [GitHub Settings → Developer Settings → Personal Access Tokens](https://github.com/settings/tokens)
2. Generate a new token with `repo` scope (read access)
3. Copy the token and paste it into `CONFIG.GITHUB_TOKEN`

**Supabase Key:**
1. Open your Supabase project at [https://app.supabase.com](https://app.supabase.com)
2. Go to Settings → API
3. Copy your **anon/public** key and paste it into `CONFIG.SUPABASE_KEY`

### 4. Run it
Just open `index.html` in your browser — no build step needed.

```bash
# Option 1: Open directly in browser
open index.html

# Option 2: Use a local server (for CORS if needed)
python3 -m http.server 8000
# Then visit http://localhost:8000
```

## Data Sources

- **GitHub API** — `GET https://api.github.com/repos/beerberidie/garasonbot/pulls`
- **Supabase (Projects)** — `GET https://dyjyrsyyorqmqtigzocw.supabase.co/rest/v1/projects?status=eq.active`
- **Supabase (Tasks)** — `GET https://dyjyrsyyorqmqtigzocw.supabase.co/rest/v1/tasks?status=eq.pending`

### Expected Table Structure

**Supabase `projects` table:**
```
id (int/uuid)
name (text)
description (text, nullable)
status (text) — one of: active, archived, etc.
created_at (timestamp)
```

**Supabase `tasks` table:**
```
id (int/uuid)
title (text)
notes (text, nullable)
priority (text, nullable) — one of: low, medium, high
status (text) — one of: pending, completed, etc.
created_at (timestamp)
```

## Tech Stack

- **HTML5** — Semantic structure
- **CSS3** — Custom properties, Grid, Flexbox, animations
- **JavaScript (ES6+)** — Async/await, fetch API
- **No frameworks** — Pure vanilla JS
- **No build tools** — Direct browser execution

## Deployment

### Option 1: GitHub Pages (Free)
1. Go to repo Settings → Pages
2. Set Source to **main branch** / **/ (root)**
3. Your dashboard is live at `https://beerberidie.github.io/garason-dashboard`

### Option 2: Vercel (Free)
1. Visit [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repo
3. Deploy — done in ~30 seconds

### Option 3: Netlify (Free)
1. Visit [app.netlify.com/start](https://app.netlify.com/start)
2. Connect your GitHub repo
3. Deploy — done

### Option 4: Local
Just keep the repo cloned and run `python3 -m http.server 8000` or use any local server.

## Security Notes

- **Never commit credentials** — The `CONFIG` object is for local development only
- **GitHub Token** — Use a personal access token with minimal scopes (read-only)
- **Supabase Key** — Use the **anon/public** key, not the service role key
- If deploying publicly, consider using environment variables instead of hardcoding credentials

## Customization

### Change the GitHub repo
Edit `app.js` line 38:
```javascript
'https://api.github.com/repos/YOUR_USER/YOUR_REPO/pulls?state=open&per_page=10'
```

### Change the color theme
Edit `style.css` root variables:
```css
:root {
  --bg-primary: #0d1117;  /* Main background */
  --accent: #58a6ff;      /* Link/accent color */
  /* ... more variables ... */
}
```

### Refresh data automatically
Add this to `app.js` after `init()`:
```javascript
// Refresh every 5 minutes
setInterval(() => {
  fetchGitHubPRs();
  fetchSupabaseProjects();
  fetchSupabaseTasks();
}, 5 * 60 * 1000);
```

## License

Public domain — use freely for personal projects.

## Author

Made by Garason for personal task management and project tracking.
