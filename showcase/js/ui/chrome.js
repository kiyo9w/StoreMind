import {I} from './icons.js';
import {h,hhmm,toMin} from '../util.js';

const STOPS=[
  {id:'open',   t:'22:00', l:'閉店後'},
  {id:'night',  t:'04:12', l:'夜に準備する'},
  {id:'morning',t:'07:30', l:'朝に判断する'},
  {id:'day',    t:'14:20', l:'日中に確認する'},
  {id:'end',    t:'翌朝',   l:'次のステップ'},
];

export class Chrome{
  constructor(director,store){
    this.director=director;
    this.clockMin=toMin('22:00');
    this.folio=h(`<header id="folio" aria-label="StoreMind">
      <div class="brand">${I.mark}<span class="wm">STOREMIND</span></div>
      <div class="rule"></div>
      <div class="hint" id="next-hint" role="status"><kbd>⏎</kbd><span class="lab"></span></div>
      <div class="store">${store.chain} ${store.name}</div>
      <div class="sec"><em>01</em><span>閉店後</span></div>
      <div class="demo"><span class="tag is-concept" title="デモ用の架空データです"><span class="dot"></span>デモデータ</span></div>
    </header>`);
    this.arc=h(`<footer id="arc" aria-label="一日の流れ">
      <div class="clock-box"><div class="clock" id="clock">22:00</div><div class="clock-sub" id="clock-sub">店舗の時刻</div></div>
      <div class="track"><div class="base"></div><div class="fill" id="arc-fill"></div>
        ${STOPS.map((s,i)=>`<button class="stop" data-i="${i}" style="left:${i/(STOPS.length-1)*100}%"><span class="t">${s.t}</span><span class="d"></span><span class="l">${s.l}</span></button>`).join('')}
      </div>
    </footer>`);
    this.presenter=h(`<aside id="presenter" aria-label="プレゼンターメモ"></aside>`);
    this.help=h(`<div id="help" role="dialog" aria-label="ショートカット"><div class="sheet"><h3>ショートカット</h3><div class="grid">
      <div class="row"><span>次へ / 実行</span><span><kbd>Enter</kbd><kbd>→</kbd><kbd>Space</kbd></span></div>
      <div class="row"><span>前のシーン</span><span><kbd>←</kbd></span></div>
      <div class="row"><span>シーンへ移動</span><span><kbd>1</kbd>–<kbd>5</kbd></span></div>
      <div class="row"><span>自動再生</span><span><kbd>A</kbd></span></div>
      <div class="row"><span>登壇者メモ</span><span><kbd>P</kbd></span></div>
      <div class="row"><span>画面だけ表示</span><span><kbd>H</kbd></span></div>
      <div class="row"><span>全画面</span><span><kbd>F</kbd></span></div>
      <div class="row"><span>効果音</span><span><kbd>M</kbd></span></div>
      <div class="row"><span>最初から</span><span><kbd>R</kbd></span></div>
      <div class="row"><span>この画面</span><span><kbd>?</kbd></span></div>
    </div></div></div>`);
    this.toastEl=h(`<div id="toast" role="status" aria-live="polite"></div>`);
    this.hintEl=null;
    document.body.append(this.folio,this.arc,this.presenter,this.help,this.toastEl);
    this.clockEl=this.arc.querySelector('#clock');this.clockSub=this.arc.querySelector('#clock-sub');this.fill=this.arc.querySelector('#arc-fill');
    this.secEl=this.folio.querySelector('.sec');
    this.arc.querySelectorAll('.stop').forEach(b=>b.addEventListener('click',()=>director.go(+b.dataset.i)));
    this.help.addEventListener('click',()=>this.toggleHelp(false));
    this.arc.querySelector('.track').style.setProperty('--n',STOPS.length);
  }

  setScene(scene,i){
    document.body.classList.toggle('theme-day',scene.theme==='day');
    document.body.classList.toggle('theme-night',scene.theme!=='day');
    this.secEl.innerHTML=`<em>${String(i+1).padStart(2,'0')}</em><span>${scene.title}</span>`;
    this.arc.querySelectorAll('.stop').forEach((b,k)=>{
      b.classList.toggle('is-done',k<i);b.classList.toggle('is-now',k===i);
    });
    this.setProgress(i);
    this.clockSub.textContent=scene.clockSub||'';
    this.renderPresenter(scene);
  }

  setProgress(f,dur=1.4){
    const pct=Math.max(0,Math.min(1,f/(STOPS.length-1)))*100;
    window.gsap.to(this.fill,{width:pct+'%',duration:dur,ease:'power3.inOut'});
  }

  /* fast-forward the store's clock like a time-lapse */
  setClock(to,{dur=1.6,instant=false,sub}={}){
    const target=typeof to==='string'?toMin(to):to;
    let t=target;
    const cur=this.clockMin;
    while(t<cur-1)t+=1440;                           // always forward in time
    if(sub!==undefined)this.clockSub.textContent=sub;
    if(this._clockTween){this._clockTween.kill();this._clockTween=null}
    if(instant||t-cur>1440){this.clockMin=t;this.clockEl.textContent=hhmm(t);return null}
    const o={v:cur};
    return this._clockTween=window.gsap.to(o,{v:t,duration:dur,ease:'power2.inOut',onUpdate:()=>{this.clockMin=o.v;this.clockEl.textContent=hhmm(o.v)},onComplete:()=>{this.clockMin=t;this.clockEl.textContent=hhmm(t)}});
  }
  jumpClock(to,sub){const t=typeof to==='string'?toMin(to):to;this.clockMin=t;this.clockEl.textContent=hhmm(t);if(sub!==undefined)this.clockSub.textContent=sub}

  renderPresenter(scene){
    const notes=(scene.notes||[]).map(n=>`<li>${n}</li>`).join('');
    this.presenter.innerHTML=`<h4>登壇者メモ · ${scene.title}</h4><ul>${notes}</ul>
      <div class="keys"><span><kbd>Enter</kbd>実行/次へ</span><span><kbd>←</kbd>戻る</span><span><kbd>A</kbd>自動再生</span><span><kbd>?</kbd>ヘルプ</span></div>`;
  }
  togglePresenter(on){this.presenter.classList.toggle('is-open',on??!this.presenter.classList.contains('is-open'))}
  toggleHelp(on){this.help.classList.toggle('is-open',on??!this.help.classList.contains('is-open'))}
  toggleChrome(on){document.body.classList.toggle('chrome-off',on??!document.body.classList.contains('chrome-off'))}
  toast(msg,ms=1800){
    this.toastEl.textContent=msg;this.toastEl.classList.add('is-on');
    clearTimeout(this._tt);this._tt=setTimeout(()=>this.toastEl.classList.remove('is-on'),ms);
  }
}
export {STOPS};
