import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';

test.describe('Cart', () => {
    test('standard_user: remove product works properly', async ({ page }) => {
        const login = new LoginPage(page);
        const inventory = new InventoryPage(page);
        const cart = new CartPage(page);

        // go to login page and login as standard user
        await login.goto();
        await login.login('standard_user');

        // add to cart
        await inventory.addToCart('sauce-labs-backpack');

        // go to cart page
        await inventory.goToCartPage();

        // assert cart page has one item
        await expect(cart.inventoryItemName).toHaveCount(1);

        // remove the product in cart page
        await cart.remove('sauce-labs-backpack');

        // assert cart page doesn't have item
        await expect(cart.inventoryItemName).toHaveCount(0);
    });

    test('standard_user: continue shopping before remove', async ({ page }) => {
        const login = new LoginPage(page);
        const inventory = new InventoryPage(page);
        const cart = new CartPage(page);

        // go to login page and login as standard user
        await login.goto();
        await login.login('standard_user');

        // add to cart
        await inventory.addToCart('sauce-labs-backpack');

        // go to cart page
        await inventory.goToCartPage();

        // assert cart page has one item
        await expect(cart.inventoryItemName).toHaveCount(1);

        // continue shopping
        await cart.continueShopping();

        // has one item and currently in inventory page
        await expect(inventory.cartBadge).toHaveText('1');
        await expect(page).toHaveURL(/inventory/);
    });

    test('standard_user: checkout page works correctly', async ({ page }) => {
        const login = new LoginPage(page);
        const inventory = new InventoryPage(page);
        const cart = new CartPage(page);

        // go to login page and login as standard user
        await login.goto();
        await login.login('standard_user');

        // add to cart
        await inventory.addToCart('sauce-labs-backpack');

        // go to cart page
        await inventory.goToCartPage();

        // assert cart page has one item
        await expect(cart.inventoryItemName).toHaveCount(1);

        // checkout
        await cart.checkout();

        // currently in checkout page
        await expect(page).toHaveURL(/checkout-step-one/);
    });
});