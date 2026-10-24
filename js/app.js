/**
 * BOOKKRO - Universal College Events & Entry Pass Portal
 * State Controller, Multi-Tenant Engine & QR Gate Verification
 */

(function(window) {
  'use strict';

  // =========================================================================
  // DEFAULT CONFIGURATION & SEED DATABASE
  // =========================================================================
  var DEFAULT_SETTINGS = {
    eventName: 'National Campus Cultural Fest 2026',
    eventDate: '16 October 2026',
    venue: 'Main Campus Open Air Theatre',
    registrationOpen: true,
    studentRegistrationOpen: true,
    teacherRegistrationOpen: true,
    departments: ['Computer Science', 'Mechanical', 'Electrical', 'Civil', 'Electronics', 'Management', 'Sciences'],
    years: ['1st Year', '2nd Year', '3rd Year', '4th Year'],
    sections: ['Section A', 'Section B', 'Section C', 'Section D'],
    gasWebAppUrl: '',
    adminId: 'admin',
    adminPassword: 'bookkro2026@admin',
    ticketFee: 150,
    upiId: 'fest2026@oksbi',
    requirePaymentVerification: true,
    emailJsServiceId: '',
    emailJsTemplateId: '',
    emailJsPublicKey: ''
  };

  // Seed Events across multiple prestigious colleges
  var DEFAULT_EVENTS = [
    {
      id: 'nit-cult-2026',
      collegeId: 'nit',
      collegeName: 'National Institute of Technology',
      collegeBadge: '🎭 NIT Campus',
      collegeLogo: '🏛️',
      codePrefix: 'NIT',
      title: 'National Campus Cultural Fest 2026',
      tagline: 'Annual Multi-College Raas, Dance & Music Extravaganza',
      category: 'CULTURAL',
      date: '16 October 2026',
      time: '6:00 PM – 11:30 PM',
      venue: 'Main Campus Open Air Theatre',
      eligibility: 'All Enrolled College Students & Faculty',
      ticketType: 'FREE',
      feeAmount: 0,
      upiId: 'fest2026@oksbi',
      description: 'The premier inter-college cultural festival! Live bands, traditional dance performances, DJ night, food street, and open invitation to students across all accredited institutions.',
      tags: ['Live Band', 'Cultural Dance', 'Food Stalls', 'Open Inter-College'],
      rating: '4.9 / 5',
      interestedCount: '3,200+ College Attendees',
      themeColor: '#f59e0b',
      status: 'LIVE',
      hostClub: 'Inter-College Cultural Council',
      hostEmail: 'cultural@nit.edu'
    },
    {
      id: 'iitb-techfusion-2026',
      collegeId: 'iitb',
      collegeName: 'IIT Bombay',
      collegeBadge: '⚡ IIT Bombay',
      collegeLogo: '💻',
      codePrefix: 'TCF',
      title: 'TechFusion Hackathon 2026',
      tagline: '24-Hour National Coding, Web3 & Autonomous Agents Marathon',
      category: 'TECH',
      date: '5 November 2026',
      time: '9:00 AM – 24 Hours',
      venue: 'Computer Center & Main Auditorium, IIT Bombay Campus',
      eligibility: 'Open to All College & University Students (Inter-College)',
      ticketType: 'FREE',
      feeAmount: 0,
      upiId: 'techfusion@oksbi',
      description: '24-hour national hackathon for student developers and innovators. ₹50,000 cash prize pool, industry bounties, free meals, swags, and direct mentorship from top engineering leaders.',
      tags: ['₹50,000 Cash Prizes', 'AI & Agents', 'Web3 & Cloud', 'Free Meals & Swags'],
      rating: '4.95 / 5',
      interestedCount: '1,680+ Hackers Registered',
      themeColor: '#0284c7',
      status: 'LIVE',
      hostClub: 'Web & Coding Club (WnCC)',
      hostEmail: 'techfusion@iitb.ac.in'
    },
    {
      id: 'du-spardha-2026',
      collegeId: 'du',
      collegeName: 'Delhi University (DU)',
      collegeBadge: '🏆 Delhi University',
      collegeLogo: '⚽',
      codePrefix: 'SPD',
      title: 'Spardha Annual Sports Carnival',
      tagline: 'National Inter-College Athletics & Games Championship',
      category: 'SPORTS',
      date: '20 November 2026',
      time: '8:00 AM – 6:00 PM (3 Days)',
      venue: 'University Sports Complex & Polo Grounds',
      eligibility: 'Inter-College Student Teams & Faculty',
      ticketType: 'FREE',
      feeAmount: 0,
      upiId: 'sports@oksbi',
      description: 'Three days of spirited athletics, track and field championships, cricket, football, basketball tournaments, and cheer battles with colleges from across the region.',
      tags: ['Cricket & Football', 'Track & Field', 'Trophies & Medals', 'Cheer Battles'],
      rating: '4.85 / 5',
      interestedCount: '3,200+ Athletes & Fans',
      themeColor: '#10b981',
      status: 'LIVE',
      hostClub: 'Delhi University Sports Council',
      hostEmail: 'sports@du.ac.in'
    },
    {
      id: 'bits-waves-2026',
      collegeId: 'bits',
      collegeName: 'BITS Pilani',
      collegeBadge: '🚀 BITS Pilani',
      collegeLogo: '🎸',
      codePrefix: 'WAV',
      title: 'Waves Cultural & EDM Music Fest 2026',
      tagline: '3 Days of Live Rock Bands, Dance Battles & Celebrity Headliners',
      category: 'MUSIC',
      date: '12 December 2026',
      time: '5:00 PM – Midnight',
      venue: 'Amphitheatre & Rock Arena, BITS Pilani Campus',
      eligibility: 'Open to All College & University Students',
      ticketType: 'PAID',
      feeAmount: 200,
      upiId: 'wavesfest@okhdfcbank',
      description: 'The legendary annual cultural fest featuring top celebrity headliners, national battle of rock bands, DJ pro-nights, flash mobs, and food carnivals across campus.',
      tags: ['Celebrity Headliners', 'Battle of the Bands', 'Pro-Nights', 'Food Carnival'],
      rating: '5.0 / 5',
      interestedCount: '4,500+ Attendees',
      themeColor: '#e11d48',
      status: 'LIVE',
      hostClub: 'Council of Student Affairs',
      hostEmail: 'waves@pilani.bits-pilani.ac.in'
    }
  ];

  var INITIAL_STUDENTS = [
    {
      registrationTime: '2026-09-24 10:15:00',
      name: 'Rahul Sharma',
      rollNumber: '22BT0145',
      department: 'B.Tech',
      year: '3rd Year',
      section: 'Section A',
      email: 'rahul.sharma@example.edu',
      ticketId: 'STU-GRB-000001',
      status: 'USED',
      paymentStatus: 'PAID',
      feeAmount: 150,
      utrNumber: '240924101500',
      ticketCreated: '2026-09-24 10:15:00',
      checkinTime: '2026-10-16 18:30:15'
    },
    {
      registrationTime: '2026-09-24 11:20:00',
      name: 'Priya Patel',
      rollNumber: '23MB0082',
      department: 'MBA',
      year: '2nd Year',
      section: 'Section B',
      email: 'priya.patel@example.edu',
      ticketId: 'STU-GRB-000002',
      status: 'UNUSED',
      paymentStatus: 'PAID',
      feeAmount: 150,
      utrNumber: '240924112000',
      ticketCreated: '2026-09-24 11:20:00',
      checkinTime: ''
    },
    {
      registrationTime: '2026-09-24 12:05:00',
      name: 'Aman Verma',
      rollNumber: '24BP0031',
      department: 'B.Pharm',
      year: '1st Year',
      section: 'Section C',
      email: 'aman.verma@example.edu',
      ticketId: 'STU-GRB-000003',
      status: 'UNUSED',
      paymentStatus: 'PAID',
      feeAmount: 150,
      utrNumber: '240924120500',
      ticketCreated: '2026-09-24 12:05:00',
      checkinTime: ''
    },
    {
      registrationTime: '2026-09-24 12:40:00',
      name: 'Aarav Sharma',
      rollNumber: '24BT0888',
      department: 'Computer Science',
      year: '3rd Year',
      section: 'Section A',
      email: 'aarav.sharma@example.edu',
      ticketId: 'STU-NIT-000004',
      status: 'UNUSED',
      paymentStatus: 'PAID',
      feeAmount: 150,
      utrNumber: '240924124000',
      ticketCreated: '2026-09-24 12:40:00',
      checkinTime: ''
    },
    {
      registrationTime: '2026-09-30 11:15:00',
      name: 'Simran Kaur',
      rollNumber: '24BC0199',
      department: 'BCA',
      year: '1st Year',
      section: 'Section B',
      email: 'simran.k@example.com',
      ticketId: 'STU-GRB-000005',
      status: 'PAYMENT_PENDING',
      paymentStatus: 'UNDER_VERIFICATION',
      feeAmount: 150,
      utrNumber: '427189012345',
      ticketCreated: '2026-09-30 11:15:00',
      checkinTime: ''
    }
  ];

  var INITIAL_TEACHERS = [
    {
      registrationTime: '2026-09-24 09:30:00',
      name: 'Dr. Rajesh Kumar',
      staffId: 'EMP-7712',
      department: 'B.Tech',
      designation: 'Professor & HoD',
      email: 'rajesh.kumar@example.edu',
      mobile: '+91 98765 43210',
      ticketId: 'TCH-GRB-000001',
      status: 'USED',
      paymentStatus: 'PAID',
      feeAmount: 150,
      utrNumber: '240924093000',
      ticketCreated: '2026-09-24 09:30:00',
      checkinTime: '2026-10-16 18:15:40'
    },
    {
      registrationTime: '2026-09-24 10:45:00',
      name: 'Prof. Sunita Rao',
      staffId: 'EMP-8845',
      department: 'MBA',
      designation: 'Associate Professor',
      email: 'sunita.rao@example.edu',
      mobile: '+91 98765 12345',
      ticketId: 'TCH-GRB-000002',
      status: 'UNUSED',
      paymentStatus: 'PAID',
      feeAmount: 150,
      utrNumber: '240924104500',
      ticketCreated: '2026-09-24 10:45:00',
      checkinTime: ''
    }
  ];

  // =========================================================================
  // STORAGE & BACKEND MANAGER
  // =========================================================================
  var GarbaApp = {
    settings: DEFAULT_SETTINGS,
    events: [],
    currentEventId: 'nit-cult-2026',
    selectedCollegeFilter: 'ALL',
    selectedCategoryFilter: 'ALL',
    searchQuery: '',
    adminTargetEvent: 'ALL',
    scannerTargetEvent: 'ALL',
    students: [],
    teachers: [],
    emailOutbox: [],
    activeView: 'home',
    currentTicket: null,
    scannerInstance: null,
    pendingVerification: null,
    isAdminLoggedIn: false,

    init: function() {
      this.loadStorage();
      this.initRouting();
      this.initEvents();
      this.renderCollegeFilters();
      this.renderEventsCatalog();
      this.renderAdminEventSelector();
      this.renderScannerEventSelector();
      this.renderSettingsDropdowns();
      this.updateBackendBadge();
      this.updateAdminNavigationUI();
      this.refreshDashboard();

      // Render default/active event view
      var currentEvt = this.getCurrentEvent();
      if (currentEvt) {
        this.renderEventDetailsView(currentEvt);
      }

      // Show route or default
      var initialHash = window.location.hash.replace('#', '') || 'home';
      this.navigateTo(initialHash);
    },

    loadStorage: function() {
      try {
        // Load Events
        var savedEvents = localStorage.getItem('bookkro_events');
        if (savedEvents) {
          try {
            this.events = JSON.parse(savedEvents);
          } catch(e) {
            this.events = JSON.parse(JSON.stringify(DEFAULT_EVENTS));
          }
        } else {
          this.events = JSON.parse(JSON.stringify(DEFAULT_EVENTS));
          this.saveEvents();
        }

        // Ensure default seed events exist
        DEFAULT_EVENTS.forEach(function(defEvt) {
          var exists = this.events.some(function(e) { return e.id === defEvt.id; });
          if (!exists) {
            this.events.push(JSON.parse(JSON.stringify(defEvt)));
          }
        }, this);

        var savedSettings = localStorage.getItem('bookkro_settings');
        if (savedSettings) {
          this.settings = Object.assign({}, DEFAULT_SETTINGS, JSON.parse(savedSettings));
        }

        this.isAdminLoggedIn = (sessionStorage.getItem('bookkro_admin_auth') === 'true');

        var savedStudents = localStorage.getItem('bookkro_students');
        if (savedStudents) {
          this.students = JSON.parse(savedStudents);
        } else {
          this.students = JSON.parse(JSON.stringify(INITIAL_STUDENTS));
          this.saveStudents();
        }

        var savedTeachers = localStorage.getItem('bookkro_teachers');
        if (savedTeachers) {
          this.teachers = JSON.parse(savedTeachers);
        } else {
          this.teachers = JSON.parse(JSON.stringify(INITIAL_TEACHERS));
          this.saveTeachers();
        }

        var savedOutbox = localStorage.getItem('bookkro_outbox');
        if (savedOutbox) {
          this.emailOutbox = JSON.parse(savedOutbox);
        }
      } catch (e) {
        console.error("Storage loading error:", e);
      }
    },

    saveEvents: function() {
      localStorage.setItem('bookkro_events', JSON.stringify(this.events));
    },

    saveSettings: function() {
      localStorage.setItem('bookkro_settings', JSON.stringify(this.settings));
      this.updateBackendBadge();
      this.renderSettingsDropdowns();
    },

    saveStudents: function() {
      localStorage.setItem('bookkro_students', JSON.stringify(this.students));
      this.refreshDashboard();
    },

    saveTeachers: function() {
      localStorage.setItem('bookkro_teachers', JSON.stringify(this.teachers));
      this.refreshDashboard();
    },

    saveOutbox: function() {
      localStorage.setItem('bookkro_outbox', JSON.stringify(this.emailOutbox));
      this.updateOutboxBadge();
    },

    resetToDemoData: function() {
      this.events = JSON.parse(JSON.stringify(DEFAULT_EVENTS));
      this.saveEvents();
      this.students = JSON.parse(JSON.stringify(INITIAL_STUDENTS));
      this.teachers = JSON.parse(JSON.stringify(INITIAL_TEACHERS));
      this.emailOutbox = [];
      this.saveStudents();
      this.saveTeachers();
      this.saveOutbox();
      this.renderCollegeFilters();
      this.renderEventsCatalog();
      this.renderAdminEventSelector();
      this.renderScannerEventSelector();
      this.showToast('Reset to demo sample events & attendees completed!');
      this.renderAdminTable();
      this.refreshDashboard();
    },

    updateBackendBadge: function() {
      var badge = document.getElementById('backendStatusBadge');
      var dot = document.getElementById('backendStatusDot');
      var text = document.getElementById('backendStatusText');

      if (!badge || !dot || !text) return;

      if (this.settings.gasWebAppUrl) {
        dot.className = 'status-dot';
        text.innerText = 'Connected: Google Sheet';
        badge.title = 'Active API: ' + this.settings.gasWebAppUrl;
      } else {
        dot.className = 'status-dot local';
        text.innerText = 'Local Sheet Mode';
        badge.title = 'Running on fast local Google Sheet engine';
      }
    },

    updateOutboxBadge: function() {
      var count = (this.emailOutbox && this.emailOutbox.length) || 0;
      var badge = document.getElementById('outboxCountBadge');
      if (badge) {
        badge.innerText = count;
        badge.style.display = count > 0 ? 'inline-block' : 'none';
      }
      var adminBadge = document.getElementById('adminOutboxBadge');
      if (adminBadge) {
        adminBadge.innerText = count;
      }
      var outboxTotal = document.getElementById('outboxTotalCount');
      if (outboxTotal) {
        outboxTotal.innerText = count;
      }
      var outboxTrigger = document.getElementById('outboxNavTrigger');
      if (outboxTrigger) {
        outboxTrigger.style.display = this.isAdminLoggedIn ? 'inline-flex' : 'none';
      }
    },

    // =========================================================================
    // ADMIN AUTHENTICATION
    // =========================================================================
    handleAdminLogin: function(e) {
      e.preventDefault();
      var form = e.target;
      var alertBox = document.getElementById('adminLoginAlert');
      if (alertBox) alertBox.style.display = 'none';

      var inputId = (form.adminId.value || '').trim();
      var inputPass = (form.adminPassword.value || '').trim();

      var expectedId = this.settings.adminId || 'admin';
      var expectedPass = this.settings.adminPassword || 'bookkro2026@admin';

      if (inputId === expectedId && inputPass === expectedPass) {
        this.isAdminLoggedIn = true;
        sessionStorage.setItem('bookkro_admin_auth', 'true');
        form.reset();
        this.updateAdminNavigationUI();
        this.showToast('🎉 Logged in as Organizer Administrator!');
        window.location.hash = 'admin';
      } else {
        if (alertBox) {
          alertBox.className = 'alert-box alert-danger';
          alertBox.innerHTML = '<strong>❌ Access Denied:</strong> Invalid Admin ID or Password. Only authorized event organizers can access this section.';
          alertBox.style.display = 'flex';
        }
      }
    },

    handleAdminLogout: function() {
      this.isAdminLoggedIn = false;
      sessionStorage.removeItem('bookkro_admin_auth');
      this.updateAdminNavigationUI();
      this.showToast('Logged out of Organizer Portal');
      window.location.hash = 'home';
    },

    updateAdminNavigationUI: function() {
      var adminNavBtn = document.getElementById('bottomNavAdminBtn');
      var topNavAdminBtn = document.getElementById('topNavAdminBtn');
      var backendBadge = document.getElementById('backendStatusBadge');
      var outboxBadge = document.getElementById('outboxNavTrigger');

      if (topNavAdminBtn) {
        if (this.isAdminLoggedIn) {
          topNavAdminBtn.href = '#admin';
          topNavAdminBtn.innerHTML = '<span>📊</span><span>Admin Dashboard</span>';
          topNavAdminBtn.style.borderColor = 'rgba(16,185,129,0.6)';
          topNavAdminBtn.style.color = '#6ee7b7';
          topNavAdminBtn.style.background = 'rgba(6,78,59,0.35)';
        } else {
          topNavAdminBtn.href = '#admin-login';
          topNavAdminBtn.innerHTML = '<span>🔒</span><span>Admin Portal</span>';
          topNavAdminBtn.style.borderColor = 'rgba(245,158,11,0.5)';
          topNavAdminBtn.style.color = '#fde68a';
          topNavAdminBtn.style.background = 'linear-gradient(135deg, rgba(245,158,11,0.2) 0%, rgba(225,29,72,0.2) 100%)';
        }
      }

      if (adminNavBtn) {
        adminNavBtn.style.display = 'flex';
        adminNavBtn.href = this.isAdminLoggedIn ? '#admin' : '#admin-login';
        adminNavBtn.setAttribute('data-view', this.isAdminLoggedIn ? 'admin' : 'admin-login');
        var label = adminNavBtn.querySelector('span:last-child');
        if (label) {
          label.textContent = this.isAdminLoggedIn ? 'Dashboard' : 'Admin';
        }
      }
      if (backendBadge) {
        backendBadge.style.display = this.isAdminLoggedIn ? 'flex' : 'none';
      }
      if (outboxBadge) {
        outboxBadge.style.display = this.isAdminLoggedIn ? 'flex' : 'none';
      }
    },

    // =========================================================================
    // NAVIGATION & ROUTING
    // =========================================================================
    initRouting: function() {
      var self = this;
      window.addEventListener('hashchange', function() {
        var hash = window.location.hash.replace('#', '') || 'home';
        self.navigateTo(hash);
      });
    },

    navigateTo: function(viewId) {
      if (!viewId) viewId = 'home';

      // Route Guard for Admin views
      if (viewId === 'admin' || viewId === 'settings' || viewId === 'outbox') {
        if (!this.isAdminLoggedIn) {
          viewId = 'admin-login';
        }
      }

      this.activeView = viewId;

      // Hide all view sections
      var views = document.querySelectorAll('.view-section');
      views.forEach(function(v) { v.classList.remove('active'); });

      // Show selected section
      var target = document.getElementById('view-' + viewId);
      if (target) {
        target.classList.add('active');
        window.scrollTo(0, 0);
      }

      // Update bottom nav highlighting
      var navButtons = document.querySelectorAll('.nav-item-btn');
      navButtons.forEach(function(btn) {
        if (btn.getAttribute('data-view') === viewId) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });

      // Special View hooks
      if (viewId === 'scanner') {
        this.startScanner();
      } else {
        this.stopScanner();
      }

      if (viewId === 'admin') {
        this.renderAdminTable();
        this.refreshDashboard();
        this.renderPendingApprovalsList();
      }

      if (viewId === 'outbox') {
        this.renderOutboxList();
      }

      if (viewId === 'payment') {
        this.renderPaymentView();
      }

      if (viewId === 'student' || viewId === 'teacher') {
        this.checkRegistrationStatus(viewId);
      }
    },

    checkRegistrationStatus: function(category) {
      var isMasterOpen = this.settings.registrationOpen;
      var isOpen = isMasterOpen && (category === 'student' ? this.settings.studentRegistrationOpen : this.settings.teacherRegistrationOpen);

      var formContainer = document.getElementById(category + 'FormContainer');
      var closedBanner = document.getElementById(category + 'ClosedBanner');

      if (formContainer && closedBanner) {
        if (isOpen) {
          formContainer.style.display = 'block';
          closedBanner.style.display = 'none';
        } else {
          formContainer.style.display = 'none';
          closedBanner.style.display = 'block';
        }
      }
    },

    // =========================================================================
    // MULTI-COLLEGE EVENT ENGINE & DYNAMIC CATALOG
    // =========================================================================
    getCurrentEvent: function() {
      var found = this.events.find(function(e) { return e.id === this.currentEventId; }, this);
      if (!found && this.events.length > 0) {
        found = this.events[0];
        this.currentEventId = found.id;
      }
      return found;
    },

    renderEventsCatalog: function() {
      var grid = document.getElementById('eventsCatalogGrid');
      if (!grid) return;

      var collegeFilter = this.selectedCollegeFilter;
      var categoryFilter = this.selectedCategoryFilter;
      var query = (this.searchQuery || '').trim().toLowerCase();

      var filtered = this.events.filter(function(evt) {
        // College filter
        if (collegeFilter !== 'ALL') {
          if ((evt.collegeName || '').toLowerCase() !== collegeFilter.toLowerCase() && (evt.collegeId || '').toLowerCase() !== collegeFilter.toLowerCase()) {
            return false;
          }
        }
        // Category filter
        if (categoryFilter !== 'ALL') {
          if ((evt.category || '').toUpperCase() !== categoryFilter.toUpperCase()) {
            return false;
          }
        }
        // Search query
        if (query) {
          var searchable = (evt.title + ' ' + evt.collegeName + ' ' + evt.venue + ' ' + evt.category + ' ' + (evt.tags || []).join(' ')).toLowerCase();
          if (searchable.indexOf(query) === -1) {
            return false;
          }
        }
        return true;
      });

      if (filtered.length === 0) {
        grid.innerHTML = ''
          + '<div class="catalog-empty-state">'
          + '  <div class="catalog-empty-icon">🔍</div>'
          + '  <h3 class="catalog-empty-title">No College Events Found</h3>'
          + '  <p class="catalog-empty-desc">No events matched your current college or search filter. Try resetting your search or host an event for your college!</p>'
          + '  <div style="display:flex; justify-content:center; gap:10px;">'
          + '    <button class="btn btn-secondary" style="width:auto; padding:8px 16px;" onclick="GarbaApp.resetCatalogFilters()">Reset Filters</button>'
          + '    <button class="btn btn-primary" style="width:auto; padding:8px 18px;" onclick="GarbaApp.openHostEventModal()">➕ Host College Event</button>'
          + '  </div>'
          + '</div>';
        return;
      }

      var html = '';
      filtered.forEach(function(evt) {
        var bannerThemeClass = '';
        if (evt.themeColor === '#0284c7') bannerThemeClass = 'event-banner-tech';
        else if (evt.themeColor === '#10b981') bannerThemeClass = 'event-banner-sports';
        else if (evt.themeColor === '#e11d48') bannerThemeClass = 'event-banner-ruby';
        else if (evt.themeColor === '#8b5cf6') bannerThemeClass = 'event-banner-violet';
        else bannerThemeClass = 'event-banner-amber';

        var feeText = (evt.ticketType === 'PAID' && evt.feeAmount > 0) ? ('₹' + evt.feeAmount + ' Entry Pass') : 'Free Entry Pass';
        var isLive = evt.status !== 'UPCOMING';
        var statusBadge = isLive 
          ? '<span class="event-status-tag">🟢 Registration Live</span>'
          : '<span class="event-status-tag upcoming">⏳ Upcoming</span>';

        var categoryLabel = evt.category || 'EVENT';
        if (categoryLabel === 'CULTURAL') categoryLabel = 'Cultural Fest';
        else if (categoryLabel === 'TECH') categoryLabel = 'Hackathon / Tech';
        else if (categoryLabel === 'SPORTS') categoryLabel = 'Sports Fest';
        else if (categoryLabel === 'MUSIC') categoryLabel = 'Music & Concert';
        else if (categoryLabel === 'ACADEMIC') categoryLabel = 'Workshop';

        html += ''
          + '<div class="event-item-card" data-category="' + (evt.category || 'GENERAL') + '" onclick="GarbaApp.selectEvent(\'' + evt.id + '\')">'
          + '  <div class="event-card-banner ' + bannerThemeClass + '">'
          + '    ' + statusBadge
          + '    <span class="event-category-pill">' + categoryLabel + '</span>'
          + '    <div class="event-banner-icon">' + (evt.collegeLogo || '🎟️') + '</div>'
          + '    <span class="event-college-tag">🏛️ ' + (evt.collegeName || 'College Campus') + '</span>'
          + '  </div>'
          + '  <div class="event-card-body">'
          + '    <h3 class="event-card-title">' + evt.title + '</h3>'
          + '    <div class="event-card-meta">'
          + '      <div class="event-meta-line"><span>📅</span> <strong>' + evt.date + '</strong> • <span>' + (evt.time || '') + '</span></div>'
          + '      <div class="event-meta-line"><span>📍</span> <span>' + evt.venue + '</span></div>'
          + '      <div class="event-meta-line"><span>🌐</span> <span>' + (evt.eligibility || 'College Students & Staff') + '</span></div>'
          + '    </div>'
          + '    <p class="event-card-desc">' + (evt.description || evt.tagline || '') + '</p>'
          + '    <div class="event-card-footer">'
          + '      <span class="event-pass-fee">' + feeText + '</span>'
          + '      <span class="event-card-cta-btn">Book Tickets →</span>'
          + '    </div>'
          + '  </div>'
          + '</div>';
      });

      grid.innerHTML = html;
    },

    renderCollegeFilters: function() {
      var container = document.getElementById('collegeFilterContainer');
      if (!container) return;

      var collegeMap = {};
      this.events.forEach(function(e) {
        var cName = e.collegeName || 'Other College';
        if (!collegeMap[cName]) {
          collegeMap[cName] = { name: cName, count: 0, badge: e.collegeBadge || ('🏛️ ' + cName) };
        }
        collegeMap[cName].count++;
      });

      var activeCollege = this.selectedCollegeFilter;
      var html = '<button class="college-filter-chip ' + (activeCollege === 'ALL' ? 'active' : '') + '" onclick="GarbaApp.filterByCollege(\'ALL\', this)">🏛️ All Colleges (' + this.events.length + ')</button>';

      Object.keys(collegeMap).forEach(function(cKey) {
        var cData = collegeMap[cKey];
        var isActive = (activeCollege.toLowerCase() === cData.name.toLowerCase());
        html += '<button class="college-filter-chip ' + (isActive ? 'active' : '') + '" onclick="GarbaApp.filterByCollege(\'' + cData.name.replace(/'/g, "\\'") + '\', this)">' + cData.badge + ' (' + cData.count + ')</button>';
      });

      container.innerHTML = html;

      var counterEl = document.getElementById('activeCollegeCounter');
      if (counterEl) {
        counterEl.innerText = activeCollege === 'ALL' ? 'Showing all colleges' : ('Filtered by: ' + activeCollege);
      }
    },

    filterByCollege: function(collegeName, btnEl) {
      this.selectedCollegeFilter = collegeName;
      var chips = document.querySelectorAll('.college-filter-chip');
      chips.forEach(function(c) { c.classList.remove('active'); });
      if (btnEl) btnEl.classList.add('active');

      var counterEl = document.getElementById('activeCollegeCounter');
      if (counterEl) {
        counterEl.innerText = collegeName === 'ALL' ? 'Showing all colleges' : ('Filtered by: ' + collegeName);
      }

      this.renderEventsCatalog();
    },

    filterEventsCategory: function(category, btnEl) {
      this.selectedCategoryFilter = category;
      var chips = document.querySelectorAll('.events-filter-bar .event-filter-chip');
      chips.forEach(function(c) { c.classList.remove('active'); });
      if (btnEl) btnEl.classList.add('active');

      this.renderEventsCatalog();
    },

    onEventSearchInput: function(val) {
      this.searchQuery = val || '';
      var clearBtn = document.getElementById('eventSearchClearBtn');
      if (clearBtn) {
        clearBtn.style.display = this.searchQuery ? 'flex' : 'none';
      }
      this.renderEventsCatalog();
    },

    clearEventSearch: function() {
      var input = document.getElementById('eventSearchInput');
      if (input) input.value = '';
      this.searchQuery = '';
      var clearBtn = document.getElementById('eventSearchClearBtn');
      if (clearBtn) clearBtn.style.display = 'none';
      this.renderEventsCatalog();
    },

    resetCatalogFilters: function() {
      this.selectedCollegeFilter = 'ALL';
      this.selectedCategoryFilter = 'ALL';
      this.searchQuery = '';
      var searchInput = document.getElementById('eventSearchInput');
      if (searchInput) searchInput.value = '';
      var clearBtn = document.getElementById('eventSearchClearBtn');
      if (clearBtn) clearBtn.style.display = 'none';

      var chips = document.querySelectorAll('.events-filter-bar .event-filter-chip');
      chips.forEach(function(c, idx) {
        if (idx === 0) c.classList.add('active');
        else c.classList.remove('active');
      });

      this.renderCollegeFilters();
      this.renderEventsCatalog();
    },

    scrollToEventsCatalog: function() {
      var section = document.getElementById('eventsCatalogSection');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    },

    selectEvent: function(eventId) {
      var evt = this.events.find(function(e) { return e.id === eventId; });
      if (!evt) return;

      this.currentEventId = evt.id;
      this.settings.eventName = evt.title;
      this.settings.eventDate = evt.date;
      this.settings.venue = evt.venue;
      if (typeof evt.feeAmount === 'number') {
        this.settings.ticketFee = evt.feeAmount;
      }

      this.renderEventDetailsView(evt);
      this.navigateTo('event');
    },

    renderEventDetailsView: function(evt) {
      if (!evt) return;

      // Update Back Bar Category Badge
      var catBadge = document.getElementById('eventCategoryPillDisplay');
      if (catBadge) {
        catBadge.innerText = (evt.category || 'CAMPUS EVENT') + ' CELEBRATION';
      }

      // Update Host College Banner
      var collegeNameEl = document.getElementById('eventHostCollegeName');
      if (collegeNameEl) {
        collegeNameEl.innerText = '🏛️ ' + evt.collegeName;
      }
      var clubEl = document.getElementById('eventHostClubName');
      if (clubEl) {
        clubEl.innerText = evt.hostClub || 'Campus Committee';
      }

      // Update Poster Artwork
      var posterIcon = document.getElementById('eventDetailPosterIcon');
      if (posterIcon) posterIcon.innerText = evt.collegeLogo || '🎟️';

      var posterTitle = document.getElementById('eventDetailPosterTitle');
      if (posterTitle) posterTitle.innerText = evt.title.toUpperCase();

      var posterSub = document.getElementById('eventDetailPosterSub');
      if (posterSub) posterSub.innerText = evt.collegeName.toUpperCase();

      var posterDate = document.getElementById('eventDetailPosterDate');
      if (posterDate) posterDate.innerText = evt.date + ' • ' + (evt.time ? evt.time.split('–')[0].trim() : 'CAMPUS');

      var posterCard = document.getElementById('eventPosterCard');
      if (posterCard) {
        if (evt.themeColor === '#0284c7') posterCard.style.background = 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0369a1 100%)';
        else if (evt.themeColor === '#10b981') posterCard.style.background = 'linear-gradient(135deg, #064e3b 0%, #065f46 50%, #047857 100%)';
        else if (evt.themeColor === '#e11d48') posterCard.style.background = 'linear-gradient(135deg, #4c0519 0%, #881337 50%, #be123c 100%)';
        else if (evt.themeColor === '#8b5cf6') posterCard.style.background = 'linear-gradient(135deg, #2e1065 0%, #4c1d95 50%, #6d28d9 100%)';
        else posterCard.style.background = 'linear-gradient(135deg, #1e1136 0%, #4c0519 50%, #b45309 100%)';
      }

      // Update Title & Desc
      var titleEl = document.getElementById('eventDetailTitle');
      if (titleEl) titleEl.innerText = evt.title;

      var descEl = document.getElementById('eventDetailDesc');
      if (descEl) descEl.innerText = evt.description || evt.tagline || '';

      var ratingEl = document.getElementById('eventDetailRating');
      if (ratingEl) ratingEl.innerText = evt.rating || '4.9 / 5';

      var interestedEl = document.getElementById('eventDetailInterested');
      if (interestedEl) interestedEl.innerText = '(' + (evt.interestedCount || '1,000+ Interested') + ')';

      // Update Tags
      var tagsContainer = document.getElementById('eventDetailTags');
      if (tagsContainer) {
        var tagsHtml = '';
        (evt.tags || ['Verified Pass', 'College Event']).forEach(function(tag, i) {
          tagsHtml += '<span class="bms-tag-pill ' + (i === 0 ? 'festive-highlight' : '') + '">' + tag + '</span>';
        });
        tagsHtml += '<span class="bms-tag-pill" style="border-color:#10b981; color:#6ee7b7; font-weight:700;">✉️ Any Gmail Accepted</span>';
        tagsContainer.innerHTML = tagsHtml;
      }

      // Schedule Grid
      var dateEl = document.getElementById('eventDetailDate');
      if (dateEl) dateEl.innerText = evt.date;

      var timeEl = document.getElementById('eventDetailTime');
      if (timeEl) timeEl.innerText = evt.time || 'Schedule announced soon';

      var venueEl = document.getElementById('eventDetailVenue');
      if (venueEl) venueEl.innerText = evt.venue;

      var feeEl = document.getElementById('eventDetailFee');
      if (feeEl) {
        feeEl.innerText = (evt.ticketType === 'PAID' && evt.feeAmount > 0) ? ('₹' + evt.feeAmount + ' Entry Pass') : 'Free Entry Pass';
      }

      // Update Notice Text
      var noticeText = document.getElementById('eventDetailNoticeText');
      if (noticeText) {
        noticeText.innerHTML = '<strong>NO ' + evt.collegeName.toUpperCase() + ' EMAIL REQUIRED:</strong> You can use <strong>any personal Gmail</strong> or custom email to book and receive your digital ticket pass! Original student/staff ID from your enrolled college is verified at the host campus gate.';
      }

      // Update CTA labels
      var ctaStudent = document.getElementById('ctaStudentBtnText');
      if (ctaStudent) {
        ctaStudent.innerText = (evt.ticketType === 'PAID' && evt.feeAmount > 0) ? ('BOOK STUDENT PASS (₹' + evt.feeAmount + ')') : 'BOOK STUDENT PASS (FREE)';
      }
      var cardFeeLabel = document.getElementById('studentCardFeeLabel');
      if (cardFeeLabel) {
        cardFeeLabel.innerText = (evt.ticketType === 'PAID' && evt.feeAmount > 0) ? ('Book Student Pass (₹' + evt.feeAmount + ')') : 'Book Student Pass (Free)';
      }

      // Update Registration View Headers
      var stuTitle = document.getElementById('studentEventTitleText');
      if (stuTitle) stuTitle.innerText = evt.title;
      var stuCollege = document.getElementById('studentEventCollegeText');
      if (stuCollege) stuCollege.innerHTML = '<span>🏛️</span> Host Campus: ' + evt.collegeName;

      var tchTitle = document.getElementById('teacherEventTitleText');
      if (tchTitle) tchTitle.innerText = evt.title;
      var tchCollege = document.getElementById('teacherEventCollegeText');
      if (tchCollege) tchCollege.innerHTML = '<span>🏛️</span> Host Campus: ' + evt.collegeName;

      // Prefill College Name fields with Host College as default
      var stuCollegeInput = document.getElementById('studentCollegeName');
      if (stuCollegeInput && (!stuCollegeInput.value || stuCollegeInput.value === 'National Institute of Technology')) {
        stuCollegeInput.value = evt.collegeName;
      }
      var tchCollegeInput = document.getElementById('teacherCollegeName');
      if (tchCollegeInput && (!tchCollegeInput.value || tchCollegeInput.value === 'National Institute of Technology')) {
        tchCollegeInput.value = evt.collegeName;
      }
    },

    // =========================================================================
    // HOST COLLEGE EVENT MODAL & FORM CONTROLLER
    // =========================================================================
    openHostEventModal: function() {
      var modal = document.getElementById('hostEventModal');
      if (modal) modal.classList.add('active');
    },

    closeHostEventModal: function() {
      var modal = document.getElementById('hostEventModal');
      if (modal) modal.classList.remove('active');
    },

    toggleHostFeeFields: function(feeType) {
      var row = document.getElementById('hostFeeFieldsRow');
      if (row) {
        row.style.display = (feeType === 'PAID') ? 'block' : 'none';
      }
    },

    prefillHostForm: function(type) {
      var form = document.getElementById('hostEventForm');
      if (!form) return;

      if (type === 'TECH') {
        form.collegeName.value = 'IIT Delhi';
        form.collegeCode.value = 'IITD';
        form.hostClub.value = 'DevClub & IEEE Chapter';
        form.title.value = 'HackMatrix 2026: AI & Agents Hackathon';
        form.tagline.value = '24-Hour National Buildathon for Scalable AI & Autonomous Systems';
        form.category.value = 'TECH';
        form.themeColor.value = '#0284c7';
        form.date.value = '28 November 2026';
        form.time.value = '9:00 AM – 24 Hours';
        form.venue.value = 'Bharti Building & Main Computer Center, IITD';
        form.eligibility.value = 'Open to All College & University Students';
        form.feeType.value = 'FREE';
        this.toggleHostFeeFields('FREE');
        form.description.value = 'Join 500+ student developers for a 24-hour hackathon tackling next-gen AI, intelligent autonomous agents, cloud infrastructure, and Web3 tools. ₹1,00,000 cash prize pool with company hiring interviews.';
        form.tags.value = '₹1,00,000 Prizes, Free Meals, Dev Swags, AI Mentors';
        form.hostEmail.value = 'devclub@iitd.ac.in';
      } else if (type === 'CULTURAL') {
        form.collegeName.value = 'St. Xavier\'s College';
        form.collegeCode.value = 'SXC';
        form.hostClub.value = 'Fine Arts & Cultural Council';
        form.title.value = 'Malhar Traditional Dandiya & Folk Night';
        form.tagline.value = 'Celebrating Indian Heritage with Live Dhol, Folk Dance & Traditional Attire';
        form.category.value = 'CULTURAL';
        form.themeColor.value = '#f59e0b';
        form.date.value = '24 October 2026';
        form.time.value = '6:30 PM – 11:30 PM';
        form.venue.value = 'College Quadrangle & Main Lawn';
        form.eligibility.value = 'Enrolled Host College Students & Faculty Only';
        form.feeType.value = 'FREE';
        this.toggleHostFeeFields('FREE');
        form.description.value = 'Annual festive evening of traditional Garba and Dandiya Raas with renowned folk singers, vibrant lighting, DJ beats, and food stalls. Traditional dress code mandatory.';
        form.tags.value = 'Live Dhol, Dandiya Sticks, Food Stalls, Traditional Attire';
        form.hostEmail.value = 'malhar@xaviers.edu';
      } else if (type === 'MUSIC') {
        form.collegeName.value = 'SRM Institute of Science & Technology';
        form.collegeCode.value = 'SRM';
        form.hostClub.value = 'Music Society & Event Council';
        form.title.value = 'Milan Pro-Night: Rock & EDM Blast 2026';
        form.tagline.value = '3 Days of High Voltage Electronic Music & Battle of the Bands';
        form.category.value = 'MUSIC';
        form.themeColor.value = '#e11d48';
        form.date.value = '15 December 2026';
        form.time.value = '5:30 PM – Midnight';
        form.venue.value = 'SRM Main Stadium & Amphitheatre';
        form.eligibility.value = 'Open to All College & University Students';
        form.feeType.value = 'PAID';
        this.toggleHostFeeFields('PAID');
        if (form.feeAmount) form.feeAmount.value = '250';
        if (form.upiId) form.upiId.value = 'srmmilan@oksbi';
        form.description.value = 'Massive musical extravaganza featuring leading indie rock headliners and international EDM DJs. Laser shows, neon pyrotechnics, and food truck alley.';
        form.tags.value = 'Top Headliners, Neon Laser Show, Battle of Bands, Food Trucks';
        form.hostEmail.value = 'milan@srmist.edu.in';
      } else if (type === 'SPORTS') {
        form.collegeName.value = 'National Institute of Technology (NIT)';
        form.collegeCode.value = 'NIT';
        form.hostClub.value = 'Sports & Athletics Association';
        form.title.value = 'All-India Inter-NIT Sports Meet 2026';
        form.tagline.value = 'Showcasing Athletic Excellence, Speed & Team Spirit';
        form.category.value = 'SPORTS';
        form.themeColor.value = '#10b981';
        form.date.value = '10-13 January 2027';
        form.time.value = '7:00 AM – 7:00 PM';
        form.venue.value = 'Olympic Track & Sports Pavilion, NIT Campus';
        form.eligibility.value = 'Open to All College & University Students';
        form.feeType.value = 'FREE';
        this.toggleHostFeeFields('FREE');
        form.description.value = 'Four days of intense athletic and field competitions: track 100m-1500m, football tournament, basketball league, volleyball, table tennis, and badminton.';
        form.tags.value = 'Athletics, Medals & Cups, Live Stream, Inter-College';
        form.hostEmail.value = 'sports@nit.ac.in';
      } else if (type === 'ACADEMIC') {
        form.collegeName.value = 'Vellore Institute of Technology (VIT)';
        form.collegeCode.value = 'VIT';
        form.hostClub.value = 'Robotics & Automation Society';
        form.title.value = 'RoboSphere: Autonomous Robotics & AI Summit';
        form.tagline.value = 'Hands-on Building, Drone Obstacle Courses & AI Demos';
        form.category.value = 'ACADEMIC';
        form.themeColor.value = '#8b5cf6';
        form.date.value = '8 December 2026';
        form.time.value = '10:00 AM – 5:00 PM';
        form.venue.value = 'Technology Tower Auditorium & Mechatronics Lab';
        form.eligibility.value = 'Open to All College & University Students';
        form.feeType.value = 'FREE';
        this.toggleHostFeeFields('FREE');
        form.description.value = 'Comprehensive 1-day summit with keynote lectures from robotics researchers, live bot combat arena, drone piloting showcase, and AI computer vision masterclass.';
        form.tags.value = 'Robo Wars, Drone Arena, AI Masterclass, Certificates';
        form.hostEmail.value = 'robosphere@vit.ac.in';
      }
      this.showToast('Template auto-filled! You can adjust details and click Publish.');
    },

    handleHostEventSubmit: function(e) {
      e.preventDefault();
      var form = e.target;

      var collegeName = (form.collegeName.value || '').trim();
      var collegeCode = (form.collegeCode.value || '').trim().toUpperCase();
      var hostClub = (form.hostClub.value || '').trim();
      var title = (form.title.value || '').trim();
      var tagline = (form.tagline.value || '').trim();
      var category = form.category.value || 'CULTURAL';
      var themeColor = form.themeColor.value || '#f59e0b';
      var date = (form.date.value || '').trim();
      var time = (form.time.value || '').trim();
      var venue = (form.venue.value || '').trim();
      var eligibility = form.eligibility.value;
      var feeType = form.feeType.value;
      var feeAmount = (feeType === 'PAID') ? (parseInt(form.feeAmount.value, 10) || 150) : 0;
      var upiId = (feeType === 'PAID') ? (form.upiId.value || 'event@oksbi') : '';
      var description = (form.description.value || '').trim();
      var tagsRaw = (form.tags.value || '').trim();
      var hostEmail = (form.hostEmail.value || '').trim();

      if (!collegeName || !collegeCode || !title || !date || !venue) {
        this.showToast('Please fill all mandatory event fields.');
        return;
      }

      var tags = tagsRaw ? tagsRaw.split(',').map(function(t) { return t.trim(); }).filter(Boolean) : ['College Event', 'Pass Booking'];

      // Assign logo icon based on category
      var logo = '🎪';
      if (category === 'CULTURAL') logo = '🪔';
      else if (category === 'TECH') logo = '💻';
      else if (category === 'SPORTS') logo = '🏆';
      else if (category === 'MUSIC') logo = '🎸';
      else if (category === 'ACADEMIC') logo = '🔬';

      var eventId = 'evt-' + collegeCode.toLowerCase() + '-' + Date.now().toString(36);

      var newEvent = {
        id: eventId,
        collegeId: collegeCode.toLowerCase(),
        collegeName: collegeName,
        collegeBadge: logo + ' ' + (collegeCode || collegeName),
        collegeLogo: logo,
        codePrefix: collegeCode.substring(0, 4),
        title: title,
        tagline: tagline,
        category: category,
        date: date,
        time: time,
        venue: venue,
        eligibility: eligibility,
        ticketType: feeType,
        feeAmount: feeAmount,
        upiId: upiId,
        description: description,
        tags: tags,
        rating: '5.0 / 5',
        interestedCount: 'Newly Hosted Event',
        themeColor: themeColor,
        status: 'LIVE',
        hostClub: hostClub,
        hostEmail: hostEmail
      };

      this.events.unshift(newEvent);
      this.saveEvents();

      // Refresh UI components
      this.renderCollegeFilters();
      this.renderEventsCatalog();
      this.renderAdminEventSelector();
      this.renderScannerEventSelector();

      this.closeHostEventModal();
      form.reset();

      this.showToast('🎉 Event "' + title + '" published by ' + collegeName + '! Now live for booking.');
      this.selectEvent(newEvent.id);
    },

    renderAdminEventSelector: function() {
      var select = document.getElementById('adminEventFilterSelect');
      if (!select) return;

      var current = this.adminTargetEvent || 'ALL';
      var html = '<option value="ALL">🌐 All Hosted Events & Colleges (' + this.events.length + ')</option>';

      this.events.forEach(function(evt) {
        var isSelected = (evt.id === current) ? 'selected' : '';
        html += '<option value="' + evt.id + '" ' + isSelected + '>' + evt.title + ' (' + evt.collegeName + ')</option>';
      });

      select.innerHTML = html;
    },

    onAdminEventFilterChange: function(eventId) {
      this.adminTargetEvent = eventId;
      this.refreshDashboard();
      this.renderAdminTable();
      this.showToast(eventId === 'ALL' ? 'Admin dashboard showing all hosted events.' : 'Dashboard filtered to: ' + eventId);
    },

    renderScannerEventSelector: function() {
      var select = document.getElementById('scannerEventFilterSelect');
      if (!select) return;

      var current = this.scannerTargetEvent || 'ALL';
      var html = '<option value="ALL">🔍 All Hosted Events & Colleges</option>';

      this.events.forEach(function(evt) {
        var isSelected = (evt.id === current) ? 'selected' : '';
        html += '<option value="' + evt.id + '" ' + isSelected + '>' + evt.title + ' (' + evt.collegeName + ')</option>';
      });

      select.innerHTML = html;
    },

    onScannerEventFilterChange: function(eventId) {
      this.scannerTargetEvent = eventId;
      this.showToast(eventId === 'ALL' ? 'Scanner configured for all events.' : 'Scanner locked to: ' + eventId);
    },

    generateUniqueTicketId: function(prefix, existingList) {
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
        exists = (existingList || []).some(function(item) {
          return item.ticketId === ticketId;
        });
      }
      return ticketId;
    },

    // =========================================================================
    // DROPDOWNS & EVENT RENDERING
    // =========================================================================
    renderSettingsDropdowns: function() {
      // Departments for student form
      var studentDeptSelect = document.getElementById('studentDepartment');
      if (studentDeptSelect) {
        var current = studentDeptSelect.value;
        studentDeptSelect.innerHTML = '<option value="">-- Select Department --</option>';
        this.settings.departments.forEach(function(dept) {
          var opt = document.createElement('option');
          opt.value = dept;
          opt.textContent = dept;
          if (dept === current) opt.selected = true;
          studentDeptSelect.appendChild(opt);
        });
      }

      // Departments for teacher form
      var teacherDeptSelect = document.getElementById('teacherDepartment');
      if (teacherDeptSelect) {
        var currentT = teacherDeptSelect.value;
        teacherDeptSelect.innerHTML = '<option value="">-- Select Department --</option>';
        this.settings.departments.forEach(function(dept) {
          var opt = document.createElement('option');
          opt.value = dept;
          opt.textContent = dept;
          if (dept === currentT) opt.selected = true;
          teacherDeptSelect.appendChild(opt);
        });
      }

      // Years for student form
      var yearSelect = document.getElementById('studentYear');
      if (yearSelect) {
        var currentY = yearSelect.value;
        yearSelect.innerHTML = '<option value="">-- Select Year --</option>';
        this.settings.years.forEach(function(yr) {
          var opt = document.createElement('option');
          opt.value = yr;
          opt.textContent = yr;
          if (yr === currentY) opt.selected = true;
          yearSelect.appendChild(opt);
        });
      }

      // Sections for student form
      var secSelect = document.getElementById('studentSection');
      if (secSelect) {
        var currentS = secSelect.value;
        secSelect.innerHTML = '<option value="">-- Select Section --</option>';
        this.settings.sections.forEach(function(sec) {
          var opt = document.createElement('option');
          opt.value = sec;
          opt.textContent = sec;
          if (sec === currentS) opt.selected = true;
          secSelect.appendChild(opt);
        });
      }

      // Update text in Hero & passes
      var eventTitles = document.querySelectorAll('.dynamic-event-name');
      var eventDates = document.querySelectorAll('.dynamic-event-date');
      var eventVenues = document.querySelectorAll('.dynamic-event-venue');

      var name = this.settings.eventName;
      var date = this.settings.eventDate;
      var venue = this.settings.venue;

      eventTitles.forEach(function(el) { el.innerText = name; });
      eventDates.forEach(function(el) { el.innerText = date; });
      eventVenues.forEach(function(el) { el.innerText = venue; });

      // Settings inputs in admin
      var sName = document.getElementById('settingEventName');
      if (sName) sName.value = this.settings.eventName;
      var sDate = document.getElementById('settingEventDate');
      if (sDate) sDate.value = this.settings.eventDate;
      var sVenue = document.getElementById('settingVenue');
      if (sVenue) sVenue.value = this.settings.venue;
      var sGas = document.getElementById('settingGasUrl');
      if (sGas) sGas.value = this.settings.gasWebAppUrl || '';
      var sFee = document.getElementById('settingTicketFee');
      if (sFee) sFee.value = this.settings.ticketFee || 150;
      var sUpi = document.getElementById('settingUpiId');
      if (sUpi) sUpi.value = this.settings.upiId || 'garba2026@oksbi';
      var tReqPay = document.getElementById('toggleRequirePayment');
      if (tReqPay) tReqPay.checked = this.settings.requirePaymentVerification !== false;
      var sDepts = document.getElementById('settingDepartments');
      if (sDepts) sDepts.value = this.settings.departments.join(', ');
      var sSecs = document.getElementById('settingSections');
      if (sSecs) sSecs.value = this.settings.sections.join(', ');

      var tMaster = document.getElementById('toggleMasterReg');
      if (tMaster) tMaster.checked = this.settings.registrationOpen;
      var tStudent = document.getElementById('toggleStudentReg');
      if (tStudent) tStudent.checked = this.settings.studentRegistrationOpen;
      var tTeacher = document.getElementById('toggleTeacherReg');
      if (tTeacher) tTeacher.checked = this.settings.teacherRegistrationOpen;
    },

    // =========================================================================
    // STUDENT REGISTRATION (FOR ANY HOSTED COLLEGE EVENT)
    // =========================================================================
    handleStudentSubmit: async function(e) {
      e.preventDefault();
      var form = e.target;
      var alertBox = document.getElementById('studentFormAlert');
      alertBox.style.display = 'none';

      var submitBtn = document.getElementById('studentSubmitBtn');
      var btnText = submitBtn.querySelector('.btn-text');
      var btnSpinner = submitBtn.querySelector('.spinner-inline');

      var currentEvent = this.getCurrentEvent();
      var eventTitle = currentEvent ? currentEvent.title : this.settings.eventName;
      var hostCollege = currentEvent ? currentEvent.collegeName : 'Host College';

      var name = form.name.value.trim();
      var collegeName = (form.collegeName && form.collegeName.value.trim()) ? form.collegeName.value.trim() : hostCollege;
      var rollNumber = form.rollNumber.value.trim().toUpperCase();
      var department = form.department.value.trim();
      var year = form.year.value.trim();
      var section = form.section.value.trim();
      var email = form.email.value.trim().toLowerCase();

      if (!name || !rollNumber || !department || !year || !section || !email) {
        this.showAlert(alertBox, 'alert-danger', 'All fields are required. Please fill every field.');
        return;
      }

      // Check Master Registration toggle
      if (!this.settings.registrationOpen || !this.settings.studentRegistrationOpen) {
        this.showAlert(alertBox, 'alert-danger', 'REGISTRATION CLOSED: Student registration is currently closed.');
        return;
      }

      // UI Loading state
      submitBtn.disabled = true;
      btnSpinner.style.display = 'inline-block';
      btnText.innerText = 'Validating Roll Number...';

      try {
        var result;
        if (this.settings.gasWebAppUrl) {
          result = await this.callGasBackend({
            action: 'registerStudent',
            eventId: currentEvent ? currentEvent.id : 'nit-cult-2026',
            eventName: eventTitle,
            hostingCollege: hostCollege,
            collegeName: collegeName,
            name: name,
            rollNumber: rollNumber,
            department: department,
            year: year,
            section: section,
            email: email
          });
        } else {
          await new Promise(function(resolve) { setTimeout(resolve, 350); });
          result = this.localRegisterStudent({
            eventId: currentEvent ? currentEvent.id : 'nit-cult-2026',
            eventName: eventTitle,
            hostingCollege: hostCollege,
            collegeName: collegeName,
            name: name,
            rollNumber: rollNumber,
            department: department,
            year: year,
            section: section,
            email: email
          });
        }

        if (result.success) {
          form.reset();
          this.currentTicket = result.ticket;
          var isPaidPass = (result.ticket.feeAmount > 0 && result.ticket.status === 'PAYMENT_PENDING');

          if (isPaidPass) {
            this.openPaymentViewForTicket(result.ticket);
            this.showToast('📋 Registration saved! Please submit pass fee payment.');
          } else {
            this.dispatchTicketEmail(result.ticket);
            this.renderDigitalTicket(result.ticket);
            this.showToast('🎉 Booking Confirmed! Digital Entry Pass generated & emailed.');
            window.location.hash = 'ticket';
          }
        } else {
          if (result.isDuplicate) {
            this.showAlert(alertBox, 'alert-danger',
              '<div style="width:100%;">' +
              '  <div style="font-weight:800; font-size:1.05rem; margin-bottom:4px; color:#f87171;">🚫 REGISTRATION BLOCKED: DUPLICATE ROLL NUMBER</div>' +
              '  <div>Roll Number <strong>' + rollNumber + '</strong> is already registered for <strong>' + eventTitle + '</strong> with Entry Pass <strong>' + (result.existingTicketId || 'Active') + '</strong>.</div>' +
              '  <div style="font-size:0.8rem; color:#fecdd3; margin-top:6px; line-height:1.4;"><strong>Anti-Proxy Notice:</strong> To ensure only genuine college students attend and to prevent proxy bookings, each Roll Number can only claim ONE ticket per event.</div>' +
              '  <div style="margin-top:10px;"><button type="button" class="btn btn-secondary" style="padding:6px 14px; font-size:0.8rem; width:auto;" onclick="GarbaApp.searchPassByQuery(\'' + rollNumber + '\')">🔍 Retrieve My Existing Pass for ' + rollNumber + '</button></div>' +
              '</div>'
            );
          } else {
            this.showAlert(alertBox, 'alert-danger', result.message || 'Registration failed.');
          }
        }
      } catch (err) {
        console.error(err);
        this.showAlert(alertBox, 'alert-danger', 'Connection error: ' + err.message);
      } finally {
        submitBtn.disabled = false;
        btnSpinner.style.display = 'none';
        btnText.innerText = 'Book Student Entry Pass';
      }
    },

    localRegisterStudent: function(data) {
      var currentEvent = this.getCurrentEvent();
      var eventId = data.eventId || (currentEvent ? currentEvent.id : 'nit-cult-2026');
      var codePrefix = (currentEvent && currentEvent.codePrefix) ? currentEvent.codePrefix : 'NIT';
      var prefix = 'STU-' + codePrefix + '-';

      // Duplicate check: Roll Number must be unique FOR THIS SPECIFIC EVENT
      for (var i = 0; i < this.students.length; i++) {
        var s = this.students[i];
        var sEventId = s.eventId || 'nit-cult-2026';
        if (sEventId === eventId && s.rollNumber.toUpperCase() === data.rollNumber.toUpperCase()) {
          return {
            success: false,
            isDuplicate: true,
            message: 'Roll number already exists for this event.',
            existingTicketId: s.ticketId
          };
        }
      }

      var ticketId = this.generateUniqueTicketId(prefix, this.students);
      var now = new Date();
      var timeFormatted = now.toISOString().replace('T', ' ').substring(0, 19);

      var eventFee = (currentEvent && typeof currentEvent.feeAmount === 'number') ? currentEvent.feeAmount : 0;
      var isPaidEvent = (currentEvent && currentEvent.ticketType === 'PAID' && eventFee > 0);
      var requiresPayment = isPaidEvent && (this.settings.requirePaymentVerification !== false);

      var newRecord = {
        category: 'STUDENT',
        registrationTime: timeFormatted,
        eventId: eventId,
        eventName: data.eventName || (currentEvent ? currentEvent.title : this.settings.eventName),
        hostingCollege: data.hostingCollege || (currentEvent ? currentEvent.collegeName : 'Host College'),
        collegeName: data.collegeName || (currentEvent ? currentEvent.collegeName : 'Host College'),
        name: data.name,
        rollNumber: data.rollNumber,
        department: data.department,
        year: data.year,
        section: data.section,
        email: data.email,
        ticketId: ticketId,
        status: requiresPayment ? 'PAYMENT_PENDING' : 'UNUSED',
        paymentStatus: requiresPayment ? 'AWAITING_PAYMENT' : 'PAID',
        feeAmount: eventFee,
        utrNumber: '',
        ticketCreated: timeFormatted,
        checkinTime: ''
      };

      this.students.push(newRecord);
      this.saveStudents();

      return {
        success: true,
        ticket: newRecord
      };
    },

    // =========================================================================
    // TEACHER / STAFF REGISTRATION (FOR ANY HOSTED COLLEGE EVENT)
    // =========================================================================
    handleTeacherSubmit: async function(e) {
      e.preventDefault();
      var form = e.target;
      var alertBox = document.getElementById('teacherFormAlert');
      alertBox.style.display = 'none';

      var submitBtn = document.getElementById('teacherSubmitBtn');
      var btnText = submitBtn.querySelector('.btn-text');
      var btnSpinner = submitBtn.querySelector('.spinner-inline');

      var currentEvent = this.getCurrentEvent();
      var eventTitle = currentEvent ? currentEvent.title : this.settings.eventName;
      var hostCollege = currentEvent ? currentEvent.collegeName : 'Host College';

      var name = form.name.value.trim();
      var collegeName = (form.collegeName && form.collegeName.value.trim()) ? form.collegeName.value.trim() : hostCollege;
      var staffId = form.staffId.value.trim().toUpperCase();
      var department = form.department.value.trim();
      var designation = form.designation.value.trim();
      var email = form.email.value.trim().toLowerCase();
      var mobile = form.mobile ? form.mobile.value.trim() : '';

      if (!name || !staffId || !department || !designation || !email) {
        this.showAlert(alertBox, 'alert-danger', 'Name, Staff ID, Department, Designation, and Email are mandatory.');
        return;
      }

      // Check Master Registration toggle
      if (!this.settings.registrationOpen || !this.settings.teacherRegistrationOpen) {
        this.showAlert(alertBox, 'alert-danger', 'REGISTRATION CLOSED: Teacher / Staff registration is currently closed.');
        return;
      }

      // UI Loading state
      submitBtn.disabled = true;
      btnSpinner.style.display = 'inline-block';
      btnText.innerText = 'Validating Staff ID...';

      try {
        var result;
        if (this.settings.gasWebAppUrl) {
          result = await this.callGasBackend({
            action: 'registerTeacher',
            eventId: currentEvent ? currentEvent.id : 'nit-cult-2026',
            eventName: eventTitle,
            hostingCollege: hostCollege,
            collegeName: collegeName,
            name: name,
            staffId: staffId,
            department: department,
            designation: designation,
            email: email,
            mobile: mobile
          });
        } else {
          await new Promise(function(resolve) { setTimeout(resolve, 350); });
          result = this.localRegisterTeacher({
            eventId: currentEvent ? currentEvent.id : 'nit-cult-2026',
            eventName: eventTitle,
            hostingCollege: hostCollege,
            collegeName: collegeName,
            name: name,
            staffId: staffId,
            department: department,
            designation: designation,
            email: email,
            mobile: mobile
          });
        }

        if (result.success) {
          form.reset();
          this.currentTicket = result.ticket;
          var isPaidPass = (result.ticket.feeAmount > 0 && result.ticket.status === 'PAYMENT_PENDING');

          if (isPaidPass) {
            this.openPaymentViewForTicket(result.ticket);
            this.showToast('📋 Faculty registration saved! Please submit pass fee payment.');
          } else {
            this.dispatchTicketEmail(result.ticket);
            this.renderDigitalTicket(result.ticket);
            this.showToast('🎉 Booking Confirmed! Faculty VIP Pass generated & emailed.');
            window.location.hash = 'ticket';
          }
        } else {
          if (result.isDuplicate) {
            this.showAlert(alertBox, 'alert-danger',
              '<div style="width:100%;">' +
              '  <div style="font-weight:800; font-size:1.05rem; margin-bottom:4px; color:#f87171;">🚫 REGISTRATION BLOCKED: DUPLICATE STAFF ID</div>' +
              '  <div>Staff ID <strong>' + staffId + '</strong> is already registered for <strong>' + eventTitle + '</strong> with Entry Pass <strong>' + (result.existingTicketId || 'Active') + '</strong>.</div>' +
              '  <div style="font-size:0.8rem; color:#fecdd3; margin-top:6px; line-height:1.4;"><strong>Anti-Proxy Notice:</strong> Faculty and staff passes can only be booked once per employee per event.</div>' +
              '  <div style="margin-top:10px;"><button type="button" class="btn btn-secondary" style="padding:6px 14px; font-size:0.8rem; width:auto;" onclick="GarbaApp.searchPassByQuery(\'' + staffId + '\')">🔍 Retrieve My Existing Pass for ' + staffId + '</button></div>' +
              '</div>'
            );
          } else {
            this.showAlert(alertBox, 'alert-danger', result.message || 'Registration failed.');
          }
        }
      } catch (err) {
        console.error(err);
        this.showAlert(alertBox, 'alert-danger', 'Connection error: ' + err.message);
      } finally {
        submitBtn.disabled = false;
        btnSpinner.style.display = 'none';
        btnText.innerText = 'Book Faculty Entry Pass';
      }
    },

    localRegisterTeacher: function(data) {
      var currentEvent = this.getCurrentEvent();
      var eventId = data.eventId || (currentEvent ? currentEvent.id : 'nit-cult-2026');
      var codePrefix = (currentEvent && currentEvent.codePrefix) ? currentEvent.codePrefix : 'NIT';
      var prefix = 'TCH-' + codePrefix + '-';

      // Duplicate check: Staff ID must be unique FOR THIS SPECIFIC EVENT
      for (var i = 0; i < this.teachers.length; i++) {
        var t = this.teachers[i];
        var tEventId = t.eventId || 'nit-cult-2026';
        if (tEventId === eventId && t.staffId.toUpperCase() === data.staffId.toUpperCase()) {
          return {
            success: false,
            isDuplicate: true,
            message: 'Staff ID already exists for this event.',
            existingTicketId: t.ticketId
          };
        }
      }

      var ticketId = this.generateUniqueTicketId(prefix, this.teachers);
      var now = new Date();
      var timeFormatted = now.toISOString().replace('T', ' ').substring(0, 19);

      var eventFee = (currentEvent && typeof currentEvent.feeAmount === 'number') ? currentEvent.feeAmount : 0;
      var isPaidEvent = (currentEvent && currentEvent.ticketType === 'PAID' && eventFee > 0);
      var requiresPayment = isPaidEvent && (this.settings.requirePaymentVerification !== false);

      var newRecord = {
        category: 'TEACHER',
        registrationTime: timeFormatted,
        eventId: eventId,
        eventName: data.eventName || (currentEvent ? currentEvent.title : this.settings.eventName),
        hostingCollege: data.hostingCollege || (currentEvent ? currentEvent.collegeName : 'Host College'),
        collegeName: data.collegeName || (currentEvent ? currentEvent.collegeName : 'Host College'),
        name: data.name,
        staffId: data.staffId,
        department: data.department,
        designation: data.designation,
        email: data.email,
        mobile: data.mobile || '',
        ticketId: ticketId,
        status: requiresPayment ? 'PAYMENT_PENDING' : 'UNUSED',
        paymentStatus: requiresPayment ? 'AWAITING_PAYMENT' : 'PAID',
        feeAmount: eventFee,
        utrNumber: '',
        ticketCreated: timeFormatted,
        checkinTime: ''
      };

      this.teachers.push(newRecord);
      this.saveTeachers();

      return {
        success: true,
        ticket: newRecord
      };
    },

    // =========================================================================
    // REAL EMAIL DISPATCH & OUTBOX MANAGER
    // =========================================================================
    dispatchTicketEmail: function(ticket) {
      if (!ticket) return;

      var isStudent = ticket.category === 'STUDENT' || (ticket.ticketId && ticket.ticketId.indexOf('STU-') === 0);
      var meta1 = isStudent ? ('Roll No: ' + ticket.rollNumber) : ('Staff ID: ' + (ticket.staffId || ticket.employeeId));
      var meta2 = ticket.department + ' • ' + (isStudent ? (ticket.year + ' ' + (ticket.section || '')) : ticket.designation);

      // 1. Record in local outbox with complete formatted HTML
      this.recordSimulatedEmail({
        category: ticket.category,
        recipient: ticket.email,
        subject: 'Your ' + this.settings.eventName + ' ' + (isStudent ? 'Student' : 'Teacher') + ' Entry Pass',
        ticketId: ticket.ticketId,
        name: ticket.name,
        meta1: meta1,
        meta2: meta2,
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19)
      });

      // 2. Dispatch directly to attendee's inbox via FormSubmit API (Real Inbox Delivery)
      if (ticket.email && ticket.email.indexOf('@') > 0) {
        var cleanEmail = ticket.email.trim();
        try {
          fetch('https://formsubmit.co/ajax/' + encodeURIComponent(cleanEmail), {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify({
              _subject: '🎉 ' + (ticket.eventName || this.settings.eventName || 'College Event') + ' Entry Pass [' + ticket.ticketId + ']',
              Event: this.settings.eventName,
              Date: this.settings.eventDate,
              Venue: this.settings.venue,
              Attendee: ticket.name,
              Pass_Type: isStudent ? 'Student Entry Pass' : 'Teacher / Staff VIP Pass',
              Identifier: meta1,
              Department: meta2,
              Ticket_ID: ticket.ticketId,
              Gate_Rule: 'Physical College ID card / Staff ID card is mandatory for verification at the gate.',
              Status: ticket.status || 'UNUSED',
              Dispatched_Time: new Date().toLocaleString()
            })
          }).then(function(res) {
            return res.json();
          }).then(function(data) {
            console.log("FormSubmit live delivery successful to:", cleanEmail, data);
          }).catch(function(err) {
            console.warn("FormSubmit fetch note:", err);
          });
        } catch (err) {
          console.warn("FormSubmit dispatch exception:", err);
        }
      }

      // 3. Dispatch via EmailJS if configured
      if (window.emailjs && this.settings.emailJsServiceId && this.settings.emailJsTemplateId) {
        try {
          window.emailjs.send(this.settings.emailJsServiceId, this.settings.emailJsTemplateId, {
            to_email: ticket.email,
            to_name: ticket.name,
            ticket_id: ticket.ticketId,
            event_name: this.settings.eventName,
            event_date: this.settings.eventDate,
            venue: this.settings.venue,
            attendee_id: isStudent ? ticket.rollNumber : ticket.staffId,
            department: ticket.department
          }).then(function() {
            console.log("EmailJS successfully delivered ticket to:", ticket.email);
          }).catch(function(e) {
            console.warn("EmailJS send failed:", e);
          });
        } catch (e) {
          console.warn("EmailJS error:", e);
        }
      }

      // 3. Dispatch via Google Apps Script Web App if configured
      if (this.settings.gasWebAppUrl) {
        this.callGasBackend({
          action: 'sendEmail',
          ticketId: ticket.ticketId,
          email: ticket.email
        }).catch(function(err) {
          console.warn("GAS MailApp trigger notice:", err);
        });
      }
    },

    resendEmail: function(ticketId) {
      var attendee = this.findAttendeeByTicket(ticketId);
      if (!attendee) return;
      this.dispatchTicketEmail(attendee);
      this.showToast('📧 Digital Ticket pass resent to ' + attendee.email + '!');
    },

    openInEmailClient: function(ticketId) {
      var attendee = this.findAttendeeByTicket(ticketId);
      if (!attendee) return;
      var isStudent = attendee.category === 'STUDENT' || (attendee.ticketId && attendee.ticketId.indexOf('STU-') === 0);
      var idInfo = isStudent ? ('Roll No: ' + attendee.rollNumber) : ('Staff ID: ' + attendee.staffId);
      var subject = encodeURIComponent('Your ' + this.settings.eventName + ' Entry Pass [' + attendee.ticketId + ']');
      var body = encodeURIComponent(
        'COLLEGE EVENT - OFFICIAL ENTRY PASS\n' +
        '-------------------------------------------\n' +
        'Event: ' + this.settings.eventName + '\n' +
        'Date: ' + this.settings.eventDate + '\n' +
        'Venue: ' + this.settings.venue + '\n\n' +
        'ATTENDEE DETAILS:\n' +
        'Name: ' + attendee.name + '\n' +
        idInfo + '\n' +
        'Department: ' + attendee.department + '\n' +
        'Ticket ID: ' + attendee.ticketId + '\n\n' +
        'MANDATORY ENTRY INSTRUCTIONS:\n' +
        '1. Carry this digital ticket pass on your phone or printout.\n' +
        '2. Carry your original college ID card / staff ID card for verification at the gate.\n' +
        '3. Ticket valid for single entry only.\n'
      );
      window.location.href = 'mailto:' + attendee.email + '?subject=' + subject + '&body=' + body;
    },

    // =========================================================================
    // SIMULATED EMAIL OUTBOX
    // =========================================================================
    recordSimulatedEmail: function(emailData) {
      this.emailOutbox.unshift(emailData);
      if (this.emailOutbox.length > 50) this.emailOutbox.pop();
      this.saveOutbox();
    },

    viewEmailPassModal: function(ticketId) {
      var item = this.emailOutbox.find(function(m) { return m.ticketId === ticketId; });
      if (!item) {
        // Build one on the fly for viewing
        var attendee = this.findAttendeeByTicket(ticketId);
        if (attendee) {
          item = {
            category: attendee.category,
            recipient: attendee.email,
            subject: 'Your ' + this.settings.eventName + ' Entry Pass',
            ticketId: attendee.ticketId,
            name: attendee.name,
            meta1: attendee.category === 'STUDENT' ? ('Roll No: ' + attendee.rollNumber) : ('Staff ID: ' + attendee.staffId),
            meta2: attendee.department + ' • ' + (attendee.category === 'STUDENT' ? attendee.year : attendee.designation),
            timestamp: attendee.registrationTime
          };
        }
      }

      if (!item) {
        this.showToast('No email record found for this ticket.');
        return;
      }

      var modal = document.getElementById('emailPreviewModal');
      var body = document.getElementById('emailModalContent');
      if (!modal || !body) return;

      var isStudent = item.category === 'STUDENT';
      var themeColor = isStudent ? '#f59e0b' : '#38bdf8';
      var titleTag = isStudent ? 'STUDENT ENTRY PASS' : 'TEACHER / STAFF ENTRY PASS';

      body.innerHTML = ''
        + '<div style="background:#0f172a; padding:18px; border-radius:12px; font-family:sans-serif; color:#f8fafc;">'
        + '  <div style="border-bottom:1px solid #334155; padding-bottom:12px; margin-bottom:14px; font-size:13px; color:#94a3b8;">'
        + '    <div><strong>To:</strong> ' + item.recipient + '</div>'
        + '    <div><strong>Subject:</strong> <span style="color:#f8fafc; font-weight:bold;">' + item.subject + '</span></div>'
        + '    <div><strong>Delivered via:</strong> Google Apps Script Mail Service • ' + item.timestamp + '</div>'
        + '  </div>'
        + '  <div style="background:linear-gradient(135deg, #1e1b4b, #172554); border:2px solid ' + themeColor + '; border-radius:14px; padding:20px; text-align:center;">'
        + '    <h3 style="color:' + themeColor + '; margin:0 0 4px 0; font-size:18px; text-transform:uppercase;">' + this.settings.eventName + '</h3>'
        + '    <p style="margin:0 0 14px 0; font-size:12px; color:#cbd5e1;">' + this.settings.eventDate + ' • ' + this.settings.venue + '</p>'
        + '    <div style="display:inline-block; background:' + themeColor + '; color:#000; font-weight:800; font-size:11px; padding:3px 12px; border-radius:20px; margin-bottom:14px;">' + titleTag + '</div>'
        + '    <div id="emailModalQrBox" style="background:#fff; padding:10px; border-radius:10px; display:inline-block; margin-bottom:12px;"></div>'
        + '    <div style="color:' + themeColor + '; font-size:16px; font-weight:bold; letter-spacing:2px; margin-bottom:14px;">' + item.ticketId + '</div>'
        + '    <div style="background:rgba(255,255,255,0.06); padding:12px; border-radius:8px; font-size:13px; text-align:left; line-height:1.6;">'
        + '      <div>Name: <strong>' + item.name + '</strong></div>'
        + '      <div>' + item.meta1 + '</div>'
        + '      <div>' + item.meta2 + '</div>'
        + '    </div>'
        + '    <div style="margin-top:14px; background:rgba(239,68,68,0.15); border:1px solid #ef4444; border-radius:8px; padding:10px; font-size:11px; color:#fca5a5; text-align:left;">'
        + '      ⚠️ <strong>MANDATORY:</strong> Bring this digital ticket AND your original college ID card for verification at the gate. Single entry only.'
        + '    </div>'
        + '  </div>'
        + '</div>';

      // Draw QR code inside email preview
      var qrBox = document.getElementById('emailModalQrBox');
      if (qrBox && window.GarbaQR) {
        var canvas = document.createElement('canvas');
        window.GarbaQR.drawToCanvas(canvas, item.ticketId, { size: 150 });
        qrBox.appendChild(canvas);
      }

      modal.classList.add('active');
    },

    closeEmailModal: function() {
      var modal = document.getElementById('emailPreviewModal');
      if (modal) modal.classList.remove('active');
    },

    // =========================================================================
    // DIGITAL TICKET RENDERING & EXPORT
    // =========================================================================
    renderDigitalTicket: function(ticket) {
      if (!ticket) return;

      var card = document.getElementById('digitalPassCard');
      var categoryPill = document.getElementById('ticketCategoryPill');
      var nameEl = document.getElementById('ticketName');
      var idLabel = document.getElementById('ticketIdLabel');
      var idVal = document.getElementById('ticketIdValue');
      var deptEl = document.getElementById('ticketDepartment');
      var detailRow4 = document.getElementById('ticketRow4');
      var row4Label = document.getElementById('ticketRow4Label');
      var row4Val = document.getElementById('ticketRow4Value');
      var ticketIdEl = document.getElementById('ticketIdDisplay');
      var qrCanvas = document.getElementById('ticketQrCanvas');

      var isStudent = (ticket.category === 'STUDENT' || (ticket.ticketId && ticket.ticketId.indexOf('STU-') === 0));

      if (isStudent) {
        card.className = 'digital-pass-card';
        categoryPill.className = 'ticket-category-pill student-pill';
        categoryPill.innerText = 'STUDENT ENTRY PASS';
        idLabel.innerText = 'Roll Number:';
        idVal.innerText = ticket.rollNumber || '-';
        detailRow4.style.display = 'flex';
        row4Label.innerText = 'Year / Section:';
        row4Val.innerText = (ticket.year || '') + (ticket.section ? ' (' + ticket.section + ')' : '');
      } else {
        card.className = 'digital-pass-card teacher-pass';
        categoryPill.className = 'ticket-category-pill teacher-pill';
        categoryPill.innerText = 'TEACHER / STAFF ENTRY PASS';
        idLabel.innerText = 'Employee / Staff ID:';
        idVal.innerText = ticket.staffId || ticket.employeeId || '-';
        detailRow4.style.display = 'flex';
        row4Label.innerText = 'Designation:';
        row4Val.innerText = ticket.designation || '-';
      }

      nameEl.innerText = ticket.name || '-';
      deptEl.innerText = ticket.department || '-';
      ticketIdEl.innerText = ticket.ticketId || '-';

      // Multi-College Dynamic Event Branding
      var ev = (ticket.eventId && this.events) ? this.events.find(function(e) { return e.id === ticket.eventId; }) : null;
      var hostCollege = ticket.hostingCollege || (ev ? ev.collegeName : 'National Institute of Technology');
      var eventTitle = ticket.eventName || (ev ? ev.title : 'College Event 2026');
      var eventDate = ticket.eventDate || (ev ? ev.date : 'Upcoming 2026');
      var eventVenue = ticket.eventVenue || (ev ? ev.venue : 'Main Campus Auditorium');

      var hostBadge = document.getElementById('ticketHostCollegeBadge');
      if (hostBadge) {
        hostBadge.innerText = '🏛️ ' + hostCollege.toUpperCase() + ' • HOST INSTITUTION';
      }

      var evTitleEl = document.getElementById('ticketEventNameDisplay');
      if (evTitleEl) evTitleEl.innerText = eventTitle.toUpperCase();

      var evDateEl = document.getElementById('ticketEventDateDisplay');
      if (evDateEl) evDateEl.innerText = eventDate;

      var evVenueEl = document.getElementById('ticketEventVenueDisplay');
      if (evVenueEl) evVenueEl.innerText = eventVenue;

      var collegeRow = document.getElementById('ticketCollegeRow');
      var collegeVal = document.getElementById('ticketCollegeVal');
      if (collegeVal) {
        collegeVal.innerText = ticket.collegeName || hostCollege || '-';
      }
      if (collegeRow) {
        collegeRow.style.display = 'flex';
      }

      var isFree = (Number(ticket.feeAmount) === 0 || ticket.ticketType === 'FREE');
      var isPaid = isFree || (!this.settings.requirePaymentVerification || ticket.paymentStatus === 'PAID');

      var activeQrBox = document.getElementById('ticketActiveQrBox');
      var lockedQrBox = document.getElementById('ticketLockedQrBox');
      var payBadge = document.getElementById('ticketPaymentBadge');
      var payPendingNotice = document.getElementById('ticketPaymentPendingNotice');
      var lockedUtrDisplay = document.getElementById('lockedUtrDisplay');
      var downloadPassBtn = document.getElementById('downloadPassBtn');
      var printPassBtn = document.getElementById('printPassBtn');
      var payStatusVal = document.getElementById('ticketPaymentStatusVal');

      if (isPaid) {
        if (activeQrBox) activeQrBox.style.display = 'block';
        if (lockedQrBox) lockedQrBox.style.display = 'none';
        if (payBadge) {
          payBadge.style.display = 'inline-block';
          payBadge.className = 'ticket-paid-badge';
          payBadge.innerText = isFree ? '✅ FREE ENTRY PASS ACTIVATED' : '✅ PAYMENT CONFIRMED & PASS ACTIVE';
        }
        if (payPendingNotice) payPendingNotice.style.display = 'none';
        if (downloadPassBtn) downloadPassBtn.disabled = false;
        if (printPassBtn) printPassBtn.disabled = false;
        if (payStatusVal) {
          if (isFree) {
            payStatusVal.innerHTML = '<span class="badge-payment-paid">FREE ENTRY PASS (₹0)</span>';
          } else {
            payStatusVal.innerHTML = '<span class="badge-payment-paid">PAID & VERIFIED (₹' + (ticket.feeAmount || this.settings.ticketFee || 150) + ')</span>';
          }
        }

        // Generate High Resolution QR Code on Canvas
        if (window.GarbaQR && qrCanvas) {
          window.GarbaQR.drawToCanvas(qrCanvas, ticket.ticketId, {
            size: 220,
            margin: 1,
            colorDark: '#000000',
            colorLight: '#ffffff'
          });
        }
      } else {
        if (activeQrBox) activeQrBox.style.display = 'none';
        if (lockedQrBox) lockedQrBox.style.display = 'flex';
        if (payBadge) {
          payBadge.style.display = 'inline-block';
          payBadge.className = 'ticket-locked-badge';
          payBadge.innerText = '⏳ PAYMENT APPROVAL PENDING';
        }
        if (payPendingNotice) payPendingNotice.style.display = 'block';
        if (downloadPassBtn) downloadPassBtn.disabled = true;
        if (printPassBtn) printPassBtn.disabled = true;
        if (lockedUtrDisplay) {
          lockedUtrDisplay.innerText = ticket.utrNumber ? ('Submitted UTR: ' + ticket.utrNumber) : 'No UTR Reference Submitted Yet';
        }
        if (payStatusVal) {
          payStatusVal.innerHTML = '<span class="badge-payment-pending">PENDING VERIFICATION' + (ticket.utrNumber ? ' (UTR: ' + ticket.utrNumber + ')' : '') + '</span>';
        }
      }

      // Update Email Notification Box on ticket view
      var emailNotice = document.getElementById('ticketEmailNotice');
      if (emailNotice) {
        if (isPaid) {
          emailNotice.innerHTML = ''
            + '<div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:10px;">'
            + '  <div>'
            + '    <div style="font-weight:800; color:#10b981; font-size:0.95rem;">✅ Digital Pass Dispatched to Email!</div>'
            + '    <div style="font-size:0.8rem; color:#cbd5e1;">Sent to: <strong>' + (ticket.email || '') + '</strong> (Check your inbox & spam)</div>'
            + '  </div>'
            + '  <div style="display:flex; gap:8px;">'
            + '    <button type="button" class="btn btn-secondary" style="width:auto; padding:6px 12px; font-size:0.75rem;" onclick="GarbaApp.openInEmailClient(\'' + ticket.ticketId + '\')">📨 Open Email App</button>'
            + '    <button type="button" class="btn btn-secondary" style="width:auto; padding:6px 12px; font-size:0.75rem;" onclick="GarbaApp.resendEmail(\'' + ticket.ticketId + '\')">🔄 Resend Email</button>'
            + '  </div>'
            + '</div>';
          emailNotice.style.display = 'block';
        } else {
          emailNotice.style.display = 'none';
        }
      }
    },

    // =========================================================================
    // PAYMENT FLOW & VERIFICATION METHODS
    // =========================================================================
    openPaymentViewForTicket: function(ticket) {
      if (!ticket) return;
      this.currentTicket = ticket;
      this.renderPaymentView();
      window.location.hash = 'payment';
    },

    openPaymentModalForCurrentTicket: function() {
      if (this.currentTicket) {
        this.openPaymentViewForTicket(this.currentTicket);
      } else {
        this.navigateTo('my-pass');
      }
    },

    renderPaymentView: function() {
      var ticket = this.currentTicket;
      if (!ticket) {
        this.showToast('No active ticket selected. Please search or register first.');
        this.navigateTo('my-pass');
        return;
      }

      var feeEl = document.getElementById('payFeeAmount');
      var descEl = document.getElementById('payAttendeeDesc');
      var badgeEl = document.getElementById('payTicketIdBadge');
      var upiTextEl = document.getElementById('payUpiIdText');
      var utrInput = document.getElementById('payUtrInput');
      var qrCanvas = document.getElementById('paymentUpiQrCanvas');

      var fee = ticket.feeAmount || this.settings.ticketFee || 150;
      var upiId = this.settings.upiId || 'garba2026@oksbi';
      var isStudent = (ticket.category === 'STUDENT' || (ticket.ticketId && ticket.ticketId.indexOf('STU-') === 0));
      var idText = isStudent ? ('Roll No: ' + ticket.rollNumber) : ('Staff ID: ' + (ticket.staffId || ticket.employeeId));

      if (feeEl) feeEl.innerText = '₹' + fee;
      if (descEl) descEl.innerText = ticket.name + ' (' + idText + ' • ' + ticket.department + ')';
      if (badgeEl) badgeEl.innerText = 'TICKET ID: ' + ticket.ticketId;
      if (upiTextEl) upiTextEl.innerText = upiId;
      if (utrInput) utrInput.value = ticket.utrNumber || '';

      // Draw Dynamic UPI Payment QR Code
      var upiPayload = 'upi://pay?pa=' + encodeURIComponent(upiId)
        + '&pn=' + encodeURIComponent(this.settings.eventName || 'College Garba Night')
        + '&am=' + encodeURIComponent(fee)
        + '&cu=INR'
        + '&tn=' + encodeURIComponent('Pass ' + ticket.ticketId);

      if (window.GarbaQR && qrCanvas) {
        window.GarbaQR.drawToCanvas(qrCanvas, upiPayload, {
          size: 200,
          margin: 1,
          colorDark: '#000000',
          colorLight: '#ffffff'
        });
      }
    },

    copyUpiId: function() {
      var upiId = this.settings.upiId || 'garba2026@oksbi';
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(upiId).then(() => {
          this.showToast('📋 UPI ID copied to clipboard: ' + upiId);
        });
      } else {
        var input = document.createElement('input');
        input.value = upiId;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
        this.showToast('📋 UPI ID copied: ' + upiId);
      }
    },

    handlePaymentSubmit: function(e) {
      if (e && e.preventDefault) e.preventDefault();
      var utrInput = document.getElementById('payUtrInput');
      var utr = utrInput ? utrInput.value.trim() : '';

      if (!utr || utr.length < 6) {
        this.showToast('Please enter a valid UPI Reference / UTR Number (min 6 characters).');
        return;
      }

      if (!this.currentTicket) {
        this.showToast('No ticket found to update payment.');
        return;
      }

      var ticketId = this.currentTicket.ticketId;
      var attendee = this.findAttendeeByTicket(ticketId);

      if (attendee) {
        var now = new Date().toISOString().replace('T', ' ').substring(0, 19);
        attendee.utrNumber = utr;
        attendee.paymentStatus = 'UNDER_VERIFICATION';
        attendee.paymentSubmitTime = now;

        if (attendee.category === 'STUDENT') {
          var idx = this.students.findIndex(s => s.ticketId.toUpperCase() === ticketId.toUpperCase());
          if (idx !== -1) {
            this.students[idx].utrNumber = utr;
            this.students[idx].paymentStatus = 'UNDER_VERIFICATION';
            this.students[idx].paymentSubmitTime = now;
            this.saveStudents();
            this.currentTicket = this.students[idx];
          }
        } else {
          var idx = this.teachers.findIndex(t => t.ticketId.toUpperCase() === ticketId.toUpperCase());
          if (idx !== -1) {
            this.teachers[idx].utrNumber = utr;
            this.teachers[idx].paymentStatus = 'UNDER_VERIFICATION';
            this.teachers[idx].paymentSubmitTime = now;
            this.saveTeachers();
            this.currentTicket = this.teachers[idx];
          }
        }

        this.showToast('🎉 UTR submitted! Awaiting coordinator approval.');
        this.renderDigitalTicket(this.currentTicket);
        window.location.hash = 'ticket';
      }
    },

    approvePayment: function(ticketId) {
      ticketId = (ticketId || '').trim().toUpperCase();
      var attendee = this.findAttendeeByTicket(ticketId);
      if (!attendee) {
        this.showToast('Ticket not found.');
        return;
      }

      var now = new Date().toISOString().replace('T', ' ').substring(0, 19);

      if (attendee.category === 'STUDENT') {
        var s = this.students.find(item => item.ticketId.toUpperCase() === ticketId);
        if (s) {
          s.paymentStatus = 'PAID';
          s.status = 'UNUSED';
          s.paymentApprovedTime = now;
          this.saveStudents();
          attendee = s;
        }
      } else {
        var t = this.teachers.find(item => item.ticketId.toUpperCase() === ticketId);
        if (t) {
          t.paymentStatus = 'PAID';
          t.status = 'UNUSED';
          t.paymentApprovedTime = now;
          this.saveTeachers();
          attendee = t;
        }
      }

      // Automatically dispatch ticket pass email upon payment approval
      this.dispatchTicketEmail(attendee);

      this.showToast('🎉 Payment approved for ' + attendee.name + '! Pass unlocked & email sent.');
      this.renderAdminTable();
      this.refreshDashboard();
      this.renderPendingApprovalsList();
    },

    rejectPayment: function(ticketId) {
      ticketId = (ticketId || '').trim().toUpperCase();
      var attendee = this.findAttendeeByTicket(ticketId);
      if (!attendee) return;

      if (!confirm('Reject payment for ' + attendee.name + ' (' + ticketId + ')?')) {
        return;
      }

      if (attendee.category === 'STUDENT') {
        var s = this.students.find(item => item.ticketId.toUpperCase() === ticketId);
        if (s) {
          s.paymentStatus = 'REJECTED';
          s.status = 'PAYMENT_REJECTED';
          this.saveStudents();
        }
      } else {
        var t = this.teachers.find(item => item.ticketId.toUpperCase() === ticketId);
        if (t) {
          t.paymentStatus = 'REJECTED';
          t.status = 'PAYMENT_REJECTED';
          this.saveTeachers();
        }
      }

      this.showToast('Payment marked as rejected for ' + attendee.name);
      this.renderAdminTable();
      this.refreshDashboard();
      this.renderPendingApprovalsList();
    },

    approveAllPendingPayments: function() {
      var pending = this.getPendingPayments();
      if (pending.length === 0) {
        this.showToast('No pending payments to approve.');
        return;
      }

      if (!confirm('Approve all ' + pending.length + ' pending payments and dispatch entry pass emails?')) {
        return;
      }

      var self = this;
      var now = new Date().toISOString().replace('T', ' ').substring(0, 19);

      pending.forEach(function(item) {
        if (item.category === 'STUDENT') {
          var s = self.students.find(s => s.ticketId === item.ticketId);
          if (s) {
            s.paymentStatus = 'PAID';
            s.status = 'UNUSED';
            s.paymentApprovedTime = now;
            self.dispatchTicketEmail(s);
          }
        } else {
          var t = self.teachers.find(t => t.ticketId === item.ticketId);
          if (t) {
            t.paymentStatus = 'PAID';
            t.status = 'UNUSED';
            t.paymentApprovedTime = now;
            self.dispatchTicketEmail(t);
          }
        }
      });

      this.saveStudents();
      this.saveTeachers();
      this.showToast('🎉 Approved all ' + pending.length + ' payments & dispatched passes!');
      this.renderAdminTable();
      this.refreshDashboard();
      this.renderPendingApprovalsList();
    },

    getPendingPayments: function() {
      var list = [];
      this.students.forEach(function(s) {
        if (s.paymentStatus === 'UNDER_VERIFICATION' || s.paymentStatus === 'AWAITING_PAYMENT' || s.status === 'PAYMENT_PENDING') {
          list.push(Object.assign({ category: 'STUDENT', idNum: s.rollNumber }, s));
        }
      });
      this.teachers.forEach(function(t) {
        if (t.paymentStatus === 'UNDER_VERIFICATION' || t.paymentStatus === 'AWAITING_PAYMENT' || t.status === 'PAYMENT_PENDING') {
          list.push(Object.assign({ category: 'TEACHER', idNum: t.staffId }, t));
        }
      });
      return list;
    },

    renderPendingApprovalsList: function() {
      var container = document.getElementById('pendingApprovalsTableContainer');
      var countEl = document.getElementById('pendingApprovalsListCount');
      var tabCountEl = document.getElementById('pendingTabCount');
      var statPending = document.getElementById('statPendingPaymentsAll');

      var pending = this.getPendingPayments();
      var count = pending.length;

      if (countEl) countEl.innerText = count;
      if (tabCountEl) tabCountEl.innerText = count;
      if (statPending) statPending.innerText = count;

      if (!container) return;

      if (count === 0) {
        container.innerHTML = '<div style="text-align:center; padding:18px; color:var(--text-muted); font-size:0.85rem;">🎉 All registrations are verified! No pending payments awaiting approval.</div>';
        return;
      }

      var html = '<div class="table-responsive-wrapper"><table class="attendee-table" style="font-size:0.82rem;">'
        + '<thead><tr>'
        + '  <th>Attendee</th>'
        + '  <th>Identifier</th>'
        + '  <th>Ticket ID</th>'
        + '  <th>Fee</th>'
        + '  <th>Submitted UTR / Ref</th>'
        + '  <th>Submission Time</th>'
        + '  <th>Approval Action</th>'
        + '</tr></thead><tbody>';

      pending.forEach(function(item) {
        var isStudent = item.category === 'STUDENT';
        var catColor = isStudent ? '#f59e0b' : '#38bdf8';
        var utrDisplay = item.utrNumber ? ('<strong style="color:#38bdf8; font-family:monospace; font-size:0.88rem;">' + item.utrNumber + '</strong>') : '<span style="color:#f87171; font-style:italic;">Awaiting UTR</span>';

        html += '<tr>'
          + '  <td><div><strong style="color:' + catColor + ';">' + item.category + '</strong></div><strong>' + item.name + '</strong></td>'
          + '  <td>' + item.idNum + '<br/><small style="color:var(--text-muted);">' + item.department + '</small></td>'
          + '  <td><span style="font-family:monospace; font-weight:700;">' + item.ticketId + '</span></td>'
          + '  <td><strong style="color:#10b981;">₹' + (item.feeAmount || 150) + '</strong></td>'
          + '  <td>' + utrDisplay + '</td>'
          + '  <td><small style="color:var(--text-muted);">' + (item.paymentSubmitTime || item.registrationTime) + '</small></td>'
          + '  <td>'
          + '    <div style="display:flex; gap:6px;">'
          + '      <button type="button" class="btn btn-primary" style="padding:4px 8px; font-size:0.75rem; width:auto;" onclick="GarbaApp.approvePayment(\'' + item.ticketId + '\')">✅ Approve</button>'
          + '      <button type="button" class="btn btn-secondary" style="padding:4px 8px; font-size:0.75rem; width:auto; border-color:#ef4444; color:#fca5a5;" onclick="GarbaApp.rejectPayment(\'' + item.ticketId + '\')">Reject</button>'
          + '    </div>'
          + '  </td>'
          + '</tr>';
      });

      html += '</tbody></table></div>';
      container.innerHTML = html;
    },

    renderOutboxList: function() {
      var container = document.getElementById('outboxItemList');
      if (!container) return;
      var outbox = this.emailOutbox;
      if (!outbox || outbox.length === 0) {
        container.innerHTML = '<div style="text-align:center; padding:30px; color:var(--text-muted);">No emails dispatched yet. Complete or approve a registration to see outgoing ticket emails.</div>';
        return;
      }

      var html = '';
      outbox.forEach(function(item) {
        var isStudent = item.category === 'STUDENT';
        html += ''
          + '<div style="background:rgba(255,255,255,0.04); border:1px solid var(--border-glass); border-radius:12px; padding:14px; margin-bottom:12px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">'
          + '  <div>'
          + '    <div style="font-size:0.75rem; color:' + (isStudent ? '#f59e0b' : '#38bdf8') + '; font-weight:bold;">' + item.category + ' ENTRY PASS • ' + item.timestamp + '</div>'
          + '    <div style="font-size:1rem; font-weight:700; margin:2px 0;">' + item.name + ' (' + item.ticketId + ')</div>'
          + '    <div style="font-size:0.8rem; color:var(--text-muted);">' + item.recipient + ' • ' + item.meta1 + '</div>'
          + '    <div style="font-size:0.75rem; color:#10b981; margin-top:3px;">Status: ✅ Dispatched & Recorded</div>'
          + '  </div>'
          + '  <div style="display:flex; gap:8px;">'
          + '    <button type="button" class="btn btn-secondary" style="width:auto; padding:6px 12px; font-size:0.8rem;" onclick="GarbaApp.viewEmailPassModal(\'' + item.ticketId + '\')">Inspect Email Body</button>'
          + '    <button type="button" class="btn btn-secondary" style="width:auto; padding:6px 12px; font-size:0.8rem; border-color:#f59e0b; color:#fde68a;" onclick="GarbaApp.resendEmail(\'' + item.ticketId + '\')">🔄 Resend</button>'
          + '  </div>'
          + '</div>';
      });

      container.innerHTML = html;
      this.updateOutboxBadge();
    },

    clearOutbox: function() {
      if (confirm('Clear all dispatched email logs?')) {
        this.emailOutbox = [];
        this.saveOutbox();
        this.renderOutboxList();
        this.showToast('Outbox cleared.');
      }
    },

    downloadTicketImage: function() {
      var card = document.getElementById('digitalPassCard');
      var canvas = document.createElement('canvas');
      var ctx = canvas.getContext('2d');
      var width = 600;
      var height = 820;

      canvas.width = width;
      canvas.height = height;

      var ticket = this.currentTicket;
      if (!ticket) return;

      var isStudent = ticket.category === 'STUDENT' || (ticket.ticketId && ticket.ticketId.indexOf('STU-') === 0);
      var headerColor = isStudent ? '#d97706' : '#0284c7';
      var accentColor = isStudent ? '#f59e0b' : '#38bdf8';

      // Background
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, width, height);

      // Card Box with rounded corners
      ctx.fillStyle = '#1e1b4b';
      ctx.strokeStyle = accentColor;
      ctx.lineWidth = 4;
      ctx.strokeRect(15, 15, width - 30, height - 30);
      ctx.fillRect(17, 17, width - 34, height - 34);

      // Header Banner
      ctx.fillStyle = headerColor;
      ctx.fillRect(17, 17, width - 34, 100);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 24px -apple-system, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(this.settings.eventName.toUpperCase(), width / 2, 55);

      ctx.font = '14px -apple-system, sans-serif';
      ctx.fillStyle = '#fef3c7';
      ctx.fillText(this.settings.eventDate + ' • ' + this.settings.venue, width / 2, 85);

      // Badge
      ctx.fillStyle = accentColor;
      ctx.fillRect(width / 2 - 130, 135, 260, 32);
      ctx.fillStyle = '#000000';
      ctx.font = 'bold 14px -apple-system, sans-serif';
      ctx.fillText(isStudent ? 'STUDENT ENTRY PASS' : 'TEACHER / STAFF ENTRY PASS', width / 2, 156);

      // QR Code
      if (window.GarbaQR) {
        var qrTemp = document.createElement('canvas');
        window.GarbaQR.drawToCanvas(qrTemp, ticket.ticketId, { size: 240 });
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(width / 2 - 130, 185, 260, 260);
        ctx.drawImage(qrTemp, width / 2 - 120, 195, 240, 240);
      }

      // Ticket ID
      ctx.fillStyle = accentColor;
      ctx.font = 'bold 24px monospace';
      ctx.fillText(ticket.ticketId, width / 2, 480);

      // Attendee Details
      ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.fillRect(40, 505, width - 80, 180);

      ctx.textAlign = 'left';
      ctx.font = '16px -apple-system, sans-serif';
      ctx.fillStyle = '#94a3b8';
      ctx.fillText('Attendee Name:', 60, 540);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 16px -apple-system, sans-serif';
      ctx.fillText(ticket.name, 220, 540);

      ctx.font = '16px -apple-system, sans-serif';
      ctx.fillStyle = '#94a3b8';
      var idTitle = isStudent ? 'Roll Number:' : 'Staff ID:';
      var idNum = isStudent ? ticket.rollNumber : (ticket.staffId || ticket.employeeId);
      ctx.fillText(idTitle, 60, 580);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 16px -apple-system, sans-serif';
      ctx.fillText(idNum || '-', 220, 580);

      ctx.font = '16px -apple-system, sans-serif';
      ctx.fillStyle = '#94a3b8';
      ctx.fillText('Department:', 60, 620);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 16px -apple-system, sans-serif';
      ctx.fillText(ticket.department || '-', 220, 620);

      ctx.font = '16px -apple-system, sans-serif';
      ctx.fillStyle = '#94a3b8';
      var metaTitle = isStudent ? 'Year / Section:' : 'Designation:';
      var metaVal = isStudent ? (ticket.year + ' (' + ticket.section + ')') : ticket.designation;
      ctx.fillText(metaTitle, 60, 660);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 16px -apple-system, sans-serif';
      ctx.fillText(metaVal || '-', 220, 660);

      // Security Warning
      ctx.fillStyle = 'rgba(239, 68, 68, 0.2)';
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 1;
      ctx.strokeRect(40, 705, width - 80, 80);
      ctx.fillRect(40, 705, width - 80, 80);

      ctx.fillStyle = '#fca5a5';
      ctx.font = '13px -apple-system, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('⚠️ MANDATORY: Carry original College ID / Staff ID for gate check.', width / 2, 735);
      ctx.fillText('Single entry pass • Non-transferable • Non-refundable', width / 2, 760);

      // Trigger Download
      var link = document.createElement('a');
      link.download = ticket.ticketId + '-Pass.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    },

    printTicket: function() {
      window.print();
    },

    searchPassByQuery: function(query) {
      query = (query || '').trim().toUpperCase();
      if (!query) return;

      var attendee = this.findAttendeeByTicket(query)
        || this.students.find(function(s) { return (s.rollNumber || '').toUpperCase() === query; })
        || this.teachers.find(function(t) { return (t.staffId || '').toUpperCase() === query; })
        || this.students.find(function(s) { return (s.email || '').toUpperCase() === query; })
        || this.teachers.find(function(t) { return (t.email || '').toUpperCase() === query; });

      if (attendee) {
        this.currentTicket = attendee;
        this.renderDigitalTicket(attendee);
        window.location.hash = 'ticket';
      } else {
        this.showToast('No pass found for: ' + query);
      }
    },

    // =========================================================================
    // GATE SCANNER & ENTRY VERIFICATION
    // =========================================================================
    startScanner: function() {
      var self = this;
      var video = document.getElementById('scannerVideo');
      var canvas = document.getElementById('scannerCanvas');
      if (!video) return;

      if (!this.scannerInstance) {
        this.scannerInstance = new window.GateScanner({
          videoElem: video,
          canvasElem: canvas,
          onScan: function(scannedText) {
            self.handleQrScan(scannedText);
          }
        });
      }

      this.scannerInstance.start().catch(function(err) {
        console.warn("Camera auto-start notice:", err);
      });
    },

    stopScanner: function() {
      if (this.scannerInstance) {
        this.scannerInstance.stop();
      }
    },

    toggleTorch: async function() {
      if (this.scannerInstance) {
        var on = await this.scannerInstance.toggleTorch();
        var btn = document.getElementById('torchBtn');
        if (btn) {
          if (on) btn.classList.add('active');
          else btn.classList.remove('active');
        }
      }
    },

    toggleCameraFlip: async function() {
      if (this.scannerInstance) {
        await this.scannerInstance.toggleCamera();
      }
    },

    handleQrScan: function(codeText) {
      if (!codeText) return;
      document.getElementById('manualTicketInput').value = codeText;
      this.verifyAndProcessTicket(codeText);
    },

    verifyAndProcessTicket: async function(ticketId) {
      ticketId = (ticketId || '').trim().toUpperCase();
      if (!ticketId) {
        this.showToast('Please enter or scan a Ticket ID');
        return;
      }

      // Hide previous results
      var resultCard = document.getElementById('scanResultCard');
      resultCard.style.display = 'none';
      resultCard.className = 'scan-result-card';

      var verification;
      if (this.settings.gasWebAppUrl) {
        // Query live Google Sheet backend
        verification = await this.callGasBackend({
          action: 'verifyTicket',
          ticketId: ticketId
        });
      } else {
        verification = this.localVerifyTicket(ticketId);
      }

      this.renderScanResult(verification, ticketId);
    },

    localVerifyTicket: function(ticketId) {
      var isStudent = ticketId.indexOf('STU-') === 0;
      var isTeacher = ticketId.indexOf('TCH-') === 0;

      if (!isStudent && !isTeacher) {
        return { success: false, status: 'INVALID', message: 'INVALID TICKET: Format unrecognized' };
      }

      var attendee = null;
      if (isStudent) {
        attendee = this.students.find(function(s) { return s.ticketId.toUpperCase() === ticketId; });
        if (attendee) attendee = Object.assign({ category: 'STUDENT' }, attendee);
      } else {
        attendee = this.teachers.find(function(t) { return t.ticketId.toUpperCase() === ticketId; });
        if (attendee) attendee = Object.assign({ category: 'TEACHER' }, attendee);
      }

      if (!attendee) {
        return {
          success: false,
          status: 'INVALID',
          message: 'ENTRY DENIED: INVALID TICKET. Ticket ID does not exist in event database.'
        };
      }

      // Check Gate Event Scope
      var self = this;
      if (this.scannerTargetEvent && this.scannerTargetEvent !== 'ALL') {
        var attEvId = attendee.eventId || 'nit-cult-2026';
        if (attEvId !== this.scannerTargetEvent) {
          var targetEv = (this.events || []).find(function(e) { return e.id === self.scannerTargetEvent; });
          var targetName = targetEv ? targetEv.title : self.scannerTargetEvent;
          return {
            success: false,
            status: 'WRONG_EVENT',
            message: 'ENTRY DENIED: WRONG EVENT PASS. Scanner is scoped to "' + targetName + '", but this pass was issued for "' + (attendee.eventName || 'Another Event') + '".',
            attendee: attendee
          };
        }
      }

      if (attendee.status === 'PAYMENT_PENDING' || attendee.paymentStatus === 'UNDER_VERIFICATION' || attendee.paymentStatus === 'AWAITING_PAYMENT') {
        return {
          success: false,
          status: 'PAYMENT_PENDING',
          message: 'ENTRY DENIED: PAYMENT UNVERIFIED. Attendee pass fee payment is awaiting coordinator verification.',
          attendee: attendee
        };
      }

      if (attendee.status === 'USED') {
        return {
          success: false,
          status: 'ALREADY_USED',
          message: 'ENTRY DENIED: TICKET ALREADY USED',
          previousCheckInTime: attendee.checkinTime || 'Earlier',
          attendee: attendee
        };
      }

      return {
        success: true,
        status: 'UNUSED',
        message: 'TICKET VALID - VERIFY PHYSICAL ID',
        attendee: attendee
      };
    },

    renderScanResult: function(result, ticketId) {
      var card = document.getElementById('scanResultCard');
      var badge = document.getElementById('scanResultBadge');
      var msg = document.getElementById('scanResultMsg');
      var detailsCol = document.getElementById('scanAttendeeDetails');
      var idCheckPrompt = document.getElementById('scanIdCheckPrompt');
      var confirmAdmitBtn = document.getElementById('confirmAdmitBtn');
      var nextScanBtn = document.getElementById('nextScanBtn');

      card.style.display = 'block';
      this.pendingVerification = null;

      if (result.status === 'UNUSED' && result.attendee) {
        // VALID PASS!
        if (window.playSuccessSound) window.playSuccessSound();

        card.className = 'scan-result-card allowed active';
        badge.innerHTML = '✅ ENTRY ALLOWED';
        msg.innerHTML = '<span style="color:#6ee7b7; font-weight:700;">Valid UNUSED Ticket. Verify physical ID card below!</span>';

        var a = result.attendee;
        this.pendingVerification = a;

        var isStudent = a.category === 'STUDENT';
        detailsCol.innerHTML = ''
          + '<div class="ticket-details-table">'
          + '  <div class="ticket-detail-row"><span class="label">Event:</span><span class="val" style="color:#f59e0b; font-weight:bold;">' + (a.eventName || 'College Event') + '</span></div>'
          + '  <div class="ticket-detail-row"><span class="label">Host College:</span><span class="val">' + (a.hostingCollege || 'Host Institution') + '</span></div>'
          + '  <div class="ticket-detail-row"><span class="label">Attendee Name:</span><span class="val">' + a.name + '</span></div>'
          + '  <div class="ticket-detail-row"><span class="label">Attendee College:</span><span class="val">' + (a.collegeName || 'Host Campus') + '</span></div>'
          + '  <div class="ticket-detail-row"><span class="label">' + (isStudent ? 'Roll Number:' : 'Staff ID:') + '</span><span class="val" style="color:#38bdf8;">' + (isStudent ? a.rollNumber : a.staffId) + '</span></div>'
          + '  <div class="ticket-detail-row"><span class="label">Department:</span><span class="val">' + a.department + '</span></div>'
          + '  <div class="ticket-detail-row"><span class="label">' + (isStudent ? 'Year / Section:' : 'Designation:') + '</span><span class="val">' + (isStudent ? (a.year + ' ' + a.section) : a.designation) + '</span></div>'
          + '  <div class="ticket-detail-row"><span class="label">Ticket ID:</span><span class="val" style="font-family:monospace; font-weight:bold;">' + a.ticketId + '</span></div>'
          + '  <div class="ticket-detail-row"><span class="label">Current Status:</span><span class="val" style="color:#10b981; font-weight:bold;">UNUSED</span></div>'
          + '</div>';

        // Physical ID Check Prompt
        idCheckPrompt.style.display = 'block';
        idCheckPrompt.innerHTML = ''
          + '<h4>🪪 MANDATORY PHYSICAL ID CHECK:</h4>'
          + '<div class="id-checklist-item">✓ Check original ' + (isStudent ? 'College Student ID' : 'Staff ID') + '</div>'
          + '<div class="id-checklist-item">✓ Verify Institution: <strong>' + (a.collegeName || a.hostingCollege || 'Host Campus') + '</strong></div>'
          + '<div class="id-checklist-item">✓ Verify Name: <strong>' + a.name + '</strong></div>'
          + '<div class="id-checklist-item">✓ Verify ' + (isStudent ? 'Roll No: ' + a.rollNumber : 'Staff ID: ' + a.staffId) + '</div>';

        confirmAdmitBtn.style.display = 'inline-flex';
        confirmAdmitBtn.innerText = 'Allow Entry & Mark USED';
        nextScanBtn.style.display = 'inline-flex';

      } else if (result.status === 'WRONG_EVENT') {
        if (window.playErrorSound) window.playErrorSound();
        card.className = 'scan-result-card denied active';
        badge.innerHTML = '⚠️ ENTRY DENIED - WRONG EVENT';
        msg.innerHTML = '<span style="color:#f59e0b; font-weight:800; font-size:1.05rem;">PASS IS FOR A DIFFERENT EVENT</span><br/><small style="color:var(--text-sub);">' + result.message + '</small>';

        var aWrong = result.attendee;
        if (aWrong) {
          detailsCol.innerHTML = ''
            + '<div class="ticket-details-table" style="background:rgba(245,158,11,0.1); border:1px solid rgba(245,158,11,0.3);">'
            + '  <div class="ticket-detail-row"><span class="label">Attendee:</span><span class="val">' + aWrong.name + '</span></div>'
            + '  <div class="ticket-detail-row"><span class="label">Pass Belongs To:</span><span class="val" style="color:#f59e0b; font-weight:bold;">' + (aWrong.eventName || 'Other Event') + '</span></div>'
            + '  <div class="ticket-detail-row"><span class="label">Host College:</span><span class="val">' + (aWrong.hostingCollege || 'Other College') + '</span></div>'
            + '  <div class="ticket-detail-row"><span class="label">Ticket ID:</span><span class="val" style="font-family:monospace;">' + aWrong.ticketId + '</span></div>'
            + '</div>';
        }
        idCheckPrompt.style.display = 'none';
        confirmAdmitBtn.style.display = 'none';
        nextScanBtn.style.display = 'inline-flex';

      } else if (result.status === 'PAYMENT_PENDING') {
        if (window.playErrorSound) window.playErrorSound();
        card.className = 'scan-result-card denied active';
        badge.innerHTML = '🚫 ENTRY DENIED - UNVERIFIED PAYMENT';
        msg.innerHTML = '<span style="color:#f59e0b; font-weight:800; font-size:1.05rem;">FEE PAYMENT NOT CONFIRMED</span><br/><small style="color:var(--text-sub);">' + result.message + '</small>';

        var aPay = result.attendee;
        if (aPay) {
          detailsCol.innerHTML = ''
            + '<div class="ticket-details-table" style="background:rgba(245,158,11,0.1); border:1px solid rgba(245,158,11,0.3);">'
            + '  <div class="ticket-detail-row"><span class="label">Attendee:</span><span class="val">' + aPay.name + '</span></div>'
            + '  <div class="ticket-detail-row"><span class="label">Event:</span><span class="val">' + (aPay.eventName || 'Event') + '</span></div>'
            + '  <div class="ticket-detail-row"><span class="label">Identifier:</span><span class="val">' + (aPay.rollNumber || aPay.staffId || '-') + '</span></div>'
            + '  <div class="ticket-detail-row"><span class="label">Ticket ID:</span><span class="val">' + aPay.ticketId + '</span></div>'
            + '  <div class="ticket-detail-row"><span class="label">Submitted UTR:</span><span class="val" style="color:#38bdf8; font-family:monospace;">' + (aPay.utrNumber || 'Not submitted') + '</span></div>'
            + '  <div class="ticket-detail-row"><span class="label">Payment Status:</span><span class="val" style="color:#f59e0b;">' + (aPay.paymentStatus || 'PENDING') + '</span></div>'
            + '</div>';
        }
        idCheckPrompt.style.display = 'none';
        confirmAdmitBtn.style.display = 'none';
        nextScanBtn.style.display = 'inline-flex';

      } else if (result.status === 'ALREADY_USED') {
        // ALREADY USED
        if (window.playErrorSound) window.playErrorSound();

        card.className = 'scan-result-card denied active';
        badge.innerHTML = '🚫 ENTRY DENIED';
        msg.innerHTML = '<span style="color:#fca5a5; font-weight:800; font-size:1.1rem;">TICKET ALREADY USED</span><br/><small style="color:#f87171;">Previous Check-in Time: ' + (result.previousCheckInTime || 'Earlier') + '</small>';

        var aUsed = result.attendee;
        if (aUsed) {
          detailsCol.innerHTML = ''
            + '<div class="ticket-details-table" style="background:rgba(239,68,68,0.1); border:1px solid rgba(239,68,68,0.3);">'
            + '  <div class="ticket-detail-row"><span class="label">Attendee:</span><span class="val">' + aUsed.name + '</span></div>'
            + '  <div class="ticket-detail-row"><span class="label">Event:</span><span class="val">' + (aUsed.eventName || 'Event') + '</span></div>'
            + '  <div class="ticket-detail-row"><span class="label">ID:</span><span class="val">' + (aUsed.rollNumber || aUsed.staffId || '-') + '</span></div>'
            + '  <div class="ticket-detail-row"><span class="label">Ticket ID:</span><span class="val">' + aUsed.ticketId + '</span></div>'
            + '  <div class="ticket-detail-row"><span class="label">Status:</span><span class="val" style="color:#ef4444;">USED</span></div>'
            + '</div>';
        } else {
          detailsCol.innerHTML = '';
        }

        idCheckPrompt.style.display = 'none';
        confirmAdmitBtn.style.display = 'none';
        nextScanBtn.style.display = 'inline-flex';

      } else {
        // INVALID TICKET
        if (window.playErrorSound) window.playErrorSound();

        card.className = 'scan-result-card denied active';
        badge.innerHTML = '❌ ENTRY DENIED';
        msg.innerHTML = '<span style="color:#fca5a5; font-weight:800; font-size:1.1rem;">INVALID TICKET</span><br/><small style="color:#cbd5e1;">Ticket ID (' + ticketId + ') does not exist in event database.</small>';
        detailsCol.innerHTML = '<div style="margin-top:10px; font-size:0.85rem; color:#fca5a5;">Please direct attendee to the registration / help desk.</div>';

        idCheckPrompt.style.display = 'none';
        confirmAdmitBtn.style.display = 'none';
        nextScanBtn.style.display = 'inline-flex';
      }
    },

    confirmCheckInEntry: async function() {
      if (!this.pendingVerification) return;
      var ticketId = this.pendingVerification.ticketId;

      var checkinRes;
      if (this.settings.gasWebAppUrl) {
        checkinRes = await this.callGasBackend({
          action: 'checkInTicket',
          ticketId: ticketId
        });
      } else {
        checkinRes = this.localCheckInTicket(ticketId);
      }

      if (checkinRes.success) {
        var card = document.getElementById('scanResultCard');
        var badge = document.getElementById('scanResultBadge');
        var msg = document.getElementById('scanResultMsg');
        var idCheckPrompt = document.getElementById('scanIdCheckPrompt');
        var confirmAdmitBtn = document.getElementById('confirmAdmitBtn');

        badge.innerHTML = '🎉 CHECK-IN CONFIRMED';
        msg.innerHTML = '<span style="color:#6ee7b7; font-weight:700;">Attendee Admitted! Ticket Status updated to USED.<br/>Check-in Time: ' + checkinRes.checkinTime + '</span>';
        idCheckPrompt.style.display = 'none';
        confirmAdmitBtn.style.display = 'none';

        this.showToast('Check-in recorded successfully!');
        this.refreshDashboard();
      } else {
        this.showToast('Check-in error: ' + (checkinRes.message || 'Failed'));
      }
    },

    localCheckInTicket: function(ticketId) {
      var now = new Date();
      var timeFormatted = now.toISOString().replace('T', ' ').substring(0, 19);

      var isStudent = ticketId.indexOf('STU-') === 0;
      var attendee = null;

      if (isStudent) {
        attendee = this.students.find(function(s) { return s.ticketId.toUpperCase() === ticketId; });
        if (attendee) {
          if (attendee.status === 'USED') {
            return { success: false, status: 'ALREADY_USED', message: 'Ticket already used' };
          }
          attendee.status = 'USED';
          attendee.checkinTime = timeFormatted;
          this.saveStudents();
        }
      } else {
        attendee = this.teachers.find(function(t) { return t.ticketId.toUpperCase() === ticketId; });
        if (attendee) {
          if (attendee.status === 'USED') {
            return { success: false, status: 'ALREADY_USED', message: 'Ticket already used' };
          }
          attendee.status = 'USED';
          attendee.checkinTime = timeFormatted;
          this.saveTeachers();
        }
      }

      if (!attendee) {
        return { success: false, status: 'INVALID', message: 'Ticket not found' };
      }

      return {
        success: true,
        status: 'USED',
        checkinTime: timeFormatted,
        attendee: attendee
      };
    },

    resetScannerView: function() {
      var resultCard = document.getElementById('scanResultCard');
      resultCard.style.display = 'none';
      resultCard.className = 'scan-result-card';
      document.getElementById('manualTicketInput').value = '';
      this.pendingVerification = null;
    },

    // =========================================================================
    // ADMIN DASHBOARD & STATISTICS
    // =========================================================================
    refreshDashboard: function() {
      var stats = this.computeStatistics();

      // Overall
      var totAll = document.getElementById('statTotalAll');
      if (totAll) totAll.innerText = stats.overall.total;
      var chkAll = document.getElementById('statCheckedInAll');
      if (chkAll) chkAll.innerText = stats.overall.checkedIn;
      var remAll = document.getElementById('statRemainingAll');
      if (remAll) remAll.innerText = stats.overall.remaining;

      // Students
      var totStu = document.getElementById('statStudentsTotal');
      if (totStu) totStu.innerText = stats.students.total;
      var chkStu = document.getElementById('statStudentsCheckedIn');
      if (chkStu) chkStu.innerText = stats.students.checkedIn;
      var remStu = document.getElementById('statStudentsRemaining');
      if (remStu) remStu.innerText = stats.students.notCheckedIn;

      // Teachers
      var totTch = document.getElementById('statTeachersTotal');
      if (totTch) totTch.innerText = stats.teachers.total;
      var chkTch = document.getElementById('statTeachersCheckedIn');
      if (chkTch) chkTch.innerText = stats.teachers.checkedIn;
      var remTch = document.getElementById('statTeachersRemaining');
      if (remTch) remTch.innerText = stats.teachers.notCheckedIn;

      // Department Bars
      this.renderDepartmentBreakdown(stats.departments, stats.overall.total);

      // Year Bars
      this.renderYearBreakdown(stats.years, stats.students.total);

      // Section Breakdown
      this.renderSectionBreakdown(stats.sections, stats.students.total);
    },

    computeStatistics: function() {
      var stats = {
        students: { total: 0, checkedIn: 0, notCheckedIn: 0 },
        teachers: { total: 0, checkedIn: 0, notCheckedIn: 0 },
        overall: { total: 0, checkedIn: 0, remaining: 0 },
        departments: {},
        years: { '1st Year': 0, '2nd Year': 0, '3rd Year': 0, '4th Year': 0 },
        sections: {}
      };

      // Populate departments from settings
      this.settings.departments.forEach(function(d) {
        stats.departments[d] = { students: 0, teachers: 0, total: 0 };
      });

      // Populate sections from settings
      this.settings.sections.forEach(function(s) {
        stats.sections[s] = 0;
      });

      var eventFilter = this.adminTargetEvent || 'ALL';
      var activeStudents = this.students;
      var activeTeachers = this.teachers;

      if (eventFilter !== 'ALL') {
        activeStudents = activeStudents.filter(function(s) { return (s.eventId || 'nit-cult-2026') === eventFilter; });
        activeTeachers = activeTeachers.filter(function(t) { return (t.eventId || 'nit-cult-2026') === eventFilter; });
      }

      // Students
      activeStudents.forEach(function(s) {
        stats.students.total++;
        if (s.status === 'USED') stats.students.checkedIn++;
        else stats.students.notCheckedIn++;

        var dept = s.department || 'Other';
        if (!stats.departments[dept]) stats.departments[dept] = { students: 0, teachers: 0, total: 0 };
        stats.departments[dept].students++;
        stats.departments[dept].total++;

        var yr = s.year || 'Unknown';
        if (stats.years[yr] !== undefined) stats.years[yr]++;
        else stats.years[yr] = 1;

        var sec = s.section || 'Other';
        if (stats.sections[sec] !== undefined) stats.sections[sec]++;
        else stats.sections[sec] = 1;
      });

      // Teachers
      activeTeachers.forEach(function(t) {
        stats.teachers.total++;
        if (t.status === 'USED') stats.teachers.checkedIn++;
        else stats.teachers.notCheckedIn++;

        var dept = t.department || 'Other';
        if (!stats.departments[dept]) stats.departments[dept] = { students: 0, teachers: 0, total: 0 };
        stats.departments[dept].teachers++;
        stats.departments[dept].total++;
      });

      stats.overall.total = stats.students.total + stats.teachers.total;
      stats.overall.checkedIn = stats.students.checkedIn + stats.teachers.checkedIn;
      stats.overall.remaining = stats.students.notCheckedIn + stats.teachers.notCheckedIn;

      return stats;
    },

    renderDepartmentBreakdown: function(departments, totalOverall) {
      var container = document.getElementById('deptBreakdownList');
      if (!container) return;

      var html = '';
      var keys = Object.keys(departments);
      keys.forEach(function(dept) {
        var data = departments[dept];
        var pct = totalOverall > 0 ? Math.round((data.total / totalOverall) * 100) : 0;

        html += ''
          + '<div class="progress-item-row">'
          + '  <div class="progress-meta">'
          + '    <span><strong>' + dept + '</strong> (Students: ' + data.students + ', Teachers: ' + data.teachers + ')</span>'
          + '    <span>' + data.total + ' (' + pct + '%)</span>'
          + '  </div>'
          + '  <div class="progress-track">'
          + '    <div class="progress-fill" style="width: ' + pct + '%;"></div>'
          + '  </div>'
          + '</div>';
      });

      container.innerHTML = html || '<div style="color:var(--text-muted); font-size:0.85rem;">No department data yet</div>';
    },

    renderYearBreakdown: function(years, totalStudents) {
      var container = document.getElementById('yearBreakdownList');
      if (!container) return;

      var html = '';
      var keys = Object.keys(years);
      keys.forEach(function(yr) {
        var count = years[yr];
        var pct = totalStudents > 0 ? Math.round((count / totalStudents) * 100) : 0;

        html += ''
          + '<div class="progress-item-row">'
          + '  <div class="progress-meta">'
          + '    <span><strong>' + yr + '</strong></span>'
          + '    <span>' + count + ' (' + pct + '%)</span>'
          + '  </div>'
          + '  <div class="progress-track">'
          + '    <div class="progress-fill blue-fill" style="width: ' + pct + '%;"></div>'
          + '  </div>'
          + '</div>';
      });

      container.innerHTML = html;
    },

    renderSectionBreakdown: function(sections, totalStudents) {
      var container = document.getElementById('sectionBreakdownList');
      if (!container) return;

      var html = '';
      var keys = Object.keys(sections);
      keys.forEach(function(sec) {
        var count = sections[sec];
        var pct = totalStudents > 0 ? Math.round((count / totalStudents) * 100) : 0;

        html += ''
          + '<div class="progress-item-row">'
          + '  <div class="progress-meta">'
          + '    <span><strong>' + sec + '</strong></span>'
          + '    <span>' + count + ' (' + pct + '%)</span>'
          + '  </div>'
          + '  <div class="progress-track">'
          + '    <div class="progress-fill" style="width: ' + pct + '%;"></div>'
          + '  </div>'
          + '</div>';
      });

      container.innerHTML = html;
    },

    renderAdminTable: function() {
      var tbody = document.getElementById('adminAttendeeTableBody');
      if (!tbody) return;

      var filterCategory = this.adminTableFilter || 'ALL';
      var searchQuery = (document.getElementById('adminTableSearch') ? document.getElementById('adminTableSearch').value : '').toLowerCase().trim();
      var eventFilter = this.adminTargetEvent || 'ALL';

      var combined = [];

      if (filterCategory === 'ALL' || filterCategory === 'STUDENT') {
        this.students.forEach(function(s) {
          if (eventFilter === 'ALL' || (s.eventId || 'nit-cult-2026') === eventFilter) {
            combined.push(Object.assign({ category: 'STUDENT', idNum: s.rollNumber, metaCol: s.year + ' (' + s.section + ')' }, s));
          }
        });
      }

      if (filterCategory === 'ALL' || filterCategory === 'TEACHER') {
        this.teachers.forEach(function(t) {
          if (eventFilter === 'ALL' || (t.eventId || 'nit-cult-2026') === eventFilter) {
            combined.push(Object.assign({ category: 'TEACHER', idNum: t.staffId, metaCol: t.designation }, t));
          }
        });
      }

      // Filter by search
      if (searchQuery) {
        combined = combined.filter(function(item) {
          return item.name.toLowerCase().indexOf(searchQuery) !== -1
            || item.idNum.toLowerCase().indexOf(searchQuery) !== -1
            || item.ticketId.toLowerCase().indexOf(searchQuery) !== -1
            || item.department.toLowerCase().indexOf(searchQuery) !== -1
            || (item.collegeName && item.collegeName.toLowerCase().indexOf(searchQuery) !== -1)
            || (item.eventName && item.eventName.toLowerCase().indexOf(searchQuery) !== -1)
            || (item.utrNumber && item.utrNumber.toLowerCase().indexOf(searchQuery) !== -1);
        });
      }

      // Filter by status if specified
      if (filterCategory === 'PAYMENT_PENDING') {
        combined = combined.filter(function(item) {
          return item.paymentStatus === 'UNDER_VERIFICATION' || item.paymentStatus === 'AWAITING_PAYMENT' || item.status === 'PAYMENT_PENDING';
        });
      } else if (filterCategory === 'USED') {
        combined = combined.filter(function(item) { return item.status === 'USED'; });
      } else if (filterCategory === 'UNUSED') {
        combined = combined.filter(function(item) { return item.status === 'UNUSED'; });
      }

      if (combined.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" style="text-align:center; padding:24px; color:var(--text-muted);">No matching attendees found.</td></tr>';
        return;
      }

      var html = '';
      var self = this;
      combined.forEach(function(item) {
        var isUsed = item.status === 'USED';
        var statusClass = isUsed ? 'status-pill used' : (item.status === 'PAYMENT_PENDING' ? 'badge-payment-pending' : 'status-pill unused');
        var catClass = item.category === 'STUDENT' ? 'color:#f59e0b;' : 'color:#38bdf8;';

        var payBadge = '';
        if (item.paymentStatus === 'PAID') {
          payBadge = '<span class="badge-payment-paid">PAID (₹' + (item.feeAmount || 150) + ')</span>';
        } else if (Number(item.feeAmount) === 0 || item.ticketType === 'FREE') {
          payBadge = '<span class="badge-payment-paid">FREE (₹0)</span>';
        } else if (item.paymentStatus === 'UNDER_VERIFICATION') {
          payBadge = '<span class="badge-payment-pending" title="UTR: ' + (item.utrNumber || '') + '">VERIFY UTR: ' + (item.utrNumber || 'N/A') + '</span>';
        } else if (item.paymentStatus === 'REJECTED') {
          payBadge = '<span class="badge-payment-rejected">REJECTED</span>';
        } else {
          payBadge = '<span class="badge-payment-pending">AWAITING</span>';
        }

        var isPendingPay = (item.paymentStatus === 'UNDER_VERIFICATION' || item.paymentStatus === 'AWAITING_PAYMENT' || item.status === 'PAYMENT_PENDING');

        html += ''
          + '<tr>'
          + '  <td><strong style="' + catClass + '">' + item.category + '</strong></td>'
          + '  <td><strong>' + item.name + '</strong>'
          + '    <div style="font-size:0.75rem; color:#94a3b8; margin-top:2px;">🏫 ' + (item.collegeName || 'Host Campus') + ' • <span style="color:#f59e0b;">' + (item.eventName || 'Event') + '</span></div>'
          + '  </td>'
          + '  <td>' + item.idNum + '</td>'
          + '  <td>' + item.department + '</td>'
          + '  <td><span style="font-family:monospace; font-weight:bold;">' + item.ticketId + '</span></td>'
          + '  <td>' + payBadge + '</td>'
          + '  <td><span class="' + statusClass + '">' + item.status + '</span>' + (item.checkinTime ? '<br/><small style="color:var(--text-muted);">' + item.checkinTime.substring(11) + '</small>' : '') + '</td>'
          + '  <td>'
          + '    <div style="display:flex; gap:6px;">'
          + (isPendingPay ? '      <button class="btn btn-primary" style="padding:4px 8px; font-size:0.75rem; width:auto;" onclick="GarbaApp.approvePayment(\'' + item.ticketId + '\')">Approve</button>' : '')
          + '      <button class="btn btn-secondary" style="padding:4px 8px; font-size:0.75rem; width:auto;" onclick="GarbaApp.openAttendeeModal(\'' + item.ticketId + '\')">Inspect</button>'
          + '    </div>'
          + '  </td>'
          + '</tr>';
      });

      tbody.innerHTML = html;
    },

    filterAdminTable: function(category, btnElem) {
      this.adminTableFilter = category;
      var buttons = document.querySelectorAll('.filter-tab-btn');
      buttons.forEach(function(b) { b.classList.remove('active'); });
      if (btnElem) btnElem.classList.add('active');
      this.renderAdminTable();
    },

    findAttendeeByTicket: function(ticketId) {
      ticketId = (ticketId || '').trim().toUpperCase();
      var s = this.students.find(function(item) { return item.ticketId.toUpperCase() === ticketId; });
      if (s) return Object.assign({ category: 'STUDENT' }, s);
      var t = this.teachers.find(function(item) { return item.ticketId.toUpperCase() === ticketId; });
      if (t) return Object.assign({ category: 'TEACHER' }, t);
      return null;
    },

    openAttendeeModal: function(ticketId) {
      var a = this.findAttendeeByTicket(ticketId);
      if (!a) return;

      var modal = document.getElementById('attendeeDetailModal');
      var body = document.getElementById('attendeeModalBody');
      if (!modal || !body) return;

      var isStudent = a.category === 'STUDENT';
      var isUsed = a.status === 'USED';

      body.innerHTML = ''
        + '<div style="text-align:center; margin-bottom:16px;">'
        + '  <span class="ticket-category-pill ' + (isStudent ? 'student-pill' : 'teacher-pill') + '">' + a.category + ' RECORD</span>'
        + '  <h3 style="font-size:1.3rem; margin-top:6px;">' + a.name + '</h3>'
        + '  <div style="font-family:monospace; color:#f59e0b; font-size:1.1rem; font-weight:bold;">' + a.ticketId + '</div>'
        + '</div>'
        + '<div class="ticket-details-table">'
        + '  <div class="ticket-detail-row"><span class="label">Event Name:</span><span class="val" style="color:#f59e0b; font-weight:bold;">' + (a.eventName || 'College Event') + '</span></div>'
        + '  <div class="ticket-detail-row"><span class="label">Host Institution:</span><span class="val">' + (a.hostingCollege || 'Host Campus') + '</span></div>'
        + '  <div class="ticket-detail-row"><span class="label">Attendee College:</span><span class="val">' + (a.collegeName || 'Host Campus') + '</span></div>'
        + '  <div class="ticket-detail-row"><span class="label">' + (isStudent ? 'Roll Number:' : 'Staff ID:') + '</span><span class="val">' + (isStudent ? a.rollNumber : a.staffId) + '</span></div>'
        + '  <div class="ticket-detail-row"><span class="label">Department:</span><span class="val">' + a.department + '</span></div>'
        + '  <div class="ticket-detail-row"><span class="label">' + (isStudent ? 'Year / Section:' : 'Designation:') + '</span><span class="val">' + (isStudent ? (a.year + ' (' + a.section + ')') : a.designation) + '</span></div>'
        + '  <div class="ticket-detail-row"><span class="label">Email:</span><span class="val">' + a.email + '</span></div>'
        + (a.mobile ? ('  <div class="ticket-detail-row"><span class="label">Mobile:</span><span class="val">' + a.mobile + '</span></div>') : '')
        + '  <div class="ticket-detail-row"><span class="label">Registered At:</span><span class="val">' + a.registrationTime + '</span></div>'
        + '  <div class="ticket-detail-row"><span class="label">Ticket Status:</span><span class="val" style="color:' + (isUsed ? '#10b981' : '#38bdf8') + ';">' + a.status + '</span></div>'
        + (a.checkinTime ? ('  <div class="ticket-detail-row"><span class="label">Check-in Time:</span><span class="val" style="color:#10b981;">' + a.checkinTime + '</span></div>') : '')
        + '</div>'
        + '<div style="display:flex; flex-direction:column; gap:10px; margin-top:18px;">'
        + (isUsed
            ? '<button class="btn btn-secondary" onclick="GarbaApp.toggleTicketStatusManual(\'' + a.ticketId + '\', \'UNUSED\')">↺ Reset Status to UNUSED</button>'
            : '<button class="btn btn-success" onclick="GarbaApp.toggleTicketStatusManual(\'' + a.ticketId + '\', \'USED\')">✓ Manual Check-in (Mark USED)</button>')
        + '  <button class="btn btn-primary" onclick="GarbaApp.viewPassFromAdmin(\'' + a.ticketId + '\')">View Digital Entry Pass</button>'
        + '  <button class="btn btn-secondary" onclick="GarbaApp.viewEmailPassModal(\'' + a.ticketId + '\')">Inspect Email Delivery</button>'
        + '</div>';

      modal.classList.add('active');
    },

    closeAttendeeModal: function() {
      var modal = document.getElementById('attendeeDetailModal');
      if (modal) modal.classList.remove('active');
    },

    viewPassFromAdmin: function(ticketId) {
      this.closeAttendeeModal();
      var a = this.findAttendeeByTicket(ticketId);
      if (a) {
        this.currentTicket = a;
        this.renderDigitalTicket(a);
        window.location.hash = 'ticket';
      }
    },

    toggleTicketStatusManual: function(ticketId, newStatus) {
      var a = this.findAttendeeByTicket(ticketId);
      if (!a) return;

      var now = new Date();
      var timeFormatted = now.toISOString().replace('T', ' ').substring(0, 19);

      if (a.category === 'STUDENT') {
        var s = this.students.find(function(item) { return item.ticketId.toUpperCase() === ticketId; });
        if (s) {
          s.status = newStatus;
          s.checkinTime = (newStatus === 'USED') ? timeFormatted : '';
          this.saveStudents();
        }
      } else {
        var t = this.teachers.find(function(item) { return item.ticketId.toUpperCase() === ticketId; });
        if (t) {
          t.status = newStatus;
          t.checkinTime = (newStatus === 'USED') ? timeFormatted : '';
          this.saveTeachers();
        }
      }

      this.showToast('Ticket ' + ticketId + ' marked as ' + newStatus);
      this.closeAttendeeModal();
      this.renderAdminTable();
      this.refreshDashboard();
    },

    exportDataCsv: function(category) {
      var csv = '';
      var filename = '';
      var eventFilter = this.adminTargetEvent || 'ALL';

      if (category === 'STUDENTS') {
        filename = 'College_Events_Students_' + (eventFilter !== 'ALL' ? eventFilter + '_' : '') + new Date().toISOString().substring(0, 10) + '.csv';
        csv = 'Registration Time,Event,Host College,Attendee College,Name,Roll Number,Department,Year,Section,Email,Ticket ID,Ticket Status,Payment Status,Check-in Time\n';
        var list = this.students;
        if (eventFilter !== 'ALL') {
          list = list.filter(function(s) { return (s.eventId || 'nit-cult-2026') === eventFilter; });
        }
        list.forEach(function(s) {
          csv += '"' + s.registrationTime + '","' + (s.eventName || 'Event') + '","' + (s.hostingCollege || 'Host') + '","' + (s.collegeName || '') + '","' + s.name + '","' + s.rollNumber + '","' + s.department + '","' + s.year + '","' + s.section + '","' + s.email + '","' + s.ticketId + '","' + s.status + '","' + (s.paymentStatus || 'PAID') + '","' + (s.checkinTime || '') + '"\n';
        });
      } else {
        filename = 'College_Events_Teachers_' + (eventFilter !== 'ALL' ? eventFilter + '_' : '') + new Date().toISOString().substring(0, 10) + '.csv';
        csv = 'Registration Time,Event,Host College,Attendee College,Name,Employee / Staff ID,Department,Designation,Email,Mobile Number,Ticket ID,Ticket Status,Payment Status,Check-in Time\n';
        var tList = this.teachers;
        if (eventFilter !== 'ALL') {
          tList = tList.filter(function(t) { return (t.eventId || 'nit-cult-2026') === eventFilter; });
        }
        tList.forEach(function(t) {
          csv += '"' + t.registrationTime + '","' + (t.eventName || 'Event') + '","' + (t.hostingCollege || 'Host') + '","' + (t.collegeName || '') + '","' + t.name + '","' + t.staffId + '","' + t.department + '","' + t.designation + '","' + t.email + '","' + (t.mobile || '') + '","' + t.ticketId + '","' + t.status + '","' + (t.paymentStatus || 'PAID') + '","' + (t.checkinTime || '') + '"\n';
        });
      }

      var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      var link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      link.click();
    },

    // =========================================================================
    // SETTINGS HANDLER
    // =========================================================================
    handleSaveSettings: function(e) {
      e.preventDefault();
      var form = e.target;

      this.settings.eventName = form.eventName.value.trim() || 'National Campus Cultural Fest 2026';
      this.settings.eventDate = form.eventDate.value.trim() || '16 October 2026';
      this.settings.venue = form.venue.value.trim() || 'Open Air Theatre';
      this.settings.gasWebAppUrl = form.gasUrl.value.trim();

      if (form.ticketFee) this.settings.ticketFee = parseInt(form.ticketFee.value, 10) || 150;
      if (form.upiId) this.settings.upiId = form.upiId.value.trim() || 'garba2026@oksbi';
      if (form.requirePaymentVerification) this.settings.requirePaymentVerification = form.requirePaymentVerification.checked;

      this.settings.registrationOpen = form.registrationOpen.checked;
      this.settings.studentRegistrationOpen = form.studentRegistrationOpen.checked;
      this.settings.teacherRegistrationOpen = form.teacherRegistrationOpen.checked;

      var depts = form.departments.value.split(',').map(function(s) { return s.trim(); }).filter(Boolean);
      if (depts.length > 0) this.settings.departments = depts;

      var secs = form.sections.value.split(',').map(function(s) { return s.trim(); }).filter(Boolean);
      if (secs.length > 0) this.settings.sections = secs;

      this.saveSettings();
      this.showToast('Event settings saved successfully!');
    },

    testGasConnection: async function() {
      var urlInput = document.getElementById('settingGasUrl');
      var url = urlInput ? urlInput.value.trim() : '';

      if (!url) {
        this.showToast('Please paste a Google Apps Script Web App URL first.');
        return;
      }

      this.showToast('Testing connection to Google Sheet...');

      try {
        var pingUrl = url + (url.indexOf('?') === -1 ? '?' : '&') + 'action=ping';
        var resp = await fetch(pingUrl);
        var json = await resp.json();

        if (json && json.success) {
          this.settings.gasWebAppUrl = url;
          this.saveSettings();
          this.showToast('🎉 Connection Successful! Google Sheet is LIVE.');
        } else {
          this.showToast('Response received but status was not OK: ' + (json.message || ''));
        }
      } catch (err) {
        console.error("GAS Ping Error:", err);
        this.showToast('Connection failed: ' + err.message + '. Make sure script is deployed with access: "Anyone".');
      }
    },

    callGasBackend: async function(payload) {
      if (!this.settings.gasWebAppUrl) {
        throw new Error('No Google Apps Script URL configured');
      }

      var resp = await fetch(this.settings.gasWebAppUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload)
      });
      return await resp.json();
    },

    // =========================================================================
    // UI HELPERS (TOAST, ALERTS)
    // =========================================================================
    showAlert: function(alertBox, className, message) {
      if (!alertBox) return;
      alertBox.className = 'alert-box ' + className;
      alertBox.innerHTML = message;
      alertBox.style.display = 'flex';
    },

    showToast: function(message) {
      var toast = document.getElementById('appToast');
      if (!toast) {
        toast = document.createElement('div');
        toast.id = 'appToast';
        toast.style.position = 'fixed';
        toast.style.bottom = '80px';
        toast.style.left = '50%';
        toast.style.transform = 'translateX(-50%)';
        toast.style.background = 'rgba(15, 23, 42, 0.95)';
        toast.style.color = '#f8fafc';
        toast.style.border = '1px solid #f59e0b';
        toast.style.boxShadow = '0 10px 25px rgba(0,0,0,0.5)';
        toast.style.borderRadius = '30px';
        toast.style.padding = '10px 22px';
        toast.style.fontSize = '0.85rem';
        toast.style.fontWeight = '600';
        toast.style.zIndex = '9999';
        toast.style.transition = 'all 0.3s ease';
        toast.style.display = 'none';
        document.body.appendChild(toast);
      }

      toast.innerText = message;
      toast.style.display = 'block';
      toast.style.opacity = '1';

      setTimeout(function() {
        toast.style.opacity = '0';
        setTimeout(function() { toast.style.display = 'none'; }, 300);
      }, 3200);
    },

    initEvents: function() {
      var self = this;

      // Student Form
      var studentForm = document.getElementById('studentRegForm');
      if (studentForm) {
        studentForm.addEventListener('submit', function(e) { self.handleStudentSubmit(e); });
      }

      // Teacher Form
      var teacherForm = document.getElementById('teacherRegForm');
      if (teacherForm) {
        teacherForm.addEventListener('submit', function(e) { self.handleTeacherSubmit(e); });
      }

      // Payment Form
      var paymentForm = document.getElementById('paymentVerificationForm');
      if (paymentForm) {
        paymentForm.addEventListener('submit', function(e) { self.handlePaymentSubmit(e); });
      }

      // Admin Login Form
      var adminLoginForm = document.getElementById('adminLoginForm');
      if (adminLoginForm) {
        adminLoginForm.addEventListener('submit', function(e) { self.handleAdminLogin(e); });
      }

      // Settings Form
      var settingsForm = document.getElementById('adminSettingsForm');
      if (settingsForm) {
        settingsForm.addEventListener('submit', function(e) { self.handleSaveSettings(e); });
      }

      // Quick Search input in nav / hero
      var searchInput = document.getElementById('quickPassSearchInput');
      if (searchInput) {
        searchInput.addEventListener('keydown', function(e) {
          if (e.key === 'Enter') {
            self.searchPassByQuery(searchInput.value);
          }
        });
      }
    }
  };

  // Expose to window for inline HTML onclick handlers
  window.GarbaApp = GarbaApp;

  // Initialize on DOMContentLoaded
  document.addEventListener('DOMContentLoaded', function() {
    GarbaApp.init();
  });

})(window);
