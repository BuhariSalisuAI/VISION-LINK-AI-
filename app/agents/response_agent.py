# app/agents/response_agent.py

def format_response(answer: str, language: str, source: str):
    """
    Final formatting + future multilingual support
    """

    return {
        "response": answer.strip(),
        "language": language,
        "source": source
    }