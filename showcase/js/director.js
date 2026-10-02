/* Director: owns the scene list, transitions, keyboard, autoplay. */
import {sleep} from './util.js';

export class Director{
  constructor(){
    this.scenes=[];this.i=-1;this.busy=false;this.auto=false;this._autoToken=0;
    this.ctx=null;this.chrome=null;
  }
  register(scene){this.scenes.push(scene)}
  mountAll(ctx,container){
    this.ctx=ctx;
    for(const s of this.scenes){
      const root=document.createElement('section');root.className=`scene scene-${s.id}`;root.dataset.scene=s.id;
      container.append(root);s.root=root;
      s.mount(root,ctx);
    }
  }
  get scene(){return this.scenes[this.i]}

  async go(i,{force=false}={}){
    if(i<0||i>=this.scenes.length)return;
    if(this.busy&&!force){this._queued=i;return}     // a tap during a transition is not lost: the latest request runs next
    if(i===this.i)return;
    this.busy=true;
    const prev=this.scenes[this.i],next=this.scenes[i];
    try{
      this.ctx.sfx&&this.ctx.sfx.whoosh();
      if(prev){await prev.leave(next);prev.root.classList.remove('is-active')}
      this.i=i;next.root.classList.add('is-active');
      this.chrome.setScene(next,i);
      await next.enter(prev);
    }finally{this.busy=false}
    this.updateHint();
    if(this._queued!=null){const q=this._queued;this._queued=null;if(q!==this.i)await this.go(q)}
  }
  async next(){await this.go(this.i+1)}
  async prev(){await this.go(this.i-1)}

  /* the one "do the next thing" key */
  async primary(){
    if(this.busy)return;
    const s=this.scene;if(!s)return;
    const r=await s.primary();
    if(r==='next')await this.next();
    this.updateHint();
  }
  updateHint(){
    const s=this.scene;if(!s)return;
    const el=document.getElementById('next-hint');if(!el)return;
    const t=s.hint?s.hint():'';
    el.classList.toggle('is-on',!!t&&!this.auto);
    const lab=el.querySelector('.lab');if(lab)lab.textContent=t||'';
  }

  /* start over from the opening */
  async reset(){
    this.stopAuto();
    for(const s of this.scenes)s.reset&&s.reset();
    this.ctx.state.reset();
    this.ctx.world.clearLocate();this.ctx.world.setHeat(false);this.ctx.world.scan(false);
    this.ctx.world.setFill('A-03',6/30);this.ctx.world.setFill('C-01',7/40);
    if(this.i===0){const s=this.scenes[0];await s.leave(s);s.reset&&s.reset();await s.enter(null);this.updateHint();return}
    this.chrome.jumpClock('22:00','店舗の時刻');
    await this.go(0,{force:true});
  }

  /* auto-play: drives every scene's scripted path hands-free */
  async startAuto(){
    if(this.auto)return;this.auto=true;const token=++this._autoToken;
    this.chrome.toast('自動再生を開始（A または Esc で停止）');
    document.body.classList.add('is-auto');
    this.updateHint();
    try{
      while(this.auto&&token===this._autoToken){
        const s=this.scene;
        await sleep(s.autoPause??1200);
        if(!this.auto||token!==this._autoToken)break;
        if(this.busy){await sleep(300);continue}
        const r=s.autoStep?await s.autoStep():await s.primary();
        if(r==='wait'){await sleep(450);continue}
        if(r==='next'){
          if(this.i>=this.scenes.length-1){ // loop the whole film
            await sleep(6000);if(!this.auto||token!==this._autoToken)break;
            await this.reset();this.startAuto();return;
          }
          await this.next();
        }
        await sleep(s.beatPause??900);
      }
    }catch(e){console.warn(e)}
  }
  stopAuto(){this.auto=false;this._autoToken++;document.body.classList.remove('is-auto');this.updateHint()}
  toggleAuto(){this.auto?(this.stopAuto(),this.chrome.toast('自動再生を停止')):this.startAuto()}
}
