# AttendPay Local APK Build - Quick Start Guide

## ✅ Current Setup Status

### Backend
- ✅ Django 4.2.30 installed
- ✅ Database migrations applied
- ✅ Server running on `0.0.0.0:8000`
- ✅ CORS enabled for local connections
- ✅ API endpoints available

### Frontend  
- ✅ Node.js dependencies installed
- ✅ `.env` configured for local backend: `http://10.0.2.2:8000/api`
- ✅ Expo Router configured
- ✅ React Native setup complete

---

## 🚀 Build APK for Local Testing

### Step 1: Verify Backend is Running

```bash
# Check backend health
curl http://localhost:8000/api/health/
```

Expected response:
```json
{"status":"ok","database":"connected","employees":X}
```

### Step 2: Configure Environment

#### For Android Emulator (Default)
Already configured in `.env`:
```
EXPO_PUBLIC_API_URL=http://10.0.2.2:8000/api
```

#### For Physical Device
Edit `.env` and replace with your machine IP:
```bash
# Find your IP address:
ipconfig  # Windows
# Look for "IPv4 Address" (e.g., 192.168.1.100)

# Update .env:
EXPO_PUBLIC_API_URL=http://192.168.1.100:8000/api
```

### Step 3: Install EAS CLI (One-Time)

```bash
npm install -g eas-cli
```

### Step 4: Build APK

#### Option A: Using Build Script
```bash
.\build-apk.bat
```

#### Option B: Manual Build
```bash
# Login to Expo
eas login

# Build for Android
eas build --platform android --local

# This will:
# 1. Bundle your React Native app
# 2. Compile to Android bytecode
# 3. Generate APK file
# 4. Output path will be shown at the end
```

### Step 5: Install on Device

#### Android Emulator
```bash
# List available emulators
adb devices

# Install APK
adb install "build/Attendpay-local-debug.apk"

# Or drag-drop APK into emulator
```

#### Physical Device (USB Connected)
```bash
# Make sure USB debugging is enabled
# Connect device via USB

adb install -r "build/Attendpay-local-debug.apk"

# Or use File Manager to tap the APK
```

---

## 🔧 Testing the Connection

### 1. Backend Health Check
```bash
curl http://localhost:8000/api/health/
```

### 2. Test Login API
```bash
curl -X POST http://localhost:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{"employee_id":"ADM001","password":"adm001"}'
```

Expected response:
```json
{
  "success": true,
  "data": {
    "token": "...",
    "employee_id": "ADM001",
    "name": "Admin User",
    "role": "admin",
    "organization_id": "..."
  }
}
```

### 3. Open App
- **Emulator**: `adb shell am start -n com.attendpay.app/.MainActivity`
- **Physical Device**: Tap app icon in launcher
- **Expo Go**: Run `expo start` and scan QR code

---

## 📱 App Credentials for Testing

| Field       | Value     |
|------------|-----------|
| Employee ID | ADM001    |
| Password   | adm001    |

---

## 🐛 Troubleshooting

### "Backend is not responding"
- **Check if server is running**: Open http://localhost:8000/api/health/
- **For emulator**: Use `10.0.2.2` (NOT `localhost`)
- **For physical device**: Use your machine's local IP from `ipconfig`

### "Cannot connect to 10.0.2.2"
- Android Emulator special IP: `10.0.2.2` = localhost on host
- Make sure backend is listening on `0.0.0.0:8000`
- Check firewall isn't blocking port 8000

### "CORS error in console"
- Django CORS already configured in settings.py
- No additional configuration needed

### "Port 8000 already in use"
```bash
# Use different port
python manage.py runserver 0.0.0.0:8001

# Update .env:
EXPO_PUBLIC_API_URL=http://10.0.2.2:8001/api
```

### "APK build fails"
1. Clear cache: `rm -rf node_modules/.cache`
2. Reinstall: `npm install`
3. Check Node version: `node --version` (should be 18+)

### "White screen after app launch"
- Check browser console (F12) for API errors
- Verify `.env` has correct API URL
- Check backend is running and responding

---

## 📂 File Structure

```
AttendPay-App/
├── Backend/                      # Django REST API
│   ├── Attendpay/               # Settings & WSGI
│   ├── core/                    # Models & Views
│   ├── manage.py                # Django CLI
│   ├── db.sqlite3               # Local database
│   ├── requirements-local.txt   # Local dependencies
│   └── venv/                    # Python virtual env
│
├── app/                          # Expo Router screens
├── services/                     # API client
├── components/                   # React components
├── context/                      # React Context (Auth)
├── .env                          # Configuration
├── package.json                  # Node dependencies
├── build-apk.bat                 # APK build script
└── start-backend.bat             # Backend start script
```

---

## 🔗 API Endpoints Reference

All endpoints require authentication (except health & login):

### Public
- `GET  /api/health/` - Health check

### Authentication
- `POST /api/auth/login/` - Login
- `POST /api/auth/register/` - Register
- `POST /api/auth/logout/` - Logout

### Employee
- `GET  /api/profile/` - Get profile
- `GET  /api/dashboard/` - Dashboard data
- `GET  /api/attendance/history/` - Attendance history
- `GET  /api/payroll/` - Payroll info

### Attendance
- `POST /api/attendance/clock-in/` - Clock in
- `POST /api/attendance/clock-out/` - Clock out

### QR Codes
- `GET  /api/qr/arrival/` - Arrival QR
- `GET  /api/qr/departure/` - Departure QR
- `GET  /api/qr/registration/` - Registration QR

### Admin Only
- `GET  /api/admin/dashboard/` - Admin dashboard
- `GET  /api/admin/employees/` - List employees
- `GET  /api/admin/attendance/` - Attendance records
- `GET  /api/admin/salaries/` - Salary management
- `GET  /api/admin/payroll/` - Payroll management

---

## 💡 Pro Tips

1. **Keep backend running in separate terminal**
   ```bash
   # Terminal 1: Backend
   cd Backend
   python manage.py runserver 0.0.0.0:8000
   ```

2. **Use Android Studio Emulator for better performance**
   - Allocated RAM: 4GB+
   - API Level: 31+ (Android 12+)

3. **Enable USB Debugging on Physical Device**
   - Settings → Developer Options → USB Debugging

4. **View logs in real-time**
   ```bash
   # Backend logs
   tail -f Backend/logs.txt
   
   # Frontend console
   npm start  # Press 'i' or 'a' for logs
   ```

5. **Speed up rebuilds**
   - Clear Gradle cache: `cd android && ./gradlew clean`
   - Incremental builds are faster than full rebuilds

---

## 📚 Additional Resources

- [Django Documentation](https://docs.djangoproject.com/)
- [Expo Documentation](https://docs.expo.dev/)
- [React Native Docs](https://reactnative.dev/)
- [Android Studio Setup](https://developer.android.com/studio)
- [Gradle Docs](https://gradle.org/guides/)

---

## ✨ Next Steps

1. ✅ Backend running locally ← You are here
2. Build APK using `eas build --platform android --local`
3. Install APK on Android device/emulator
4. Test login with ADM001 / adm001
5. Verify API connectivity
6. Run through app features

**Total setup time**: ~20-30 minutes (first time)
**Rebuild time**: ~5-10 minutes per APK

---

**Status**: Ready for APK build ✅
