/* 04 · 日中に確認する — floor staff ask; the store answers in text and on the 3D model. */
import {h,sleep,Run,isDead} from '../util.js';
import {I} from '../ui/icons.js';
import {countTo} from '../ui/type.js';
import {ChatView} from '../ui/chat.js';
import {renderCard} from '../ui/cards.js';
import {products,productById,store,weather} from '../mock/data.js';
import {parseStaff,staffReply,stockNow} from '../mock/llm.js';
import {state} from '../state.js';
const gsap=window.gsap;

const BAY_PRODUCT={'A-03':'umbrella','A-04':'raincoat','C-01':'bento','C-02':'milk','C-03':'salad','D-01':'coffee','B-02':'noodle','F-01':'ice'};
const SHIFT=-.17;
const level=r=>r<.2?'crit':r<.45?'low':'ok';
const ratioOf=p=>Math.min(1,stockNow(p)/p.cap);

const BOXES=[
  {x:11, y:14,w:21,h:21,t:'幕の内弁当',n:4},
  {x:17, y:62,w:20,h:25,t:'焼鮭弁当',  n:3},
  {x:50, y:61,w:15,h:28,t:'日替わり弁当',n:3},
  {x:86, y:8, w:13,h:22,t:'たまごサンド',n:7,cold:true},
];

