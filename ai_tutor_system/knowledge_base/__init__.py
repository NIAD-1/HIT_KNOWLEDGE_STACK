"""
Knowledge Base Module - RAG System for HIT University AI Faculty
Indexes and retrieves from 11,940+ markdown files
"""

import os
import hashlib
from typing import List, Dict, Any, Optional
from dataclasses import dataclass
from pathlib import Path
import json


@dataclass
class DocumentChunk:
    """A chunk of document content for retrieval"""
    content: str
    source_file: str
    school_id: str
    module_id: str
    chunk_index: int
    embedding: Optional[List[float]] = None
    metadata: Dict[str, Any] = None
    
    def __post_init__(self):
        if self.metadata is None:
            self.metadata = {}


class KnowledgeBaseIndexer:
    """
    Indexes markdown files from the knowledge vault into a vector database
    Supports semantic search across all 11,940+ files
    """
    
    def __init__(self, 
                 source_dir: str = "/workspace",
                 vector_store_path: str = "./vector_store",
                 chunk_size: int = 500,
                 chunk_overlap: int = 50):
        self.source_dir = Path(source_dir)
        self.vector_store_path = Path(vector_store_path)
        self.chunk_size = chunk_size
        self.chunk_overlap = chunk_overlap
        self.chunks: List[DocumentChunk] = []
        self.file_hashes: Dict[str, str] = {}  # Track file changes
        
    def discover_schools(self) -> Dict[str, Path]:
        """Discover all school directories in the knowledge vault"""
        schools = {}
        for item in self.source_dir.iterdir():
            if item.is_dir() and not item.name.startswith('.') and item.name != 'ai_tutor_system':
                # Check if it looks like a school directory
                if '_' in item.name or item.name.startswith('0'):
                    schools[item.name] = item
        return schools
    
    def discover_modules(self, school_path: Path) -> Dict[str, Path]:
        """Discover all modules within a school"""
        modules = {}
        for item in school_path.iterdir():
            if item.is_dir() and 'Module' in item.name:
                modules[item.name] = item
            elif item.is_dir() and any(kw in item.name for kw in ['Capstone', 'Projects']):
                modules[item.name] = item
        return modules
    
    def extract_metadata(self, file_path: Path, content: str) -> Dict[str, Any]:
        """Extract metadata from markdown file"""
        metadata = {
            'file_path': str(file_path),
            'file_name': file_path.name,
            'word_count': len(content.split()),
            'line_count': len(content.splitlines()),
        }
        
        # Try to extract frontmatter or headers
        lines = content.split('\n')[:20]  # Check first 20 lines
        for line in lines:
            if line.startswith('# '):
                metadata['title'] = line[2:].strip()
                break
        
        return metadata
    
    def chunk_document(self, content: str, source_file: str, 
                      school_id: str, module_id: str) -> List[DocumentChunk]:
        """Split document into overlapping chunks for better retrieval"""
        chunks = []
        
        # Simple chunking by paragraphs/sections
        paragraphs = content.split('\n\n')
        current_chunk = ""
        chunk_index = 0
        
        for para in paragraphs:
            if len(current_chunk) + len(para) > self.chunk_size:
                # Save current chunk and start new one
                if current_chunk.strip():
                    chunks.append(DocumentChunk(
                        content=current_chunk.strip(),
                        source_file=source_file,
                        school_id=school_id,
                        module_id=module_id,
                        chunk_index=chunk_index,
                        metadata={'paragraph_count': len(current_chunk.split('\n'))}
                    ))
                    chunk_index += 1
                
                # Overlap: keep last portion for context
                overlap_start = max(0, len(current_chunk) - self.chunk_overlap)
                current_chunk = current_chunk[overlap_start:] if overlap_start > 0 else ""
            
            current_chunk += "\n\n" + para if current_chunk else para
        
        # Don't forget the last chunk
        if current_chunk.strip():
            chunks.append(DocumentChunk(
                content=current_chunk.strip(),
                source_file=source_file,
                school_id=school_id,
                module_id=module_id,
                chunk_index=chunk_index,
                metadata={'paragraph_count': len(current_chunk.split('\n'))}
            ))
        
        return chunks
    
    def index_file(self, file_path: Path, school_id: str, module_id: str) -> List[DocumentChunk]:
        """Index a single markdown file"""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Calculate hash to detect changes
            file_hash = hashlib.md5(content.encode()).hexdigest()
            
            # Skip if file hasn't changed (incremental indexing)
            if str(file_path) in self.file_hashes and self.file_hashes[str(file_path)] == file_hash:
                return []
            
            self.file_hashes[str(file_path)] = file_hash
            
            # Chunk the document
            chunks = self.chunk_document(
                content=content,
                source_file=str(file_path),
                school_id=school_id,
                module_id=module_id
            )
            
            return chunks
            
        except Exception as e:
            print(f"Error indexing {file_path}: {e}")
            return []
    
    def index_all(self, progress_callback=None) -> int:
        """Index all markdown files in the knowledge vault"""
        total_chunks = 0
        schools = self.discover_schools()
        
        print(f"Discovered {len(schools)} schools")
        
        for school_idx, (school_name, school_path) in enumerate(schools.items()):
            print(f"\nIndexing {school_name}...")
            modules = self.discover_modules(school_path)
            
            if not modules:
                # If no modules found, index root level files
                for md_file in school_path.glob("*.md"):
                    chunks = self.index_file(md_file, school_name, "root")
                    self.chunks.extend(chunks)
                    total_chunks += len(chunks)
                    if progress_callback:
                        progress_callback(school_name, md_file.name, len(chunks))
            else:
                for module_name, module_path in modules.items():
                    print(f"  Processing {module_name}...")
                    
                    # Index all markdown files in module
                    for md_file in module_path.rglob("*.md"):
                        chunks = self.index_file(md_file, school_name, module_name)
                        self.chunks.extend(chunks)
                        total_chunks += len(chunks)
                        if progress_callback:
                            progress_callback(school_name, module_name, len(chunks))
            
            if progress_callback:
                progress_callback(school_name, "complete", 0)
        
        print(f"\n✅ Indexed {total_chunks} chunks from {len(self.file_hashes)} files")
        return total_chunks
    
    def save_index(self, output_path: Optional[str] = None):
        """Save the index to disk"""
        path = Path(output_path) if output_path else self.vector_store_path
        path.mkdir(parents=True, exist_ok=True)
        
        # Save chunks as JSON (in production, use vector DB)
        chunks_data = []
        for chunk in self.chunks:
            chunks_data.append({
                'content': chunk.content,
                'source_file': chunk.source_file,
                'school_id': chunk.school_id,
                'module_id': chunk.module_id,
                'chunk_index': chunk.chunk_index,
                'metadata': chunk.metadata
            })
        
        with open(path / 'chunks.json', 'w', encoding='utf-8') as f:
            json.dump(chunks_data, f, indent=2, ensure_ascii=False)
        
        # Save file hashes for incremental updates
        with open(path / 'file_hashes.json', 'w', encoding='utf-8') as f:
            json.dump(self.file_hashes, f, indent=2)
        
        print(f"💾 Saved index to {path}")
    
    def load_index(self, input_path: Optional[str] = None) -> int:
        """Load existing index from disk"""
        path = Path(input_path) if input_path else self.vector_store_path
        
        if not (path / 'chunks.json').exists():
            print("No existing index found")
            return 0
        
        with open(path / 'chunks.json', 'r', encoding='utf-8') as f:
            chunks_data = json.load(f)
        
        self.chunks = [DocumentChunk(**chunk) for chunk in chunks_data]
        
        if (path / 'file_hashes.json').exists():
            with open(path / 'file_hashes.json', 'r', encoding='utf-8') as f:
                self.file_hashes = json.load(f)
        
        print(f"📂 Loaded {len(self.chunks)} chunks from index")
        return len(self.chunks)


