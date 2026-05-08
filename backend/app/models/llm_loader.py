# app/models/llm_loader.py

from typing import Any

import torch

from transformers import (
    AutoTokenizer,
    AutoModelForCausalLM
)

from app.config import settings

print("🚀 Loading LLM...")

# =========================
# Model Name
# =========================
MODEL_NAME: str = settings.MODEL_NAME

# =========================
# Device
# =========================
DEVICE: str = settings.DEVICE

# =========================
# Tokenizer
# =========================
tokenizer = AutoTokenizer.from_pretrained(
    MODEL_NAME,
    trust_remote_code=True
)

# Fix missing pad token
if tokenizer.pad_token is None:
    tokenizer.pad_token = tokenizer.eos_token

# =========================
# Load Model
# =========================
model: Any = AutoModelForCausalLM.from_pretrained(
    MODEL_NAME,

    # Faster CPU inference
    # torch_dtype=torch.float32,
      dtype=torch.float32,

    # Reduce RAM usage
    low_cpu_mem_usage=True,

    trust_remote_code=True
)

# =========================
# Move model to device
# =========================
model.to(DEVICE)

# Evaluation mode
model.eval()

print("✅ Model loaded successfully")