export const day={
  id:'day',title:'日中に確認する',theme:'day',clockSub:'スタッフの問い合わせ',
  notes:[
    '日中は、スタッフも同じデータを使って、チャットから確認できます。',
    '「傘の在庫は？」と聞くと、在庫DBを引いて答え、店内の模型でその棚を示します。朝の入荷分が反映されています。',
    '次の入荷、期限が近い商品、棚の場所も同じ画面で聞けます。',
    '棚をカメラで見て数を数える「棚スキャン」や、音声での問い合わせは、まだコンセプトです。',
  ],
  mount(root,ctx){this.ctx=ctx;this._build()},

  _build(){
    const root=this.root,ctx=this.ctx;
    (this._pinObjs||[]).forEach(p=>ctx.world.removePin(p.pin));this._pinObjs=[];this.pinMap={};
    root.innerHTML=`
    <div class="hud-b">
      <div class="legend"><span class="ok"><i></i>十分</span><span class="low"><i></i>少なめ</span><span class="crit"><i></i>補充が必要</span></div>
      <div class="tools"><button class="tgl" data-act="heat"><span class="ic">${I.heat}</span>在庫ヒートマップ</button><button class="tgl" data-act="ar"><span class="ic">${I.scan}</span>棚スキャン<span class="tag is-concept">コンセプト</span></button></div>
      <div class="seg" role="group" aria-label="視点"><button data-v="wide" class="is-on">全体</button><button data-v="door">入口</button><button data-v="cooler">冷蔵ケース</button><button data-v="register">レジ</button></div>
    </div>
    <div class="pins"></div>
    <div class="tip3d"></div>
    <aside class="panel" aria-label="店内アシスタント">
      <div class="ph"><h3>店内アシスタント<small>在庫 · 入荷 · 棚の場所</small></h3><span class="tag">スタッフ</span></div>
      <div class="chat-host"></div>
      <div class="foot">
        <div class="chips"><button class="chip" data-q="ビニール傘の在庫はいくつですか？">傘の在庫は？</button><button class="chip" data-q="温かいお茶はどこにありますか？">温かいお茶はどこ？</button><button class="chip" data-q="次の入荷はいつですか？">次の入荷は？</button><button class="chip" data-q="期限が近い商品は？">期限が近い商品</button></div>
        <div class="ask-bar"><span class="spark"><span class="ic">${I.spark}</span></span><input type="text" placeholder="在庫・入荷・棚の場所を聞く…" aria-label="質問"><div class="wave">${'<i></i>'.repeat(30)}</div><button class="ib" data-act="mic" aria-label="音声入力" title="音声入力（コンセプト）">${I.mic}</button><button class="ib go" aria-label="送信">${I.send}</button></div>
      </div>
    </aside>
    <div class="ar" aria-label="棚スキャン（AR コンセプト）">
      <button class="btn is-ghost close" data-act="arclose">閉じる <kbd>Esc</kbd></button>
      <div class="ar-in">
        <div class="frame"><img src="assets/plates/shelf-bento.jpg" alt="弁当の棚">
          <i class="corner tl"></i><i class="corner tr"></i><i class="corner bl"></i><i class="corner br"></i><div class="scanline"></div>
          ${BOXES.map(b=>`<div class="box ${b.cold?'cold':''}" style="left:${b.x}%;top:${b.y}%;width:${b.w}%;height:${b.h}%;opacity:0"><span class="lb">${b.t}<b>×${b.n}</b></span></div>`).join('')}
          <div class="hud-b"><span>C-01 弁当ケース</span><span>14:23:08</span><span>AR · CONCEPT</span></div>
          <div class="cap">写真: Martin Lewison / Wikimedia Commons（CC BY-SA）· コンセプト表示</div></div>
        <div class="side"><h3>棚をカメラで見て、数える。<small>見つけた商品と数を、在庫DBと照らし合わせます。</small></h3>
          <ul class="det">${BOXES.map(b=>`<li style="opacity:0"><span>${b.t}</span><b>${b.n}</b><small>${b.cold?'':'期限 今夜'}</small></li>`).join('')}</ul>
          <div class="sum"><div><div class="l">検出</div><div class="v"><span data-ar="n">0</span><small>点</small></div></div><div><div class="l">認識</div><div class="v"><span data-ar="p">0</span><small>%</small></div></div></div>
          <div class="match"><span class="ic">${I.check}</span>弁当 ${BOXES.slice(0,3).reduce((a,b)=>a+b.n,0)}個 · 在庫DBと一致</div></div>
      </div>
    </div>`;
    this.el={pins:root.querySelector('.pins'),tip:root.querySelector('.tip3d'),input:root.querySelector('.ask-bar input'),bar:root.querySelector('.ask-bar'),
      legend:root.querySelector('.legend'),ar:root.querySelector('.ar'),heatBtn:root.querySelector('[data-act=heat]'),arBtn:root.querySelector('[data-act=ar]')};
    this.chat=new ChatView(root.querySelector('.chat-host'),{renderCard,onAction:ev=>this.action(ev)});
    this.chat.msgs.insertAdjacentHTML('beforeend',`<div class="msg ai"><div class="av"><span class="ic">${I.spark}</span></div><div class="body"><p class="tx">在庫・入荷予定・棚の場所に答えます。店内の模型の棚をクリックして、その棚の在庫を聞くこともできます。</p></div></div>`);
    this._bind();
    this.heatOn=false;this.arOpen=false;this.beat=0;this.lastP=null;
  },
  _bind(){
    const root=this.root,{el}=this;
    root.querySelectorAll('.seg button').forEach(b=>b.addEventListener('click',()=>{
      root.querySelectorAll('.seg button').forEach(x=>x.classList.toggle('is-on',x===b));
      this.ctx.world.clearLocate();this._clearLocPins();
      this.ctx.world.shot(b.dataset.v,{duration:1.8});
    }));
    el.heatBtn.addEventListener('click',()=>this.heat(!this.heatOn));
    el.arBtn.addEventListener('click',()=>this.openAR());
    root.querySelector('[data-act=arclose]').addEventListener('click',()=>this.closeAR());
    root.querySelectorAll('.foot .chip').forEach(c=>c.addEventListener('click',()=>this.ask(c.dataset.q)));
    const send=()=>{const v=el.input.value.trim();if(!v)return;el.input.value='';this.ask(v)};
    root.querySelector('.ib.go').addEventListener('click',send);
    el.input.addEventListener('keydown',e=>{e.stopPropagation();if(e.key==='Enter'&&!e.isComposing&&e.keyCode!==229)send()});   // IME-safe
    root.querySelector('[data-act=mic]').addEventListener('click',()=>this.voice());
  },

  /* ───── pins ───── */
  pinFor(code,{loc=false}={}){
    if(this.pinMap[code])return this.pinMap[code];
    const p=productById(BAY_PRODUCT[code]);if(!p)return null;
    const r=ratioOf(p),now=stockNow(p);
    const el=h(`<div class="pin stk ${level(r)} ${loc?'is-loc':''}" data-code="${code}"><i class="stem"></i><i class="dot"></i><div class="card"><span class="k">${p.short}</span><span class="v"><b>${now}</b>${p.unit}</span><span class="bar"><u style="width:${Math.round(r*100)}%"></u></span></div></div>`);
    this.el.pins.append(el);
    const pin=this.ctx.world.addPin(code,el,{x:0,y:.1,z:0});
    const o={el,pin,loc};this._pinObjs.push(o);this.pinMap[code]=o;
    gsap.fromTo(el.querySelector('.card'),{opacity:0,y:10,scale:.92},{opacity:1,y:0,scale:1,duration:.5,ease:'expo.out'});
    gsap.fromTo(el.querySelector('.stem'),{scaleY:0},{scaleY:1,duration:.5,ease:'power3.out'});
    gsap.fromTo(el.querySelector('.dot'),{scale:0},{scale:1,duration:.4,ease:'back.out(3)'});
    return o;
  },
  dropPin(code){
    const o=this.pinMap[code];if(!o)return;
    this.ctx.world.removePin(o.pin);this._pinObjs=this._pinObjs.filter(x=>x!==o);delete this.pinMap[code];
    gsap.to(o.el,{opacity:0,duration:.3,onComplete:()=>o.el.remove()});
  },
  _clearLocPins(){Object.keys(this.pinMap).forEach(c=>{if(this.pinMap[c].loc&&!this.heatOn)this.dropPin(c)})},
  levels(){const L={};for(const [c,id] of Object.entries(BAY_PRODUCT))L[c]=ratioOf(productById(id));return L},

  heat(on){
    this.heatOn=on;
    const {world}=this.ctx;
    this.el.heatBtn.classList.toggle('is-on',on);this.el.legend.classList.toggle('is-on',on);
    world.setHeat(on,this.levels());
    if(on){
      world.clearLocate();this._clearLocPins();
      this.root.querySelectorAll('.seg button').forEach(x=>x.classList.toggle('is-on',x.dataset.v==='wide'));
      world.shot('wide',{duration:1.8});
      Object.keys(BAY_PRODUCT).forEach((c,i)=>setTimeout(()=>{if(this.heatOn)this.pinFor(c)},350+i*130));
    }else Object.keys(BAY_PRODUCT).forEach(c=>this.dropPin(c));
  },

  /* ───── chat ───── */
  async ask(text,{run}={}){
    if(this.chat.busy)return;
    this.run=run||new Run();
    this.chat.addUser(text);
    const intent=parseStaff(text,{last:this.lastP});
    if(intent.p)this.lastP=intent.p;
    this.ctx.director.updateHint();
    try{await this.chat.reply(staffReply(intent),{run:this.run})}finally{this.ctx.director.updateHint()}
  },
  async action(ev){
    const {name,payload}=ev,{world}=this.ctx;
    if(name==='locate'){
      this.root.querySelectorAll('.seg button').forEach(x=>x.classList.remove('is-on'));
      if(!this.heatOn){Object.keys(this.pinMap).forEach(c=>{if(this.pinMap[c].loc)this.dropPin(c)})}
      world.locate(payload.code,{camera:true,duration:2.2});
      setTimeout(()=>{ const o=this.pinMap[payload.code];if(o)o.el.classList.add('is-loc');else this.pinFor(payload.code,{loc:true}) },900);
    }else if(name==='ar'){await sleep(600);await this.openAR()}
  },
  async typeAsk(text){
    this.typing=true;
    const inp=this.el.input;inp.focus({preventScroll:true});inp.value='';
    for(const ch of text){inp.value+=ch;await sleep(this.run&&this.run.skip?0:36)}
    await sleep(320);inp.value='';inp.blur();
    this.typing=false;
    await this.ask(text,{run:this.run});
  },
  async voice(text='次の入荷はいつですか？'){
    if(this.chat.busy)return;
    const mic=this.root.querySelector('[data-act=mic]');
    this.el.bar.classList.add('is-listening');mic.classList.add('is-live');
    await sleep(1700);
    this.el.bar.classList.remove('is-listening');mic.classList.remove('is-live');
    await this.typeAsk(text);
  },

  /* ───── AR (concept) ───── */
  async openAR(){
    if(this.arOpen)return;this.arOpen=true;
    const ar=this.el.ar,q=s=>ar.querySelector(s),qa=s=>ar.querySelectorAll(s);
    document.body.classList.replace('theme-day','theme-night');document.body.classList.add('ar-open');
    ar.classList.add('is-open');
    this.ctx.director.updateHint();
    gsap.fromTo(ar,{opacity:0},{opacity:1,duration:.55,ease:'power2.out'});
    gsap.set(qa('.box'),{opacity:0,scale:1.12});gsap.set(qa('.det li'),{opacity:0,x:16});gsap.set(q('.match'),{opacity:0});
    q('[data-ar=n]').textContent='0';q('[data-ar=p]').textContent='0';
    gsap.fromTo(qa('.corner'),{scale:1.7,opacity:0},{scale:1,opacity:1,duration:.7,ease:'expo.out',stagger:.05,delay:.2});
    const scan=q('.scanline'),fr=q('.frame'),H=fr.clientHeight;
    const tl=gsap.timeline({delay:.6});
    tl.fromTo(scan,{y:-H*.12},{y:H*1.1,duration:1.7,ease:'sine.inOut'})
      .set(scan,{y:-H*.12})
      .fromTo(scan,{y:-H*.12},{y:H*1.1,duration:1.7,ease:'sine.inOut'},'+=.1');
    const items=qa('.box');
    BOXES.forEach((b,i)=>{
      const t=.6+ (b.y/100)*1.7 +.2;
      tl.to(items[i],{opacity:1,scale:1,duration:.55,ease:'back.out(2)'},t);
      tl.to(qa('.det li')[i],{opacity:1,x:0,duration:.5,ease:'expo.out'},t+.1);
    });
    const total=BOXES.reduce((a,b)=>a+b.n,0);
    tl.add(()=>{countTo(q('[data-ar=n]'),total,{dur:1.2});countTo(q('[data-ar=p]'),98,{dur:1.4})},2.2);
    tl.to(q('.match'),{opacity:1,duration:.6},3.6);
    this._arTl=tl;
    await sleep(4600);
  },
  async closeAR(){
    if(!this.arOpen)return;this.arOpen=false;
    if(this._arTl)this._arTl.kill();
    await gsap.to(this.el.ar,{opacity:0,duration:.45,ease:'power2.in'}).then();
    this.el.ar.classList.remove('is-open');
    document.body.classList.replace('theme-night','theme-day');document.body.classList.remove('ar-open');
    this.ctx.director.updateHint();
  },

  /* ───── lifecycle ───── */
  async enter(prev){
    const {world,chrome}=this.ctx,root=this.root;
    this._build();
    world.setPaused(false);
    document.getElementById('gl').style.opacity=1;
    world.mood(1,2.2);world.drift(0,.6);world.rain(.35,1.5);world.setOpen(true);world.clearLocate();world.setHeat(false);world.scan(false);
    world.setFill('A-03',.2);world.setFill('C-01',.18);
    world.shot({pos:[22,15,24],target:[0,.4,.7],fov:27},{instant:true});
    world.shot('wide',{duration:2.8,ease:'power3.out'});world.uiShift(SHIFT,0);
    // the morning order has arrived: shelves refill to the current stock
    for(const [code,id] of Object.entries(BAY_PRODUCT)){const p=productById(id);world.setFill(code,ratioOf(p),2.4)}
    world.hoverCb=code=>this._hover(code);world.pickCb=code=>this._pick(code);world.interactive=true;
    this._onMove=e=>{this.el.tip.style.transform=`translate(${e.clientX+18}px,${e.clientY+18}px)`};addEventListener('pointermove',this._onMove);
    chrome.setClock('14:20',{dur:1.8,sub:'スタッフの問い合わせ'});
    gsap.from(root.querySelector('.panel'),{x:60,opacity:0,duration:1.1,ease:'expo.out',delay:.5});
    gsap.from(root.querySelectorAll('.hud-b > *'),{y:18,opacity:0,duration:.9,ease:'expo.out',stagger:.1,delay:.35});
    this.beat=0;
    await sleep(1400);
  },
  async leave(){
    const {world}=this.ctx;
    if(this.arOpen)await this.closeAR();
    removeEventListener('pointermove',this._onMove);
    world.hoverCb=null;world.pickCb=null;world.interactive=false;world.hover(null);
    world.clearLocate();world.setHeat(false);
    this._pinObjs.forEach(o=>world.removePin(o.pin));this._pinObjs=[];this.pinMap={};
    await gsap.to(this.root.children,{opacity:0,duration:.5,ease:'power2.in',stagger:0}).then();
    gsap.set(this.root.children,{clearProps:'opacity'});
  },
  reset(){if(this.run)this.run.kill();this.heatOn=false;this.arOpen=false},
  escape(){if(this.arOpen){this.closeAR();return true}return false},

  _hover(code){
    const {world}=this.ctx,tip=this.el.tip;
    const pid=code&&BAY_PRODUCT[code];
    world.hover(code);
    document.getElementById('gl').style.cursor=pid?'pointer':'default';
    if(!code){tip.classList.remove('is-on');return}
    const b=world.bays[code];
    tip.innerHTML=pid?`${b.label}<small>${productById(pid).name} · いま ${stockNow(productById(pid))}${productById(pid).unit} · クリックで質問</small>`:`${b.label}`;
    tip.classList.add('is-on');
  },
  _pick(code){
    const pid=BAY_PRODUCT[code];if(!pid||this.chat.busy)return;
    const p=productById(pid);this.ask(`${p.name}の在庫はいくつですか？`);
  },

  /* ───── beats ───── */
  _beats(){return [
    {label:'「傘の在庫は？」と聞く',run:()=>this.typeAsk('ビニール傘の在庫はいくつですか？')},
    {label:'温かいお茶の場所を聞く',run:()=>this.typeAsk('温かいお茶はどこにありますか？')},
    {label:'次の入荷を聞く',run:()=>this.typeAsk('次の入荷はいつですか？')},
    {label:'棚スキャン（AR）を見る',run:()=>this.openAR()},
    {label:'在庫ヒートマップを見る',run:()=>this.heat(true)},
  ]},
  primary(){
    if(this.arOpen){this.closeAR();return 'handled'}
    if(this.chat.busy){if(this.run)this.run.skip=true;return 'handled'}
    const b=this._beats()[this.beat];
    if(!b)return 'next';
    this.beat++;this.run=new Run();
    return Promise.resolve(b.run()).then(()=>'handled');
  },
  autoStep(){
    if(this.chat&&this.chat.busy)return 'wait';
    if(this.typing)return 'wait';
    return this.primary();
  },
  hint(){
    if(this.arOpen)return 'AR を閉じる';
    if(this.chat&&this.chat.busy)return '回答をスキップ';
    const b=this._beats()[this.beat];return b?b.label:'次のステップへ';
  },
  autoPause:2200,beatPause:2200,
};
