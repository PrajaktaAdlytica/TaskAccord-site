import {createContext,useContext,useEffect,useRef,useState} from 'react';
export const MotionContext=createContext({paused:false,setPaused:()=>{}});
export function MotionSurface({children,className='',as:Element='div',controls=true,label='diagram',onRunning,onReplay}) {
 const {paused,setPaused}=useContext(MotionContext);
 const ref=useRef(null);const [visible,setVisible]=useState(false),[reduced,setReduced]=useState(()=>matchMedia('(prefers-reduced-motion: reduce)').matches),[hidden,setHidden]=useState(document.hidden),[replay,setReplay]=useState(0);
 useEffect(()=>{const io=new IntersectionObserver(([entry])=>setVisible(entry.isIntersecting),{threshold:.15});if(ref.current)io.observe(ref.current);const mq=matchMedia('(prefers-reduced-motion: reduce)');const reduce=()=>setReduced(mq.matches),visibility=()=>setHidden(document.hidden);mq.addEventListener('change',reduce);document.addEventListener('visibilitychange',visibility);return()=>{io.disconnect();mq.removeEventListener('change',reduce);document.removeEventListener('visibilitychange',visibility);};},[]);
 const running=visible&&!paused&&!reduced&&!hidden;
 useEffect(()=>{onRunning?.(running)},[running,onRunning]);
 return <Element ref={ref} className={`motion-surface ${className}`} data-motion={running?'running':'paused'} data-reduced={reduced?'true':'false'} style={{'--motion-state':running?'running':'paused'}}>
  <div key={replay} className="motion-content">{children}</div>
  {controls&&<div className="motion-controls"><span>{reduced?'Still view · reduced motion':'Illustrative sequence'}</span><div><button type="button" disabled={reduced} aria-label={`${paused?'Resume':'Pause'} animations — ${label}`} onClick={()=>setPaused(!paused)}>{paused?'Resume':'Pause'}</button><button type="button" disabled={reduced} aria-label={`Replay ${label} animation`} onClick={()=>{setReplay(n=>n+1);setPaused(false);onReplay?.()}}>Replay <span aria-hidden="true">↻</span></button></div></div>}
 </Element>;
}
export function AnimatedDiagram({slug,name}) {
 const Text=({x,y,children,size=15,fill='#262b26',...rest})=><text x={x} y={y} fontSize={size} fill={fill} {...rest}>{children}</text>;
 return <svg className={`animated-diagram animated-${slug}`} viewBox="0 0 500 300" role="img" aria-label={`${name}: animated synthetic workflow, simulated and non-binding`}>
  <title>{name} — synthetic task example</title><Text x={24} y={25} size={10}>DEMO — SYNTHETIC DATA</Text>
  {slug==='authority'&&<>
   <path className="diagram-line" d="M125 128V176H365V128"/><path className="diagram-flow" d="M125 128V176H365V128"/>
   <g className="diagram-node node-1"><rect x="24" y="62" width="210" height="70" rx="4"/><Text x={40} y={92} size={18}>Alder Analytics</Text><Text x={40} y={115} size={12}>Buyer legal entity</Text></g>
   <g className="diagram-node node-2"><rect x="258" y="62" width="218" height="70" rx="4"/><Text x={274} y={92} size={18}>Pine Research</Text><Text x={274} y={115} size={12}>Supplier legal entity</Text></g>
   <g className="approval-node"><rect x="122" y="161" width="245" height="64" rx="4" fill="#262b26"/><Text x={140} y={187} size={16} fill="#fffcf5">Human approval required</Text><Text x={140} y={207} size={12} fill="#fffcf5">Recorded authority reference</Text></g>
  </>}
  {slug==='scope'&&<>
   <g className="diagram-node node-1"><rect x="24" y="58" width="452" height="65" rx="4"/><Text x={40} y={85} size={20}>Research summary</Text><Text x={40} y={109} size={13}>Scope v1 · Deliverable + exclusions</Text></g>
   <path className="diagram-line" d="M24 150H476M24 196H476M24 242H476"/><path className="diagram-flow" d="M24 150H476M24 196H476M24 242H476"/><Text x={24} y={176} size={17}>Defined acceptance criteria</Text><Text x={24} y={222} size={17}>Human reviewer owns acceptance</Text>
  </>}
  {slug==='mandates'&&<>
   <Text x={24} y={76} size={13}>Approved ceiling</Text><Text x={24} y={113} size={32}>$120</Text><Text x={308} y={76} size={13}>Requested revision</Text><Text x={308} y={113} size={32} fill="#963c2d">$180</Text>
   <rect x="24" y="156" width="452" height="18" rx="4" fill="#9b6c3c"/><rect x="260" y="140" width="14" height="50" rx="3" fill="#262b26"/><rect className="proposal-pin" x="389" y="140" width="14" height="50" rx="3" fill="#963c2d"/><Text x={253} y={217} size={13}>120</Text><Text x={382} y={217} size={13}>180</Text><Text x={24} y={249} size={13} fill="#963c2d">$180 change rejected; original ceiling unchanged</Text>
  </>}
  {slug==='receipts'&&<>
   <path className="diagram-line" d="M35 73V224"/><path className="diagram-flow receipt-flow" d="M35 73V191"/>
   <g className="receipt-event event-1"><circle cx="35" cy="78" r="5" fill="#963c2d"/><Text x={56} y={84} size={16}>09:20 · $180 change rejected</Text></g>
   <g className="receipt-event event-2"><circle cx="35" cy="132" r="5" fill="#355b44"/><Text x={56} y={138} size={16}>10:00 · $120 receipt received</Text></g>
   <g className="receipt-event event-3"><circle cx="35" cy="186" r="5" fill="#835b1c"/><Text x={56} y={192} size={16} fill="#835b1c">10:05 · Human acceptance pending</Text></g><Text x={56} y={232} size={12}>8 October 2026 · fixed sample timeline</Text>
  </>}
  {slug==='reconciliation'&&<>
   <path className="diagram-line brass-line" d="M24 156H476"/><path className="diagram-flow" d="M24 156H476"/>
   {[['Mandate','M-DEMO-1',24],['Receipt','$120',183],['Mock invoice','$180',342]].map(([title,value,x],i)=><g className={`diagram-node invoice-node node-${i+1}`} key={title}><rect x={x} y="70" width="134" height="145" rx="4"/><Text x={x+14} y={99} size={16}>{title}</Text><Text x={x+14} y={128} size={i?22:12} fill={i===2?'#963c2d':'#262b26'}>{value}</Text><path d={`M${x+14} 166h90M${x+14} 179h62M${x+14} 192h77`} stroke="#c8bda9" strokeWidth="2"/></g>)}
   <Text x={24} y={249} size={13} fill="#963c2d">Mismatch · no actual payment or settlement</Text>
  </>}
  <Text x={24} y={281} size={10}>Simulated; non-binding</Text>
 </svg>;
}

