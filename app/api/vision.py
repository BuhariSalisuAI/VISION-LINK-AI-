from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def vision():
    return {"message": "Vision module coming soon"}