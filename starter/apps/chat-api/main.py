from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse
from starlette.status import HTTP_500_INTERNAL_SERVER_ERROR
from error_responses import AppError, format_error
import logging
import uuid
from pydantic import BaseModel
from typing import List
from retrieval_service import retrieve_context
from llm_service import generate_response

app = FastAPI(title="RAG Chat API")
# Serve static frontend (toast-enabled UI)
app.mount("/public", StaticFiles(directory="public"), name="public")
logger = logging.getLogger("uvicorn.error")

class UserQuery(BaseModel):
    user_id: str
    query: str

@app.post("/chat")
def chat(req: UserQuery):
    try:
        docs = retrieve_context(req.query)
        prompt = (
            "You are an assistant. Use the following context to answer the user:\n"
            + "\n".join(f"- {d}" for d in docs)
            + f"\n\nUser: {req.query}\nAssistant:"
        )
        answer = generate_response(prompt, req.query)
        return {"answer": answer, "context_used": len(docs), "docs": docs}
    except AppError as ae:
        # Known error type from internal logic
        trace_id = getattr(ae, 'trace_id', str(uuid.uuid4()))
        logger.error("AppError: %s (trace_id=%s)", ae.message, trace_id)
        return JSONResponse(status_code=ae.status_code, content=format_error(ae.message, ae.code, ae.details, ae.status_code, trace_id))
    except Exception as e:
        trace_id = str(uuid.uuid4())
        logger.exception("Unhandled error (trace_id=%s)", trace_id)
        return JSONResponse(status_code=HTTP_500_INTERNAL_SERVER_ERROR, content=format_error("Internal server error", "INTERNAL_ERROR", str(e), HTTP_500_INTERNAL_SERVER_ERROR, trace_id))

@app.get("/debug/error")
def debug_error(code: str = 'INTERNAL_ERROR', message: str = 'Test error', status: int = 400):
  trace_id = str(uuid.uuid4())
  return JSONResponse(status_code=status, content=format_error(message, code, None, status, trace_id))

@app.get("/debug/success")
def debug_success(with_extra: str = 'false'):
  trace_id = str(uuid.uuid4())
  payload = {"result": {"ok": True, "trace_id": trace_id, "data": "successful operation"}}
  if with_extra.lower() == 'true':
    payload["result"]["extra"] = {"note": "extended payload", "ts": 123456789}
  return payload
