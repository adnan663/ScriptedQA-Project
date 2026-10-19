# Home Page Shopping Navigation Test Case

## Application Overview

Verify the authenticated Scripted QA home page exposes the Shopping navigation link and that selecting it opens the Shopping products page. Unauthenticated direct access to /home redirects to sign-in, so the test logs in with the demo credentials before checking navigation.

## Test Scenarios

### 1. Home page navigation

**Seed:** `tests/seed.spec.ts`

#### 1.1. Shopping link is visible and opens the Shopping page

**File:** `tests/home-shopping-navigation.spec.js`

**Steps:**
  1. In a fresh unauthenticated browser context, open https://www.scriptedqa.com/home.
    - expect: The application redirects to the sign-in page because /home requires authentication.
  2. Enter the displayed demo username admin and password Pass@9211, then click Sign In.
    - expect: The browser navigates to /home.
    - expect: The home page shows the Categories navigation and a visible Shopping link.
  3. Click the Shopping link.
    - expect: The browser navigates to https://www.scriptedqa.com/shopping.
    - expect: The destination page displays the Products heading.
    - expect: The authenticated navigation remains visible.
