"""
Agent Base Module - HIT University AI Faculty
"""

from abc import ABC, abstractmethod
from typing import Dict, List, Optional, Any
from dataclasses import dataclass
from enum import Enum


class AgentRole(Enum):
    DEAN = "dean"
    PROFESSOR = "professor"
    TUTOR = "tutor"
    ASSIGNMENT = "assignment"
    GRADER = "grader"
    RESOURCE = "resource"


class LearningLevel(Enum):
    L1 = "L1"  # Foundational
    L2 = "L2"  # Intermediate
    L3 = "L3"  # Advanced
    L4 = "L4"  # Expert


@dataclass
class AgentMessage:
    """Standard message format for inter-agent communication"""
    sender: str
    recipient: str
    content: str
    metadata: Dict[str, Any] = None
    
    def __post_init__(self):
        if self.metadata is None:
            self.metadata = {}


@dataclass
class AgentResponse:
    """Standard response format from agents"""
    success: bool
    content: str
    agent_name: str
    routing_info: Optional[Dict[str, str]] = None
    suggestions: Optional[List[str]] = None
    error_message: Optional[str] = None


class BaseAgent(ABC):
    """Abstract base class for all agents in the system"""
    
    def __init__(self, name: str, role: AgentRole, config: Dict[str, Any] = None):
        self.name = name
        self.role = role
        self.config = config or {}
        self.prompt_template = self._load_prompt_template()
        
    @abstractmethod
    def _load_prompt_template(self) -> str:
        """Load the system prompt template for this agent"""
        pass
    
    @abstractmethod
    async def process_request(self, request: str, context: Dict[str, Any] = None) -> AgentResponse:
        """
        Process a student request and return a response
        
        Args:
            request: The student's query or command
            context: Additional context (learning level, history, etc.)
            
        Returns:
            AgentResponse with the agent's answer
        """
        pass
    
    @abstractmethod
    def can_handle(self, request: str, context: Dict[str, Any] = None) -> float:
        """
        Determine if this agent can handle the request
        
        Args:
            request: The student's query
            context: Additional context
            
        Returns:
            Confidence score between 0.0 and 1.0
        """
        pass
    
    def _build_prompt(self, request: str, context: Dict[str, Any] = None) -> str:
        """Build the full prompt including system instructions and user request"""
        context_str = ""
        if context:
            context_items = [f"{k}: {v}" for k, v in context.items()]
            context_str = "\n\nContext:\n" + "\n".join(context_items)
        
        return f"{self.prompt_template}\n\nStudent Request:{context_str}\n\n{request}"
    
    def format_response(self, content: str, **kwargs) -> AgentResponse:
        """Format a successful response"""
        return AgentResponse(
            success=True,
            content=content,
            agent_name=self.name,
            routing_info=kwargs.get('routing_info'),
            suggestions=kwargs.get('suggestions')
        )
    
    def format_error(self, error_message: str) -> AgentResponse:
        """Format an error response"""
        return AgentResponse(
            success=False,
            content="",
            agent_name=self.name,
            error_message=error_message
        )


class DeanAgent(BaseAgent):
    """
    Dean Agent - Orchestrates the multi-agent system
    Routes requests to appropriate professors and coordinates responses
    """
    
    def __init__(self, config: Dict[str, Any] = None):
        super().__init__(
            name="Dean",
            role=AgentRole.DEAN,
            config=config
        )
        self.professors = {}  # Will be populated with professor agents
        self.school_mapping = {}  # School to professor mapping
        
    def register_professor(self, school_id: str, professor: 'ProfessorAgent'):
        """Register a professor agent for a specific school"""
        self.professors[school_id] = professor
        self.school_mapping[school_id] = professor.name
        
    def _load_prompt_template(self) -> str:
        try:
            with open('config/prompts/dean_agent_prompt.md', 'r') as f:
                return f.read()
        except FileNotFoundError:
            return "# Dean Agent Prompt\n\nYou are the Dean of HIT University AI Faculty..."
    
    async def process_request(self, request: str, context: Dict[str, Any] = None) -> AgentResponse:
        """Analyze request and route to appropriate professor(s)"""
        # This will be implemented with LLM integration
        return self.format_response(
            content=f"Dean received your request: {request}",
            routing_info={"status": "routing_pending"}
        )
    
    def can_handle(self, request: str, context: Dict[str, Any] = None) -> float:
        """Dean can technically handle anything, but prefers to delegate"""
        return 0.5  # Medium confidence - dean orchestrates but doesn't teach directly


class ProfessorAgent(BaseAgent):
    """
    Professor Agent - Domain expert for a specific school
    Provides teaching, explanations, and creates assignments
    """
    
    def __init__(self, school_id: str, school_name: str, description: str, config: Dict[str, Any] = None):
        self.school_id = school_id
        self.school_name = school_name
        self.description = description
        name = f"{school_name.replace('_', ' ').title()} Professor"
        super().__init__(
            name=name,
            role=AgentRole.PROFESSOR,
            config=config
        )
        self.specialization_keywords = self._extract_keywords()
        
    def _extract_keywords(self) -> List[str]:
        """Extract keywords from school name and description for routing"""
        # Simple keyword extraction - can be enhanced with NLP
        keywords = []
        keywords.extend(self.school_name.lower().split('_'))
        keywords.extend(self.description.lower().split())
        return list(set(keywords))
    
    def _load_prompt_template(self) -> str:
        try:
            with open('config/prompts/professor_agent_prompt.md', 'r') as f:
                template = f.read()
                # Replace placeholders
                template = template.replace("{PROFESSOR_NAME}", self.name)
                template = template.replace("{SCHOOL_NAME}", self.school_name)
                template = template.replace("{DESCRIPTION}", self.description)
                return template
        except FileNotFoundError:
            return f"# Professor {self.name} Prompt\n\nYou are an expert in {self.school_name}..."
    
    async def process_request(self, request: str, context: Dict[str, Any] = None) -> AgentResponse:
        """Process teaching request within domain expertise"""
        # This will be implemented with LLM integration
        learning_level = context.get('level', 'L1') if context else 'L1'
        return self.format_response(
            content=f"Professor {self.name} will teach you about: {request} at level {learning_level}",
            suggestions=[f"Practice exercises on {request}", f"Advanced topics in {self.school_name}"]
        )
    
    def can_handle(self, request: str, context: Dict[str, Any] = None) -> float:
        """Check if request matches this professor's domain"""
        request_lower = request.lower()
        matches = sum(1 for keyword in self.specialization_keywords if keyword in request_lower)
        return min(matches / max(len(self.specialization_keywords), 1), 1.0)


# Additional agent classes will be added in subsequent files
# TutorAgent, AssignmentAgent, GraderAgent, ResourceAgent
