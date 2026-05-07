# pyright: reportCallIssue=false
# pyright: reportUnknownMemberType=false
# pyright: reportMissingTypeStubs=false

from typing import cast

import faiss
import numpy as np

from numpy.typing import NDArray


# ---------------------------------------------------
# Config
# ---------------------------------------------------
EMBEDDING_DIM = 384

# ---------------------------------------------------
# FAISS Index
# ---------------------------------------------------
index = cast(
    faiss.IndexFlatL2,
    faiss.IndexFlatL2(EMBEDDING_DIM)
)

# ---------------------------------------------------
# Documents
# ---------------------------------------------------
documents: list[str] = []


# ---------------------------------------------------
# Add Document
# ---------------------------------------------------
def add_document(
    text: str,
    embedding: NDArray[np.float32]
) -> None:

    vector: NDArray[np.float32] = np.array(
        [embedding],
        dtype=np.float32
    )

    # FAISS add()
    index.add(vector)

    documents.append(text)


# ---------------------------------------------------
# Search
# ---------------------------------------------------
def search(
    query_embedding: NDArray[np.float32],
    top_k: int = 3
) -> list[str]:

    vector: NDArray[np.float32] = np.array(
        [query_embedding],
        dtype=np.float32
    )

    # FAISS search()
    distances, indices = index.search(vector, top_k)

    results: list[str] = []

    for idx in indices[0]:

        idx_int = int(idx)

        if idx_int < len(documents):
            results.append(documents[idx_int])

    return results