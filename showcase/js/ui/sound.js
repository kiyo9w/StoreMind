/* Optional sound design, synthesised with WebAudio (no files, works offline).
   Off by default (a quiet room, a talking presenter). Press M to toggle. */
export class Sfx{
  constructor(state){this.state=state;this.ctx=null}
  get on(){return !!this.state.sound}
  _ac(){
    if(!this.ctx){const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return null;this.ctx=new AC();
      this.master=this.ctx.createGain();this.master.gain.value=.55;this.master.connect(this.ctx.destination)}
    if(this.ctx.state==='suspended')this.ctx.resume();
    return this.ctx;
  }
  toggle(){this.state.sound=!this.state.sound;if(this.state.sound)this._ac();return this.state.sound}
  _tone({f=440,f2,dur=.2,type='sine',vol=.25,delay=0,attack=.005}){
    if(!this.on)return;const ac=this._ac();if(!ac)return;
    const t=ac.currentTime+delay,o=ac.createOscillator(),g=ac.createGain();
    o.type=type;o.frequency.setValueAtTime(f,t);if(f2)o.frequency.exponentialRampToValueAtTime(f2,t+dur);
    g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(vol,t+attack);g.gain.exponentialRampToValueAtTime(.0001,t+dur);
    o.connect(g);g.connect(this.master);o.start(t);o.stop(t+dur+.05);
  }
  _noise({dur=.15,vol=.2,hp=800,delay=0}){
    if(!this.on)return;const ac=this._ac();if(!ac)return;
    const n=Math.floor(ac.sampleRate*dur),buf=ac.createBuffer(1,n,ac.sampleRate),d=buf.getChannelData(0);
    for(let i=0;i<n;i++)d[i]=(Math.random()*2-1)*(1-i/n);
    const s=ac.createBufferSource(),f=ac.createBiquadFilter(),g=ac.createGain();
    s.buffer=buf;f.type='highpass';f.frequency.value=hp;g.gain.value=vol;
    s.connect(f);f.connect(g);g.connect(this.master);s.start(ac.currentTime+delay);
  }
  /* the 承認 seal landing: low body + paper slap */
  thump(){this._tone({f:120,f2:44,dur:.34,type:'sine',vol:.7});this._noise({dur:.09,vol:.35,hp:1800});this._tone({f:62,f2:36,dur:.5,type:'triangle',vol:.3,delay:.02})}
  tick(){this._tone({f:1800,f2:1200,dur:.045,type:'square',vol:.04})}
  chime(){[784,988,1318].forEach((f,i)=>this._tone({f,dur:.9,type:'sine',vol:.14,delay:i*.11}))}
  whoosh(){this._noise({dur:.7,vol:.12,hp:300})}
  pop(){this._tone({f:520,f2:880,dur:.12,type:'sine',vol:.12})}
}
