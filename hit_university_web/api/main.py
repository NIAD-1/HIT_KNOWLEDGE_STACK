from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List
import asyncio
import sys
from pathlib import Path

# Add parent directory to path to import ai_tutor_system
sys.path.insert(0, str(Path(__file__).parent.parent / 'ai_tutor_system'))

app = FastAPI(title="HIT University AI Faculty API")

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://*.netlify.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request/Response models
class AskRequest(BaseModel):
    question: str
    school: Optional[str] = None
    level: str = "L1"

class AskResponse(BaseModel):
    answer: str
    school: str
    sources: Optional[List[str]] = None

class AssignmentRequest(BaseModel):
    school: str
    module: str
    level: str = "L2"

class AssignmentResponse(BaseModel):
    title: str
    description: str
    requirements: List[str]
    due_date: str

# Initialize AI system (lazy loading)
university = None

def get_university():
    global university
    if university is None:
        from main import HITUniversityAI
        university = HITUniversityAI()
        university.initialize()
    return university

@app.get("/")
async def root():
    return {
        "message": "HIT University AI Faculty API",
        "version": "1.0.0",
        "endpoints": ["/api/ask", "/api/assign", "/api/search"]
    }

@app.post("/api/ask", response_model=AskResponse)
async def ask_tutor(request: AskRequest):
    """Ask a question to the AI tutor"""
    try:
        # For now, return mock response - integrate with real AI later
        # TODO: Connect to Qwen API or your multi-agent system
        
        univ = get_university()
        response = await univ.ask(request.question, request.level, request.school)
        
        return AskResponse(
            answer=response.content if hasattr(response, 'content') else str(response),
            school=request.school or "General",
            sources=[]
        )
    except Exception as e:
        # Fallback mock response
        return AskResponse(
            answer=f"This is a mock response. Question: {request.question}. Connect Qwen API for real answers.",
            school=request.school or "General",
            sources=[]
        )

@app.post("/api/assign", response_model=AssignmentResponse)
async def get_assignment(request: AssignmentRequest):
    """Get an assignment from a specific school/module"""
    try:
        univ = get_university()
        response = await univ.assign(request.school, request.module, request.level)
        
        return AssignmentResponse(
            title=f"Assignment for {request.module}",
            description=response.content if hasattr(response, 'content') else str(response),
            requirements=["Complete the task", "Submit your work"],
            due_date="2024-02-01"
        )
    except Exception as e:
        return AssignmentResponse(
            title=f"Assignment for {request.module}",
            description="Mock assignment - connect backend for real assignments",
            requirements=["Study the material", "Complete exercises"],
            due_date="2024-02-01"
        )

@app.get("/api/search")
async def search_resources(q: str, school: Optional[str] = None, limit: int = 10):
    """Search knowledge base for resources"""
    # TODO: Implement real search with vector store
    return {
        "query": q,
        "results": [],
        "total": 0
    }

@app.get("/api/schools")
async def list_schools():
    """List all available schools"""
    # TODO: Load from config
    return {
        "schools": [
            {"id": "010_AI", "name": "AI & Machine Learning"},
            {"id": "012_Cybersecurity", "name": "Cybersecurity"},
            {"id": "08_Databases", "name": "Database Engineering"},
        ]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
