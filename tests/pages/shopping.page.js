const { BasePage } = require('./base.page');

class ShoppingPage extends BasePage {
  constructor(page) {
    super(page);
    this.productsHeading = page.getByRole('heading', { name: 'Products' });
    this.checkoutButton = page.getByRole('button', { name: /Checkout Items:/ });
  }

  async addProductToCart(productName) {
    const product = this.page.getByText(productName, { exact: true }).locator('..');
    await product.getByRole('button', { name: /Add to Cart/ }).click();
  }

  async openCart() {
    await this.checkoutButton.click();
  }
}

module.exports = { ShoppingPage };
