#!/usr/bin/env node
// StoreMind web preview server — a zero-dependency stand-in for the .NET service.
//
// Purpose: iterate on and screenshot the control-desk UI (src/Kiyo9w.StoreMind.Service/wwwroot)
// on machines without the .NET SDK. It serves wwwroot and mimics the HTTP/SSE contract in
// Program.cs with the same fictional fixtures, ranking terms, access rules and command states.
// It is NOT the product backend and carries no authority: the real service stays the source of truth.
//
//   node tools/web-preview/server.mjs            # http://127.0.0.1:5127
//   accounts: hq / district / lead / lead-west / clerk, password = "demo"
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = process.env.WWWROOT ? path.resolve(process.env.WWWROOT) : path.resolve(here, '../../src/Kiyo9w.StoreMind.Service/wwwroot');
const PORT = Number(process.env.PORT || 5127);
const MIN = 60000;

// ───────── fixtures (mirror FixtureSource.cs / ExceptionPolicy) ─────────
const STORES = { 'store-001': ['Juniper Market', 'district-01'], 'store-002': ['Harbor Market', 'district-01'], 'store-003': ['Cedar Market', 'district-02'] };
const SOURCES = [
  ['src-001', 'stockout_signal', 'store-001', 'Cold brew shelf empty', 'On-hand signal conflicts with an empty shelf scan.', 5, 940, .96, 0, 95, 'shelf_photo', 4, 'gte', [3, 5]],
  ['src-002', 'pickup_breach', 'store-001', 'Pickup order nearing breach', 'A prepaid pickup has exceeded its ready-by promise.', 5, 620, .99, 14, 75, 'handoff_scan', 10, 'lte', [14, 8]],
  ['src-003', 'planogram_task', 'store-001', 'Endcap reset incomplete', 'Seasonal endcap differs from the signed layout.', 3, 260, .88, 82, 180, 'planogram_photo', 95, 'gte', [82, 98]],
  ['src-004', 'refund_anomaly', 'store-002', 'Repeated no-receipt refunds', 'Three related no-receipt refunds need a lead review.', 4, 1280, .91, 3, 140, 'receipt_reference', 1, 'lte', [3, 1]],
  ['src-005', 'stockout_signal', 'store-002', 'Infant formula shelf gap', 'High-confidence shelf gap on a protected staple.', 5, 1540, .98, 0, 55, 'shelf_photo', 3, 'gte', [2, 4]],
  ['src-006', 'pickup_breach', 'store-002', 'Chilled pickup staging delay', 'Chilled basket has remained unstaged beyond target.', 4, 710, .94, 14, 115, 'handoff_scan', 10, 'lte', [14, 7]],
  ['src-007', 'planogram_task', 'store-003', 'Checkout battery display drift', 'Checkout display inventory is in the wrong bays.', 2, 180, .82, 70, 260, 'planogram_photo', 90, 'gte', [70, 92]],
  ['src-008', 'refund_anomaly', 'store-003', 'High-value appliance return', 'Return value and disposition require verification.', 4, 2100, .89, 2, 200, 'receipt_reference', 1, 'lte', [2, 1]]
];
const TYPE = {
  stockout_signal: { dept: 'grocery', assign: 'grocery', loc: 'Sales floor · assigned shelf', scene: 'shelf-gap', cons: 'Shelf availability loss continues and the exception escalates when overdue.', actions: [['replenish_shelf', 'Replenish shelf'], ['correct_inventory', 'Correct inventory']] },
  pickup_breach: { dept: 'fulfillment', assign: 'pickup', loc: 'Pickup staging', scene: 'shelf-gap', cons: 'The customer promise is breached and the district queue is notified.', actions: [['stage_order', 'Stage order'], ['contact_customer', 'Contact customer']] },
  planogram_task: { dept: 'merchandising', assign: 'merchandising', loc: 'Promotional display', scene: 'shelf-mismatch', cons: 'The display remains non-compliant and escalates to merchandising.', actions: [['reset_display', 'Reset display'], ['assign_reset', 'Assign reset']] },
  refund_anomaly: { dept: 'returns', assign: 'returns', loc: 'Service desk', scene: 'shelf-mismatch', cons: 'The return remains blocked and escalates to district loss prevention.', actions: [['review_refund', 'Review refund'], ['secure_evidence', 'Secure evidence']] }
};
const PROOF_LABELS = { shelf_photo: ['Aisle camera frame', 'Associate shelf capture'], planogram_photo: ['Signed layout comparison', 'Associate display capture'], handoff_scan: ['Staging scan', 'Customer handoff scan'], receipt_reference: ['Register receipt record', 'Manager review record'] };
const ACTORS = {
  clerk: { id: 'actor-clerk', username: 'clerk', display_name: 'Avery Clerk', role: 'StoreClerk', store_id: 'store-001', district_id: 'district-01', department: 'grocery', assignments: ['grocery'], capabilities: ['read_assignment', 'command_exception'] },
  lead: { id: 'actor-lead', username: 'lead', display_name: 'Morgan Lead', role: 'DepartmentOwner', store_id: 'store-001', district_id: 'district-01', department: 'grocery', assignments: [], capabilities: ['read_department', 'command_exception'] },
  'lead-west': { id: 'actor-lead-west', username: 'lead-west', display_name: 'Rowan West', role: 'DepartmentOwner', store_id: 'store-002', district_id: 'district-01', department: 'grocery', assignments: [], capabilities: ['read_department', 'command_exception'] },
  district: { id: 'actor-district', username: 'district', display_name: 'Casey District', role: 'DistrictManager', store_id: null, district_id: 'district-01', department: null, assignments: [], capabilities: ['read_district', 'command_exception'] },
  hq: { id: 'actor-hq', username: 'hq', display_name: 'Taylor Headquarters', role: 'Headquarters', store_id: null, district_id: null, department: null, assignments: [], capabilities: ['read_tenant', 'command_exception', 'demo_reset', 'publish_policy'] }
};

