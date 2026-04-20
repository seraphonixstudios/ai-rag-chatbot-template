from typing import List

# Simple in-memory docs store for starter
DOCS_STORE = [
    {"id": "doc1", "text": "Overview of AI safety policies and governance."},
    {"id": "doc2", "text": "Customer support workflows and escalation guides."},
    {"id": "doc3", "text": "Product FAQ and onboarding steps."},
]

def retrieve_context(query: str, top_k: int = 2) -> List[str]:
    # Very simple relevance mock: return first top_k docs; replace with vector search in real setup
    return [d["text"] for d in DOCS_STORE[:top_k]]
