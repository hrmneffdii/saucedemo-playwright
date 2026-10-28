
import { test, expect } from '../fixtures';
import { products } from '../data/products';

const namesAsc = products.map((p) => p.name).sort((a, b) => a.localeCompare(b));
const pricesAsc = products.map((p) => p.price).sort((a, b) => a - b);

const nameSorts = [
  { option: 'az' as const, expected: namesAsc },
  { option: 'za' as const, expected: [...namesAsc].reverse() },
];
const priceSorts = [
  { option: 'lohi' as const, expected: pricesAsc },
  { option: 'hilo' as const, expected: [...pricesAsc].reverse() },
];

test.describe('Inventory', () => {
  test('displays 6 products with correct names and prices @smoke', async ({ loggedInPage }) => {
    await expect(loggedInPage.names).toHaveText(products.map((p) => p.name));
    const prices = await loggedInPage.getPrices();
    expect(prices.sort((a, b) => a - b)).toEqual(pricesAsc);
  });

  test('standard_user: each product has a unique image', async ({ loggedInPage }) => {
    const sources = await loggedInPage.getImageSources();
    expect(new Set(sources).size).toBe(sources.length);
  });

  for (const s of nameSorts) {
    test(`sort products by name: ${s.option}`, async ({ loggedInPage }) => {
      await loggedInPage.sortBy(s.option);
      await expect.poll(() => loggedInPage.getNames()).toEqual(s.expected);
    });
  }

  for (const s of priceSorts) {
    test(`sort products by price: ${s.option}`, async ({ loggedInPage }) => {
      await loggedInPage.sortBy(s.option);
      await expect.poll(() => loggedInPage.getPrices()).toEqual(s.expected);
    });
  }
});
