import { test, expect } from '@playwright/test';

const userId = 'b704baf8-3442-45f2-8c90-9affd73e0266';

test('has title', async ({ page }) => {
  await page.goto(`http://localhost:3000/users/${userId}`);

  await expect(page).toHaveTitle(/User Management/);
});

test('has heading', async ({ page }) => {
  await page.goto(`http://localhost:3000/users/${userId}`);

  await expect(page.getByRole('heading', { name: 'User Details' })).toBeVisible();
});

test('shows saved user', async ({ page }) => {
  await page.goto(`http://localhost:3000/users/${userId}`);

  await expect(page.getByText('John Maverick')).toBeVisible();
  await expect(page.getByText('Albania')).toBeVisible();
  await expect(page.getByText('19 years old')).toBeVisible();

  await expect(await page.getByRole('checkbox', { name: 'Music' })).toBeChecked();
  await expect(await page.getByRole('checkbox', { name: 'Sports' })).toBeChecked();
});
