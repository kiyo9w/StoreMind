/* ─────────────────────────────────────────────────────────────────────────
   The store, as a clay-white architectural model in a navy void.
   One persistent world for the whole demo; scenes only move the camera,
   change the mood (night → day), and light up shelves.

   Public API (everything the scenes need):
     world.mood(k, dur)          0 = closing-time night … 1 = overcast day
     world.shot(name|obj, opt)   camera moves (wide, hero, door, cooler, top …)
     world.uiShift(f, dur)       slide the model sideways under the UI (−.5…+.5 of width)
     world.locate(code, opt)     beacon + halo + camera to a bay
     world.clearLocate()
     world.setHeat(on)           stock heat strips on every bay
     world.setFill(code, r, dur) shelf stock 0…1
     world.scan(on)              holographic scan sweep
     world.rain(k)               rain amount 0…1
     world.setOpen(bool)         shop sign
     world.addPin(code, el, off) HTML pin that follows a bay
     world.onHover / onPick      bay interaction callbacks
   ───────────────────────────────────────────────────────────────────────── */
import * as THREE from 'three';
import {EffectComposer} from 'three/addons/EffectComposer.js';
import {RenderPass} from 'three/addons/RenderPass.js';
import {UnrealBloomPass} from 'three/addons/UnrealBloomPass.js';
import {OutputPass} from 'three/addons/OutputPass.js';
import {RoomEnvironment} from 'three/addons/RoomEnvironment.js';
import {RoundedBoxGeometry} from 'three/addons/RoundedBoxGeometry.js';
import {buildProduct} from './products3d.js';

const gsap=window.gsap;
const V3=(x=0,y=0,z=0)=>new THREE.Vector3(x,y,z);
const C=c=>new THREE.Color(c);
const lerp=(a,b,t)=>a+(b-a)*t;

/* ───────── palette (clay + navy + lamp) ───────── */
const PAL={
  clay:0xE9E5D2, clayDk:0xCBC6AE, clayLt:0xF6F3E4,
  navy:0x0E1D40, navyHi:0x1B3066, navyMid:0x13244F,
  steel:0x7E8CA8, lamp:0xFFC46B, cold:0xBFD6FF,
  floorN:0x2b4079, floorD:0xa9a58f,
};

/* ───────── mood endpoints ───────── */
const NIGHT={bg:0x050B1D,fog:0.014,hemiSky:0x5a78c8,hemiGnd:0x0b1226,hemiI:.38,key:0x9ab6ff,keyI:.8,env:.18,emis:1,bloom:.5,thr:.74,rain:1,ground:0x070f26,pave:0x141f45,edge:.34,lampI:1,exposure:1.0};
const DAY  ={bg:0xDCD8C4,fog:0.006,hemiSky:0xfff6e2,hemiGnd:0xb7b09a,hemiI:.5,key:0xfff0d8,keyI:1.5,env:.35,emis:.5,bloom:.08,thr:.92,rain:.32,ground:0xD2CEB9,pave:0xC4BFA6,edge:.16,lampI:.25,exposure:.9};

const DAWN ={bg:0x1b2850,fog:0.011,hemiSky:0x9db6ff,hemiGnd:0x2a2440,hemiI:.55,key:0xffb98a,keyI:1.9,env:.3,emis:.85,bloom:.5,thr:.78,rain:.5,ground:0x151f45,pave:0x232d5a,edge:.28,lampI:.7,exposure:1.0};

/* ───────── camera shots ───────── */
const SHOTS={
  hero:   {pos:[21.4,11.2,22.8], target:[0,.7,.3], fov:25},
  wide:   {pos:[17.4,12.4,19.2],target:[0,.4,.7], fov:27},
  orbitL: {pos:[-12,8.6,15.5],  target:[.4,.8,0],fov:27},
  top:    {pos:[1.5,20,5.6],   target:[0,0,0],   fov:28},
  door:   {pos:[3.4,3.8,10.2], target:[-5.2,1.1,2.1],fov:25},
  cooler: {pos:[3.6,3.2,8.2],  target:[-2.2,1.3,-3.6],fov:27},
  register:{pos:[10.5,4.2,6.5],target:[3.6,1,-2.2],fov:25},
  night:  {pos:[23.5,10.6,22.5],  target:[-.2,.9,0], fov:27},
};

/* ───────── helpers ───────── */
function box(w,h,d,mat,x=0,y=0,z=0,{edge=false,cast=true,rcv=true,r=0}={}){
  const g=r?new RoundedBoxGeometry(w,h,d,2,r):new THREE.BoxGeometry(w,h,d);
  const m=new THREE.Mesh(g,mat);m.position.set(x,y,z);m.castShadow=cast;m.receiveShadow=rcv;
  m.userData.edge=edge;return m;
}
function cylM(rt,rb,h,mat,x=0,y=0,z=0,seg=24){const m=new THREE.Mesh(new THREE.CylinderGeometry(rt,rb,h,seg),mat);m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;return m}

function checkerTexture(){
  const c=document.createElement('canvas');c.width=c.height=256;const x=c.getContext('2d');
  const n=4,s=256/n;
  for(let i=0;i<n;i++)for(let j=0;j<n;j++){x.fillStyle=((i+j)%2)?'#ffffff':'#e9e9ef';x.fillRect(i*s,j*s,s,s)}
  x.strokeStyle='rgba(0,0,0,.14)';x.lineWidth=2;for(let i=0;i<=n;i++){x.beginPath();x.moveTo(i*s,0);x.lineTo(i*s,256);x.stroke();x.beginPath();x.moveTo(0,i*s);x.lineTo(256,i*s);x.stroke()}
  const t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=8;return t;
}
function signTexture(text,sub,color,bg='#0b1226'){
  const c=document.createElement('canvas');c.width=512;c.height=192;const x=c.getContext('2d');
  x.fillStyle=bg;x.fillRect(0,0,512,192);
  x.strokeStyle=color;x.lineWidth=6;x.strokeRect(10,10,492,172);
  x.shadowColor=color;x.shadowBlur=22;x.fillStyle=color;x.textAlign='center';x.textBaseline='middle';
  x.font='700 112px "Bodoni 72","Bodoni Moda",serif';x.fillText(text,256,84);
  x.font='700 30px "Helvetica Neue",sans-serif';x.fillText(sub,256,152);
  const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;return t;
}

