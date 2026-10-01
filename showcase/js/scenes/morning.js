/* 03 · 朝に判断する — the approval sheet: review, ask the assistant, adjust, 承認. */
import {h,sleep,Run,isDead,hhmm} from '../util.js';
import {I} from '../ui/icons.js';
import {streamText,countTo} from '../ui/type.js';
import {ChatView} from '../ui/chat.js';
import {renderCard} from '../ui/cards.js';
import {salesChart,stockBar,popBars} from '../ui/charts.js';
import {Turntable} from '../three/products3d.js';
import {products,productById,store,weather,revision,orderForProduct,reasonShort,reasonLong,nightRun} from '../mock/data.js';
import {parseManager,managerReply,qtyOf} from '../mock/llm.js';
import {state} from '../state.js';
const gsap=window.gsap;

const pad=n=>String(n).padStart(2,'0');
const maxQty=p=>Math.floor((p.cap-(p.expiresTonight?0:p.stock))/p.pack)*p.pack;
const signed=n=>n>0?`+${n}`:n<0?`−${Math.abs(n)}`:'±0';

const SEAL=`<svg viewBox="0 0 200 200" aria-hidden="true"><defs>
  <filter id="inkroughen" x="-10%" y="-10%" width="120%" height="120%"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="3" seed="7" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="4.2" xChannelSelector="R" yChannelSelector="G"/></filter>
  <filter id="inkspeck"><feTurbulence type="fractalNoise" baseFrequency="1.4" numOctaves="2" seed="2"/><feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -2.2 1.35"/><feComposite in2="SourceGraphic" operator="in"/></filter></defs>
  <g filter="url(#inkroughen)" fill="none" stroke="#0E1D40">
    <circle cx="100" cy="100" r="90" stroke-width="8"/><circle cx="100" cy="100" r="76" stroke-width="2.6"/>
    <g fill="#0E1D40" stroke="none" font-family="Hiragino Mincho ProN,Yu Mincho,serif" font-weight="800" text-anchor="middle">
      <text x="100" y="94" font-size="66">承</text><text x="100" y="158" font-size="66">認</text></g>
    <text x="100" y="36" text-anchor="middle" font-family="Bodoni 72,Bodoni Moda,serif" font-size="17" fill="#0E1D40" stroke="none" letter-spacing="3">${pad(store.tomorrow.m)}.${pad(store.tomorrow.d)}</text>
  </g></svg>`;

