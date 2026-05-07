# app/schemas/response.py

from pydantic import BaseModel
from typing import Optional


class ChatResponse(BaseModel):
    """
    Standard chat response
    """

    response: str
    language: str
    source: Optional[str] = None
    success: bool = True


class ErrorResponse(BaseModel):
    """
    Error response schema
    """

    success: bool = False
    error: str