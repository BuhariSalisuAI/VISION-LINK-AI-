# app/agents/medical_agent.py

from app.models.inference_engine import generate

def process_medical_query(query: str, context: str):
    """
    Combines context + user query for LLM
    """

    prompt = f"""
You are a medical assistant specialized in maternal health.

Context:
{context}

Question:
{query}

Give a clear, safe, and simple answer.
"""

    return generate(prompt)