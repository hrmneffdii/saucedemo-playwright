import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { users } from '../data/users';

type Fixtures = {
  loginPage: LoginPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  loginAs: (username: string) => Promise<InventoryPage>;
  loggedInPage: InventoryPage; // login as standard_user
};

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },
  loginAs: async ({ page, loginPage }, use) => {
    await use(async (username: string) => {
      await loginPage.goto();
      await loginPage.login(username);
      const inventory = new InventoryPage(page);
      await inventory.expectLoaded();
      return inventory;
    });
  },
  loggedInPage: async ({ loginAs }, use) => {
    await use(await loginAs(users.standard));
  },
});

export { expect } from '@playwright/test';