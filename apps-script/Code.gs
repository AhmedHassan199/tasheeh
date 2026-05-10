/**
 * أكاديمية تصحيح — Google Apps Script Web App
 *
 * كيفية الاستخدام:
 *  1) افتح Google Sheets جديد (أو قائم) للأكاديمية.
 *  2) Extensions → Apps Script
 *  3) امسح أى كود موجود والصق هذا الملف بالكامل.
 *  4) عدّل ثابت ACADEMY_EMAIL لو لزم.
 *  5) Deploy → New deployment → Type: Web app
 *       - Execute as: Me
 *       - Who has access: Anyone
 *  6) انسخ الـ /exec URL وضعه فى ملف .env بمشروع React:
 *       VITE_REGISTRATION_ENDPOINT=https://script.google.com/.../exec
 *
 * ملاحظات:
 *  - الـ frontend يبعث JSON بـ Content-Type: text/plain لتجنّب CORS preflight.
 *  - السكربت يُنشئ شيت "Registrations" تلقائيًا عند أول طلب ويضع رؤوس الأعمدة.
 *  - عند كل طلب يتم إرسال إيميل تنبيه HTML لـ ACADEMY_EMAIL.
 */

const ACADEMY_EMAIL = 'tasheeh.online@gmail.com';
const SHEET_NAME = 'Registrations';

const SCRIPT_LABELS = {
  naskh:   'النسخ',
  thuluth: 'الثلث',
  diwani:  'الديوانى',
  jali:    'الثلث الجلى',
  ruqaa:   'الرقعة',
};

const TRACK_LABELS = {
  recorded:   'التصحيح التقليدى (مسجَّل)',
  live:       'التصحيح المباشر (Zoom)',
  intensive:  'دورات مكثفة جماعية',
  foundation: 'تأسيس المبتدئين',
};

const FILTER_LABELS = {
  regular: 'تحسين خط عادى',
  art:     'تعلم الخط كفَن',
};

const GOAL_LABELS = {
  scratch:      'تعلّم من الصفر',
  hobby:        'هواية ممتعة',
  master:       'إتقان خط معيّن',
  ijazah:       'الحصول على إجازة',
  fast:         'تعلّم بسرعة',
  quickImprove: 'تحسين سريع',
};

const PATH_LABELS = {
  A: 'مسار طويل الأمد',
  B: 'مسار مكثف',
  C: 'مسار التأسيس',
};

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents || '{}');

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) sheet = ss.insertSheet(SHEET_NAME);

    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Timestamp', 'Lang',
        'Filter', 'Goal', 'Path', 'Commitment',
        'Track', 'Scripts', 'Teacher',
        'Name', 'Email', 'Phone',
        'Country', 'Age',
      ]);
      sheet.getRange(1, 1, 1, 14).setFontWeight('bold');
    }

    const scriptsLabel = (payload.scripts || []).map((id) => SCRIPT_LABELS[id] || id).join(' + ');
    const trackLabel   = TRACK_LABELS[payload.track] || payload.track || '';
    const filterLabel  = FILTER_LABELS[payload.filter] || payload.filter || '';
    const goalLabel    = GOAL_LABELS[payload.goal] || payload.goal || '';
    const pathLabel    = PATH_LABELS[payload.path] || payload.path || '';

    sheet.appendRow([
      new Date(), payload.lang || '',
      filterLabel, goalLabel, pathLabel, payload.commitment || '',
      trackLabel, scriptsLabel, payload.teacher || '',
      payload.name || '', payload.email || '', payload.phone || '',
      payload.country || '', payload.age || '',
    ]);

    sendNotificationEmail({ payload, scriptsLabel, trackLabel, filterLabel, goalLabel, pathLabel });

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService
    .createTextOutput('Tasheeh registration endpoint is live.')
    .setMimeType(ContentService.MimeType.TEXT);
}

function sendNotificationEmail({ payload, scriptsLabel, trackLabel, filterLabel, goalLabel, pathLabel }) {
  const subject = `📝 تسجيل جديد: ${payload.name || '—'}`;
  const html = `
    <div style="font-family:Cairo,Tahoma,sans-serif;direction:rtl;max-width:600px">
      <div style="background:#F44E1A;color:#fff;padding:18px 24px;border-radius:14px 14px 0 0">
        <h2 style="margin:0;font-size:20px">تسجيل جديد — أكاديمية تصحيح</h2>
      </div>
      <div style="background:#F5EDE0;padding:22px 24px;border-radius:0 0 14px 14px">
        ${row('الاسم',   payload.name)}
        ${row('البريد',  payload.email,   true)}
        ${row('الهاتف',  payload.phone,   true)}
        ${row('الدولة',  payload.country)}
        ${row('العمر',   payload.age)}
        <hr style="border:none;border-top:1px solid rgba(0,0,0,0.08);margin:14px 0"/>
        ${row('الاهتمام',     filterLabel)}
        ${row('الهدف',         goalLabel)}
        ${row('المسار',        pathLabel)}
        ${row('الالتزام',      payload.commitment)}
        ${row('آلية الدراسة',  trackLabel)}
        ${row('الخطوط',        scriptsLabel)}
        ${row('الأستاذ',       payload.teacher)}
      </div>
    </div>
  `;
  MailApp.sendEmail({
    to: ACADEMY_EMAIL,
    subject,
    htmlBody: html,
    name: 'تصحيح — تسجيلات الموقع',
  });
}

function row(label, value, ltr) {
  if (!value) return '';
  const dir = ltr ? 'ltr' : 'rtl';
  return `
    <div style="display:flex;justify-content:space-between;gap:12px;padding:6px 0">
      <span style="font-weight:700;color:#1F140A">${label}</span>
      <span style="color:#1F140A;direction:${dir};text-align:${ltr ? 'left' : 'right'}">${escapeHtml(value)}</span>
    </div>
  `;
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}
