import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Login', () => {
  test('login valid masuk ke inventory', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('standard_user');
    await expect(page).toHaveURL(/inventory/);
  });

  test('login dengan password salah menampilkan error', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('standard_user', 'salah_password');
    await expect(page.locator('[data-test="error"]')).toContainText(
      'Username and password do not match'
    );
  });

  test('user terkunci tidak bisa login', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('locked_out_user');
    await expect(page.locator('[data-test="error"]')).toContainText('locked out');
  });
});