const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: '.',
  testMatch: 'home-shopping-navigation.spec.js',
  fullyParallel: true,
  reporter: [
    ['html', { outputFolder: 'reports/playwright', open: 'never' }],
    ['./reporters/extent-reporter.js', { outputFolder: 'reports' }],
  ],
  projects: [
    {
      name: 'Chrome',
      use: { browserName: 'chromium', channel: 'chrome' },
    },
  ],
});
