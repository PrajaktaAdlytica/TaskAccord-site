import {useContext,useEffect,useImperativeHandle,useRef,useState} from 'react';
import {MotionContext} from './Motion';

export const INTRO_VIDEO='https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260820_010308_b1636845-4c15-4ab6-b0c9-9a29bfb0c6e3.mp4';
export function HomeIntro({controller}){
 const video=useRef(null),section=useRef(null);
 const {paused,setPaused}=useContext(MotionContext);
 const [reduced,setReduced]=useState(()=>matchMedia('(prefers-reduced-motion: reduce)').matches);
 const [visible,setVisible]=useState(true),[hidden,setHidden]=useState(document.hidden);
 const [finished,setFinished]=useState(false),[requested,setRequested]=useState(false);
 useImperativeHandle(controller,()=>({replay(){setFinished(false);setRequested(true);setPaused(false);if(video.current)video.current.currentTime=0;section.current.scrollIntoView({behavior:reduced?"instant":"smooth",block:"start"})}}),[reduced,setPaused]);
 function complete(){setFinished(true);if(!visible||document.hidden)return;const hero=document.querySelector("#homepage-hero");if(hero){const top=hero.getBoundingClientRect().top+window.scrollY-76;window.scrollTo({top,behavior:reduced?"instant":"smooth"})}}
 useEffect(()=>{const mq=matchMedia('(prefers-reduced-motion: reduce)');const change=()=>setReduced(mq.matches),visibility=()=>setHidden(document.hidden);const observer=new IntersectionObserver(([e])=>setVisible(e.isIntersecting),{threshold:.05});observer.observe(section.current);mq.addEventListener('change',change);document.addEventListener('visibilitychange',visibility);return()=>{observer.disconnect();mq.removeEventListener('change',change);document.removeEventListener('visibilitychange',visibility)}},[]);
 useEffect(()=>{const el=video.current;if(!el)return;if((reduced&&!requested)||paused||hidden||!visible||finished)el.pause();else el.play()?.catch(()=>{})},[reduced,requested,paused,hidden,visible,finished]);
 return <section className="home-intro" ref={section} aria-labelledby="intro-heading" data-reduced={reduced}>
  <div className="home-intro-video"><video ref={video} src={INTRO_VIDEO} autoPlay={!reduced&&!paused} muted onEnded={complete} playsInline preload="metadata" aria-hidden="true" tabIndex={-1}/></div>
  <div className="home-intro-content">
   <a href="/preview-access" className="home-intro-announcement">Research-stage concept · Explore a bounded task <span aria-hidden="true">→</span></a>
   <h2 id="intro-heading">Clear boundaries for agent tasks.<br className="intro-line-break"/> Human authority at every step.</h2>
  </div>
 </section>;
}
