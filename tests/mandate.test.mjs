import test from "node:test";
import assert from "node:assert/strict";
import {
  checkMandate,
  track,
  events,
  revoke,
  sampleExport,
} from "../src/logic.mjs";
import { fixtures, recordTimeline } from "../src/data.js";
test("The $180 revision is rejected and $120 still requires a human", () => {
  const result = checkMandate({ amount: 180 });
  assert.equal(result.pass, false);
  assert.match(result.reason, /original mandate is unchanged/);
  const within = checkMandate({ amount: 120 });
  assert.equal(within.pass, true);
  assert.match(within.reason, /Human acceptance is still required/);
});
test("Amounts use the selected fixture ceiling and reject unsafe input", () => {
  assert.equal(checkMandate({ amount: 80.01, ceiling: 80 }).pass, false);
  assert.equal(checkMandate({ amount: 80, ceiling: 80 }).pass, true);
  for (const amount of ["", null, -1, "broken", Infinity])
    assert.equal(checkMandate({ amount }).pass, false);
});
test("Authority, currency, and changed scope independently block a proposal", () => {
  for (const authority of ["Expired", "Missing"])
    assert.equal(checkMandate({ amount: 1, authority }).state, "blocked");
  assert.equal(checkMandate({ amount: 1, expired: true }).state, "blocked");
  assert.equal(checkMandate({ amount: 1, currency: "EUR" }).pass, false);
  assert.equal(checkMandate({ amount: 1, scope: "v2" }).pass, false);
});
test("All ten fixtures have consistent receipt and authority states", () => {
  assert.equal(new Set(fixtures.map((f) => f.id)).size, 10);
  assert.equal(
    fixtures.filter((f) => f.status === "Awaiting acceptance").length,
    3,
  );
  for (const f of fixtures) {
    assert.equal(f.synthetic, true);
    assert.ok(f.ceiling > 0);
    if (f.status === "Blocked" || f.status === "Rejected") {
      assert.equal(f.receipt, null);
      assert.equal(f.receivedAt, null);
      assert.equal(f.acceptance, "Not submitted for acceptance");
    }
    const trace = recordTimeline(f);
    assert.ok(trace.every((e) => e.length === 3 && /^\d{2}:\d{2}$/.test(e[0])));
    assert.ok(trace.flat().some((text) => text.includes(f.id)));
  }
});
test("Exports never imply a real signature, acceptance or settlement", () => {
  for (const f of fixtures) {
    const exported = sampleExport(f);
    assert.match(exported.watermark, /SIMULATED; NON-BINDING/);
    assert.equal(exported.synthetic, true);
    assert.equal(exported.ceiling_minor_units, f.ceiling * 100);
    assert.equal(exported.receipt_id, f.receipt);
    assert.equal(exported.settlement_status, "No actual settlement");
  }
});
test("Measurement requires consent, deduplicates, excludes lead text, segregates fixtures", () => {
  revoke();
  assert.equal(track("landing_view", {}, false), false);
  assert.equal(events().length, 0);
  assert.equal(
    track("landing_view", { email: "private@example.com" }, true),
    true,
  );
  assert.equal(track("landing_view", {}, true), false);
  assert.equal(track("demo_open", { route: "/demo" }, true), true);
  assert.equal(events()[1].synthetic, true);
  assert.equal("email" in events()[0], false);
  assert.equal(track("form_submit", {}, true), false);
  revoke();
  assert.equal(events().length, 0);
  assert.equal(track("landing_view", {}, true), true);
  revoke();
});
