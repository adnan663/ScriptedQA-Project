# Scripted QA Cart Page Test Plan

## Application Overview

Verify four core Cart page behaviors: populated bill details and totals, clearing the cart, returning to Shopping, and placing an order. A fresh browser context cannot open /cart without authentication, so each independent case signs in using the demo credentials displayed by the application (admin / Pass@9211), adds Headphones from Shopping, and opens the cart as needed.

## Test Scenarios

### 1. Cart page core functionality

**Seed:** `tests/seed.spec.ts`

#### 1.1. Cart displays item details and correct totals

**File:** `tests/cart-page.spec.js`

**Steps:**
  1. Start with a fresh unauthenticated browser context, open https://www.scriptedqa.com/cart, and sign in with the displayed demo credentials when redirected.
    - expect: The authenticated user can access the application.
  2. Open Shopping, add one Headphones item, and open the checkout/cart page.
    - expect: The browser is on /cart and the Bill heading is visible.
  3. Review the item row and totals.
    - expect: The cart shows Headphones with price $200.00, quantity x1, and line total $200.00.
    - expect: The Grand Total is $200.00.
    - expect: Clear Cart, Back to Shopping, and Place Order controls are available.

#### 1.2. Clear Cart removes items and shows the empty state

**File:** `tests/cart-page.spec.js`

**Steps:**
  1. Start fresh, sign in, add one Headphones item from Shopping, and open /cart.
    - expect: The populated cart shows Headphones and a $200.00 grand total.
  2. Click Clear Cart.
    - expect: The item row and total are removed.
    - expect: The page displays Your cart is empty.
    - expect: Back to Shopping remains available.

#### 1.3. Back to Shopping returns to the product catalog

**File:** `tests/cart-page.spec.js`

**Steps:**
  1. Start fresh, sign in, add one Headphones item from Shopping, and open /cart.
    - expect: The browser is on /cart and the Back to Shopping button is visible.
  2. Click Back to Shopping.
    - expect: The browser navigates to /shopping.
    - expect: The Products heading and product catalog are visible.

#### 1.4. Place Order displays successful confirmation

**File:** `tests/cart-page.spec.js`

**Steps:**
  1. Start fresh, sign in, add one Headphones item from Shopping, and open /cart.
    - expect: The populated cart shows Headphones and a $200.00 grand total.
  2. Click Place Order.
    - expect: The page displays Order Placed Successfully! and Thank you for your purchase.
    - expect: The order controls and bill rows are replaced by the confirmation state.