/* ═════════════════════════ World ═════════════════════════ */
export class World{
  constructor(canvas){
    this.canvas=canvas;
    this.paused=false;
    this.k=0;                               // mood 0..1
    this.t=0;
    this.pins=[];
    this.bays={};
    this.hoverCb=null;this.pickCb=null;
    this._pointer=new THREE.Vector2(0,0);this._pt=new THREE.Vector2(0,0);
    this._uiShift=0;
    this._frameCbs=new Set();
    this._dpr=Math.min(window.devicePixelRatio||1,2);
    this._quality=1;

    const r=this.renderer=new THREE.WebGLRenderer({canvas,antialias:false,powerPreference:'high-performance',alpha:false});
    r.setPixelRatio(this._dpr);
    r.shadowMap.enabled=true;r.shadowMap.type=THREE.PCFShadowMap;
    r.toneMapping=THREE.ACESFilmicToneMapping;r.toneMappingExposure=1;
    r.outputColorSpace=THREE.SRGBColorSpace;

    const s=this.scene=new THREE.Scene();
    s.background=C(NIGHT.bg);s.fog=new THREE.FogExp2(NIGHT.bg,NIGHT.fog);
    const pm=new THREE.PMREMGenerator(r);
    s.environment=pm.fromScene(new RoomEnvironment(),.04).texture;pm.dispose();
    s.environmentIntensity=NIGHT.env;

    this.cam=new THREE.PerspectiveCamera(26,1,.5,200);
    this.camState={pos:V3(...SHOTS.hero.pos),target:V3(...SHOTS.hero.target),fov:SHOTS.hero.fov,yaw:0};
    this._applyCam();

    this._lights();
    this._build();
    this._rain();
    this._post();
    this.resize();
    this._pick();
    this.applyMood(0);
    this._loop=this._loop.bind(this);
    this._last=performance.now();
    requestAnimationFrame(this._loop);
    this._fpsAcc=0;this._fpsN=0;
    this._onResize=()=>this.resize();
    window.addEventListener('resize',this._onResize);
    this._beat=setInterval(()=>{if(document.hidden)this.step(performance.now())},120);
    window.addEventListener('pointermove',e=>{this._pointer.set(e.clientX/innerWidth*2-1,-(e.clientY/innerHeight*2-1))});
  }

  /* ───────────── lights ───────────── */
  _lights(){
    const s=this.scene;
    this.hemi=new THREE.HemisphereLight(NIGHT.hemiSky,NIGHT.hemiGnd,NIGHT.hemiI);s.add(this.hemi);
    const k=this.key=new THREE.DirectionalLight(NIGHT.key,NIGHT.keyI);
    k.position.set(-8,16,12);k.castShadow=true;
    k.shadow.mapSize.set(2048,2048);Object.assign(k.shadow.camera,{left:-12,right:12,top:12,bottom:-12,near:2,far:50});
    k.shadow.bias=-.0003;k.shadow.normalBias=.03;k.shadow.radius=5;
    s.add(k);s.add(k.target);
    // interior warm fill + lamp posts (these carry the night)
    this.lamps=[];
    const L=(x,y,z,col,i,d)=>{const p=new THREE.PointLight(col,i,d,1.6);p.position.set(x,y,z);p.userData.base=i;s.add(p);this.lamps.push(p);return p};
    L(-1.2,2.7,-.6,0xfff1d6,4.2,13);
    L(3.6,2.5,-2.2,0xffc46b,2.4,9);
    L(-3.8,2.4,2.4,0xffe2b0,1.6,8);
    L(8.6,4.2,-2.6,0xffc46b,7,16);
    
  }

  /* ───────────── materials ───────────── */
  _mats(){
    const M=this.M={};
    const std=(c,r=.7,m=0)=>new THREE.MeshStandardMaterial({color:c,roughness:r,metalness:m});
    M.clay=std(PAL.clay,.78);M.clayLt=std(PAL.clayLt,.7);M.clayDk=std(PAL.clayDk,.8);
    M.navy=std(PAL.navy,.55);M.navyHi=std(PAL.navyHi,.5);M.navyMid=std(PAL.navyMid,.6);
    M.steel=std(0xb7bdcc,.35,.7);
    this.floorTex=checkerTexture();this.floorTex.repeat.set(12,8);
    M.floor=new THREE.MeshStandardMaterial({color:PAL.floorN,roughness:.34,metalness:.08,map:this.floorTex});
    M.ground=new THREE.MeshStandardMaterial({color:NIGHT.ground,roughness:.22,metalness:.55});
    M.paving=new THREE.MeshStandardMaterial({color:NIGHT.pave,roughness:.55,metalness:.15});
    M.glass=new THREE.MeshPhysicalMaterial({color:0xcfe2ff,roughness:.05,metalness:0,transparent:true,opacity:.16,depthWrite:false,side:THREE.DoubleSide});
    this.emis=[];
    const em=(c,i,name)=>{const m=new THREE.MeshStandardMaterial({color:0x111111,emissive:c,emissiveIntensity:i,roughness:.4});m.userData.base=i;this.emis.push(m);return m};
    M.coolW=em(0xcfe3ff,1.55);M.warmW=em(0xfff0cf,2.1);M.amber=em(0xffb85a,2.4);M.coldBlue=em(0x9fc3ff,1.6);
    M.vend=em(0xbfe0ff,1.7);M.lampHead=em(0xffd48a,3.2);
    M.edge=new THREE.LineBasicMaterial({color:0xfffef3,transparent:true,opacity:.34,depthWrite:false});
    M.heatOk=new THREE.MeshBasicMaterial({color:0x7fe0ae,transparent:true,opacity:0,depthWrite:false,blending:THREE.AdditiveBlending});
  }

  /* ───────────── build the store ───────────── */
  _build(){
    this._mats();
    const M=this.M,root=this.root=new THREE.Group();this.scene.add(root);
    this.structural=[];
    const add=(m,parent=root)=>{parent.add(m);if(m.userData.edge)this.structural.push(m);return m};

    /* ground + street */
    const ground=new THREE.Mesh(new THREE.CircleGeometry(60,64),M.ground);ground.rotation.x=-Math.PI/2;ground.position.y=-.41;ground.receiveShadow=true;root.add(ground);
    this.ground=ground;
    const side=box(24,.2,3.2,M.paving,0,-.31,6.4,{});side.receiveShadow=true;root.add(side);   // sidewalk, front
    const sideR=box(3,.2,18,M.paving,9.2,-.31,-.4,{});root.add(sideR);

    /* slab */
    add(box(12.6,.42,8.6,M.clay,0,-.21,0,{edge:true}));
    const floor=new THREE.Mesh(new THREE.PlaneGeometry(12.2,8.2),M.floor);floor.rotation.x=-Math.PI/2;floor.position.y=.012;floor.receiveShadow=true;root.add(floor);
    this.floor=floor;

    /* walls (cut-away: back + left only) */
    add(box(12.6,3.5,.3,M.clay,0,1.75,-4.15,{edge:true}));
    add(box(.3,3.5,8.6,M.clay,-6.15,1.75,0,{edge:true}));
    add(box(12.2,.16,.12,M.navy,0,.08,-3.97));          // baseboards
    add(box(.12,.16,8.2,M.navy,-5.97,.08,0));
    // cove light strip along the top of both walls (carries the glow)
    root.add(box(12.0,.07,.07,M.warmW,0,3.28,-3.94,{cast:false}));
    root.add(box(.07,.07,8.0,M.warmW,-5.94,3.28,0,{cast:false}));

    /* ceiling light bars hanging from rods */
    this.ceilBars=[];
    [[-2.8,-1.2],[.4,-1.2],[3.6,-1.2],[-2.8,1.9],[.4,1.9],[3.6,1.9]].forEach(([x,z])=>{
      const b=box(2.3,.07,.34,M.warmW,x,3.05,z,{cast:false});root.add(b);this.ceilBars.push(b);
      [-.9,.9].forEach(dx=>root.add(box(.025,.7,.025,M.steel,x+dx,3.45,z,{cast:false})));
    });

    this._coolers(add);
    this._counter(add);
    this._gondolas(add);
    this._leftWall(add);
    this._freezer(add);
    this._entrance(add);
    this._street(add);
    this._buildShelfInstances();
    this._edges();
    this._beacon();
    this._scanner();
    this._heat();
    this.addVirtualBay('SKY',V3(3.2,3.6,-1.2),'天気');
  }

