const { Given, Then, When } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

Given('I open the protected home page while unauthenticated', async function () {
  await this.loginPage.openHomeRoute();
});

Then('I should see the sign-in screen', async function () {
  await expect(this.loginPage.signInHeading).toBeVisible();
});

When('I sign in as {string} with password {string}', async function (username, password) {
  await this.loginPage.signIn({ username, password });
});

Then('I should be on the home page with Shopping navigation visible', async function () {
  await expect(this.page).toHaveURL(/\/home$/);
  await expect(this.homePage.categoriesHeading).toBeVisible();
  await expect(this.homePage.shoppingLink).toBeVisible();
});

When('I open Shopping from the navigation', async function () {
  await this.homePage.openShopping();
});

Then('I should see the Shopping products page with authenticated navigation', async function () {
  await expect(this.page).toHaveURL(/\/shopping$/);
  await expect(this.shoppingPage.productsHeading).toBeVisible();
  await expect(this.shoppingPage.shoppingLink).toBeVisible();
  await expect(this.shoppingPage.signOutButton).toBeVisible();
});
