# app/config.py

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """
    Global application settings
    """

    # =========================
    # App Info
    # =========================
    APP_NAME: str = "Vision-Link AI"
    VERSION: str = "1.0.0"
    DEBUG: bool = True

    # =========================
    # API
    # =========================
    API_HOST: str = "0.0.0.0"
    API_PORT: int = 8000

    # =========================
    # AI Model
    # =========================
    MODEL_NAME: str = "Qwen/Qwen2.5-0.5B-Instruct"

    DEVICE: str = "cpu"

    MAX_NEW_TOKENS: int = 64
    TEMPERATURE: float = 0.5

    # =========================
    # Hugging Face Cache
    # =========================
    HF_HOME: str = "D:/huggingface"
    TRANSFORMERS_CACHE: str = "D:/huggingface/transformers"
    HUGGINGFACE_HUB_CACHE: str = "D:/huggingface/hub"

    HF_HUB_DISABLE_SYMLINKS_WARNING: int = 1
    HF_HUB_DISABLE_TELEMETRY: int = 1

    # =========================
    # Embeddings / RAG
    # =========================
    EMBEDDING_MODEL: str = (
        "sentence-transformers/all-MiniLM-L6-v2"
    )

    VECTOR_DB_PATH: str = "data/vector_store"

    # =========================
    # Languages
    # =========================
    DEFAULT_LANGUAGE: str = "en"

    SUPPORTED_LANGUAGES: list[str] = [
        "en",
        "sw",
        "ak",
        "lg"
    ]

    # =========================
    # Security
    # =========================
    SECRET_KEY: str = "vision-link-ai-secret"
    HF_TOKEN: str = ""

    # =========================
    # Pydantic Settings
    # =========================
    model_config = SettingsConfigDict(
        env_file=".env",
        extra="ignore"
    )


# Global settings object
settings = Settings()

# Set HF_TOKEN environment variable for Hugging Face Hub
import os
os.environ['HF_TOKEN'] = settings.HF_TOKEN