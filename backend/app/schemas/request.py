# app/schemas/request.py

from pydantic import BaseModel
from typing import Optional


class ChatRequest(BaseModel):
    """
    Main chat request schema
    """
    message: str
    language: Optional[str] = "auto"
    user_id: Optional[str] = None


class VisionRequest(BaseModel):
    """
    Vision module request
    """
    image_path: str
    prompt: Optional[str] = None


class SpeechRequest(BaseModel):
    """
    Speech processing request
    """
    audio_path: str
    language: Optional[str] = "auto"