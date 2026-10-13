import { useEffect, useRef } from 'react';

// Camera-style motion across the approved original artwork. No rebuilt terrain.
const frames = [
  { zoom: 1, x: 0, y: 0 },
  { zoom: 1.38, x: .13, y: -.075 },
  { zoom: 1.48, x: -.06, y: -.07 },
  { zoom: 1.58, x: -.17, y: -.09 },
  { zoom: 1.35, x: -.12, y: .065 },
  { zoom: 1.05, x: 0, y: 0 },
];
const smooth=t=>t*t*(3-2*t);
export default function World({mode='survey',progress=0,paused=false,still=false,onReady}) {
 const host=useRef(null),image=useRef(null),latest=useRef({mode,progress,paused,still,onReady});
 latest.current={mode,progress,paused,still,onReady};
 useEffect(()=>{
  let frame=0,alive=true,p=0,last=performance.now();
  const draw=now=>{
   if(!alive)return;
   frame=requestAnimationFrame(draw);
   const dt=Math.min((now-last)/1000,.05);last=now;
   if(document.hidden)return;
   const s=latest.current;
   const target=s.still?0:Math.max(0,Math.min(1,Number.isFinite(s.progress)?s.progress:0));
   if(s.still)p=0;
   else if(!s.paused)p+=(target-p)*(1-Math.exp(-4.5*dt));
   const scaled=p*5,index=Math.min(4,Math.floor(scaled)),mix=smooth(scaled-index),a=frames[index],b=frames[index+1];
   const lerp=(x,y)=>x+(y-x)*mix;
   let zoom=lerp(a.zoom,b.zoom),x=lerp(a.x,b.x),y=lerp(a.y,b.y);
   // The secondary artwork keeps its own composition and moves only slightly.
   if(s.mode==='mesa'){
    const t=s.still?0:Math.min(1,scrollY/Math.max(innerHeight,1));
    zoom=1+t*.065;x=-.017*t;y=.014*t;
   }
   if(image.current){
    image.current.style.transform=`translate3d(${x*100}%,${y*100}%,0) scale(${zoom})`;
   }
   if(host.current){host.current.dataset.progress=p.toFixed(3);host.current.dataset.camera=`${zoom.toFixed(3)},${x.toFixed(3)},${y.toFixed(3)}`;}
  };
  frame=requestAnimationFrame(draw);
  return()=>{alive=false;cancelAnimationFrame(frame)};
 },[]);
 return <div ref={host} className="world-canvas image-camera-world" data-world="approved-artwork" aria-hidden="true" style={{overflow:'hidden',pointerEvents:'none'}}>
  <img ref={image} className="camera-artwork" src={`/assets/images/${mode==='mesa'?'mesa':'survey'}-exact-background.webp`} alt="" onLoad={()=>{if(host.current)host.current.dataset.ready='true';latest.current.onReady?.(true)}} onError={()=>latest.current.onReady?.(false)} style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:mode==='mesa'?'70% 45%':'center top',transformOrigin:'50% 50%',willChange:'transform',display:'block'}}/>
 </div>;
}
