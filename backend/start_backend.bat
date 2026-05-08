@echo off

echo ====================================
echo Starting VISION-LINK AI Backend...
echo ====================================

cd /d %~dp0

call venv\Scripts\activate

uvicorn app.main:app --reload

pause