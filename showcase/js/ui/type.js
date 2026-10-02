/* Text motion helpers (no plugin dependency). */
import {SPEED} from '../util.js';
const gsap=window.gsap;

export function splitChars(el,{cls='ch'}={}){
  const text=el.textContent;el.textContent='';el.setAttribute('aria-label',text);
  return [...text].map(ch=>{
    const s=document.createElement('span');s.className=cls;s.setAttribute('aria-hidden','true');
    s.style.display='inline-block';s.textContent=ch===' '?' ':ch;el.append(s);return s;
  });
}

/* masked line reveal: title rises out of an overflow:hidden slot */
export function revealChars(chars,{delay=0,stagger=.045,y='105%',dur=1.1,ease='expo.out',blur=true}={}){
  gsap.set(chars,{yPercent:105,opacity:0,filter:blur?'blur(6px)':'none'});
  return gsap.to(chars,{yPercent:0,opacity:1,filter:'blur(0px)',duration:dur,ease,stagger,delay,clearProps:'filter,transform'});
}

/* stream text into an element, token by token, like an LLM.
   returns a promise; `ctl.cancel()` stops it, `ctl.finish()` jumps to the end. */
export function streamText(el,text,{cps=34,jitter=.5,onTick,caret=true,run}={}){
  let i=0,stop=false;const ctl={cancel(){stop=true},finish(){i=text.length}};
  const caretEl=caret?Object.assign(document.createElement('span'),{className:'caret'}):null;
  el.textContent='';if(caretEl)el.append(caretEl);
  const node=document.createTextNode('');el.insertBefore(node,caretEl);
  const p=new Promise(res=>{
    const step=()=>{
      if(stop){res(false);return}
      if(run&&run.dead){res(false);return}
      if(run&&run.skip)i=text.length;
      // chunk 1–3 chars; pause on punctuation
      const n=1+Math.floor(Math.random()*2);
      i=Math.min(text.length,i+n);
      node.nodeValue=text.slice(0,i);
      onTick&&onTick(i);
      if(i>=text.length){if(caretEl)caretEl.remove();res(true);return}
      const last=text[i-1];
      let d=1000/(cps*SPEED)*(1+(Math.random()-.5)*jitter*2);
      if('、，,'.includes(last))d+=90/SPEED;if('。！？.!?'.includes(last))d+=240/SPEED;if(last==='\n')d+=320/SPEED;
      setTimeout(step,d);
    };
    step();
  });
  p.ctl=ctl;return p;
}

/* count a number up inside an element */
export function countTo(el,to,{from=0,dur=1.2,fmt=v=>Math.round(v).toString(),ease='power3.out',delay=0}={}){
  const o={v:from};el.textContent=fmt(from);
  return gsap.to(o,{v:to,duration:dur,delay,ease,onUpdate:()=>{el.textContent=fmt(o.v)},onComplete:()=>{el.textContent=fmt(to)}});
}
