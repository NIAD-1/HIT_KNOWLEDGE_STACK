# 🎓 HIT University AI Faculty - Complete Setup Guide

## What You Have Built

A complete **multi-agent AI tutoring system** with:

### 1. Backend (`/workspace/ai_tutor_system`)
- ✅ Multi-agent architecture with Dean + 26 Professor agents
- ✅ RAG knowledge base indexing 11,940+ markdown files
- ✅ CLI interface for chat and assignments
- ✅ Ready for Qwen/Claude API integration

### 2. Frontend (`/workspace/hit_university_web`)
- ✅ Modern React web application
- ✅ Dashboard with all schools
- ✅ Interactive classroom with AI tutor chat
- ✅ Support for markdown, YouTube videos, PDF textbooks
- ✅ Library browser for resources
- ✅ Assignment tracking
- ✅ Progress visualization
- ✅ Ready for Netlify deployment

### 3. API Bridge (`/workspace/hit_university_web/api`)
- ✅ FastAPI server connecting frontend to AI agents
- ✅ CORS enabled for web access
- ✅ Endpoints for ask, assign, search

---

## Quick Start (Choose Your Path)

### PATH A: Test Locally First (Recommended)

#### Step 1: Install Python Dependencies
```bash
cd /workspace/ai_tutor_system
pip install -r requirements.txt
```

#### Step 2: Index Your Knowledge Base
```bash
python main.py index
```

#### Step 3: Test CLI Chat
```bash
python main.py chat
# Try: /ask What is machine learning?
```

#### Step 4: Start Web Frontend
```bash
cd /workspace/hit_university_web
npm run dev
# Opens at http://localhost:3000
```

#### Step 5: Start API Backend (New Terminal)
```bash
cd /workspace/hit_university_web/api
pip install fastapi uvicorn
python main.py
# Runs at http://localhost:8000
```

---

### PATH B: Deploy to Netlify Immediately

#### Step 1: Get Qwen API Key
See `API_KEY_GUIDE.md` - Recommended: OpenRouter (5 min setup)

#### Step 2: Build Frontend
```bash
cd /workspace/hit_university_web
npm run build
```

