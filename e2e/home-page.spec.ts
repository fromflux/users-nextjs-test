import { test, expect } from '@playwright/test';
import { randomUUID } from 'node:crypto';

test('has title', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  await expect(page).toHaveTitle(/User Management/);
});

test('has heading', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  await expect(page.getByRole('heading', { name: 'Add a user' })).toBeVisible();
});

test('shows errors on invalid submit', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  await page.getByRole('button', { name: 'Add' }).click();

  await expect(page.getByText('Name is required')).toBeVisible();
  await expect(page.getByText('Age must be a number 18 or over')).toBeVisible();
  await expect(page.getByText('Country is required')).toBeVisible();
  await expect(page.getByText('Please select at least one interest')).toBeVisible();
});

test('shows success toast on valid submit', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  await page.getByLabel('Full Name').fill('John Doe');
  await page.getByLabel('Age').fill('42');

  await page.getByLabel('Country').click();
  await page.getByRole('option', { name: 'Jamaica' }).waitFor()
  await page.getByRole('option', { name: 'Jamaica' }).click();

  await page.getByRole('checkbox', { name: 'Coding' }).click();

  await page.getByRole('button', { name: 'Add' }).click();

  await expect(page.getByText('User added successfully')).toBeVisible();
});

test('adds user on valid submit', async ({ page }) => {
  const newUserName = `John Doe - ${randomUUID()} `;

  await page.goto('http://localhost:3000/users');
  await expect(await page.getByText(newUserName)).not.toBeVisible();

  await page.goto('http://localhost:3000/');

  await page.getByLabel('Full Name').fill(newUserName);
  await page.getByLabel('Age').fill('42');

  await page.getByLabel('Country').click();
  await page.getByRole('option', { name: 'Australia' }).waitFor()
  await page.getByRole('option', { name: 'Australia' }).click();

  await page.getByRole('checkbox', { name: 'Coding' }).click();

  await page.getByRole('button', { name: 'Add' }).click();

  await expect(page.getByText('User added successfully')).toBeVisible();

  await page.goto('http://localhost:3000/users');
  await expect(await page.getByText(newUserName)).toBeVisible();
});