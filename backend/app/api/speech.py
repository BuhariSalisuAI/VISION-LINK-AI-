from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def speech():
    return {"message": "Speech module coming soon"}