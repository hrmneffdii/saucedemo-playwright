import { expect, test } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";

test.describe('Checkout', () => {
    let login: LoginPage;
    let inventory: InventoryPage;
    let cart: CartPage;
    let checkout: CheckoutPage;

    // setup for
    // 1. login
    // 2. add a product
    // 3. go to the cart page, then checkout
    // 4. currently in checkout page 
    test.beforeEach(async ({ page }) => {
        login = new LoginPage(page);
        inventory = new InventoryPage(page);
        cart = new CartPage(page);
        checkout = new CheckoutPage(page);

        // login first, then go to inventory
        await login.goto();
        await login.login('standard_user');
        await inventory.expectLoaded();

        // add a product in inventory
        await inventory.addToCart('sauce-labs-backpack');

        // then go to cart page
        await inventory.goToCartPage();

        // checkout a product
        await cart.checkout();
    });

    test('standard_user: fill with blank first name', async ({ page }) => {
        // fill form
        await checkout.fillInformation('', 'Jacob', '12345');

        // continue checkout
        await checkout.continue();

        // assert
        await expect(page.locator('[data-test="error"]')).toContainText(
            'First Name is required'
        );
    });

    test('standard_user: fill with blank last name', async ({ page }) => {
        // fill form
        await checkout.fillInformation('Jacob', '', '12345');

        // continue checkout
        await checkout.continue();

        // assert
        await expect(page.locator('[data-test="error"]')).toContainText(
            'Last Name is required'
        );
    });

    test('standard_user: fill with blank postal code', async ({ page }) => {
        // fill form
        await checkout.fillInformation('Jacob', 'Yusuf', '');

        // continue checkout
        await checkout.continue();

        // assert
        await expect(page.locator('[data-test="error"]')).toContainText(
            'Postal Code is required'
        );
    });

    test('standard_user: cancel and go to cart page', async ({ page }) => {
        await checkout.cancel();

        await expect(page).toHaveURL(/cart/)
    });

    test('standard_user: finish the transaction', async () => {
        await checkout.fillInformation('Jacob', 'jona', '12345');
        await checkout.continue()

        await checkout.finish();
        await expect(checkout.completeHeader).toContainText('Thank you for your order');
    });
});