const productStories={
 authority:[['Entities','Identify both organizations','Alder Analytics and Pine Research are fictional legal entities.'],['Terms','Reference reviewed paper terms','Link DEMO-v1 and the named approval owners.'],['Authority','Record the authority reference','Keep owner, validity and next review visible.'],['Human gate','Human approval remains required','A recorded reference does not verify signatory power.']],
 scope:[['Deliverable','Define the research summary','One source-linked result in the agreed format.'],['Exclusions','Make the exclusions explicit','No new purchases or quiet changes to scope.'],['Criteria','Link the acceptance criteria','The result must be inspectable by the named reviewer.'],['Human gate','People accept the result','Agent completion is separate from human acceptance.']],
 mandates:[['Ceiling','Keep the $120 ceiling visible','Read the recorded scope, currency and authority references.'],['Proposal','Inspect the $180 revision','The supplier proposes a change outside the spending boundary.'],['Check','Compare against the original mandate','$180 exceeds the approved $120 sample ceiling.'],['Rejected','Reject the change; keep the mandate','Original ceiling unchanged. No payment authorization.']],
 receipts:[['Source','Link the deliverable evidence','The synthetic research artifact retains its source reference.'],['Receipt','Record the $120 result receipt','R-DEMO-1 is received at 10:00 UTC on 8 October 2026.'],['Review','Assign the human next action','Mara Ellis reviews the result against the agreed criteria.'],['Pending','Human acceptance stays pending','Evidence supports review; it does not resolve a dispute.']],
 reconciliation:[['Mandate','Start with M-DEMO-1','The sample mandate records the original $120 ceiling.'],['Receipt','Link the $120 receipt','The result still awaits human acceptance.'],['Invoice','Compare the $180 mock invoice','The invoice amount differs from the recorded receipt.'],['Mismatch','Flag the mismatch for a person','No actual payment, bank reconciliation or settlement.']]
};
export function ProductMotionSequence({slug,name}) {
 const [stage,setStage]=useState(0),[running,setRunning]=useState(false),[manual,setManual]=useState(false);
 const steps=productStories[slug];
 useEffect(()=>{setStage(0);setManual(false)},[slug]);
 useEffect(()=>{if(!running||manual||stage===3)return;const timer=setTimeout(()=>setStage(s=>s+1),2400);return()=>clearTimeout(timer)},[running,manual,stage,slug]);
 return <MotionSurface as="figure" className={`brand-figure figure-${slug} product-motion-story`} label={`${name} sequence`} onRunning={setRunning} onReplay={()=>{setStage(0);setManual(false)}}>
  <div className="motion-story-view" data-stage={stage}>
   <div className="story-stage-buttons" role="group" aria-label={`${name} sequence stages`}>{steps.map(([label],i)=><button key={label} aria-pressed={i===stage} onClick={()=>{setStage(i);setManual(true)}}><span>0{i+1}</span>{label}</button>)}</div>
   <AnimatedDiagram slug={slug} name={name}/>
   <div className={`story-stage-caption ${stage===3?'final-stage':''}`}><span>0{stage+1} / 04</span><div><strong>{steps[stage][1]}</strong><p>{steps[stage][2]}</p></div></div>
  </div>
  <figcaption>Concept sequence · Synthetic data · Simulated; non-binding</figcaption>
 </MotionSurface>;
}

