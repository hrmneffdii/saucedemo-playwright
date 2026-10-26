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
}