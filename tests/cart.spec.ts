import { test, expect } from '../fixtures';
import { products } from '../data/products';

const first = products[0].name;
const second = products[1].name;

test.describe('Cart', () => {
  test('cart is empty initially (0 items)', async ({ loggedInPage }) => {
    await expect(loggedInPage.cartBadge).toHaveCount(0);
  });

  test('add one product @smoke', async ({ loggedInPage, cartPage }) => {
    await loggedInPage.addToCart(first);
    await expect(loggedInPage.cartBadge).toHaveText('1');
    await expect(
      loggedInPage.item(first).getByRole('button', { name: 'Remove' })
    ).toBeVisible();
    await loggedInPage.openCart();
    await expect(cartPage.itemNames).toHaveText([first]);
  });

  test('remove a product from the inventory page', async ({ loggedInPage }) => {
    await loggedInPage.addToCart(first);
    await loggedInPage.removeFromInventory(first);
    await expect(loggedInPage.cartBadge).toHaveCount(0);
    await expect(
      loggedInPage.item(first).getByRole('button', { name: 'Add to cart' })
    ).toBeVisible();
  });

  test('add all products (maximum limit of 6)', async ({ loggedInPage, cartPage }) => {
    for (const p of products) await loggedInPage.addToCart(p.name);
    await expect(loggedInPage.cartBadge).toHaveText('6');
    await loggedInPage.openCart();
    await expect(cartPage.itemNames).toHaveText(products.map((p) => p.name));
  });

  test('cart contents persist after page refresh', async ({ loggedInPage, page }) => {
    await loggedInPage.addToCart(first);
    await loggedInPage.addToCart(second);
    await page.reload();
    await expect(loggedInPage.cartBadge).toHaveText('2');
  });

  test('remove an item from the cart page', async ({ loggedInPage, cartPage }) => {
    await loggedInPage.addToCart(first);
    await loggedInPage.addToCart(second);
    await loggedInPage.openCart();
    await cartPage.removeItem(first);
    await expect(cartPage.itemNames).toHaveText([second]);
    await expect(loggedInPage.cartBadge).toHaveText('1');
  });
});