export function ProtocolMotionSequence() {
 const steps=[['Agreements','Start with the existing agreement','Supplier terms, procurement approvals and dispute routes remain context.'],['A2A','Separate communication from authority','Agent messages can describe tasks and artifacts. They do not validate enterprise authority.'],['AP2 / x402','Keep payment evidence in its own layer','Mandates and payment protocols have defined roles. This preview does not connect payment rails.'],['Human review','Return the legal questions to people','The parties’ counsel reviews authority and jurisdiction. TaskAccord’s legal and commercial adoption remain unvalidated.']];
 const [stage,setStage]=useState(0),[running,setRunning]=useState(false),[manual,setManual]=useState(false);
 useEffect(()=>{if(!running||manual||stage===3)return;const timer=setTimeout(()=>setStage(s=>s+1),2600);return()=>clearTimeout(timer)},[stage,running,manual]);
 return <MotionSurface className="protocol-story" label="protocol boundaries sequence" onRunning={setRunning} onReplay={()=>{setStage(0);setManual(false)}}>
  <div className="protocol-story-view" data-stage={stage}>
   <div className="story-stage-buttons" role="group" aria-label="Protocol boundary stages">{steps.map(([label],i)=><button key={label} aria-pressed={stage===i} onClick={()=>{setStage(i);setManual(true)}}><span>0{i+1}</span>{label}</button>)}</div>
   <div className="protocol-model" role="img" aria-label="Concept boundary map: existing agreements, adjacent communication and payment protocols, separate human legal review. No live integration.">
    <div className="protocol-layer agreement-layer"><span>EXISTING COMMERCIAL CONTEXT</span><strong>Supplier agreements & procurement approvals</strong><small>Terms · owners · acceptance · dispute process</small></div>
    <div className="protocol-model-line" aria-hidden="true"/>
    <div className="protocol-options"><div className="protocol-layer a2a-layer"><span>COMMUNICATION</span><strong>A2A</strong><small>Task messages & artifacts</small></div><div className="protocol-layer payment-layer"><span>PAYMENT MANDATES</span><strong>AP2</strong><small>Payment-intent evidence</small></div><div className="protocol-layer payment-layer"><span>HTTP PAYMENTS</span><strong>x402</strong><small>Payment verification & settlement flow</small></div></div>
    <div className="protocol-model-line" aria-hidden="true"/>
    <div className="protocol-layer human-layer"><span>SEPARATE HUMAN DECISION</span><strong>Authority & jurisdiction require review</strong><small>No automatic approval, contract or settlement in this preview</small></div>
   </div>
   <div className={`story-stage-caption ${stage===3?'final-stage':''}`}><span>0{stage+1} / 04</span><div><strong>{steps[stage][1]}</strong><p>{steps[stage][2]}</p></div></div>
   <p className="protocol-story-disclosure">Concept explanation · Adjacent protocols · No live integrations or endorsement</p>
  </div>
 </MotionSurface>;
}

