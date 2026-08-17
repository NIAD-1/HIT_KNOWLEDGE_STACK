# Getting Your Qwen API Key

## Option 1: Alibaba Cloud (Official)

1. Visit [Alibaba Cloud](https://www.alibabacloud.com/)
2. Create an account or sign in
3. Navigate to **DashScope** (Model Studio)
4. Create an API key in the console
5. Copy your key (starts with `sk-`)

**Pricing**: Pay-per-token, affordable for personal use

## Option 2: OpenRouter (Recommended for Beginners)

1. Visit [OpenRouter](https://openrouter.ai/)
2. Sign up with GitHub/Google
3. Get your API key from dashboard
4. Access multiple models including Qwen

**Benefits**: 
- Single key for multiple models
- Free tier available
- Easy integration

## Option 3: Hugging Face Inference API

1. Visit [Hugging Face](https://huggingface.co/)
2. Create account
3. Go to Settings → Access Tokens
4. Create new token with "read" permissions

## Using Your API Key

### In Python Backend

Create `.env` file in `/workspace/hit_university_web/api/`:

```env
QWEN_API_KEY=your_api_key_here
OPENROUTER_API_KEY=your_openrouter_key
```

Update `api/main.py`:

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.getenv("OPENROUTER_API_KEY"),
    base_url="https://openrouter.ai/api/v1"
)

# In ask_tutor endpoint:
response = client.chat.completions.create(
    model="qwen/qwen-2.5-72b-instruct",
    messages=[
        {"role": "system", "content": "You are a professor at HIT University..."},
        {"role": "user", "content": request.question}
    ]
)
```

### Environment Variables for Netlify

When deploying, add these in Netlify Dashboard:
1. Site Settings → Build & Deploy → Environment
2. Add `QWEN_API_KEY` variable
3. Deploy will use it automatically

## Free Alternatives

If you want to test without cost:

1. **Ollama (Local)**: Run Qwen locally
   ```bash
   ollama run qwen2.5:7b
   ```

2. **Hugging Face Spaces**: Free GPU tiers

3. **Google Colab**: Free TPU/GPU for experimentation

## Recommended Setup for You

Start with **OpenRouter** because:
- ✅ Easy setup (5 minutes)
- ✅ Free $1 credit to start
- ✅ Access to Qwen 2.5 72B (best for tutoring)
- ✅ Simple OpenAI-compatible API
- ✅ No complex billing setup

Get started: https://openrouter.ai/qwen
