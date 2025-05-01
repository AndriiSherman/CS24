// tests/frontend.spec.ts
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import puppeteer, { Browser, Page } from 'puppeteer';
import { Hono } from 'hono';
import * as path from 'path';
import * as fs from 'fs';
import { serve } from "@hono/node-server";

let browser: Browser;
let page: Page;

beforeAll(async () => {
  // Launch browser
  browser = await puppeteer.launch();
  page = await browser.newPage();

  // Prepare file path
  const filePath = path.resolve(__dirname, '../index.html');

  // Create Hono app to serve our static HTML
  const app = new Hono();
  app.get('/', (c) => {
    const content = fs.readFileSync(filePath, 'utf-8');
    return c.body(content, 200, { 'Content-Type': 'text/html' });
  });

  // Start HTTP server on port 3000
  serve({ port: 3000, fetch: app.fetch });
});

afterAll(async () => {
  // Close browser and server
  await browser.close();
});

describe('Frontend elements test', () => {
  it('Header exists and has correct text', async () => {
    await page.goto('http://localhost:3000');
    const header = await page.$('.header');
    expect(header).toBeTruthy();
    const text = await header?.evaluate(el => el.textContent);
    expect(text).toBe('Список елементів');
  });

  it('Page contains 4 items with .item class', async () => {
    const items = await page.$$('.item');
    expect(items.length).toBe(4);
  });

  it('Second item has highlight class and correct content', async () => {
    const second = (await page.$$('.item'))[1];
    const className = await second.evaluate(el => el.className);
    expect(className).toContain('highlight');
    const content = await second.evaluate(el => el.textContent);
    expect(content).toBe('Пункт 2 (важливий)');
  });
});
