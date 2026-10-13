export const modules = [
  {
    slug: "authority",
    name: "Authority & terms",
    short: "Authority",
    offer: "Contract Desk",
    surface: "sage",
    icon: "users-round",
    line: "The people behind the permission.",
    intro:
      "A shared reference for the organizations, people and terms behind a delegated task.",
    job: "Record whose approval is required before a buyer–supplier task begins.",
    input:
      "Buyer and supplier legal entities, approval owners, an authority reference and the terms version.",
    output:
      "An inspectable authority register with a named owner and dated next action.",
    exception:
      "Missing or expired authority pauses the workflow for human review.",
    limit:
      "Recording an authority reference does not verify signatory power or create a legally binding agreement.",
    steps: [
      "Identify both legal entities",
      "Reference reviewed delegation terms",
      "Record authority, owner and expiry",
      "Keep a visible review route",
    ],
  },
  {
    slug: "scope",
    name: "Scope & acceptance",
    short: "Scope",
    offer: "Contract Review",
    surface: "paper",
    icon: "file-check-2",
    line: "Agree the work before it moves.",
    intro:
      "A machine-readable task artifact with clear deliverables, exclusions and acceptance criteria.",
    job: "Make the task boundary understandable to both organizations and their agents.",
    input:
      "Task purpose, result format, deadline, exclusions, acceptance criteria and reviewer.",
    output:
      "A versioned scope record linked to the mandate and result receipt.",
    exception:
      "Changed scope creates a new proposal. The original approval remains visible.",
    limit:
      "An agent reporting completion does not mean a human has accepted the work.",
    steps: [
      "Define the deliverable",
      "Write the acceptance criteria",
      "Agree exclusions and amendments",
      "Assign the acceptance owner",
    ],
  },
  {
    slug: "mandates",
    name: "Mandates & limits",
    short: "Mandates",
    offer: "Contract Proof",
    surface: "clay",
    icon: "scan-line",
    line: "A ceiling that stays a ceiling.",
    intro:
      "A sandbox verifier for recorded scope, amount, currency and authority boundaries.",
    job: "Show when a proposed task or change sits outside the recorded mandate.",
    input:
      "Mandate ID, scope version, currency, ceiling, expiry and authority reference.",
    output:
      "Within limits, rejected or review-required, with a readable reason.",
    exception:
      "A $180 revision exceeds a $120 ceiling and is rejected without changing the original record.",
    limit:
      "Simulated checks are not payment authorization, cryptographic verification or proof of legal authority.",
    steps: [
      "Read the recorded mandate",
      "Compare scope and spending limits",
      "Explain any boundary failure",
      "Return exceptions to the owner",
    ],
  },
  {
    slug: "receipts",
    name: "Receipts & disputes",
    short: "Receipts",
    offer: "Contract Signal",
    surface: "limestone",
    icon: "receipt-text",
    line: "The receipt arrives. People decide.",
    intro:
      "A proposed milestone receipt and dispute evidence escrow module, starting with a synthetic record and human review handoff.",
    job: "Keep the result, provenance and pending decision together.",
    input:
      "Deliverable reference, source evidence, timestamps, milestone and assigned reviewer.",
    output:
      "A dated receipt and evidence package for acceptance or dispute review.",
    exception:
      "An incomplete or disputed result stays unresolved until the designated humans review it.",
    limit:
      "This preview does not adjudicate disputes or provide live evidence escrow.",
    steps: [
      "Receive the deliverable reference",
      "Record its provenance and time",
      "Check the agreed acceptance criteria",
      "Hand exceptions to human reviewers",
    ],
  },
  {
    slug: "reconciliation",
    name: "Invoice reconciliation",
    short: "Reconciliation",
    offer: "Contract Report",
    surface: "mushroom",
    icon: "notebook-tabs",
    line: "One record, through the final reference.",
    intro:
      "A proposed adapter to compare task, receipt and invoice references beside existing finance systems.",
    job: "Make a mismatch visible before a person reviews invoice reconciliation.",
    input: "Mandate and receipt references plus a mock invoice.",
    output:
      "A comparison report, an exception reason and a locally generated sample export.",
    exception:
      "A $180 mock invoice does not match a $120 receipt. It remains flagged for review.",
    limit:
      "No actual payment, bank reconciliation, money movement or settlement takes place.",
    steps: [
      "Link mandate and receipt",
      "Compare the mock invoice",
      "Flag reference or amount mismatches",
      "Export the sample evidence",
    ],
  },
];