// ───────── state ─────────
let seq = 0, exceptions = [], events = [], admissions = new Map(), shifts = [], policies = [], proofsLedger = [];
const sessions = new Map(), subscribers = new Set();
const digest = (...p) => crypto.createHash('sha256').update(p.join('|')).digest('hex').slice(0, 16);
const uid = () => crypto.randomUUID();

function seed() {
  const now = Date.now();
  policies = Object.keys(TYPE).map(c => ({ class: c, label: { stockout_signal: 'Velocity / stockout-risk', pickup_breach: 'Pickup promise breach', planogram_task: 'Planogram compliance', refund_anomaly: 'Refund review' }[c], threshold_score: 0, volume_budget: 4, published: true }));
  exceptions = SOURCES.map(([sid, type, store, title, description, urgency, impact, confidence, metric, ageMin, proof, target, dir, follow]) => {
    const t = TYPE[type], observed = new Date(now - ageMin * MIN);
    const urgencyPoints = urgency * 100, impactPoints = Math.min(Math.floor(impact / 25), 100), confidencePoints = Math.floor(confidence * 50), agePoints = Math.min(Math.floor(ageMin / 30), 10);
    const score = urgencyPoints + impactPoints + confidencePoints + agePoints;
    const severity = score >= 570 ? 'critical' : score >= 440 ? 'high' : score >= 300 ? 'medium' : 'low';
    const due = new Date(observed.getTime() + (urgency >= 5 ? 120 : urgency >= 4 ? 180 : 300) * MIN);
    const owner = `${t.dept[0].toUpperCase()}${t.dept.slice(1)} department owner`;
    return {
      id: `exc-${sid.slice(4)}`, source_id: sid, source_type: type, store_id: store, store_name: STORES[store][0], tenant_id: 'storemind-demo', department: t.dept, assignment_id: t.assign, policy_version: 1,
      district_id: STORES[store][1], title, description, severity, rank_score: score, urgency, urgency_points: urgencyPoints, impact, impact_points: impactPoints, confidence, confidence_points: confidencePoints, age_points: agePoints,
      rank_explanation: '', assigned_owner: owner, owner_kind: 'role', owner_actor_id: null, role_owner: owner, due_at: due.toISOString(), item_location: t.loc, inaction_consequence: t.cons,
      observed_at: observed.toISOString(), required_proof_type: proof, required_proof_types: [proof],
      available_proofs: PROOF_LABELS[proof].map((label, i) => ({ type: proof, artifact_ref: `fixture://${sid}/${proof}/${i + 1}`, source_ref: `/assets/fixtures.svg#${t.scene}`, label })),
      current_metric_value: metric, metric_target: target, metric_direction: dir, allowed_actions: t.actions.map(([code, label]) => ({ code, label })),
      state: 'active', version: 1, snoozed_until: null, timeline: [], recheck_count: 0, escalated_at: null, escalation_due_at: null, escalation_reason: null, escalation_severity: null, escalation_trend: null,
      deescalated_at: null, deescalation_justification: null, resolved_at: null, suppressed_at: null, closure_reason: null, _follow: follow
    };
  }).sort((a, b) => b.rank_score - a.rank_score || a.id.localeCompare(b.id));
  exceptions.forEach((e, i) => {
    const thr = { critical: 570, high: 440, medium: 300, low: 0 }[e.severity];
    e.global_rank = i + 1;
    e.rank_explanation = `Global rank #${i + 1} of ${exceptions.length}. Score ${e.rank_score} = urgency ${e.urgency_points} (${e.urgency} × 100) + impact ${e.impact_points} (impact ÷ 25, capped at 100, rounded down) + confidence ${e.confidence_points} (${Math.round(e.confidence * 100)}% × 50, rounded down) + age ${e.age_points} (30-minute bands, capped at 10). This is ${e.rank_score - thr} points above the ${e.severity} threshold of ${thr}.`;
  });
  shifts = ['clerk', 'lead', 'lead-west'].map(u => ({ actor_id: ACTORS[u].id, display_name: ACTORS[u].display_name, role: ACTORS[u].role, store_id: ACTORS[u].store_id, department: ACTORS[u].department, on_shift: true, clocked_at: new Date(now - 90 * MIN).toISOString() }));
  events = []; admissions = new Map(); proofsLedger = []; seq = 0;
}
seed();

