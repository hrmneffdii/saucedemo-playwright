
import { test, expect } from '../fixtures';
import { products, customer } from '../data/products';
import { users } from '../data/users';

// test.fail(): passes as expected while the bug STILL exists,
// and fails if the bug is fixed or the site's behavior differs from expectations (manual verification).
test.describe('problem_user: known bugs', () => {
  test('BUG-001: Add to cart button fails for some products', async ({ loginAs }) => {
    test.fail(true, 'BUG-001');
    const inventory = await loginAs(users.problem);
    for (const p of products) await inventory.addToCart(p.name);
    await expect(inventory.cartBadge).toHaveText('6');
  });

  test('BUG-002: sorting does not change the order', async ({ loginAs }) => {
    test.fail(true, 'BUG-002');
    const inventory = await loginAs(users.problem);
    await inventory.sortBy('lohi');
    const asc = products.map((p) => p.price).sort((a, b) => a - b);
    await expect.poll(() => inventory.getPrices()).toEqual(asc);
  });

  test('BUG-003: all products use the same image', async ({ loginAs }) => {
    test.fail(true, 'BUG-003');
    const inventory = await loginAs(users.problem);
    const sources = await inventory.getImageSources();
    expect(new Set(sources).size).toBe(sources.length);
  });

  test('BUG-004: Last Name is not saved in the checkout form', async ({
    loginAs, cartPage, checkoutPage, page,
  }) => {
    test.fail(true, 'BUG-004');
    const inventory = await loginAs(users.problem);
    await inventory.addToCart(products[0].name);
    await inventory.openCart();
    await cartPage.startCheckout();
    await checkoutPage.fillInfo(customer);
    await checkoutPage.continue();
    await expect(page).toHaveURL(/checkout-step-two/);
  });
});
