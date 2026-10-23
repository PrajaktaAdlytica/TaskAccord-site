import { useEffect, useRef, useState } from "react";
import {
  modules,
  fixtures,
  timeline,
  recordTimeline,
  demoFields,
  fieldDefinitions,
  sources,
  faqs,
} from "./data";
import { checkMandate, track, revoke, sampleExport } from "./logic.mjs";
import {MotionContext,MotionSurface,AnimatedDiagram,ProductMotionSequence,ProtocolMotionSequence,PreviewMotionSequence} from "./Motion";
import {HomeIntro} from "./HomeIntro";
import {useScrollReveal} from "./ScrollReveal";
const assets = "/assets";
function tabKeys(e, count, current, select) {
  let next = current;
  if (e.key === "ArrowRight") next = (current + 1) % count;
  else if (e.key === "ArrowLeft") next = (current - 1 + count) % count;
  else if (e.key === "Home") next = 0;
  else if (e.key === "End") next = count - 1;
  else return;
  e.preventDefault();
  select(next);
  e.currentTarget.parentElement.querySelectorAll('[role="tab"]')[next]?.focus();
}
const Icon = ({ name = "arrow-right", size = 20 }) => (
  <img
    className="icon"
    src={`${assets}/icons/lucide-${name}.svg`}
    width={size}
    height={size}
    alt=""
  />
);
const Logo = ({ reverse = false }) => (
  <img
    className="logo"
    src={`${assets}/logos/TaskAccord-${reverse ? "reversed" : "primary"}.svg`}
    alt="TaskAccord"
  />
);
function navigate(to) {
  history.pushState(null, "", to);
  window.dispatchEvent(new Event("popstate"));
}
function Link({ to, children, className = "", ...props }) {
  return (
    <a
      href={to}
      className={className}
      onClick={(e) => {
        if (
          to.startsWith("/") &&
          !e.metaKey &&
          !e.ctrlKey &&
          !e.shiftKey &&
          !e.altKey
        ) {
          e.preventDefault();
          navigate(to);
        }
      }}
      {...props}
    >
      {className.includes("nav-link") ? (
        <span className="flip">
          <span>{children}</span>
          <span aria-hidden="true">{children}</span>
        </span>
      ) : (
        children
      )}
    </a>
  );
}
function Button({
  to,
  children,
  secondary = false,
  small = false,
  onClick,
  disabled = false,
  type = "button",
  icon = "arrow-right",
  className = "",
}) {
  const c = `button ${secondary ? "button-secondary" : ""} ${small ? "button-small" : ""} ${className}`;
  const content = (
    <>
      <span className="flip">
        <span>{children}</span>
        <span aria-hidden="true">{children}</span>
      </span>
      {icon && <Icon name={icon} />}
    </>
  );
  return to ? (
    <Link to={to} className={c}>
      {content}
    </Link>
  ) : (
    <button type={type} className={c} onClick={onClick} disabled={disabled}>
      {content}
    </button>
  );
}
function Tag({ children, tone = "", icon }) {
  return (
    <span className={`tag ${tone}`}>
      {icon && <Icon name={icon} size={14} />} {children}
    </span>
  );
}
function Modal({ title, children, onClose }) {
  const ref = useRef(null);
  useEffect(() => {
    const last = document.activeElement;
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    ref.current?.querySelector("button")?.focus();
    function key(e) {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") {
        const all = ref.current.querySelectorAll(
          "button,a[href],input,select,textarea",
        );
        const first = all[0],
          last = all[all.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener("keydown", key);
    return () => {
      document.body.style.overflow = old;
      document.removeEventListener("keydown", key);
      last?.focus?.();
    };
  }, []);
  return (
    <div
      className="modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <section
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        ref={ref}
      >
        <div className="modal-head">
          <p className="eyebrow">TaskAccord</p>
          <button
            className="icon-button"
            aria-label="Close dialog"
            onClick={onClose}
          >
            <Icon name="x" />
          </button>
        </div>
        <h2>{title}</h2>
        {children}
      </section>
    </div>
  );
}

function Header({ path }) {
  const [open, setOpen] = useState(false),
    [product, setProduct] = useState(false),
    [scrolled, setScrolled] = useState(false);
  const ref = useRef(null),
    menuRef = useRef(null);
  useEffect(() => {
    setOpen(false);
    setProduct(false);
  }, [path]);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", f, { passive: true });
    const key = (e) => {
      if (e.key === "Escape") {
        const mobileOpen = document
          .querySelector(".main-nav")
          ?.classList.contains("is-open");
        const productOpen =
          ref.current?.getAttribute("aria-expanded") === "true";
        if (!mobileOpen && !productOpen) return;
        setProduct(false);
        setOpen(false);
        (mobileOpen ? menuRef : ref).current?.focus();
      }
    };
    const outside = (e) => {
      if (!e.target.closest(".product-nav")) setProduct(false);
    };
    document.addEventListener("keydown", key);
    document.addEventListener("click", outside);
    return () => {
      window.removeEventListener("scroll", f);
      document.removeEventListener("keydown", key);
      document.removeEventListener("click", outside);
    };
  }, []);
  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""} ${path.split("?")[0] === "/" ? "home-intro-header" : ""}`} >
      <div className="header-inner">
        <Link to="/" aria-label="TaskAccord home">
          <Logo />
        </Link>
        <nav
          className={open ? "main-nav is-open" : "main-nav"}
          aria-label="Main navigation"
          id="main-navigation"
        >
          <div className="product-nav">
            <button
              ref={ref}
              aria-expanded={product}
              aria-controls="product-menu"
              onClick={() => setProduct(!product)}
              className="nav-link"
            >
              <span className="flip">
                <span>Product</span>
                <span aria-hidden="true">Product</span>
              </span>
              <Icon name="chevron-down" size={14} />
            </button>
            {product && (
              <div className="mega-menu" id="product-menu">
                <div className="mega-intro">
                  <span className="eyebrow">Proposed product</span>
                  <h3>
                    One task.
                    <br />
                    Five responsibilities.
                  </h3>
                  <Link to="/product">
                    Product overview <Icon name="arrow-up-right" />
                  </Link>
                </div>
                <div className="mega-links">
                  {modules.map((m) => (
                    <Link key={m.slug} to={`/product/${m.slug}`}>
                      <Icon name={m.icon} />
                      <span>
                        {m.name}
                        <small>{m.line}</small>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          <Link className="nav-link" to="/how-it-works">
            How it works
          </Link>
          <Link className="nav-link" to="/use-cases">
            For teams
          </Link>
          <Link className="nav-link" to="/pilot">
            Pilot & pricing
          </Link>
          <Link className="nav-link" to="/limits">
            Limits & legal
          </Link>
          <Link className="nav-link" to="/preview-access">Preview access</Link>
        <Link className="nav-link mobile-preview-link" to="/sign-in">Sign in</Link>
        </nav>
        <div className="header-actions">
          <Link className="preview-access-link signin-nav-link" to="/sign-in">Sign in</Link>
          <Button small to="/sandbox">
            Discuss a sandbox
          </Button>
          <button
            ref={menuRef}
            className="icon-button mobile-menu-button"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            aria-controls="main-navigation"
            onClick={() => setOpen(!open)}
          >
            <Icon name={open ? "x" : "menu"} />
          </button>
        </div>
      </div>
    </header>
  );
}

function Footer({ privacy }) {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="target-footer-brand"><Link to="/"><Logo/></Link><span>Clear bounds.<br/>Brighter work.</span></div>
        <div className="footer-directory"><div className="footer-top">
          <div className="footer-brand">
            <Link to="/">
              <Logo reverse />
            </Link>
            <h2>
              Small tasks.
              <br />
              Clear accords.
            </h2>
            <p>
              Human-approved task mandates and receipts
              <br />
              for bounded agent delegation.
            </p>
          </div>
          <div className="footer-links">
            <div>
              <span>Product</span>
              <Link to="/product">Overview</Link>
              {modules.map(m=><Link key={m.slug} to={`/product/${m.slug}`}>{m.name}</Link>)}
              <Link to="/how-it-works">How it works</Link>
              <Link to="/demo">Synthetic demo</Link>
              <Link to="/pilot">Pilot & pricing</Link>
            </div>
            <div>
              <span>Learn</span>
              <Link to="/use-cases">For teams</Link>
              <Link to="/resources">Resources</Link>
              <Link to="/resources/protocol-boundaries">
                Protocol boundaries
              </Link>
              <Link to="/limits">Limits & legal</Link>
            </div>
            <div>
              <span>Company</span>
              <Link to="/about">About TaskAccord</Link>
              <Link to="/contact">Contact</Link>
              <a href="mailto:hello@taskaccord.example">hello@taskaccord.example</a>
              <CompanyAddress className="footer-address" />
              <Link to="/sandbox">Discuss a sandbox</Link>
              <Link to="/preview-access">Preview access</Link>
              <Link to="/sign-in">Sign in</Link>
            </div>
            <div><span>Legal</span><Link to="/privacy">Privacy</Link><Link to="/terms">Terms</Link><Link to="/accessibility">Accessibility</Link><Link to="/contact">Privacy & deletion contact</Link></div>
          </div>
        </div>
        </div><div className="footer-bottom">
          <div>
            <p>© 2026 TaskAccord</p>
            <p className="footer-disclosure">
              Research-stage concept. Demand and willingness to pay remain
              unvalidated.
            </p>
          </div>
          <div className="legal-links">
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms</Link>
            <Link to="/accessibility">Accessibility</Link>
            <button onClick={privacy}>Privacy choices</button>
          </div>
          <div className="social-icons">
            <button disabled aria-label="LinkedIn — inactive">
              <img
                src="/assets/icons/linkedin-official-blue.png"
                alt="LinkedIn"
              />
            </button>
            <button disabled aria-label="Crunchbase — inactive">
              <img
                src="/assets/icons/crunchbase-official-profile-icon.png"
                alt="Crunchbase"
              />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

function CompanyAddress({ className = "" }) {
  return <address className={className}>216/4 Dien Bien Phu St.<br/>Ward 7<br/>District 3<br/>Ho Chi Minh City<br/>790762<br/>Vietnam</address>;
}

function FAQ({ items = faqs }) {
  return (
    <div className="faq-list">
      {items.map(([q, a]) => (
        <details key={q}>
          <summary>
            {q}
            <Icon name="chevron-down" />
          </summary>
          <p>{a}</p>
        </details>
      ))}
    </div>
  );
}
function SourceLinks() {
  return (
    <div className="source-links">
      {sources.map(([name, url]) => (
        <a href={url} key={name} target="_blank" rel="noreferrer">
          {name}
          <Icon name="arrow-up-right" size={16} />
        </a>
      ))}
    </div>
  );
}

const chapters = [
  "The survey",
  "Authority",
  "Approved scope",
  "The boundary",
  "The receipt",
  "One shared record",
];
function TaskRecord() {
  return <div className="task-preview">
    <div className="task-preview-top"><span><i/> DEMO — SYNTHETIC DATA</span><span>CONCEPT PREVIEW</span></div>
    <div className="task-preview-title"><div><p className="eyebrow">M-DEMO-1 / RESEARCH SUMMARY</p><h2>A task with<br/>clear boundaries.</h2></div><Icon name="file-check-2" size={32}/></div>
    <div className="entity-pair"><div><span>BUYER / FICTIONAL</span><strong>Alder Analytics</strong></div><Icon/><div><span>SUPPLIER / FICTIONAL</span><strong>Pine Research</strong></div></div>
    <div className="record-ledger"><div><span>Human authority</span><strong>Recorded in simulation</strong></div><div><span>Approved ceiling</span><strong>$120 <small>USD</small></strong></div><div><span>Requested revision</span><strong className="record-rejected">$180 · Rejected</strong></div><div><span>Deliverable receipt</span><strong>$120 · Received</strong></div></div>
    <div className="record-review"><Icon name="user-round"/><div><strong>Human acceptance pending</strong><span>Mara Ellis · Buyer reviewer</span></div><Link to="/demo/tasks/M-DEMO-1" aria-label="Open synthetic task M-DEMO-1"><Icon name="arrow-up-right"/></Link></div>
    <div className="record-foot"><span>8 OCT 2026 · 10:00 UTC</span><span>Simulated; non-binding</span></div>
  </div>;
}
function OfferCards({editorial=false}) {
  return <div className={editorial ? "offer-editorial" : "offer-grid"}>{modules.map((m,i)=><article key={m.slug} className={`offer-card offer-${m.slug}`}>
    <div className="offer-copy"><p className="eyebrow">0{i+1} / PROPOSED {m.offer}</p><h3>{m.name}</h3><p>{m.intro}</p><Link className="text-link" to={`/product/${m.slug}`}>Explore {m.short.toLowerCase()} <Icon/></Link></div>
    <BrandIllustration slug={m.slug}/>
  </article>)}</div>;
}
function ExceptionCheck() {
  const [amount,setAmount]=useState(180);
  const result=checkMandate({amount});
  return <div className="exception-check"><div className="exception-top"><span className="eyebrow">M-DEMO-1 / SIMULATED CHECK</span><span>DEMO</span></div><div className="exception-amounts"><div><small>Approved ceiling</small><strong>$120</strong></div><Icon/><div><small>Proposed amount</small><strong className={result.pass?'':'record-rejected'}>${amount}</strong></div></div><div className="measure-track"><span className="ceiling-marker">$120 ceiling</span><span className={`amount-marker ${result.pass?'within':''}`}>${amount}</span></div><div className="amount-options" role="group" aria-label="Choose a synthetic proposal amount"><button aria-pressed={amount===120} onClick={()=>setAmount(120)}>Test $120 task</button><button aria-pressed={amount===180} onClick={()=>setAmount(180)}>Test $180 revision</button></div><div className={`check-result ${result.pass?'pass':'reject'}`} role="status"><Icon name={result.pass?'check':'circle-x'}/><div><strong>{result.pass?'Within sample ceiling':'Change rejected'}</strong><p>{result.reason}</p></div></div><p className="micro">Local simulation only. No signature verification or payment authorization.</p></div>;
}
function Home() {
 const introController=useRef(null);
 return <main className="company-home with-home-intro"><HomeIntro controller={introController}/>
  <section className="company-hero" id="homepage-hero"><div className="container intro-return-row"><button type="button" onClick={()=>introController.current?.replay()}>Back to intro <span aria-hidden="true">↑</span></button></div><div className="container funding-announcement" role="note"><span>FUNDING UPDATE</span><p>TaskAccord has secured venture capital funding. Investor and amount details to follow.</p></div><div className="container hero-layout"><div className="hero-copy"><p className="eyebrow">HUMAN-APPROVED TASK DELEGATION</p><h1>Set the task.<br/>Keep authority<br/>with people.</h1><p className="hero-lead">Clear scope, spending limits and result receipts for bounded buyer–supplier agent tasks.</p><p className="hero-audience">For API marketplaces bringing an existing buyer and supplier into one reviewed workflow.</p><div className="actions"><Button to="/sandbox">Discuss a sandbox</Button><Button to="/demo" secondary>Explore the demo</Button></div><p className="hero-status"><i/> Research-stage concept · No live contracting or payments</p></div><MotionSurface className="hero-workbench hero-motion" label="task record"><div className="workbench-note">ONE TASK. TWO ORGANIZATIONS. HUMAN AUTHORITY.</div><TaskRecord/><span className="workbench-caption">A fictional transaction. A concrete decision.</span></MotionSurface></div></section>
  <section className="question-strip"><div className="container"><p className="eyebrow">THE QUESTIONS BEHIND EVERY DELEGATION</p><div className="question-grid">{['Who approved this task?','What can change?','Who accepts the result?'].map((q,i)=><div key={q}><span>0{i+1}</span><h2>{q}</h2></div>)}</div><div className="question-note"><p>Messages can carry a task. Payment rails can carry funds. The proposed workflow asks whether both parties need a shared record of authority, boundaries and human decisions.</p><Link to="/how-it-works" className="text-link">Understand the workflow <Icon/></Link></div></div></section>
  <section className="site-section workflow-section"><div className="container"><div className="section-head"><div><p className="eyebrow">THE WORKFLOW</p><h2>One transaction.<br/>Every handoff visible.</h2></div><p>Follow M-DEMO-1 from reviewed paper terms to a result awaiting human acceptance. Agents exchange artifacts; people own the approvals.</p></div><div className="workflow-grid">{[
   ['Human terms','Counsel reviews authority and delegation terms.','users-round'],['Sample mandate','Record a $120 ceiling and approved scope.','file-check-2'],['Bounded task','Exchange the agreed research deliverable.','scan-line'],['Changed proposal','Reject the $180 revision. Keep the ceiling.','circle-x'],['Result receipt','Record evidence. Await human acceptance.','receipt-text'],['Invoice reference','Compare mock records; reconcile manually.','notebook-tabs']
  ].map(([title,desc,icon],i)=><Link to={`/product/${["authority","mandates","scope","mandates","receipts","reconciliation"][i]}`} className={`workflow-tile workflow-tile-${i+1}`} key={title}><span className="shutter-blinds" aria-hidden="true">{[0,1,2,3,4].map(n=><i key={n} style={{"--band":n}}/>)}</span><div className="step-top"><span>0{i+1}</span><Icon name={icon}/></div><h3>{title}</h3><p>{desc}</p><span className="workflow-tile-arrow" aria-hidden="true">↗</span></Link>)}</div><Link className="text-link" to="/demo/tasks/M-DEMO-1">Inspect the complete synthetic record <Icon/></Link></div></section>
  <section className="site-section offers-section"><div className="container"><div className="section-head"><div><p className="eyebrow">FIVE PROPOSED OFFERS</p><h2>Different responsibilities.<br/>One shared task record.</h2></div><p>Five separate product hypotheses. The first reviewed pilot selects one module for one repeatable workflow.</p></div><OfferCards/></div></section>
  <section className="site-section exception-section"><div className="container split"><div><p className="eyebrow">THE EXCEPTION THAT MATTERS</p><h2>A change request.<br/>A firm boundary.</h2><p className="section-lead">A $180 revision does not quietly become a $120 approval.</p><p>The simulated check explains the rejection and retains the original mandate. New scope or spending needs a new human-reviewed proposal.</p><Link to="/demo/tasks/M-DEMO-1?tab=Changes" className="text-link">Review the change evidence <Icon/></Link></div><ExceptionCheck/></div></section>
  <ProductCapture slug="authority"/>
  <section className="site-section teams-section"><div className="container"><div className="section-head"><div><p className="eyebrow">DISTINCT OWNERS</p><h2>The task is shared.<br/>Responsibility stays clear.</h2></div><p>Start with a known pair already transacting through APIs. Partnerships sponsors the discussion; procurement and legal owners join from both sides.</p></div><div className="owner-grid">{[['Marketplace operator','Coordinates one existing buyer–supplier workflow.'],['Buyer & supplier','Agree scope, changes, evidence and acceptance.'],['Procurement & counsel','Review authority, jurisdiction and dispute routes.']].map(([t,d])=><article key={t}><Icon name={t.startsWith('Marketplace')?'building-2':t.startsWith('Buyer')?'users-round':'file-check-2'}/><h3>{t}</h3><p>{d}</p></article>)}</div><Link to="/use-cases" className="text-link">Explore research and translation workflows <Icon/></Link></div></section>
  <section className="site-section ecosystem-section"><div className="container split"><div><p className="eyebrow">BESIDE EXISTING SYSTEMS</p><h2>A task record.<br/>Within a larger system.</h2><p>Existing supplier contracts, procurement approvals and payment-provider processes remain essential context—and potential substitutes.</p><Link className="text-link" to="/resources/protocol-boundaries">Read the protocol boundaries <Icon/></Link></div><MotionSurface className="ecosystem-motion" label="ecosystem boundary"><div className="ecosystem-map"><div className="ecosystem-principal"><Icon name="building-2"/><span>Human legal entities & existing agreements</span></div><div className="ecosystem-center"><Logo/><span>Proposed authority, scope & receipt layer</span></div><div className="ecosystem-rails">{[['A2A','Agent communication'],['AP2','Payment mandates'],['x402','HTTP-native payments']].map(([t,d])=><div key={t}><strong>{t}</strong><span>{d}</span></div>)}</div><p>Adjacent protocols · No live integrations or endorsement</p></div></MotionSurface></div></section>
  <section className="site-section preview-limits"><div className="container"><div className="section-head"><div><p className="eyebrow">HONEST EVIDENCE</p><h2>A useful preview.<br/>An unvalidated business.</h2></div><Link className="text-link" to="/limits">Limits & legal <Icon/></Link></div><div className="limits-columns"><article><span>WHAT YOU CAN INSPECT</span><h3>A possible record structure.</h3><p>Bounded scope, visible exceptions, linked evidence and a human review handoff using synthetic data.</p></article><article><span>WHAT STILL NEEDS EVIDENCE</span><h3>Demand and legal adoption.</h3><p>Authority, enforceability, jurisdiction, compliance, settlement partners, disputes and commercially viable repeat volume.</p></article></div></div></section>
  <section className="site-section commercial-section"><div className="container"><div className="section-head"><div><p className="eyebrow">VALIDATION FIRST</p><h2>Paper before rail.<br/>Commitment before build.</h2></div><p>Advance only after both sides sign a counsel-reviewed pilot defining authority, ceiling, acceptance and dispute process.</p></div><div className="commercial-grid"><article><p className="eyebrow">JOINT PILOT / TEST HYPOTHESIS</p><h3>$6,000</h3><p>One existing pair, one selected module, one manually rehearsed task workflow.</p><Link to="/pilot" className="text-link">Review the pilot prerequisites <Icon/></Link></article><article><p className="eyebrow">POSSIBLE FUTURE WORKFLOW SAAS</p><h3>$2,000 <small>/month</small></h3><p>Conditional on actual repetition, legal adoption, compliance review and viable delivery costs.</p><Link to="/pilot" className="text-link">Understand the conditions <Icon/></Link></article></div><p className="micro">Unvalidated price hypotheses. No active subscription, checkout or asserted transaction economics.</p></div></section>
  <section className="site-section"><div className="container faq-layout"><div><p className="eyebrow">BEFORE YOU JOIN</p><h2>Questions<br/>worth asking.</h2></div><FAQ/></div></section>
  <section className="site-section closing-invitation"><div className="container"><p className="eyebrow">START WITH ONE REAL WORKFLOW</p><h2>Bring the buyer.<br/>Bring the supplier.<br/>Define the task together.</h2><p>Identify your existing API task, approval owners and intended jurisdiction. Share business context only.</p><Button to="/sandbox">Discuss a buyer–supplier sandbox</Button></div></section>
 </main>;
}
function BrandIllustration({slug,sequence=false}) {
 const m=modules.find(m=>m.slug===slug);
 if(sequence)return <ProductMotionSequence slug={slug} name={m?.name || slug}/>;
 return <MotionSurface as="figure" className={`brand-figure figure-${slug}`} label={m?.name || slug}><AnimatedDiagram slug={slug} name={m?.name || slug}/><figcaption>Concept illustration · Synthetic sample data</figcaption></MotionSurface>;
}
function PageHero({eyebrow,title,children,cta=true,visual='authority',sequence=false,artwork}) {
 return <section className="page-hero"><div className="container page-hero-layout"><div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><div className="page-intro">{children}</div>{cta&&<div className="actions"><Button to="/sandbox">Discuss a sandbox</Button><Button to="/demo" secondary>Explore the demo</Button></div>}</div><div className="page-hero-art">{artwork || <BrandIllustration slug={visual} sequence={sequence}/>}<p>RESEARCH-STAGE CONCEPT · NO LIVE CONTRACTING OR PAYMENTS</p></div></div></section>;
}

function PageShell({ children, className = "" }) {
  return <main className={`inner-page ${className}`}>{children}</main>;
}
function ProductCapture({slug="authority",fullSequence=false}) {
 const steps=[['authority','Authority'],['scope','Scope'],['mandates','Changes'],['receipts','Receipt'],['reconciliation','Reconciliation']];
 const start=fullSequence?0:Math.max(0,steps.findIndex(([key])=>key===slug));
 const [active,setActive]=useState(start),[running,setRunning]=useState(false),[manual,setManual]=useState(false);
 useEffect(()=>{setActive(start);setManual(false)},[slug,fullSequence]);
 useEffect(()=>{if(!running||manual||active>=steps.length-1)return;const t=setTimeout(()=>setActive(i=>i+1),4200);return()=>clearTimeout(t)},[active,running,manual]);
 const [key,tab]=steps[active];
 return <section className="content-section product-capture"><div className="container"><div className="capture-intro"><div><p className="eyebrow">A genuine prototype walkthrough</p><h2>Inspect one<br/>concrete record.</h2></div><div><p>Authority, boundaries, source evidence and a named human next action. Follow the same synthetic task through five actual prototype views.</p><Button to={`/demo/tasks/M-DEMO-1?tab=${tab}`} secondary>Explore the sample workspace</Button></div></div>
  <MotionSurface className="capture-walkthrough" label="prototype walkthrough" onRunning={setRunning} onReplay={()=>{setActive(0);setManual(false)}}>
   <div className="capture-step-controls" role="group" aria-label="Synthetic prototype views">{steps.map(([id,label],i)=><button key={id} aria-pressed={i===active} onClick={()=>{setActive(i);setManual(true)}}><span>0{i+1}</span>{label}</button>)}</div>
   <Link to={`/demo/tasks/M-DEMO-1?tab=${tab}`} className="capture-frame"><img key={key} className="capture-step-image" src={`/assets/screenshots/${key}.jpg`} alt={`Actual TaskAccord ${key} prototype screen, marked DEMO synthetic data and simulated; non-binding`} width="1440" height="1000" loading="lazy"/></Link>
   <p className="capture-stage-caption">{active===4?'Mock invoice mismatch · No payment or settlement':active===3?'Receipt received · Human acceptance pending':active===2?'$180 change rejected · $120 ceiling unchanged':active===1?'Agreed sample scope · Human review criteria':'Fictional entities · Recorded sample authority'}</p>
  </MotionSurface><p className="capture-caption">Actual local prototype renders · 1440 × 1000 · Synthetic sample data · No operating product</p>
 </div></section>;
}

function ProductPage({ slug }) {
  const m = modules.find((m) => m.slug === slug);
  if (!m) return <PageShell>
    <PageHero eyebrow="Product / five proposed modules" title={<>A shared task record.<br/>From authority<br/>to acceptance.</>} visual="reconciliation"><p>Explore the proposed authority, scope, mandate, receipt and reconciliation layer for bounded buyer–supplier tasks.</p></PageHero>
    <section className="site-section"><div className="container"><div className="section-head"><div><p className="eyebrow">FIVE DISTINCT TESTS</p><h2>Choose one responsibility.<br/>Validate it with both sides.</h2></div><p>Each offer has a different input, output and human decision. These are proposed directions, not five live plans.</p></div><OfferCards editorial/></div></section>
    <section className="site-section soft"><div className="container"><div className="section-head"><div><p className="eyebrow">THE SHARED RECORD</p><h2>Connected artifacts.<br/>Separate decisions.</h2></div><p>One mandate ID links the authority grant, approved scope, change history, receipt and invoice reference. Completion never implies acceptance or settlement.</p></div><div className="workflow-grid record-chain">{['Authority reference','Scope version','Sample mandate','Change decision','Result receipt','Mock invoice'].map((t,i)=><article key={t}><span>0{i+1}</span><h3>{t}</h3><p>M-DEMO-1</p></article>)}</div></div></section>
    <section className="site-section"><div className="container"><p className="eyebrow">PROPOSED / SIMULATED / EXCLUDED</p><h2>Know what you are looking at.</h2><div className="capability-table"><table><thead><tr><th>Responsibility</th><th>In the local preview</th><th>Excluded from this build</th></tr></thead><tbody>{[['Authority & terms','Fictional entities, paper terms reference and approval owners','Legal authority validation or binding e-signature'],['Scope & acceptance','Versioned scope, deliverable and review criteria','Live agent negotiation or automatic acceptance'],['Mandates & limits','Deterministic sample amount and boundary check','Cryptographic or payment authorization'],['Receipts & disputes','Timestamped fixtures and simulated review handoff','Live escrow or dispute adjudication'],['Reconciliation','Mock invoice comparison and local sample export','Money movement or bank settlement']].map(([a,b,c])=><tr key={a}><th>{a}</th><td>{b}</td><td>{c}</td></tr>)}</tbody></table></div></div></section>
    <ProductCapture/>
    <section className="site-section"><div className="container faq-layout"><div><p className="eyebrow">PRODUCT QUESTIONS</p><h2>Review the boundaries.</h2></div><FAQ/></div></section>
    <section className="site-section closing-invitation"><div className="container"><p className="eyebrow">FIRST PILOT</p><h2>One task type.<br/>One module.<br/>Both parties at the table.</h2><p>Paper authority review and a signed joint pilot come before engineering a rail.</p><Button to="/pilot">Review the pilot gates</Button></div></section>
  </PageShell>;
  return (
    <PageShell className={`product-detail product-detail-${m.slug}`}>
      <PageHero eyebrow={`Proposed module / ${m.offer}`} title={m.line} visual={m.slug} sequence>
        <p>{m.intro}</p>
      </PageHero>
      <section className="content-section module-job-section">
        <div className="container split">
          <div>
            <p className="eyebrow">The job it owns</p>
            <h2>{m.job}</h2>
            <p>{m.limit}</p>
          </div>
          <div className={`diagram-panel ${m.surface}`}>
            <BrandIllustration slug={m.slug} sequence/>
          </div>
        </div>
      </section>
      <section className="content-section soft module-steps-section">
        <div className="container">
          <p className="eyebrow">A visible sequence</p>
          <div className="step-grid">
            {m.steps.map((s, i) => (
              <article key={s}>
                <span>0{i + 1}</span>
                <h3>{s}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="content-section module-evidence-section">
        <div className="container split">
          <h2>
            Inspect the input.
            <br />
            Understand the exception.
          </h2>
          <div className="definition-list">
            <div>
              <span>Inputs</span>
              <p>{m.input}</p>
            </div>
            <div>
              <span>Output</span>
              <p>{m.output}</p>
            </div>
            <div>
              <span>Exception</span>
              <p>{m.exception}</p>
            </div>
            <div>
              <span>Human decision</span>
              <p>
                Designated approval owners review the record. All signatures and
                authority checks shown here are simulated.
              </p>
            </div>
          </div>
        </div>
      </section>
      <ProductCapture slug={m.slug} fullSequence />
      <section className="site-section soft"><div className="container"><div className="section-head"><div><p className="eyebrow">CONNECTED RESPONSIBILITIES</p><h2>Keep the next handoff clear.</h2></div><p>The first pilot tests one module. Its record still needs a clear authority reference, scope and human decision.</p></div><div className="related-module-links">{modules.filter(other=>other.slug!==m.slug).map(other=><Link key={other.slug} to={`/product/${other.slug}`}><Icon name={other.icon}/><span>{other.name}</span><Icon/></Link>)}</div></div></section>
      <section className="site-section"><div className="container faq-layout"><div><p className="eyebrow">BEFORE A PILOT</p><h2>Questions about<br/>the preview.</h2></div><FAQ items={[faqs[0],faqs[2],faqs[4]]}/></div></section>
      <section className="content-section cta-section module-closing-section">
        <div className="container split">
          <h2>Explore one bounded task.</h2>
          <div>
            <p>
              See the authority, scope, rejected change and pending receipt in
              one fictional transaction.
            </p>
            <Button
              to={`/demo/tasks/M-DEMO-1?tab=${{ authority: "Authority", scope: "Scope", mandates: "Mandate", receipts: "Receipt", reconciliation: "Reconciliation" }[m.slug]}`}
            >
              Open the sample record
            </Button>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

function HowPage() {
  return (
    <PageShell className="how-page">
      <PageHero
        eyebrow="How it works"
        sequence
        title={
          <>
            One task.
            <br />
            Every boundary visible.
          </>
        }
      >
        <p>
          Humans approve the terms and ceiling. Agents exchange bounded
          artifacts. People accept the work and own the dispute route.
        </p>
      </PageHero>
      <section className="content-section">
        <div className="container process-list">
          {[
            [
              "Establish the human authority",
              "Identify the legal entities and procurement/legal owner on each side. Counsel reviews the paper delegation terms.",
              "authority",
            ],
            [
              "Agree scope and acceptance",
              "Write the deliverable, exclusions, deadline, acceptance criteria and amendment path.",
              "scope",
            ],
            [
              "Issue a sample mandate",
              "Record the ceiling, currency, expiry and terms/scope references. Signature IDs are simulated.",
              "mandates",
            ],
            [
              "Reject the out-of-scope change",
              "The $180 request exceeds the approved $120 ceiling. The original record is unchanged.",
              "mandates",
            ],
            [
              "Receive the result; await a person",
              "A $120 receipt arrives with source evidence. It awaits human acceptance, with a visible dispute handoff.",
              "receipts",
            ],
            [
              "Compare the invoice reference",
              "A local sample report compares fictional task, receipt and invoice references. There is no settlement.",
              "reconciliation",
            ],
          ].map(([title, text, m], i) => (
            <article key={title} className="process-step">
              <span className="process-number">0{i + 1}</span>
              <div>
                <h2>{title}</h2>
                <p>{text}</p>
                <Link to={`/product/${m}`} className="text-link">
                  Explore the responsibility
                  <Icon />
                </Link>
              </div>
              <BrandIllustration slug={m}/>
            </article>
          ))}
        </div>
      </section>
      <section className="content-section soft how-protocol-section">
        <div className="container split">
          <h2>
            Protocols have a role.
            <br />
            So do existing agreements.
          </h2>
          <div>
            <p>
              A2A, AP2 and x402 are adjacent standards. Supplier contracts,
              procurement approvals and payment-provider dispute processes
              remain important substitutes and context.
            </p>
            <SourceLinks />
            <Button to="/resources/protocol-boundaries" secondary>
              Read the boundaries
            </Button>
          </div>
        </div>
        <div className="container"><ProtocolMotionSequence/></div>
      </section>
    </PageShell>
  );
}

function UseCases() {
  return (
    <PageShell className="teams-page">
      <PageHero
        eyebrow="For teams"
        sequence
        title={
          <>
            One pair.
            <br />A shared next decision.
          </>
        }
      >
        <p>
          Start with a buyer and supplier already transacting through an API.
          Bring their approval owners into the same bounded workflow.
        </p>
      </PageHero>
      <section className="content-section">
        <div className="container team-list">
          {[
            [
              "01",
              "API marketplace operators",
              "Coordinate a task boundary across two organizations.",
              "Existing supplier agreements and procurement approvals may already cover the workflow. Test whether a shared task record adds useful clarity.",
              "Partnerships sponsor + operator owner",
              "A named transacting buyer–supplier pair",
            ],
            [
              "02",
              "Enterprise buyers & API suppliers",
              "Agree a research summary or translation task.",
              "Define the deliverable and ceiling before the agent starts. Compare the returned evidence against acceptance criteria, then hand the decision to the named reviewer.",
              "Procurement/legal owner on both sides",
              "A narrow repeated task with known acceptance requirements",
            ],
            [
              "03",
              "Procurement, counsel & finance",
              "Keep authority and exceptions inspectable.",
              "Review the authority reference, terms version, changed scope, receipt and dispute evidence. Applicable jurisdiction and legal effect remain matters for counsel.",
              "Counsel validates authority; budget owner evaluates repetition",
              "An existing approval route and reviewed paper pilot",
            ],
          ].map(([n, title, lead, text, owner, req]) => (
            <article className="team-card" key={n}>
              <p className="eyebrow">{n} / Intended audience</p>
              <h2>{title}</h2>
              <p className="lead">{lead}</p>
              <p>{text}</p>
              <div className="team-details">
                <div>
                  <span>Owner</span>
                  <strong>{owner}</strong>
                </div>
                <div>
                  <span>Bring</span>
                  <strong>{req}</strong>
                </div>
              </div>
              <Link to="/sandbox" className="text-link">
                Discuss this workflow
                <Icon />
              </Link>
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  );
}

function Pilot() {
  return (
    <PageShell className="pilot-page">
      <PageHero
        eyebrow="Pilot & pricing / hypotheses"
        title={
          <>
            Paper before rail.
            <br />
            Evidence before expansion.
          </>
        }
      >
        <p>
          A proposed joint sandbox for one marketplace, one existing
          buyer–supplier pair and one bounded task type.
        </p>
      </PageHero>
      <section className="content-section">
        <div className="container pricing-grid">
          <article className="pricing-card paper">
            <p className="eyebrow">Joint sandbox pilot</p>
            <h2>$6,000</h2>
            <Tag tone="pending">Unvalidated price hypothesis</Tag>
            <p>
              Explore a manually reviewed delegation and receipt workflow with
              both parties.
            </p>
            <ul>
              <li>One identified transacting pair</li>
              <li>Counsel-reviewed paper authority template</li>
              <li>One selected module and task type</li>
              <li>Ceiling, acceptance and dispute requirements</li>
              <li>Synthetic demo and manual workflow rehearsal</li>
            </ul>
            <Button to="/sandbox">Discuss the joint pilot</Button>
          </article>
          <article className="pricing-card sage">
            <p className="eyebrow">Possible future workflow SaaS</p>
            <h2>
              $2,000<span>/month</span>
            </h2>
            <Tag tone="pending">Conditional test hypothesis</Tag>
            <p>
              Consider only if observed repeated transactions justify a shared
              policy and receipt layer.
            </p>
            <ul>
              <li>Depends on actual repeat volume</li>
              <li>Requires legal adoption and compliance review</li>
              <li>Delivery and support costs must be viable</li>
              <li>No transaction economics asserted</li>
              <li>No active subscription or checkout</li>
            </ul>
            <Button to="/sandbox" secondary>
              Evaluate workflow fit
            </Button>
          </article>
        </div>
      </section>
      <section className="content-section soft pilot-gates">
        <div className="container split">
          <h2>
            The gates
            <br />
            before engineering.
          </h2>
          <div className="numbered-list">
            {[
              "Find a buyer–supplier pair already transacting through APIs.",
              "Have counsel review authority, jurisdiction and the paper terms.",
              "Both sides sign a pilot agreement defining the ceiling, acceptance and dispute process.",
              "Rehearse a sandbox task manually and collect both sides’ requirements.",
              "Identify a settlement partner before contemplating any real payments.",
              "Agree a commercially viable repeated workflow before building a rail.",
            ].map((s, i) => (
              <p key={s}>
                <span>0{i + 1}</span>
                {s}
              </p>
            ))}
          </div>
        </div>
      </section>
      <section className="content-section pilot-decision">
        <div className="container split">
          <h2>
            A falsifiable
            <br />
            decision.
          </h2>
          <div>
            <h3>Advance with evidence.</h3>
            <p>
              Advance only for a narrow repeat workflow after a dual-party
              signed pilot and legal review.
            </p>
            <h3>Stop when the premise fails.</h3>
            <p>
              No real pair, unclear jurisdiction, unresolved authority or
              commercially weak repetition are reasons to hold or stop. Visits
              and demo clicks are not pilot commitments.
            </p>
            <Button to="/resources" secondary>
              Review the mandate checklist
            </Button>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

function Limits() {
  return (
    <PageShell className="limits-page">
      <PageHero
        eyebrow="Limits & legal"
        title={
          <>
            A clear record.
            <br />
            An honest boundary.
          </>
        }
        cta={false}
        sequence
      >
        <p>
          This is a research-stage website and synthetic product preview. It
          makes no legal-contract, payment or compliance guarantee.
        </p>
      </PageHero>
      <section className="content-section limits-boundaries">
        <div className="container limits-grid">
          {[
            [
              "Human authority",
              "Recorded references do not validate signatory power. Both legal entities and counsel must establish the approval path and applicable terms.",
            ],
            [
              "Jurisdiction and legal effect",
              "No applicable jurisdiction or counsel opinion has been established for TaskAccord. Automated contracting can receive legal recognition; this preview does not validate a specific agreement.",
            ],
            [
              "Payments and escrow",
              "No live money movement, crypto signatures, legally binding e-signature, evidence escrow, KYC or settlement. Any later payment workflow needs its own counsel, compliance and rail-partner work.",
            ],
            [
              "Acceptance and disputes",
              "A deliverable receipt is evidence, not automatic acceptance. Fraud, exceptions and dispute handling need named humans and an agreed process.",
            ],
            [
              "Integrations and protocol evolution",
              "A2A, AP2 and x402 are factual adjacent protocols, not endorsements or live TaskAccord integrations. Incumbent evolution may change the proposed opportunity.",
            ],
            [
              "Evidence and commercial demand",
              "Evidence that protocols exist is strong. TaskAccord demand, willingness to pay, buyer–supplier volume, dispute incidence and viable economics remain unvalidated.",
            ],
          ].map(([t, p]) => (
            <article key={t}>
              <Icon name="info" />
              <h3>{t}</h3>
              <p>{p}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="content-section soft limits-preview">
        <div className="container split">
          <h2>
            Inspect the preview.
            <br />
            Keep the conclusions bounded.
          </h2>
          <div>
            <p>
              The demo is an isolated local simulation with fictional records.
              It cannot send messages, change operational systems, charge, sign,
              settle or call third-party services.
            </p>
            <SourceLinks />
            <Button to="/demo" secondary>
              Explore the synthetic workspace
            </Button>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

function Sandbox({ consent }) {
  const [step, setStep] = useState(1),
    [data, setData] = useState({
      email: "",
      role: "",
      company: "",
      buyer: "",
      supplier: "",
      task: "",
      counsel: "Not yet identified",
      jurisdiction: "",
      buyerOwner: "",
      supplierOwner: "",
      volume: "Unknown",
      privacy: false,
      interview: false,
    }),
    [error, setError] = useState(""),
    [done, setDone] = useState(false);
  const started = useRef(false),
    paperRef = useRef(null);
  useEffect(() => {
    if (started.current || done) {
      paperRef.current?.scrollIntoView({ block: "start", behavior: "instant" });
      paperRef.current?.focus({ preventScroll: true });
    }
  }, [step, done]);
  function update(k, v) {
    setData((d) => ({ ...d, [k]: v }));
    if (!started.current) {
      started.current = true;
      track("form_start", { route: "/sandbox" }, consent);
    }
  }
  function submit(e) {
    e.preventDefault();
    setError("");
    if (step === 1) {
      if (
        !/^\S+@\S+\.\S+$/.test(data.email) ||
        !data.role.trim() ||
        !data.company.trim()
      ) {
        setError("Enter a valid work email, role and company.");
        return;
      }
      setStep(2);
      return;
    }
    if (
      !data.buyer.trim() ||
      !data.supplier.trim() ||
      !data.task.trim() ||
      !data.jurisdiction.trim() ||
      !data.privacy
    ) {
      setError(
        "Complete both legal entities, the existing task, intended jurisdiction and privacy consent.",
      );
      return;
    }
    track(
      "preview_form_submit",
      { route: "/sandbox", dedupeKey: "draft-1" },
      consent,
    );
    setDone(true);
  }
  return (
    <PageShell>
      <PageHero
        eyebrow="Joint sandbox application"
        title={
          <>
            Bring the pair.
            <br />
            Define the task.
          </>
        }
        cta={false}
      >
        <p>
          An existing buyer–supplier API workflow, its approval owners and a
          bounded first question.
        </p>
      </PageHero>
      <section className="content-section">
        <div className="container form-layout">
          <aside>
            <p className="eyebrow">A useful first conversation</p>
            <h2>
              Both sides.
              <br />
              One reviewed workflow.
            </h2>
            <p>
              Bring the marketplace or enterprise buyer, the supplier, a
              partnerships sponsor and procurement/legal owners. Counsel reviews
              authority and jurisdiction.
            </p>
            <div className="intake-note">
              <Icon name="file-text" />
              <p>
                This application is a local preview. Entries stay in this
                browser session and are not sent or stored by TaskAccord.
              </p>
            </div>
            <p className="micro">
              Do not enter secrets, contracts, logs, credentials or payment
              details.
            </p>
            <a className="email-link" href="mailto:hello@taskaccord.example">
              hello@taskaccord.example
            </a>
          </aside>
          <div className="application-paper" ref={paperRef} tabIndex={-1}>
            {done ? (
              <div className="form-success" role="status">
                <Icon name="circle-check" size={32} />
                <p className="eyebrow">Draft prepared</p>
                <h2>
                  The next step
                  <br />
                  is a joint review.
                </h2>
                <p>
                  Your local application draft is ready. Nothing was sent; this
                  is not a pilot agreement or verified signup.
                </p>
                <div className="draft-summary">
                  <strong>
                    {data.buyer} + {data.supplier}
                  </strong>
                  <p>{data.task}</p>
                  <span>Jurisdiction: {data.jurisdiction}</span>
                </div>
                <p>
                  Before a pilot, identify both parties’ authority and
                  acceptance owners, obtain counsel review and define the
                  dispute process.
                </p>
                <div className="actions">
                  <Button
                    onClick={() => {
                      setDone(false);
                      setStep(1);
                    }}
                    secondary
                  >
                    Edit draft
                  </Button>
                  <Button to="/demo">Explore the demo</Button>
                </div>
              </div>
            ) : (
              <form onSubmit={submit} noValidate>
                <div className="form-step">
                  <span className={step === 1 ? "active" : ""}>
                    01 / Your context
                  </span>
                  <span className={step === 2 ? "active" : ""}>
                    02 / The pair & task
                  </span>
                </div>
                {step === 1 ? (
                  <>
                    <Field
                      label="Work email"
                      type="email"
                      value={data.email}
                      set={(v) => update("email", v)}
                      placeholder="you@company.com"
                      autoComplete="email"
                    />
                    <Field
                      label="Your role"
                      value={data.role}
                      set={(v) => update("role", v)}
                      placeholder="Head of partnerships"
                    />
                    <Field
                      label="Your company or legal entity"
                      value={data.company}
                      set={(v) => update("company", v)}
                      placeholder="Company name"
                    />
                  </>
                ) : (
                  <>
                    <div className="form-two">
                      <Field
                        label="Buyer legal entity"
                        value={data.buyer}
                        set={(v) => update("buyer", v)}
                      />
                      <Field
                        label="Supplier legal entity"
                        value={data.supplier}
                        set={(v) => update("supplier", v)}
                      />
                    </div>
                    <label className="field">
                      Which task do these organizations already transact through
                      an API?
                      <textarea
                        required
                        value={data.task}
                        onChange={(e) => update("task", e.target.value)}
                        rows={3}
                        placeholder="Describe the task and difficult approval or acceptance step. Business context only."
                      />
                    </label>
                    <div className="form-two">
                      <Field
                        label="Buyer procurement/legal owner role"
                        value={data.buyerOwner}
                        set={(v) => update("buyerOwner", v)}
                        placeholder="Role, or not yet identified"
                      />
                      <Field
                        label="Supplier procurement/legal owner role"
                        value={data.supplierOwner}
                        set={(v) => update("supplierOwner", v)}
                        placeholder="Role, or not yet identified"
                      />
                    </div>
                    <div className="form-two">
                      <Field
                        label="Intended jurisdiction"
                        value={data.jurisdiction}
                        set={(v) => update("jurisdiction", v)}
                        placeholder="Jurisdiction, or unresolved"
                      />
                      <label className="field">
                        Counsel owner status
                        <select
                          value={data.counsel}
                          onChange={(e) => update("counsel", e.target.value)}
                        >
                          <option>Not yet identified</option>
                          <option>Identified; review pending</option>
                          <option>Reviewed paper template</option>
                        </select>
                      </label>
                    </div>
                    <label className="field">
                      Current repeat-volume range
                      <select
                        value={data.volume}
                        onChange={(e) => update("volume", e.target.value)}
                      >
                        <option>Unknown</option>
                        <option>1–10 tasks / month</option>
                        <option>11–100 tasks / month</option>
                        <option>100+ tasks / month</option>
                      </select>
                    </label>
                    <label className="check-field">
                      <input
                        type="checkbox"
                        checked={data.interview}
                        onChange={(e) => update("interview", e.target.checked)}
                      />
                      <span>
                        You may contact me about a research interview. Optional.
                      </span>
                    </label>
                    <label className="check-field">
                      <input
                        type="checkbox"
                        checked={data.privacy}
                        onChange={(e) => update("privacy", e.target.checked)}
                      />
                      <span>
                        I agree to the use described in the{" "}
                        <Link to="/privacy">Privacy Notice</Link>. This preview
                        does not send my information.
                      </span>
                    </label>
                  </>
                )}
                {error && (
                  <p role="alert" className="form-error">
                    <Icon name="triangle-alert" />
                    {error}
                  </p>
                )}
                <div className="actions">
                  {step === 2 && (
                    <Button
                      onClick={() => setStep(1)}
                      secondary
                      icon="arrow-right"
                    >
                      Back
                    </Button>
                  )}
                  <Button type="submit">
                    {step === 1 ? "Continue" : "Prepare application draft"}
                  </Button>
                </div>
                <p className="micro">
                  No commitment, payment details or uploaded records.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
function Field({
  label,
  value,
  set,
  type = "text",
  placeholder = "",
  autoComplete = "off",
}) {
  return (
    <label className="field">
      {label}
      <input
        type={type}
        value={value}
        onChange={(e) => set(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
      />
    </label>
  );
}

function CompanyPage({ type }) {
  if (type === "contact")
    return (
      <PageShell>
        <PageHero
          eyebrow="Contact"
          title={
            <>
              Start with
              <br />
              one concrete task.
            </>
          }
          cta={false}
        >
          <p>
            Bring the buyer, supplier and the question their existing workflow
            leaves unresolved.
          </p>
        </PageHero>
        <section className="content-section">
          <div className="container split">
            <div>
              <h2>Talk through the boundary.</h2>
              <a className="email-link" href="mailto:hello@taskaccord.example">
                hello@taskaccord.example
              </a>
              <CompanyAddress className="company-address" />
              <p>
                For privacy or deletion requests, use the same contact route.
              </p>
            </div>
            <div>
              <p>
                Sandbox inquiries work best with a named pair, an existing API
                task, review owners and intended jurisdiction. Keep contracts,
                credentials and payment details out of public messages.
              </p>
              <Button to="/sandbox">Prepare a sandbox inquiry</Button>
            </div>
          </div>
        </section>
      </PageShell>
    );
  if (type === "about")
    return (
      <PageShell>
        <PageHero
          eyebrow="About TaskAccord"
          title={
            <>
              A small task.
              <br />A clear accord.
            </>
          }
        >
          <p>
            A research-stage idea for bounded enterprise delegation, with humans
            and legal entities retaining authority, limits and dispute routes.
          </p>
        </PageHero>
        <section className="content-section">
          <div className="container editorial">
            <p className="eyebrow">Our vision</p>
            <h2>
              Delegation can become narrower,
              <br />
              clearer and more inspectable.
            </h2>
            <p>
              Enterprises should be able to explore machine-executable tasks
              without losing sight of who approved the work, what was authorized
              and who owns the next decision.
            </p>
            <h3>Our mission</h3>
            <p>
              Record the authorized scope, spending mandate, acceptance and
              settlement evidence without pretending agents can independently
              establish enterprise contracting authority.
            </p>
            <h3>Where the idea stands</h3>
            <p>
              TaskAccord is a concept website and synthetic product preview. No
              real customers, demand, accepted pricing, live integrations or
              legal enforceability have been demonstrated.
            </p>
            <h3>Company address</h3>
            <CompanyAddress className="company-address" />
            <h3>A measured expansion hypothesis</h3>
            <p>
              One narrow repeated workflow could lead to a reusable policy and
              receipt layer, then additional supplier networks. Economics depend
              on observed repetition, legal adoption, compliance and willingness
              to pay—not assumed protocol traffic.
            </p>
          </div>
        </section>
      </PageShell>
    );
  const title =
    type === "terms"
      ? "Terms of this preview."
      : type === "accessibility"
        ? "A workflow everyone can inspect."
        : "Your information stays bounded.";
  return (
    <PageShell>
      <PageHero
        eyebrow={
          type === "terms"
            ? "Website & demo terms"
            : type === "accessibility"
              ? "Accessibility"
              : "Privacy"
        }
        title={title}
        cta={false}
      >
        <p>
          {type === "privacy"
            ? "A local concept preview with clear data boundaries."
            : type === "terms"
              ? "The public pages and synthetic workspace are for exploration."
              : "Readable content, native controls and a still-view alternative."}
        </p>
      </PageHero>
      <section className="content-section">
        <div className="container editorial">
          {type === "privacy" ? (
            <>
              <h3>Application entries</h3>
              <p>
                The current application runs in your browser session. It does
                not send, upload or persist your email, organization details or
                free-text entries. Leaving or reloading the page clears the
                draft.
              </p>
              <h3>Local preferences</h3>
              <p>
                The website may remember your still-view and optional
                measurement choices in local browser storage. No advertising
                cookies or third-party analytics scripts are included.
              </p>
              <h3>Optional preview measurement</h3>
              <p>
                Measurement is off by default. If enabled in Privacy choices,
                allow-listed preview events and limited campaign parameters stay
                in memory in your browser. Names, emails, form text, secrets and
                fixture payloads are excluded. Revoking consent clears that
                in-memory event queue.
              </p>
              <h3>Synthetic workspace</h3>
              <p>
                Fictional sample records run locally. No operational systems,
                third-party agents, signatures, payments or escrow are called.
                Exports are generated on your device and carry the DEMO
                watermark.
              </p>
              <h3>Before live collection</h3>
              <p>
                A real lead service needs its operator, purpose, processors,
                retention period, deletion route and applicable legal basis
                published first. Double opt-in would be implemented where
                required. No such live service is connected here.
              </p>
              <h3>Contact and deletion route</h3>
              <p>
                <a href="mailto:hello@taskaccord.example">
                  hello@taskaccord.example
                </a>
              </p>
            </>
          ) : type === "terms" ? (
            <>
              <h3>Concept-preview status</h3>
              <p>
                TaskAccord is a research-stage website and isolated simulation.
                Proposed modules and price hypotheses are not active
                subscription plans or an offer to perform live contracting or
                payments.
              </p>
              <h3>Synthetic artifacts</h3>
              <p>
                Organizations, people, timestamps, authority references,
                mandates and receipts in the demo are fictional. Signature
                identifiers are simulated and non-binding. Local mock actions do
                not form or amend a real agreement.
              </p>
              <h3>Professional review</h3>
              <p>
                The preview provides no legal, financial, regulatory or
                compliance advice. Specific enterprise authority, jurisdiction,
                contract effect, KYC/AML obligations and settlement arrangements
                need review before any operational pilot.
              </p>
              <h3>Copyright and factual references</h3>
              <p>
                TaskAccord artwork and copy are original or licensed as recorded
                in the project source register. References to protocols or
                vendors describe their scope and do not imply endorsement or
                integration.
              </p>
              <h3>Future pilot agreements</h3>
              <p>
                A real pilot requires both parties’ reviewed agreement covering
                authority, spending ceiling, acceptance and disputes. Final
                operational terms remain a separate counsel-reviewed
                deliverable.
              </p>
            </>
          ) : (
            <>
              <h3>Reading and navigation</h3>
              <p>
                Core information is readable HTML with ordinary page navigation.
                Links, menus, controls and forms are keyboard accessible, with
                visible focus and labeled input fields.
              </p>
              <h3>Motion choices</h3>
              <p>
                The website respects reduced-motion preferences for hover and
                illustrated state transitions. Illustrative sequences have Pause and Replay controls, stop when off-screen
                or the tab is hidden, and use a still view when reduced motion is preferred.
                There is no camera journey. Native scrolling and skip links remain available.
              </p>
              <h3>Color and status</h3>
              <p>
                Statuses use text and icons as well as color. The brand’s
                principal flat-color text pairings were calculated for contrast;
                rendered pages are checked separately.
              </p>
              <h3>Feedback</h3>
              <p>
                Report an access problem through{" "}
                <Link to="/contact">Contact</Link>. The QA notes describe the
                tested viewports and remaining limitations. This preview is not
                a claim of accessibility certification.
              </p>
            </>
          )}
        </div>
      </section>
    </PageShell>
  );
}

function Resources({ protocol = false }) {
  return (
    <PageShell>
      <PageHero
        eyebrow={protocol ? "Research / Protocol boundaries" : "Resources"}
        title={
          protocol ? (
            <>
              Communication.
              <br />
              Payment intent.
              <br />
              Human authority.
            </>
          ) : (
            <>
              A better first question.
              <br />A narrower first task.
            </>
          )
        }
        cta={false}
      >
        <p>
          {protocol
            ? "Adjacent protocols have defined roles. TaskAccord’s task-level enterprise workflow remains a hypothesis."
            : "Use the mandate-control checklist to prepare a concrete buyer–supplier discussion."}
        </p>
      </PageHero>
      <section className="content-section">
        <div className="container editorial">
          {protocol ? (
            <>
              {sources.map(([t, u, p]) => (
                <article className="resource-source" key={t}>
                  <h2>{t}</h2>
                  <p>{p}</p>
                  <a
                    href={u}
                    target="_blank"
                    rel="noreferrer"
                    className="text-link"
                  >
                    Read the primary source
                    <Icon name="arrow-up-right" />
                  </a>
                </article>
              ))}
              <h3>The question to test</h3>
              <p>
                Does one existing transacting pair need a shared record of
                authority references, task scope, acceptance, amendments and
                receipts beyond its current supplier agreement, procurement
                approval and payment records?
              </p>
              <p>
                Protocol existence is well supported. TaskAccord’s legal and
                commercial adoption remains unvalidated. Research reviewed 12
                October 2026.
              </p>
            </>
          ) : (
            <>
              <p className="eyebrow">Mandate-control checklist</p>
              <h2>Before an agent acts.</h2>
              <ol className="checklist">
                {[
                  "Name the buyer and supplier legal entities.",
                  "Identify a procurement/legal owner on each side.",
                  "Ask counsel to review authority and jurisdiction.",
                  "Reference the agreed delegation terms and version.",
                  "Define the deliverable, exclusions and acceptance criteria.",
                  "Record spending ceiling, currency and expiry.",
                  "Define how scope or price changes get reviewed.",
                  "Assign the human reviewer and dispute route.",
                  "Link the returned evidence to the approved task.",
                  "Separate acceptance from payment and settlement.",
                ].map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ol>
              <div className="actions">
                <Button to="/demo/data-dictionary" secondary>
                  Read the sample data dictionary
                </Button>
                <Button to="/resources/protocol-boundaries" secondary>
                  Protocol boundaries
                </Button>
              </div>
              <h3>Acquisition and evidence</h3>
              <p>
                Start with named API buyer–supplier pairs through marketplace,
                A2A integration and procurement-tech partners. Broad “agent
                economy” campaigns are premature. A pilot commitment, with both
                sides and counsel involved, matters more than clicks.
              </p>
            </>
          )}
        </div>
      </section>
    </PageShell>
  );
}

function SignIn(){
 const [submitted,setSubmitted]=useState(false);
 return <PageShell className="signin-page"><section className="signin-section"><div className="container signin-layout">
  <div className="signin-story"><p className="eyebrow">TASKACCORD WORKSPACE</p><h1>Clear bounds.<br/>A shared next step.</h1><p>Bring the task, its evidence and the next human decision into one view.</p><div className="signin-record"><span>DEMO — SYNTHETIC DATA</span><h2>Research summary</h2><p>Alder Analytics → Pine Research</p><div><span>Approved ceiling</span><strong>$120</strong></div><div><span>Receipt status</span><strong>Human acceptance pending</strong></div><small>Simulated; non-binding · No actual settlement</small></div></div>
  <div className="signin-card"><p className="eyebrow">WELCOME TO TASKACCORD</p><h2>Sign in.</h2><p>Access your workspace with your work email.</p><div className="signin-notice"><strong>Account access is coming.</strong><span>This sign-in preview does not authenticate accounts or send email. Explore the sample workspace now without an account.</span></div>
  <form onSubmit={e=>{e.preventDefault();setSubmitted(true)}}><label htmlFor="signin-email">Work email</label><input id="signin-email" name="email" type="email" placeholder="you@company.com" autoComplete="email" required onChange={()=>setSubmitted(false)} aria-describedby="signin-email-note"/><small id="signin-email-note">Email stays in this page and is not saved.</small><Button type="submit">Continue with email</Button>{submitted&&<p className="signin-status" role="status">Account sign-in is not connected yet. No email was sent. Use the synthetic preview below to explore.</p>}</form>
  <div className="signin-divider"><span>OR EXPLORE THE PREVIEW</span></div><Button to="/demo/tasks" secondary>Enter synthetic workspace</Button><div className="signin-help"><Link to="/preview-access">About preview access</Link><Link to="/contact">Access help</Link></div><p className="signin-legal">Research-stage concept. <Link to="/privacy">Privacy</Link> · <Link to="/terms">Terms</Link></p></div>
 </div></section></PageShell>;
}

function PreviewAccess() {
  return (
    <PageShell className="preview-page">
      <PageHero
        eyebrow="Preview access"
        title={
          <>
            Inspect the workflow.
            <br />
            Keep it synthetic.
          </>
        }
        cta={false}
        artwork={<PreviewMotionSequence/>}
      >
        <p>
          The concept workspace is open to explore. No account, real identity
          provider or password is required.
        </p>
      </PageHero>
      <section className="content-section">
        <div className="container access-grid">
          <div className="access-card">
            <Logo />
            <h2>
              Enter the
              <br />
              sample workspace.
            </h2>
            <p>
              Fictional records. Simulated mandates.
              <br />
              One clear human decision.
            </p>
            <Tag>DEMO — SYNTHETIC DATA</Tag>
            <Button to="/demo/tasks">Enter synthetic demo</Button>
            <Link to="/contact">Access help</Link>
          </div>
          <img
            src="/assets/images/secondary-mesa-poster.webp"
            alt="Brass task arch in the TaskAccord limestone landscape"
          />
        </div>
      </section>
    </PageShell>
  );
}

function Demo({ path, consent }) {
  const clean = path.split("?")[0],
    id = /^\/demo\/(tasks|report)\//.test(clean)
      ? clean.split("/").pop()
      : null;
  const [filter, setFilter] = useState("All"),
    [search, setSearch] = useState(""),
    [tab, setTab] = useState(
      new URLSearchParams(location.search).get("tab") || "Authority",
    ),
    [amount, setAmount] = useState(180),
    [check, setCheck] = useState(null),
    [evidence, setEvidence] = useState(false),
    [review, setReview] = useState(false),
    [overrides, setOverrides] = useState({}),
    [resetNotice, setResetNotice] = useState(false);
  const all = fixtures.map((f) => ({ ...f, ...overrides[f.id] })),
    record = all.find((f) => f.id === id) || all[0];
  useEffect(() => {
    setTab(new URLSearchParams(location.search).get("tab") || "Authority");
    setAmount(180);
    setCheck(null);
    setEvidence(false);
  }, [path]);
  useEffect(() => {
    track("demo_open", { route: "/demo" }, consent);
  }, [consent]);
  const tabs = [
    "Authority",
    "Scope",
    "Mandate",
    "Changes",
    "Receipt",
    "Dispute",
    "Reconciliation",
  ];
  function reset() {
    setOverrides({});
    setCheck(null);
    setAmount(180);
    setReview(false);
    setEvidence(false);
    setFilter("All");
    setSearch("");
    setResetNotice(true);
    setTimeout(() => setResetNotice(false), 3000);
  }
  function download() {
    const value = JSON.stringify(sampleExport(record), null, 2);
    const url = URL.createObjectURL(
      new Blob([value], { type: "application/json" }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = `DEMO-SYNTHETIC-${record.id}.json`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    track("demo_complete", { route: "/demo", step: "report" }, consent);
  }
  if (clean === "/demo")
    return (
      <main className="demo-boundary">
        <div className="demo-ribbon">
          <Tag>DEMO — SYNTHETIC SAMPLE DATA</Tag>
          <span>CONCEPT PREVIEW</span>
        </div>
        <div className="container demo-entry">
          <Link to="/">
            <Logo />
          </Link>
          <div className="demo-entry-grid">
            <div>
              <p className="eyebrow">A bounded demonstration</p>
              <h1>
                One task.
                <br />A visible decision.
              </h1>
              <p className="lead">
                Alder Analytics + Pine Research.
                <br />A $120 research summary. A $180 change rejected.
              </p>
              <p>
                The result receipt awaits human acceptance. All organizations,
                people and records are fictional.
              </p>
              <Button to="/demo/tasks/M-DEMO-1">Explore the sample task</Button>
              <Link className="text-link" to="/demo/tasks">
                Open the record queue
                <Icon />
              </Link>
            </div>
            <div className="demo-entry-card">
              <p className="eyebrow">Before you enter</p>
              <h2>
                A simulation,
                <br />
                with clear limits.
              </h2>
              <ul>
                <li>Simulated signature IDs; non-binding artifacts</li>
                <li>
                  No sending, operational writes or third-party agent calls
                </li>
                <li>No real escrow, billing, KYC or payments</li>
                <li>Local mock states, reset and watermarked exports</li>
                <li>Fixed sample timeline: 8 October 2026 UTC</li>
              </ul>
              <Link to="/demo/data-dictionary" className="text-link">
                Data dictionary
                <Icon />
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  const isDictionary = clean === "/demo/data-dictionary",
    isReport = clean.startsWith("/demo/report/");
  const visible = all.filter(
    (f) =>
      (filter === "All" || f.status === filter) &&
      `${f.id} ${f.buyer} ${f.supplier} ${f.task}`
        .toLowerCase()
        .includes(search.toLowerCase()),
  );
  return (
    <main className="demo-workspace">
      <div className="demo-ribbon">
        <strong>DEMO — SYNTHETIC SAMPLE DATA</strong>
        <span>CONCEPT PREVIEW / SIMULATED; NON-BINDING</span>
      </div>
      <header className="demo-header">
        <Link to="/">
          <Logo />
        </Link>
        <div>
          <span className="demo-workspace-name">Buyer–supplier sandbox</span>
          <Button onClick={reset} small secondary icon="rotate-ccw">
            Reset demo
          </Button>
          <Link to="/" className="demo-back">
            Back to website
            <Icon name="arrow-up-right" />
          </Link>
        </div>
      </header>
      <div className="demo-layout">
        <aside className="demo-sidebar">
          <p className="eyebrow">Sample workspace</p>
          <Link
            to="/demo/tasks"
            className={!id && !isDictionary && !isReport ? "active" : ""}
          >
            <Icon name="notebook-tabs" />
            Task queue<span>10</span>
          </Link>
          <Link to="/demo/tasks/M-DEMO-1">
            <Icon name="file-text" />
            M-DEMO-1
          </Link>
          <Link to="/demo/report/M-DEMO-1">
            <Icon name="receipt-text" />
            Evidence report
          </Link>
          <Link to="/demo/data-dictionary">
            <Icon name="info" />
            Data dictionary
          </Link>
          <div className="sidebar-status">
            <span className="status-dot" />
            <p>
              Fixture-only mode
              <br />
              <small>No external side effects</small>
            </p>
          </div>
        </aside>
        <div className="demo-content">
          {resetNotice && (
            <p className="reset-notice" role="status">
              Demo reset. Canonical synthetic records restored.
            </p>
          )}
          {isDictionary ? (
            <>
              <p className="eyebrow">Fixture version 1.0</p>
              <h1>Sample data dictionary</h1>
              <p>
                All fields describe fictional records. Missing and unknown are
                explicit; zero is never substituted for missing evidence.
              </p>
              <div className="dictionary-table">
                {demoFields.map((f) => (
                  <div key={f}>
                    <code>{f}</code>
                    <span>{fieldDefinitions[f]}</span>
                  </div>
                ))}
              </div>
            </>
          ) : isReport ? (
            <>
              <p className="eyebrow">DEMO / synthetic evidence package</p>
              <div className="demo-title-row">
                <h1>One traceable task.</h1>
                <Button onClick={download} small secondary icon="download">
                  Export sample JSON
                </Button>
              </div>
              <p>
                Fictional source references, fixed timestamps and the current
                human review state. This is not a legal agreement or payment
                record.
              </p>
              <div className="report-watermark">
                DEMO — SYNTHETIC DATA / SIMULATED; NON-BINDING
              </div>
              <div className="report-summary">
                <h2>
                  {record.id} / {record.task}
                </h2>
                <p>
                  {record.buyer} → {record.supplier}
                </p>
                <Tag tone="pending">{record.acceptance}</Tag>
              </div>
              <Timeline record={record} />
              <div className="report-foot">
                <span>Ceiling: ${record.ceiling} USD</span>
                <span>Settlement: no actual settlement</span>
                <span>Owner: {record.owner}</span>
              </div>
            </>
          ) : !id ? (
            <>
              <p className="eyebrow">
                Fixed sample timeline / 8 October 2026 UTC
              </p>
              <div className="demo-title-row">
                <h1>Task queue</h1>
                <span className="record-count">10 fictional records</span>
              </div>
              <p className="demo-description">
                One shared view of scope, authority and the next human decision.
              </p>
              <div className="queue-counts">
                {[
                  "Awaiting acceptance",
                  "Blocked",
                  "Rejected",
                  "Completed in simulation",
                  "Dispute review",
                ].map((s) => (
                  <div key={s}>
                    <strong>{all.filter((f) => f.status === s).length}</strong>
                    <span>{s}</span>
                  </div>
                ))}
              </div>
              <div className="queue-tools">
                <label>
                  <Icon name="search" />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search sample tasks"
                    aria-label="Search sample tasks"
                  />
                </label>
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  aria-label="Filter task status"
                >
                  {[
                    "All",
                    "Awaiting acceptance",
                    "Blocked",
                    "Rejected",
                    "Completed in simulation",
                    "Dispute review",
                  ].map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div className="task-table">
                <div className="task-table-head">
                  <span>Task & pair</span>
                  <span>Ceiling</span>
                  <span>State</span>
                  <span>Human owner</span>
                </div>
                {visible.map((f) => (
                  <Link
                    to={`/demo/tasks/${f.id}`}
                    className="task-row"
                    key={f.id}
                  >
                    <div>
                      <span className="task-id">{f.id}</span>
                      <strong>{f.task}</strong>
                      <small>
                        {f.buyer} → {f.supplier}
                      </small>
                    </div>
                    <strong>
                      ${f.ceiling}
                      <small>USD</small>
                    </strong>
                    <Tag
                      tone={
                        f.status === "Rejected"
                          ? "error"
                          : f.status === "Blocked"
                            ? "pending"
                            : f.status === "Completed in simulation"
                              ? "success"
                              : ""
                      }
                    >
                      {f.status}
                    </Tag>
                    <span>
                      {f.owner}
                      <small>Next: 9 Oct, 10:00 UTC</small>
                    </span>
                  </Link>
                ))}
                {!visible.length && (
                  <div className="empty-state">
                    <Icon name="search" />
                    <h3>No sample records match.</h3>
                    <button
                      onClick={() => {
                        setFilter("All");
                        setSearch("");
                      }}
                    >
                      Clear filters
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="record-breadcrumb">
                <Link to="/demo/tasks">Task queue</Link>
                <Icon name="chevron-right" size={14} />
                <span>{record.id}</span>
              </div>
              <div className="demo-title-row">
                <div>
                  <p className="eyebrow">
                    {record.buyer} → {record.supplier}
                  </p>
                  <h1>{record.task}</h1>
                </div>
                <Tag
                  tone={record.status === "Blocked" ? "pending" : "pending"}
                  icon="clock"
                >
                  {record.status}
                </Tag>
              </div>
              <div className="record-facts">
                <div>
                  <span>Mandate</span>
                  <strong>{record.id}</strong>
                </div>
                <div>
                  <span>Ceiling</span>
                  <strong>${record.ceiling} USD</strong>
                </div>
                <div>
                  <span>Human reviewer</span>
                  <strong>{record.owner}</strong>
                </div>
                <div>
                  <span>Next action</span>
                  <strong>9 Oct 2026 / 10:00 UTC</strong>
                </div>
              </div>
              <div
                className="record-tabs"
                role="tablist"
                aria-label="Task record"
              >
                {tabs.map((t) => (
                  <button
                    key={t}
                    role="tab"
                    id={`record-tab-${t}`}
                    aria-controls="record-panel"
                    tabIndex={tab === t ? 0 : -1}
                    onKeyDown={(e) =>
                      tabKeys(e, tabs.length, tabs.indexOf(tab), (index) =>
                        setTab(tabs[index]),
                      )
                    }
                    aria-selected={tab === t}
                    onClick={() => {
                      setTab(t);
                      setCheck(null);
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <div className="record-columns">
                <section
                  className="record-panel"
                  id="record-panel"
                  role="tabpanel"
                  aria-labelledby={`record-tab-${tab}`}
                >
                  {tab === "Authority" ? (
                    <>
                      <p className="eyebrow">
                        Human entities and approved reference
                      </p>
                      <h2>The principal behind each agent.</h2>
                      <div className="definition-list">
                        <div>
                          <span>Buyer legal entity</span>
                          <p>{record.buyer} · fictional</p>
                        </div>
                        <div>
                          <span>Supplier legal entity</span>
                          <p>{record.supplier} · fictional</p>
                        </div>
                        <div>
                          <span>Recorded human owner</span>
                          <p>{record.owner}</p>
                        </div>
                        <div>
                          <span>Authority reference</span>
                          <p>
                            {record.authorityRef} · {record.authority}
                          </p>
                        </div>
                        <div>
                          <span>Terms version</span>
                          <p>{record.terms}</p>
                        </div>
                        <div>
                          <span>Buyer / supplier agents</span>
                          <p>
                            {record.buyerAgent} / {record.supplierAgent} ·
                            fictional identifiers
                          </p>
                        </div>
                        <div>
                          <span>Authority expiry</span>
                          <p>
                            {record.authority === "Expired"
                              ? "7 October 2026 / 23:59 UTC"
                              : "10 October 2026 / 23:59 UTC"}
                          </p>
                        </div>
                      </div>
                      <p className="record-warning">
                        A recorded reference does not verify a person’s legal
                        authority. Counsel review remains a separate
                        requirement.
                      </p>
                    </>
                  ) : tab === "Scope" ? (
                    <>
                      <p className="eyebrow">{record.scope}</p>
                      <h2>Define what gets done.</h2>
                      <div className="definition-list">
                        <div>
                          <span>Deliverable</span>
                          <p>
                            One source-linked {record.task.toLowerCase()}, in
                            the agreed format.
                          </p>
                        </div>
                        <div>
                          <span>Exclusions</span>
                          <p>
                            No new purchases, price amendments or actions
                            outside the agreed task.
                          </p>
                        </div>
                        <div>
                          <span>Acceptance criteria</span>
                          <p>
                            Source references complete, agreed result format
                            present and reviewable by the named human.
                          </p>
                        </div>
                        <div>
                          <span>Amendment process</span>
                          <p>
                            Any changed scope returns to human approval before
                            it can proceed.
                          </p>
                        </div>
                      </div>
                    </>
                  ) : tab === "Mandate" ? (
                    <>
                      <p className="eyebrow">Synthetic mandate</p>
                      <h2>A bounded instruction.</h2>
                      <div className="definition-list">
                        <div>
                          <span>Recorded ceiling</span>
                          <p>${record.ceiling} USD</p>
                        </div>
                        <div>
                          <span>Scope / terms</span>
                          <p>
                            {record.scope} / {record.terms}
                          </p>
                        </div>
                        <div>
                          <span>Sample signature identifier</span>
                          <p>{record.signature} · simulated; non-binding</p>
                        </div>
                        <div>
                          <span>Authority</span>
                          <p>{record.authority}</p>
                        </div>
                        <div>
                          <span>Mandate expiry</span>
                          <p>10 October 2026 / 23:59 UTC · fixed sample</p>
                        </div>
                      </div>
                      <Tag tone="pending">Not a payment authorization</Tag>
                    </>
                  ) : tab === "Changes" ? (
                    <>
                      <p className="eyebrow">Explicit local simulation</p>
                      <h2>A change is a new proposal.</h2>
                      <p>
                        Compare a proposed amount with the recorded ceiling. The
                        canonical mandate is never amended by this check.
                      </p>
                      <label className="field amount-field">
                        Requested amount (USD)
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                        />
                      </label>
                      <Button
                        onClick={() =>
                          setCheck(
                            checkMandate({
                              amount,
                              authority: record.authority,
                              ceiling: record.ceiling,
                            }),
                          )
                        }
                        small
                      >
                        Check sample limit
                      </Button>
                      {check && (
                        <div
                          role="status"
                          className={`check-result ${check.pass ? "success" : "error"}`}
                        >
                          <Icon
                            name={check.pass ? "circle-check" : "circle-x"}
                          />
                          <div>
                            <strong>
                              {check.pass
                                ? "Within recorded sample limit"
                                : check.state === "blocked"
                                  ? "Human review required"
                                  : "Change rejected"}
                            </strong>
                            <p>{check.reason}</p>
                          </div>
                        </div>
                      )}
                      <div className="change-history">
                        <Tag tone="error">
                          {record.id === "M-DEMO-1"
                            ? "Canonical example: $180 rejected"
                            : "Sample change check / local only"}
                        </Tag>
                        <p>Original ${record.ceiling} USD ceiling unchanged.</p>
                      </div>
                    </>
                  ) : tab === "Receipt" ? (
                    <>
                      <p className="eyebrow">Result evidence</p>
                      <h2>Received is not accepted.</h2>
                      <div className="definition-list">
                        <div>
                          <span>Receipt</span>
                          <p>
                            {record.receipt
                              ? `${record.receipt} · $${record.ceiling} USD`
                              : "No result receipt issued"}
                          </p>
                        </div>
                        <div>
                          <span>Source evidence</span>
                          <p>
                            {record.sourceRef} ·{" "}
                            {record.receipt
                              ? "result artifact"
                              : "scope input artifact"}
                          </p>
                        </div>
                        <div>
                          <span>Received</span>
                          <p>{record.receivedAt || "No result received"}</p>
                        </div>
                        <div>
                          <span>Acceptance</span>
                          <p>{record.acceptance}</p>
                        </div>
                        <div>
                          <span>Settlement</span>
                          <p>No actual settlement</p>
                        </div>
                      </div>
                      <Button
                        secondary
                        small
                        disabled={!record.receipt}
                        onClick={() => setReview(true)}
                      >
                        Preview human review
                      </Button>
                    </>
                  ) : tab === "Dispute" ? (
                    <>
                      <p className="eyebrow">Human handoff</p>
                      <h2>A clear route for exceptions.</h2>
                      <p>
                        Fictional buyer and supplier reviewers inspect the
                        scope, deliverable and evidence package. TaskAccord does
                        not decide a legal or payment dispute.
                      </p>
                      <div className="definition-list">
                        <div>
                          <span>Reviewer</span>
                          <p>
                            {record.owner} + fictional supplier owner Evan Reed
                          </p>
                        </div>
                        <div>
                          <span>Evidence</span>
                          <p>
                            {record.receipt
                              ? "Scope v1, mandate, receipt and source reference"
                              : "Scope input and authority or proposal exception; no returned receipt"}
                          </p>
                        </div>
                        <div>
                          <span>Next action</span>
                          <p>Joint evidence review / 9 Oct 2026, 10:00 UTC</p>
                        </div>
                      </div>
                      <Button
                        secondary
                        small
                        onClick={() =>
                          setOverrides((o) => ({
                            ...o,
                            [record.id]: {
                              status: "Dispute review",
                              acceptance: "Disputed in simulation",
                            },
                          }))
                        }
                      >
                        Simulate dispute handoff
                      </Button>
                    </>
                  ) : (
                    <>
                      <p className="eyebrow">Mock invoice comparison</p>
                      <h2>
                        {record.receipt ? (
                          <>
                            The references align.
                            <br />
                            The amounts do not.
                          </>
                        ) : (
                          <>
                            A missing receipt.
                            <br />A human review.
                          </>
                        )}
                      </h2>
                      <div className="invoice-compare">
                        <div>
                          <span>Approved ceiling</span>
                          <strong>${record.ceiling}</strong>
                        </div>
                        <div>
                          <span>Receipt</span>
                          <strong>
                            {record.receipt ? `$${record.ceiling}` : "—"}
                          </strong>
                        </div>
                        <div>
                          <span>Mock invoice</span>
                          <strong className="error">$180</strong>
                        </div>
                      </div>
                      <Tag tone="error">
                        {record.receipt
                          ? "Mock mismatch / human review"
                          : "Missing receipt / human review"}
                      </Tag>
                      <p>
                        This is a sample reference comparison. No actual invoice
                        is sent, bank account connected or payment settled.
                      </p>
                      <Button to={`/demo/report/${record.id}`} secondary small>
                        Open evidence report
                      </Button>
                    </>
                  )}
                </section>
                <aside className="evidence-sidebar">
                  <p className="eyebrow">Linked source evidence</p>
                  <button
                    className="source-document"
                    onClick={() => setEvidence(true)}
                  >
                    <Icon name="file-text" size={28} />
                    <strong>{record.sourceRef}</strong>
                    <span>
                      {record.task} {record.receipt ? "result" : "scope"}{" "}
                      artifact
                    </span>
                    <small>
                      {record.receivedAt ||
                        record.timestamp.replace("T", " / ")}
                    </small>
                    <span className="text-link">
                      Inspect source
                      <Icon name="arrow-up-right" size={16} />
                    </span>
                  </button>
                  <div className="reviewer-block">
                    <Icon name="user-round" />
                    <div>
                      <span>Assigned reviewer</span>
                      <strong>{record.owner}</strong>
                      <small>Next review: 9 Oct / 10:00 UTC</small>
                    </div>
                  </div>
                  <p className="micro">
                    Fictional organizations and people.
                    <br />
                    Fixed sample timeline.
                  </p>
                  <div className="mini-timeline">
                    <strong>Task trace</strong>
                    {recordTimeline(record)
                      .slice(3)
                      .map(([time, title]) => (
                        <p key={time}>
                          <span>{time}</span>
                          {title}
                        </p>
                      ))}
                  </div>
                </aside>
              </div>
            </>
          )}
        </div>
      </div>
      {evidence && (
        <Modal
          title="Synthetic source evidence"
          onClose={() => setEvidence(false)}
        >
          <Tag>DEMO — SYNTHETIC DATA</Tag>
          <p className="eyebrow">
            {record.sourceRef} / {record.receivedAt || record.timestamp}
          </p>
          <h3>{record.task} artifact</h3>
          <p>
            This fictional result references the approved task and source-linked
            deliverable format. It is provided to illustrate provenance and
            human review; it is not real market research.
          </p>
          <div className="definition-list">
            <div>
              <span>Mandate</span>
              <p>{record.id}</p>
            </div>
            <div>
              <span>Scope version</span>
              <p>{record.scope}</p>
            </div>
            <div>
              <span>Owner</span>
              <p>{record.owner}</p>
            </div>
            <div>
              <span>Review state</span>
              <p>{record.acceptance}</p>
            </div>
          </div>
          <p className="micro">
            Simulated; non-binding. No actual signature or settlement.
          </p>
        </Modal>
      )}
      {review && (
        <Modal
          title="Preview a human decision"
          onClose={() => setReview(false)}
        >
          <Tag>DEMO — SYNTHETIC DATA</Tag>
          <p>
            This action changes only the fictional record in this demonstration.
            It cannot accept work, amend a contract or trigger payment outside
            the preview.
          </p>
          <div className="actions">
            <Button
              onClick={() => {
                setOverrides((o) => ({
                  ...o,
                  [record.id]: {
                    status: "Completed in simulation",
                    acceptance: "Accepted in simulation",
                  },
                }));
                setReview(false);
              }}
              small
            >
              Simulate acceptance
            </Button>
            <Button secondary small onClick={() => setReview(false)}>
              Keep acceptance pending
            </Button>
          </div>
        </Modal>
      )}
    </main>
  );
}
function Timeline({ record }) {
  return (
    <div className="timeline">
      {recordTimeline(record).map(([time, t, source]) => (
        <div key={time + t}>
          <span>{time}</span>
          <div>
            <strong>{t}</strong>
            <small>{source}</small>
          </div>
        </div>
      ))}
    </div>
  );
}

export function App() {
  const [animationsPaused,setAnimationsPaused]=useState(false);
  const [path, setPath] = useState(location.pathname + location.search),
    [privacy, setPrivacy] = useState(false),
    [consent, setConsent] = useState(
      () => localStorage.getItem("ta-measurement") === "yes",
    );
  useEffect(() => {
    const f = () => {
      setPath(location.pathname + location.search);
      setPrivacy(false);
      window.scrollTo({ top: 0, behavior: "instant" });
      requestAnimationFrame(() => {
        const heading = document.querySelector("#page-content h1");
        if (heading) {
          heading.setAttribute("tabindex", "-1");
          heading.focus({ preventScroll: true });
        }
      });
    };
    window.addEventListener("popstate", f);
    return () => window.removeEventListener("popstate", f);
  }, []);
  const clean = path.split("?")[0],
    demo = clean.startsWith("/demo"),
    home = clean === "/";
  useEffect(() => {
    localStorage.setItem("ta-measurement", consent ? "yes" : "no");
    if (!consent) revoke();
    if (home) track("landing_view", { route: "/" }, consent);
    if (clean === "/pilot") track("pricing_view", { route: clean }, consent);
  }, [consent, clean]);
  useEffect(() => {
    const label = home
      ? "Human-approved task mandates"
      : demo
        ? "Synthetic task workspace"
        : clean === "/pilot"
          ? "Pilot & pricing"
          : clean === "/sandbox"
            ? "Joint sandbox application"
            : modules.find((m) => clean === `/product/${m.slug}`)?.name ||
              clean.slice(1).replaceAll("-", " ").replaceAll("/", " / ");
    document.title = `TaskAccord — ${label}`;
  }, [clean]);
  useScrollReveal(clean,animationsPaused);
  let page;
  if (home) page = <Home/>;
  else if (clean === "/product" || modules.some(m=>clean === `/product/${m.slug}`))
    page = <ProductPage slug={clean.split("/")[2]} />;
  else if (clean === "/how-it-works") page = <HowPage />;
  else if (clean === "/use-cases") page = <UseCases />;
  else if (clean === "/pilot") page = <Pilot />;
  else if (clean.startsWith("/sandbox")) page = <Sandbox consent={consent} />;
  else if (clean === "/limits") page = <Limits />;
  else if (clean.startsWith("/resources"))
    page = <Resources protocol={clean.includes("protocol-boundaries")} />;
  else if (
    ["about", "contact", "privacy", "terms", "accessibility"].includes(
      clean.slice(1),
    )
  )
    page = <CompanyPage type={clean.slice(1)} />;
  else if (clean === "/sign-in") page = <SignIn />;
  else if (clean === "/preview-access") page = <PreviewAccess />;
  else if (demo) page = <Demo path={path} consent={consent} />;
  else
    page = (
      <PageShell>
        <PageHero
          eyebrow="Page not found"
          title="Find your next step."
          cta={false}
        >
          <p>This route is not part of the preview.</p>
          <Button to="/">Go to TaskAccord home</Button>
        </PageHero>
      </PageShell>
    );
  return (
    <MotionContext.Provider value={{paused:animationsPaused,setPaused:setAnimationsPaused}}>
      <a href="#page-content" className="skip-link">
        Skip to content
      </a>
      {!demo && <Header path={path}/> }
      <div id="page-content" tabIndex={-1}>
        {page}
      </div>
      {!demo && <Footer privacy={() => setPrivacy(true)} />}{" "}
      {privacy && (
        <Modal title="Privacy choices" onClose={() => setPrivacy(false)}>
          <p>
            Optional preview measurement is off by default. If enabled, limited
            events stay in memory in this browser; no emails, names, form text
            or sample record payloads are included.
          </p>
          <label className="check-field">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
            />
            <span>Enable local preview measurement</span>
          </label>
          <p>
            Revoking this choice clears the in-memory queue. No advertising
            cookies or third-party analytics scripts are used.
          </p>
          <Button onClick={() => setPrivacy(false)} small>
            Save choices
          </Button>
          <Link to="/privacy" className="text-link">
            Read the Privacy Notice
            <Icon />
          </Link>
        </Modal>
      )}
    </MotionContext.Provider>
  );
}
