
                             ICT-GROUP 49
Project Title:
A MOBILE-BASED ATTENDANCE WITH AN INTEGRATED PAYROLL SYSTEM

Overview:
AttendPay is a mobile-based attendance management system designed to improve attendance tracking for UICT full-time staff. The system promotes accountability, supports accurate salary computation, and enhances the timely delivery of services within the institution.

Problem Statement:
Poor attendance has led to unfair salary calculations and delays in service delivery. These issues have negatively affected staff accountability and overall operational efficiency.

Solution:
AttendPay provides a simple and efficient mobile platform for recording attendance, improving reliability, and ensuring fair and accurate salary processing.

HOW TO DOWNLOAD AND INSTALL THE APP ON YOUR ANDROID PHONE

Prerequisites:
- An Android device (Android 8.0 or higher recommended)
- Internet connection
- At least 200MB of free storage space

OPTION A: Download Directly on Your Phone (Easiest)

Step 1 - Open the GitHub repository on your phone's browser:
          https://github.com/Coder-Abraham/AttendPay-App

Step 2 - Tap the "Attend Pay APK" folder in the file list.

Step 3 - Tap "app-release.apk" to open the file page.

Step 4 - Tap the download icon (or "Download raw file") to save the APK
          to your phone.

Step 5 - Allow installation from unknown sources:
          - Go to Settings > Security (or Privacy)
          - Enable "Install unknown apps" for your browser
            (e.g. Chrome or Firefox)
          - On some phones this prompt appears automatically when you
            try to install — just tap "Settings" then toggle it on.

Step 6 - Open your Files or Downloads app, locate "app-release.apk"
          and tap it.

Step 7 - Tap "Install" when prompted. The app will install in seconds.

Step 8 - Tap "Open" to launch AttendPay.


OPTION B: Download on PC then Transfer to Phone


Step 1 - Visit the repository on your PC:
          https://github.com/Coder-Abraham/AttendPay-App

Step 2 - Click the "Attend Pay APK" folder, then click "app-release.apk".

Step 3 - Click "Download raw file" to save the APK to your PC.

Step 4 - Transfer the APK to your phone using any of these methods:
          - USB cable: copy the file to your phone's Downloads folder
          - Google Drive: upload on PC, open Drive app on phone, download
          - WhatsApp / Telegram: send the file to yourself
          - Email: attach and send to yourself, open on phone

Step 5 - On your phone, open the Files or Downloads app, find the APK
          and tap it.

Step 6 - Enable "Install unknown apps" if prompted (see Step 5 in
          Option A above).

Step 7 - Tap "Install" and then "Open" once done.


USING THE APP

First Launch:
- The app may take 15-30 seconds to connect on first launch because the
  backend server wakes up from sleep (it is hosted on a free tier).
- If you see a loading screen, just wait — it will connect automatically.


Login Instructions:

Administrator Account
  Employee ID : ADM001
  Password    : adm001

Employee Accounts
  Employee ID : EMP001 to EMP005
  Password    : emp001 to emp005
  (e.g. EMP002 logs in with password emp002)


Admin Features:

- View attendance dashboard and daily reports
- Manage employee records
- Generate QR codes for clock-in and clock-out
- Assign and view salary information
- Register new employees by generating a registration QR code


Employee Features:

- Register using your organisation's QR code (from Admin)
- Clock in by scanning the arrival QR code
- Clock out by scanning the departure QR code
- View your attendance history
- View your salary and payroll summary


Employee Registration (New User):

1. Ask your Administrator to generate a Registration QR code from the
   Admin dashboard.
2. Open the AttendPay app and tap "Create Account".
3. Point your camera at the QR code to scan it.
4. Fill in your details (name, email, phone, password) and submit.
5. Wait for Admin approval before your first login.


TROUBLESHOOTING

Login fails or times out:
  - Wait 15 seconds and try again. The backend may be waking up.
  - Check that your phone has an active internet connection.

"Install blocked" message:
  - Go to Settings > Apps > Special app access > Install unknown apps
  - Find your browser or file manager and enable it.

App crashes on open:
  - Uninstall and reinstall the APK.
  - Make sure you have Android 8.0 or higher.

QR code does not scan:
  - Ensure camera permission is granted (Settings > Apps > AttendPay
    > Permissions > Camera).
  - Hold the camera steady and ensure the QR code is well-lit.


TECHNICAL INFORMATION

- Frontend : React Native with Expo
- Backend  : Django REST Framework hosted on Render (free tier)
- Database : PostgreSQL
- Auth     : Token-based authentication

GROUP MEMBERS

1. KATANDI ABRAHAM BONNY  2024/DCS/DAY/0632
2. SSEBADDUKA JOSEPH      2024/DCS/DAY/1729G
3. OTAI JOSHUA            2024/DCS/DAY/0233
4. SSERABIDDE MERINA      2024/DCS/DAY/0299
5. USABYIMANA DANIEL      2024/DCS/DAY/1651
6. OWINY JONATHAN         2024/DCS/DAY/0921
