/**
 * GET AI AGENCY - LEAD MANAGEMENT SYSTEM
 * Google Apps Script Web App Endpoint
 * 
 * Target Google Sheet: "GET AI Agency Leads"
 * Target Sheet Tab: "Enquiries"
 * 
 * Columns:
 * A: ID
 * B: Timestamp
 * C: Name
 * D: Business Name
 * E: Email
 * F: Phone
 * G: Service
 * H: Message
 * I: Status
 * J: Source
 * K: Notes
 */

// Configuration
var SHEET_NAME = "Enquiries";
var NOTIFICATION_EMAIL = "hello@getai.com.lk";
var EMAIL_SUBJECT = "New GET AI Website Enquiry";

/**
 * Handle HTTP GET Requests
 * Used by the Private GET AI Admin Dashboard to read enquiries.
 */
function doGet(e) {
  var action = (e && e.parameter && e.parameter.action) ? e.parameter.action : "getEnquiries";
  
  if (action === "ping") {
    return createJsonResponse({ success: true, status: "active", timestamp: new Date().toISOString() });
  }

  if (action === "getEnquiries") {
    return handleGetEnquiries();
  }

  return createJsonResponse({ success: false, error: "Invalid action" });
}

/**
 * Handle HTTP POST Requests
 * Used to submit new enquiries from the website, or update status/notes from admin.
 */
function doPost(e) {
  try {
    var data = {};

    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (jsonErr) {
        // Fallback for form-encoded payload
        data = e.parameter || {};
      }
    } else if (e && e.parameter) {
      data = e.parameter;
    }

    var action = data.action || "createEnquiry";

    if (action === "createEnquiry") {
      return handleCreateEnquiry(data);
    } else if (action === "updateStatus") {
      return handleUpdateStatus(data);
    } else if (action === "updateNotes") {
      return handleUpdateNotes(data);
    }

    return createJsonResponse({ success: false, error: "Unrecognized action: " + action });

  } catch (err) {
    return createJsonResponse({ success: false, error: "Internal processing error: " + err.toString() });
  }
}

/**
 * Handle New Enquiry Submission
 * Flow:
 * 1. Validate form fields
 * 2. Save to Google Sheet
 * 3. Confirm successful save
 * 4. Send notification email
 * 5. Return success response
 */
function handleCreateEnquiry(data) {
  var name = (data.name || "").trim();
  var businessName = (data.businessName || "").trim();
  var email = (data.email || "").trim();
  var phone = (data.phone || "").trim();
  var service = (data.service || "").trim();
  var message = (data.message || "").trim();
  var source = (data.source || "Website").trim();

  // 1. Validation
  if (!name) {
    return createJsonResponse({ success: false, error: "Name is required" });
  }
  if (!email || !isValidEmail(email)) {
    return createJsonResponse({ success: false, error: "Valid email address is required" });
  }
  if (!service) {
    return createJsonResponse({ success: false, error: "Service selection is required" });
  }
  if (!message || message.length < 3) {
    return createJsonResponse({ success: false, error: "Message is required" });
  }

  // 2. Access Sheet
  var sheet = getOrCreateEnquiriesSheet();
  
  // 3. Generate Next Incremental ID (e.g. GETAI-0001)
  var nextId = getNextLeadId(sheet);
  var formattedTimestamp = Utilities.formatDate(new Date(), "Asia/Colombo", "yyyy-MM-dd HH:mm:ss");
  var status = "New";
  var notes = "";

  // 4. Save to Google Sheet
  sheet.appendRow([
    nextId,
    formattedTimestamp,
    name,
    businessName,
    email,
    phone,
    service,
    message,
    status,
    source,
    notes
  ]);

  // 5. Confirm Successful Save
  SpreadsheetApp.flush();

  // 6. Send Notification Email
  try {
    sendNotificationEmail({
      id: nextId,
      name: name,
      businessName: businessName,
      email: email,
      phone: phone,
      service: service,
      message: message,
      timestamp: formattedTimestamp,
      status: status
    });
  } catch (mailErr) {
    Logger.log("Email notification warning: " + mailErr.toString());
  }

  // 7. Return Success Response
  return createJsonResponse({
    success: true,
    id: nextId,
    message: "Enquiry received and recorded successfully."
  });
}

/**
 * Sends internal notification email to GET AI
 */
