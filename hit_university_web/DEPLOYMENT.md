# 🚀 DEPLOYMENT GUIDE - HIT University Web

## Quick Deploy to Netlify (5 minutes)

### Method 1: Drag & Drop (Easiest)

1. **Build the project**:
   ```bash
   cd /workspace/hit_university_web
   npm install
   npm run build
   ```

2. **Deploy**:
   - Go to [netlify.com](https://netlify.com)
   - Sign in / Create account
   - Click "Add new site" → "Deploy manually"
   - Drag the `dist` folder to the upload area
   - Done! Your site is live

### Method 2: Git Integration (Recommended)

1. **Push to GitHub**:
   ```bash
   cd /workspace/hit_university_web
   git init
   git add .
   git commit -m "Initial commit - HIT University Web"
   git branch -M main
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Connect to Netlify**:
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Choose GitHub
   - Select your repository
   - Build settings auto-detected from `netlify.toml`
   - Click "Deploy site"

3. **Add API Keys** (if using AI backend):
   - Site Settings → Build & Deploy → Environment
   - Add variables:
     - `QWEN_API_KEY`=your_key
     - `OPENROUTER_API_KEY`=your_key
   - Redeploy

### Method 3: Netlify CLI

```bash
# Install CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

## Custom Domain

1. In Netlify Dashboard: Site Settings → Domain Management
2. Click "Add custom domain"
3. Follow DNS configuration instructions
4. SSL certificate auto-generated (free)

## Backend Deployment Options

### Option A: Render (Free Tier)

1. Push code to GitHub
2. Go to [render.com](https://render.com)
3. New → Web Service
4. Connect repository
5. Set:
   - Build: `pip install -r requirements.txt`
   - Start: `uvicorn api.main:app --host 0.0.0.0 --port $PORT`
6. Add environment variables
7. Deploy!

You'll get: `https://your-api.onrender.com`

Update frontend `.env`:
```env
VITE_API_URL=https://your-api.onrender.com
```

### Option B: Railway

Similar to Render, often faster deployment.

### Option C: Hugging Face Spaces

For AI-heavy apps with free GPU.

## Environment Variables

### Frontend (Netlify)
```
VITE_API_URL=http://localhost:8000  # Development
VITE_API_URL=https://your-api.render.com  # Production
```

### Backend (Render/Railway)
```
QWEN_API_KEY=sk-...
OPENROUTER_API_KEY=...
PYTHON_VERSION=3.9.18
```

## Testing Before Deploy

```bash
# Test build locally
npm run build

# Preview production build
npm run preview

# Test API locally
cd api
python main.py
# Visit http://localhost:8000/docs
```

## Troubleshooting

### Build Fails
- Check Node version (use v18+)
- Clear cache: `rm -rf node_modules package-lock.json && npm install`
- Check error logs in Netlify deploy log

### API Not Working
- Enable CORS in backend
- Check environment variables
- Verify API URL in frontend

### Blank Page After Deploy
- Check browser console for errors
- Ensure `netlify.toml` has redirect rules
- Try clearing Netlify cache and redeploy

## Cost Estimate

- **Frontend (Netlify)**: FREE (100GB bandwidth/month)
- **Backend (Render)**: FREE (750 hours/month)
- **Qwen API**: ~$0.01-0.10 per 1000 tokens
  - Average session: 100-500 tokens
  - Monthly cost for daily use: ~$5-20

## Next Steps After Deployment

1. ✅ Deploy frontend to Netlify
2. ✅ Deploy backend to Render
3. ✅ Add Qwen API key
4. ✅ Test AI tutor chat
5. ✅ Upload PDF textbooks to `public/`
6. ✅ Add YouTube video IDs to lessons
7. ✅ Share with friends!

## Support

- Netlify Docs: https://docs.netlify.com
- Render Docs: https://render.com/docs
- Qwen API: https://help.aliyun.com/zh/dashscope

---

Your university is ready to go live! 🎓🚀
