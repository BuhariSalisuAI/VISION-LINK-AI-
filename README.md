<div align="center">

# VISION-LINK AI
**Multilingual Health QA Assistant for Low-Resource Languages**

[![Status: Active Development](https://img.shields.io/badge/Status-Active_Development-black?style=for-the-badge)](#)
[![Hardware: AMD MI300X](https://img.shields.io/badge/Hardware-AMD_MI300X-blue?style=for-the-badge&logo=amd)](#)
[![Framework: PyTorch](https://img.shields.io/badge/Framework-PyTorch-red?style=for-the-badge&logo=pytorch)](#)
[![Hugging Face](https://img.shields.io/badge/Hugging%20Face-FFD21E?style=for-the-badge&logo=huggingface&logoColor=000)](#)
[![Frontend: React](https://img.shields.io/badge/Frontend-React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](#)
[![Desktop UI: Qt](https://img.shields.io/badge/Desktop_UI-Qt-41CD52?style=for-the-badge&logo=qt&logoColor=white)](#)

> *Bridging the healthcare information gap using State-of-the-Art NLP on AMD Infrastructure.*

</div>

---

## Project Overview
**VISION-LINK AI** is an optimized Large Language Model (LLM) assistant specifically fine-tuned to process and answer maternal and reproductive health inquiries in low-resource African languages (including Swahili, Akan, and Luganda). 

Developed for the **Zindi Multilingual Health QA Challenge**, this architecture leverages **AMD Developer Cloud** hardware acceleration to deliver rapid, accurate, and culturally contextual healthcare information retrieval via a dedicated medical web dashboard.

---

## Core Architecture & Features
* **Multilingual Inference Pipeline:** Optimized for processing and generating accurate semantic responses in Swahili, Akan, and Luganda.
* **Hardware Acceleration:** High-speed training and inference pipelines utilizing AMD MI300X accelerators.
* **Domain-Specific Tuning:** Fine-tuned on a verified dataset of approximately 30,000 Zindi medical records.
* **RAG Implementation:** Utilizes Retrieval-Augmented Generation to ensure all model outputs are grounded in factual, medical-grade datasets.
* **Clinical Web Dashboard:** Dedicated frontend interface featuring specialized routing for Maternity, General Medicine, and Vital Signs tracking.

---

## Hugging Face Integration
Our model ecosystem is integrated with Hugging Face for seamless accessibility and deployment.
* **Model Weights & Repository:** `[ Link pending backend synchronization ]`
* **Interactive Demo (Space):** `[ Link pending deployment ]`

---

## 🌍 Offline Mode / Local Installation
**VISION-LINK AI** is designed to function in low-resource environments without internet connectivity.

To run this locally on your AMD-powered device:

### 1. Clone the Repository
```bash
git clone https://github.com/BuhariSalisuAI/VISION-LINK-AI
cd VISION-LINK-AI
```

### 2. Install AMD ROCm Drivers
Ensure your system has the latest ROCm drivers for GPU acceleration:
- [AMD ROCm Installation Guide](https://rocmdocs.amd.com/en/latest/deploy/linux/index.html)

### 3. Load the Model
The app uses the **Qwen2.5-0.5B** model, which is small enough (under 1GB) to be stored locally on your hard drive. The model will be automatically downloaded and cached on first run.

### 4. Run the Backend
Launch the FastAPI server locally:
```bash
cd backend
python -m pip install -r requirements.txt
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000
```

The inference will happen entirely on your AMD GPU/CPU without calling any external APIs.

### 5. Run the Frontend
In a separate terminal:
```bash
cd frontend
npm install
npm run dev
```

### 6. Analyze Anywhere
Once installed, you can perform DNA/RNA/Protein sequence analysis and health QA diagnostics deep in rural areas with **Zero Internet Access**. The entire pipeline runs locally on your device.

---

## Repository Structure (WIP)
The codebase is currently being structured for the final submission.
```text
VISION-LINK-AI/
|── documentation/           # Documentation  
├── backend/                 # AI/RAG Pipeline & PyTorch Models
|     ├── app/           
│       ├── .env      
│       └── pyrightconfig.json      
│       └── requirements.txt      
│       └── start_backend.bat 
├── frontend/                # React Web Application
│   └── src/
│       ├── pages/           # Dashboard, MaternityWing, VitalSigns, etc.
│       ├── components/      # UI Components
│       └── App.tsx          # Core Routing Framework
├── .gitignore
└── README.md
