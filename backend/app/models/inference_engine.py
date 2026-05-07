# app/models/inference_engine.py

import torch
from app.models.llm_loader import load_model


def generate(prompt: str, max_new_tokens: int = 200):
    tokenizer, model = load_model()

    inputs = tokenizer(
        prompt,
        return_tensors="pt"
    ).to(model.device)

    with torch.no_grad():
        outputs = model.generate(
            **inputs,
            max_new_tokens=max_new_tokens,
            temperature=0.7,
            do_sample=True
        )

    response = tokenizer.decode(
        outputs[0],
        skip_special_tokens=True
    )

    return response