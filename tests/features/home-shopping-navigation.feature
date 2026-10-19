Feature: Home page Shopping navigation
  Verify that authenticated users can reach Shopping from the home navigation.

  Scenario Outline: Shopping link is visible and opens the Shopping page
    Given I open the protected home page while unauthenticated
    Then I should see the sign-in screen
    When I sign in as "<username>" with password "<password>"
    Then I should be on the home page with Shopping navigation visible
    When I open Shopping from the navigation
    Then I should see the Shopping products page with authenticated navigation

    Examples:
      | username | password  |
      | admin    | Pass@9211 |
