import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test.describe('Inventory', () => {
  test('standard_user: add the backpack product into basket', async ({ page }) => {
    const login = new LoginPage(page);
    const inventory = new InventoryPage(page);

    await login.goto();
    await login.login('standard_user');
    await inventory.expectLoaded();

    await inventory.addToCart('sauce-labs-backpack');
    await expect(inventory.cartBadge).toHaveText('1');
  });

  test('standard_user: add the backpack, then remove it', async ({ page }) => {
    const login = new LoginPage(page);
    const inventory = new InventoryPage(page);

    await login.goto();
    await login.login('standard_user');
    await inventory.expectLoaded();

    // add the backpack first
    await inventory.addToCart('sauce-labs-backpack');
    
    // then, remove it directly in inventory page
    await inventory.remove('sauce-labs-backpack');

    // the cart badge should be zero
    await expect(inventory.cartBadge).toHaveCount(0);
  });

  test('standard_user: add all product into basket', async ({ page }) => {
    const login = new LoginPage(page);
    const inventory = new InventoryPage(page);

    await login.goto();
    await login.login('standard_user');
    await inventory.expectLoaded();

    const products: string[] = [
      'sauce-labs-backpack',
      'sauce-labs-bike-light',
      'sauce-labs-bolt-t-shirt',
      'sauce-labs-fleece-jacket',
      'sauce-labs-onesie',
      'test.allthethings()-t-shirt-(red)'
    ]

    // add all the product
    for (const product of products) {
      await inventory.addToCart(product);
    }

    // the cart badge should be 6
    await expect(inventory.cartBadge).toHaveText('6');
  });

  test('standard_user: safe from refresh page', async ({ page }) => {
    const login = new LoginPage(page);
    const inventory = new InventoryPage(page);

    await login.goto();
    await login.login('standard_user');
    await inventory.expectLoaded();

    const products: string[] = [
      'sauce-labs-backpack',
      'sauce-labs-bike-light',
    ]

    for (const product of products) {
      await inventory.addToCart(product);
    }

    await expect(inventory.cartBadge).toHaveText('2');
    await page.reload();
    await expect(inventory.cartBadge).toHaveText('2');
  });
});