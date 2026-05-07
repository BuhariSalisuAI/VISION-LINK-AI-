# app/rag/retriever.py

from app.rag.embedder import create_embedding
from app.rag.vector_store import search


def retrieve_context(query: str):
    """
    Retrieve relevant medical context
    """

    query_embedding = create_embedding(query)

    results = search(query_embedding)

    context = "\n".join(results)

    return context