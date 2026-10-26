import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test.describe('Inventory: gambar produk', () => {
  test('standard_user: setiap produk punya gambar unik (kontrol)', async ({ page }) => {
    const login = new LoginPage(page);
    const inventory = new InventoryPage(page);

    await login.goto();
    await login.login('standard_user');
    await inventory.expectLoaded();

    const sources = await inventory.getImageSources();
    expect(new Set(sources).size).toBe(sources.length);
  });

  // BUG-001: problem_user melihat gambar yang sama untuk semua produk
  test('problem_user: setiap produk punya gambar unik', async ({ page }) => {
    const login = new LoginPage(page);
    const inventory = new InventoryPage(page);

    await login.goto();
    await login.login('problem_user');
    await inventory.expectLoaded();

    const sources = await inventory.getImageSources();
    expect(
      new Set(sources).size,
      `Gambar yang tampil: ${JSON.stringify(sources)}`
    ).toBe(sources.length);
  });
});