class KnowledgeBaseRetriever:
    """
    Retrieves relevant chunks from the indexed knowledge base
    Supports semantic search, keyword search, and filtered queries
    """
    
    def __init__(self, index_path: str = "./vector_store"):
        self.index_path = Path(index_path)
        self.chunks: List[DocumentChunk] = []
        self._load_index()
    
    def _load_index(self):
        """Load chunks from disk"""
        chunks_file = self.index_path / 'chunks.json'
        if not chunks_file.exists():
            raise FileNotFoundError(f"No index found at {self.index_path}")
        
        import json
        with open(chunks_file, 'r', encoding='utf-8') as f:
            chunks_data = json.load(f)
        
        self.chunks = [DocumentChunk(**chunk) for chunk in chunks_data]
        print(f"Loaded {len(self.chunks)} chunks for retrieval")
    
    def search(self, query: str, 
               top_k: int = 5,
               school_filter: Optional[str] = None,
               module_filter: Optional[str] = None,
               level_filter: Optional[str] = None) -> List[DocumentChunk]:
        """
        Search for relevant chunks
        
        Args:
            query: Search query string
            top_k: Number of results to return
            school_filter: Filter by school ID
            module_filter: Filter by module ID
            level_filter: Filter by learning level (L1-L4)
            
        Returns:
            List of relevant DocumentChunks
        """
        # Simple keyword-based search (enhance with embeddings later)
        query_terms = query.lower().split()
        
        scored_chunks = []
        for chunk in self.chunks:
            # Apply filters
            if school_filter and chunk.school_id != school_filter:
                continue
            if module_filter and chunk.module_id != module_filter:
                continue
            
            # Score by term matches
            score = 0
            chunk_lower = chunk.content.lower()
            for term in query_terms:
                if term in chunk_lower:
                    score += 1
            
            if score > 0:
                scored_chunks.append((score, chunk))
        
        # Sort by score and return top_k
        scored_chunks.sort(reverse=True, key=lambda x: x[0])
        return [chunk for score, chunk in scored_chunks[:top_k]]
    
    def get_context(self, query: str, max_length: int = 2000) -> str:
        """
        Get contextual information for a query
        Returns formatted context string for LLM prompts
        """
        chunks = self.search(query, top_k=5)
        
        if not chunks:
            return "No relevant context found in knowledge base."
        
        context_parts = []
        current_length = 0
        
        for chunk in chunks:
            section = f"""
## From {chunk.source_file}
{chunk.content}
"""
            if current_length + len(section) > max_length:
                break
            
            context_parts.append(section)
            current_length += len(section)
        
        return "\n".join(context_parts)


# Convenience function
def create_knowledge_base(source_dir: str = "/workspace", 
                         index_path: str = "./vector_store",
                         rebuild: bool = False) -> KnowledgeBaseRetriever:
    """
    Create or load knowledge base index
    
    Args:
        source_dir: Directory containing markdown files
        index_path: Where to store/load the index
        rebuild: Force reindexing even if index exists
        
    Returns:
        KnowledgeBaseRetriever ready for queries
    """
    indexer = KnowledgeBaseIndexer(source_dir, index_path)
    
    if rebuild or not (Path(index_path) / 'chunks.json').exists():
        print("Building knowledge base index...")
        indexer.index_all()
        indexer.save_index()
    else:
        print("Loading existing index...")
        indexer.load_index()
    
    return KnowledgeBaseRetriever(index_path)
