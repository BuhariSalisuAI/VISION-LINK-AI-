from fastapi import APIRouter

router = APIRouter()

@router.get("/status")
def rag_status():
    return {"status": "RAG service active"}