# Scripted QA Login Page Test Plan

## Application Overview

Test the public Scripted QA sign-in page at https://www.scriptedqa.com/. The page displays demo credentials (admin / Pass@9211), accepts credentials through Username and Password fields, shows an inline incorrect-credentials message on failure, and routes valid sign-in to /home. Each scenario starts from a fresh unauthenticated browser context. Scenarios are intended for implementation as JavaScript Playwright tests.

## Test Scenarios

### 1. Login core functionality

**Seed:** `tests/seed.spec.ts`

#### 1.1. Login form renders with labeled fields and concealed password input

**File:** `tests/login.spec.js`

**Steps:**
  1. Open https://www.scriptedqa.com/ in a fresh unauthenticated browser context.
    - expect: The page title is Scripted QA.
    - expect: A Sign In heading, Username field, Password field, and Sign In button are visible.
  2. Inspect the displayed demo credentials and the Password field input type.
    - expect: The demo username admin and password Pass@9211 are displayed.
    - expect: The Password field uses a concealed password input type.

#### 1.2. Successful login with displayed demo credentials

**File:** `tests/login.spec.js`

**Steps:**
  1. Open the login page and enter username admin and password Pass@9211.
    - expect: The entered credentials appear in their respective fields; the password remains concealed.
  2. Click Sign In.
    - expect: The browser navigates to /home.
    - expect: The authenticated page displays the welcome heading and a Sign Out button.

#### 1.3. Incorrect credentials are rejected with inline feedback

**File:** `tests/login.spec.js`

**Steps:**
  1. Open the login page and enter an invalid username and password.
    - expect: The login page remains visible before submission.
  2. Click Sign In.
    - expect: The user remains on the login page.
    - expect: The inline message Oops! The credentials are incorrect. is visible.
    - expect: The sign-in form remains available for another attempt.

#### 1.4. Empty credential submission is handled

**File:** `tests/login.spec.js`

**Steps:**
  1. Open the login page and leave both fields empty.
    - expect: Both fields are empty and the Sign In button is available.
  2. Click Sign In.
    - expect: The user remains on the login page.
    - expect: The inline message Oops! The credentials are incorrect. is visible.
    - expect: The page does not navigate to /home.

#### 1.5. Keyboard Enter submits valid credentials

**File:** `tests/login.spec.js`

**Steps:**
  1. Open the login page, enter username admin, then enter password Pass@9211.
    - expect: The username and password are accepted as field values, with the password concealed.
  2. Press Enter while focused in the Password field.
    - expect: The form submits without requiring a mouse click.
    - expect: The browser navigates to /home and displays the authenticated welcome heading and Sign Out button.
