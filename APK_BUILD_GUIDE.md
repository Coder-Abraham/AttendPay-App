# AttendPay APK Build Guide

## Project Status

✅ **All errors checked** - No TypeScript/linting errors found  
✅ **Dependencies installed** - All npm packages ready (using --legacy-peer-deps)  
✅ **Backend configured** - API endpoints ready at [services/api.ts](services/api.ts)

## Backend Configuration

The app is configured to connect to your Django backend:

**Production (Render):** `https://attendpay-backend.onrender.com/api` (set in `.env`)

**Local phone testing:** use your PC’s LAN IP, not `127.0.0.1`:
```powershell
# Example – replace with your machine's IPv4 from ipconfig
$env:EXPO_PUBLIC_API_URL = "http://192.168.1.50:8000/api"
.\scripts\build-apk.ps1 -ApiUrl $env:EXPO_PUBLIC_API_URL
```

Quick build (uses `.env` / Render URL by default):
```powershell
npm run build:apk
```

### API Endpoints Configured:
- Authentication: `/auth/login/`, `/auth/register/`, `/auth/logout/`
- Attendance: `/attendance/clock-in/`, `/attendance/clock-out/`, `/attendance/history/`
- QR Codes: `/qr/arrival/`, `/qr/departure/`, `/qr/registration/`
- Admin Dashboard: `/admin/dashboard/`, `/admin/employees/`, `/admin/attendance/`, `/admin/salaries/`

## Prerequisites

You need to have installed:
- Node.js v16+
- Java Development Kit (JDK 11+)
- Android SDK
- Gradle

## Building the APK

### Method 1: Using Expo CLI (Recommended for Development)

```bash
# Navigate to your project
cd c:\Users\Doxa\ Ent\Desktop\AttendPay-App

# Generate native Android files
npx expo prebuild --clean

# Build APK using Gradle
cd android
./gradlew assembleRelease

# APK will be located at:
# android/app/build/outputs/apk/release/app-release.apk
```

### Method 2: Using EAS CLI (Recommended for Production)

```bash
# Install EAS CLI globally
npm install -g eas-cli

# Login to Expo
eas login

# Configure EAS project
eas build:configure

# Build APK
eas build --platform android --type apk

# Your APK will be available for download from Expo dashboard
```

### Method 3: Direct Gradle Build (Advanced)

```bash
# Navigate to android directory
cd c:\Users\Doxa\ Ent\Desktop\AttendPay-App\android

# Build release APK
gradlew assembleRelease

# Build debug APK
gradlew assembleDebug
```

## App Configuration

The app is configured with:
- **Package Name:** `com.attendpay.app`
- **Min SDK:** 24 (Android 7.0)
- **Target SDK:** Latest
- **Permissions:** Camera, Location (Fine & Coarse)

### Adaptive Icon
- **Foreground:** `./assets/images/icon.png`
- **Background:** `#0060B8` (Blue)

## One-command build (Windows)

```powershell
cd "c:\Users\Doxa Ent\Desktop\AttendPay-App"
npm run build:apk
```

Output APK: `android\app\build\outputs\apk\release\app-release.apk`

The script sets `EXPO_PUBLIC_API_URL`, writes `android/local.properties` for your SDK, and runs Gradle.

### Cloud build (no local Android SDK)

```powershell
npm install -g eas-cli
eas login
eas build --platform android --profile preview
```

The API URL is set in `eas.json` for preview/production profiles.

---

## Required: Android NDK

The release build needs **NDK 27.1.12297006**. Install it once in Android Studio:

1. Open **Android Studio** → **Settings** → **Languages & Frameworks** → **Android SDK**
2. **SDK Tools** tab → check **NDK (Side by side)** → **Apply**

If a previous download failed, delete the broken folder first:

`%LOCALAPPDATA%\Android\Sdk\ndk\27.1.12297006`

Then install again from Android Studio (more reliable than Gradle auto-download on some networks).

---

## SSL / certificate errors (Gradle or EAS)

