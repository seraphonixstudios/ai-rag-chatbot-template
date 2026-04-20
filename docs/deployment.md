Deployment Guide — AI/LLM Chatbot Template

Local development
- Run: docker-compose up --build
- Services: chat-api, retrieval-service, llm-service, vector-store (mock)
- Expose: http://localhost:8000/chat

Production considerations
- Move to real vector store (Pinecone/Weaviate) and a managed LLM endpoint
- Setup CI/CD to push changes and trigger deployments
- Add secrets management and strict RBAC

Observability
- Enable OpenTelemetry instrumentation; push metrics to Prometheus; dashboards in Grafana