function sendNotificationEmail(lead) {
  var emailBody = 
    "New website enquiry received.\n\n" +
    "Lead ID:\n" + lead.id + "\n\n" +
    "Name:\n" + lead.name + "\n\n" +
    "Business:\n" + (lead.businessName || "Not provided") + "\n\n" +
    "Email:\n" + lead.email + "\n\n" +
    "Phone:\n" + (lead.phone || "Not provided") + "\n\n" +
    "Service:\n" + lead.service + "\n\n" +
    "Message:\n" + lead.message + "\n\n" +
    "Submitted:\n" + lead.timestamp + "\n\n" +
    "Status:\n" + lead.status;

  MailApp.sendEmail({
    to: NOTIFICATION_EMAIL,
    subject: EMAIL_SUBJECT,
    body: emailBody
  });
}

/**
 * Handle reading all enquiries for the private admin dashboard
 */
function handleGetEnquiries() {
  var sheet = getOrCreateEnquiriesSheet();
  var data = sheet.getDataRange().getValues();

  if (data.length <= 1) {
    return createJsonResponse({ success: true, enquiries: [] });
  }

  var enquiries = [];

  // Row 0 is header: ID, Timestamp, Name, Business Name, Email, Phone, Service, Message, Status, Source, Notes
  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    if (!row[0]) continue; // Skip empty rows

    enquiries.push({
      id: String(row[0]),
      timestamp: String(row[1]),
      name: String(row[2]),
      businessName: String(row[3]),
      email: String(row[4]),
      phone: String(row[5]),
      service: String(row[6]),
      message: String(row[7]),
      status: String(row[8] || "New"),
      source: String(row[9] || "Website"),
      notes: String(row[10] || "")
    });
  }

  // Return most recent first
  enquiries.reverse();

  return createJsonResponse({ success: true, enquiries: enquiries });
}

/**
 * Handle Updating Enquiry Status (New, Contacted, Discovery, Proposal, Won, Lost)
 */
function handleUpdateStatus(data) {
  var id = data.id;
  var newStatus = data.status;

  if (!id || !newStatus) {
    return createJsonResponse({ success: false, error: "Missing ID or Status" });
  }

  var validStatuses = ["New", "Contacted", "Discovery", "Proposal", "Won", "Lost"];
  if (validStatuses.indexOf(newStatus) === -1) {
    return createJsonResponse({ success: false, error: "Invalid status value" });
  }

  var sheet = getOrCreateEnquiriesSheet();
  var values = sheet.getDataRange().getValues();

  for (var i = 1; i < values.length; i++) {
    if (String(values[i][0]).trim() === String(id).trim()) {
      // Column I is index 9 (1-based)
      sheet.getRange(i + 1, 9).setValue(newStatus);
      SpreadsheetApp.flush();
      return createJsonResponse({ success: true, id: id, status: newStatus });
    }
  }

  return createJsonResponse({ success: false, error: "Enquiry ID not found: " + id });
}

/**
 * Handle Updating Internal Notes
 */
function handleUpdateNotes(data) {
  var id = data.id;
  var notes = data.notes || "";

  if (!id) {
    return createJsonResponse({ success: false, error: "Missing ID" });
  }

  var sheet = getOrCreateEnquiriesSheet();
  var values = sheet.getDataRange().getValues();

  for (var i = 1; i < values.length; i++) {
    if (String(values[i][0]).trim() === String(id).trim()) {
      // Column K is index 11 (1-based)
      sheet.getRange(i + 1, 11).setValue(notes);
      SpreadsheetApp.flush();
      return createJsonResponse({ success: true, id: id, notes: notes });
    }
  }

  return createJsonResponse({ success: false, error: "Enquiry ID not found: " + id });
}

/**
 * Helper: Find or initialize Enquiries sheet with required columns
 */
function getOrCreateEnquiriesSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    // Set headers
    sheet.appendRow([
      "ID",
      "Timestamp",
      "Name",
      "Business Name",
      "Email",
      "Phone",
      "Service",
      "Message",
      "Status",
      "Source",
      "Notes"
    ]);
    sheet.setFrozenRows(1);
  }

  return sheet;
}

/**
 * Helper: Generate next sequential ID (GETAI-0001, GETAI-0002, ...)
 */
function getNextLeadId(sheet) {
  var lastRow = sheet.getLastRow();
  if (lastRow <= 1) {
    return "GETAI-0001";
  }

  var idCol = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
  var maxNum = 0;

  for (var i = 0; i < idCol.length; i++) {
    var val = String(idCol[i][0]).trim();
    var match = val.match(/GETAI-(\d+)/);
    if (match && match[1]) {
      var num = parseInt(match[1], 10);
      if (num > maxNum) {
        maxNum = num;
      }
    }
  }

  var nextNum = maxNum + 1;
  var padded = ("0000" + nextNum).slice(-4);
  return "GETAI-" + padded;
}

/**
 * Basic email format validator
 */
function isValidEmail(email) {
  var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

/**
 * Helper: Build standard JSON output with CORS support
 */
function createJsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
