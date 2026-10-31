# HIT University AI Faculty - Web Platform

## 🎓 Your Personal Learning University

A modern React-based web interface for your multi-agent AI tutor system, designed to host on Netlify.

## Features

- **Dashboard**: Overview of all 26+ schools with quick access
- **Interactive Classroom**: Learn with markdown content, embedded YouTube videos, and PDF textbooks
- **AI Tutor Chat**: Real-time Q&A with your specialized professor agents
- **Digital Library**: Search and filter 11,940+ learning resources
- **Assignments**: Track and submit assignments with AI grading
- **Progress Tracking**: Visualize your learning journey across all schools

## Quick Start

### Launch the local app from Terminal

Run this from the HIT Knowledge Stack folder:

```bash
cd hit_university_web
./start.sh
```

The launcher starts whichever local services are missing, then opens `http://127.0.0.1:3000` in your browser. Keep the Terminal window open while it runs; press `Ctrl+C` to stop any servers it started. If both servers are already running, it opens the existing app and exits.

## Independent HIT Knowledge Library

HIT School now uses its own library at `data/knowledge_base/`. The current local setup was seeded with a one-time copy of the knowledge folders and attachments from the workspace. The original folders are left untouched, and the app no longer reads them. Notes edited or images uploaded in HIT School are saved into this library.

The AI tutor and learning planner search Markdown notes in this library for relevant context. Set `HIT_KNOWLEDGE_ROOT` in `api/.env` if you want the local API to use a different persistent library folder. This local filesystem library is independent of Obsidian; cloud sync and hosted storage are separate work for the later Firebase setup.

## GitHub Pages

The repository includes a GitHub Actions workflow that builds and deploys the frontend when changes are pushed to `main`. In the repository settings, set **Pages → Build and deployment → Source** to **GitHub Actions**. The app is built at `/HIT_KNOWLEDGE_STACK/` and supports direct links and refreshes on Pages.

GitHub Pages hosts static files only. The local Python API and the copied private library are not deployed by this workflow. The hosted curriculum search, library editing, AI tutor, and audio generation need a separately hosted API and storage; provide the API origin as the repository Actions variable `VITE_API_URL` after that service is ready. The copied `data/knowledge_base/` folder is excluded from Git so personal notes are not published as part of the site.

Before that API is connected, the Pages build shows the five school entries bundled with HIT School as a limited offline fallback. It does not publish or bundle folder paths, note text, filenames, or attachments from your local library.

### 1. Install Dependencies

```bash
cd /workspace/hit_university_web
npm install
```

### 2. Development Mode

```bash
npm run dev
```

Opens at `http://localhost:3000`

### 3. Build for Production

```bash
npm run build
```

Output in `/dist` folder ready for Netlify deployment.

## Deploy to Netlify

### Option A: Netlify CLI

```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod
```

### Option B: Git-based Deployment

1. Push this code to GitHub/GitLab
2. Connect repository to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Deploy!

## API Integration (TODO)

The frontend is ready to connect to your Python backend:

1. **AI Tutor API**: Create FastAPI endpoint in `/api` folder
2. **Knowledge Base**: Connect to vector store for resource search
3. **PDF Storage**: Add local file serving or cloud storage

Example API endpoint structure:

```javascript
// src/api/tutor.js
import axios from 'axios';

const API_BASE = 'http://localhost:8000/api'; // Your Python backend

export const askTutor = async (question, schoolId, level) => {
  const response = await axios.post(`${API_BASE}/ask`, {
    question,
    school: schoolId,
    level
  });
  return response.data;
};
```

## File Structure

```
hit_university_web/
├── public/              # Static assets (PDFs, images)
├── src/
│   ├── components/      # Reusable UI components
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Classroom.jsx    # AI tutor + lessons
│   │   ├── Library.jsx      # Resource browser
│   │   ├── Assignments.jsx
│   │   └── Progress.jsx
│   ├── styles/
│   │   └── index.css
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## Customization

### Add More Schools
Edit `src/pages/Dashboard.jsx` - add to the `schools` array.

### Change Theme Colors
Modify `tailwind.config.js` - update the `colors` section.

### Embed Local PDFs
Place PDF files in `public/` folder and reference them:
```jsx
<a href="/textbooks/ai-fundamentals.pdf">Open PDF</a>
```

### Add YouTube Videos
In classroom lessons, use video type:
```javascript
{ type: 'video', videoId: 'YOUR_YOUTUBE_ID' }
```

## Connecting to AI Backend

Create a Python FastAPI server to bridge frontend with your multi-agent system:

```python
# api/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/ask")
async def ask_tutor(question: str, school: str, level: str):
    # Call your multi-agent system
    response = await dean_agent.process_request(question, {'school': school, 'level': level})
    return {"answer": response.content}
```

Run with: `uvicorn api.main:app --reload`

## Next Steps

1. ✅ Frontend UI complete
2. ⏳ Connect to Python backend API
3. ⏳ Add Qwen/Claude API integration
4. ⏳ Implement real PDF textbook viewer
5. ⏳ Add assignment submission system
6. ⏳ Deploy to Netlify

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **React Markdown** - Content rendering
- **Lucide Icons** - Icon library
- **Axios** - HTTP client

---

Built for HIT University's personalized learning experience 🚀