  _edges(){
    const g=this.edgeGroup=new THREE.Group();
    for(const m of this.structural){
      const e=new THREE.LineSegments(new THREE.EdgesGeometry(m.geometry,28),this.M.edge);
      e.position.copy(m.position);e.rotation.copy(m.rotation);e.scale.copy(m.scale);g.add(e);
    }
    this.root.add(g);
  }

  /* ───────────── coolers (back wall) ───────────── */
  _coolers(add){
    const M=this.M;
    this.coolerDefs=[
      {code:'C-01',x0:-5.7,x1:-2.65,label:'冷蔵ケース（弁当・おにぎり）'},
      {code:'C-02',x0:-2.55,x1:-.35, label:'冷蔵ケース（乳製品）'},
      {code:'C-03',x0:-.25, x1:2.05, label:'冷蔵ケース（サラダ）'},
    ];
    const z=-3.55;
    for(const c of this.coolerDefs){
      const w=c.x1-c.x0,cx=(c.x0+c.x1)/2;
      add(box(w,2.55,.9,M.clayLt,cx,1.27,z-.05,{edge:true}));                         // body
      this.root.add(box(w-.1,2.0,.04,M.coolW,cx,1.3,z-.5,{cast:false}));              // glowing back panel
      this.root.add(box(w,.16,.92,M.navy,cx,.08,z-.04));                              // plinth
      this.root.add(box(w,.2,.94,M.navyHi,cx,2.5,z-.03));                             // header
      this.root.add(box(w-.2,.05,.06,M.coolW,cx,2.5,z+.45,{cast:false}));             // header light
      for(let l=0;l<4;l++)this.root.add(box(w-.1,.035,.62,M.steel,cx,.34+l*.5,z-.18,{cast:false}));
      // glass doors
      const n=Math.max(2,Math.round(w/.95));const dw=w/n;
      for(let i=0;i<n;i++){
        const gx=c.x0+dw*(i+.5);
        this.root.add(box(dw-.03,2.05,.03,M.glass,gx,1.28,z+.5,{cast:false,rcv:false}));
        this.root.add(box(.045,.9,.05,M.steel,gx+(i%2?-1:1)*(dw/2-.1),1.3,z+.55,{cast:false}));
        this.root.add(box(.025,2.05,.05,M.steel,c.x0+dw*i,1.28,z+.5,{cast:false}));
      }
      this.root.add(box(.025,2.05,.05,M.steel,c.x1,1.28,z+.5,{cast:false}));
      const hit=box(w,2.4,.9,new THREE.MeshBasicMaterial({visible:false}),cx,1.25,z,{cast:false,rcv:false});
      this._bay(c.code,c.label,hit,{anchor:V3(cx,2.85,z+.3)});
    }
  }

  /* ───────────── register counter + hot warmer + cigarette wall ───────────── */
  _counter(add){
    const M=this.M;
    add(box(3.5,1.02,1.0,M.navyHi,4.15,.51,-2.55,{edge:true}));
    this.root.add(box(3.7,.08,1.2,M.clayLt,4.15,1.06,-2.55));
    this.root.add(box(.5,.34,.4,M.navy,5.15,1.27,-2.6));                         // register
    this.root.add(box(.46,.28,.03,M.coldBlue,5.15,1.43,-2.4,{cast:false}));
    // hot warmer (D-01)
    const hw=new THREE.Group();hw.position.set(2.95,1.1,-2.55);
    hw.add(box(1.1,.78,.7,M.amber,0,.4,0,{cast:false}));
    hw.add(box(1.14,.04,.74,M.steel,0,.8,0,{cast:false}));
    hw.add(box(1.12,.72,.04,M.glass,0,.4,.36,{cast:false,rcv:false}));
    this.root.add(hw);
    const hit=box(1.2,.9,.8,new THREE.MeshBasicMaterial({visible:false}),2.95,1.55,-2.55,{cast:false,rcv:false});
    this._bay('D-01','ホットウォーマー（レジ横）',hit,{anchor:V3(2.95,2.2,-2.2)});
    // cigarette / lottery wall behind register
    add(box(3.5,1.9,.18,M.clayDk,4.15,1.75,-3.94,{edge:true}));
    for(let r=0;r<5;r++)for(let c=0;c<14;c++){
      const col=[0xffffff,0xc8383a,0x2d57b8,0x2a2f3a,0xe9c46a][(r*3+c)%5];
      this.root.add(box(.2,.14,.05,new THREE.MeshStandardMaterial({color:col,roughness:.6}),2.6+c*.245,1.18+r*.3,-3.82,{cast:false}));
    }
    // sign banner above register
    this.root.add(box(3.4,.4,.08,M.navy,4.15,3.05,-3.9,{cast:false}));
    this.root.add(box(3.0,.05,.04,M.warmW,4.15,2.92,-3.82,{cast:false}));
  }

  /* ───────────── gondolas ───────────── */
  _gondolas(add){
    const M=this.M;
    this.gondolas=[
      {z:-1.05,codes:['B-01','B-02','B-03','B-04']},
      {z:1.65, codes:['B-05','B-06','B-07','B-08']},
    ];
    const x0=-3.2,len=5.2,bw=len/4;
    for(const g of this.gondolas){
      add(box(len,.22,1.15,M.navy,x0+len/2,.11,g.z,{edge:true}));
      add(box(len,1.7,.08,M.clayLt,x0+len/2,1.07,g.z,{edge:true}));                // spine
      for(let l=0;l<3;l++)for(const s of [-1,1])
        this.root.add(box(len,.04,.48,M.clayLt,x0+len/2,.42+l*.5,g.z+s*.28,{cast:false}));
      [x0,x0+len].forEach(x=>this.root.add(box(.06,1.7,1.15,M.clay,x,1.07,g.z,{cast:false})));
      this.root.add(box(len,.05,.06,M.warmW,x0+len/2,1.94,g.z+.55,{cast:false}));    // top light
      g.codes.forEach((code,i)=>{
        const cx=x0+bw*(i+.5);
        const hit=box(bw-.04,1.8,1.15,new THREE.MeshBasicMaterial({visible:false}),cx,1.05,g.z,{cast:false,rcv:false});
        this._bay(code,code==='B-02'?'中央棚（即席麺）':'中央棚',hit,{anchor:V3(cx,2.35,g.z)});
      });
    }
  }

