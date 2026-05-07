# app/services/translation_service.py

SUPPORTED_LANGUAGES = {
    "sw": "Swahili",
    "ak": "Akan",
    "lg": "Luganda",
    "en": "English"
}


def detect_language(text: str):
    """
    Placeholder language detection
    """

    # TODO: Add real language detection later
    return "en"


def translate_to_english(text: str, source_lang: str):
    """
    Placeholder translation logic
    """

    # Future: MarianMT / NLLB
    return text


def translate_response(text: str, target_lang: str):
    """
    Translate response back to target language
    """

    return text