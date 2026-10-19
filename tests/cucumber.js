const parallel = Number(process.env.CUCUMBER_PARALLEL || 2);
const featurePath = process.env.CUCUMBER_FEATURE;

if (!Number.isInteger(parallel) || parallel < 1) {
  throw new Error('CUCUMBER_PARALLEL must be a positive integer');
}

module.exports = {
  default: {
    paths: featurePath ? [featurePath] : ['features/**/*.feature'],
    require: ['fixtures/playwright-world.js', 'step-definitions/**/*.steps.js'],
    format: [
      'progress',
      'html:reports/cucumber-report.html',
      'json:reports/cucumber-report.json',
    ],
    publishQuiet: true,
    parallel,
  },
};