  /* ───────────── left wall: umbrella stand, raincoat hooks, shelves ───────────── */
  _leftWall(add){
    const M=this.M;
    // A-03 umbrella stand
    const st=new THREE.Group();st.position.set(-5.35,0,2.7);
    st.add(box(.8,.14,1.5,M.navy,0,.07,0,{edge:true}));
    st.add(box(.06,1.5,1.5,M.clayLt,-.37,.82,0,{edge:true}));
    st.add(box(.8,.04,1.5,M.steel,0,1.0,0,{cast:false}));
    this.root.add(st);
    this.umbrellas=[];
    const um=buildProduct('umbrellaClosed',1.5);
    for(let i=0;i<30;i++){
      const u=um.clone(true);
      const row=i%10, tier=Math.floor(i/10);
      u.position.set(-5.35+.18+tier*.26,.13,2.7-.64+row*.14);
      u.rotation.z=-.05-.05*tier;
      u.traverse(o=>{o.castShadow=true});
      this.root.add(u);this.umbrellas.push(u);
    }
    const hit=box(1.0,1.8,1.6,new THREE.MeshBasicMaterial({visible:false}),-5.35,.95,2.7,{cast:false,rcv:false});
    this._bay('A-03','傘スタンド（入口横）',hit,{anchor:V3(-5.35,2.15,2.7),kind:'umbrella'});

    // A-04 raincoat hooks
    add(box(.1,1.3,1.5,M.clayLt,-5.9,1.5,1.0,{edge:true}));
    this.raincoats=[];
    const rc=buildProduct('raincoat',.55);
    for(let i=0;i<12;i++){
      const u=rc.clone(true);u.scale.setScalar(.14);
      u.rotation.set(0,0,Math.PI/2);
      u.position.set(-5.78,1.1+Math.floor(i/6)*.55,.35+(i%6)*.26);
      u.traverse(o=>{o.castShadow=true});this.root.add(u);this.raincoats.push(u);
    }
    const hit2=box(.6,1.5,1.6,new THREE.MeshBasicMaterial({visible:false}),-5.7,1.5,1.0,{cast:false,rcv:false});
    this._bay('A-04','レイングッズ（入口横）',hit2,{anchor:V3(-5.6,2.55,1.0),kind:'raincoat'});

    // household shelves on left wall (generic)
    add(box(.5,1.9,2.4,M.clayLt,-5.75,.97,-1.7,{edge:true}));
    for(let l=0;l<4;l++)this.root.add(box(.52,.04,2.4,M.steel,-5.72,.3+l*.45,-1.7,{cast:false}));
    // left wall sign band
    this.root.add(box(.06,.5,3.6,M.navy,-5.96,2.88,-0.3,{cast:false}));
    this.root.add(box(.04,.05,3.2,M.warmW,-5.92,2.68,-0.3,{cast:false}));
  }

  /* ───────────── freezer chest ───────────── */
  _freezer(add){
    const M=this.M;
    add(box(2.3,.82,1.0,M.clayLt,4.5,.41,2.0,{edge:true}));
    this.root.add(box(2.1,.02,.82,M.coldBlue,4.5,.82,2.0,{cast:false}));
    this.root.add(box(2.2,.05,.9,M.glass,4.5,.9,2.0,{cast:false,rcv:false}));
    this.root.add(box(2.3,.1,1.02,M.navy,4.5,.05,2.0));
    const hit=box(2.3,1.1,1.0,new THREE.MeshBasicMaterial({visible:false}),4.5,.6,2.0,{cast:false,rcv:false});
    this._bay('F-01','冷凍ケース（アイス）',hit,{anchor:V3(4.5,1.7,2.0)});
  }

  /* ───────────── entrance mat + sign ───────────── */
  _entrance(add){
    const M=this.M;
    this.root.add(box(2.1,.02,1.1,M.navyHi,-3.2,.025,3.55,{cast:false}));
    // posts marking the doorway
    [-4.25,-2.15].forEach(x=>this.root.add(box(.1,.14,.1,M.navy,x,.07,4.05,{cast:false})));
    // neon sign on the left wall: OPEN / CLOSED
    this.signMats={
      closed:new THREE.MeshStandardMaterial({color:0x222222,map:signTexture('CLOSED','閉店','#8fa8e8'),emissive:0xffffff,emissiveMap:signTexture('CLOSED','閉店','#8fa8e8'),emissiveIntensity:.8}),
      open:new THREE.MeshStandardMaterial({color:0x222222,map:signTexture('OPEN','営業中','#ffc46b'),emissive:0xffffff,emissiveMap:signTexture('OPEN','営業中','#ffc46b'),emissiveIntensity:2.2}),
    };
    this.sign=new THREE.Mesh(new THREE.PlaneGeometry(1.5,.56),this.signMats.closed);
    this.sign.position.set(-5.9,2.55,4.0-1.1);this.sign.rotation.y=Math.PI/2;
    this.root.add(this.sign);
    this._open=false;
  }

  /* ───────────── street furniture ───────────── */
  _street(add){
    const M=this.M;
    // vending machine, outside right
    const vm=new THREE.Group();vm.position.set(8.6,0,2.4);vm.rotation.y=-.55;
    vm.add(box(1.0,1.95,.8,M.clayLt,0,.97,0,{}));
    vm.add(box(.82,1.1,.04,M.vend,0,1.32,.41,{cast:false}));
    for(let r=0;r<2;r++)for(let c=0;c<5;c++)vm.add(box(.11,.26,.05,new THREE.MeshStandardMaterial({color:[0xc8383a,0x2d57b8,0x3f8450,0xe9c46a,0xf2f2f2][(r+c*2)%5],roughness:.5}),-.33+c*.165,1.6-r*.4,.44,{cast:false}));
    vm.add(box(.82,.22,.04,M.navy,0,.5,.41,{cast:false}));
    this.root.add(vm);
    // lamp posts
    const lp=(x,z,rot)=>{
      const g=new THREE.Group();g.position.set(x,0,z);g.rotation.y=rot;
      g.add(cylM(.06,.09,4.4,M.steel,0,2.2,0,12));
      const arm=box(1.1,.06,.06,M.steel,.5,4.35,0,{});g.add(arm);
      g.add(box(.5,.12,.3,M.lampHead,1.0,4.28,0,{cast:false}));
      this.root.add(g);
    };
    lp(8.6,-3,0);
    // low kerb

  }

  /* ───────────── bays registry ───────────── */
  _bay(code,label,hit,{anchor,kind}={}){
    this.root.add(hit);
    const bb=new THREE.Box3().setFromObject(hit);
    const center=bb.getCenter(V3()),size=bb.getSize(V3());
    this.bays[code]={code,label,hit,center,size,anchor:anchor||V3(center.x,bb.max.y+.3,center.z),fill:1,kind:kind||null,heat:null,instances:[]};
    hit.userData.bay=code;
  }

  addVirtualBay(code,anchor,label=''){
    this.bays[code]={code,label,hit:null,center:anchor.clone(),size:V3(1,1,1),anchor:anchor.clone(),fill:1,virtual:true,heat:null};
  }

