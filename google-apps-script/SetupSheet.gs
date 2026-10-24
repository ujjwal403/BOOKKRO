/**
 * ==============================================================================
 * BOOKKRO COLLEGE EVENTS - GOOGLE SHEETS 1-CLICK AUTO-SETUP SCRIPT
 * ==============================================================================
 * Run this function ONCE from Apps Script editor (`setupDatabase`).
 * It automatically creates and formats all 4 required sheets with exact columns,
 * formulas, color coding, and initial configuration.
 * ==============================================================================
 */

function setupDatabase() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();

  // 1. Create or Reset "Student Registrations"
  var sSheet = ss.getSheetByName('Student Registrations') || ss.insertSheet('Student Registrations');
  sSheet.clear();
  var sHeaders = [
    'Registration Time',
    'Name',
    'Roll Number',
    'Department',
    'Year',
    'Section',
    'Email',
    'Ticket ID',
    'Ticket Status',
    'Ticket Created',
    'Check-in Time'
  ];
  sSheet.getRange(1, 1, 1, sHeaders.length).setValues([sHeaders]);
  sSheet.getRange(1, 1, 1, sHeaders.length)
    .setBackground('#1e1b4b')
    .setFontColor('#fbbf24')
    .setFontWeight('bold')
    .setFontFamily('Arial')
    .setHorizontalAlignment('center');
  sSheet.setFrozenRows(1);
  sSheet.setColumnWidth(1, 160); // Reg Time
  sSheet.setColumnWidth(2, 180); // Name
  sSheet.setColumnWidth(3, 140); // Roll No
  sSheet.setColumnWidth(4, 130); // Dept
  sSheet.setColumnWidth(5, 110); // Year
  sSheet.setColumnWidth(6, 110); // Section
  sSheet.setColumnWidth(7, 220); // Email
  sSheet.setColumnWidth(8, 160); // Ticket ID
  sSheet.setColumnWidth(9, 120); // Ticket Status
  sSheet.setColumnWidth(10, 160); // Created
  sSheet.setColumnWidth(11, 160); // Check-in Time

  // 2. Create or Reset "Teacher Registrations"
  var tSheet = ss.getSheetByName('Teacher Registrations') || ss.insertSheet('Teacher Registrations');
  tSheet.clear();
  var tHeaders = [
    'Registration Time',
    'Name',
    'Employee / Staff ID',
    'Department',
    'Designation',
    'Email',
    'Mobile Number',
    'Ticket ID',
    'Ticket Status',
    'Ticket Created',
    'Check-in Time'
  ];
  tSheet.getRange(1, 1, 1, tHeaders.length).setValues([tHeaders]);
  tSheet.getRange(1, 1, 1, tHeaders.length)
    .setBackground('#0c4a6e')
    .setFontColor('#38bdf8')
    .setFontWeight('bold')
    .setFontFamily('Arial')
    .setHorizontalAlignment('center');
  tSheet.setFrozenRows(1);
  tSheet.setColumnWidth(1, 160); // Reg Time
  tSheet.setColumnWidth(2, 180); // Name
  tSheet.setColumnWidth(3, 160); // Staff ID
  tSheet.setColumnWidth(4, 130); // Dept
  tSheet.setColumnWidth(5, 160); // Designation
  tSheet.setColumnWidth(6, 220); // Email
  tSheet.setColumnWidth(7, 140); // Mobile
  tSheet.setColumnWidth(8, 160); // Ticket ID
  tSheet.setColumnWidth(9, 120); // Ticket Status
  tSheet.setColumnWidth(10, 160); // Created
  tSheet.setColumnWidth(11, 160); // Check-in Time

  // 3. Create or Reset "Dashboard" with Automated Live Formulas
  var dSheet = ss.getSheetByName('Dashboard') || ss.insertSheet('Dashboard');
  dSheet.clear();

  // Title Banner
  dSheet.getRange('A1:F1').merge();
  dSheet.getRange('A1').setValue('🎉 BOOKKRO - LIVE CAMPUS EVENT DASHBOARD 🎉')
    .setBackground('#1e1b4b')
    .setFontColor('#f59e0b')
    .setFontSize(16)
    .setFontWeight('bold')
    .setHorizontalAlignment('center');

  // Overall Statistics Block
  dSheet.getRange('A3:B3').merge().setValue('OVERALL STATISTICS').setBackground('#312e81').setFontColor('#ffffff').setFontWeight('bold');
  dSheet.getRange('A4').setValue('Total Registered');
  dSheet.getRange('B4').setFormula('=B10 + B16');
  dSheet.getRange('A5').setValue('Total Checked In');
  dSheet.getRange('B5').setFormula('=B12 + B18');
  dSheet.getRange('A6').setValue('Total Remaining');
  dSheet.getRange('B6').setFormula('=B13 + B19');

  // Student Statistics Block
  dSheet.getRange('A9:B9').merge().setValue('STUDENT STATISTICS').setBackground('#b45309').setFontColor('#ffffff').setFontWeight('bold');
  dSheet.getRange('A10').setValue('Total Students Registered');
  dSheet.getRange('B10').setFormula('=COUNTA(\'Student Registrations\'!B2:B)');
  dSheet.getRange('A11').setValue('Total Student Tickets Generated');
  dSheet.getRange('B11').setFormula('=COUNTIF(\'Student Registrations\'!H2:H, "STU-*")');
  dSheet.getRange('A12').setValue('Students Checked In');
  dSheet.getRange('B12').setFormula('=COUNTIF(\'Student Registrations\'!I2:I, "USED")');
  dSheet.getRange('A13').setValue('Students Not Yet Checked In');
  dSheet.getRange('B13').setFormula('=COUNTIF(\'Student Registrations\'!I2:I, "UNUSED")');

  // Teacher / Staff Statistics Block
  dSheet.getRange('A15:B15').merge().setValue('TEACHER / STAFF STATISTICS').setBackground('#0369a1').setFontColor('#ffffff').setFontWeight('bold');
  dSheet.getRange('A16').setValue('Total Teachers / Staff Registered');
  dSheet.getRange('B16').setFormula('=COUNTA(\'Teacher Registrations\'!B2:B)');
  dSheet.getRange('A17').setValue('Total Teacher Tickets Generated');
  dSheet.getRange('B17').setFormula('=COUNTIF(\'Teacher Registrations\'!H2:H, "TCH-*")');
  dSheet.getRange('A18').setValue('Teachers / Staff Checked In');
  dSheet.getRange('B18').setFormula('=COUNTIF(\'Teacher Registrations\'!I2:I, "USED")');
  dSheet.getRange('A19').setValue('Teachers / Staff Not Yet Checked In');
  dSheet.getRange('B19').setFormula('=COUNTIF(\'Teacher Registrations\'!I2:I, "UNUSED")');

  // Department-wise Counts
  dSheet.getRange('D3:F3').merge().setValue('DEPARTMENT-WISE COUNTS').setBackground('#312e81').setFontColor('#ffffff').setFontWeight('bold');
  dSheet.getRange('D4').setValue('Department').setFontWeight('bold');
  dSheet.getRange('E4').setValue('Students').setFontWeight('bold');
  dSheet.getRange('F4').setValue('Teachers').setFontWeight('bold');

  var sampleDepts = ['B.Tech', 'MBA', 'B.Pharm', 'BCA', 'Nursing', 'MCA', 'Polytechnic'];
  for (var d = 0; d < sampleDepts.length; d++) {
    var r = 5 + d;
    dSheet.getRange('D' + r).setValue(sampleDepts[d]);
    dSheet.getRange('E' + r).setFormula('=COUNTIF(\'Student Registrations\'!D2:D, "' + sampleDepts[d] + '")');
    dSheet.getRange('F' + r).setFormula('=COUNTIF(\'Teacher Registrations\'!D2:D, "' + sampleDepts[d] + '")');
  }

  // Year-wise Student Counts
  var yrRowStart = 5 + sampleDepts.length + 1;
  dSheet.getRange('D' + yrRowStart + ':E' + yrRowStart).merge().setValue('YEAR-WISE STUDENT COUNTS').setBackground('#b45309').setFontColor('#ffffff').setFontWeight('bold');
  var years = ['1st Year', '2nd Year', '3rd Year', '4th Year'];
  for (var y = 0; y < years.length; y++) {
    var yRow = yrRowStart + 1 + y;
    dSheet.getRange('D' + yRow).setValue(years[y]);
    dSheet.getRange('E' + yRow).setFormula('=COUNTIF(\'Student Registrations\'!E2:E, "' + years[y] + '")');
  }

  // Section-wise Student Counts
  var secRowStart = yrRowStart + 1 + years.length + 1;
  dSheet.getRange('D' + secRowStart + ':E' + secRowStart).merge().setValue('SECTION-WISE STUDENT COUNTS').setBackground('#0369a1').setFontColor('#ffffff').setFontWeight('bold');
  var sections = ['Section A', 'Section B', 'Section C', 'Section D'];
  for (var s = 0; s < sections.length; s++) {
    var sRow = secRowStart + 1 + s;
    dSheet.getRange('D' + sRow).setValue(sections[s]);
    dSheet.getRange('E' + sRow).setFormula('=COUNTIF(\'Student Registrations\'!F2:F, "' + sections[s] + '")');
  }

  dSheet.setColumnWidth(1, 240);
  dSheet.setColumnWidth(2, 120);
  dSheet.setColumnWidth(3, 40);
  dSheet.setColumnWidth(4, 180);
  dSheet.setColumnWidth(5, 110);
  dSheet.setColumnWidth(6, 110);

  // 4. Create or Reset "Settings" Sheet
  var setSheet = ss.getSheetByName('Settings') || ss.insertSheet('Settings');
  setSheet.clear();
  var settingsRows = [
    ['Configuration Key', 'Value', 'Description'],
    ['Event Name', 'Campus Cultural Fest 2026', 'Displayed on website and entry pass'],
    ['Event Date', '16 October 2026', 'Official date of event'],
    ['Venue', 'Open Air Theatre', 'Event location'],
    ['Registration Open', 'TRUE', 'Master switch for registrations'],
    ['Student Registration Open', 'TRUE', 'Allow student registrations'],
    ['Teacher Registration Open', 'TRUE', 'Allow teacher/staff registrations'],
    ['Departments', 'B.Tech, MBA, B.Pharm, BCA, Nursing, MCA, Polytechnic', 'Comma-separated list of departments'],
    ['Years', '1st Year, 2nd Year, 3rd Year, 4th Year', 'Comma-separated list of student years'],
    ['Sections', 'Section A, Section B, Section C, Section D', 'Comma-separated list of sections']
  ];
  setSheet.getRange(1, 1, settingsRows.length, 3).setValues(settingsRows);
  setSheet.getRange('A1:C1').setBackground('#1e1b4b').setFontColor('#ffffff').setFontWeight('bold');
  setSheet.setColumnWidth(1, 220);
  setSheet.setColumnWidth(2, 360);
  setSheet.setColumnWidth(3, 300);

  SpreadsheetApp.getActiveSpreadsheet().toast('Event database sheets created successfully!', 'Setup Complete', 5);
}

function setupGarbaDatabase() {
  setupDatabase();
}
