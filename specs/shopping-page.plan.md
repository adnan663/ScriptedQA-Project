# Scripted QA Shopping Page Test Plan

## Application Overview

Cover four core Shopping page functions: product catalog rendering, text/category/price filtering, adding products to the cart, and reviewing the cart/checkout summary. The Shopping route requires authentication in a fresh browser context, so each independent test starts unauthenticated and signs in with the demo credentials displayed on the login page (admin / Pass@9211).

## Test Scenarios

### 1. Shopping page core functionality

**Seed:** `tests/seed.spec.ts`

#### 1.1. Product catalog displays products and purchase controls

**File:** `tests/shopping-page.spec.js`

**Steps:**
  1. Start with a fresh unauthenticated browser context and navigate to https://www.scriptedqa.com/shopping.
    - expect: The application redirects to the sign-in page.
  2. Sign in with the displayed demo credentials, then open Shopping from the Categories navigation.
    - expect: The browser reaches /shopping and displays the Products heading.
    - expect: The catalog displays product cards with product images, names, categories, prices, and Add to Cart buttons.
    - expect: Representative products such as Laptop, Headphones, Mango, and Treadmill are visible.

#### 1.2. Search, category, price, and reset filters work

**File:** `tests/shopping-page.spec.js`

**Steps:**
  1. Sign in from a fresh browser context and open the Shopping page.
    - expect: The search field, category dropdown, and price dropdown are visible.
  2. Select electronics in the category dropdown and $100 to $500 in the price dropdown.
    - expect: Headphones ($200), Microwave Oven ($290), and Smartwatch ($499) are displayed.
    - expect: Products outside the selected category or price range, such as Laptop ($1000), are not displayed.
  3. Enter Headphones in the product search field.
    - expect: Only the Headphones product is displayed among the matching products.
  4. Clear the search, then use Reset Filters.
    - expect: The category and price dropdowns return to their default All values.
    - expect: The full unfiltered product catalog is restored.

#### 1.3. Add to Cart updates the cart count

**File:** `tests/shopping-page.spec.js`

**Steps:**
  1. Sign in from a fresh browser context and open the Shopping page with an empty cart.
    - expect: The checkout button shows Checkout Items: 0.
    - expect: At least one product card has an Add to Cart button.
  2. Click Add to Cart on the Headphones product card.
    - expect: The checkout button updates to Checkout Items: 1.
    - expect: The Headphones button reflects one item added (Add to Cart (1)).

#### 1.4. Checkout opens a cart summary with the added product

**File:** `tests/shopping-page.spec.js`

**Steps:**
  1. Sign in from a fresh browser context, open the Shopping page, and add Headphones to the cart.
    - expect: The checkout button shows Checkout Items: 1.
  2. Click the checkout button.
    - expect: The browser navigates to /cart.
    - expect: The cart page displays the Bill heading and a row for Headphones with quantity x1 and price $200.00.
    - expect: The grand total is $200.00.
    - expect: Clear Cart, Back to Shopping, and Place Order controls are visible.
