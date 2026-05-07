# app/rag/embedder.py

from sentence_transformers import SentenceTransformer

import numpy as np

from numpy.typing import NDArray


MODEL_NAME = "sentence-transformers/all-MiniLM-L6-v2"

embedding_model = SentenceTransformer(MODEL_NAME)


def create_embedding(
    text: str
) -> NDArray[np.float32]:
    """
    Generate text embedding
    """

    embedding = embedding_model.encode(text)

    return np.array(embedding, dtype=np.float32)