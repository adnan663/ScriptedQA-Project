const { Given, Then, When } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

Given('I open the login page', async function () {
  await this.loginPage.openLogin();
});

Then('the page title is Scripted QA', async function () {
  await expect(this.page).toHaveTitle('Scripted QA');
});

Then('the sign-in form fields are visible', async function () {
  await expect(this.loginPage.signInHeading).toBeVisible();
  await expect(this.loginPage.usernameInput).toBeVisible();
  await expect(this.loginPage.passwordInput).toBeVisible();
  await expect(this.loginPage.signInButton).toBeVisible();
});

Then('the demo credentials are displayed', async function () {
  await expect(this.loginPage.displayedDemoUsername).toBeVisible();
  await expect(this.loginPage.displayedDemoPassword).toBeVisible();
});

Then('the password field is concealed', async function () {
  await expect(this.loginPage.passwordInput).toHaveAttribute('type', 'password');
});

When('I enter credentials {string} and {string}', async function (username, password) {
  await this.loginPage.enterCredentials({ username, password });
});

Then('the entered username {string} and password {string} are present and the password is concealed', async function (username, password) {
  await expect(this.loginPage.usernameInput).toHaveValue(username);
  await expect(this.loginPage.passwordInput).toHaveValue(password);
  await expect(this.loginPage.passwordInput).toHaveAttribute('type', 'password');
});

When('I submit the sign-in form', async function () {
  await this.loginPage.submitForm();
});

When('I submit the sign-in form with Enter', async function () {
  await this.loginPage.submitWithEnter();
});

Then('I am authenticated on the home page', async function () {
  await expect(this.page).toHaveURL(/\/home$/);
  await expect(this.homePage.welcomeHeading).toBeVisible();
  await expect(this.homePage.signOutButton).toBeVisible();
});

Then('the sign-in page remains visible before submission', async function () {
  await expect(this.page).toHaveURL(/\/$/);
  await expect(this.loginPage.signInHeading).toBeVisible();
});

Then('the incorrect credentials message is shown', async function () {
  await expect(this.loginPage.incorrectCredentialsMessage).toBeVisible();
  await expect(this.page).not.toHaveURL(/\/home$/);
});

Then('the sign-in form remains available', async function () {
  await expect(this.loginPage.usernameInput).toBeVisible();
  await expect(this.loginPage.passwordInput).toBeVisible();
  await expect(this.loginPage.signInButton).toBeVisible();
});

Then('the empty sign-in form is ready for submission', async function () {
  await expect(this.loginPage.usernameInput).toHaveValue('');
  await expect(this.loginPage.passwordInput).toHaveValue('');
  await expect(this.loginPage.signInButton).toBeEnabled();
});
