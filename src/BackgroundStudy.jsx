import { useEffect, useState } from 'react';
import World from './World.jsx';
import './background-study.css';
export default function BackgroundStudy(){
 const [copy,setCopy]=useState(true),[mode,setMode]=useState('survey'),[progress,setProgress]=useState(0),[paused,setPaused]=useState(false);
 const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 useEffect(()=>{const f=()=>setProgress(Math.min(1,scrollY/Math.max(1,innerHeight*3)));f();addEventListener('scroll',f,{passive:true});return()=>removeEventListener('scroll',f)},[]);
 return <main className="artwork-review" style={{height:'400svh',position:'relative'}}><div className="background-study" style={{position:'fixed',inset:0}}><World mode={mode} progress={progress} paused={paused} still={reduced}/>
 {copy&&<><header className="study-header"><img src="/assets/logos/TaskAccord-primary.svg" alt="TaskAccord"/><span>Human authority. Shared ground.</span><a href="/">Website preview ↗</a></header><div className="study-heading"><p>HUMAN-APPROVED AGENT DELEGATION</p><h1>A clear path.<br/>A firm boundary.</h1><span>Task mandates and receipts, with people in control.</span></div></>}
 <footer className="study-controls"><span>APPROVED ARTWORK <i/> Scroll to move the view</span><div style={{display:'flex',gap:8}}><button onClick={()=>setCopy(!copy)}>{copy?'Background only':'Show typography'}</button><button onClick={()=>setMode(mode==='survey'?'mesa':'survey')}>{mode==='survey'?'View Mesa Passage':'View Surveyor’s Crossing'}</button><button onClick={()=>setPaused(!paused)}>{paused?'Resume':'Pause'}</button></div></footer>
 </div></main>
}
