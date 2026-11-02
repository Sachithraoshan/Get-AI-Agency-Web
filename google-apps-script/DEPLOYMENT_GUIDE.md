# GET AI Agency - Lead Management System Deployment Guide

This guide details how to set up the Google Sheets and Google Apps Script Web App backend for the GET AI Agency enquiry management system.

---

### Step 1: Create the Google Sheet
1. Open Google Sheets ([sheets.new](https://sheets.new)).
2. Name the spreadsheet: **GET AI Agency Leads**.
3. Rename the first sheet tab from `Sheet1` to: **Enquiries**.
4. In Row 1, set the 11 column headers (A to K):
   - **A1**: `ID`
   - **B1**: `Timestamp`
   - **C1**: `Name`
   - **D1**: `Business Name`
   - **E1**: `Email`
   - **F1**: `Phone`
   - **G1**: `Service`
   - **H1**: `Message`
   - **I1**: `Status`
   - **J1**: `Source`
   - **K1**: `Notes`

---

### Step 2: Open Google Apps Script
1. In your Google Sheet, click **Extensions** in the top menu.
2. Select **Apps Script**.
3. Name the Apps Script project: **GET AI Agency Webhook**.

---

### Step 3: Paste the Apps Script Code
1. Delete any boilerplate code inside `Code.gs`.
2. Copy the entire contents of `google-apps-script/Code.gs` and paste it into `Code.gs`.
3. Verify that `NOTIFICATION_EMAIL = "hello@getai.com.lk"` is set.
4. Click the **Save** icon (diskette).

---

### Step 4: Deploy as a Web App
1. In the top right corner of the Apps Script editor, click **Deploy** > **New deployment**.
2. Click the gear icon next to "Select type" and choose **Web app**.
3. Configure the deployment settings:
   - **Description**: `GET AI Leads Production v1`
   - **Execute as**: `Me (your Google account email)`
   - **Who has access**: `Anyone` *(Note: This allows the public contact form to submit POST requests without Google login prompt)*
4. Click **Deploy**.

---

### Step 5: Authorize Permissions
1. Google will display an "Authorization required" prompt.
2. Click **Authorize access**.
3. Select your Google account (`sachithraoshan769@gmail.com` or agency account).
4. If you see the "Google hasn't verified this app" screen, click **Advanced** > **Go to GET AI Agency Webhook (unsafe)**.
5. Click **Allow** to grant permission to access Sheets and send emails.

---

### Step 6: Copy the Web App URL
1. Copy the generated **Web app URL** (it looks like: `https://script.google.com/macros/s/AKfycbx.../exec`).
2. Keep this URL ready for Step 7.

---

### Step 7: Configure Environment Variables
1. Add the URL to your project's `.env` file (or container environment variables):
   ```env
   VITE_ENQUIRY_API_URL="https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec"
   ```
2. Also update `ADMIN_EMAILS` in `src/config/admin.ts` to include your authorized Google accounts.

---

### Step 8: Build and Run
1. Run `npm run build` or start your development server.
2. The website will automatically send form submissions to the configured endpoint.

---

### Step 9: Verification Checklist
- **Test Form Submission**: Submit a test enquiry on the website. Verify the success message displays.
- **Check Google Sheet**: Confirm a new row appears with auto-incremented ID (e.g. `GETAI-0001`), Timestamp, and Status `New`.
- **Check Email**: Check `hello@getai.com.lk` (or the configured email inbox) for the notification email.
- **Access Admin Dashboard**: Visit `/admin` on the website, sign in with your authorized email, view the new lead, update its status to `Contacted`, and add an internal note. Confirm the Google Sheet row updates live.
