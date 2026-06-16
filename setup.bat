@echo off
echo ========================================
echo AI Code Reviewer - Setup Script
echo ========================================
echo.

echo [1/4] Setting up Backend...
cd backend

echo Checking Python installation...
python --version
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Python is not installed or not in PATH
    pause
    exit /b 1
)

echo Installing Python dependencies...
pip install -r requirements.txt
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Failed to install Python dependencies
    pause
    exit /b 1
)

cd ..

echo.
echo [2/4] Setting up Frontend...
cd frontend

echo Checking Node.js installation...
node --version
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Node.js is not installed or not in PATH
    pause
    exit /b 1
)

echo Installing Node dependencies...
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Failed to install Node dependencies
    pause
    exit /b 1
)

cd ..

echo.
echo [3/4] Configuration Check...
if not exist "backend\.env" (
    echo WARNING: backend\.env file not found!
    echo Please configure backend\.env with your credentials before running the app.
    echo See README.md for details.
)

echo.
echo [4/4] Setup Complete!
echo.
echo ========================================
echo Next Steps:
echo ========================================
echo 1. Configure backend\.env with your credentials:
echo    - MongoDB username and password
echo    - JWT secret key
echo    - Google Gemini API key
echo.
echo 2. Start the backend:
echo    cd backend
echo    uvicorn main:app --reload --port 8000
echo.
echo 3. Start the frontend (in a new terminal):
echo    cd frontend
echo    npm run dev
echo.
echo 4. Open http://localhost:5173 in your browser
echo ========================================
echo.
pause
