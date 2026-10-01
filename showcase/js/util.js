export const $=(s,r=document)=>r.querySelector(s);
export const $$=(s,r=document)=>[...r.querySelectorAll(s)];
export const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
export const lerp=(a,b,t)=>a+(b-a)*t;
export const sleep=ms=>new Promise(r=>setTimeout(r,ms));
export const pad2=n=>String(n).padStart(2,'0');

/* html string → element */
export function h(html){
  const t=document.createElement('template');t.innerHTML=html.trim();return t.content.firstElementChild;
}
/* minute-of-day → "HH:MM" */
export const hhmm=m=>{m=((Math.round(m)%1440)+1440)%1440;return `${pad2(Math.floor(m/60))}:${pad2(m%60)}`};
export const toMin=s=>{const [a,b]=s.split(':').map(Number);return a*60+b};

/* a cancellable timeline-ish waiter used by scenes that run scripted sequences */
export class Run{
  constructor(){this.dead=false;this.skip=false;this._res=new Set()}
  kill(){this.dead=true;this._res.forEach(r=>r());this._res.clear()}
  wait(ms){
    if(this.dead)return Promise.reject(new Error('run-dead'));
    if(this.skip)return Promise.resolve();
    return new Promise((res,rej)=>{
      const to=setTimeout(()=>{this._res.delete(done);res()},ms);
      const done=()=>{clearTimeout(to);rej(new Error('run-dead'))};
      this._res.add(done);
    });
  }
}
export const isDead=e=>e&&e.message==='run-dead';

export function fmtNum(n){return n.toLocaleString('ja-JP')}
export function reducedMotion(){return matchMedia('(prefers-reduced-motion: reduce)').matches}

/* tiny event emitter */
export class Emitter{
  constructor(){this._m={}}
  on(e,f){(this._m[e]||(this._m[e]=new Set())).add(f);return()=>this._m[e].delete(f)}
  emit(e,...a){this._m[e]&&this._m[e].forEach(f=>f(...a))}
}

/* gsap helpers (global from the vendored build) */
export const G=()=>window.gsap;