  /* ───────────── shelf items (instanced) ───────────── */
  _buildShelfInstances(){
    const R=(w,h,d,r=.02)=>new RoundedBoxGeometry(w,h,d,2,Math.min(r,w/2-.001,h/2-.001,d/2-.001));
    const cy=(rt,rb,h,s=14)=>new THREE.CylinderGeometry(rt,rb,h,s);
    const std=(c,r=.6)=>new THREE.MeshStandardMaterial({color:c,roughness:r});
    const prism=(r,d)=>{const g=new THREE.CylinderGeometry(r,r,d,3);g.rotateX(-Math.PI/2);return g};
    const KINDS={
      bento:   [{g:R(.5,.09,.36,.03),m:std(0x182a55,.45),y:.045},{g:R(.46,.05,.32,.02),m:std(0xfffef3,.5),y:.1}],
      onigiri: [{g:prism(.13,.1),m:std(0xf8f6ea,.8),y:.12},{g:R(.2,.07,.104,.01),m:std(0x0f1722,.55),y:.04}],
      sandwich:[{g:cy(.15,.15,.06,3),m:std(0xd9ae6b,.7),y:.03,rx:0},{g:cy(.13,.13,.04,3),m:std(0xf7d44a,.6),y:.07}],
      salad:   [{g:cy(.12,.1,.09,18),m:std(0x7fb36a,.6),y:.045},{g:cy(.125,.125,.02,18),m:std(0xe8f2f0,.3),y:.1}],
      milk:    [{g:R(.1,.2,.1,.01),m:std(0xfffef3,.5),y:.1},{g:R(.102,.07,.102,.005),m:std(0x2d57b8,.5),y:.07}],
      eggs:    [{g:R(.22,.07,.15,.02),m:std(0xe0b283,.7),y:.035}],
      coffee:  [{g:cy(.04,.04,.12,14),m:std(0x3b2316,.35),y:.06},{g:cy(.0415,.0415,.04,14),m:std(0xd7a64e,.35),y:.06}],
      bottle:  [{g:cy(.04,.04,.2,12),m:std(0xa8c98f,.3),y:.1},{g:cy(.02,.02,.04,10),m:std(0x3f8450,.4),y:.22}],
      noodle:  [{g:cy(.075,.055,.1,16),m:std(0xd2452b,.5),y:.05},{g:cy(.078,.078,.01,16),m:std(0xfffef3,.5),y:.105}],
      ice:     [{g:cy(.06,.045,.07,16),m:std(0xf2b8c8,.5),y:.035},{g:cy(.062,.062,.01,16),m:std(0xfffef3,.5),y:.075}],
      snackA:  [{g:R(.16,.22,.06,.01),m:std(0xf6f3e4,.6),y:.11}],
      snackB:  [{g:R(.16,.22,.06,.01),m:std(0x7e8ca8,.6),y:.11}],
      snackC:  [{g:R(.16,.22,.06,.01),m:std(0x1b3066,.55),y:.11}],
      snackD:  [{g:R(.16,.22,.06,.01),m:std(0xe48a3c,.6),y:.11}],
      drinkB:  [{g:cy(.04,.04,.2,12),m:std(0x2d57b8,.3),y:.1}],
      drinkR:  [{g:cy(.04,.04,.2,12),m:std(0xc8383a,.3),y:.1}],
    };
    this._kinds={};
    for(const [k,parts] of Object.entries(KINDS))this._kinds[k]={parts,mats:[],bay:[]};
    const put=(kind,code,x,y,z,rotY=0)=>{
      const K=this._kinds[kind];
      K.mats.push(new THREE.Matrix4().compose(V3(x,y,z),new THREE.Quaternion().setFromEuler(new THREE.Euler(0,rotY,0)),V3(1,1,1)));
      K.bay.push(code);
    };
    // rows: x from a to b, step s
    const row=(kind,code,xa,xb,y,z,s,rot=0)=>{for(let x=xa;x<=xb+1e-6;x+=s)put(kind,code,x,y,z,rot)};
    const rowZ=(kind,code,za,zb,y,x,s,rot=0)=>{for(let z=za;z<=zb+1e-6;z+=s)put(kind,code,x,y,z,rot)};
    const zc=-3.58;

    // C-01: bento ×2 shelves, onigiri, sandwich
    row('bento','C-01',-5.4,-2.95,.36,zc,.56);row('bento','C-01',-5.4,-2.95,.36,zc+.0,.56);
    row('bento','C-01',-5.4,-2.95,.86,zc,.56);
    row('onigiri','C-01',-5.5,-2.9,1.36,zc,.29);
    row('sandwich','C-01',-5.5,-2.9,1.86,zc,.4);
    // C-02: milk, eggs
    row('milk','C-02',-2.4,-.5,.36,zc,.13);row('milk','C-02',-2.4,-.5,.86,zc,.13);row('milk','C-02',-2.4,-.5,1.36,zc,.13);
    row('eggs','C-02',-2.35,-.55,1.86,zc,.27);
    // C-03: salad, desserts, drinks
    row('salad','C-03',-.1,1.9,.36,zc,.28);row('salad','C-03',-.1,1.9,.86,zc,.28);
    row('snackC','C-03',-.1,1.9,1.36,zc,.22);
    row('drinkB','C-03',-.1,1.9,1.86,zc,.1);
    // D-01: hot cans + bottles on the warmer shelves
    row('coffee','D-01',2.55,3.35,1.12,-2.55,.1);row('coffee','D-01',2.55,3.35,1.12,-2.35,.1);
    row('bottle','D-01',2.55,3.35,1.5,-2.55,.12);
    // gondolas — B-02 noodles, others generic snacks
    const gx0=-3.2,bw=1.3;
    const snacks=['snackA','snackB','snackC','snackD','drinkB','drinkR'];
    for(const g of this.gondolas)g.codes.forEach((code,i)=>{
      const xa=gx0+bw*i+.12,xb=gx0+bw*(i+1)-.12;
      for(let l=0;l<3;l++)for(const s of [-1,1]){
        const y=.44+l*.5,z=g.z+s*.28;
        if(code==='B-02')row('noodle',code,xa+.04,xb-.04,y,z,.17);
        else row(snacks[(i+l+(s>0?2:0))%snacks.length],code,xa,xb,y,z,.2);
      }
    });
    // left wall household
    for(let l=0;l<4;l++)rowZ(snacks[l%4],'A-01',-2.8,-.6,.32+l*.45,-5.72,.22);
    // freezer chest ice cups
    for(let i=0;i<8;i++)for(let j=0;j<3;j++)put('ice','F-01',3.6+i*.25,.84,1.65+j*.3);

    // instantiate
    this.instMeshes=[];
    for(const [kind,K] of Object.entries(this._kinds)){
      if(!K.mats.length)continue;
      K.parts.forEach(part=>{
        const im=new THREE.InstancedMesh(part.g,part.m,K.mats.length);
        im.castShadow=true;im.receiveShadow=true;im.frustumCulled=false;
        K.mats.forEach((mx,idx)=>{
          const m=mx.clone();m.elements[13]+=part.y;im.setMatrixAt(idx,m);
        });
        im.instanceMatrix.needsUpdate=true;
        im.userData={kind,part};
        this.root.add(im);this.instMeshes.push(im);
        (K.ims||(K.ims=[])).push(im);
      });
      K.orig=K.mats.map(m=>m.clone());
    }
    // map indices per bay+kind for fill control
    this._bayKinds={};
    for(const [kind,K] of Object.entries(this._kinds)){
      K.bay.forEach((code,idx)=>{((this._bayKinds[code]||(this._bayKinds[code]={}))[kind]||(this._bayKinds[code][kind]=[])).push(idx)});
    }
  }

