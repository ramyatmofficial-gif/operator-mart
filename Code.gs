/**
 * Operator Mart – class results backend (Google Apps Script)
 * Saves every student's score and badge into this Google Sheet,
 * and lets the teacher load the class list with a secret key.
 *
 * 1. Change TEACHER_KEY below to your own secret word.
 * 2. Deploy → New deployment → Web app → Execute as: Me → Who has access: Anyone.
 */
const TEACHER_KEY = 'change-me-2026';   // <-- change this
const SHEET_NAME  = 'Results';
const HEADERS = ['time','section','roll','name','score','max','badge','starter','l1','l2','l2pred','l3','ext','exit'];

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) sh = ss.insertSheet(SHEET_NAME);
  if (sh.getLastRow() === 0) {
    sh.appendRow(HEADERS);
    sh.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold').setBackground('#1d2433').setFontColor('#ffffff');
    sh.setFrozenRows(1);
  }
  return sh;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

// Students' browsers send their result here
function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const d = JSON.parse(e.postData.contents);
    const clean = v => String(v == null ? '' : v).slice(0, 80).replace(/^[=+\-@]/, "'$&");
    const row = HEADERS.map(h => h === 'time' ? new Date(d.time || Date.now()) : clean(d[h]));
    getSheet_().appendRow(row);
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

// Teacher panel reads the list here (needs the teacher key)
function doGet(e) {
  if (!e.parameter.key || e.parameter.key !== TEACHER_KEY) return json_({ ok: false, error: 'Wrong teacher key.' });
  const values = getSheet_().getDataRange().getValues();
  const head = values.shift();
  const rows = values.map(r => {
    const o = {};
    head.forEach((h, i) => o[h] = r[i] instanceof Date ? r[i].toISOString() : String(r[i]).replace(/^'/, ''));
    return o;
  });
  return json_({ ok: true, rows });
}
