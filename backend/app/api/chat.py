from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional

from app.agents.orchestrator import run_pipeline

router = APIRouter()

# -----------------------
# Request Schema
# -----------------------
class ChatRequest(BaseModel):
    message: str
    language: Optional[str] = "auto"   # Swahili / Akan / Luganda / auto
    user_id: Optional[str] = None


# -----------------------
# Response Schema
# -----------------------
class ChatResponse(BaseModel):
    response: str
    language: str
    source: Optional[str] = None   # RAG source info


# -----------------------
# Main Chat Endpoint
# -----------------------
@router.post("/", response_model=ChatResponse)
async def chat(req: ChatRequest):
    try:
        result = run_pipeline(
            query=req.message,
            language=req.language
        )

        return ChatResponse(
            response=result.get("response"),
            language=result.get("language", "unknown"),
            source=result.get("source", None)
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))