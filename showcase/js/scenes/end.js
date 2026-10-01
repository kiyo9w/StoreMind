/* 05 · 次のステップ — tomorrow morning. The loop closes; the pilot is the next step. */
import {h,sleep} from '../util.js';
import {I} from '../ui/icons.js';
import {splitChars,revealChars} from '../ui/type.js';
import {products,store} from '../mock/data.js';
import {state} from '../state.js';
const gsap=window.gsap;
const mmss=ms=>{const s=Math.max(0,Math.round(ms/1000));return `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`};

export const end={
  id:'end',title:'次のステップ',theme:'night',clockSub:'翌朝 開店',
  notes:[
    '夜に準備し、朝に判断し、日中に確認する。この一日を、ひとつの仕組みにします。',
    'まず、1店舗・1カテゴリで、今の発注と並べて試します。',
    '見る数字は、発注にかかる時間、廃棄、欠品、そして提案をどれだけ採用・修正したか。',
    '右下の数字は、このデモで実際に操作した記録です。ほかの数字は、パイロットで測ります。',
  ],
  mount(root,ctx){this.ctx=ctx;this._build()},
  _build(){
    const root=this.root;
    const edited=[...state.edits].filter(([id,q])=>q!==products.find(p=>p.id===id).proposed).length;
    root.innerHTML=`
    <div class="copy">
      <div class="eyebrow label">翌朝 08:00 · ${store.name} 開店</div>
      <h2><span class="ln" data-l="1">毎朝、店長が</span><span class="ln" data-l="2"><span class="chip">材料の揃った案</span>を</span><span class="ln" data-l="3">見て、決める。</span></h2>
      <div class="rule2"></div>
      <p class="lead">1店舗・1カテゴリで、今の発注と並べて試します。</p>
      <div class="pilot">
        <div><div class="grid3">${Array.from({length:9},(_,i)=>`<i class="${i===4?'on':''}"></i>`).join('')}</div><div class="cap">1店舗・1カテゴリ</div></div>
        <div class="kpis">
          <div class="kpi"><div class="n">01</div><div class="t">発注時間</div><div class="s">軽くなったか</div><div class="v" data-k>—</div><span class="tag is-concept">パイロットで計測</span></div>
          <div class="kpi"><div class="n">02</div><div class="t">廃棄</div><div class="s">余りは減ったか</div><div class="v" data-k>—</div><span class="tag is-concept">パイロットで計測</span></div>
          <div class="kpi"><div class="n">03</div><div class="t">欠品</div><div class="s">売り逃しは減ったか</div><div class="v" data-k>—</div><span class="tag is-concept">パイロットで計測</span></div>
          <div class="kpi is-live"><div class="n">04</div><div class="t">採用・修正</div><div class="s">現場で使えるか</div><div class="v" data-live>${edited}/${products.length}</div><span class="tag">このデモの記録</span></div>
        </div>
      </div>
      <div class="foot"><span class="tag is-concept">仮説</span>料金は未定です。店舗ごとの月額（SaaS）を考えています。</div>
      <div class="rec" data-rec></div>
    </div>
    <div class="credit">店舗の写真: Japanexperterna, Martin Lewison / Wikimedia Commons（CC BY-SA）ほか、生成イメージを含みます。</div>
    <button class="btn is-ghost again" data-act="again">最初から <kbd>R</kbd></button>`;
    root.querySelector('[data-act=again]').addEventListener('click',()=>this.ctx.director.reset());
  },
  async enter(prev){
    const {world,chrome}=this.ctx,root=this.root;
    this._build();
    world.setPaused(false);document.getElementById('gl').style.opacity=1;
    world.clearLocate();world.setHeat(false);
    world.mood(.5,2.4);world.rain(.55,1.6);world.setOpen(true);
    world.setFill('A-03',1,2.2);                       // shelves full for the new day
    world.uiShift(.2,0);
    world.shot({pos:[19.8,10.4,21.2],target:[0,.7,.3],fov:25},{duration:3.2,ease:'power3.inOut'});
    chrome.setClock('08:00',{dur:1.6,sub:'翌朝 開店'});
    const taken=state.morningStart?((state.approvedAt||Date.now())-state.morningStart):0;
    const edited=[...state.edits].filter(([id,q])=>q!==products.find(p=>p.id===id).proposed).length;
    root.querySelector('[data-rec]').innerHTML=`<span>承認<b>${state.approved?products.length:0}</b>件</span><span>手で修正<b>${edited}</b>件</span><span>確認から承認まで<b>${state.approved?mmss(taken):'—'}</b></span>`;
    // slow breathing camera yaw
    this._off=world.onFrame((dt,t)=>{world.camState.yaw=Math.sin(t*.12)*.22});
    const lines=[...root.querySelectorAll('h2 .ln')];
    gsap.fromTo(lines,{yPercent:105,opacity:0},{yPercent:0,opacity:1,duration:1.2,ease:'expo.out',stagger:.18,delay:.5});
    gsap.from(root.querySelectorAll('.eyebrow,.rule2,.lead,.foot,.rec'),{opacity:0,y:20,duration:.9,ease:'expo.out',stagger:.12,delay:1.1});
    gsap.from(root.querySelectorAll('.pilot .grid3 i'),{opacity:0,scale:.6,duration:.5,ease:'back.out(2)',stagger:.05,delay:1.6});
    gsap.from(root.querySelectorAll('.kpi'),{opacity:0,y:24,duration:.8,ease:'expo.out',stagger:.12,delay:1.8});
    gsap.from(root.querySelectorAll('.credit,.again'),{opacity:0,duration:1,delay:2.4});
    await sleep(1400);
  },
  async leave(){
    if(this._off){this._off();this._off=null}
    this.ctx.world.camState.yaw=0;
    await gsap.to(this.root.children,{opacity:0,duration:.5}).then();
    gsap.set(this.root.children,{clearProps:'opacity'});
  },
  reset(){},
  primary(){return 'next'},
  hint(){return ''},
  autoPause:6000,
};