export function PreviewMotionSequence(){
 const steps=[['Sample','Choose a fictional record','M-DEMO-1 is a fixed research-summary fixture. No account is required.'],['Boundary','Inspect the task boundary','The $120 ceiling remains. The $180 revision was rejected.'],['Review','Keep the next decision human','The $120 receipt is received; acceptance is pending human review.']];
 const [stage,setStage]=useState(0),[running,setRunning]=useState(false),[manual,setManual]=useState(false);
 useEffect(()=>{if(!running||manual||stage===2)return;const timer=setTimeout(()=>setStage(s=>s+1),2600);return()=>clearTimeout(timer)},[stage,running,manual]);
 return <MotionSurface className="preview-story" label="sample workspace sequence" onRunning={setRunning} onReplay={()=>{setStage(0);setManual(false)}}>
  <div className="preview-story-view" data-stage={stage}>
   <div className="story-stage-buttons" role="group" aria-label="Sample workspace stages">{steps.map(([label],i)=><button key={label} aria-pressed={stage===i} onClick={()=>{setStage(i);setManual(true)}}><span>0{i+1}</span>{label}</button>)}</div>
   <div className="preview-model" role="img" aria-label="Synthetic workspace: Research summary sample, $120 ceiling, rejected $180 change, $120 receipt awaiting human acceptance.">
    <div className="preview-model-header"><span>SAMPLE WORKSPACE</span><small>LOCAL SIMULATION</small></div>
    <div className="preview-sample"><span>M-DEMO-1 / RESEARCH SUMMARY</span><strong>One bounded task.</strong><small>Alder Analytics → Pine Research</small></div>
    <div className="preview-boundary"><div><span>Approved ceiling</span><strong>$120</strong></div><div><span>Changed proposal</span><strong>$180 · Rejected</strong></div></div>
    <div className="preview-review"><span>RESULT RECEIPT · $120</span><strong>Human acceptance pending</strong><small>Mara Ellis · Buyer reviewer</small></div>
   </div>
   <div className="story-stage-caption"><span>0{stage+1} / 03</span><div><strong>{steps[stage][1]}</strong><p>{steps[stage][2]}</p></div></div>
   <p className="preview-disclosure">Synthetic data · Simulated; non-binding · No actual settlement</p>
  </div>
 </MotionSurface>;
}
