AI/LLM Chatbot Template — Architecture Overview

- Client: Web or mobile app
- API layer: FastAPI / NestJS wrapper exposing /chat endpoint
- Retrieval: generate embedding for user query and search vector store for top-k docs
- LLM: build a contextual prompt with retrieved docs and user input; optional streaming
- Memory: per-session short-term memory for context continuity
- Data governance: tenant-aware data handling, logging, and access controls
- Infra: Docker Compose for local dev; Kubernetes manifests for prod; IaC patterns for cloud resources

Notes:
- Pluggable providers for LLMs and vector stores; swap in/out with minimal code changes
- Emphasize data minimization and prompt safety gates in production
