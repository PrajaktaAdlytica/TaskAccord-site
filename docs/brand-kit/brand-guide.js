const contrastData=[
  {
    "pair": "Ink / paper",
    "foreground": "#262B26",
    "background": "#F5F0E6",
    "ratio": 12.7,
    "normal_text_4_5": true,
    "ui_3": true
  },
  {
    "pair": "Ink / sage",
    "foreground": "#262B26",
    "background": "#DDE2D3",
    "ratio": 10.92,
    "normal_text_4_5": true,
    "ui_3": true
  },
  {
    "pair": "Muted / surface",
    "foreground": "#62665D",
    "background": "#FFFCF5",
    "ratio": 5.73,
    "normal_text_4_5": true,
    "ui_3": true
  },
  {
    "pair": "Paper / ink action",
    "foreground": "#F5F0E6",
    "background": "#262B26",
    "ratio": 12.7,
    "normal_text_4_5": true,
    "ui_3": true
  },
  {
    "pair": "Success / sage",
    "foreground": "#355B44",
    "background": "#DDE2D3",
    "ratio": 5.82,
    "normal_text_4_5": true,
    "ui_3": true
  },
  {
    "pair": "Error / clay",
    "foreground": "#963C2D",
    "background": "#F1DED1",
    "ratio": 5.4,
    "normal_text_4_5": true,
    "ui_3": true
  },
  {
    "pair": "Pending / paper",
    "foreground": "#835B1C",
    "background": "#F5F0E6",
    "ratio": 5.32,
    "normal_text_4_5": true,
    "ui_3": true
  },
  {
    "pair": "Strong boundary / surface",
    "foreground": "#807565",
    "background": "#FFFCF5",
    "ratio": 4.41,
    "normal_text_4_5": false,
    "ui_3": true
  },
  {
    "pair": "Brass / paper (decorative)",
    "foreground": "#9B6C3C",
    "background": "#F5F0E6",
    "ratio": 4.02,
    "normal_text_4_5": false,
    "ui_3": true
  }
];
document.querySelector('#contrast-table tbody').innerHTML=contrastData.map(x=>`<tr><td>${x.pair}</td><td>${x.ratio}:1</td><td>${x.normal_text_4_5?'Text pass':'UI/decorative only'} / ${x.ui_3?'UI pass':'Decorative only'}</td></tr>`).join('');
document.querySelector('#spacing-ladder').innerHTML=[4,8,12,16,24,32,48,64,96,128].map(x=>`<div class="space-row"><code>${x}px</code><i style="width:${x}px"></i></div>`).join('');
const names=["accessibility", "arrow-right", "arrow-up-right", "building-2", "check", "chevron-down", "chevron-right", "circle-check", "circle-x", "clock", "copy", "download", "external-link", "eye", "file-check-2", "file-text", "git-branch", "info", "keyboard", "list-filter", "lock-keyhole", "mail", "menu", "mouse", "notebook-tabs", "pause", "play", "receipt-text", "rotate-ccw", "route", "scan-line", "search", "triangle-alert", "user-round", "users-round", "x"];
document.querySelector('#icon-gallery').innerHTML=names.map(n=>`<div class="icon-item"><img loading="lazy" src="assets/icons/lucide-${n}.svg" alt=""><small>${n}</small></div>`).join('');
const plot=document.querySelector('#limit-plot');
document.querySelector('#replay').addEventListener('click',()=>{plot.classList.add('rejected');plot.querySelector('.plot-status').textContent='DEMO · $180 change rejected — original $120 ceiling unchanged';});
document.querySelector('#reset-plot').addEventListener('click',()=>{plot.classList.remove('rejected');plot.querySelector('.plot-status').textContent='DEMO · $120 task shown within recorded ceiling';});
let formState=0;document.querySelector('#form-style-button').addEventListener('click',()=>{const p=document.querySelector('#form-style-message');formState=1-formState;p.style.color=formState?'var(--error)':'var(--success)';p.textContent=formState?'Sample error: enter a valid work email. Nothing was sent.':'Sample success styling: a real success would require persisted submission. Nothing was sent.';});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){const d=document.querySelector('#product-menu');if(d.open){d.open=false;d.querySelector('summary').focus();}}});
document.addEventListener('click',e=>{const d=document.querySelector('#product-menu');if(d.open&&!d.contains(e.target))d.open=false;});
