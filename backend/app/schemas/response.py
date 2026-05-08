# app/schemas/response.py

from pydantic import BaseModel
from typing import Optional

class ChatResponse(BaseModel):

    response: str
    status: str = "success"
    

class ErrorResponse(BaseModel):
    """
    Error response schema
    """

    success: bool = False
    error: str