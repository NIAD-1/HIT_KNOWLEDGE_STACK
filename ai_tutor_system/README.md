# HIT University AI Faculty - Multi-Agent Tutor System

## Overview
An intelligent multi-agent architecture that serves as your personal university faculty, leveraging your 11,940+ markdown knowledge base to provide personalized tutoring, assignments, and guidance.

## Architecture

### Agent Hierarchy

```
                    ┌─────────────────┐
                    │   DEAN AGENT    │
                    │  (Orchestrator) │
                    └────────┬────────┘
                             │
        ┌────────────────────┼────────────────────┐
        │                    │                    │
        ▼                    ▼                    ▼
┌───────────────┐   ┌───────────────┐   ┌───────────────┐
│  AI/ML        │   │  Cybersec     │   │  Biomedical   │
│  Professor    │   │  Professor    │   │  Professor    │
└───────────────┘   └───────────────┘   └───────────────┘
        │                    │                    │
        └────────────────────┼────────────────────┘
                             │
              ┌──────────────┴──────────────┐
              │                             │
              ▼                             ▼
     ┌─────────────────┐           ┌─────────────────┐
     │   TUTOR AGENT   │           │ ASSIGNMENT AGENT│
     │  (Explainer)    │           │  (Creator)      │
     └─────────────────┘           └─────────────────┘
              │                             │
              ▼                             ▼
     ┌─────────────────┐           ┌─────────────────┐
     │   GRADER AGENT  │◄──────────┤ RESOURCE AGENT  │
     │  (Evaluator)    │           │  (Curator)      │
     └─────────────────┘           └─────────────────┘
```

## Agent Roles

### 1. Dean Agent (Orchestrator)
- Routes student queries to appropriate domain professors
- Manages learning progress across schools
- Coordinates multi-agent collaborations
- Tracks overall curriculum completion

### 2. Domain Professor Agents (Specialized)
Each professor specializes in specific schools:
- **AI/ML Professor**: Schools 010_AI, 09_Data_Engineering
- **Robotics Professor**: School 011_Robotics_and_Automation
- **Cybersecurity Professor**: School 012_Cybersecurity
- **DevOps/SRE Professor**: School 013_Devops_Platforms_Engineering_SRE
- **Supply Chain Professor**: School 014_Supply_Chain
- **Systems Engineering Professor**: School 015_System_Engineering
- **Industrial Intelligence Professor**: School 016_School_of_Industrial_Intelligence
- **Biomedical Professor**: Schools 017_Biomedical, 017_Regulatory_Science
- **Research Professor**: School 018_Research
- **Product Design Professor**: School 019_Product_Design
- **Electronics Professor**: School 02_Electronics
- **Embedded Systems Professor**: School 03_Embedded_Systems
- **Computer Engineering Professor**: School 04-Computer_Engineering
- **Networking Professor**: School 05_Networking
- **Cloud Engineering Professor**: School 06_Cloud_Engineering
- **Software Engineering Professor**: School 07_SE
- **Database Professor**: School 08_Databases
- **Business Professor**: Schools 020_Business, 022_Leadership, 023_Entrepreneurship
- **Innovation Professor**: School 021_Innovation
- **Standards Professor**: School 024_Global_Standards
- **Industry Domains Professor**: School 025_Industry_Domains
- **First Principles Professor**: School 01_First_Principles

### 3. Tutor Agent
- Breaks down complex concepts into digestible explanations
- Adapts teaching style to student's level (L1-L4)
- Provides examples and analogies
- Answers follow-up questions

### 4. Assignment Agent
- Generates practice problems based on current topic
- Creates projects aligned with learning objectives
- Designs capstone challenges
- Scaffolds difficulty progressively

### 5. Grader Agent
- Evaluates student submissions
- Provides detailed feedback
- Identifies knowledge gaps
- Suggests remediation paths

### 6. Resource Agent
- Curates best external resources (papers, videos, docs)
- Links to relevant markdown files in your vault
- Recommends next modules based on progress
- Maintains resource quality ratings

## Directory Structure

```
ai_tutor_system/
├── agents/
│   ├── __init__.py
│   ├── dean_agent.py          # Orchestrator
│   ├── professor_agents.py    # Domain specialists
│   ├── tutor_agent.py         # Explainer
│   ├── assignment_agent.py    # Problem creator
│   ├── grader_agent.py        # Evaluator
│   └── resource_agent.py      # Resource curator
├── config/
│   ├── __init__.py
│   ├── agent_config.yaml      # Agent configurations
│   ├── school_mapping.yaml    # School-to-professor mapping
│   └── prompts/               # Agent prompt templates
├── knowledge_base/
│   ├── __init__.py
│   ├── indexer.py             # RAG indexing system
│   ├── retriever.py           # Semantic search
│   └── context_builder.py     # Context assembly
├── interfaces/
│   ├── __init__.py
│   ├── cli.py                 # Command-line interface
│   ├── api.py                 # REST API (FastAPI)
│   └── chat_interface.py      # Interactive chat
├── utils/
│   ├── __init__.py
│   ├── llm_client.py          # Qwen/API client
│   ├── progress_tracker.py    # Learning progress
│   └── validators.py          # Input/output validation
├── requirements.txt
├── main.py                    # Entry point
└── README.md
```

## Technology Stack

- **LLM Backend**: Qwen (3.8B or larger via API)
- **RAG Engine**: LangChain + ChromaDB/FAISS
- **Agent Framework**: LangGraph or custom implementation
- **API Layer**: FastAPI
- **Database**: SQLite (progress tracking) + Vector DB (knowledge)
- **Interface**: CLI + Web UI (optional)

## Getting Started

### Prerequisites
```bash
pip install -r requirements.txt
```

### Configuration
1. Set up your LLM API key in `config/.env`
2. Configure school mappings in `config/school_mapping.yaml`
3. Customize agent prompts in `config/prompts/`

### Indexing Your Knowledge Base
```bash
python -m knowledge_base.indexer --source /workspace --output ./vector_store
```

### Running the System

#### CLI Mode
```bash
python main.py --mode chat --topic "Machine Learning Basics"
```

#### API Mode
```bash
python -m interfaces.api --host 0.0.0.0 --port 8000
```

Then access at `http://localhost:8000/docs`

## Usage Examples

### Ask a Question
```bash
python main.py ask "Explain backpropagation like I'm L2"
```

### Get an Assignment
```bash
python main.py assign --school 010_AI --module Module_3 --level L3
```

### Submit for Grading
```bash
python main.py grade --assignment-id 12345 --submission ./my_solution.py
```

### Track Progress
```bash
python main.py progress --school 07_SE
```

## Customization

### Adding New Agents
Create new agent classes in `agents/` following the base agent pattern.

### Customizing Prompts
Edit prompt templates in `config/prompts/` to match your learning style.

### Extending School Coverage
Update `config/school_mapping.yaml` to add new domain professors.

## Next Steps

1. ✅ **Phase 1**: Core infrastructure (this setup)
2. 🔄 **Phase 2**: Implement RAG indexing for your 11,940 files
3. ⏳ **Phase 3**: Build Dean + 3 pilot professor agents
4. ⏳ **Phase 4**: Create Tutor and Assignment agents
5. ⏳ **Phase 5**: Develop CLI interface
6. ⏳ **Phase 6**: Add Grader and Resource agents
7. ⏳ **Phase 7**: Build web interface
8. ⏳ **Phase 8**: Full deployment with all 22+ professors

## License
Personal use - Your private university AI faculty
