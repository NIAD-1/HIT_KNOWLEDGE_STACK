# HIT University AI Faculty - Quick Start Guide

## 🎓 What You've Built

You now have a **multi-agent AI tutor system** that leverages your 11,940+ markdown knowledge base to provide:

- ✅ **26 Specialized Professor Agents** - One for each school/domain
- ✅ **Dean Agent** - Orchestrates routing and coordination  
- ✅ **RAG Knowledge Base** - Indexes all your markdown files
- ✅ **CLI Interface** - Chat, ask questions, get assignments
- ✅ **Extensible Architecture** - Easy to add Tutor, Grader, Resource agents

## 🚀 Quick Commands

### 1. Initialize the System (First Time)
```bash
cd /workspace/ai_tutor_system
python main.py index
```
This indexes all 11,940+ markdown files into a searchable knowledge base.

### 2. Interactive Chat Mode
```bash
python main.py chat
```

Then use commands like:
```
/ask What is a neural network?
/assign 010_AI Module_3 L2
/level L2
/schools
/quit
```

### 3. Ask a Single Question
```bash
# Basic question
python main.py ask "Explain backpropagation"

# With learning level
python main.py ask "What are microcontrollers?" --level L1

# From specific school
python main.py ask "How does OAuth work?" --school 012_Cybersecurity --level L2
```

### 4. Get an Assignment
```bash
python main.py assign --school 07_SE --module Module_1 --level L2
```

### 5. Rebuild Index (After Adding New Content)
```bash
python main.py index --rebuild
```

## 📁 System Architecture

```
ai_tutor_system/
├── agents/              # AI Agent implementations
│   ├── __init__.py     # Dean + Professor agents
│   └── [more agents coming]
├── config/             # Configuration files
│   ├── school_mapping.yaml    # School → Professor mapping
│   └── prompts/               # Agent prompt templates
├── knowledge_base/     # RAG indexing & retrieval
│   └── __init__.py
├── vector_store/       # Indexed knowledge (auto-generated)
├── main.py            # Entry point
└── README.md          # This file
```

## 🏗️ Multi-Agent Architecture

```
                    DEAN AGENT
                        │
        ┌───────────────┼───────────────┐
        │               │               │
   AI/ML Prof    Cybersecurity Prof  Biomedical Prof
        │               │               │
        └───────────────┼───────────────┘
                        │
              TUTOR AGENT (coming)
              ASSIGNMENT AGENT (coming)
              GRADER AGENT (coming)
              RESOURCE AGENT (coming)
```

## 🎯 Learning Levels

- **L1** - Foundational (Remember, Understand)
- **L2** - Intermediate (Apply, Analyze)  
- **L3** - Advanced (Evaluate, Create)
- **L4** - Expert (Create, Innovate)

## 📚 Available Schools (26 Professors)

1. First Principles
2. Electronics
3. Embedded Systems
4. Computer Engineering
5. Networking
6. Cloud Engineering
7. Software Engineering
8. Databases
9. Data Engineering
10. AI/ML
11. Robotics & Automation
12. Cybersecurity
13. DevOps/SRE
14. Supply Chain
15. Systems Engineering
16. Industrial Intelligence
17. Biomedical
18. Regulatory Science
19. Research
20. Product Design
21. Business
22. Innovation
23. Leadership
24. Entrepreneurship
25. Global Standards
26. Industry Domains

## 🔧 Next Steps to Enhance

### Phase 1: Add LLM Integration (Critical)
Currently the agents return placeholder responses. Connect them to Qwen or another LLM:

```python
# In agents/__init__.py, update process_request methods:
async def process_request(self, request, context):
    from openai import OpenAI
    
    client = OpenAI(api_key="your-key", base_url="...")
    prompt = self._build_prompt(request, context)
    
    response = client.chat.completions.create(
        model="qwen-3b",
        messages=[{"role": "user", "content": prompt}]
    )
    
    return self.format_response(response.choices[0].message.content)
```

### Phase 2: Complete Remaining Agents
- **TutorAgent** - Simplifies explanations, provides examples
- **AssignmentAgent** - Creates practice problems and projects
- **GraderAgent** - Evaluates submissions with rubrics
- **ResourceAgent** - Curates external resources

### Phase 3: Enhanced RAG
```bash
pip install chromadb sentence-transformers
```
Upgrade from keyword search to semantic embeddings for better retrieval.

### Phase 4: Web Interface
```bash
pip install fastapi uvicorn
python -m interfaces.api
```
Access via browser at `http://localhost:8000`

### Phase 5: Progress Tracking
Add SQLite database to track:
- Completed modules
- Assignment scores
- Learning streaks
- Recommended next topics

## 💡 Usage Tips

1. **Start at the right level**: Use `/level L1` if you're new to a topic
2. **Be specific**: "Explain convolutional neural networks" vs "What is AI?"
3. **Use assignments**: `/assign 010_AI Module_5 L3` to practice
4. **Cross-domain questions**: The Dean will coordinate multiple professors
5. **Reference your vault**: All answers can cite your 11,940 markdown files

## 🐛 Troubleshooting

**Index not found?**
```bash
python main.py index --rebuild
```

**Professor not responding?**
Check that the school ID matches `config/school_mapping.yaml`

**Slow performance?**
The full index of 11,940 files takes time. Let it complete once, then it caches.

## 🎉 You're Ready!

Your AI Faculty is standing by. Start learning with:

```bash
python main.py chat
```

Then ask: *"I want to learn about [topic]. Where should I start?"*

The Dean will assess your level, route to the right professor, and create a personalized learning path through your knowledge vault!
