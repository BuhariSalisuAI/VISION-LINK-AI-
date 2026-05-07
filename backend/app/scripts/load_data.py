# scripts/load_data.py

from app.rag.embedder import create_embedding
from app.rag.vector_store import add_document

medical_docs = [
    "Pregnancy symptoms include nausea and fatigue.",
    "Maternal health requires regular checkups.",
    "High blood pressure during pregnancy can be dangerous."
]

for doc in medical_docs:
    embedding = create_embedding(doc)

    add_document(doc, embedding)

print("✅ Documents indexed")