  /* fill: show the first n% of a bay's primary product */
  setFill(code,ratio,dur=0){
    const b=this.bays[code];if(!b)return;
    const apply=r=>{
      b.fill=r;
      if(b.kind==='umbrella'){const n=Math.round(r*this.umbrellas.length);this.umbrellas.forEach((u,i)=>u.visible=i<n)}
      else if(b.kind==='raincoat'){const n=Math.round(r*this.raincoats.length);this.raincoats.forEach((u,i)=>u.visible=i<n)}
      else{
        const per=this._bayKinds[code];if(!per)return;
        const primary=this.PRIMARY[code];
        for(const [kind,idxs] of Object.entries(per)){
          if(primary&&!primary.includes(kind))continue;
          const K=this._kinds[kind];const n=Math.round(r*idxs.length);
          const zero=new THREE.Matrix4().makeScale(0,0,0);
          K.ims.forEach((im,pi)=>{
            const part=K.parts[pi];
            idxs.forEach((idx,j)=>{
              if(j<n){const m=K.orig[idx].clone();m.elements[13]+=part.y;im.setMatrixAt(idx,m)}
              else im.setMatrixAt(idx,zero);
            });
            im.instanceMatrix.needsUpdate=true;
          });
        }
      }
    };
    if(!dur){apply(ratio);return}
    gsap.killTweensOf(b,'fill');
    gsap.to(b,{fill:ratio,duration:dur,ease:'power2.inOut',onUpdate:()=>apply(b.fill)});
  }
  get PRIMARY(){return this._primary||(this._primary={'C-01':['bento'],'B-02':['noodle'],'D-01':['coffee'],'F-01':['ice'],'C-02':['milk'],'C-03':['salad']})}

  /* ───────────── locate beacon, halo ───────────── */
  _beacon(){
    const g=this.beacon=new THREE.Group();g.visible=false;
    const mat=new THREE.ShaderMaterial({
      transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,side:THREE.DoubleSide,
      uniforms:{uT:{value:0},uC:{value:C(PAL.lamp)},uO:{value:0}},
      vertexShader:`varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
      fragmentShader:`varying vec2 vUv;uniform float uT,uO;uniform vec3 uC;
        void main(){float a=pow(1.-vUv.y,1.6)*(.55+.45*sin(uT*3.+vUv.y*10.));
          float e=smoothstep(0.,.18,vUv.x)*smoothstep(1.,.82,vUv.x);gl_FragColor=vec4(uC,a*.5*uO*(.4+.6*e));}`});
    this._beaconMat=mat;
    const beam=new THREE.Mesh(new THREE.CylinderGeometry(.34,.5,4.2,32,1,true),mat);beam.position.y=2.1;g.add(beam);
    const ringMat=new THREE.MeshBasicMaterial({color:PAL.lamp,transparent:true,opacity:0,depthWrite:false,blending:THREE.AdditiveBlending,side:THREE.DoubleSide});
    this._ringMat=ringMat;
    const ring=new THREE.Mesh(new THREE.RingGeometry(.55,.62,64),ringMat);ring.rotation.x=-Math.PI/2;ring.position.y=.03;g.add(ring);
    this._ring=ring;
    const ring2=ring.clone();ring2.material=ringMat;g.add(ring2);this._ring2=ring2;
    // hover halo (lighter, follows the pointer)
    const hh=new THREE.LineBasicMaterial({color:0x0E1D40,transparent:true,opacity:0,depthWrite:false});
    this._hoverMat=hh;this._hoverHalo=new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(1,1,1)),hh);this._hoverHalo.visible=false;this.root.add(this._hoverHalo);
    // halo box
    const hm=new THREE.LineBasicMaterial({color:PAL.lamp,transparent:true,opacity:0,depthWrite:false,blending:THREE.AdditiveBlending});
    this._haloMat=hm;
    const halo=new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(1,1,1)),hm);g.add(halo);this._halo=halo;
    this.root.add(g);
  }
  locate(code,{camera=true,duration=2.1,keep=false,shot}={}){
    const b=this.bays[code];if(!b)return;
    this.located=code;
    const g=this.beacon;g.visible=true;
    g.position.set(b.center.x,0,b.center.z);
    this._halo.position.set(0,b.center.y,0);this._halo.scale.set(b.size.x+.12,b.size.y+.12,b.size.z+.12);
    gsap.killTweensOf([this._beaconMat.uniforms.uO,this._ringMat,this._haloMat]);
    gsap.to(this._beaconMat.uniforms.uO,{value:1,duration:.8,ease:'power2.out'});
    gsap.to(this._ringMat,{opacity:.9,duration:.6});
    gsap.to(this._haloMat,{opacity:.95,duration:.5});
    if(camera){
      const t=V3(b.center.x,Math.min(b.center.y,1.6)*.9+.2,b.center.z);
      const off=shot?.offset||[8.6,4.8,11.4];
      this.shot({pos:[t.x+off[0],t.y+off[1],t.z+off[2]],target:[t.x,t.y,t.z],fov:shot?.fov||23},{duration});
    }
    this._emit('locate',code);
  }
  hover(code){
    const b=code&&this.bays[code];
    if(!b||b.virtual){gsap.to(this._hoverMat,{opacity:0,duration:.2,onComplete:()=>{if(!this._hover)this._hoverHalo.visible=false}});return}
    this._hoverHalo.visible=true;this._hoverHalo.position.copy(b.center);this._hoverHalo.scale.set(b.size.x+.08,b.size.y+.08,b.size.z+.08);
    gsap.to(this._hoverMat,{opacity:.95,duration:.2});
  }
  clearLocate(){
    this.located=null;
    gsap.killTweensOf([this._beaconMat.uniforms.uO,this._ringMat,this._haloMat]);
    gsap.to(this._beaconMat.uniforms.uO,{value:0,duration:.5});
    gsap.to(this._ringMat,{opacity:0,duration:.5});
    gsap.to(this._haloMat,{opacity:0,duration:.5,onComplete:()=>{if(!this.located)this.beacon.visible=false}});
  }

  /* ───────────── scanner sheet ───────────── */
  _scanner(){
    const mat=this._scanMat=new THREE.ShaderMaterial({
      transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,side:THREE.DoubleSide,
      uniforms:{uO:{value:0},uC:{value:C(0x9fc3ff)}},
      vertexShader:`varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
      fragmentShader:`varying vec2 vUv;uniform float uO;uniform vec3 uC;
        void main(){float a=smoothstep(0.,1.,vUv.x);a=pow(a,5.);float edge=smoothstep(.985,1.,vUv.x)*1.4;
          float g=.35+.65*smoothstep(0.,.25,vUv.y)*smoothstep(1.,.75,vUv.y);
          gl_FragColor=vec4(uC,(a*.5+edge)*uO*g);}`});
    const sheet=new THREE.Mesh(new THREE.PlaneGeometry(2.6,3.4),mat);sheet.rotation.y=Math.PI/2;sheet.position.set(-6,1.6,0);
    // plane faces +x after rotation; stretch in z to cover the depth
    sheet.scale.set(8.4/2.6,1,1);sheet.visible=false;
    this.scanSheet=sheet;this.root.add(sheet);
  }
  scan(on){
    const s=this.scanSheet;
    if(this._scanTl){this._scanTl.kill();this._scanTl=null}
    if(!on){gsap.to(this._scanMat.uniforms.uO,{value:0,duration:.5,onComplete:()=>s.visible=false});return}
    s.visible=true;
    this._scanMat.uniforms.uO.value=0;
    const tl=this._scanTl=gsap.timeline({repeat:-1});
    tl.set(s.position,{x:-6});
    tl.to(this._scanMat.uniforms.uO,{value:1,duration:.4},0);
    tl.to(s.position,{x:6,duration:3.6,ease:'sine.inOut'},0);
    tl.to(this._scanMat.uniforms.uO,{value:0,duration:.5},3.1);
  }

