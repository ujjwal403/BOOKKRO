/**
 * ==============================================================================
 * KGI GARBA NIGHT 2026 - PRODUCTION GOOGLE APPS SCRIPT BACKEND
 * ==============================================================================
 * This script serves as the secure backend API for KGI Garba Night 2026.
 * It interfaces directly with Google Sheets (Central Database) and Gmail (MailApp).
 *
 * Deployment Instructions:
 * 1. Open your Google Sheet.
 * 2. Click Extensions > Apps Script.
 * 3. Replace all code with this file and SetupSheet.gs.
 * 4. Run `setupGarbaDatabase()` from SetupSheet.gs once to initialize all sheets.
 * 5. Click Deploy > New Deployment.
 * 6. Select "Web app", set:
 *    - Execute as: "Me" (your Google account)
 *    - Who has access: "Anyone" (allows mobile scanners and students to connect)
 * 7. Copy the Web App URL and paste it in the web application's Admin Settings.
 * ==============================================================================
 */

var SHEET_STUDENTS = 'Student Registrations';
var SHEET_TEACHERS = 'Teacher Registrations';
var SHEET_DASHBOARD = 'Dashboard';
var SHEET_SETTINGS = 'Settings';

/**
 * Handle HTTP GET Requests
 */
function doGet(e) {
  return handleRequest(e);
}

/**
 * Handle HTTP POST Requests
 */
function doPost(e) {
  return handleRequest(e);
}

/**
 * Unified Request Handler with CORS headers
 */
function handleRequest(e) {
  var response = { success: false, message: 'Invalid request' };
  
  try {
    var params = {};
    if (e && e.parameter) {
      params = e.parameter;
    }
    
    // Parse POST JSON body if present
    if (e && e.postData && e.postData.contents) {
      try {
        var postJson = JSON.parse(e.postData.contents);
        for (var key in postJson) {
          params[key] = postJson[key];
        }
      } catch (jsonErr) {
        // If not JSON, postData.contents may be urlencoded
      }
    }

    var action = params.action || '';

    switch (action) {
      case 'ping':
        response = { success: true, message: 'KGI Garba Night API is live!', timestamp: new Date().toISOString() };
        break;

      case 'getSettings':
        response = { success: true, settings: getSettingsFromSheet() };
        break;

      case 'updateSettings':
        response = updateSettingsInSheet(params);
        break;

      case 'registerStudent':
        response = registerStudent(params);
        break;

      case 'registerTeacher':
        response = registerTeacher(params);
        break;

      case 'verifyTicket':
        response = verifyTicket(params.ticketId);
        break;

      case 'checkInTicket':
        response = checkInTicket(params.ticketId);
        break;

      case 'getDashboardStats':
        response = getDashboardStats();
        break;

      case 'searchAttendees':
        response = searchAttendees(params.query, params.category);
        break;

      case 'getAllData':
        response = getAllDataForAdmin();
        break;

      default:
        response = { success: false, message: 'Unknown action: ' + action };
        break;
    }

  } catch (error) {
    response = { success: false, message: error.toString() };
  }

  return ContentService.createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Read Settings from the Settings Sheet
 */
function getSettingsFromSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_SETTINGS);
  var settings = {
    eventName: 'KGI Garba Night 2026',
    eventDate: '16 October 2026',
    venue: 'Open Air Theatre',
    registrationOpen: true,
    studentRegistrationOpen: true,
    teacherRegistrationOpen: true,
    departments: ['B.Tech', 'MBA', 'B.Pharm', 'BCA', 'Nursing', 'MCA', 'Polytechnic'],
    years: ['1st Year', '2nd Year', '3rd Year', '4th Year'],
    sections: ['Section A', 'Section B', 'Section C', 'Section D']
  };

  if (!sheet) return settings;

  var data = sheet.getDataRange().getValues();
  for (var i = 1; i < data.length; i++) {
    var key = String(data[i][0]).trim();
    var val = data[i][1];
    if (!key) continue;

    if (key === 'Event Name') settings.eventName = String(val);
    else if (key === 'Event Date') settings.eventDate = String(val);
    else if (key === 'Venue') settings.venue = String(val);
    else if (key === 'Registration Open') settings.registrationOpen = (val === true || String(val).toUpperCase() === 'TRUE');
    else if (key === 'Student Registration Open') settings.studentRegistrationOpen = (val === true || String(val).toUpperCase() === 'TRUE');
    else if (key === 'Teacher Registration Open') settings.teacherRegistrationOpen = (val === true || String(val).toUpperCase() === 'TRUE');
    else if (key === 'Departments') settings.departments = String(val).split(',').map(function(s) { return s.trim(); }).filter(Boolean);
    else if (key === 'Years') settings.years = String(val).split(',').map(function(s) { return s.trim(); }).filter(Boolean);
    else if (key === 'Sections') settings.sections = String(val).split(',').map(function(s) { return s.trim(); }).filter(Boolean);
  }

  return settings;
}

