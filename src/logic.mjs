export function checkMandate({
  amount,
  ceiling = 120,
  currency = "USD",
  scope = "SCOPE-DEMO-v1",
  authority = "Recorded in simulation",
  expired = false,
}) {
  const cents = Math.round(Number(amount) * 100);
  if (amount === "" || amount === null || !Number.isFinite(cents) || cents < 0)
    return {
      pass: false,
      state: "review",
      reason: "Enter a valid non-negative amount.",
    };
  if (authority !== "Recorded in simulation" || expired)
    return {
      pass: false,
      state: "blocked",
      reason: "Human authority needs review before the task proceeds.",
    };
  if (currency !== "USD")
    return {
      pass: false,
      state: "rejected",
      reason: "The recorded mandate authorizes USD only.",
    };
  if (scope !== "SCOPE-DEMO-v1")
    return {
      pass: false,
      state: "rejected",
      reason: "Changed scope needs a new human-reviewed proposal.",
    };
  if (cents > Math.round(ceiling * 100))
    return {
      pass: false,
      state: "rejected",
      reason: `$${(cents / 100).toFixed(2)} exceeds the approved $${ceiling} ceiling. The original mandate is unchanged.`,
    };
  return {
    pass: true,
    state: "within",
    reason:
      "Within the recorded sample ceiling. Human acceptance is still required.",
  };
}
const allowed = [
  "landing_view",
  "demo_open",
  "demo_complete",
  "pricing_view",
  "form_start",
  "preview_form_submit",
  "preview_verified_signup",
  "preview_interview_booked",
];
const queue = [],
  seen = new Set();
export function track(name, props = {}, consent = false) {
  if (!consent || !allowed.includes(name)) return false;
  const key =
    props.dedupeKey || `${name}:${props.route || "/"}:${props.step || ""}`;
  if (seen.has(key)) return false;
  seen.add(key);
  const url = new URL(
    typeof window === "undefined"
      ? "https://example.invalid"
      : window.location.href,
  );
  const utm = {};
  for (const k of [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_content",
    "utm_term",
    "ad_id",
  ]) {
    const v = url.searchParams.get(k);
    if (v) utm[k] = v.slice(0, 100);
  }
  queue.push({
    event_id: `preview-${queue.length + 1}`,
    schema_version: 1,
    event: name,
    timestamp: new Date().toISOString(),
    route: props.route || "/",
    environment: "local-concept-preview",
    synthetic: name.startsWith("demo_"),
    consent: true,
    ...utm,
  });
  return true;
}
export function events() {
  return [...queue];
}
export function revoke() {
  queue.length = 0;
  seen.clear();
}
export function sampleExport(record) {
  return {
    watermark:
      "DEMO — SYNTHETIC SAMPLE DATA / CONCEPT PREVIEW / SIMULATED; NON-BINDING",
    fixture_version: "1.0",
    synthetic: true,
    mandate_id: record.id,
    buyer_entity: record.buyer,
    supplier_entity: record.supplier,
    ceiling_minor_units: record.ceiling * 100,
    currency: record.currency,
    scope_version: record.scope,
    simulated_signature_id: record.signature,
    receipt_id: record.receipt,
    acceptance_status: record.acceptance,
    settlement_status: "No actual settlement",
    source_ref: record.sourceRef,
    reviewer: record.owner,
    event_date: "2026-10-08",
    next_action_at: record.nextAction,
  };
}