  /* ───────────── stock heat strips ───────────── */
  _heat(){
    this.heatMeshes=[];
    for(const b of Object.values(this.bays)){
      if(b.code==='A-01'||b.virtual)continue;
      const w=Math.max(.6,b.size.x*.92),d=Math.max(.5,Math.min(b.size.z,1.0));
      const mat=this.M.heatOk.clone();
      const m=new THREE.Mesh(new THREE.PlaneGeometry(w,d+.4),mat);
      m.rotation.x=-Math.PI/2;m.position.set(b.center.x,.04,b.center.z+(b.size.z>1?.0:.3));
      m.visible=false;this.root.add(m);b.heat=m;this.heatMeshes.push(m);
    }
  }
  setHeat(on,levels={}){
    this._heatOn=on;
    for(const b of Object.values(this.bays)){
      if(!b.heat||b.virtual)continue;
      const lv=levels[b.code]??.7;
      const col=lv<.2?0xff6a5f:lv<.45?0xffc46b:0x7fe0ae;
      b.heat.material.color.set(col);b.heat.visible=true;
      gsap.to(b.heat.material,{opacity:on?.5:0,duration:.8,delay:on?Math.random()*.5:0,onComplete:()=>{if(!on)b.heat.visible=false}});
    }
  }

  /* ───────────── rain ───────────── */
  _rain(){
    const N=2600,pos=new Float32Array(N*2*3),seed=new Float32Array(N*2),end=new Float32Array(N*2);
    for(let i=0;i<N;i++){
      const x=(Math.random()-.5)*46,z=(Math.random()-.5)*40,s=Math.random();
      for(let k=0;k<2;k++){const o=(i*2+k)*3;pos[o]=x;pos[o+1]=0;pos[o+2]=z;seed[i*2+k]=s;end[i*2+k]=k}
    }
    const g=new THREE.BufferGeometry();
    g.setAttribute('position',new THREE.BufferAttribute(pos,3));g.setAttribute('aSeed',new THREE.BufferAttribute(seed,1));g.setAttribute('aEnd',new THREE.BufferAttribute(end,1));
    const m=this._rainMat=new THREE.ShaderMaterial({
      transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,
      uniforms:{uTime:{value:0},uH:{value:20},uLen:{value:.9},uO:{value:1},uC:{value:C(0xa9c4ff)}},
      vertexShader:`attribute float aSeed,aEnd;uniform float uTime,uH,uLen;varying float vA;
        void main(){vec3 p=position;float f=mod(uTime*(17.+aSeed*8.)+aSeed*uH*3.,uH);p.y=uH-f-aEnd*uLen;p.x+=(uH-p.y)*.1+aEnd*.1;
          vA=mix(1.,.0,aEnd)*smoothstep(0.,2.,p.y+1.)*(.35+aSeed*.65);gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);}`,
      fragmentShader:`uniform vec3 uC;uniform float uO;varying float vA;void main(){gl_FragColor=vec4(uC,vA*uO*.55);}`});
    const rain=this.rainMesh=new THREE.LineSegments(g,m);rain.frustumCulled=false;this.scene.add(rain);
  }
  rain(k,dur=1){this._rainLevel=this._rainLevel??{v:1};gsap.to(this._rainLevel,{v:k,duration:dur,ease:'power2.inOut'})}

  /* ───────────── post ───────────── */
  _post(){
    const r=this.renderer;
    this.composer=new EffectComposer(r);
    this.composer.addPass(new RenderPass(this.scene,this.cam));
    this.bloom=new UnrealBloomPass(new THREE.Vector2(256,256),NIGHT.bloom,.9,NIGHT.thr);
    this.composer.addPass(this.bloom);
    this.composer.addPass(new OutputPass());
  }

  /* ───────────── mood ───────────── */
  applyMood(k){
    this.k=k;
    // three keyframes: night (0) → dawn (.5) → day (1)
    const t=k<.5?k*2:(k-.5)*2,A=k<.5?NIGHT:DAWN,Bk=k<.5?DAWN:DAY;
    const L=key=>lerp(A[key],Bk[key],t);
    const col=key=>C(A[key]).lerp(C(Bk[key]),t);
    const bg=col('bg');
    this.scene.background=bg;this.scene.fog.color.copy(bg);this.scene.fog.density=L('fog');
    this.hemi.color.copy(col('hemiSky'));this.hemi.groundColor.copy(col('hemiGnd'));this.hemi.intensity=L('hemiI');
    this.key.color.copy(col('key'));this.key.intensity=L('keyI');
    // the sun climbs: low and from the left at dawn, higher at midday
    const sunY=k<.5?lerp(16,7,t):lerp(7,18,t),sunX=k<.5?lerp(-8,-16,t):lerp(-16,-6,t),sunZ=k<.5?lerp(12,10,t):lerp(10,9,t);
    this.key.position.set(sunX,sunY,sunZ);
    this.scene.environmentIntensity=L('env');
    this.emis.forEach(m=>m.emissiveIntensity=m.userData.base*L('emis'));
    this.lamps.forEach(p=>p.intensity=p.userData.base*L('lampI'));
    this.bloom.strength=L('bloom');this.bloom.threshold=L('thr');
    this.renderer.toneMappingExposure=L('exposure');
    this.M.ground.color.copy(col('ground'));this.M.ground.metalness=lerp(.55,.05,k);this.M.ground.roughness=lerp(.22,.8,k);
    this.M.floor.color.copy(C(PAL.floorN).lerp(C(PAL.floorD),Math.min(1,k*1.15)));
    this.M.paving.color.copy(col('pave'));this.M.paving.metalness=lerp(.15,.05,k);this.M.paving.roughness=lerp(.55,.85,k);
    this.M.edge.opacity=L('edge');this.M.edge.color.copy(C(0xfffef3).lerp(C(0x0E1D40),Math.max(0,(k-.5)*2)));
    this._rainMat.uniforms.uC.value.copy(C(0xa9c4ff).lerp(C(0x6f86b8),k));
    this.rainBase=L('rain');
    const dayLike=k>.6;
    if(this._beaconMat){
      const bl=dayLike?THREE.NormalBlending:THREE.AdditiveBlending,cc=dayLike?0xE8731A:PAL.lamp;
      if(this._beaconMat.blending!==bl){[this._beaconMat,this._ringMat,this._haloMat].forEach(m=>{m.blending=bl;m.needsUpdate=true})}
      this._beaconMat.uniforms.uC.value.set(cc);this._ringMat.color.set(cc);this._haloMat.color.set(cc);
    }
    document.documentElement.style.setProperty('--mood',k.toFixed(3));
  }
  mood(k,dur=2){
    if(this._moodTween)this._moodTween.kill();
    const o={v:this.k};
    if(!dur){this.applyMood(k);return null}
    return this._moodTween=gsap.to(o,{v:k,duration:dur,ease:'power2.inOut',onUpdate:()=>this.applyMood(o.v)});
  }
  setOpen(open,dur=.8){
    if(open===this._open)return;this._open=open;
    this.sign.material=open?this.signMats.open:this.signMats.closed;
  }

