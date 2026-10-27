import { Page, expect } from '@playwright/test';

export class CartPage {
  constructor(private page: Page) {}

  async expectLoaded() {
    await expect(this.page).toHaveURL(/cart/);
  }

  async remove(productSlug: string) {
    await this.page.locator(`[data-test="remove-${productSlug}"]`).click();
  }

  async continueShopping() {
    await this.page.locator(`[data-test="continue-shopping"]`).click();
  }

  async checkout() {
    await this.page.locator(`[data-test="checkout"]`).click();
  }

  get cartBadge() {
    return this.page.locator('[data-test="shopping-cart-badge"]');
  }

  get inventoryItemName() {
    return this.page.locator('[data-test="inventory-item-name"]');
  }
}