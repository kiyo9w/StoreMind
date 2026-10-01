/* 01 · 閉店後 — the store at 22:00, tomorrow is rain. */
import {h,sleep} from '../util.js';
import {I} from '../ui/icons.js';
import {splitChars,revealChars} from '../ui/type.js';
import {store,weather,productById} from '../mock/data.js';
const gsap=window.gsap;

export const open={
  id:'open',title:'閉店後',theme:'night',clockSub:'閉店後の店舗',
  notes:[
    '閉店後の店舗です。明日は雨。今日の弁当は少し残っています。',
    '一方で、傘の在庫は少ない。では、明日は何を、どれだけ補充するか。',
    '画面の3つの数字が、管理者が毎晩確認している材料です。',
  ],
  _first:true,

  mount(root,ctx){
    this.ctx=ctx;
    const U=productById('umbrella'),B=productById('bento');
    root.innerHTML=`
      <div class="copy">
        <div class="eyebrow label">${store.chain} · ${store.name}</div>
        <h1 aria-live="off">閉店後の店舗。</h1>
        <ul class="signals">
          <li data-k="wx">${`<span class="ic">${I.rain}</span>`}<div><span class="k">明日の天気</span><span class="v">雨<small>最低 ${weather.lo}℃ · ${weather.note.split('。')[0]}</small></span></div><span class="n">${Math.round(weather.pop*100)}<small>%</small></span></li>
          <li data-k="bento"><span class="ic">${I.box}</span><div><span class="k">今日の弁当</span><span class="v">少し残っている<small>期限は今夜</small></span></div><span class="n">${B.stock}<small>個</small></span></li>
          <li data-k="umb"><span class="ic">${I.umbrella}</span><div><span class="k">傘の在庫</span><span class="v">少ない<small>棚の上限 ${U.cap}本</small></span></div><span class="n">${U.stock}<small>本</small></span></li>
        </ul>
        <p class="ask">明日は、<mark>何を、どれだけ</mark>補充するか。</p>
        <div class="cta"><button class="btn is-fill" data-act="start">夜の準備を始める <kbd>⏎</kbd></button><span class="aside">閉店から翌朝までを、ひとつの店舗で。</span></div>
      </div>
      <div class="pins">
        ${this._pin('SKY','明日の天気',`雨 <b>${Math.round(weather.pop*100)}</b>%`,`${weather.hi}℃ / ${weather.lo}℃`,'','5.6rem')}
        ${this._pin('A-03','傘',`在庫 <b>${U.stock}</b>本`,`${U.shelf.code} ${U.shelf.zone}`,'is-warn','3rem')}
        ${this._pin('C-01','弁当',`残り <b>${B.stock}</b>個`,'期限は今夜','is-warn','3rem')}
      </div>`;
    root.querySelector('[data-act=start]').addEventListener('click',()=>ctx.director.primary());
    this.pinEls=[...root.querySelectorAll('.pin')];
    this.pinEls.forEach(el=>ctx.world.addPin(el.dataset.code,el,el.dataset.code==='SKY'?{x:0,y:0,z:0}:{x:0,y:.1,z:0}));
  },
  _pin(code,k,v,s,cls,stem){return `<div class="pin ${cls}" data-code="${code}"${stem?` style="--stem:${stem}"`:''}><i class="stem"></i><i class="dot"></i><div class="card"><span class="k">${k}</span><span class="v">${v}</span><span class="s">${s}</span></div></div>`},

  async enter(prev){
    const {world,chrome}=this.ctx,root=this.root;
    world.setPaused(false);
    document.getElementById('gl').style.opacity=1;
    world.mood(0,prev?1.6:0);world.rain(1,prev?1.2:0);world.setOpen(false);world.scan(false);
    world.uiShift(.235,prev?2:0);world.drift(.1);
    chrome.jumpClock('22:00','閉店後の店舗');
    const h1=root.querySelector('h1');const chars=splitChars(h1);
    const items=root.querySelectorAll('.signals li'),ask=root.querySelector('.ask'),cta=root.querySelector('.cta'),eb=root.querySelector('.eyebrow');
    if(this._first||!prev){
      world.shot({pos:[33,21,36],target:[0,.5,0],fov:31},{instant:true});
      world.shot('hero',{duration:4.6,ease:'power3.out'});
    }else world.shot('hero',{duration:2.6});
    this._first=false;
    gsap.set([items,ask,cta,eb],{opacity:0});gsap.set(this.pinEls,{opacity:0});
    const tl=gsap.timeline({delay:prev?.2:.5});
    tl.fromTo(eb,{x:-24,opacity:0},{x:0,opacity:1,duration:1,ease:'expo.out'},0)
      .add(revealChars(chars,{stagger:.07,dur:1.3}),.1)
      .fromTo(items,{y:36,opacity:0},{y:0,opacity:1,duration:1,ease:'expo.out',stagger:.22},.9)
      .fromTo(ask,{y:24,opacity:0},{y:0,opacity:1,duration:1.1,ease:'expo.out'},1.9)
      .fromTo(cta,{y:24,opacity:0},{y:0,opacity:1,duration:1,ease:'expo.out'},2.3);
    // pins land one by one, drawing their stems
    this.pinEls.forEach((el,i)=>{
      const stem=el.querySelector('.stem'),dot=el.querySelector('.dot'),card=el.querySelector('.card');
      tl.set(el,{opacity:1},1.5+i*.35)
        .fromTo(dot,{scale:0},{scale:1,duration:.5,ease:'back.out(3)'},1.5+i*.35)
        .fromTo(stem,{scaleY:0},{scaleY:1,duration:.7,ease:'power3.out'},1.55+i*.35)
        .fromTo(card,{opacity:0,y:12,scale:.92},{opacity:1,y:0,scale:1,duration:.6,ease:'expo.out'},1.95+i*.35);
    });
    await sleep(prev?900:1400);
  },
  async leave(){
    const root=this.root;
    await gsap.to([root.querySelector('.copy'),root.querySelector('.pins')],{opacity:0,y:-14,duration:.7,ease:'power2.in'}).then();
    gsap.set([root.querySelector('.copy'),root.querySelector('.pins')],{clearProps:'all'});
  },
  primary(){return 'next'},
  hint(){return ''},
  autoPause:5800,
  reset(){},
};