export const morning={
  id:'morning',title:'朝に判断する',theme:'day',clockSub:'管理者の確認',
  notes:[
    '朝、管理者が画面を開くと、補充候補とその理由がすでにまとまっています。',
    '数量を確認して、必要なら修正する。問題がなければ承認する。',
    '「3番、先週切れそうでした」とチャットで伝えると、販売履歴を再集計して数量を直し、コードがもう一度確認します。',
    'もし雨が降らなかったら？ スライダーを動かすと、全品目の数量が計算し直されます。',
    '最終判断は管理者です。承認すると、仕入先ごとの発注書にまとまります。',
  ],
  sel:null,beat:0,

  mount(root,ctx){this.ctx=ctx;this._build()},

  _build(){
    const root=this.root;
    if(this.tt){this.tt.dispose();this.tt=null}
    state.sim=null;
    root.innerHTML=`
    <div class="paper-bg"></div>
    <div class="sheet" id="sheet">
      <header class="sh-head">
        <div><h2>明日の発注提案</h2><div class="meta"><span>${store.tomorrow.label}</span><span>${weather.cond} ${Math.round(weather.pop*100)}%</span><span>${store.name}</span></div></div>
        <div class="counts">
          <div class="cnt"><b data-c="total">${products.length}</b><span>提案</span></div>
          <div class="cnt"><b data-c="rev">0</b><span>確認済</span></div>
          <div class="cnt"><b data-c="edit">0</b><span>修正</span></div>
        </div>
        <div class="stamp-state"><span>承認済</span><b data-c="at">07:42</b></div>
      </header>
      <div class="sh-body">
        <aside class="list" aria-label="提案の一覧">
          <div class="lh"><span>#</span><span></span><span>品目と理由</span><span>数量</span><span>通常比</span></div>
          <ol class="rows">${products.map(p=>this._row(p)).join('')}</ol>
        </aside>
        <section class="detail" aria-live="polite">
          <div class="d-top">
            <div class="tt"><canvas></canvas><span class="lab">3D</span></div>
            <div class="di"><div class="eb"><b data-d="no">01</b><span>/ ${products.length}</span><span data-d="cat"></span></div>
              <h3 data-d="nm"></h3>
              <div class="loc"><span><span class="ic">${I.pin}</span><b data-d="loc"></b></span><span><span class="ic">${I.truck}</span><b data-d="del"></b></span></div>
              <div class="stats">
                <div class="stat"><div class="l">現在庫</div><div class="v" data-d="stock"></div></div>
                <div class="stat"><div class="l">通常の発注</div><div class="v" data-d="usual"></div></div>
                <div class="stat is-main"><div class="l">提案</div><div class="v" data-d="qty"></div></div>
                <div class="stat"><div class="l">通常比</div><div class="v" data-d="delta"></div></div>
              </div></div>
          </div>
          <div class="d-bot">
            <section><h4>理由 <span class="tag is-concept">LLM</span></h4><div class="why-box" data-d="why"></div>
              <h4 style="margin-top:1rem">コードの確認 <span class="tag">コード</span></h4><div class="checks" data-d="checks"></div></section>
            <section class="ev">
              <div class="blk"><h4>過去14日の販売</h4><div data-d="sales"></div></div>
              <div class="blk"><h4>在庫と棚の上限</h4><div data-d="stockbar"></div></div>
              <div class="blk sim" data-sim><div class="sh"><span class="lab">もし降水確率が</span><span class="pct"><span data-sim-pct>${Math.round(weather.pop*100)}</span><small>%</small></span></div>
                <input type="range" min="0" max="100" step="5" value="${Math.round(weather.pop*100)}" aria-label="降水確率で再計算">
                <div class="res" data-sim-res></div><button class="rst" data-act="rst">予報どおり（${Math.round(weather.pop*100)}%）に戻す</button></div>
            </section>
          </div>
        </section>
        <aside class="drawer" aria-label="アシスタント"><div class="dh"><h3><span class="ic">${I.spark}</span>アシスタントに相談</h3><button class="x" aria-label="閉じる" data-act="close">${I.x}</button></div><div class="chat-host"></div></aside>
      </div>
      <footer class="sh-foot">
        <div class="ask-wrap"><div class="ask-bar"><span class="spark"><span class="ic">${I.spark}</span></span><input type="text" placeholder="この提案について質問する…" aria-label="質問"><button class="ib" aria-label="音声" title="音声入力（コンセプト）">${I.mic}</button><button class="ib go" aria-label="送信">${I.send}</button></div>
          <div class="chips sg"><button class="chip" data-q="${revision.question}">3番の数量を見直して</button><button class="chip" data-q="傘の理由を教えて">傘の理由は？</button><button class="chip" data-q="もし雨が降らなかったら？">雨が降らなかったら？</button></div></div>
        <button class="btn is-fill approve" data-act="approve">すべて承認する</button>
        <div class="sent"></div>
      </footer>
      <div class="seal-layer"><div class="seal-ring"></div>${SEAL}</div>
    </div>`;
    this.el={
      sheet:root.querySelector('.sheet'),rows:root.querySelector('.rows'),drawer:root.querySelector('.drawer'),
      input:root.querySelector('.ask-bar input'),sg:root.querySelector('.sg'),paper:root.querySelector('.paper-bg'),
      sim:root.querySelector('[data-sim]'),range:root.querySelector('[data-sim] input'),
      d:k=>root.querySelector(`[data-d=${k}]`),c:k=>root.querySelector(`[data-c=${k}]`),
    };
    this.chat=new ChatView(root.querySelector('.chat-host'),{renderCard:ev=>this.card(ev),onAction:ev=>this.action(ev)});
    this._bind();
    this.sel=null;this.beat=0;this._seen=new Set();this.busy=false;
    products.forEach(p=>this.updateRow(p,{quiet:true}));
    this.updateCounts();
  },

  _row(p){
    return `<li class="row" data-id="${p.id}" tabindex="0" role="button" aria-label="${p.name}を開く">
      <i class="rv"></i><span class="no">${pad(p.no)}</span>
      <span class="ph"><img src="${p.portrait}" alt=""></span>
      <span class="tx"><span class="top"><b class="nm">${p.name}</b><span class="flag"></span></span><span class="why">${reasonShort(p)}</span></span>
      <span class="qty"><button class="st" data-d="-1" aria-label="減らす"><span class="ic">${I.minus}</span></button><span class="q"><b></b><small>${p.unit}</small></span><button class="st" data-d="1" aria-label="増やす"><span class="ic">${I.plus}</span></button></span>
      <span class="dl"><b></b><small>通常比</small></span></li>`;
  },

  _bind(){
    const root=this.root,{el}=this;
    root.querySelectorAll('.row').forEach(r=>{
      const p=productById(r.dataset.id);
      r.addEventListener('click',e=>{if(e.target.closest('.st'))return;this.select(p.id)});
      r.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.target.closest('.st')){e.stopPropagation();this.select(p.id)}});
      r.querySelectorAll('.st').forEach(b=>{
        const d=+b.dataset.d;let t1,t2;
        const stop=()=>{clearTimeout(t1);clearInterval(t2)};
        b.addEventListener('pointerdown',e=>{
          if(state.approved)return;e.preventDefault();
          this.step(p,d);t1=setTimeout(()=>{t2=setInterval(()=>this.step(p,d),85)},380);
        });
        ['pointerup','pointerleave','pointercancel'].forEach(ev=>b.addEventListener(ev,stop));
        b.addEventListener('click',e=>{if(e.detail===0)this.step(p,d)});   // keyboard
      });
    });
    root.querySelector('[data-act=approve]').addEventListener('click',()=>this.approve());
    root.querySelector('[data-act=close]').addEventListener('click',()=>this.drawer(false));
    root.querySelector('[data-act=rst]').addEventListener('click',()=>this.setSim(null,{animate:true}));
    el.range.addEventListener('input',()=>this.setSim(+el.range.value/100));
    const send=()=>{const v=el.input.value.trim();if(!v)return;el.input.value='';this.toggleChips(true);this.ask(v)};
    root.querySelector('.ib.go').addEventListener('click',send);
    el.input.addEventListener('keydown',e=>{if(e.key==='Enter'){e.stopPropagation();send()}e.stopPropagation()});
    el.input.addEventListener('input',()=>this.toggleChips(!el.input.value));
    root.querySelectorAll('.sg .chip').forEach(c=>c.addEventListener('click',()=>this.ask(c.dataset.q)));
    root.querySelector('.ib[aria-label=音声]').addEventListener('click',()=>this.ctx.chrome.toast('音声入力はコンセプトです（デモでは無効）'));
  },
  toggleChips(on){this.el.sg.classList.toggle('is-hidden',!on)},

  /* ───── rows ───── */
  rowEl(p){return this.root.querySelector(`.row[data-id=${p.id}]`)},
  updateRow(p,{quiet=false,flash=false}={}){
    const r=this.rowEl(p),q=qtyOf(p),dl=q-p.usual;
    const b=r.querySelector('.q b'),prev=b.textContent;
    b.textContent=q;if(!quiet&&prev!==String(q)&&prev!==''){b.classList.remove('is-bump');void b.offsetWidth;b.classList.add('is-bump')}
    const d=r.querySelector('.dl b');d.textContent=signed(dl);
    r.classList.toggle('up',dl>0);r.classList.toggle('down',dl<0);r.classList.toggle('hold',dl===0);
    const edited=state.edits.has(p.id);
    r.querySelector('.flag').innerHTML=`${p.fix&&!edited?`<i class="fx">コード修正</i>`:''}${edited?`<i class="ed">${state.edits.get(p.id)===p.proposed?'':'修正済み'}</i>`:''}`;
    r.querySelector('.st[data-d="-1"]').disabled=q<=0;r.querySelector('.st[data-d="1"]').disabled=q>=maxQty(p);
    r.classList.toggle('is-rev',state.reviewed.has(p.id));
    if(flash){r.classList.remove('is-flash');void r.offsetWidth;r.classList.add('is-flash')}
    if(this.sel&&this.sel.id===p.id)this.renderDetailNumbers(p);
  },
  updateCounts(){
    const c=k=>this.el.c(k);
    c('rev').textContent=state.reviewed.size;
    c('edit').textContent=[...state.edits].filter(([id,q])=>q!==productById(id).proposed).length;
  },
  step(p,d){
    if(state.approved)return;
    const cur=qtyOf(p),next=cur+d*p.pack;
    if(next<0)return;
    if(next>maxQty(p)){this.shake(this.rowEl(p));this.ctx.chrome.toast(`${p.short}は棚の上限（${p.cap}${p.unit}）までです`);return}
    this.setQty(p,next);
  },
  setQty(p,q,{byChat=false}={}){
    if(q===p.proposed&&!state.sim)state.edits.delete(p.id);else state.edits.set(p.id,q);
    if(byChat&&p.id==='milk')state.revisedByChat=true;
    state.reviewed.add(p.id);
    this.updateRow(p,{flash:byChat});this.updateCounts();
  },
  shake(el){gsap.fromTo(el,{x:-6},{x:0,duration:.5,ease:'elastic.out(1.2,.3)'})},

  /* ───── selection + detail ───── */
  async select(id,{auto=false}={}){
    const p=productById(id);if(!p)return;
    if(this.sel&&this.sel.id===id)return;
    this.sel=p;
    this.root.querySelectorAll('.row').forEach(r=>r.classList.toggle('is-sel',r.dataset.id===id));
    const rowEl=this.rowEl(p);
    const list=this.el.rows;
    list.scrollTo({top:Math.max(0,rowEl.offsetTop-list.clientHeight/2+rowEl.offsetHeight/2),behavior:'smooth'});
    state.reviewed.add(id);this.updateRow(p,{quiet:true});this.updateCounts();
    this.renderDetail(p);
  },
  renderDetailNumbers(p){
    const q=qtyOf(p),dl=q-p.usual;
    const el=this.el;
    el.d('stock').innerHTML=`${p.expiresTonight?`${p.stock}<small>${p.unit}・期限今夜</small>`:`${p.stock}<small>${p.unit}</small>`}`;
    el.d('usual').innerHTML=`${p.usual}<small>${p.unit}</small>`;
    el.d('qty').innerHTML=`${q}<small>${p.unit}</small>`;
    const dv=el.d('delta');dv.className='v '+(dl>0?'up':dl<0?'down':'');dv.innerHTML=`${signed(dl)}<small>${p.unit}</small>`;
    el.d('stockbar').innerHTML=stockBar(p,q);
    this.updateSimRes();
  },
  renderDetail(p){
    const el=this.el;
    el.d('no').textContent=pad(p.no);el.d('cat').textContent=p.cat;el.d('nm').textContent=p.name;
    el.d('loc').textContent=`${p.shelf.code} ${p.shelf.zone}・${p.shelf.label}`;
    el.d('del').textContent=`納品 ${p.delivery}・${p.supplier}`;
    el.d('sales').innerHTML=salesChart(p);
    this.renderDetailNumbers(p);
    // turntable
    if(this.tt){this.tt.set(p.model);this.tt.spin=-.5}
    gsap.fromTo(this.root.querySelector('.tt canvas'),{opacity:0,scale:.92},{opacity:1,scale:1,duration:.7,ease:'expo.out'});
    gsap.fromTo(this.el.d('nm'),{y:14,opacity:0},{y:0,opacity:1,duration:.7,ease:'expo.out'});
    gsap.fromTo(this.root.querySelectorAll('.stat .v'),{y:10,opacity:0},{y:0,opacity:1,duration:.6,ease:'expo.out',stagger:.05});
    gsap.from(this.el.d('sales').querySelectorAll('.bar rect'),{scaleY:0,transformOrigin:'50% 100%',duration:.7,ease:'power3.out',stagger:.025});
    // reasons: stream the first time, instant afterwards
    if(this._wc)this._wc.cancel();
    const why=el.d('why');why.innerHTML='';
    const lines=reasonLong(p).slice();
    if(p.fix==='cap')lines.push(`LLMの下書きは${p.draft}${p.unit}。棚の上限（${p.cap}${p.unit}）を超えるため、コードが${p.proposed}${p.unit}に修正しました。`);
    if(p.fix==='sku')lines.push(`LLMが書いた商品コードがカタログにありませんでした。コードが差し戻し、「${nightRun.retry.right}」に直しました。`);
    const first=!this._seen.has(p.id);this._seen.add(p.id);
    const checks=el.d('checks');checks.innerHTML=p.checks.map(c=>`<div class="chkc" data-k="${c.id}"><span class="dot">${I.check}</span><span>${c.label}<small>${c.state==='fixed'?'修正して通過':c.detail}</small></span></div>`).join('');
    const tick=()=>{checks.querySelectorAll('.chkc').forEach((n,i)=>{const c=p.checks[i];setTimeout(()=>n.classList.add(c.state==='fixed'?'is-fixed':'is-ok'),first?250+i*170:0)})};
    const token={cancel(){this.dead=true}};this._wc=token;
    const run=async()=>{
      for(let i=0;i<lines.length;i++){
        const fixLine=i===3;
        const pEl=h(`<p class="${fixLine?'fix':''}"></p>`);why.append(pEl);
        if(first){await streamText(pEl,lines[i],{cps:70,run:{get dead(){return token.dead}},caret:true});if(token.dead)return}
        else pEl.textContent=lines[i];
      }
    };
    tick();run();
  },
  updateSimRes(){
    const p=this.sel;if(!p)return;
    const sim=state.sim;const res=this.root.querySelector('[data-sim-res]');
    const changed=products.filter(x=>qtyOf(x)!==x.proposed&&!state.edits.has(x.id)).length;
    res.innerHTML=sim?`${p.short}の提案は <b>${qtyOf(p)}</b>${p.unit}。全体で${changed}品目が変わります。`:`予報どおり。${p.short}の提案は <b>${qtyOf(p)}</b>${p.unit}。`;
  },
  setSim(pop,{animate=false}={}){
    const base=weather.pop;
    const target=pop==null?base:pop;
    const apply=v=>{
      const sim=Math.abs(v-base)<.001?null:{pop:v};
      state.sim=sim;
      const pct=Math.round(v*100);
      this.root.querySelector('[data-sim-pct]').textContent=pct;
      this.el.range.value=pct;this.el.range.style.setProperty('--p',pct+'%');
      this.el.sim.classList.toggle('is-changed',!!sim);
      products.forEach(x=>{const before=this.rowEl(x).querySelector('.q b').textContent;this.updateRow(x,{quiet:false});});
      this.updateCounts();this.updateSimRes();
    };
    if(animate){
      const cur=state.sim?state.sim.pop:base;const o={v:cur};
      return new Promise(res=>gsap.to(o,{v:target,duration:1.1,ease:'power2.inOut',onUpdate:()=>apply(Math.round(o.v*20)/20),onComplete:()=>{apply(target);res()}}));
    }
    apply(target);return Promise.resolve();
  },

  /* ───── chat ───── */
  drawer(open){this.el.drawer.classList.toggle('is-open',open)},
  async ask(text,{run}={}){
    if(this.chat.busy||state.approved)return;
    this.drawer(true);
    if(!this.chat.msgs.children.length)this.chat.clear();
    this.run=run||new Run();
    this.chat.addUser(text);
    const intent=parseManager(text,{selected:this.sel});
    if(intent.p&&(intent.type==='revise'||intent.type==='explain'))await this.select(intent.p.id);
    this.busyAsk=true;this.ctx.director.updateHint();
    try{await this.chat.reply(managerReply(intent,{}),{run:this.run})}finally{this.busyAsk=false;this.ctx.director.updateHint()}
  },
  async action(ev){
    const {name,payload}=ev;
    if(name==='setQty'){const p=productById(payload.id);this.setQty(p,payload.qty,{byChat:payload.byChat});await sleep(500)}
    else if(name==='select'){await this.select(payload.id)}
    else if(name==='sim'){await sleep(500);this.drawer(false);await sleep(650);await this.setSim(payload.pop,{animate:true})}
    else if(name==='approve'){await sleep(400);this.drawer(false);await sleep(500);await this.approve()}
  },
  card(ev){return renderCard(ev)},
  async typeAsk(text){
    this.typing=true;
    const inp=this.el.input;this.toggleChips(false);inp.focus({preventScroll:true});inp.value='';
    for(const ch of text){inp.value+=ch;await sleep(this.run&&this.run.skip?0:34)}
    await sleep(350);inp.value='';inp.blur();this.toggleChips(true);
    this.typing=false;
    await this.ask(text,{run:this.run});
  },

  /* ───── approve + seal ───── */
  async approve(){
    if(state.approved)return;
    state.approved=true;state.approvedAt=Date.now();
    this.ctx.director.updateHint();
    if(state.sim)await this.setSim(null,{animate:true});
    this.drawer(false);
    const layer=this.root.querySelector('.seal-layer'),ring=layer.querySelector('.seal-ring'),sheet=this.el.sheet;
    const sfx=this.ctx.sfx;
    gsap.set(layer,{opacity:0,scale:2.7,rotation:-20,y:-70,transformOrigin:'50% 50%'});
    await new Promise(res=>{
      const tl=gsap.timeline({onComplete:res});
      tl.to(layer,{opacity:1,scale:1,rotation:-9,y:0,duration:.36,ease:'power4.in'})
        .add(()=>{
          sfx&&sfx.thump();
          gsap.fromTo(sheet,{y:0},{y:5,duration:.07,yoyo:true,repeat:1,ease:'power1.out'});
          gsap.fromTo(ring,{opacity:.6,scale:.86},{opacity:0,scale:1.55,duration:.8,ease:'expo.out'});
          gsap.fromTo(layer.querySelector('svg'),{scale:1.04},{scale:1,duration:.5,ease:'elastic.out(1,.4)'});
        })
        .to({},{duration:.5});
    });
    sheet.classList.add('is-approved');
    this.ctx.chrome.setClock('07:42',{dur:.8,sub:'承認済み'});
    const sup={};products.forEach(p=>{const q=qtyOf(p);if(q>0)(sup[p.supplier]||(sup[p.supplier]=[])).push(p)});
    const sent=this.root.querySelector('.sent');
    sent.innerHTML=`<span class="lab">発注書を送信</span>`+Object.entries(sup).map(([s,ps])=>`<span class="env"><span class="ic">${I.check}</span>${s}<small>${ps.length}品目</small></span>`).join('');
    gsap.from(sent.children,{opacity:0,y:14,duration:.6,ease:'expo.out',stagger:.12});
    this.ctx.director.updateHint();
  },

  /* ───── lifecycle ───── */
  async enter(prev){
    const {world,chrome}=this.ctx,root=this.root;
    this._build();
    state.approved=false;state.morningStart=Date.now();
    gsap.set(this.el.sheet,{opacity:0,y:30});
    gsap.set(this.el.paper,{y:'100%'});
    world.mood(.55,2);                       // dawn behind the wipe
    chrome.setClock('07:30',{dur:1.6,sub:'朝'});
    await gsap.to(this.el.paper,{y:'0%',duration:1.35,ease:'power3.inOut'}).then();
    document.getElementById('gl').style.opacity=0;world.setPaused(true);
    gsap.to(this.el.sheet,{opacity:1,y:0,duration:1,ease:'expo.out'});
    gsap.from(root.querySelectorAll('.row'),{opacity:0,x:-24,duration:.8,ease:'expo.out',stagger:.045,delay:.15});
    // turntable
    this.tt=new Turntable(root.querySelector('.tt canvas'));this.tt.resize();this.tt.start();
    this._onResize=()=>this.tt&&this.tt.resize();addEventListener('resize',this._onResize);
    await sleep(700);
    await this.select('umbrella',{auto:true});
    this.ctx.chrome.setClock('07:30',{instant:true,sub:'管理者の確認'});
    this.beat=0;this.ctx.director.updateHint();
  },
  async leave(){
    if(this.run)this.run.kill();
    removeEventListener('resize',this._onResize);
    if(this.tt){this.tt.stop()}
    await gsap.to(this.el.sheet,{opacity:0,y:-20,duration:.6,ease:'power2.in'}).then();
  },
  reset(){if(this.run)this.run.kill();state.sim=null},

  /* ───── beats (Enter walks the scripted path) ───── */
  _beats(){return [
    {label:'弁当の提案を見る',run:()=>this.select('bento')},
    {label:'牛乳の数量を相談する',run:()=>this.typeAsk(revision.question)},
    {label:'「雨が降らなかったら？」を試す',run:()=>this.typeAsk('もし雨が降らなかったら？')},
    {label:'すべて承認する',run:()=>this.approve()},
  ]},
  primary(){
    if(state.approved)return 'next';
    if(this.chat&&this.chat.busy){if(this.run)this.run.skip=true;return 'handled'}
    const b=this._beats()[this.beat];
    if(!b)return this.approve().then(()=>'handled');
    this.beat++;
    this.run=new Run();
    return Promise.resolve(b.run()).then(()=>'handled');
  },
  autoStep(){
    if(this.chat&&this.chat.busy)return 'wait';
    if(this.typing)return 'wait';
    return this.primary();
  },
  hint(){
    if(state.approved)return '日中の確認へ';
    if(this.chat&&this.chat.busy)return '回答をスキップ';
    const b=this._beats()[this.beat];return b?b.label:'すべて承認する';
  },
  autoPause:2200,beatPause:2600,
};
