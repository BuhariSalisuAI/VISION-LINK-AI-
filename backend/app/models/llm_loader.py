# app/models/llm_loader.py

from transformers import AutoTokenizer, AutoModelForCausalLM
import torch

MODEL_NAME = "microsoft/Phi-3-mini-4k-instruct"

tokenizer = None
model = None


def load_model():
    global tokenizer, model

    if model is None:
        print("🚀 Loading LLM...")

        tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)

        model = AutoModelForCausalLM.from_pretrained(
            MODEL_NAME,
            torch_dtype=torch.float16,
            device_map="auto"
        )

        print("✅ Model loaded")

    return tokenizer, model