/**
 * Update Settings in the Settings Sheet
 */
function updateSettingsInSheet(params) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_SETTINGS);
  if (!sheet) {
    return { success: false, message: 'Settings sheet not found' };
  }

  var data = sheet.getDataRange().getValues();
  for (var i = 1; i < data.length; i++) {
    var key = String(data[i][0]).trim();
    if (key === 'Event Name' && params.eventName !== undefined) sheet.getRange(i + 1, 2).setValue(params.eventName);
    if (key === 'Event Date' && params.eventDate !== undefined) sheet.getRange(i + 1, 2).setValue(params.eventDate);
    if (key === 'Venue' && params.venue !== undefined) sheet.getRange(i + 1, 2).setValue(params.venue);
    if (key === 'Registration Open' && params.registrationOpen !== undefined) sheet.getRange(i + 1, 2).setValue(params.registrationOpen);
    if (key === 'Student Registration Open' && params.studentRegistrationOpen !== undefined) sheet.getRange(i + 1, 2).setValue(params.studentRegistrationOpen);
    if (key === 'Teacher Registration Open' && params.teacherRegistrationOpen !== undefined) sheet.getRange(i + 1, 2).setValue(params.teacherRegistrationOpen);
    if (key === 'Departments' && params.departments !== undefined) sheet.getRange(i + 1, 2).setValue(Array.isArray(params.departments) ? params.departments.join(', ') : params.departments);
    if (key === 'Sections' && params.sections !== undefined) sheet.getRange(i + 1, 2).setValue(Array.isArray(params.sections) ? params.sections.join(', ') : params.sections);
  }

  return { success: true, message: 'Settings updated successfully', settings: getSettingsFromSheet() };
}

/**
 * Generate Collision-Proof Unique Ticket ID
 */
function generateUniqueTicketId(prefix, dataRows, colIndex) {
  var chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  var ticketId = '';
  var exists = true;
  var attempts = 0;
  while (exists && attempts < 200) {
    attempts++;
    var rand = '';
    for (var k = 0; k < 6; k++) {
      rand += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    ticketId = prefix + rand;
    exists = false;
    for (var j = 1; j < dataRows.length; j++) {
      if (String(dataRows[j][colIndex]).trim().toUpperCase() === ticketId) {
        exists = true;
        break;
      }
    }
  }
  return ticketId;
}

/**
 * Register Student
 * Checks duplicate Roll Number, assigns STU-GRB-XXXXXX, appends to sheet, sends email.
 */
function registerStudent(data) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(15000); // 15 second lock for concurrency safety
  } catch (e) {
    return { success: false, message: 'Server is busy processing registrations. Please try again.' };
  }

  try {
    var settings = getSettingsFromSheet();
    if (!settings.registrationOpen || !settings.studentRegistrationOpen) {
      return { success: false, message: 'REGISTRATION CLOSED: Student registration is currently closed.' };
    }

    // Validation
    var name = (data.name || '').trim();
    var rollNumber = (data.rollNumber || '').trim().toUpperCase();
    var department = (data.department || '').trim();
    var year = (data.year || '').trim();
    var section = (data.section || '').trim();
    var email = (data.email || '').trim().toLowerCase();

    if (!name || !rollNumber || !department || !year || !section || !email) {
      return { success: false, message: 'All fields are mandatory for Student Registration.' };
    }

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_STUDENTS);
    if (!sheet) {
      return { success: false, message: 'Student Registrations sheet does not exist.' };
    }

    // Check duplicate Roll Number (Column C = index 3)
    var studentData = sheet.getDataRange().getValues();
    for (var i = 1; i < studentData.length; i++) {
      var existingRoll = String(studentData[i][2]).trim().toUpperCase();
      if (existingRoll === rollNumber) {
        var existingTicket = studentData[i][7];
        return {
          success: false,
          isDuplicate: true,
          message: 'Registration already exists for Roll Number: ' + rollNumber + '. Ticket ID: ' + existingTicket,
          existingTicketId: existingTicket
        };
      }
    }

    // Generate unique collision-proof Ticket ID: STU-GRB-XXXXXX
    var ticketId = generateUniqueTicketId('STU-GRB-', studentData, 7);

    var now = new Date();
    var timeFormatted = Utilities.formatDate(now, Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm:ss');

    // Row layout:
    // A: Reg Time, B: Name, C: Roll No, D: Dept, E: Year, F: Section, G: Email, H: Ticket ID, I: Status, J: Created, K: Check-in
    var newRow = [
      timeFormatted,
      name,
      rollNumber,
      department,
      year,
      section,
      email,
      ticketId,
      'UNUSED',
      timeFormatted,
      ''
    ];

    sheet.appendRow(newRow);

    // Send Digital Ticket Pass Email
    var emailSent = false;
    try {
      sendStudentTicketEmail(email, name, rollNumber, department, year, section, ticketId, settings);
      emailSent = true;
    } catch (mailErr) {
      Logger.log('Mail send error: ' + mailErr.toString());
    }

    return {
      success: true,
      message: 'Student Registration Successful! Your pass has been issued.',
      ticket: {
        category: 'STUDENT',
        ticketId: ticketId,
        name: name,
        rollNumber: rollNumber,
        department: department,
        year: year,
        section: section,
        email: email,
        status: 'UNUSED',
        registrationTime: timeFormatted,
        emailSent: emailSent
      }
    };

  } finally {
    lock.releaseLock();
  }
}

