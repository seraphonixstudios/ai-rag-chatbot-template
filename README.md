AI/LLM RAG Chatbot Template

A starter boilerplate for building retrieval-augmented generation chatbots. Provides a reference architecture, starter code, and deployment guidance to help you ship quickly.

What’s inside:
- Architectural overview and starter repo layout
- Minimal chat API and retrieval/LLM glue (extensible to your providers)
- Basic data ingestion and prompt templates
- Local development docker-compose setup and Kubernetes-ready manifests
- Observability and security baseline

Usage: customize the starter to your data sources, embeddings, and LLM provider, then extend with your domain prompts and governance rules.

Next steps: tell me your preferred cloud and vector store, and I’ll tailor the starter for you.
# AI/LLM RAG Chatbot Template
 
UI Smoke Tests
- Run UI tests from: starter/tests/ui
- Commands:
  1) cd ai-rag-chatbot-template/starter/tests/ui
  2) npm install
  3) npm run test-ui
- Tests cover test-errors.html across Chromium, Firefox, and WebKit; ensure the AI test server is running (port 8000).
