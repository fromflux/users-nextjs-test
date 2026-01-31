import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://localhost:3000/users');

  await expect(page).toHaveTitle(/User Management/);
});

test('has heading', async ({ page }) => {
  await page.goto('http://localhost:3000/users');

  await expect(page.getByRole('heading', { name: 'Users' })).toBeVisible();
});

test('shows saved user', async ({ page }) => {
  await page.goto('http://localhost:3000/users');

  await expect(page.getByText('John Maverick')).toBeVisible();
});

test('navigates to user detail page on user click', async ({ page }) => {
  await page.goto('http://localhost:3000/users');

  page.getByText('John Maverick').click();

  await expect(page.getByRole('heading', { name: 'Users' })).not.toBeVisible();
  await expect(page.getByRole('heading', { name: 'User Details' })).toBeVisible();
});