// ───────── policy (mirror AccessPolicy.cs) ─────────
const canSee = (a, e) => a.capabilities.includes('read_tenant') || (a.capabilities.includes('read_district') && a.district_id === e.district_id) ||
  (a.store_id === e.store_id && (a.capabilities.includes('read_store') || (a.capabilities.includes('read_department') && a.department === e.department) || (a.capabilities.includes('read_assignment') && a.assignments.includes(e.assignment_id))));
const onShift = a => !a.store_id || !!shifts.find(s => s.actor_id === a.id && s.on_shift);
function allowed(a, e) {
  if (!canSee(a, e) || !a.capabilities.includes('command_exception')) return [];
  if (a.store_id && !onShift(a)) return [];
  const map = { active: ['acknowledge', 'act', 'snooze', 'suppress', 'escalate'], acknowledged: ['act', 'snooze', 'suppress', 'escalate'], in_progress: ['snooze', 'suppress', 'escalate', 'verify'], escalated: ['act', 'verify', 'deescalate'], snoozed: ['reopen'], resolved: ['reopen'], suppressed: ['reopen'] };
  let c = [...(map[e.state] || [])];
  if (a.role === 'StoreClerk') c = c.filter(x => !['suppress', 'escalate', 'deescalate'].includes(x) && !(x === 'reopen' && e.state !== 'snoozed'));
  if (!['resolved', 'suppressed'].includes(e.state)) { if (e.owner_kind !== 'person') c.unshift('claim'); else if (e.owner_actor_id === a.id) c.unshift('handoff'); }
  return c;
}
const publicEx = e => { const { _follow, ...rest } = e; return rest; };
const visible = a => exceptions.filter(e => canSee(a, e));

