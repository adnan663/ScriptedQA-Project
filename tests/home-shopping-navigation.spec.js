// spec: specs/home-shopping-navigation.plan.md
// seed: tests/seed.spec.ts

const { test, expect } = require('./fixtures/test-fixtures');
const { demoCredentials } = require('./utils/test-data');

test.describe('Home page navigation', () => {
  test('Shopping link is visible and opens the Shopping page', async ({ page, loginPage, homePage, shoppingPage }) => {
    // 1. Open /home in a fresh unauthenticated context and verify redirect to sign-in.
    await loginPage.openHomeRoute();
    await expect(loginPage.signInHeading).toBeVisible();

    // 2. Enter the displayed demo username and password, then submit the credentials.
    await loginPage.signIn(demoCredentials);
    await expect(page).toHaveURL(/\/home$/);
    await expect(homePage.categoriesHeading).toBeVisible();
    await expect(homePage.shoppingLink).toBeVisible();

    // 3. Click Shopping from the Categories navigation.
    await homePage.openShopping();
    await expect(page).toHaveURL(/\/shopping$/);
    await expect(shoppingPage.productsHeading).toBeVisible();
    await expect(homePage.signOutButton).toBeVisible();
  });
});
