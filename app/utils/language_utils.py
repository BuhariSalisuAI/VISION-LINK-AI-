# app/utils/language_utils.py

SUPPORTED_LANGUAGES = {
    "en": "English",
    "sw": "Swahili",
    "ak": "Akan",
    "lg": "Luganda"
}


def normalize_language(lang: str) -> str:
    """
    Normalize language codes
    """

    lang = lang.lower().strip()

    if lang in SUPPORTED_LANGUAGES:
        return lang

    return "en"


def is_supported_language(lang: str) -> bool:
    """
    Check if language is supported
    """

    return lang in SUPPORTED_LANGUAGES


def get_language_name(lang: str) -> str:
    """
    Convert language code to readable name
    """

    return SUPPORTED_LANGUAGES.get(lang, "Unknown")