If you see `PKIX path building failed` or `unable to verify the first certificate`, your network may be intercepting HTTPS (corporate proxy, antivirus).

This project sets Gradle to use the Windows certificate store in `android/gradle.properties`. If downloads still fail:

- Try a mobile hotspot or home network
- Or install dependencies from **Android Studio** (SDK Manager) instead of Gradle

---

## Backend must respond before testing the APK

Production URL in `.env`:

`https://attendpay-backend.onrender.com/api`

Test login (PowerShell):

```powershell
Invoke-RestMethod -Uri "https://attendpay-backend.onrender.com/api/auth/login/" `
  -Method POST -ContentType "application/json" `
  -Body '{"employee_id":"ADM001","password":"adm001"}'
```

You should get a JSON object with a `token`. If you get **500**, fix the Render deployment (migrations, `DATABASE_URL`, logs on the Render dashboard) or build the APK against your **local** backend:

```powershell
# Start backend (in Backend folder, with venv + pip install -r requirements.txt)
python manage.py runserver 0.0.0.0:8000

# Build APK pointing at your PC's LAN IP (from ipconfig)
.\scripts\build-apk.ps1 -ApiUrl "http://192.168.x.x:8000/api"
```

---

## Debugging Build Issues

If you encounter any issues during the build:

1. **Clear cache:**
   ```bash
   npx expo prebuild --clean
   ```

2. **Check Java version:**
   ```bash
   java -version
   ```
   (Must be JDK 11+)

3. **Update Gradle:**
   ```bash
   cd android
   gradlew --version
   ```

4. **Clean Gradle build:**
   ```bash
   cd android
   gradlew clean
   ```

## Testing the APK

1. **Transfer to Android device:**
   ```bash
   adb install -r app-release.apk
   ```

2. **Or install via Android Studio:**
   - Open Android Studio
   - Go to Build > Analyze APK
   - Select your APK file
   - Click Install

## Connecting to Backend

Once APK is built and installed:

1. **Set backend URL** (if not using localhost):
   - Edit the `EXPO_PUBLIC_API_URL` environment variable before building
   - Or update [services/api.ts](services/api.ts)

2. **Ensure backend is running:**
   ```bash
   cd Backend
   python manage.py runserver 0.0.0.0:8000
   ```

3. **Test API connection:**
   - The app will attempt to connect on first launch
   - Check device logs for any connection errors

## File Structure

```
AttendPay-App/
├── services/              # Backend service layer
│   ├── api.ts            # API configuration & client
│   ├── authService.ts    # Authentication
│   ├── attendanceService.ts
│   ├── adminService.ts
│   └── employeeService.ts
├── android/              # Native Android files
│   ├── app/
│   │   └── src/main/
│   │       ├── AndroidManifest.xml
│   │       └── res/
│   └── build.gradle
├── app/                  # Expo Router pages
├── components/           # Reusable components
├── types/               # TypeScript types
└── package.json
```

## Troubleshooting

### Common Issues:

**Issue:** Gradle build fails
```bash
# Solution: Update Gradle
cd android
gradlew wrapper --gradle-version=8.0
```

**Issue:** React Native cache issues
```bash
# Solution: Clear Metro bundler cache
npx react-native start --reset-cache
```

**Issue:** Android SDK not found
```bash
# Solution: Set ANDROID_HOME environment variable
set ANDROID_HOME=C:\Users\<YourUsername>\AppData\Local\Android\Sdk
```

## Next Steps

1. Ensure your Django backend is running
2. Set the correct `EXPO_PUBLIC_API_URL` if using a remote backend
3. Run the build command for your chosen method
4. Test the app on a real Android device
5. Monitor logs for any runtime errors

## Support

For more information:
- Expo Documentation: https://docs.expo.dev/
- React Native: https://reactnative.dev/
- Android Developers: https://developer.android.com/

---

**Last Updated:** May 28, 2026  
**Project:** AttendPay v1.0.0