/**
 * Register Teacher / Staff
 * Checks duplicate Employee / Staff ID, assigns TCH-GRB-XXXXXX, appends to sheet, sends email.
 */
function registerTeacher(data) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(15000);
  } catch (e) {
    return { success: false, message: 'Server is busy processing registrations. Please try again.' };
  }

  try {
    var settings = getSettingsFromSheet();
    if (!settings.registrationOpen || !settings.teacherRegistrationOpen) {
      return { success: false, message: 'REGISTRATION CLOSED: Teacher/Staff registration is currently closed.' };
    }

    // Validation
    var name = (data.name || '').trim();
    var staffId = (data.staffId || data.employeeId || '').trim().toUpperCase();
    var department = (data.department || '').trim();
    var designation = (data.designation || '').trim();
    var email = (data.email || '').trim().toLowerCase();
    var mobile = (data.mobile || data.phone || '').trim();

    if (!name || !staffId || !department || !designation || !email) {
      return { success: false, message: 'Name, Staff ID, Department, Designation, and Email are mandatory.' };
    }

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_TEACHERS);
    if (!sheet) {
      return { success: false, message: 'Teacher Registrations sheet does not exist.' };
    }

    // Check duplicate Staff ID (Column C = index 3)
    var teacherData = sheet.getDataRange().getValues();
    for (var i = 1; i < teacherData.length; i++) {
      var existingId = String(teacherData[i][2]).trim().toUpperCase();
      if (existingId === staffId) {
        var existingTicket = teacherData[i][7];
        return {
          success: false,
          isDuplicate: true,
          message: 'Registration already exists for Staff ID: ' + staffId + '. Ticket ID: ' + existingTicket,
          existingTicketId: existingTicket
        };
      }
    }

    // Generate unique collision-proof Ticket ID: TCH-GRB-XXXXXX
    var ticketId = generateUniqueTicketId('TCH-GRB-', teacherData, 7);

    var now = new Date();
    var timeFormatted = Utilities.formatDate(now, Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm:ss');

    // Row layout:
    // A: Reg Time, B: Name, C: Staff ID, D: Dept, E: Designation, F: Email, G: Mobile, H: Ticket ID, I: Status, J: Created, K: Check-in
    var newRow = [
      timeFormatted,
      name,
      staffId,
      department,
      designation,
      email,
      mobile,
      ticketId,
      'UNUSED',
      timeFormatted,
      ''
    ];

    sheet.appendRow(newRow);

    // Send Digital Ticket Pass Email
    var emailSent = false;
    try {
      sendTeacherTicketEmail(email, name, staffId, department, designation, ticketId, settings);
      emailSent = true;
    } catch (mailErr) {
      Logger.log('Teacher mail send error: ' + mailErr.toString());
    }

    return {
      success: true,
      message: 'Teacher / Staff Registration Successful! Your pass has been issued.',
      ticket: {
        category: 'TEACHER',
        ticketId: ticketId,
        name: name,
        staffId: staffId,
        department: department,
        designation: designation,
        email: email,
        mobile: mobile,
        status: 'UNUSED',
        registrationTime: timeFormatted,
        emailSent: emailSent
      }
    };

  } finally {
    lock.releaseLock();
  }
}

