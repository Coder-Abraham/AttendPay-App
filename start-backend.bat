@echo off
REM ============================================================================
REM AttendPay Django Backend Startup Script
REM ============================================================================

echo.
echo ============================================================================
echo AttendPay Django Backend Server
echo ============================================================================
echo.

cd Backend

REM Activate virtual environment
if not exist venv (
    echo ERROR: Virtual environment not found in Backend/
    echo Please run: python -m venv venv
    exit /b 1
)

call venv\Scripts\activate.bat

REM Check if dependencies are installed
python -c "import django" >nul 2>&1
if %errorlevel% neq 0 (
    echo Installing dependencies...
    pip install -r requirements-local.txt
    if %errorlevel% neq 0 (
        echo ERROR: Failed to install dependencies
        exit /b 1
    )
)

REM Run migrations
echo.
echo Running database migrations...
python manage.py migrate
if %errorlevel% neq 0 (
    echo ERROR: Migration failed
    exit /b 1
)

REM Create seed data if not exists
python manage.py seed_data 2>nul
if %errorlevel% neq 0 (
    echo Note: Seed data command not available or already seeded
)

REM Start development server
echo.
echo ============================================================================
echo ✓ Backend is starting...
echo ============================================================================
echo.
echo API will be available at:
echo   - Local Machine: http://127.0.0.1:8000/api/
echo   - Android Emulator: http://10.0.2.2:8000/api/
echo   - Physical Device: http://YOUR_MACHINE_IP:8000/api/
echo.
echo Press Ctrl+C to stop the server
echo.

python manage.py runserver 0.0.0.0:8000

pause
