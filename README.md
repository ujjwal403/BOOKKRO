# 🎟️ BOOKKRO - Multi-College Event Hosting & Digital Pass Booking Portal

**BOOKKRO** is an open, multi-tenant college event hosting, discovery, and digital pass ticketing web application. Built for campus fests, hackathons, cultural nights, sports meets, and academic symposiums across colleges and universities, it supports BookMyShow-style multi-event exploration, universal event hosting by any institution, instant QR code generation, direct email pass delivery, physical college ID verification, and a secure organizer Admin Portal backed optionally by **Google Sheets**.

---

## 🏛️ Any College Can Host Events
Any university, college, student union, or department club can publish and manage events:
* **One-Click Event Creator:** Organizers can publish custom events with quick-fill presets for Hackathons, Cultural Fests, Music Nights, Sports Meets, and Academic Symposiums.
* **Intra-College & Inter-College Support:** Allow open registrations from any college or restrict to enrolled students.
* **Institution-Specific Pass IDs:** Automatic ticket prefixes mapped to the host institution acronym (e.g. `STU-IITD-XXXXXX`, `STU-BITS-XXXXXX`, `STU-NIT-XXXXXX`).
* **Free & Paid Event Ticketing:** Supports free immediate-entry passes and UPI UTR payment verification flows.

---

## 📂 Project Architecture

```
bookkro-college-events/
├── index.html                   # BOOKKRO unified single page application
├── css/
│   └── style.css                # Premium responsive UI, glassmorphic styles, scanner overlay, print styles
├── js/
│   ├── app.js                   # State manager, event hosting engine, catalog filters, dual local/GAS backend
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

### 1. Multi-College Event Catalog & Hosting Engine
* **Events Catalog (`#home`):** Browse events across different colleges and universities, with real-time college filter chips, search bar, and category filters.
* **Host an Event Modal:** Any college organizer can publish an event with title, banner/poster, college name & acronym, venue, date/time, and fee settings.
* **Dynamic Event Details (`#event`):** Displays hosting institution badge, event poster, schedule, eligibility tags, and direct registration CTAs.
* **Student Passes (`#student`):** Full Name, Enrolled College, Roll Number, Department, Year, Section, Email Address.
* **Faculty / Staff Passes (`#teacher`):** Full Name, Institution, Employee / Staff ID, Department, Designation, Email Address, Mobile Number.

### 2. Dedicated & Secure Admin Portal
* **Multiple Access Points:**
  - Top Navigation Header: **`🔒 Admin Portal`** button
  - Bottom Navigation Bar: **`🔒 Admin`** tab
  - Direct URL: **`#admin-login`**
* **Admin Capabilities:** Event filter bar, live statistics dashboard, real-time checked-in metrics, student/teacher master tables, manual check-in, CSV export, and Google Sheets sync settings.

### 3. Anti-Proxy & Duplicate Protection
* **Per-Event Uniqueness:** Roll numbers and Staff IDs are checked for uniqueness **per event**, allowing students to register for events across different institutions without false duplicate conflicts.
* **Pass Retrieval:** Legitimate attendees can re-fetch their ticket without creating duplicates.

### 4. Direct Email Delivery System
* **FormSubmit API Integration:** Dispatches live email passes straight to attendees' inboxes.
* **EmailJS & Google Apps Script `MailApp`** ready for custom domain deployments.
* **One-Click Actions on Ticket Pass:** Resend email, open default mail app, download PNG, and print/PDF pass.

### 5. Mobile Gate Entry Scanner
* Designed for event volunteers on smartphones.
* Uses the device rear camera with live laser viewfinder, flashlight/torch toggle, and camera flip.
* **Audio Feedback:** Synthesized positive chime for success, buzzer for errors.
* **Instant Status Evaluation:**
  - ✅ **ENTRY ALLOWED (Green Screen):** Shows attendee details, prompts physical ID check, records check-in timestamp, and marks ticket as `USED`.
  - ⚠️ **ENTRY DENIED - WRONG EVENT:** Flags if ticket belongs to a different event.
  - 🚫 **ENTRY DENIED - TICKET ALREADY USED:** Displays previous check-in timestamp and attendee name.
  - ❌ **ENTRY DENIED - INVALID TICKET:** Flags non-existent or forged tickets.

---

## ⚡ How to Run Locally

Start a local web server:
```bash
python3 -m http.server 3000
```

Open your browser to: **`http://localhost:3000`**

---

## ☁️ Google Sheets & Apps Script Setup

To link your Google Sheet as the live central database:
1. Open [`google-apps-script/README.md`](google-apps-script/README.md).
2. Follow the setup guide to paste `Code.gs` and `SetupSheet.gs` into your Google Sheet's Apps Script editor.
3. Run `setupDatabase()` once to format all sheets and formulas.
4. Deploy as a Web App (access: "Anyone") and paste the Web App URL in the application settings.
