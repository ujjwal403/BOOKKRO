# 🎟️ BOOKKRO - College Events & Pass Booking Portal
### Featured Event: 🪔 KGI Garba Night 2026 (16 October 2026 • Open Air Theatre)

**BOOKKRO** is a modern, mobile-first college events exploration and ticketing web application. Built for campus fests, hackathons, and cultural gatherings, it supports BookMyShow-style booking, instant QR code generation, real email delivery, physical college ID verification, and a secure organizer Admin Portal backed by **Google Sheets**.

---

## 🎯 Featured Event Details
* **Event Name:** KGI Garba Night 2026
* **Date:** 16 October 2026 (6:00 PM – 11:30 PM)
* **Venue:** Open Air Theatre
* **Eligible Attendees:** Enrolled college students and registered college faculty/staff.
* **Email Requirement:** College email is **not** compulsory. Any personal Gmail or custom email address is accepted.
* **Mandatory Entry Rule:** All attendees must carry their **original college student ID card / staff ID card** along with their digital ticket pass for physical verification at the gate.

---

## 📂 Project Architecture

```
/Users/ujjwaltiwari/Desktop/ project/collage evetn/
├── index.html                   # BOOKKRO unified single page application
├── css/
│   └── style.css                # BOOKKRO festive gold/indigo theme, glassmorphic UI, scanner overlay, print styles
├── js/
│   ├── app.js                   # Application state manager, FormSubmit email bridge, dual local/GAS backend
│   ├── qr-code.js               # Zero-dependency, standalone QR Code generation engine
│   └── scanner.js               # Camera stream, torch, flip, barcode detector, audio chimes & haptics
├── google-apps-script/
│   ├── Code.gs                  # Full production Google Apps Script backend for Google Sheets & Gmail
│   ├── SetupSheet.gs            # 1-click automatic Google Sheet setup and live formulas generator
│   └── README.md                # Step-by-step Apps Script deployment & configuration guide
└── README.md                    # Project documentation & verification test matrix
```

---

## 🚀 Key Features

### 1. BOOKKRO Multi-Event Hub & BookMyShow Flow
* **Events Hub (`#home`):** Browse all campus events (Cultural Garba Night, TechFusion Hackathon, Sports Carnival).
* **Cinematic Garba Booking (`#event`):** Poster artwork, rating badge (⭐ 4.9/5 • 2,850+ College Attendees), event tags, schedule grid, and one-click booking buttons for Students & Teachers.
* **Students (`#student`):** Full Name, Roll Number, Department, Year, Section, Email Address (Gmail accepted). Generates Ticket ID format: `STU-GRB-XXXXXX`.
* **Teachers / Staff (`#teacher`):** Full Name, Employee / Staff ID, Department, Designation, Email Address, Mobile Number. Generates Ticket ID format: `TCH-GRB-XXXXXX`.

### 2. Dedicated & Secure Admin Portal
* **Multiple Access Points:**
  - Top Navigation Header: **`🔒 Admin Portal`** button
  - Bottom Navigation Bar: **`🔒 Admin`** tab
  - Direct URL: **`http://localhost:3000/#admin-login`**
* **Admin Credentials:**
  - **Admin ID:** `admin`
  - **Admin Password:** `garba2026@admin`
  - Includes a convenient **"⚡ Auto-fill Admin Credentials"** 1-click button.
* **Organizer Capabilities:** Live statistics dashboard, real-time checked-in metrics, student/teacher master tables, manual check-in, CSV export, and Google Sheets sync settings.

### 3. Anti-Proxy & Duplicate Protection
* **Strict Uniqueness:** Roll Numbers (for students) and Staff IDs (for faculty) must be unique.
* **Blocked Screen:** If someone attempts to register with an already-used Roll Number, the booking is instantly blocked with an anti-proxy warning.
* Includes a direct **"Retrieve My Existing Pass"** button so legitimate attendees can re-fetch their ticket without creating duplicates.

### 4. Direct Email Delivery System
* **FormSubmit API Integration:** Dispatches live email passes straight to attendees' inboxes.
* **EmailJS & Google Apps Script `MailApp`** ready for custom domain deployments.
* **One-Click Actions on Ticket Pass:**
  - `📧 Resend Email Pass`: Live dispatch to recipient's email.
  - `✉️ Open Email App`: Opens default mail app pre-filled with pass details.
  - `📥 Download (PNG)` & `🖨️ Print / PDF`.
* **Dispatched Email Outbox:** In-app outbox to inspect all delivered passes.