// ───────── commands ─────────
class ApiErr extends Error { constructor(status, code, msg, extra) { super(msg); this.status = status; this.code = code; this.extra = extra; } }
function emit(type, e) { seq++; const env = { event_id: uid(), tenant_id: 'storemind-demo', aggregate_type: 'exception', aggregate_id: e?.id ?? 'demo', aggregate_version: e?.version ?? 0, type, sequence: seq, occurred_at: new Date().toISOString(), data: {} }; events.push(env); subscribers.forEach(fn => fn(env)); return seq; }
function execute(a, id, command, key, version, input) {
  const e = exceptions.find(x => x.id === id && canSee(a, x)); if (!e) throw new ApiErr(404, 'not_found', 'Exception not found.');
  const prior = admissions.get(key); if (prior && prior.aggregate_id === id && prior.command === command) return prior.receipt;
  const adm = { command_id: key, actor_id: a.id, aggregate_id: id, command, status: 'accepted', error_code: null, sequence: null, accepted_at: new Date().toISOString(), completed_at: null, states: [{ status: 'accepted', at: new Date().toISOString() }] };
  admissions.set(key, adm);
  const fail = (status, code, msg) => { adm.status = 'failed'; adm.error_code = code; adm.states.push({ status: 'failed', at: new Date().toISOString(), detail: code }); throw new ApiErr(status, code, msg); };
  if (e.version !== version) { adm.status = 'failed'; adm.error_code = 'version_conflict'; throw new ApiErr(409, 'version_conflict', 'The exception changed. Reopen the current state.', { item: publicEx(e) }); }
  if (!allowed(a, e).includes(command)) fail(403, 'command_not_allowed', 'That command is not allowed for this role, shift, or state.');
  adm.states.push({ status: 'running', at: new Date().toISOString() });
  const now = new Date(), entry = { id: uid(), actor: a.display_name, role: a.role, timestamp: now.toISOString(), reason: input.reason ?? null, action_code: command, metric_value: null, metric_source_ref: null, proofs: [], command_id: key, succeeded: true, state_after: e.state, snoozed_until: null, digest: '' };
  switch (command) {
    case 'claim': e.owner_kind = 'person'; e.owner_actor_id = a.id; e.assigned_owner = a.display_name; break;
    case 'handoff': { const t = shifts.find(s => s.actor_id === input.target_actor_id && s.on_shift && s.store_id === e.store_id && s.actor_id !== a.id); if (!t) fail(422, 'invalid_handoff_target', 'Handoff target must be another on-shift actor in this store.'); e.owner_actor_id = t.actor_id; e.assigned_owner = t.display_name; break; }
    case 'acknowledge': e.state = 'acknowledged'; break;
    case 'act': if (!e.allowed_actions.some(x => x.code === input.action_code)) fail(422, 'invalid_action_code', 'Action code is not in the bounded taxonomy.'); e.state = 'in_progress'; entry.action_code = input.action_code; break;
    case 'snooze': e.state = 'snoozed'; e.snoozed_until = new Date(now.getTime() + (input.snooze_minutes || 60) * MIN).toISOString(); entry.snoozed_until = e.snoozed_until; break;
    case 'suppress': e.state = 'suppressed'; e.suppressed_at = now.toISOString(); e.closure_reason = input.action_code || input.reason; entry.reason = input.action_code ? `${input.action_code}${input.reason ? ' · ' + input.reason : ''}` : input.reason; break;
    case 'reopen': e.state = 'active'; e.snoozed_until = null; e.resolved_at = null; e.suppressed_at = null; break;
    case 'escalate': { if (!input.escalation_reason || !input.escalation_severity || !input.escalation_trend) fail(422, 'escalation_fields_required', 'Escalation requires reason, severity and trend.'); e.state = 'escalated'; e.escalated_at = now.toISOString(); e.escalation_reason = input.escalation_reason; e.escalation_severity = input.escalation_severity; e.escalation_trend = input.escalation_trend; e.escalation_due_at = new Date(now.getTime() + (input.escalation_severity === 'high' ? 240 : 480) * MIN).toISOString(); e.deescalated_at = null; e.deescalation_justification = null; Object.assign(entry, { escalation_reason: e.escalation_reason, escalation_severity: e.escalation_severity, escalation_trend: e.escalation_trend, escalation_due_at: e.escalation_due_at }); break; }
    case 'deescalate': if (!input.reason) fail(422, 'justification_required', 'A written justification is required.'); e.state = 'in_progress'; e.deescalated_at = now.toISOString(); e.deescalation_justification = input.reason; break;
    case 'verify': {
      const need = e.required_proof_types, got = input.proofs || [];
      if (!need.every(t => got.some(p => p.type === t && e.available_proofs.some(ap => ap.artifact_ref === p.value)))) fail(422, 'proof_required', 'Verification needs the policy-required proof issued for this exception.');
      const obs = e._follow[e.recheck_count % e._follow.length]; e.recheck_count++; e.current_metric_value = obs; entry.metric_value = obs; entry.metric_source_ref = `fixture://${e.source_id}/follow-up/${e.recheck_count}`;
      entry.proofs = got.map((p, i) => { const id = `prf-${e.source_id}-${proofsLedger.length + i + 1}`; proofsLedger.push({ proof_id: id, exception_id: e.id, store_id: e.store_id, type: p.type, artifact_ref: p.value, source_ref: p.source_ref ?? null, recorded_at: now.toISOString(), actor_id: a.id }); return { id, type: p.type, value: p.value, artifact_ref: p.value, source_ref: p.source_ref ?? null }; });
      const ok = e.metric_direction === 'gte' ? obs >= e.metric_target : obs <= e.metric_target;
      if (ok) { e.state = 'resolved'; e.resolved_at = now.toISOString(); e.escalation_due_at = null; } else { entry.succeeded = false; e.state = 'active'; }
      break;
    }
  }
  entry.state_after = e.state; entry.digest = digest(e.id, command, key, e.version, now.toISOString()); e.version++; e.timeline.push(entry);
  const sq = emit('exception.' + command, e); adm.sequence = sq; adm.status = 'completed'; adm.completed_at = new Date().toISOString(); adm.states.push({ status: 'completed', at: adm.completed_at });
  const receipt = { command_id: key, aggregate_id: id, command, sequence: sq, exception: publicEx(e), allowed_commands: allowed(a, e), status: 'completed' }; adm.receipt = receipt; return receipt;
}

