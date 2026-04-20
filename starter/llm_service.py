def generate_response(prompt: str, user_query: str) -> str:
    # Simple heuristic-based mock LLM for starter
    lower = (prompt or "").lower()
    if "pricing" in lower:
        return "Here is pricing guidance based on the provided context."
    if user_query:
        return f"This is a generated answer for: {user_query}."
    return "Generated answer based on provided context."