/**
 * Verify Ticket by Ticket ID
 * Determines category automatically from prefix:
 * STU-GRB-XXXXXX = STUDENT
 * TCH-GRB-XXXXXX = TEACHER
 */
function verifyTicket(ticketId) {
  if (!ticketId) {
    return { success: false, status: 'INVALID', message: 'No Ticket ID provided' };
  }

  ticketId = String(ticketId).trim().toUpperCase();
  var ss = SpreadsheetApp.getActiveSpreadsheet();

  if (ticketId.indexOf('STU-') === 0) {
    var sSheet = ss.getSheetByName(SHEET_STUDENTS);
    if (!sSheet) return { success: false, status: 'INVALID', message: 'Database sheet not found' };
    var sData = sSheet.getDataRange().getValues();

    for (var i = 1; i < sData.length; i++) {
      if (String(sData[i][7]).trim().toUpperCase() === ticketId) {
        var status = String(sData[i][8]).trim().toUpperCase();
        var checkinTime = sData[i][10] ? String(sData[i][10]) : '';
        return {
          success: true,
          status: status, // UNUSED or USED
          category: 'STUDENT',
          attendee: {
            category: 'STUDENT',
            name: sData[i][1],
            rollNumber: sData[i][2],
            department: sData[i][3],
            year: sData[i][4],
            section: sData[i][5],
            email: sData[i][6],
            ticketId: sData[i][7],
            status: status,
            checkinTime: checkinTime
          }
        };
      }
    }
  } else if (ticketId.indexOf('TCH-') === 0) {
    var tSheet = ss.getSheetByName(SHEET_TEACHERS);
    if (!tSheet) return { success: false, status: 'INVALID', message: 'Database sheet not found' };
    var tData = tSheet.getDataRange().getValues();

    for (var j = 1; j < tData.length; j++) {
      if (String(tData[j][7]).trim().toUpperCase() === ticketId) {
        var tStatus = String(tData[j][8]).trim().toUpperCase();
        var tCheckinTime = tData[j][10] ? String(tData[j][10]) : '';
        return {
          success: true,
          status: tStatus, // UNUSED or USED
          category: 'TEACHER',
          attendee: {
            category: 'TEACHER',
            name: tData[j][1],
            staffId: tData[j][2],
            department: tData[j][3],
            designation: tData[j][4],
            email: tData[j][5],
            mobile: tData[j][6],
            ticketId: tData[j][7],
            status: tStatus,
            checkinTime: tCheckinTime
          }
        };
      }
    }
  }

  return {
    success: false,
    status: 'INVALID',
    message: 'ENTRY DENIED: INVALID TICKET. Ticket ID does not exist in event database.'
  };
}

/**
 * Check-in Ticket at Gate
 * Marks ticket as USED and writes timestamp in column K.
 * Fails if ticket is already USED or INVALID.
 */
