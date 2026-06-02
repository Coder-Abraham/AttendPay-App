@echo off
REM ============================================================================
REM AttendPay Local APK Build Script
REM ============================================================================
REM This script builds an APK connected to the local backend running on port 8000
REM For Android Emulator: Uses 10.0.2.2 to reach localhost
REM For Physical Device: Replace 10.0.2.2 with your machine's IP (e.g., 192.168.x.x)
REM ============================================================================

echo.
echo ============================================================================
echo AttendPay Local APK Build
echo ============================================================================
echo.
echo Prerequisites:
echo   1. Django backend running on: http://0.0.0.0:8000
echo   2. .env configured with: EXPO_PUBLIC_API_URL=http://10.0.2.2:8000/api
echo   3. Android Studio/Emulator installed
echo   4. Node.js dependencies installed: npm install
echo.

REM Check if .env is properly configured
echo Checking .env configuration...
findstr "EXPO_PUBLIC_API_URL" .env
echo ✓ .env configuration found.

REM Install dependencies if needed
if not exist node_modules (
    echo.
    echo Installing npm dependencies...
    call npm install
    if %errorlevel% neq 0 (
        echo ERROR: Failed to install dependencies
        exit /b 1
    )
)
echo ✓ Dependencies installed

REM Ensure local.properties exists for SDK path
if not exist android\local.properties (
    echo Warning: android\local.properties missing. Creating default...
    echo sdk.dir=C:/Users/%USERNAME%/AppData/Local/Android/Sdk > android\local.properties
)

echo.
echo Clearing Metro and Gradle caches...
call npx expo start --clear --no-dev
echo.

echo.
echo Building APK using Gradle...
echo.

REM Navigate to android directory and build
cd android
echo Cleaning Android build folders...
call .\gradlew clean

echo Compiling Release APK...
call .\gradlew assembleRelease

if %errorlevel% neq 0 (
    echo.
    echo ERROR: Gradle build failed.
    echo Ensure you have the Android SDK installed and ANDROID_HOME environment variable set.
    cd ..
    exit /b 1
)
cd ..

if %errorlevel% neq 0 (
    echo ERROR: APK build failed
    exit /b 1
)

echo.
echo ============================================================================
echo ✓ APK build completed successfully!
echo Location: android\app\build\outputs\apk\release\app-release.apk
echo ============================================================================
echo.
echo Next steps:
echo   1. Install APK on device: adb install android\app\build\outputs\apk\release\app-release.apk
echo   2. Or scan QR code in Expo Go app
echo.