const names = [
  [
    "M-DEMO-1",
    "Alder Analytics",
    "Pine Research",
    "Research summary",
    120,
    "Awaiting acceptance",
    "Mara Ellis",
  ],
  [
    "M-DEMO-2",
    "Cedar Systems",
    "Juniper Language",
    "Technical translation",
    80,
    "Blocked",
    "Owen Bell",
  ],
  [
    "M-DEMO-3",
    "Mesa Metrics",
    "Pine Research",
    "Market brief",
    150,
    "Rejected",
    "Nora Hayes",
  ],
  [
    "M-DEMO-4",
    "Alder Analytics",
    "Willow Data",
    "Dataset annotation",
    60,
    "Completed in simulation",
    "Mara Ellis",
  ],
  [
    "M-DEMO-5",
    "Cedar Systems",
    "Pine Research",
    "Source review",
    95,
    "Awaiting acceptance",
    "Owen Bell",
  ],
  [
    "M-DEMO-6",
    "Mesa Metrics",
    "Juniper Language",
    "Translation review",
    110,
    "Dispute review",
    "Nora Hayes",
  ],
  [
    "M-DEMO-7",
    "Alder Analytics",
    "Willow Data",
    "API documentation check",
    45,
    "Blocked",
    "Mara Ellis",
  ],
  [
    "M-DEMO-8",
    "Cedar Systems",
    "Pine Research",
    "Research digest",
    130,
    "Completed in simulation",
    "Owen Bell",
  ],
  [
    "M-DEMO-9",
    "Mesa Metrics",
    "Willow Data",
    "Metadata cleanup",
    70,
    "Rejected",
    "Nora Hayes",
  ],
  [
    "M-DEMO-10",
    "Alder Analytics",
    "Juniper Language",
    "Summary translation",
    90,
    "Awaiting acceptance",
    "Mara Ellis",
  ],
];
export const fixtures = names.map(
  ([id, buyer, supplier, task, ceiling, status, owner], i) => ({
    id,
    buyer,
    supplier,
    task,
    ceiling,
    currency: "USD",
    status,
    owner,
    date: "2026-10-08",
    timestamp: `2026-10-08T${String(9 + i).padStart(2, "0")}:05:00Z`,
    nextAction: "2026-10-09T10:00:00Z",
    authority:
      i === 1 ? "Expired" : i === 6 ? "Missing" : "Recorded in simulation",
    terms: "DEMO-v1",
    scope: "SCOPE-DEMO-v1",
    signature: `SIM-${id}`,
    receipt: ["Blocked", "Rejected"].includes(status)
      ? null
      : `R-DEMO-${i + 1}`,
    sourceRef: ["Blocked", "Rejected"].includes(status)
      ? `SCOPE-SOURCE-${i + 1}`
      : i === 0
        ? "E-DEMO-3"
        : `E-DEMO-${i + 3}`,
    authorityRef: `AUTH-DEMO-${i + 1}`,
    buyerAgent: `BUYER-AGENT-${i + 1}`,
    supplierAgent: `SUPPLIER-AGENT-${i + 1}`,
    receivedAt: ["Blocked", "Rejected"].includes(status)
      ? null
      : `8 Oct 2026 / ${String(10 + i).padStart(2, "0")}:00 UTC`,
    synthetic: true,
    acceptance:
      status === "Completed in simulation"
        ? "Accepted in simulation"
        : status === "Dispute review"
          ? "Disputed"
          : ["Blocked", "Rejected"].includes(status)
            ? "Not submitted for acceptance"
            : "Pending human review",
    settlement: "No actual settlement",
  }),
);
export const timeline = [
  ["09:00", "Human approval recorded", "AUTH-DEMO-1 · Terms DEMO-v1"],
  ["09:05", "Sample mandate issued", "M-DEMO-1 · USD 120 ceiling"],
  ["09:10", "Bounded scope exchanged", "Research summary · SCOPE-DEMO-v1"],
  [
    "09:20",
    "$180 change rejected",
    "Requested amount exceeds the $120 ceiling",
  ],
  [
    "10:00",
    "$120 result receipt received",
    "R-DEMO-1 · Source reference E-DEMO-3",
  ],
  [
    "10:05",
    "Human acceptance pending",
    "Mara Ellis · next review 9 Oct, 10:00 UTC",
  ],
];
export const demoFields = [
  "task_id",
  "buyer_entity",
  "supplier_entity",
  "agent_id",
  "human_principal",
  "authority_ref",
  "authority_status",
  "authority_expiry",
  "terms_version",
  "scope_version",
  "deliverables",
  "exclusions",
  "acceptance_criteria",
  "mandate_id",
  "currency",
  "ceiling",
  "requested_amount",
  "simulated_signature_id",
  "change_status",
  "receipt_id",
  "source_ref",
  "provenance",
  "event_timestamp",
  "reviewer",
  "next_action_at",
  "acceptance_status",
  "dispute_status",
  "invoice_ref",
  "reconciliation_status",
  "settlement_status",
  "synthetic",
  "fixture_version",
];
export const sources = [
  [
    "A2A specification",
    "https://a2a-protocol.org/latest/specification/",
    "Agent communication, tasks, artifacts and implementation-specific authorization.",
  ],
  [
    "AP2 documentation",
    "https://ap2-protocol.org/faq/",
    "Signed payment intent and supporting evidence. Mandates already exist in adjacent protocols.",
  ],
  [
    "x402 flow",
    "https://docs.cdp.coinbase.com/x402/how-it-works",
    "Payment verification and settlement handshakes.",
  ],
  [
    "Automated contracting",
    "https://uncitral.un.org/en/mlac",
    "A model-law framework; applicable law and the parties’ authority remain to be established.",
  ],
];
export const faqs = [
  [
    "Can agents form a contract through this preview?",
    "The preview makes no legal-contract claim. All mandates and signature identifiers are simulated and non-binding. Applicable authority, terms and jurisdiction require the parties’ counsel.",
  ],
  [
    "What does TaskAccord add beside A2A, AP2 or x402?",
    "The hypothesis is a shared enterprise task record: human authority references, approved scope, acceptance criteria, changes and receipts. Protocol interoperability alone does not validate demand for that record.",
  ],
  [
    "Does the demo move money?",
    "No. There is no live escrow, payment authorization, KYC, money movement, billing or settlement. Reconciliation is a comparison of fictional references.",
  ],
  [
    "Who should join a sandbox discussion?",
    "A marketplace operator, an existing transacting buyer–supplier pair, the partnerships sponsor and procurement/legal owners on both sides. Counsel evaluates authority and jurisdiction.",
  ],
  [
    "Are the modules and prices available today?",
    "They are proposed directions and test hypotheses. The $6,000 joint pilot and possible $2,000 monthly workflow model have not been validated or accepted by buyers.",
  ],
  [
    "What can I put in the application?",
    "Business context only: role, organizations, existing API task and review owners. Do not enter secrets, payment details, contracts or logs. The current application is a local preview and sends nothing.",
  ],
  ["Are A2A, AP2 or x402 integrations live?", "No. They are factual adjacent protocols, not live TaskAccord integrations or partner endorsements. Any future mapping needs an identified workflow, protocol version and technical review."],
  ["What happens when the result is disputed?", "The synthetic receipt preserves evidence and routes the decision to the named human reviewers. TaskAccord does not decide the dispute or provide escrow. A real pilot must define the parties’ dispute process."],
  ["Which jurisdiction governs the task?", "No governing jurisdiction or enforceability position has been validated. Both legal entities and their counsel must identify the intended jurisdiction and review authority and terms before a pilot."],
];