function checkInTicket(ticketId) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
  } catch (e) {
    return { success: false, message: 'Gate system busy. Please scan again.' };
  }

  try {
    if (!ticketId) {
      return { success: false, status: 'INVALID', message: 'No Ticket ID provided' };
    }

    ticketId = String(ticketId).trim().toUpperCase();
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var now = new Date();
    var timeFormatted = Utilities.formatDate(now, Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm:ss');

    if (ticketId.indexOf('STU-') === 0) {
      var sSheet = ss.getSheetByName(SHEET_STUDENTS);
      var sData = sSheet.getDataRange().getValues();

      for (var i = 1; i < sData.length; i++) {
        if (String(sData[i][7]).trim().toUpperCase() === ticketId) {
          var currentStatus = String(sData[i][8]).trim().toUpperCase();
          if (currentStatus === 'USED') {
            return {
              success: false,
              status: 'ALREADY_USED',
              message: 'ENTRY DENIED: TICKET ALREADY USED',
              previousCheckInTime: sData[i][10] || 'Unknown',
              attendee: {
                category: 'STUDENT',
                name: sData[i][1],
                rollNumber: sData[i][2],
                department: sData[i][3],
                year: sData[i][4],
                section: sData[i][5],
                ticketId: sData[i][7]
              }
            };
          }

          // Mark as USED and set Check-in Time (row index is i + 1)
          sSheet.getRange(i + 1, 9).setValue('USED');
          sSheet.getRange(i + 1, 11).setValue(timeFormatted);

          return {
            success: true,
            status: 'USED',
            message: 'ENTRY ALLOWED',
            checkinTime: timeFormatted,
            attendee: {
              category: 'STUDENT',
              name: sData[i][1],
              rollNumber: sData[i][2],
              department: sData[i][3],
              year: sData[i][4],
              section: sData[i][5],
              ticketId: sData[i][7],
              status: 'USED',
              checkinTime: timeFormatted
            }
          };
        }
      }
    } else if (ticketId.indexOf('TCH-') === 0) {
      var tSheet = ss.getSheetByName(SHEET_TEACHERS);
      var tData = tSheet.getDataRange().getValues();

      for (var j = 1; j < tData.length; j++) {
        if (String(tData[j][7]).trim().toUpperCase() === ticketId) {
          var tCurrentStatus = String(tData[j][8]).trim().toUpperCase();
          if (tCurrentStatus === 'USED') {
            return {
              success: false,
              status: 'ALREADY_USED',
              message: 'ENTRY DENIED: TICKET ALREADY USED',
              previousCheckInTime: tData[j][10] || 'Unknown',
              attendee: {
                category: 'TEACHER',
                name: tData[j][1],
                staffId: tData[j][2],
                department: tData[j][3],
                designation: tData[j][4],
                ticketId: tData[j][7]
              }
            };
          }

          // Mark as USED and set Check-in Time
          tSheet.getRange(j + 1, 9).setValue('USED');
          tSheet.getRange(j + 1, 11).setValue(timeFormatted);

          return {
            success: true,
            status: 'USED',
            message: 'ENTRY ALLOWED',
            checkinTime: timeFormatted,
            attendee: {
              category: 'TEACHER',
              name: tData[j][1],
              staffId: tData[j][2],
              department: tData[j][3],
              designation: tData[j][4],
              ticketId: tData[j][7],
              status: 'USED',
              checkinTime: timeFormatted
            }
          };
        }
      }
    }

    return {
      success: false,
      status: 'INVALID',
      message: 'ENTRY DENIED: INVALID TICKET. Ticket ID does not exist in event database.'
    };

  } finally {
    lock.releaseLock();
  }
}

/**
 * Get Real-time Dashboard Statistics
 */
function getDashboardStats() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sSheet = ss.getSheetByName(SHEET_STUDENTS);
  var tSheet = ss.getSheetByName(SHEET_TEACHERS);

  var stats = {
    students: { total: 0, checkedIn: 0, notCheckedIn: 0 },
    teachers: { total: 0, checkedIn: 0, notCheckedIn: 0 },
    overall: { total: 0, checkedIn: 0, remaining: 0 },
    departments: {},
    years: { '1st Year': 0, '2nd Year': 0, '3rd Year': 0, '4th Year': 0 },
    sections: {}
  };

  if (sSheet) {
    var sData = sSheet.getDataRange().getValues();
    for (var i = 1; i < sData.length; i++) {
      if (!sData[i][1]) continue;
      stats.students.total++;
      var status = String(sData[i][8]).trim().toUpperCase();
      if (status === 'USED') stats.students.checkedIn++;
      else stats.students.notCheckedIn++;

      var dept = String(sData[i][3]).trim() || 'Other';
      stats.departments[dept] = (stats.departments[dept] || 0) + 1;

      var yr = String(sData[i][4]).trim();
      if (stats.years[yr] !== undefined) stats.years[yr]++;
      else stats.years[yr] = (stats.years[yr] || 0) + 1;

      var sec = String(sData[i][5]).trim() || 'Other';
      stats.sections[sec] = (stats.sections[sec] || 0) + 1;
    }
  }

  if (tSheet) {
    var tData = tSheet.getDataRange().getValues();
    for (var j = 1; j < tData.length; j++) {
      if (!tData[j][1]) continue;
      stats.teachers.total++;
      var tStatus = String(tData[j][8]).trim().toUpperCase();
      if (tStatus === 'USED') stats.teachers.checkedIn++;
      else stats.teachers.notCheckedIn++;

      var tDept = String(tData[j][3]).trim() || 'Other';
      stats.departments[tDept] = (stats.departments[tDept] || 0) + 1;
    }
  }

  stats.overall.total = stats.students.total + stats.teachers.total;
  stats.overall.checkedIn = stats.students.checkedIn + stats.teachers.checkedIn;
  stats.overall.remaining = stats.students.notCheckedIn + stats.teachers.notCheckedIn;

  return { success: true, stats: stats };
}

