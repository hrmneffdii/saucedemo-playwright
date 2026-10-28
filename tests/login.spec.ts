
import { test, expect } from '../fixtures';
import { users } from '../data/users';

const negativeCases = [
  { name: 'incorrect password', username: users.standard, password: 'salah123', error: 'Username and password do not match' },
  { name: 'empty username', username: '', password: users.password, error: 'Username is required' },
  { name: 'empty password', username: users.standard, password: '', error: 'Password is required' },
  { name: 'locked account', username: users.locked, password: users.password, error: 'locked out' },
];

test.describe('Login', () => {
  test('successful login redirects to inventory @smoke', async ({ loginPage, page }) => {
    await loginPage.goto();
    await loginPage.login(users.standard);
    await expect(page).toHaveURL(/inventory/);
  });

  for (const c of negativeCases) {
    test(`login fails: ${c.name}`, async ({ loginPage, page }) => {
      await loginPage.goto();
      await loginPage.login(c.username, c.password);
      await expect(loginPage.error).toContainText(c.error);
      await expect(page).not.toHaveURL(/inventory/);
    });
  }

  test('logout returns to the login page', async ({ loggedInPage, loginPage }) => {
    await loggedInPage.logout();
    await expect(loginPage.loginButton).toBeVisible();
  });

  test('access to inventory without login is denied', async ({ page, loginPage }) => {
    await page.goto('/inventory.html');
    await expect(loginPage.error).toContainText('logged in');
  });
});
