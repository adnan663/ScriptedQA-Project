const { appConfig } = require('./test-data');

function buildAppUrl(path) {
  return new URL(path, appConfig.baseUrl).toString();
}

async function navigateTo(page, path) {
  await page.goto(buildAppUrl(path));
}

module.exports = { buildAppUrl, navigateTo };