/**
 * Search Attendees for Admin Interface
 */
function searchAttendees(query, category) {
  query = (query || '').toLowerCase().trim();
  category = (category || 'ALL').toUpperCase();

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var results = [];

  if (category === 'ALL' || category === 'STUDENT') {
    var sSheet = ss.getSheetByName(SHEET_STUDENTS);
    if (sSheet) {
      var sData = sSheet.getDataRange().getValues();
      for (var i = 1; i < sData.length; i++) {
        if (!sData[i][1]) continue;
        var sName = String(sData[i][1]).toLowerCase();
        var sRoll = String(sData[i][2]).toLowerCase();
        var sTicket = String(sData[i][7]).toLowerCase();
        if (!query || sName.indexOf(query) !== -1 || sRoll.indexOf(query) !== -1 || sTicket.indexOf(query) !== -1) {
          results.push({
            category: 'STUDENT',
            name: sData[i][1],
            idNumber: sData[i][2],
            department: sData[i][3],
            yearOrDesignation: sData[i][4],
            section: sData[i][5],
            email: sData[i][6],
            ticketId: sData[i][7],
            status: sData[i][8],
            checkinTime: sData[i][10] || ''
          });
        }
      }
    }
  }

  if (category === 'ALL' || category === 'TEACHER') {
    var tSheet = ss.getSheetByName(SHEET_TEACHERS);
    if (tSheet) {
      var tData = tSheet.getDataRange().getValues();
      for (var j = 1; j < tData.length; j++) {
        if (!tData[j][1]) continue;
        var tName = String(tData[j][1]).toLowerCase();
        var tStaff = String(tData[j][2]).toLowerCase();
        var tTicket = String(tData[j][7]).toLowerCase();
        if (!query || tName.indexOf(query) !== -1 || tStaff.indexOf(query) !== -1 || tTicket.indexOf(query) !== -1) {
          results.push({
            category: 'TEACHER',
            name: tData[j][1],
            idNumber: tData[j][2],
            department: tData[j][3],
            yearOrDesignation: tData[j][4],
            section: '-',
            email: tData[j][5],
            ticketId: tData[j][7],
            status: tData[j][8],
            checkinTime: tData[j][10] || ''
          });
        }
      }
    }
  }

  return { success: true, count: results.length, attendees: results };
}

/**
 * Get All Data for Admin View
 */
function getAllDataForAdmin() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sSheet = ss.getSheetByName(SHEET_STUDENTS);
  var tSheet = ss.getSheetByName(SHEET_TEACHERS);

  var students = [];
  var teachers = [];

  if (sSheet) {
    var sData = sSheet.getDataRange().getValues();
    for (var i = 1; i < sData.length; i++) {
      if (!sData[i][1]) continue;
      students.push({
        registrationTime: sData[i][0],
        name: sData[i][1],
        rollNumber: sData[i][2],
        department: sData[i][3],
        year: sData[i][4],
        section: sData[i][5],
        email: sData[i][6],
        ticketId: sData[i][7],
        status: sData[i][8],
        checkinTime: sData[i][10] || ''
      });
    }
  }

  if (tSheet) {
    var tData = tSheet.getDataRange().getValues();
    for (var j = 1; j < tData.length; j++) {
      if (!tData[j][1]) continue;
      teachers.push({
        registrationTime: tData[j][0],
        name: tData[j][1],
        staffId: tData[j][2],
        department: tData[j][3],
        designation: tData[j][4],
        email: tData[j][5],
        mobile: tData[j][6],
        ticketId: tData[j][7],
        status: tData[j][8],
        checkinTime: tData[j][10] || ''
      });
    }
  }

  return {
    success: true,
    students: students,
    teachers: teachers,
    stats: getDashboardStats().stats,
    settings: getSettingsFromSheet()
  };
}

