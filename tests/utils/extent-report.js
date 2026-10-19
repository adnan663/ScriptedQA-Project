const fs = require('node:fs');
const path = require('node:path');

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[character]);
}

function writeExtentReport({ outputFolder, title, runStatus, results, duration }) {
  fs.mkdirSync(outputFolder, { recursive: true });

  const counts = results.reduce((summary, test) => {
    summary[test.status] = (summary[test.status] || 0) + 1;
    return summary;
  }, {});
  const rows = results.map((test) => `
    <tr>
      <td>${escapeHtml(test.title)}</td>
      <td>${escapeHtml(test.project)}</td>
      <td><span class="status ${escapeHtml(test.status)}">${escapeHtml(test.status)}</span></td>
      <td>${(test.duration / 1000).toFixed(2)}s</td>
      <td>${test.errors.length ? `<pre>${escapeHtml(test.errors.join('\n\n'))}</pre>` : '-'}</td>
    </tr>`).join('');
  const report = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Playwright Extent Report</title>
  <style>
    :root { color-scheme: light; font: 14px/1.5 "Segoe UI", sans-serif; color: #1f2937; background: #f4f6f8; }
    body { max-width: 1200px; margin: 32px auto; padding: 0 20px; }
    header { display: flex; justify-content: space-between; align-items: end; border-bottom: 1px solid #d8dee6; padding-bottom: 18px; }
    h1 { margin: 0; font-size: 26px; }
    .meta { color: #596579; }
    .summary { display: flex; gap: 12px; margin: 20px 0; }
    .summary div { min-width: 110px; padding: 12px 16px; background: white; border: 1px solid #d8dee6; border-radius: 4px; }
    .summary strong { display: block; font-size: 22px; }
    table { width: 100%; border-collapse: collapse; background: white; }
    th, td { text-align: left; padding: 11px 12px; border-bottom: 1px solid #e5e9ef; vertical-align: top; }
    th { background: #eef2f6; }
    .status { font-weight: 700; text-transform: uppercase; }
    .passed { color: #18794e; } .failed, .timedOut { color: #b42318; }
    .skipped, .interrupted, .pending, .undefined { color: #946200; }
    pre { white-space: pre-wrap; margin: 0; color: #b42318; }
    @media (max-width: 760px) { body { margin-top: 16px; } .summary { flex-wrap: wrap; } table { font-size: 12px; } th, td { padding: 8px; } }
  </style>
</head>
<body>
  <header>
    <div><h1>Playwright Extent Report</h1><div class="meta">${escapeHtml(title)}</div></div>
    <div class="meta">Generated ${new Date().toLocaleString()} | Run status: ${escapeHtml(runStatus)}</div>
  </header>
  <section class="summary" aria-label="Run summary">
    <div><strong>${results.length}</strong>Total</div>
    <div><strong>${counts.passed || 0}</strong>Passed</div>
    <div><strong>${counts.failed || 0}</strong>Failed</div>
    <div><strong>${counts.skipped || 0}</strong>Skipped</div>
    <div><strong>${(duration / 1000).toFixed(2)}s</strong>Duration</div>
  </section>
  <table>
    <thead><tr><th>Test</th><th>Project</th><th>Status</th><th>Duration</th><th>Errors</th></tr></thead>
    <tbody>${rows || '<tr><td colspan="5">No tests were reported.</td></tr>'}</tbody>
  </table>
</body>
</html>`;

  const reportPath = path.join(outputFolder, 'extent-report.html');
  fs.writeFileSync(reportPath, report, 'utf8');
  return reportPath;
}

module.exports = { writeExtentReport };
