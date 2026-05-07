# app/services/inference_service.py

from app.models.inference_engine import generate


def run_inference(prompt: str):
    """
    Wrapper around model inference
    """

    response = generate(prompt)

    return response