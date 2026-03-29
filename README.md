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

1. Clone the repo
   ```bash
   git clone https://github.com/beerberidie/garason-dashboard.git
   cd garason-dashboard
   ```

2. Copy `config.example.js` to `config.js`
   ```bash
   cp config.example.js config.js
   ```

3. Fill in your credentials in `config.js`
   - `GITHUB_TOKEN`: Your GitHub Personal Access Token
   - `SUPABASE_URL`: Your Supabase project URL (already filled in)
   - `SUPABASE_KEY`: Your Supabase anon/public key

4. Open `index.html` in your browser or deploy to GitHub Pages

**Note:** `config.js` is gitignored and will never be committed

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
