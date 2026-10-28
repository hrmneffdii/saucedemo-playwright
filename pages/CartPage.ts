import { Locator, Page } from '@playwright/test';

export class CartPage {
  readonly items: Locator;
  readonly itemNames: Locator;
  readonly checkoutButton: Locator;

  constructor(private page: Page) {
    this.items = page.locator('.cart_item');
    this.itemNames = page.locator('.cart_item .inventory_item_name');
    this.checkoutButton = page.getByTestId('checkout');
  }

  async removeItem(name: string) {
    await this.items
      .filter({ hasText: name })
      .getByRole('button', { name: 'Remove' })
      .click();
  }

  async startCheckout() {
    await this.checkoutButton.click();
  }
}