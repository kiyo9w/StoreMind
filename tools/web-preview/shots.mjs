// Screenshot harness: node shots.mjs <outDir>   (server must be running on :5127)
import { chromium } from 'playwright-core';
import fs from 'node:fs';
import path from 'node:path';
const BASE = process.env.BASE || 'http://127.0.0.1:5127';
const out = path.resolve(process.argv[2] || 'shots'); fs.mkdirSync(out, { recursive: true });
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const api = async (token, p, method = 'GET', body, headers = {}) => { const r = await fetch(BASE + p, { method, headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`, ...headers }, body: body ? JSON.stringify(body) : undefined }); return r.json().catch(() => null); };
const login = async u => (await (await fetch(BASE + '/api/auth/sign-in', { method: 'POST', body: JSON.stringify({ username: u, password: 'demo' }) })).json()).token;
let n = 0; const cmd = (t, id, c, v, b = {}) => api(t, `/api/exceptions/${id}/${c}`, 'POST', b, { 'Idempotency-Key': `seed-${++n}`, 'If-Match': String(v) });

// seed a believable mid-shift state through the real command path
await api(await login('hq'), '/api/demo/reset', 'POST', {}, { 'Idempotency-Key': 'reset-' + Date.now() });
const hq = await login('hq');
await cmd(hq, 'exc-002', 'acknowledge', 1);
await cmd(hq, 'exc-005', 'acknowledge', 1); await cmd(hq, 'exc-005', 'act', 2, { action_code: 'replenish_shelf', reason: 'Backstock located in dairy cooler 2.' });
await cmd(hq, 'exc-006', 'escalate', 1, { escalation_reason: 'customer_deadline', escalation_severity: 'high', escalation_trend: 'declining' });
await cmd(hq, 'exc-008', 'snooze', 1, { snooze_minutes: 60, reason: 'Waiting on appliance serial check.' });

const browser = await chromium.launch({ executablePath: CHROME });
const shot = async (name, user, { w = 1440, h = 900, setup, full = false } = {}) => {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1 }); const page = await ctx.newPage();
  page.on('pageerror', e => console.log('PAGEERROR', name, e.message));
  await page.goto(BASE); await page.waitForTimeout(250);
  if (user) { await page.fill('input[name=username]', user); await page.fill('input[name=password]', 'demo'); await page.click('#sign-in-button'); await page.waitForSelector('#app-view:not([hidden])'); await page.waitForTimeout(900); }
  if (setup) { try { await setup(page); } catch (e) { console.log('setup skipped', name); } }
  await page.waitForTimeout(500); await page.screenshot({ path: path.join(out, name + '.png'), fullPage: full }); await ctx.close(); console.log('shot', name);
};
await shot('01-signin', null);
await shot('02-desk-lead', 'lead');
await shot('03-desk-hq-escalated', 'hq', { setup: async p => { await p.selectOption('#store-select','store-002'); await p.waitForTimeout(700); await p.click('[data-exception-id="exc-006"]'); } });
await shot('04-verify-form', 'lead', { setup: async p => { await p.click('[data-command="claim"]'); await p.waitForTimeout(300); await p.click('[data-command="act"]').catch(() => {}); } });
await shot('05-oversight', 'hq', { setup: async p => { await p.click('[data-panel="oversight"]'); await p.waitForTimeout(600); }, full: true });
await shot('06-audit', 'hq', { setup: async p => { await p.click('[data-panel="audit"]'); await p.waitForTimeout(500); } });
await shot('07-phone-queue', 'lead', { w: 390, h: 844 });
await shot('08-phone-work', 'lead', { w: 390, h: 844, setup: async p => { await p.click('[data-exception-id]'); await p.waitForTimeout(500); }, full: true });
await shot('09-tablet', 'lead', { w: 900, h: 1100 });
// dead states
await shot('10-off-shift-clerk', 'clerk', { setup: async p => { await p.click('#clock-toggle'); await p.waitForTimeout(900); } });
await shot('11-snoozed', 'hq', { setup: async p => { await p.selectOption('#store-select', 'store-003'); await p.waitForTimeout(700); await p.click('[data-exception-id="exc-008"]'); } });
{ const t = await login('hq'); await cmd(t, 'exc-003', 'act', 1, { action_code: 'reset_display', reason: 'Reset started' }); await cmd(t, 'exc-003', 'verify', 2, { proofs: [{ type: 'planogram_photo', value: 'fixture://src-003/planogram_photo/1', source_ref: '/assets/fixtures.svg#shelf-mismatch' }], reason: 'Reset complete' }); }
await shot('12-failed-verification', 'hq', { setup: async p => { await p.click('[data-exception-id="exc-003"]'); await p.waitForTimeout(500); await p.evaluate(() => document.querySelector('#exception-work').scrollTo(0, 560)); } });
await shot('13-refund-scene', 'hq', { setup: async p => { await p.selectOption('#store-select', 'store-002'); await p.waitForTimeout(700); await p.click('[data-exception-id="exc-004"]'); } });
await browser.close();
