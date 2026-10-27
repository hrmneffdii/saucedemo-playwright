import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Login', () => {
  test('login success with valid credentials', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('standard_user');
    await expect(page).toHaveURL(/inventory/);
  });

  test('login failed with blank username', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('');
    await expect(page.locator('[data-test="error"]')).toContainText(
      'Username is required'
    );
  });

  test('login failed with blank password', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('standard_user', '');
    await expect(page.locator('[data-test="error"]')).toContainText(
      'Password is required'
    );
  });

  test('login failed with wrong password', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('standard_user', 'wrong_password');
    await expect(page.locator('[data-test="error"]')).toContainText(
      'Username and password do not match any user in this service'
    );
  });

  test('login failed due to capital case sensitive', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('STANDARD_USER');
    await expect(page.locator('[data-test="error"]')).toContainText(
      'Username and password do not match any user in this service'
    );
  });

  test('login failed due to locked user', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('locked_out_user');
    await expect(page.locator('[data-test="error"]')).toContainText('locked out');
  });
});