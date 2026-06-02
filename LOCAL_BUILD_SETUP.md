# AttendPay Local APK Build Setup Guide

## Overview

This guide will help you set up and build a local APK connected to your local backend server.

---

## Part 1: Backend Setup

### Step 1: Set Up Python Virtual Environment

```bash
cd Backend
python -m venv venv

# Activate the virtual environment
# On Windows:
venv\Scripts\activate.bat
# On macOS/Linux:
source venv/bin/activate
```

### Step 2: Install Dependencies

```bash
pip install -r requirements-local.txt
```

If you encounter issues with `psycopg2-binary`, it's already excluded in `requirements-local.txt` since we're using SQLite locally.

### Step 3: Run Database Migrations

```bash
python manage.py migrate --no-input
```

### Step 4: Seed Test Data (Optional)

```bash
python manage.py seed_data
```

**Default credentials for testing:**

- Username: `ADM001`
- Password: `adm001`

### Step 5: Start Django Server

```bash
python manage.py runserver 0.0.0.0:8000
```

The server will be available at:

- **Local machine**: `http://127.0.0.1:8000/api/`
- **Android Emulator**: `http://10.0.2.2:8000/api/`
- **Physical device**: `http://YOUR_MACHINE_IP:8000/api/`

---

## Part 2: Frontend Setup

### Step 1: Environment Configuration

The `.env` file is already configured for local development:

```
EXPO_PUBLIC_API_URL=http://10.0.2.2:8000/api
```

**For physical device testing**, update `.env` to use your machine's IP:

```
EXPO_PUBLIC_API_URL=http://192.168.x.x:8000/api
```

To find your machine IP:

- **Windows**: `ipconfig` → Look for IPv4 Address
- **macOS/Linux**: `ifconfig` → Look for inet address

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Run Linting (Optional)

```bash
npm run lint
```

---

## Part 3: Build Local APK

### Prerequisites

- ✅ Django backend running on `0.0.0.0:8000`
- ✅ `.env` configured with correct API URL
- ✅ Android SDK installed (via Android Studio)
- ✅ Node.js dependencies installed
- ✅ EAS CLI installed

### Install EAS CLI

```bash
npm install -g eas-cli
```

### Option A: Using the Build Script (Windows)

```bash
.\build-apk.bat
```

### Option B: Manual Build

```bash
# For Android Emulator
eas build --platform android --local

# For physical device (update .env with your IP first)
eas build --platform android --local
```

### Build Output

The APK will be generated at:

```
build/Attendpay-local-debug.apk
```

### Install on Device

**Android Emulator:**

```bash
adb install "build/Attendpay-local-debug.apk"
```

**Physical Device (USB Connected):**

```bash
adb install -r "build/Attendpay-local-debug.apk"
```

Or use Expo Go app:

```bash
expo start
# Scan QR code with Expo Go app
```

---

## Part 4: Testing the Connection

### 1. Start Backend

```bash
cd Backend
python manage.py runserver 0.0.0.0:8000
```

### 2. Test Backend Health

Open in browser or use curl:

```bash
curl http://localhost:8000/api/health/
# Expected response: {"status":"ok","database":"connected","employees":...}
```

### 3. Test Login

```bash
curl -X POST http://localhost:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{"employee_id":"ADM001","password":"adm001"}'
```

### 4. Start App

```bash
npm start
# Or for Android specifically:
npm run android
```

### 5. Open App in Emulator/Device

- Scan QR code with Expo Go app, or
- Press 'a' in terminal to open in Android Emulator

---

## Common Issues & Fixes

### Issue: "Backend is not responding"

**Solution**: Ensure Django server is running and check .env URL:

- Emulator: Should be `10.0.2.2` (NOT `localhost`)
- Physical device: Should be your machine's local IP

### Issue: "CORS error"

**Solution**: Django CORS settings are already configured in `settings.py`:

```python
CORS_ALLOW_ALL_ORIGINS = True
CORS_ALLOW_CREDENTIALS = True
```

### Issue: "Port 8000 already in use"

**Solution**: Use a different port:

```bash
python manage.py runserver 0.0.0.0:8001
```

Then update `.env` accordingly.

### Issue: Django migrations not applied

**Solution**: Check if migrations ran:

```bash
python manage.py showmigrations
python manage.py migrate --no-input
```

### Issue: Virtual environment not activating

**Solution**: Ensure you're in the Backend directory:

```bash
cd Backend
venv\Scripts\activate.bat
```

---

## Quick Start Summary

```bash
# Terminal 1: Backend
cd Backend
venv\Scripts\activate.bat
python manage.py runserver 0.0.0.0:8000

# Terminal 2: Frontend
npm start
# Scan QR code with Expo Go app OR
npm run android
```

---

## Project Structure

```
AttendPay-App/
├── Backend/                 # Django REST API
│   ├── Attendpay/          # Django project settings
│   ├── core/               # Main app with models & views
│   ├── manage.py           # Django CLI
│   └── requirements-local.txt
├── app/                    # Expo Router navigation
├── services/               # API client & services
├── components/             # Reusable React components
├── context/                # React Context (Auth)
├── .env                    # Configuration (API URL)
└── package.json
```

---

## API Endpoints Reference

- **Health**: `GET /api/health/`
- **Login**: `POST /api/auth/login/`
- **Register**: `POST /api/auth/register/`
- **Logout**: `POST /api/auth/logout/`
- **Profile**: `GET /api/profile/`
- **Dashboard**: `GET /api/dashboard/`
- **Clock In**: `POST /api/attendance/clock-in/`
- **Clock Out**: `POST /api/attendance/clock-out/`
- **QR Codes**: `GET /api/qr/arrival/`, `/qr/departure/`, `/qr/registration/`

---

## Debugging

### View Django Logs

```bash
# Backend already outputs to console
python manage.py runserver 0.0.0.0:8000 --verbosity 2
```

### Check API Response

```bash
curl -v http://10.0.2.2:8000/api/health/
```

### React Native Debugging

```bash
npm start
# Press 'i' for iOS simulator or 'a' for Android emulator
# Use Expo DevTools when app opens
```

---

For more help, check:

- [Django Documentation](https://docs.djangoproject.com/)
- [Expo Documentation](https://docs.expo.dev/)
- [React Native Docs](https://reactnative.dev/)
