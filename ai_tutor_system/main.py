#!/usr/bin/env python3
"""
HIT University AI Faculty - Main Entry Point
Multi-Agent Tutor System for Personalized Learning
"""

import asyncio
import argparse
import sys
from pathlib import Path

# Add the ai_tutor_system to path
sys.path.insert(0, str(Path(__file__).parent))

from agents import DeanAgent, ProfessorAgent, AgentResponse
from knowledge_base import create_knowledge_base, KnowledgeBaseRetriever


class HITUniversityAI:
    """Main orchestrator for the AI Faculty system"""
    
    def __init__(self, config_path: str = None):
        self.config_path = config_path or "config"
        self.dean = DeanAgent()
        self.knowledge_base: KnowledgeBaseRetriever = None
        self.professors_initialized = False
        
    def initialize(self, rebuild_index: bool = False):
        """Initialize the system - load knowledge base and register professors"""
        print("🎓 Initializing HIT University AI Faculty...")
        
        # Load school mapping
        import yaml
        config_file = Path(self.config_path) / "school_mapping.yaml"
        
        if not config_file.exists():
            print(f"⚠️  Config file not found: {config_file}")
            return
        
        with open(config_file, 'r') as f:
            self.config = yaml.safe_load(f)
        
        # Initialize knowledge base
        print("\n📚 Loading knowledge base (11,940+ files)...")
        try:
            self.knowledge_base = create_knowledge_base(
                source_dir="/workspace",
                index_path="./vector_store",
                rebuild=rebuild_index
            )
            print("✅ Knowledge base ready")
        except Exception as e:
            print(f"⚠️  Could not load knowledge base: {e}")
            print("   Continuing without RAG capabilities...")
        
        # Register professor agents
        print("\n👨‍🏫 Registering faculty...")
        schools = self.config.get('schools', {})
        
        for school_id, school_info in schools.items():
            professor = ProfessorAgent(
                school_id=school_id,
                school_name=school_info.get('professor', school_id),
                description=school_info.get('description', '')
            )
            self.dean.register_professor(school_id, professor)
            print(f"   ✓ {professor.name}")
        
        self.professors_initialized = True
        print(f"\n✅ Registered {len(schools)} professors")
        
    async def ask(self, question: str, level: str = "L1", school: str = None):
        """Ask a question and get an answer from the appropriate professor"""
        if not self.professors_initialized:
            return "System not initialized. Run initialize() first."
        
        context = {
            'level': level,
            'school': school,
            'knowledge_base_available': self.knowledge_base is not None
        }
        
        # Get context from knowledge base if available
        if self.knowledge_base:
            kb_context = self.knowledge_base.get_context(question)
            context['knowledge_context'] = kb_context
        
        # Dean routes to appropriate professor
        response = await self.dean.process_request(question, context)
        
        return response
    
    async def assign(self, school: str, module: str, level: str = "L2"):
        """Get an assignment from a specific school/module"""
        if school not in self.dean.professors:
            return f"School {school} not found. Available: {list(self.dean.professors.keys())}"
        
        professor = self.dean.professors[school]
        request = f"Create an assignment for module {module} at level {level}"
        
        response = await professor.process_request(request, {
            'level': level,
            'module': module,
            'task_type': 'assignment'
        })
        
        return response
    
    async def chat(self):
        """Interactive chat mode"""
        print("\n" + "="*60)
        print("🎓 HIT University AI Faculty - Interactive Mode")
        print("="*60)
        print("\nCommands:")
        print("  /ask <question>     - Ask a question")
        print("  /assign <school>    - Get an assignment")
        print("  /progress           - Check your progress")
        print("  /schools            - List available schools")
        print("  /level <L1-L4>      - Set learning level")
        print("  /quit               - Exit")
        print("="*60 + "\n")
        
        current_level = "L1"
        
        while True:
            try:
                user_input = input("🧑‍🎓 Student: ").strip()
                
                if not user_input:
                    continue
                
                if user_input.lower() in ['/quit', '/exit', 'quit', 'exit']:
                    print("\n👋 Good luck with your studies! Come back soon.\n")
                    break
                
                if user_input.startswith('/'):
                    parts = user_input.split()
                    command = parts[0].lower()
                    
                    if command == '/ask' and len(parts) > 1:
                        question = ' '.join(parts[1:])
                        print("\n🤖 Processing...")
                        response = await self.ask(question, current_level)
                        print(f"\n{response.content}\n")
                    
                    elif command == '/assign' and len(parts) > 1:
                        school = parts[1]
                        module = parts[2] if len(parts) > 2 else "Module_1"
                        print("\n🤖 Generating assignment...")
                        response = await self.assign(school, module, current_level)
                        print(f"\n{response.content}\n")
                    
                    elif command == '/level' and len(parts) > 1:
                        new_level = parts[1].upper()
                        if new_level in ['L1', 'L2', 'L3', 'L4']:
                            current_level = new_level
                            print(f"✅ Learning level set to {current_level}\n")
                        else:
                            print("❌ Invalid level. Use L1, L2, L3, or L4\n")
                    
                    elif command == '/schools':
                        print("\n📚 Available Schools:")
                        for school_id, prof in self.dean.professors.items():
                            print(f"  • {school_id}: {prof.name}")
                        print()
                    
                    elif command == '/progress':
                        print("\n📊 Progress tracking coming soon...\n")
                    
                    else:
                        print(f"❌ Unknown command: {command}\n")
                
                else:
                    # Treat as a question
                    print("\n🤖 Processing...")
                    response = await self.ask(user_input, current_level)
                    print(f"\n{response.content}\n")
                    
            except KeyboardInterrupt:
                print("\n\n👋 Goodbye!\n")
                break
            except Exception as e:
                print(f"\n❌ Error: {e}\n")


