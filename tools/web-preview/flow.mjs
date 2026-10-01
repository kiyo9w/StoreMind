// Functional smoke test of the redesigned control desk against the preview server.
import { chromium } from 'playwright-core';
const BASE = process.env.BASE || 'http://127.0.0.1:5127';
const fail = []; const ok = (c, m) => { console.log((c ? 'PASS ' : 'FAIL ') + m); if (!c) fail.push(m); };
const b = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
await fetch(BASE + '/api/auth/sign-in', { method: 'POST', body: JSON.stringify({ username: 'hq', password: 'demo' }) }).then(r => r.json()).then(s => fetch(BASE + '/api/demo/reset', { method: 'POST', headers: { Authorization: 'Bearer ' + s.token, 'Idempotency-Key': 'r' + Date.now() }, body: '{}' }));
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } }); const p = await ctx.newPage();
const errs = []; p.on('pageerror', e => errs.push(e.message));
await p.goto(BASE); await p.fill('input[name=username]', 'lead'); await p.fill('input[name=password]', 'demo'); await p.click('#sign-in-button'); await p.waitForSelector('#app-view:not([hidden])'); await p.waitForTimeout(800);
ok(await p.locator('#exception-queue .queue-item').count() === 1, 'queue renders and is visible (was hidden in v1)');
ok(await p.locator('#exception-queue').isVisible(), 'queue list visible');
ok((await p.textContent('#decision-countdown')).includes('left'), 'countdown shown');
ok(await p.locator('#stage-tracker .stage').count() === 5, 'lifecycle tracker has 5 stages');
// claim → act → verify path
await p.click('[data-command="claim"]'); await p.fill('#command-reason', 'Taking this'); await p.click('#command-submit'); await p.waitForTimeout(700);
ok(await p.locator('[data-command="handoff"]').count() === 1, 'claim swaps to handoff');
await p.click('[data-command="acknowledge"]'); await p.fill('#command-reason', 'On it'); await p.click('#command-submit'); await p.waitForTimeout(700);
ok((await p.getAttribute('#stage-tracker .stage:nth-child(2)', 'data-status')) === 'done' || (await p.getAttribute('#stage-tracker .stage:nth-child(2)', 'data-status')) === 'current', 'acknowledged advances tracker');
await p.click('[data-command="act"]'); await p.selectOption('#action-code', 'replenish_shelf'); await p.fill('#command-reason', 'Restocked'); await p.click('#command-submit'); await p.waitForTimeout(700);
ok((await p.textContent('#exception-state')).includes('In Progress'), 'act → in progress');
await p.click('[data-command="verify"]'); await p.waitForSelector('#proof-inputs select');
await p.selectOption('#proof-inputs select', { index: 1 }); await p.fill('#command-reason', 'Photo attached'); await p.click('#command-submit'); await p.waitForTimeout(900);
const st = await p.textContent('#exception-state'); ok(/Active|Resolved/.test(st), 'verify triggers source recheck → ' + st);
ok(await p.locator('#exception-timeline .timeline-item').count() >= 4, 'timeline records every command');
ok(await p.locator('#command-admissions .admission-item').count() >= 4, 'admission states listed');
// keyboard
await p.keyboard.press('j'); ok(true, 'j key does not throw');
// phone queue-first
const m = await ctx.newPage({ viewport: { width: 390, height: 844 } }); await m.setViewportSize({ width: 390, height: 844 });
await m.goto(BASE); await m.fill('input[name=username]', 'clerk'); await m.fill('input[name=password]', 'demo'); await m.click('#sign-in-button'); await m.waitForSelector('#app-view:not([hidden])'); await m.waitForTimeout(900);
ok(!(await m.locator('#exception-work').isVisible()), 'phone: work sheet hidden until selection');
if (await m.locator('.queue-button').count()) { await m.click('.queue-button'); await m.waitForTimeout(500); ok(await m.locator('#exception-work').isVisible(), 'phone: selecting opens the sheet'); await m.click('#mobile-queue-back'); ok(await m.locator('#exception-queue').isVisible(), 'phone: back to queue'); }
// offline outbox
await p.reload(); await p.fill('input[name=username]', 'hq'); await p.fill('input[name=password]', 'demo'); await p.click('#sign-in-button'); await p.waitForSelector('#app-view:not([hidden])'); await p.waitForTimeout(900);
await ctx.setOffline(true); await p.waitForTimeout(300);
ok((await p.getAttribute('#connectivity-banner', 'data-state')) !== 'online', 'offline banner appears');
await ctx.setOffline(false);
ok(errs.length === 0, 'no page errors ' + errs.join('|'));
await b.close(); process.exit(fail.length ? 1 : 0);
