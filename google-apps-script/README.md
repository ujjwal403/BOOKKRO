# Google Sheets & Google Apps Script Setup Guide
## BOOKKRO College Events - Central Database Configuration

This document explains how to set up your Google Sheet as the live, real-time central database for BOOKKRO College Events.

---

### Step 1: Create a New Google Sheet
1. Open [Google Sheets](https://sheets.new) in your web browser.
2. Name your spreadsheet: **BOOKKRO College Events Database**.

---

### Step 2: Open Google Apps Script
1. In the Google Sheet menu bar, click on **Extensions** > **Apps Script**.
2. A new tab will open with the Apps Script editor.
3. Rename the project from "Untitled project" to **BOOKKRO Events API**.

---

### Step 3: Add the Scripts
1. In the left files list, open `Code.gs`.
2. Delete any boilerplate code and paste the complete content of [`google-apps-script/Code.gs`](file:///google-apps-script/Code.gs).
3. Click the **+** (Add a file) icon next to Files, select **Script**, and name it `SetupSheet`.
4. Paste the complete content of [`google-apps-script/SetupSheet.gs`](file:///google-apps-script/SetupSheet.gs).
5. Click the **Save** icon (disk icon) or press `Ctrl + S` / `Cmd + S`.

---

### Step 4: Run Initial Sheet Setup (1-Click Auto Setup)
1. In the Apps Script toolbar, locate the function dropdown (it currently says `doGet` or `myFunction`).
2. Select **`setupDatabase`**.
3. Click the **Run** button.
4. Google will ask for Authorization:
   - Click **Review permissions**.
   - Choose your Google account.
   - Click **Advanced** > **Go to BOOKKRO Events API (unsafe)**.
   - Click **Allow**.
5. Return to your Google Sheet! You will see 4 beautifully formatted sheets:
   - **Student Registrations** (Headers: Reg Time, Event, College, Name, Roll No, Dept, Year, Section, Email, Ticket ID, Status, Created, Check-in Time)
   - **Teacher Registrations** (Headers: Reg Time, Event, College, Name, Staff ID, Dept, Designation, Email, Mobile, Ticket ID, Status, Created, Check-in Time)
   - **Dashboard** (Auto-calculating statistics, department breakdown, year breakdown, section breakdown)
   - **Settings** (Configurable event details, registration toggles, and department lists)

---

### Step 5: Deploy as Web App
1. In the Apps Script editor, click the blue **Deploy** button at top-right > **New deployment**.
2. Click the gear icon next to "Select type" and select **Web app**.
3. Fill in the deployment details:
   - **Description**: `Production Events Web API v1`
   - **Execute as**: **Me** (your email address)
   - **Who has access**: **Anyone** (This allows mobile gate scanners and student registration forms to send requests securely without exposing your Google account).
4. Click **Deploy**.
5. Copy the generated **Web App URL** (it looks like `https://script.google.com/macros/s/AKfycb.../exec`).

---

### Step 6: Connect to the Web Application
1. Open the BOOKKRO web application.
2. Click on **Admin** > **Settings**.
3. Under **Google Apps Script Web App URL**, paste your URL and click **Connect & Test**.
4. The system is now 100% connected live to your Google Sheet!

---

### Security Notes
- The Google Sheet remains private in your Google Drive.
- Neither students nor gate volunteers need direct access to your Google Drive or Sheet.
- All registrations, duplicates, and check-in verifications pass securely through the Apps Script API layer.
