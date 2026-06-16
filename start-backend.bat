@echo off
echo Starting AI Code Reviewer Backend...
cd backend
uvicorn main:app --reload --host 0.0.0.0 --port 8000
