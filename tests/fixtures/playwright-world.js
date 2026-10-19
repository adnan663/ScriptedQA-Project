const {
  After,
  Before,
  World,
  setDefaultTimeout,
  setWorldConstructor,
} = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const { CartPage } = require('../pages/cart.page');
const { HomePage } = require('../pages/home.page');
const { LoginPage } = require('../pages/login.page');
const { ShoppingPage } = require('../pages/shopping.page');

setDefaultTimeout(30_000);

class PlaywrightWorld extends World {
  async start() {
    this.browser = await chromium.launch({
      channel: 'chrome',
      headless: process.env.HEADLESS !== 'false',
    });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
    this.loginPage = new LoginPage(this.page);
    this.homePage = new HomePage(this.page);
    this.shoppingPage = new ShoppingPage(this.page);
    this.cartPage = new CartPage(this.page);
  }

  async stop() {
    await this.context?.close();
    await this.browser?.close();
  }
}

setWorldConstructor(PlaywrightWorld);

Before(async function () {
  await this.start();
});

After(async function () {
  await this.stop();
});

module.exports = { PlaywrightWorld };