/**
 * Email Delivery for Student Pass
 */
function sendStudentTicketEmail(email, name, rollNumber, department, year, section, ticketId, settings) {
  var qrUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=' + encodeURIComponent(ticketId);
  var subject = 'Your ' + settings.eventName + ' Student Entry Pass';

  var htmlBody = ''
    + '<div style="background-color: #0f172a; padding: 25px; font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, sans-serif; color: #f8fafc;">'
    + '  <div style="max-width: 520px; margin: 0 auto; background: linear-gradient(135deg, #1e1b4b 0%, #311042 100%); border: 2px solid #f59e0b; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">'
    + '    <div style="background: linear-gradient(90deg, #b45309, #d97706, #f59e0b); padding: 15px 20px; text-align: center;">'
    + '      <h1 style="margin: 0; color: #ffffff; font-size: 20px; letter-spacing: 1.5px; text-transform: uppercase;">' + settings.eventName + '</h1>'
    + '      <p style="margin: 4px 0 0 0; color: #fef3c7; font-size: 13px;">' + settings.eventDate + ' • ' + settings.venue + '</p>'
    + '    </div>'
    + '    <div style="padding: 20px; text-align: center;">'
    + '      <div style="display: inline-block; background-color: #f59e0b; color: #000; font-weight: bold; font-size: 12px; padding: 4px 14px; border-radius: 20px; letter-spacing: 1px; margin-bottom: 15px;">'
    + '        STUDENT ENTRY PASS'
    + '      </div>'
    + '      <div style="background-color: #ffffff; padding: 12px; border-radius: 12px; display: inline-block; box-shadow: 0 4px 12px rgba(0,0,0,0.3);">'
    + '        <img src="' + qrUrl + '" alt="Entry QR" width="180" height="180" style="display: block; margin: 0 auto;" />'
    + '      </div>'
    + '      <div style="margin-top: 15px; font-size: 18px; font-weight: 700; color: #fbbf24; letter-spacing: 2px;">' + ticketId + '</div>'
    + '      <div style="background: rgba(255,255,255,0.06); border-radius: 10px; margin-top: 20px; padding: 16px; text-align: left; font-size: 14px; line-height: 1.6;">'
    + '        <div style="border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 6px; margin-bottom: 6px;">'
    + '          <span style="color: #94a3b8;">Attendee Name:</span> <strong style="color: #ffffff; float: right;">' + name + '</strong>'
    + '        </div>'
    + '        <div style="border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 6px; margin-bottom: 6px;">'
    + '          <span style="color: #94a3b8;">Roll Number:</span> <strong style="color: #ffffff; float: right;">' + rollNumber + '</strong>'
    + '        </div>'
    + '        <div style="border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 6px; margin-bottom: 6px;">'
    + '          <span style="color: #94a3b8;">Department:</span> <strong style="color: #ffffff; float: right;">' + department + '</strong>'
    + '        </div>'
    + '        <div style="border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 6px; margin-bottom: 6px;">'
    + '          <span style="color: #94a3b8;">Year / Section:</span> <strong style="color: #ffffff; float: right;">' + year + ' (' + section + ')</strong>'
    + '        </div>'
    + '      </div>'
    + '      <div style="background: rgba(220, 38, 38, 0.15); border: 1px solid #ef4444; border-radius: 8px; margin-top: 18px; padding: 12px; text-align: left; font-size: 12px; color: #fca5a5;">'
    + '        <strong style="color: #f87171; display: block; margin-bottom: 4px;">⚠️ MANDATORY ENTRY INSTRUCTIONS:</strong>'
    + '        • Bring your digital ticket (on phone or printout).<br/>'
    + '        • Bring your original college ID card for verification at the gate.<br/>'
    + '        • Ticket can be used only once. Duplicate entry will be denied.<br/>'
    + '        • Entry is strictly non-transferable.'
    + '      </div>'
    + '    </div>'
    + '  </div>'
    + '</div>';

  MailApp.sendEmail({
    to: email,
    subject: subject,
    htmlBody: htmlBody
  });
}

