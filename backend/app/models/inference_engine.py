# app/models/inference_engine.py

# pyright: reportAttributeAccessIssue=false

import torch

from app.models.llm_loader import (
    model,
    tokenizer
)

print("🚀 Initializing inference engine...")
print("✅ Inference engine ready")


def generate_response(
    prompt: str,
    language: str = "en"
) -> str:

    # =========================
    # Optimized Prompt
    # =========================
    system_prompt = f"""
You are Vision-Link AI,
a multilingual healthcare assistant.

Respond in {language}.

User: {prompt}

Answer:
"""

    # =========================
    # Tokenize
    # =========================
    inputs = tokenizer(
        system_prompt,
        return_tensors="pt"
    )

    # Move tensors to model device
    inputs = {
        key: value.to(model.device)
        for key, value in inputs.items()
    }

    # =========================
    # Generate Response
    # =========================
    with torch.no_grad():

        outputs = model.generate(
            **inputs,

            # FAST CPU SETTINGS
            max_new_tokens=20,

            do_sample=False,

            # Greedy decoding
            num_beams=1,

            # Faster inference
            use_cache=True,

            # Prevent warnings
            pad_token_id=tokenizer.eos_token_id,
            eos_token_id=tokenizer.eos_token_id
        )

    # =========================
    # Decode
    # =========================
    generated_text = tokenizer.decode(
        outputs[0],
        skip_special_tokens=True
    )

    # =========================
    # Clean Output
    # =========================
    cleaned_text = (
        generated_text
        .replace(system_prompt, "")
        .strip()
    )

    # =========================
    # Fallback
    # =========================
    if not cleaned_text:
        cleaned_text = "Hello! How can I help you?"

    return cleaned_text