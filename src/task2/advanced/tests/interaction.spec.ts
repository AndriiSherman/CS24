import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import puppeteer, { Browser, Page } from 'puppeteer';
import app from './server';
import { serve } from '@hono/node-server';

let browser: Browser;
let page: Page;

beforeAll(async () => {
  browser = await puppeteer.launch();
  page = await browser.newPage();

  serve({ port: 3000, fetch: app.fetch });
});

afterAll(async () => {
  await browser.close();
});

describe('Navigation and DOM interaction tests', () => {
  it('should toggle paragraph text when button is clicked', async () => {
    await page.goto('http://localhost:3000');
    // Verify initial text
    const p = await page.$('#toggle-text');
    expect(await p?.evaluate(el => el.textContent)).toBe('Original Text');

    // Click the toggle button
    await page.click('#toggle-btn');
    // Verify text changed
    expect(await p?.evaluate(el => el.textContent)).toBe('Toggled Text');

    // Click again to revert
    await page.click('#toggle-btn');
    expect(await p?.evaluate(el => el.textContent)).toBe('Original Text');
  });

  it('should navigate to Page 2 on button click', async () => {
    await page.goto('http://localhost:3000');

    // Click and wait for navigation
    await Promise.all([
      page.waitForNavigation(),
      page.click('#nav-btn'),
    ]);

    // Verify we are on page2.html
    expect(page.url()).toContain('/page2');
    const header = await page.$('#page2-header');
    expect(header).toBeTruthy();
    expect(await header?.evaluate(el => el.textContent)).toBe('Welcome to Page 2');
  });
});