export function recordTimeline(record) {
  if (record.id === "M-DEMO-1")
    return timeline.map((e) =>
      e[1] === "Human acceptance pending"
        ? [
            e[0],
            record.acceptance === "Pending human review"
              ? e[1]
              : record.acceptance,
            e[2],
          ]
        : e,
    );
  const hour = record.timestamp.slice(11, 13);
  const entries = [
    [
      `${hour}:00`,
      record.authority === "Recorded in simulation"
        ? "Human authority recorded"
        : `Authority ${record.authority.toLowerCase()}`,
      `${record.authorityRef} · ${record.terms}`,
    ],
    [
      `${hour}:05`,
      "Sample task record created",
      `${record.id} · USD ${record.ceiling} ceiling`,
    ],
    [
      `${hour}:10`,
      "Scope reference recorded",
      `${record.task} · ${record.scope}`,
    ],
  ];
  if (record.receipt)
    entries.push(
      [
        record.receivedAt.slice(13, 18),
        "Sample result receipt received",
        `${record.receipt} · ${record.sourceRef}`,
      ],
      [
        `${String(Number(hour) + 1).padStart(2, "0")}:05`,
        record.acceptance,
        `${record.owner} · next review 9 Oct, 10:00 UTC`,
      ],
    );
  else
    entries.push([
      `${hour}:20`,
      record.status === "Blocked"
        ? "Human authority review required"
        : "Proposal rejected",
      record.status === "Blocked"
        ? `${record.authority} authority; no result receipt`
        : "Outside the approved task scope; no result receipt",
    ]);
  return entries;
}