// ───────── http ─────────
const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.svg': 'image/svg+xml', '.webmanifest': 'application/manifest+json', '.png': 'image/png', '.woff2': 'font/woff2' };
const send = (res, status, body, headers = {}) => { res.writeHead(status, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', ...headers }); res.end(body === undefined ? '' : JSON.stringify(body)); };
const problem = (res, status, code, detail, extra) => send(res, status, { type: `https://storemind.invalid/problems/${code}`, title: code, status, detail, code, extra }, { 'Content-Type': 'application/problem+json' });
const body = req => new Promise(r => { let d = ''; req.on('data', c => d += c); req.on('end', () => { try { r(d ? JSON.parse(d) : {}); } catch { r({}); } }); });
const storeSummaries = a => Object.entries(STORES).filter(([id]) => visible(a).some(e => e.store_id === id) || a.store_id === id).map(([id, [name, dist]]) => {
  const items = visible(a).filter(e => e.store_id === id), open = items.filter(e => !['resolved', 'suppressed'].includes(e.state)), now = Date.now();
  return { store_id: id, store_name: name, district_id: dist, active_count: open.length, overdue_count: open.filter(e => new Date(e.due_at) < now).length, blocked_count: 0, suppressed_count: items.filter(e => e.state === 'suppressed').length, high_severity_count: open.filter(e => ['high', 'critical'].includes(e.severity)).length, resolved_count: items.filter(e => e.state === 'resolved').length, oldest_open_at: open.map(e => e.observed_at).sort()[0] ?? null, escalated_count: open.filter(e => e.state === 'escalated').length, response_overdue_count: open.filter(e => e.state === 'escalated' && new Date(e.escalation_due_at) < now).length };
});

http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://x'), p = url.pathname;
  try {
    if (!p.startsWith('/api')) {
      let f = path.join(root, p === '/' ? 'index.html' : p); if (!f.startsWith(root) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) f = path.join(root, 'index.html');
      res.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream', 'Cache-Control': 'no-store' }); return res.end(fs.readFileSync(f));
    }
    if (p === '/api/auth/sign-in' && req.method === 'POST') { const b = await body(req); const a = ACTORS[String(b.username || '').toLowerCase()]; if (!a || b.password !== 'demo') return problem(res, 401, 'invalid_credentials', 'Invalid credentials'); const token = crypto.randomBytes(24).toString('hex'); sessions.set(token, a); return send(res, 200, { token, actor: a, assistant_enabled: false }); }
    const token = (req.headers.authorization || '').replace(/^Bearer /i, ''), a = sessions.get(token);
    if (!a) return problem(res, 401, 'unauthorized', 'A valid bearer session is required.');
    const m = (re) => p.match(re), idem = req.headers['idempotency-key'];
    let r;
    if (p === '/api/auth/sign-out') { sessions.delete(token); return send(res, 204); }
    if (p === '/api/me') return send(res, 200, { actor: a, capabilities: a.capabilities, assistant_enabled: false, on_shift: onShift(a) });
    if (p === '/api/stores') return send(res, 200, storeSummaries(a));
    if (p === '/api/districts') { if (!a.capabilities.includes('read_district') && !a.capabilities.includes('read_tenant')) return send(res, 200, []); const ss = storeSummaries(a), by = {}; ss.forEach(s => (by[s.district_id] ||= []).push(s)); return send(res, 200, Object.entries(by).map(([d, l]) => ({ district_id: d, store_count: l.length, active_count: l.reduce((n, s) => n + s.active_count, 0), escalated_count: l.reduce((n, s) => n + s.escalated_count, 0), response_overdue_count: l.reduce((n, s) => n + s.response_overdue_count, 0), oldest_escalation_due_at: exceptions.filter(e => e.district_id === d && e.state === 'escalated').map(e => e.escalation_due_at).sort()[0] ?? null }))); }
    if (p === '/api/exceptions' && req.method === 'GET') { const st = url.searchParams.get('state'), sid = url.searchParams.get('storeId'); let items = visible(a); if (sid) items = items.filter(e => e.store_id === sid); if (st === 'active') items = items.filter(e => !['resolved', 'suppressed'].includes(e.state)); else if (st === 'resolved') items = items.filter(e => e.state === 'resolved'); return send(res, 200, { sequence: seq, items: items.map(e => ({ global_rank: e.global_rank, exception: publicEx(e), allowed_commands: allowed(a, e) })) }); }
    if ((r = m(/^\/api\/exceptions\/([^/]+)$/))) { const e = exceptions.find(x => x.id === r[1] && canSee(a, x)); if (!e) return problem(res, 404, 'not_found', 'Exception not found.'); return send(res, 200, { sequence: seq, exception: publicEx(e), allowed_commands: allowed(a, e) }); }
    if ((r = m(/^\/api\/exceptions\/([^/]+)\/commands$/))) return send(res, 200, [...admissions.values()].filter(x => x.aggregate_id === r[1] && (x.actor_id === a.id || a.capabilities.includes('read_tenant'))).map(({ receipt, ...x }) => x));
    if ((r = m(/^\/api\/exceptions\/([^/]+)\/([a-z]+)$/)) && req.method === 'POST') { if (!idem) return problem(res, 400, 'idempotency_key_required', 'Idempotency-Key is required.'); const v = Number(String(req.headers['if-match'] || '').replace(/"/g, '')); if (!v) return problem(res, 400, 'if_match_required', 'If-Match must contain the exception version.'); const out = execute(a, r[1], r[2], idem, v, await body(req)); return send(res, 200, out); }
    if (p === '/api/demo/reset') { if (!a.capabilities.includes('demo_reset')) return problem(res, 403, 'forbidden', 'Not permitted.'); const before = seq; seed(); seq = before; emit('demo.reset'); return send(res, 200, { command_id: idem, sequence: seq, reset_at: new Date().toISOString() }); }
    if (p === '/api/shifts') return send(res, 200, shifts.filter(s => s.store_id === (url.searchParams.get('storeId') || a.store_id)));
    if (p === '/api/shifts/clock-in' || p === '/api/shifts/clock-out') { const b = await body(req), s = shifts.find(x => x.actor_id === a.id && x.store_id === b.store_id); if (!s) return problem(res, 403, 'forbidden', 'No shift presence for this actor.'); s.on_shift = p.endsWith('in'); s.clocked_at = new Date().toISOString(); if (!s.on_shift) exceptions.filter(e => e.owner_actor_id === a.id).forEach(e => { e.owner_kind = 'role'; e.owner_actor_id = null; e.assigned_owner = e.role_owner; e.version++; e.timeline.push({ id: uid(), actor: 'System', role: 'System', timestamp: new Date().toISOString(), reason: 'Clock-out returned work to the role queue.', action_code: 'return_to_role', proofs: [], command_id: uid(), succeeded: true, state_after: e.state, digest: digest(e.id, 'rtr', Date.now()) }); }); emit('shift.changed'); return send(res, 200, s); }
    if (p === '/api/policies') { if (!a.capabilities.includes('publish_policy')) return problem(res, 403, 'forbidden', 'Not permitted.'); return send(res, 200, policies); }
    if ((r = m(/^\/api\/policies\/([^/]+)\/(preview|publish|unpublish)$/))) { if (!a.capabilities.includes('publish_policy')) return problem(res, 403, 'forbidden', 'Not permitted.'); const pol = policies.find(x => x.class === r[1]); if (!pol) return problem(res, 404, 'not_found', 'Unknown class.'); const b = await body(req); const th = b.threshold_score ?? pol.threshold_score, vb = b.volume_budget ?? pol.volume_budget; const expected = SOURCES.filter(s => s[1] === r[1]).length; if (r[2] === 'preview') return send(res, 200, { class: r[1], expected_count: expected, volume_budget: vb, would_exceed_budget: expected > vb, threshold_score: th }); if (r[2] === 'publish') { pol.published = true; pol.threshold_score = th; pol.volume_budget = vb; } else pol.published = false; emit('policy.changed'); return send(res, 200, { class: r[1], label: pol.label, published: pol.published, threshold_score: pol.threshold_score, volume_budget: pol.volume_budget, live_count: exceptions.filter(e => e.source_type === r[1]).length }); }
    if (p === '/api/proofs') return send(res, 200, proofsLedger);
    if (p === '/api/policy-metrics') { const open = exceptions.filter(e => !['resolved', 'suppressed'].includes(e.state)).length, resolved = exceptions.filter(e => e.state === 'resolved').length; return send(res, 200, { open_count: open, resolved_count: resolved, proof_count: proofsLedger.length, completion_rate: exceptions.length ? resolved / exceptions.length : 0, false_positive_rate: exceptions.length ? exceptions.filter(e => e.state === 'suppressed').length / exceptions.length : 0 }); }
    if (p === '/api/events') { res.writeHead(200, { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache' }); res.write(': ok\n\n'); const fn = env => res.write(`event: change\ndata: ${JSON.stringify(env)}\n\n`); subscribers.add(fn); const ka = setInterval(() => res.write(': keep-alive\n\n'), 20000); req.on('close', () => { subscribers.delete(fn); clearInterval(ka); }); return; }
    return problem(res, 404, 'not_found', 'Unknown endpoint.');
  } catch (err) { if (err instanceof ApiErr) return problem(res, err.status, err.code, err.message, err.extra); console.error(err); return problem(res, 500, 'server_error', String(err.message)); }
}).listen(PORT, '127.0.0.1', () => console.log(`StoreMind web preview on http://127.0.0.1:${PORT}  (accounts: hq district lead lead-west clerk · password "demo")`));
