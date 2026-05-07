# app/utils/logger.py

import logging
import os

# Create logs directory
os.makedirs("logs", exist_ok=True)

# Configure logger
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)s | %(message)s",
    handlers=[
        logging.FileHandler("logs/vision_link_ai.log"),
        logging.StreamHandler()
    ]
)

logger = logging.getLogger("VisionLinkAI")