const { navigateTo } = require('../utils/navigation');

class BasePage {
  constructor(page) {
    this.page = page;
    this.categoriesHeading = page.getByRole('heading', { name: 'Categories' });
    this.shoppingLink = page.getByRole('link', { name: 'Shopping' });
    this.signOutButton = page.getByRole('button', { name: 'Sign Out' });
  }

  async open(path) {
    await navigateTo(this.page, path);
  }
}

module.exports = { BasePage };
