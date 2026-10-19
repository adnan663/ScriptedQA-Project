Feature: Cart page core functionality
  Verify cart totals, clearing, return navigation, and order confirmation.

  Scenario: Cart displays item details and correct totals
    Given I open Cart and authenticate with one Headphones item
    Then the cart shows Headphones quantity and totals
    And the cart actions are available

  Scenario: Clear Cart removes items and shows the empty state
    Given I open Cart and authenticate with one Headphones item
    When I clear the cart
    Then the cart empty state is displayed
    And I can return to Shopping

  Scenario: Back to Shopping returns to the product catalog
    Given I open Cart and authenticate with one Headphones item
    When I return to Shopping from the cart
    Then the product catalog is displayed

  Scenario: Place Order displays successful confirmation
    Given I open Cart and authenticate with one Headphones item
    When I place the order
    Then the successful order confirmation is displayed
