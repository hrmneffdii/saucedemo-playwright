
import { test, expect } from '../fixtures';
import { products, customer } from '../data/products';
import { round2 } from '../utils/money';

const required = [
  { field: 'firstName', error: 'First Name is required' },
  { field: 'lastName', error: 'Last Name is required' },
  { field: 'postalCode', error: 'Postal Code is required' },
] as const;

test.describe('Checkout', () => {
  test('complete checkout successfully with valid information @smoke', async ({
    loggedInPage, cartPage, checkoutPage, page,
  }) => {
    await loggedInPage.addToCart(products[0].name);
    await loggedInPage.openCart();
    await cartPage.startCheckout();
    await checkoutPage.fillInfo(customer);
    await checkoutPage.continue();
    await expect(page).toHaveURL(/checkout-step-two/);
    await checkoutPage.finish();
    await expect(checkoutPage.completeHeader).toHaveText(/thank you for your order/i);
  });

  for (const r of required) {
    test(`fail when ${r.field} is empty`, async ({
      loggedInPage, cartPage, checkoutPage, page,
    }) => {
      await loggedInPage.addToCart(products[0].name);
      await loggedInPage.openCart();
      await cartPage.startCheckout();
      await checkoutPage.fillInfo({ ...customer, [r.field]: '' });
      await checkoutPage.continue();
      await expect(checkoutPage.error).toContainText(r.error);
      await expect(page).toHaveURL(/checkout-step-one/);
    });
  }

  test('cancel checkout preserves cart contents', async ({
    loggedInPage, cartPage, checkoutPage, page,
  }) => {
    await loggedInPage.addToCart(products[0].name);
    await loggedInPage.openCart();
    await cartPage.startCheckout();
    await checkoutPage.cancel();
    await expect(page).toHaveURL(/cart/);
    await expect(cartPage.itemNames).toHaveText([products[0].name]);
  });

  test('calculate item subtotal, 8% tax, and total', async ({
    loggedInPage, cartPage, checkoutPage,
  }) => {
    const chosen = [products[0], products[1]];
    for (const p of chosen) await loggedInPage.addToCart(p.name);
    await loggedInPage.openCart();
    await cartPage.startCheckout();
    await checkoutPage.fillInfo(customer);
    await checkoutPage.continue();

    const subtotal = round2(chosen.reduce((sum, p) => sum + p.price, 0));
    const tax = round2(subtotal * 0.08);
    const total = round2(subtotal + tax);

    await expect(checkoutPage.subtotal).toContainText(`$${subtotal.toFixed(2)}`);
    await expect(checkoutPage.tax).toContainText(`$${tax.toFixed(2)}`);
    await expect(checkoutPage.total).toContainText(`$${total.toFixed(2)}`);
  });
});
