import { Hono } from 'hono';
import * as fs from 'fs';
import * as path from 'path';

const app = new Hono();

// Serve index.html at '/'
app.get('/', (c) => {
  const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf-8');
  return c.body(html, 200, { 'Content-Type': 'text/html' });
});

// Serve page2.html at '/page2'
app.get('/page2', (c) => {
  const html = fs.readFileSync(path.resolve(__dirname, '../page2.html'), 'utf-8');
  return c.body(html, 200, { 'Content-Type': 'text/html' });
});

export default app;
