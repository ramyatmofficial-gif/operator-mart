# Operator Mart: setup guide

Your GitHub repository needs three files: `index.html` (the app), `Code.gs` (the Google Sheet script) and this guide.

## Part A: Create the Google Sheet backend (about 10 minutes, one time only)

1. Open Google Sheets with your school Google account and create a blank sheet. Name it **Grade 7 – Operator Mart Badges**.
2. Click **Extensions → Apps Script**.
3. Delete everything in the editor. Paste in all of `Code.gs`.
4. On line 10, change `change-me-2026` to your own secret teacher key, for example `RTM-sis-7`. Students must not know this key.
5. Click **💾 Save**.
6. Click **Deploy → New deployment**. Click the ⚙ gear and choose **Web app**, then set:
   - **Execute as:** Me
   - **Who has access:** Anyone
7. Click **Deploy**, then **Authorize access**. Choose your account. If you see "Google hasn't verified this app", click **Advanced → Go to (project) → Allow**. This is your own script, so it is safe to allow.
8. Copy the **Web app URL**. It ends in `/exec`.

## Part B: Connect the app to the sheet

1. In GitHub, open `index.html` and click the ✏️ pencil to edit it.
2. Press **Ctrl + F** and search for `SHEET_URL`.
3. Paste your link between the quotes:
   ```js
   const SHEET_URL = "https://script.google.com/macros/s/XXXXXXXX/exec";
   ```
4. Click **Commit changes**. GitHub Pages updates in 1–2 minutes.

## Part C: Use it in class

- **Students:** they open your GitHub Pages link, type their name, section and roll number, and work through the lesson. In the Plenary they answer both exit-ticket questions, then press **🏅 Finish & get my badge**. Their result is saved to the sheet. They can download the **badge (PNG)** and the **report (PDF)**.
- **Teacher:** click **👩‍🏫 Teacher**, type your teacher key, and click **Load list**. You can filter by section, switch between the latest attempt and every attempt, see how many Gold, Silver and Bronze badges there are, and download the list as a **CSV** file. The Google Sheet also holds every result.

## Scoring (out of 20)

| Part | Points |
|---|---|
| Starter predictions (Program A and Program B) | 2 |
| Level 1: arithmetic program | 3 |
| Level 2: assignment program | 3 |
| Level 2: correct predictions | 5 |
| Level 3: shopping bill | 3 |
| Extension (G&T): two puzzles | 2 |
| Exit ticket: Q1 and Q2 | 2 |

**Gold** 16–20 · **Silver** 11–15 · **Bronze** 0–10

## Notes

- If the internet drops, the result is kept on that computer. The app tries to send it again every minute.
- If you edit `Code.gs` later, click **Deploy → Manage deployments → ✏️ → Version: New version → Deploy**. This keeps the same link.
- To start a new class on a shared lab computer, click the 👤 name chip at the top, or clear the browser data for the site.
