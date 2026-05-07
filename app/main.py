from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# API routes
from app.api.chat import router as chat_router
from app.api.rag import router as rag_router
from app.api.vision import router as vision_router
from app.api.speech import router as speech_router


# ---------------------------------------------------
# Lifespan Events (Modern FastAPI)
# ---------------------------------------------------
@asynccontextmanager
async def lifespan(app: FastAPI):

    # 🚀 Startup
    print("🚀 Starting Vision-Link AI backend...")

    # Example model preload
    # from app.models.llm_loader import load_model
    # load_model()

    yield

    # 🛑 Shutdown
    print("🛑 Shutting down Vision-Link AI backend...")


# ---------------------------------------------------
# FastAPI App
# ---------------------------------------------------
app = FastAPI(
    title="Vision-Link AI",
    description="Multilingual AI Assistant for Healthcare (RAG + Agents + AMD)",
    version="1.0.0",
    lifespan=lifespan
)

# ---------------------------------------------------
# CORS Middleware
# ---------------------------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Restrict in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------------------------------
# Register API Routes
# ---------------------------------------------------
app.include_router(
    chat_router,
    prefix="/api/chat",
    tags=["Chat"]
)

app.include_router(
    rag_router,
    prefix="/api/rag",
    tags=["RAG"]
)

app.include_router(
    vision_router,
    prefix="/api/vision",
    tags=["Vision"]
)

app.include_router(
    speech_router,
    prefix="/api/speech",
    tags=["Speech"]
)

# ---------------------------------------------------
# Health Check Endpoint
# ---------------------------------------------------
@app.get("/")
def root():
    return {
        "status": "Vision-Link AI Backend Running",
        "version": "1.0.0"
    }