# app/config.py

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """
    Global application settings
    """

    # -------------------------
    # App Info
    # -------------------------
    APP_NAME: str = "Vision-Link AI"
    VERSION: str = "1.0.0"
    DEBUG: bool = True

    # -------------------------
    # API
    # -------------------------
    API_HOST: str = "0.0.0.0"
    API_PORT: int = 8000

    # -------------------------
    # Model Settings
    # -------------------------
    MODEL_NAME: str = "microsoft/Phi-3-mini-4k-instruct"

    MAX_NEW_TOKENS: int = 200
    TEMPERATURE: float = 0.7

    # -------------------------
    # Embeddings / RAG
    # -------------------------
    EMBEDDING_MODEL: str = "sentence-transformers/all-MiniLM-L6-v2"

    VECTOR_DB_PATH: str = "data/vector_store"

    # -------------------------
    # Languages
    # -------------------------
    DEFAULT_LANGUAGE: str = "en"

    SUPPORTED_LANGUAGES: list[str] = [
        "en",
        "sw",
        "ak",
        "lg"
    ]

    # -------------------------
    # Security
    # -------------------------
    SECRET_KEY: str = "vision-link-ai-secret"

    class Config:
        env_file = ".env"


# Global settings instance
settings = Settings()