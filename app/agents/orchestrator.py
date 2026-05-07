# app/agents/orchestrator.py

from app.agents.retrieval_agent import retrieve_context
from app.agents.medical_agent import process_medical_query
from app.agents.response_agent import format_response

def run_pipeline(query: str, language: str = "auto"):
    try:
        # 1️⃣ Detect / normalize language (basic for now)
        detected_lang = "en" if language == "auto" else language

        # 2️⃣ Retrieve knowledge (RAG)
        context, source = retrieve_context(query)

        # 3️⃣ Domain reasoning (medical)
        raw_answer = process_medical_query(query, context)

        # 4️⃣ Final formatting
        final_output = format_response(
            raw_answer,
            language=detected_lang,
            source=source
        )

        return final_output

    except Exception as e:
        return {
            "response": f"Error: {str(e)}",
            "language": "unknown",
            "source": None
        }