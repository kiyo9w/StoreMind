import {World} from './three/store3d.js';
import {renderPortraits} from './three/products3d.js';
import {products,store} from './mock/data.js';
import {Director} from './director.js';
import {Chrome} from './ui/chrome.js';
import {state} from './state.js';
import {open} from './scenes/open.js';
import {night} from './scenes/night.js';
import {morning} from './scenes/morning.js';
import {day} from './scenes/day.js';
import {end} from './scenes/end.js';
import {sleep} from './util.js';
import {Sfx} from './ui/sound.js';

const gsap=window.gsap;
/* animation clock: rAF normally; timers while the tab is hidden (and never smooth over long frames) */
gsap.ticker.lagSmoothing(0);
setInterval(()=>{if(document.hidden)gsap.ticker.tick(true)},50);   // keeps tweens moving when the tab is backgrounded
const bar=document.querySelector('#boot .bar i');
const msg=document.querySelector('#boot .msg');
const prog=(v,t)=>{gsap.to(bar,{scaleX:v,duration:.5,ease:'power2.out'});if(t)msg.textContent=t};
/* boot must never depend on rAF or font events: a hidden tab or a slow font would stall it */
const frame=()=>new Promise(r=>{let d=false;const f=()=>{if(!d){d=true;r()}};requestAnimationFrame(f);setTimeout(f,40)});
const fontsReady=()=>Promise.race([document.fonts.ready,sleep(1400)]);

async function boot(){
  const T0=performance.now();const lap=n=>console.info(`[boot] ${n} ${Math.round(performance.now()-T0)}ms`);
  prog(.1);await frame();
  await fontsReady();
  prog(.3,'商品を準備しています');await frame();await frame();
  const items=[...new Set(products.map(p=>p.model))].map(m=>({id:m,model:m}));
  lap('fonts');
  const portraits=renderPortraits(items);lap('portraits');
  products.forEach(p=>{p.portrait=portraits[p.model]});
  prog(.6,'店舗の模型を組み立てています');await frame();await frame();
  const world=window.world=new World(document.getElementById('gl'));lap('world');
  world.setFill('A-03',6/30);world.setFill('C-01',7/40);
  const director=window.director=new Director();
  const chrome=new Chrome(director,store);director.chrome=chrome;
  const sfx=new Sfx(state);
  window.__sfx=sfx;
  const ctx={world,chrome,director,state,portraits,sfx};
  [open,night,morning,day,end].forEach(s=>director.register(s));
  director.mountAll(ctx,document.getElementById('scenes'));
  prog(1,'準備完了');await sleep(500);
  document.getElementById('boot').classList.add('is-gone');
  const q=new URLSearchParams(location.search);
  const names=['open','night','morning','day','end'];
  const want=q.get('scene');
  const idx=want==null?0:(isNaN(+want)?Math.max(0,names.indexOf(want)):+want);
  if(q.get('chrome')==='0')chrome.toggleChrome(true);
  await director.go(Math.min(idx,director.scenes.length-1));
  director.updateHint();lap('ready');
}

/* ───────── keyboard ───────── */
addEventListener('keydown',e=>{
  const d=window.director;if(!d)return;
  const tag=(e.target&&e.target.tagName)||'';
  if(tag==='INPUT'||tag==='TEXTAREA')return;
  if(e.metaKey||e.ctrlKey||e.altKey)return;
  const k=e.key;
  if(k==='Enter'||k===' '||k==='ArrowRight'){e.preventDefault();d.stopAuto();d.primary()}
  else if(k==='ArrowLeft'){e.preventDefault();d.stopAuto();d.prev()}
  else if(/^[1-5]$/.test(k)){d.stopAuto();d.go(+k-1)}
  else if(k==='a'||k==='A')d.toggleAuto();
  else if(k==='p'||k==='P')d.chrome.togglePresenter();
  else if(k==='h'||k==='H')d.chrome.toggleChrome();
  else if(k==='f'||k==='F'){document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen?.()}
  else if(k==='m'||k==='M')d.chrome.toast(d.ctx.sfx.toggle()?'効果音: オン':'効果音: オフ');
  else if(k==='r'||k==='R')d.reset();
  else if(k==='?'||k==='/')d.chrome.toggleHelp();
  else if(k==='Escape'){if(d.scene&&d.scene.escape&&d.scene.escape())return;d.stopAuto();d.chrome.toggleHelp(false);d.chrome.togglePresenter(false)}
});

boot().catch(e=>{console.error(e);document.querySelector('#boot .msg').textContent='読み込みに失敗しました: '+e.message});
