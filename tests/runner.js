const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const { writeExtentReport } = require('./utils/extent-report');

function durationInMilliseconds(value) {
  if (typeof value === 'number') return value / 1_000_000;
  if (value && typeof value === 'object') {
    return (value.seconds || 0) * 1000 + (value.nanos || 0) / 1_000_000;
  }
  return 0;
}

function getScenarioStatus(steps) {
  const statuses = steps.map((step) => step.result?.status || 'unknown');
  return ['failed', 'ambiguous', 'undefined', 'pending', 'skipped', 'unknown']
    .find((status) => statuses.includes(status)) || 'passed';
}

const startedAt = Date.now();
const cucumberJsonPath = path.join(__dirname, 'reports', 'cucumber-report.json');
fs.rmSync(cucumberJsonPath, { force: true });

const cucumberArgs = process.argv.slice(2);
const headed = cucumberArgs.includes('--headed');
const featurePath = cucumberArgs.find((argument) => !argument.startsWith('-'));
if (headed) process.env.HEADLESS = 'false';
if (featurePath) process.env.CUCUMBER_FEATURE = featurePath;

const cucumberEntry = require.resolve('@cucumber/cucumber');
const cucumberRoot = path.resolve(path.dirname(cucumberEntry), '..');
const cucumberCli = path.join(cucumberRoot, 'bin', 'cucumber.js');
const result = spawnSync(process.execPath, [
  cucumberCli,
  '--config',
  'cucumber.js',
  ...cucumberArgs.filter((argument) => argument.startsWith('-') && argument !== '--headed'),
], {
  cwd: __dirname,
  stdio: 'inherit',
});

if (fs.existsSync(cucumberJsonPath)) {
  try {
    const features = JSON.parse(fs.readFileSync(cucumberJsonPath, 'utf8'));
    const scenarios = features.flatMap((feature) => (feature.elements || [])
      .filter((element) => element.type === 'scenario')
      .map((scenario) => ({
        title: `${feature.name} > ${scenario.name}`,
        project: 'Chrome',
        status: getScenarioStatus(scenario.steps || []),
        duration: (scenario.steps || []).reduce(
          (total, step) => total + durationInMilliseconds(step.result?.duration),
          0,
        ),
        errors: (scenario.steps || [])
          .map((step) => step.result?.error_message)
          .filter(Boolean),
      })));

    writeExtentReport({
      outputFolder: path.join(__dirname, 'reports'),
      title: 'Cucumber Playwright scenarios',
      runStatus: result.status === 0 ? 'passed' : 'failed',
      results: scenarios,
      duration: Date.now() - startedAt,
    });
  } catch (error) {
    console.error('Unable to build the Extent-style report from the Cucumber JSON output:', error);
    process.exitCode = 1;
  }
}

if (result.error) {
  console.error(result.error);
  process.exitCode = 1;
} else if (process.exitCode !== 1) {
  process.exitCode = result.status ?? 1;
}