/**
 * Email Delivery for Teacher / Staff Pass
 */
function sendTeacherTicketEmail(email, name, staffId, department, designation, ticketId, settings) {
  var qrUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=' + encodeURIComponent(ticketId);
  var subject = 'Your ' + settings.eventName + ' Teacher Entry Pass';

  var htmlBody = ''
    + '<div style="background-color: #0f172a; padding: 25px; font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, sans-serif; color: #f8fafc;">'
    + '  <div style="max-width: 520px; margin: 0 auto; background: linear-gradient(135deg, #1e1b4b 0%, #172554 100%); border: 2px solid #38bdf8; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">'
    + '    <div style="background: linear-gradient(90deg, #0284c7, #0ea5e9, #38bdf8); padding: 15px 20px; text-align: center;">'
    + '      <h1 style="margin: 0; color: #ffffff; font-size: 20px; letter-spacing: 1.5px; text-transform: uppercase;">' + settings.eventName + '</h1>'
    + '      <p style="margin: 4px 0 0 0; color: #e0f2fe; font-size: 13px;">' + settings.eventDate + ' • ' + settings.venue + '</p>'
    + '    </div>'
    + '    <div style="padding: 20px; text-align: center;">'
    + '      <div style="display: inline-block; background-color: #38bdf8; color: #000; font-weight: bold; font-size: 12px; padding: 4px 14px; border-radius: 20px; letter-spacing: 1px; margin-bottom: 15px;">'
    + '        TEACHER / STAFF ENTRY PASS'
    + '      </div>'
    + '      <div style="background-color: #ffffff; padding: 12px; border-radius: 12px; display: inline-block; box-shadow: 0 4px 12px rgba(0,0,0,0.3);">'
    + '        <img src="' + qrUrl + '" alt="Entry QR" width="180" height="180" style="display: block; margin: 0 auto;" />'
    + '      </div>'
    + '      <div style="margin-top: 15px; font-size: 18px; font-weight: 700; color: #7dd3fc; letter-spacing: 2px;">' + ticketId + '</div>'
    + '      <div style="background: rgba(255,255,255,0.06); border-radius: 10px; margin-top: 20px; padding: 16px; text-align: left; font-size: 14px; line-height: 1.6;">'
    + '        <div style="border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 6px; margin-bottom: 6px;">'
    + '          <span style="color: #94a3b8;">Staff Name:</span> <strong style="color: #ffffff; float: right;">' + name + '</strong>'
    + '        </div>'
    + '        <div style="border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 6px; margin-bottom: 6px;">'
    + '          <span style="color: #94a3b8;">Employee / Staff ID:</span> <strong style="color: #ffffff; float: right;">' + staffId + '</strong>'
    + '        </div>'
    + '        <div style="border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 6px; margin-bottom: 6px;">'
    + '          <span style="color: #94a3b8;">Department:</span> <strong style="color: #ffffff; float: right;">' + department + '</strong>'
    + '        </div>'
    + '        <div style="border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 6px; margin-bottom: 6px;">'
    + '          <span style="color: #94a3b8;">Designation:</span> <strong style="color: #ffffff; float: right;">' + designation + '</strong>'
    + '        </div>'
    + '      </div>'
    + '      <div style="background: rgba(220, 38, 38, 0.15); border: 1px solid #ef4444; border-radius: 8px; margin-top: 18px; padding: 12px; text-align: left; font-size: 12px; color: #fca5a5;">'
    + '        <strong style="color: #f87171; display: block; margin-bottom: 4px;">⚠️ MANDATORY ENTRY INSTRUCTIONS:</strong>'
    + '        • Bring your digital ticket (on phone or printout).<br/>'
    + '        • Bring your original college staff ID card for verification at the gate.<br/>'
    + '        • Ticket can be used only once. Duplicate entry will be denied.<br/>'
    + '        • Entry is strictly non-transferable.'
    + '      </div>'
    + '    </div>'
    + '  </div>'
    + '</div>';

  MailApp.sendEmail({
    to: email,
    subject: subject,
    htmlBody: htmlBody
  });
}
