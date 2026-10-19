const { BasePage } = require('./base.page');

class CartPage extends BasePage {
  constructor(page) {
    super(page);
    this.billHeading = page.getByRole('heading', { name: /Bill/ });
    this.headphonesName = page.getByText('Headphones', { exact: true });
    this.itemPriceAndTotals = page.getByText('$200.00', { exact: true });
    this.quantityOne = page.getByText('x1', { exact: true });
    this.grandTotalLabel = page.getByText('Grand Total', { exact: true });
    this.clearCartButton = page.getByRole('button', { name: 'Clear Cart' });
    this.backToShoppingButton = page.getByRole('button', { name: 'Back to Shopping' });
    this.placeOrderButton = page.getByRole('button', { name: 'Place Order' });
    this.emptyCartMessage = page.getByText('Your cart is empty.', { exact: true });
    this.orderSuccessHeading = page.getByRole('heading', { name: 'Order Placed Successfully!' });
    this.orderThankYouMessage = page.getByText('Thank you for your purchase.', { exact: true });
  }

  async openCartRoute() {
    await this.open('/cart');
  }

  async clearCart() {
    await this.clearCartButton.click();
  }

  async returnToShopping() {
    await this.backToShoppingButton.click();
  }

  async placeOrder() {
    await this.placeOrderButton.click();
  }
}

module.exports = { CartPage };