def main():
    parser = argparse.ArgumentParser(
        description="HIT University AI Faculty - Your Personal Multi-Agent Tutor"
    )
    
    subparsers = parser.add_subparsers(dest='command', help='Command to run')
    
    # Chat command
    chat_parser = subparsers.add_parser('chat', help='Interactive chat mode')
    
    # Ask command
    ask_parser = subparsers.add_parser('ask', help='Ask a question')
    ask_parser.add_argument('question', type=str, help='Your question')
    ask_parser.add_argument('--level', '-l', default='L1', choices=['L1', 'L2', 'L3', 'L4'],
                           help='Learning level')
    ask_parser.add_argument('--school', '-s', type=str, help='Specific school')
    
    # Assign command
    assign_parser = subparsers.add_parser('assign', help='Get an assignment')
    assign_parser.add_argument('--school', '-s', required=True, help='School ID')
    assign_parser.add_argument('--module', '-m', default='Module_1', help='Module name')
    assign_parser.add_argument('--level', '-l', default='L2', choices=['L1', 'L2', 'L3', 'L4'],
                              help='Learning level')
    
    # Index command
    index_parser = subparsers.add_parser('index', help='Rebuild knowledge base index')
    index_parser.add_argument('--rebuild', '-r', action='store_true',
                             help='Force rebuild even if index exists')
    
    args = parser.parse_args()
    
    # Create and initialize system
    university = HITUniversityAI()
    
    if args.command == 'index':
        university.initialize(rebuild_index=args.rebuild)
    elif args.command in ['ask', 'assign', 'chat', None]:
        university.initialize(rebuild_index=False)
        
        if args.command == 'ask':
            response = asyncio.run(university.ask(
                args.question, 
                args.level, 
                args.school
            ))
            print(response.content if hasattr(response, 'content') else response)
            
        elif args.command == 'assign':
            response = asyncio.run(university.assign(
                args.school,
                args.module,
                args.level
            ))
            print(response.content if hasattr(response, 'content') else response)
            
        elif args.command == 'chat' or args.command is None:
            asyncio.run(university.chat())
    else:
        parser.print_help()


if __name__ == "__main__":
    main()
