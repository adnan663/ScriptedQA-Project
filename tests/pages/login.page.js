const { BasePage } = require('./base.page');

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.signInHeading = page.getByRole('heading', { name: 'Sign In' });
    this.usernameInput = page.getByRole('textbox', { name: 'Username' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.signInButton = page.getByRole('button', { name: 'Sign In' });
    this.displayedDemoUsername = page.getByText('admin', { exact: true });
    this.displayedDemoPassword = page.getByText('Pass@9211', { exact: true });
    this.incorrectCredentialsMessage = page.getByText('Oops! The credentials are incorrect.', { exact: true });
  }

  async openLogin() {
    await this.open('/');
  }

  async openHomeRoute() {
    await this.open('/home');
  }

  async signIn(credentials) {
    await this.enterCredentials(credentials);
    await this.submitForm();
  }

  async enterCredentials(credentials) {
    await this.usernameInput.fill(credentials.username);
    await this.passwordInput.fill(credentials.password);
  }

  async submitEmptyForm() {
    await this.submitForm();
  }

  async submitForm() {
    await this.signInButton.click();
  }

  async submitWithEnter() {
    await this.passwordInput.press('Enter');
  }
}

module.exports = { LoginPage };
