/* Chat transcript renderer shared by the manager drawer (morning) and the staff panel (day).
   It only renders events; what they mean is decided by the scene's callbacks. */
import {h,Run,isDead,SPEED} from '../util.js';
import {I} from './icons.js';
import {streamText} from './type.js';
const gsap=window.gsap;

export class ChatView{
  constructor(root,{renderCard,onAction,who='StoreMind'}={}){
    this.root=root;this.renderCard=renderCard;this.onAction=onAction;this.who=who;
    this.root.classList.add('chat');
    this.msgs=h(`<div class="msgs" role="log" aria-live="polite"></div>`);
    this.root.append(this.msgs);
    this.busy=false;
  }
  clear(){this.msgs.innerHTML=''}
  scroll(){
    const m=this.msgs;gsap.to(m,{scrollTop:m.scrollHeight,duration:.4,ease:'power2.out',overwrite:true});
  }
  addUser(text){
    const el=h(`<div class="msg user"><div class="bub"></div></div>`);
    el.querySelector('.bub').textContent=text;
    this.msgs.append(el);gsap.from(el,{opacity:0,y:14,duration:.45,ease:'expo.out'});this.scroll();
    return el;
  }
  /* render one assistant turn from an async generator of events */
  async reply(gen,{run}={}){
    this.busy=true;
    const el=h(`<div class="msg ai"><div class="av">${I.spark}</div><div class="body"></div></div>`);
    const body=el.querySelector('.body');
    this.msgs.append(el);gsap.from(el,{opacity:0,y:14,duration:.45,ease:'expo.out'});
    const thinking=h(`<div class="thinking"><i></i><i></i><i></i></div>`);body.append(thinking);this.scroll();
    try{
      for await(const ev of gen){
        if(run&&run.dead)break;
        thinking.remove();
        if(ev.type==='tool')await this._tool(body,ev,run);
        else if(ev.type==='text')await this._text(body,ev.text,run);
        else if(ev.type==='card'&&this.renderCard){const c=this.renderCard(ev);if(c){body.append(c);gsap.from(c,{opacity:0,y:16,duration:.6,ease:'expo.out'});this.scroll()}}
        else if(ev.type==='action'&&this.onAction)await this.onAction(ev);
        if(!body.contains(thinking)&&ev.type!=='action'&&ev.type!=='text'){/* keep showing dots until next event */}
        this.scroll();
      }
    }catch(e){if(!isDead(e))throw e}
    finally{thinking.remove();this.busy=false}
  }
  async _tool(body,ev,run){
    const el=h(`<div class="tool is-run"><span class="ti">${I[ev.icon]||I.db}</span><span class="tl">${ev.label}</span><span class="ta">${ev.arg||''}</span><span class="tr"></span><span class="ts"></span></div>`);
    body.append(el);gsap.from(el,{opacity:0,x:-10,duration:.4,ease:'expo.out'});this.scroll();
    const ms=run&&run.skip?0:(ev.ms??800)/SPEED;
    await new Promise(r=>setTimeout(r,ms));
    el.classList.remove('is-run');el.classList.add('is-done');window.__sfx&&window.__sfx.pop();
    el.querySelector('.tr').textContent=ev.result||'';
    el.querySelector('.ts').innerHTML=I.check;
  }
  async _text(body,text,run){
    for(const para of text.split('\n')){
      const p=h(`<p class="tx"></p>`);body.append(p);
      await streamText(p,para,{cps:56,run,onTick:()=>this.scroll()});
    }
  }
}
