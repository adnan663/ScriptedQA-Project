const { Given, Then, When } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { demoCredentials } = require('../utils/test-data');

Given('I open Cart and authenticate with one Headphones item', async function () {
  await this.cartPage.openCartRoute();
  await expect(this.loginPage.signInHeading).toBeVisible();
  await this.loginPage.signIn(demoCredentials);
  await expect(this.page).toHaveURL(/\/home$/);
  await this.homePage.openShopping();
  await this.shoppingPage.addProductToCart('Headphones');
  await this.shoppingPage.openCart();
  await expect(this.cartPage.billHeading).toBeVisible();
});

Then('the cart shows Headphones quantity and totals', async function () {
  await expect(this.cartPage.headphonesName).toHaveCount(1);
  await expect(this.cartPage.quantityOne).toBeVisible();
  await expect(this.cartPage.itemPriceAndTotals).toHaveCount(2);
  await expect(this.cartPage.grandTotalLabel).toBeVisible();
});

Then('the cart actions are available', async function () {
  await expect(this.cartPage.clearCartButton).toBeVisible();
  await expect(this.cartPage.backToShoppingButton).toBeVisible();
  await expect(this.cartPage.placeOrderButton).toBeVisible();
});

When('I clear the cart', async function () {
  await this.cartPage.clearCart();
});

Then('the cart empty state is displayed', async function () {
  await expect(this.cartPage.emptyCartMessage).toBeVisible();
  await expect(this.cartPage.headphonesName).toHaveCount(0);
  await expect(this.cartPage.itemPriceAndTotals).toHaveCount(0);
  await expect(this.cartPage.grandTotalLabel).toHaveCount(0);
});

Then('I can return to Shopping', async function () {
  await expect(this.cartPage.backToShoppingButton).toBeVisible();
});

When('I return to Shopping from the cart', async function () {
  await this.cartPage.returnToShopping();
});

Then('the product catalog is displayed', async function () {
  await expect(this.page).toHaveURL(/\/shopping$/);
  await expect(this.shoppingPage.productsHeading).toBeVisible();
});

When('I place the order', async function () {
  await this.cartPage.placeOrder();
});

Then('the successful order confirmation is displayed', async function () {
  await expect(this.cartPage.orderSuccessHeading).toBeVisible();
  await expect(this.cartPage.orderThankYouMessage).toBeVisible();
  await expect(this.cartPage.headphonesName).toHaveCount(0);
  await expect(this.cartPage.clearCartButton).toBeHidden();
  await expect(this.cartPage.placeOrderButton).toBeHidden();
});