### 5. Mobile Gate Entry Scanner
* Designed for event volunteers on smartphones.
* Uses the device rear camera with live laser viewfinder, flashlight/torch toggle, and camera flip.
* **Audio Feedback:** Synthesized positive chime for success, buzzer for errors.
* **Instant Status Evaluation:**
  - ✅ **ENTRY ALLOWED (Green Screen):** Shows attendee details, prompts physical ID check, records check-in timestamp, and marks ticket as `USED`.
  - 🚫 **ENTRY DENIED - TICKET ALREADY USED (Red Screen):** Displays previous check-in timestamp and attendee name.
  - ❌ **ENTRY DENIED - INVALID TICKET (Red Screen):** Flags non-existent or forged tickets.

---

## ⚡ How to Run Locally

The server is currently running:
```bash
python3 -m http.server 3000
```

Open your browser to: **`http://localhost:3000`**

---

## 🧪 Comprehensive Verification & Test Guide

| # | Test Scenario | Procedure | Expected Result |
|---|---|---|---|
| 1 | **Student Registration** | Navigate to `Students`, enter John Doe, Roll No `24BT0999`, select B.Tech, 2nd Year, Section A, email `john@kgi.edu`. Click Register. | Validates all fields, generates `STU-GRB-XXXXXX`, saves to records, redirects to digital ticket pass with QR. |
| 2 | **Duplicate Student Registration** | Attempt to register again with same Roll No `24BT0999`. | Rejects registration, displays: *"Registration already exists for Roll Number 24BT0999. Each student can register only once."* |
| 3 | **Teacher Registration** | Navigate to `Teachers`, enter Dr. Anita Roy, Staff ID `EMP-5521`, Dept BCA, Designation Professor, email `anita@kgi.edu`. | Validates fields, does NOT ask for Year/Section/Roll No, generates `TCH-GRB-XXXXXX`, saves to records. |
| 4 | **Duplicate Teacher Registration** | Attempt to register again with Staff ID `EMP-5521`. | Rejects registration with duplicate notice. |
| 5 | **Digital Ticket QR Creation** | View digital ticket pass on screen. | Renders high-resolution QR code, event details, category badge, and warning instructions. |
| 6 | **Ticket Download (PNG)** | Click "Download Pass (PNG)" on the ticket view. | Downloads high-res `STU-GRB-XXXXXX-Pass.png` image with card layout and QR. |
| 7 | **Email Delivery Simulation** | Click the mailbox icon `📬` in top navigation bar or inspect in Admin. | Shows outgoing email entry pass with rendered HTML ticket and QR code. |
| 8 | **Gate Scanner Camera** | Open `Scanner` on a phone or webcam device. | Activates camera view, displays reticle with laser animation, torch and flip buttons work. |
| 9 | **Valid UNUSED Ticket Scan** | Enter `STU-GRB-000002` (Priya Patel, UNUSED) or scan its QR code. | Plays positive chime, shows **GREEN "ENTRY ALLOWED"**, attendee details, prompts physical ID check. |
| 10 | **Check-in Confirmation** | Click "Allow Entry & Mark USED" on valid scan. | Marks ticket as `USED`, records current check-in timestamp. |
| 11 | **Already Used Ticket Scan** | Enter/scan `STU-GRB-000001` (Rahul Sharma, already USED) or re-scan `STU-GRB-000002`. | Plays warning buzzer, shows **RED "ENTRY DENIED: TICKET ALREADY USED"** with previous check-in time. |
| 12 | **Invalid Ticket Scan** | Enter a random fake code like `STU-FAKE-999999`. | Plays warning buzzer, shows **RED "ENTRY DENIED: INVALID TICKET"**. |
| 13 | **Dashboard Real-Time Stats** | Open `Admin`. | Displays updated Total Registered, Total Checked In, Remaining, Department breakdown, Year breakdown, and Section breakdown. |
| 14 | **Export to CSV** | Click "Export Students CSV" and "Export Teachers CSV". | Downloads clean, comma-separated files of registered attendees. |
| 15 | **Registration Closed Toggle** | In `Admin` > `Settings`, turn off "Student Registration Open" and save. Navigate to `Students`. | Displays **"REGISTRATION CLOSED"** banner and prevents new submissions. |

---

## ☁️ Google Sheets & Apps Script Setup

To link your Google Sheet as the live central database:
1. Open [`google-apps-script/README.md`](file:///google-apps-script/README.md).
2. Follow the 6 simple steps to paste `Code.gs` and `SetupSheet.gs` into your Google Sheet's Apps Script editor.
3. Run `setupGarbaDatabase()` once to format all sheets and formulas.
4. Deploy as a Web App (access: "Anyone") and paste the Web App URL in the application settings.
