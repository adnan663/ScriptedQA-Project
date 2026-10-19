const { test: base, expect } = require('@playwright/test');
const { CartPage } = require('../pages/cart.page');
const { HomePage } = require('../pages/home.page');
const { LoginPage } = require('../pages/login.page');
const { ShoppingPage } = require('../pages/shopping.page');

const test = base.extend({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  shoppingPage: async ({ page }, use) => {
    await use(new ShoppingPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
});

module.exports = { test, expect };
