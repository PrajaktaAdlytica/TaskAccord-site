import {useEffect} from 'react';

// Animate on intersection instead of hiding content: keyboard access and failed
// animation support always leave the document readable. Re-entry works both ways.
export function useScrollReveal(route, paused) {
 useEffect(()=>{
  const root=document.querySelector('main.company-home, main.inner-page');
  if(!root)return;
  const mq=matchMedia('(prefers-reduced-motion: reduce)');
  const selectors=[
   'section > .container > *', '.hero-copy > *',
   '.page-hero-layout > div:first-child > *', '.section-head > *',
   '.split > *', '.workflow-grid > article', '.offer-grid > article',
   '.owner-grid > article', '.commercial-grid > article', '.pricing-grid > article',
   '.limits-grid > article', '.step-grid > article', '.numbered-list > p',
   '.limits-columns > div', '.faq-list > details', '.signin-layout > *',
  ].join(',');
  let candidates=Array.from(root.querySelectorAll(selectors)).filter(el=>
   !el.closest('.home-intro')&&!el.matches('.motion-surface')&&!el.closest('.motion-surface')&&
   !el.querySelector('.motion-surface')&&!el.matches('form')&&!el.closest('form')
  );
  // Pick the smallest selected groups so ancestors and children don't slide twice.
  const targets=candidates.filter(el=>!candidates.some(other=>other!==el&&el.contains(other)));
  const animations=new Set();let observer;
  const cancel=()=>{observer?.disconnect();animations.forEach(a=>a.cancel());animations.clear();targets.forEach(el=>{delete el.dataset.scrollReveal;delete el.dataset.revealState})};
  const start=()=>{
   cancel();if(mq.matches||paused)return;
   const seen=new WeakSet();
   targets.forEach((el,i)=>{el.dataset.scrollReveal=i%2?'right':'left';el.dataset.revealState='ready'});
   observer=new IntersectionObserver(entries=>{
    const entering=entries.filter(e=>e.isIntersecting).sort((a,b)=>a.boundingClientRect.top-b.boundingClientRect.top);
    let stagger=0;
    for(const entry of entries){if(!entry.isIntersecting){seen.add(entry.target);entry.target.dataset.revealState='outside'}}
    for(const entry of entering){
     const el=entry.target;const first=!seen.has(el);seen.add(el);
     el.dataset.revealState='inside';
     if(first&&entry.boundingClientRect.top<innerHeight-45)continue;
     if(el.contains(document.activeElement)||typeof el.animate!=='function')continue;
     el.dataset.revealCount=String(Number(el.dataset.revealCount||0)+1);
     const direction=el.dataset.scrollReveal==='left'?-1:1;
     const distance=innerWidth<761?20:44;
     const animation=el.animate([{translate:`${direction*distance}px 0`,opacity:0},{translate:'0 0',opacity:1}],{duration:650,delay:Math.min(stagger++*100,300),easing:'cubic-bezier(.22,1,.36,1)',fill:'backwards'});
     animations.add(animation);animation.finished.then(()=>animations.delete(animation)).catch(()=>animations.delete(animation));
    }
   },{threshold:0,rootMargin:'-36px 0px -44px 0px'});
   targets.forEach(el=>observer.observe(el));
  };
  const revealFocused=e=>{animations.forEach(a=>{if(a.effect?.target?.contains(e.target))a.cancel()})};
  mq.addEventListener('change',start);root.addEventListener('focusin',revealFocused);start();
  return()=>{cancel();mq.removeEventListener('change',start);root.removeEventListener('focusin',revealFocused)};
 },[route,paused]);
}