export const fieldDefinitions = {
  task_id: "Unique fictional task reference; M-DEMO-1 through M-DEMO-10.",
  buyer_entity: "Fictional buyer legal entity. Not a customer.",
  supplier_entity: "Fictional supplier legal entity. Not a customer.",
  agent_id:
    "Fictional buyer or supplier agent identifier, separate from its human principal.",
  human_principal:
    "The legal entity behind the agent; recorded approval does not verify authority.",
  authority_ref: "Sample paper authority reference; AUTH-DEMO-n.",
  authority_status:
    "Recorded in simulation, Missing, or Expired. No legal verification.",
  authority_expiry:
    "Fixed synthetic expiry; 7 Oct for expired authority, 10 Oct otherwise, at 23:59 UTC.",
  terms_version:
    "DEMO-v1: static sample delegation terms, not a signed contract.",
  scope_version:
    "SCOPE-DEMO-v1: proposed result, exclusions and acceptance reference.",
  deliverables: "The fictional task result in the agreed source-linked format.",
  exclusions:
    "No purchases, price changes or actions outside the recorded task.",
  acceptance_criteria:
    "Source references complete, agreed format present and named human review.",
  mandate_id: "Sample mandate reference; no independent contracting authority.",
  currency: "USD is the only currency used in this fixture set.",
  ceiling:
    "A positive sample ceiling in USD; checked separately for each task.",
  requested_amount:
    "Local editable proposal used only by the simulation checker.",
  simulated_signature_id:
    "SIM-M-DEMO-n; not a cryptographic signature or legal e-signature.",
  change_status:
    "Within sample limits, rejected, or authority review required. Cannot amend a mandate.",
  receipt_id:
    "R-DEMO-n for delivered results; null for blocked or rejected tasks.",
  source_ref:
    "Fictional result evidence or scope input reference. Never a customer document.",
  provenance:
    "Sample source ID, task association and fixed UTC event timestamp.",
  event_timestamp:
    "Chronological fixture time on 8 October 2026 UTC; not live activity.",
  reviewer: "Fictional human owner assigned to review the record.",
  next_action_at:
    "9 October 2026 / 10:00 UTC, fixed sample review or follow-up.",
  acceptance_status:
    "Pending, not submitted, disputed, or accepted in simulation. Separate from settlement.",
  dispute_status:
    "Human review route; local state only. No adjudication or messages.",
  invoice_ref:
    "Illustrative comparison reference only; no actual invoice created or sent.",
  reconciliation_status:
    "Mock amount mismatch or missing receipt requires human review.",
  settlement_status: "Always No actual settlement in this workspace.",
  synthetic:
    "Always true. Organizations, people and all record contents are fictional.",
  fixture_version:
    "1.0: canonical synthetic fixture set restored by Reset demo.",
};
