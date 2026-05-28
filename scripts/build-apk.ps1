# Build AttendPay release APK (Windows)
# Usage:
#   .\scripts\build-apk.ps1
#   .\scripts\build-apk.ps1 -ApiUrl "http://192.168.1.10:8000/api"

param(
    [string]$ApiUrl = "https://attendpay-backend.onrender.com/api"
)

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
Set-Location $root

Write-Host "AttendPay APK build" -ForegroundColor Cyan
Write-Host "API URL: $ApiUrl"

$env:EXPO_PUBLIC_API_URL = $ApiUrl
$env:EXPO_OFFLINE = "1"
$env:EXPO_NO_DEPENDENCY_VALIDATION = "1"

if (-not (Test-Path "node_modules")) {
    Write-Host "Installing npm dependencies..." -ForegroundColor Yellow
    npm install --legacy-peer-deps
}

$sdkPath = "$env:LOCALAPPDATA\Android\Sdk"
if (-not (Test-Path $sdkPath)) {
    Write-Host "Android SDK not found. Install Android Studio and SDK, or set ANDROID_HOME." -ForegroundColor Red
    exit 1
}
$env:ANDROID_HOME = $sdkPath

$androidDir = Join-Path $root "android"
$localProps = Join-Path $androidDir "local.properties"
$sdkDirProp = ($sdkPath -replace '\\', '/')
@"
sdk.dir=$sdkDirProp
"@ | Set-Content -Path $localProps -Encoding ASCII

if (-not (Test-Path $androidDir)) {
    Write-Host "Generating android/ (expo prebuild)..." -ForegroundColor Yellow
    npx expo prebuild --platform android
}

Set-Location $androidDir
Write-Host "Running Gradle assembleRelease (this may take several minutes)..." -ForegroundColor Yellow

.\gradlew.bat assembleRelease

$apk = Join-Path $androidDir "app\build\outputs\apk\release\app-release.apk"
if (Test-Path $apk) {
    Write-Host ""
    Write-Host "SUCCESS – APK built at:" -ForegroundColor Green
    Write-Host $apk
    Write-Host ""
    Write-Host "Install on device: adb install -r `"$apk`""
} else {
    Write-Host "Build finished but APK not found at expected path." -ForegroundColor Red
    exit 1
}