  /* ───────────── camera ───────────── */
  _applyCam(){
    const c=this.cam,s=this.camState;
    // pointer parallax: gentle orbit around the target
    const off=s.pos.clone().sub(s.target);
    const sph=new THREE.Spherical().setFromVector3(off);
    sph.theta+=this._pt.x*.07+s.yaw;sph.phi=Math.max(.2,Math.min(1.45,sph.phi-this._pt.y*.035));
    off.setFromSpherical(sph);
    c.position.copy(s.target).add(off);c.lookAt(s.target);
    if(c.fov!==s.fov){c.fov=s.fov;c.updateProjectionMatrix()}
  }
  shot(def,{duration=2.4,ease='power3.inOut',delay=0,instant=false}={}){
    const d=typeof def==='string'?SHOTS[def]:def;if(!d)return null;
    const s=this.camState;
    const to={px:d.pos[0],py:d.pos[1],pz:d.pos[2],tx:d.target[0],ty:d.target[1],tz:d.target[2],fov:d.fov};
    gsap.killTweensOf(this._camProxy||{});
    const p=this._camProxy={px:s.pos.x,py:s.pos.y,pz:s.pos.z,tx:s.target.x,ty:s.target.y,tz:s.target.z,fov:s.fov};
    const apply=()=>{s.pos.set(p.px,p.py,p.pz);s.target.set(p.tx,p.ty,p.tz);s.fov=p.fov};
    if(instant){Object.assign(p,to);apply();return null}
    return gsap.to(p,{...to,duration,ease,delay,onUpdate:apply});
  }
  /* drift: slow breathing orbit while idle */
  uiShift(f,dur=1.6){
    gsap.to(this,{_uiShift:f,duration:dur,ease:'power3.inOut'});
  }
  setPaused(p){this.paused=p}

  /* ───────────── pins (HTML anchored to bays) ───────────── */
  get _pv(){return this.__pv||(this.__pv=V3())}
  addPin(code,el,offset={x:0,y:0,z:0}){
    const pin={code,el,offset};this.pins.push(pin);return pin;
  }
  removePin(pin){this.pins=this.pins.filter(p=>p!==pin)}
  clearPins(){this.pins.length=0}
  project(v){
    const p=v.clone().project(this.cam);
    const w=this.canvas.clientWidth,h=this.canvas.clientHeight;
    return {x:(p.x*.5+.5)*w,y:(-p.y*.5+.5)*h,visible:p.z<1&&p.z>-1};
  }
  _updatePins(){
    for(const pin of this.pins){
      const b=this.bays[pin.code];if(!b)continue;
      const o=pin.offset||{};const sp=this.project(this._pv.set(b.anchor.x+(o.x||0),b.anchor.y+(o.y||0),b.anchor.z+(o.z||0)));
      pin.el.style.transform=`translate3d(${sp.x.toFixed(1)}px,${sp.y.toFixed(1)}px,0)`;
      pin.el.style.opacity=sp.visible?'':'0';
    }
  }

  /* ───────────── interaction ───────────── */
  _pick(){
    const rc=this.raycaster=new THREE.Raycaster();
    const hits=()=>Object.values(this.bays).filter(b=>b.hit).map(b=>b.hit);
    this.canvas.addEventListener('pointermove',e=>{
      if(!this.hoverCb&&!this.interactive)return;
      const r=this.canvas.getBoundingClientRect();
      const ndc=new THREE.Vector2((e.clientX-r.left)/r.width*2-1,-((e.clientY-r.top)/r.height*2-1));
      rc.setFromCamera(ndc,this.cam);
      const i=rc.intersectObjects(hits(),false)[0];
      const code=i?i.object.userData.bay:null;
      if(code!==this._hover){this._hover=code;this.hoverCb&&this.hoverCb(code)}
    });
    this.canvas.addEventListener('click',()=>{if(this._hover&&this.pickCb)this.pickCb(this._hover)});
  }
  _emit(){}

  /* ───────────── loop ───────────── */
  onFrame(fn){this._frameCbs.add(fn);return()=>this._frameCbs.delete(fn)}
  resize(){
    const w=innerWidth,h=innerHeight;
    this.renderer.setPixelRatio(this._dpr*this._quality);
    this.renderer.setSize(w,h,false);
    this.composer.setPixelRatio(this._dpr*this._quality);this.composer.setSize(w,h);
    this.cam.aspect=w/h;this.cam.updateProjectionMatrix();
    this.bloom.setSize(w*.5,h*.5);
  }
  _loop(now){
    requestAnimationFrame(this._loop);
    if(document.hidden)return;      // the hidden-tab heartbeat (below) drives frames instead
    this.step(now);
  }
  step(now){
    const dt=Math.min(.05,(now-this._last)/1000);this._last=now;
    if(this.paused)return;
    this.t+=dt;
    // smooth pointer
    this._pt.lerp(this._pointer,1-Math.pow(.001,dt));
    this._rainMat.uniforms.uTime.value=this.t;
    this._rainMat.uniforms.uO.value=(this._rainLevel?this._rainLevel.v:1)*(this.rainBase??1);
    this._beaconMat.uniforms.uT.value=this.t;
    if(this.beacon.visible){
      const ph=(this.t*.9)%1;
      this._ring.scale.setScalar(1+ph*1.6);this._ring.material.opacity=this._ringMat.opacity*(1-ph);
    }
    this._applyCam();
    // slide model under the UI via view offset
    const w=innerWidth,h=innerHeight;
    if(Math.abs(this._uiShift)>1e-4){this.cam.setViewOffset(w,h,-this._uiShift*w,0,w,h)}else if(this.cam.view&&this.cam.view.enabled){this.cam.clearViewOffset()}
    for(const fn of this._frameCbs)fn(dt,this.t);
    this.composer.render(dt);
    this._updatePins();
    // adaptive quality
    this._fpsAcc+=dt;this._fpsN++;
    if(this._fpsN>=90){
      const avg=this._fpsAcc/this._fpsN;this._fpsAcc=0;this._fpsN=0;
      if(avg>.026&&this._quality>.6){this._quality=Math.max(.6,this._quality-.2);this.resize()}
    }
  }
}
