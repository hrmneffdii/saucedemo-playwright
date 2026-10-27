import { Page, expect } from '@playwright/test';

export class InventoryPage {
  constructor(private page: Page) {}

  async expectLoaded() {
    await expect(this.page).toHaveURL(/inventory/);
    await expect(this.page.locator('.inventory_item')).toHaveCount(6);
  }

  async getImageSources(): Promise<(string | null)[]> {
    return this.page
      .locator('.inventory_item_img img')
      .evaluateAll((imgs) => imgs.map((img) => img.getAttribute('src')));
  }

  async addToCart(productSlug: string) {
    await this.page.locator(`[data-test="add-to-cart-${productSlug}"]`).click();
  }

  async remove(productSlug: string) {
    await this.page.locator(`[data-test="remove-${productSlug}"]`).click();
  }

  async goToCartPage() {
    await this.page.locator(`[data-test="shopping-cart-link"]`).click();
  }
  
  get cartBadge() {
    return this.page.locator('[data-test="shopping-cart-badge"]');
  }
}