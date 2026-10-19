const { BasePage } = require('./base.page');

class HomePage extends BasePage {
  constructor(page) {
    super(page);
    this.welcomeHeading = page.getByRole('heading', { name: /Welcome back, Automation Engineer/ });
  }

  async openShopping() {
    await this.shoppingLink.click();
  }
}

module.exports = { HomePage };
