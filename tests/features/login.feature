Feature: Login core functionality
  Verify login form visibility, validation, authentication, and keyboard submission.

  Background:
    Given I open the login page

  Scenario: Login form renders with labeled fields and concealed password input
    Then the page title is Scripted QA
    And the sign-in form fields are visible
    And the demo credentials are displayed
    And the password field is concealed

  Scenario Outline: Successful login with displayed demo credentials
    When I enter credentials "<username>" and "<password>"
    Then the entered username "<username>" and password "<password>" are present and the password is concealed
    When I submit the sign-in form
    Then I am authenticated on the home page

    Examples:
      | username | password  |
      | admin    | Pass@9211 |

  Scenario Outline: Incorrect credentials are rejected with inline feedback
    When I enter credentials "<username>" and "<password>"
    Then the sign-in page remains visible before submission
    When I submit the sign-in form
    Then the incorrect credentials message is shown
    And the sign-in form remains available

    Examples:
      | username     | password       |
      | invalid-user | wrong-password |

  Scenario: Empty credential submission is handled
    Then the empty sign-in form is ready for submission
    When I submit the sign-in form
    Then the incorrect credentials message is shown
    And the sign-in form remains available

  Scenario Outline: Keyboard Enter submits valid credentials
    When I enter credentials "<username>" and "<password>"
    Then the entered username "<username>" and password "<password>" are present and the password is concealed
    When I submit the sign-in form with Enter
    Then I am authenticated on the home page

    Examples:
      | username | password  |
      | admin    | Pass@9211 |
