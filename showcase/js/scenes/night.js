/* 02 · 夜に準備する — the overnight run: データ → LLMが下書き → コードで確認 → 管理者が承認.
   Everything here is scripted playback of mock data (see mock/data.js). */
import {h,sleep,Run,isDead} from '../util.js';
import {I} from '../ui/icons.js';
import {streamText} from '../ui/type.js';
import {products,nightRun,weather,productById,proposalStats,revision} from '../mock/data.js';
const gsap=window.gsap;

const HERO=['umbrella','bento','milk','coffee'];
const dirWord={up:'増やす',down:'減らす',hold:'据え置き'};
const dirArrow={up:'↑',down:'↓',hold:'→'};

export const night={
  id:'night',title:'夜に準備する',theme:'night',clockSub:'夜間バッチ',
  notes:[
    'ここが、さきほどのスライドの流れです。既存データ → LLMが下書き → コードで確認 → 管理者が承認。',
    '夜のうちに在庫・販売履歴・天気・仕入先のデータを集め、LLMが理由つきで補充案を下書きします。',
    '傘は、LLMが36本と書きました。棚の上限は30本。コードが24本に直しました。',
    '牛乳は、LLMが存在しない商品コードを書きました。コードが差し戻し、LLMが直しました。',
    'LLMだけに任せず、コードで確認してから管理者に届けます。',
  ],
  phase:'idle',

  mount(root,ctx){this.ctx=ctx;this._build()},

  _build(){
    const root=this.root,ctx=this.ctx;
    // drop pins from a previous build
    (this._pins||[]).forEach(p=>ctx.world.removePin(p));this._pins=[];
    root.innerHTML=`
    <div class="hud">
      <div class="head">
        <div><h2>夜のうちに、補充案を下書きする。</h2>
        <p>在庫・販売・天気・仕入先をまとめて、LLMが理由つきで下書きします。コードが確認してから、朝の管理者に届きます。</p></div>
        <button class="btn is-fill go" data-act="go">朝へ <kbd>⏎</kbd></button>
      </div>
      <section class="pipe" aria-label="夜間バッチの流れ">
        <div class="node" data-n="data"><div class="ico"><span class="ic">${I.db}</span><span class="badge">${I.check}</span></div><div class="nm">既存データ</div><div class="when">22:04</div>
          <ul class="srcs">${nightRun.sources.map((s,i)=>`<li class="src" data-s="${s.id}"><i class="d"></i><span>${s.label}</span><span class="st">${s.stat}</span></li>`).join('')}</ul></div>
        <div class="link" data-l="0"><i class="on"></i><i class="dot"></i></div>
        <div class="node is-dashed" data-n="llm"><div class="ico"><span class="ic">${I.bubble}</span><span class="badge">${I.check}</span></div><div class="nm">LLMが下書き</div><div class="when">02:30</div></div>
        <div class="link" data-l="1"><i class="on"></i><i class="dot"></i></div>
        <div class="node" data-n="code"><div class="ico"><span class="ic">${I.checks}</span><span class="badge">${I.check}</span></div><div class="nm">コードで確認</div><div class="when">03:20</div></div>
        <div class="link" data-l="2"><i class="on"></i><i class="dot"></i></div>
        <div class="node" data-n="human"><div class="ico"><span class="ic">${I.person}</span><span class="badge">${I.check}</span></div><div class="nm">管理者が承認</div><div class="when">朝 07:30</div></div>
        <svg class="retry" viewBox="0 0 1000 60" preserveAspectRatio="none"><path d="M680 58 C 680 -14, 438 -14, 438 58"/><path class="tip" d="M438 58 l-7 -11 l14 0 z" /></svg>
        <div class="retry-lab">SKU不整合 → LLMへ差し戻し</div>
      </section>
      <div class="panels">
        <section class="panel is-dashed" data-p="llm"><div class="ph"><h3><span class="ic">${I.bubble}</span>LLMの下書き</h3><span class="meter" data-m="tok">0 tokens</span></div>
          <div class="stream"><div class="inner"></div></div></section>
        <section class="panel" data-p="code"><div class="ph"><h3><span class="ic">${I.checks}</span>コードの確認</h3><span class="meter" data-m="chk">0 / ${products.length}</span></div>
          <div class="chk-head"><span class="th"></span><span class="th">商品</span><span class="th">SKU</span><span class="th">単位</span><span class="th">上限</span><span class="th">期限</span></div>
          <div class="chk-wrap"><div class="chk">
            ${products.map(p=>`<span class="c no">${String(p.no).padStart(2,'0')}</span><span class="c nm" data-r="${p.id}">${p.short}</span>${['sku','unit','cap','life'].map(k=>`<span class="c" data-r="${p.id}"><i class="dot" data-c="${k}"><span class="ic">${I.check}</span></i></span>`).join('')}`).join('')}
          </div></div>
          <div class="chk-note" data-note></div></section>
      </div>
    </div>
    <div class="pins"></div>`;
    this.el={
      h2:root.querySelector('h2'),sub:root.querySelector('.head p'),go:root.querySelector('.go'),
      inner:root.querySelector('.stream .inner'),tok:root.querySelector('[data-m=tok]'),chk:root.querySelector('[data-m=chk]'),
      note:root.querySelector('[data-note]'),retry:root.querySelector('.retry'),retryLab:root.querySelector('.retry-lab'),pins:root.querySelector('.pins'),
    };
    root.querySelector('[data-act=go]').addEventListener('click',()=>this.ctx.director.next());
    this.tokens=0;this.phase='idle';this.checked=0;
  },

  /* ───── lifecycle ───── */
  async enter(prev){
    const {world,chrome}=this.ctx;
    world.setPaused(false);document.getElementById('gl').style.opacity=1;
    world.mood(0,prev?1.2:0);world.rain(1,1);world.setOpen(false);world.clearLocate();world.setHeat(false);
    world.shot('night',{duration:2.6});world.uiShift(.315,2.2);world.drift(.09);
    chrome.setClock('22:00',{instant:true,sub:'夜間バッチ'});
    this._build();
    gsap.fromTo(this.root.querySelector('.hud'),{opacity:0,y:18},{opacity:1,y:0,duration:1.1,ease:'expo.out'});
    gsap.fromTo(this.root.querySelectorAll('.node'),{opacity:0,y:20},{opacity:1,y:0,duration:.9,ease:'expo.out',stagger:.12,delay:.25});
    gsap.fromTo(this.root.querySelectorAll('.panel'),{opacity:0,y:26},{opacity:1,y:0,duration:1,ease:'expo.out',stagger:.14,delay:.6});
    await sleep(900);
    this._autostart=setTimeout(()=>{if(this.phase==='idle')this._run()},800);
  },
  async leave(){
    clearTimeout(this._autostart);
    if(this.run)this.run.kill();
    this.ctx.world.scan(false);
    await gsap.to(this.root.querySelector('.hud'),{opacity:0,y:-12,duration:.6,ease:'power2.in'}).then();
    this.root.querySelector('.pins').style.opacity=0;
  },
  reset(){clearTimeout(this._autostart);if(this.run)this.run.kill();this.phase='idle'},

  primary(){
    if(this.phase==='idle'){clearTimeout(this._autostart);this._run();return 'handled'}
    if(this.phase==='running'){this.run.skip=true;return 'handled'}
    return 'next';
  },
  autoStep(){
    if(this.phase==='idle'){clearTimeout(this._autostart);this._run();return 'wait'}
    if(this.phase==='running')return 'wait';
    return 'next';
  },
  hint(){return this.phase==='running'?'結果までスキップ':this.phase==='done'?'朝の承認へ':''},
  autoPause:1500,beatPause:2500,

  /* ───── helpers ───── */
  setNode(id,state){
    const n=this.root.querySelector(`.node[data-n=${id}]`);if(!n)return;
    n.classList.toggle('is-active',state==='active');
    n.classList.toggle('is-done',state==='done');
  },
  async flow(i,{dur=.9}={}){
    const l=this.root.querySelector(`.link[data-l="${i}"]`),on=l.querySelector('.on'),dot=l.querySelector('.dot');
    const w=l.clientWidth;
    gsap.set(dot,{x:0,opacity:1});
    gsap.to(dot,{x:w,duration:dur,ease:'power2.inOut',onComplete:()=>gsap.set(dot,{opacity:0})});
    gsap.fromTo(on,{width:0},{width:'100%',duration:dur,ease:'power2.inOut'});
    await this.run.wait(dur*1000*.85);
  },
  src(id,state){
    const s=this.root.querySelector(`.src[data-s=${id}]`);if(!s)return;
    s.classList.toggle('is-run',state==='run');s.classList.toggle('is-ok',state==='ok');
  },
  pin(code,html,cls='',stemRem){
    const el=h(`<div class="pin mini ${cls}" data-code="${code}"${stemRem?` style="--stem:${stemRem}rem"`:''}><i class="stem"></i><i class="dot"></i><div class="card"><span class="v">${html}</span></div></div>`);
    this.el.pins.append(el);
    const pin=this.ctx.world.addPin(code,el,{x:0,y:.1,z:0});this._pins.push(pin);
    if(code!=='SKY')this.ctx.world.ping(code,1500);
    const stem=el.querySelector('.stem'),dot=el.querySelector('.dot'),card=el.querySelector('.card');
    gsap.fromTo(dot,{scale:0},{scale:1,duration:.4,ease:'back.out(3)'});
    gsap.fromTo(stem,{scaleY:0},{scaleY:1,duration:.5,ease:'power3.out'});
    gsap.fromTo(card,{opacity:0,y:10,scale:.92},{opacity:1,y:0,scale:1,duration:.5,ease:'expo.out',delay:.2});
    return el;
  },
  updatePin(el,html,cls){el.querySelector('.v').innerHTML=html;if(cls)el.classList.add(cls);gsap.fromTo(el.querySelector('.card'),{scale:1.12},{scale:1,duration:.6,ease:'elastic.out(1,.55)'})},
  block(p,{name,meta}={}){
    const b=h(`<div class="blk"><div class="bh"><img src="${p.portrait}" alt=""><span>${name||p.name}</span><span class="meta">${meta||`在庫 ${p.stock}${p.unit}`}</span></div></div>`);
    this.el.inner.append(b);gsap.from(b,{opacity:0,y:12,duration:.45,ease:'power2.out'});return b;
  },
  async say(blk,text,cls=''){
    const ln=h(`<div class="ln ${cls}"></div>`);blk.append(ln);
    await streamText(ln,text,{cps:52,run:this.run,onTick:()=>{this.tokens+=1;this.el.tok.textContent=`${Math.round(this.tokens*1.6).toLocaleString('ja-JP')} tokens`}});
    await this.run.wait(180);
    return ln;
  },
  async tickCell(pid,kind,state){
    const d=this.root.querySelector(`.c[data-r=${pid}] .dot[data-c=${kind}]`);if(!d)return;
    d.className='dot '+state;
    if(state==='fix')d.querySelector('.ic').innerHTML=I.arrowDn; // overwritten per case
  },
  note(html,bad=false){
    const n=this.el.note;n.innerHTML=html;n.classList.toggle('bad',!!bad);n.classList.add('is-on');
  },
  setHead(title,sub){
    gsap.to([this.el.h2,this.el.sub],{opacity:0,y:-8,duration:.3,onComplete:()=>{this.el.h2.textContent=title;this.el.sub.textContent=sub;gsap.to([this.el.h2,this.el.sub],{opacity:1,y:0,duration:.6,ease:'expo.out'})}});
  },

  /* ───── the run ───── */
  async _run(){
    if(this.phase!=='idle')return;
    const run=this.run=new Run();this.phase='running';this.ctx.director.updateHint();
    const {world,chrome}=this.ctx;
    const clock=(t,d=.9)=>run.skip?chrome.setClock(t,{instant:true}):chrome.setClock(t,{dur:d});
    try{
      /* 1 — データ */
      this.setNode('data','active');world.scan(true);
      clock('22:04',.9);await run.wait(700);
      this.src('inv','run');await run.wait(650);this.src('inv','ok');
      this.src('sales','run');await run.wait(550);this.src('sales','ok');
      clock('23:30',.9);this.src('wx','run');await run.wait(700);this.src('wx','ok');
      this.pin('SKY',`雨 <b>${Math.round(weather.pop*100)}</b>%`,'',3.4);
      clock('01:10',.9);this.src('sup','run');await run.wait(700);this.src('sup','ok');
      this.setNode('data','done');
      await this.flow(0);

      /* 2 — LLMが下書き */
      this.setNode('llm','active');clock('02:30',.9);
      const pins={};
      const U=productById('umbrella'),B=productById('bento'),M=productById('milk'),C=productById('coffee');

      // 傘
      let blk=this.block(U);
      await this.say(blk,`過去14日のうち雨の日は5日。傘は雨の日に1日平均${Math.round(U.rainAvg*10)/10}本、晴れの日は${Math.round(U.dryAvg*10)/10}本でした。`);
      await this.say(blk,`明日80%・明後日60%の雨予報から、2日分の需要を約${Math.round(U.order.demand)}本と見込みます。`);
      await this.say(blk,`雨が続く場合に備えて、余裕を持たせた数量を提案します。→ ${U.draft}本`,'res');
      pins.umbrella=this.pin('A-03',`傘 <b>${U.draft}</b>本`,'',2.2);

      // 弁当
      blk=this.block(B,{meta:`在庫 ${B.stock}個 · 期限 今夜`});
      await this.say(blk,`雨の日の販売は平均${Math.round(B.rainAvg)}個。晴れの日は${Math.round(B.dryAvg)}個で、販売が約${Math.round((1-B.rainAvg/B.dryAvg)*100)}%減ります。`);
      await this.say(blk,`今ある${B.stock}個は今夜で期限切れ。明日の販売には使えません。`);
      await this.say(blk,`通常${B.usual}個のところ、少なめに。→ ${B.draft}個`,'res');
      pins.bento=this.pin('C-01',`弁当 <b>${B.draft}</b>個`,'',5.6);

      // 牛乳 (the model writes a SKU that doesn't exist)
      blk=this.block(M,{name:nightRun.retry.wrong,meta:'在庫 0.5ケース'});
      this.milkBlk=blk;
      await this.say(blk,`毎日60本前後が動きます。配送は2日おきです。`);
      await this.say(blk,`在庫は残り半ケース。→ ${M.draft}ケース`,'res');
      pins.milk=this.pin('C-02',`牛乳 <b>${M.draft}</b>ケース`,'',2.4);

      // コーヒー
      blk=this.block(C);
      await this.say(blk,`最低気温は${weather.lo}℃。気温が低い日は販売が約${Math.round((C.cold-1)*100)}%増えています。`);
      await this.say(blk,`通常${C.usual}本のところ、増やします。→ ${C.draft}本`,'res');
      pins.coffee=this.pin('D-01',`缶コーヒー <b>${C.draft}</b>本`,'',5.2);

      // the rest, quickly
      const rest=products.filter(p=>!HERO.includes(p.id));
      blk=h(`<div class="blk"><div class="bh"><span>ほか${rest.length}品目</span><span class="meta">同じ手順で下書き</span></div><div class="tick"></div></div>`);
      this.el.inner.append(blk);gsap.from(blk,{opacity:0,y:12,duration:.4});
      const tick=blk.querySelector('.tick');
      for(const p of rest){
        const c=h(`<span class="chip ${p.dir}">${p.short}<b>${p.draft}</b><i>${dirArrow[p.dir]}${p.delta?Math.abs(p.delta):''}</i></span>`);
        tick.append(c);gsap.from(c,{opacity:0,scale:.8,duration:.3,ease:'back.out(2)'});
        this.tokens+=14;this.el.tok.textContent=`${Math.round(this.tokens*1.6).toLocaleString('ja-JP')} tokens`;
        await run.wait(150);
      }
      await run.wait(500);
      this.setNode('llm','done');
      await this.flow(1);

      /* 3 — コードで確認 */
      this.setNode('code','active');clock('03:20',.9);
      for(const p of products){
        const rowEls=this.root.querySelectorAll(`[data-r=${p.id}]`);
        await run.wait(p.fix?300:200);this.ctx.sfx&&this.ctx.sfx.tick();
        const cells=['sku','unit','cap','life'];
        for(const k of cells){
          const fixHere=(p.fix==='cap'&&k==='cap')||(p.fix==='sku'&&k==='sku');
          if(!fixHere)this.tickCell(p.id,k,'ok');
          await run.wait(55);
        }
        if(p.fix==='cap'){
          // 数量上限: 36 → 24
          rowEls.forEach(e=>e.classList.add('row-hl'));
          this.tickCell(p.id,'cap','fix');
          this.note(`<b>傘</b>　${p.draft}本 → <b>${p.proposed}本</b>に修正。棚の上限は${p.cap}本、在庫${p.stock}本のため、追加は${p.cap-p.stock}本までです。`);
          this.updatePin(pins.umbrella,`傘 <s>${p.draft}</s><b>${p.proposed}</b>本`,'is-fix');
          await run.wait(1900);
          rowEls.forEach(e=>e.classList.remove('row-hl'));
        }
        if(p.fix==='sku'){
          rowEls.forEach(e=>e.classList.add('row-hl'));
          this.tickCell(p.id,'sku','bad');this.root.querySelector(`.c[data-r=${p.id}] .dot[data-c=sku] .ic`).innerHTML=I.x;
          this.note(`<b>牛乳</b>　「${nightRun.retry.wrong}」は仕入先カタログにありません。LLMへ差し戻します。`,true);
          await run.wait(700);
          // arc from code back to llm
          await this._retryArc();
          this.setNode('code','active');
          this.tickCell(p.id,'sku','fix');this.root.querySelector(`.c[data-r=${p.id}] .dot[data-c=sku] .ic`).innerHTML=I.check;
          this.note(`<b>牛乳</b>　LLMが「${nightRun.retry.right}」に置き換え。再確認で通過しました。`);
          this.updatePin(pins.milk,`牛乳 <b>${M.draft}</b>ケース`,'is-fix');
          await run.wait(1700);
          rowEls.forEach(e=>e.classList.remove('row-hl'));
        }
        this.checked++;this.el.chk.textContent=`${this.checked} / ${products.length}`;
        { const wrap=this.root.querySelector('.chk-wrap'),first=this.root.querySelector(`.c.nm[data-r=${p.id}]`);
          gsap.to(wrap,{scrollTop:Math.max(0,first.offsetTop-wrap.clientHeight+first.offsetHeight*3),duration:.35,ease:'power2.out'}); }
      }
      this.note(`<b>12品目</b>の確認が終わりました。コードが直したのは<b>2件</b>です。`);
      this.setNode('code','done');
      await this.flow(2);

      /* 4 — 完成 */
      this.setNode('human','done');
      world.scan(false);
      clock('04:12',1.1);chrome.clockSub.textContent='下書き完成';
      const st=proposalStats();
      this.setHead('下書き完成。朝の承認を待っています。',`${st.total}品目 · 増やす${st.up} · 減らす${st.down} · 据え置き${st.hold} · コードの修正${st.fixed}件`);
      this.el.go.classList.add('is-on');
      this.phase='done';this.ctx.sfx&&this.ctx.sfx.chime();this.ctx.director.updateHint();
    }catch(e){if(!isDead(e))console.error(e)}
  },

  async _retryArc(){
    const run=this.run;
    const path=this.el.retry.querySelector('path:not(.tip)'),tip=this.el.retry.querySelector('.tip'),lab=this.el.retryLab;
    const len=path.getTotalLength();
    gsap.set(path,{strokeDasharray:'6 5',opacity:1});
    gsap.fromTo(path,{strokeDashoffset:len},{strokeDashoffset:0,duration:.9,ease:'power2.inOut'});
    gsap.to(lab,{opacity:1,duration:.4});gsap.to(tip,{opacity:1,duration:.3,delay:.8});
    this.setNode('code','');this.setNode('llm','active');
    await run.wait(1000);
    // LLM answers the retry
    const blk=this.milkBlk;
    await this.say(blk,`コードから差し戻し: 「${nightRun.retry.wrong}」はカタログにありません。`,'fix');
    await this.say(blk,`→ 「${nightRun.retry.right}」に置き換えます。5ケースのまま。`,'ok');
    blk.querySelector('.bh span').textContent=products.find(p=>p.id==='milk').name;
    this.setNode('llm','done');
    gsap.to([path,tip,lab],{opacity:0,duration:.5});
    await run.wait(300);
  },
};