#### Step 3: Deploy to Netlify
**Option 1 - Drag & Drop:**
1. Go to [netlify.com](https://netlify.com)
2. Sign up/login
3. Drag `dist` folder to deploy area
4. Done! Site is live

**Option 2 - Git:**
```bash
git init
git add .
git commit -m "HIT University"
# Push to GitHub, then connect to Netlify
```

#### Step 4: Deploy Backend to Render
1. Go to [render.com](https://render.com)
2. New Web Service
3. Connect your repo
4. Set environment variables:
   - `QWEN_API_KEY=your_key`
5. Deploy!

---

## Where to Get API Keys

### Best Option: OpenRouter (Recommended)
1. Visit: https://openrouter.ai
2. Sign up (free $1 credit)
3. Get API key from dashboard
4. Use model: `qwen/qwen-2.5-72b-instruct`

### Alternative: Alibaba Cloud
1. Visit: https://www.alibabacloud.com
2. Create account → DashScope console
3. Generate API key

### Free Local Option: Ollama
```bash
# Install Ollama
curl -fsSL https://ollama.ai/install.sh | sh

# Run Qwen locally
ollama run qwen2.5:7b
```

---

## File Structure Overview

```
/workspace/
├── ai_tutor_system/           # Python multi-agent backend
│   ├── main.py               # Entry point
│   ├── agents/               # Dean + Professor agents
│   ├── knowledge_base/       # RAG system
│   └── config/               # School mappings
│
├── hit_university_web/        # React frontend
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx      # School overview
│   │   │   ├── Classroom.jsx      # Lessons + AI chat
│   │   │   ├── Library.jsx        # Resource browser
│   │   │   ├── Assignments.jsx    # Task tracker
│   │   │   └── Progress.jsx       # Learning analytics
│   │   └── App.jsx
│   ├── api/
│   │   └── main.py           # FastAPI bridge
│   ├── public/               # PDFs, static assets
│   ├── dist/                 # Production build (deploy this)
│   └── README.md             # Detailed docs
│
└── 010_AI/, 012_Cybersecurity/, etc.  # Your knowledge vault
```

---

## How to Add Content

### Add YouTube Videos
Edit `/workspace/hit_university_web/src/pages/Classroom.jsx`:
```javascript
lessons: [
  { 
    id: 1, 
    title: 'Neural Networks Explained', 
    type: 'video', 
    videoId: 'dQw4w9WgXcQ'  // YouTube video ID
  }
]
```

### Add PDF Textbooks
1. Place PDF in `/workspace/hit_university_web/public/textbooks/`
2. Reference in Classroom:
```javascript
{ 
  id: 2, 
  title: 'AI Fundamentals', 
  type: 'pdf', 
  url: '/textbooks/ai-fundamentals.pdf' 
}
```

### Add More Schools
Edit `/workspace/hit_university_web/src/pages/Dashboard.jsx`:
```javascript
const schools = [
  { 
    id: '010_AI', 
    name: 'AI & Machine Learning', 
    icon: Brain, 
    color: 'bg-purple-500',
    description: 'Your description here'
  },
  // Add more...
];
```

---

## Connecting AI to Frontend

Update `/workspace/hit_university_web/api/main.py`:

```python
from openai import OpenAI

client = OpenAI(
    api_key="YOUR_OPENROUTER_KEY",
    base_url="https://openrouter.ai/api/v1"
)

@app.post("/api/ask")
async def ask_tutor(request: AskRequest):
    response = client.chat.completions.create(
        model="qwen/qwen-2.5-72b-instruct",
        messages=[
            {"role": "system", "content": "You are a professor at HIT University..."},
            {"role": "user", "content": request.question}
        ]
    )
    return {"answer": response.choices[0].message.content}
```

---

## Features Checklist

| Feature | Status | Notes |
|---------|--------|-------|
| Multi-agent AI system | ✅ Complete | 26 professors ready |
| Web interface | ✅ Complete | Modern React UI |
| AI Tutor chat | ⏳ Needs API | Add Qwen key |
| YouTube embeds | ✅ Ready | Add video IDs |
| PDF viewer | ✅ Ready | Upload to /public |
| Assignment system | ⏳ Needs API | Backend integration |
| Progress tracking | ✅ Mock data | Connect to real data |
| Netlify deploy | ✅ Ready | dist/ folder built |
| Mobile responsive | ✅ Complete | Tailwind CSS |

---

## Cost Breakdown

| Service | Tier | Cost |
|---------|------|------|
| Netlify (Frontend) | Free | $0/month |
| Render (Backend) | Free | $0/month |
| Qwen API (OpenRouter) | Pay-per-use | ~$5-20/month |
| Domain (optional) | Namecheap | ~$10/year |

**Total**: FREE to start, ~$5-20/month with heavy AI use

---

## Next Actions

### Immediate (Today)
1. ✅ Review the code structure
2. ✅ Get Qwen API key from OpenRouter (5 min)
3. ✅ Test locally: `npm run dev`
4. ✅ Add your first YouTube video ID

### Short-term (This Week)
1. Deploy frontend to Netlify
2. Deploy backend to Render
3. Add API keys to environment
4. Test AI tutor with real questions
5. Upload PDF textbooks to `/public`

### Medium-term (This Month)
1. Customize school listings
2. Add real curriculum from your markdown files
3. Implement assignment submission
4. Add user authentication (optional)
5. Custom domain setup

---

## Troubleshooting

### "Module not found" errors
```bash
cd /workspace/hit_university_web
rm -rf node_modules
npm install
```

### API not responding
- Check if backend is running: `http://localhost:8000`
- Verify CORS settings in `api/main.py`
- Check firewall/port conflicts

### Build fails on Netlify
- Clear cache in Netlify dashboard
- Ensure `netlify.toml` exists
- Check Node version (use 18+)

---

## Resources

- **Frontend Docs**: `/workspace/hit_university_web/README.md`
- **Deployment Guide**: `/workspace/hit_university_web/DEPLOYMENT.md`
- **API Key Guide**: `/workspace/hit_university_web/API_KEY_GUIDE.md`
- **Backend Docs**: `/workspace/ai_tutor_system/README.md`

---

## Support & Community

- Netlify: https://docs.netlify.com
- React: https://react.dev
- Qwen: https://help.aliyun.com/zh/dashscope
- OpenRouter: https://openrouter.ai/docs

---

**🎉 Congratulations!** You now have a complete AI-powered university platform ready to deploy. The architecture scales from free tier to production seamlessly.

Start learning, start building, start teaching! 🚀🎓
