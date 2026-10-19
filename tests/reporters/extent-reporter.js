const path = require('node:path');
const { writeExtentReport } = require('../utils/extent-report');

class ExtentReporter {
  constructor(options = {}) {
    this.outputFolder = options.outputFolder || path.resolve(__dirname, '../reports');
    this.results = [];
    this.startedAt = 0;
  }

  onBegin() {
    this.startedAt = Date.now();
  }

  onTestEnd(test, result) {
    const project = typeof test.parent?.project === 'function'
      ? test.parent.project()?.name
      : undefined;

    this.results.push({
      title: test.titlePath().join(' > '),
      project: project || 'Chrome',
      status: result.status,
      duration: result.duration,
      errors: (result.errors || []).map((error) => error.message || String(error)),
    });
  }

  async onEnd(result) {
    writeExtentReport({
      outputFolder: this.outputFolder,
      title: 'Playwright test run',
      runStatus: result.status,
      results: this.results,
      duration: Date.now() - this.startedAt,
    });
  }
}

module.exports = ExtentReporter;
