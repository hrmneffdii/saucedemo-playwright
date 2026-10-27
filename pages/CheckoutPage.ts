import { Page, expect } from '@playwright/test';

export class CheckoutPage {
  constructor(private page: Page) { }

  async cancel() {
    await this.page.locator(`[data-test="cancel"]`).click();
  }

  async continue() {
    await this.page.locator(`[data-test="continue"]`).click();
  }

  async fillInformation(firstName: string, lastName: string, postalCode: string) {
    await this.page.locator('[data-test="firstName"]').fill(firstName);
    await this.page.locator('[data-test="lastName"]').fill(lastName);
    await this.page.locator('[data-test="postalCode"]').fill(postalCode);
  }

  async finish() {
    await this.page.locator('[data-test="finish"]').click();
  }

  get completeHeader() {
    return this.page.locator('[data-test="complete-header"]');
  }
}