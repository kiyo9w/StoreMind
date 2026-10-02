/* ─────────────────────────────────────────────────────────────────────────
   Procedural product models (no external assets).
   Used three ways: stock on the store's shelves, portrait thumbnails on the
   approval sheet (rendered once at boot), and the live turntable.
   Every model is normalised: base on y=0, centred on x/z, height = `h`.
   ───────────────────────────────────────────────────────────────────────── */
import * as THREE from 'three';
import {RoundedBoxGeometry} from 'three/addons/RoundedBoxGeometry.js';
import {RoomEnvironment} from 'three/addons/RoomEnvironment.js';

const clay =(c,r=.62)=>new THREE.MeshStandardMaterial({color:c,roughness:r,metalness:0});
const gloss=(c,r=.22)=>new THREE.MeshPhysicalMaterial({color:c,roughness:r,metalness:0,clearcoat:.7,clearcoatRoughness:.2});
const metal=(c,r=.3)=>new THREE.MeshStandardMaterial({color:c,roughness:r,metalness:.85});
const glass=(c,o=.38)=>new THREE.MeshPhysicalMaterial({color:c,roughness:.06,metalness:0,transparent:true,opacity:o,side:THREE.DoubleSide,depthWrite:false});
const mesh=(g,m,x=0,y=0,z=0)=>{const o=new THREE.Mesh(g,m);o.position.set(x,y,z);o.castShadow=true;o.receiveShadow=true;return o};
const rbox=(w,h,d,r=.08,s=3)=>new RoundedBoxGeometry(w,h,d,s,Math.min(r,w/2-.001,h/2-.001,d/2-.001));
const cyl=(rt,rb,h,seg=40)=>new THREE.CylinderGeometry(rt,rb,h,seg);

function triShape(w,h,r){ // rounded triangle, base on y=0
  const s=new THREE.Shape();
  const a=[-w/2,0],b=[w/2,0],c=[0,h];
  const lerp=(p,q,t)=>[p[0]+(q[0]-p[0])*t,p[1]+(q[1]-p[1])*t];
  const t=r;
  const A0=lerp(a,b,t),A1=lerp(a,b,1-t),B0=lerp(b,c,t),B1=lerp(b,c,1-t),C0=lerp(c,a,t),C1=lerp(c,a,1-t);
  s.moveTo(...A0);s.lineTo(...A1);s.quadraticCurveTo(...b,...B0);s.lineTo(...B1);s.quadraticCurveTo(...c,...C0);s.lineTo(...C1);s.quadraticCurveTo(...a,...A0);
  return s;
}

/* ───────── builders ───────── */
const B={};

B.umbrella=()=>{ // open vinyl umbrella
  const g=new THREE.Group();
  const R=1.5,th=Math.PI*.33;
  const canopy=new THREE.Mesh(new THREE.SphereGeometry(R,48,24,0,Math.PI*2,0,th),glass(0xcfe2ff,.62));
  canopy.position.y=1.1;canopy.castShadow=true;g.add(canopy);
  const ribMat=clay(0x13244f,.5);
  for(let i=0;i<8;i++){
    const a=i/8*Math.PI*2;
    const pts=[];
    for(let k=0;k<=12;k++){const t=k/12*th;pts.push(new THREE.Vector3(Math.sin(t)*R*Math.cos(a)*1.004,1.1+Math.cos(t)*R*1.004,Math.sin(t)*R*Math.sin(a)*1.004))}
    g.add(mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts),24,.018,6),ribMat));
  }
  g.add(mesh(cyl(.035,.035,2.7,12),metal(0xdfe3ea,.35),0,1.35,0));
  g.add(mesh(new THREE.SphereGeometry(.07,16,12),ribMat,0,2.62,0));
  const hook=new THREE.CatmullRomCurve3([new THREE.Vector3(0,.1,0),new THREE.Vector3(0,-.08,0),new THREE.Vector3(.12,-.2,0),new THREE.Vector3(.3,-.2,0),new THREE.Vector3(.42,-.08,0),new THREE.Vector3(.42,.05,0)]);
  g.add(mesh(new THREE.TubeGeometry(hook,24,.055,10),clay(0xfffef3,.45)));
  g.position.y=.22;
  g.rotation.z=.06;
  return g;
};
B.umbrellaClosed=()=>{
  const g=new THREE.Group();
  g.add(mesh(new THREE.ConeGeometry(.15,1.7,16),glass(0xcfe2ff,.7),0,1.1,0));
  g.add(mesh(cyl(.02,.02,2,8),metal(0xdfe3ea),0,1.0,0));
  g.add(mesh(new THREE.TorusGeometry(.1,.035,8,16,Math.PI),clay(0xfffef3),.1,.02,0));
  return g;
};

B.bento=()=>{
  const g=new THREE.Group();
  g.add(mesh(rbox(2.5,.42,1.75,.1),clay(0x182a55,.45),0,.21,0));
  const inner=(w,d,x,z,c,h=.16,rr=.05)=>g.add(mesh(rbox(w,h,d,rr),clay(c,.7),x,.46+h/2-.06,z));
  inner(1.0,1.4,-.62,0,0xfaf8ee,.26,.12);                 // rice
  for(let i=0;i<14;i++){g.add(mesh(new THREE.SphereGeometry(.028,6,5),clay(0x1a1a1a),-.62+(Math.sin(i*2.7)*.4),.77,(Math.cos(i*1.9)*.55)))}
  g.add(mesh(new THREE.SphereGeometry(.12,16,12),clay(0xc8383a,.5),-.62,.77,.0));  // umeboshi
  inner(.8,.5,.34,-.48,0xe48a3c,.2);                       // fish
  inner(.8,.42,.34,.02,0xf4d35e,.18);                      // tamago
  inner(.8,.4,.34,.5,0x4f9a5a,.16);                        // greens
  inner(.38,.5,.92,-.48,0xd45b7a,.14,.08);                 // pickles
  inner(.38,.5,.92,.2,0x8b5a3a,.16,.08);
  g.add(mesh(rbox(2.56,.1,1.8,.04),glass(0xdfeaff,.28),0,1.0,0));   // lid
  g.add(mesh(rbox(.62,.03,1.78,.015),clay(0xfffef3,.5),.0,1.065,0));// band
  const dot=mesh(new THREE.CircleGeometry(.14,24),clay(0xc8383a,.5),0,1.085,0);dot.rotation.x=-Math.PI/2;g.add(dot);
  return g;
};

B.milk=()=>{
  const g=new THREE.Group();
  g.add(mesh(rbox(.98,1.35,.98,.05),clay(0xfffef3,.45),0,.675,0));
  g.add(mesh(rbox(1.0,.46,1.0,.02),clay(0x2d57b8,.5),0,.4,0));
  const gable=new THREE.ExtrudeGeometry(triShape(.98,.5,0.001),{depth:.98,bevelEnabled:false});
  gable.translate(0,0,-.49);
  const gm=mesh(gable,clay(0xfffef3,.45),0,1.35,0);g.add(gm);
  g.add(mesh(rbox(.1,.14,.98,.02),clay(0xe9e5d2,.5),0,1.9,0));
  const dot=mesh(new THREE.CircleGeometry(.17,24),clay(0xc8383a,.5),0,.98,.495);g.add(dot);
  return g;
};

B.can=()=>{
  const g=new THREE.Group();
  g.add(mesh(cyl(.55,.55,1.5,48),gloss(0x3b2316,.28),0,.75,0));
  g.add(mesh(cyl(.552,.552,.34,48),gloss(0xd7a64e,.3),0,.78,0));
  g.add(mesh(cyl(.552,.552,.08,48),clay(0xc8383a,.4),0,1.08,0));
  g.add(mesh(cyl(.5,.55,.06,48),metal(0xc9ced6),0,1.52,0));
  g.add(mesh(cyl(.48,.48,.03,48),metal(0xe4e8ee),0,1.56,0));
  g.add(mesh(cyl(.55,.5,.06,48),metal(0xc9ced6),0,-.0+.03,0));
  return g;
};

B.noodle=()=>{
  const g=new THREE.Group();
  g.add(mesh(cyl(.95,.66,1.25,48),clay(0xd2452b,.5),0,.625,0));
  g.add(mesh(cyl(.9,.7,.34,48),clay(0xfffef3,.5),0,.42,0));
  g.add(mesh(cyl(.97,.97,.1,48),clay(0xfffef3,.5),0,1.28,0));
  g.add(mesh(cyl(.99,.99,.05,48),clay(0xd2452b,.5),0,1.33,0));
  const c1=mesh(cyl(.02,.02,1.7,8),clay(0xd8b88a),.15,1.5,.15);c1.rotation.z=1.3;g.add(c1);
  const c2=c1.clone();c2.position.set(.15,1.5,.3);g.add(c2);
  return g;
};

B.onigiri=()=>{
  const g=new THREE.Group();
  const D=.62;
  const geo=new THREE.ExtrudeGeometry(triShape(1.7,1.45,.18),{depth:D,bevelEnabled:true,bevelSize:.12,bevelThickness:.14,bevelSegments:5,curveSegments:10});
  geo.translate(0,0,-D/2);
  g.add(mesh(geo,clay(0xf8f6ea,.8),0,.12,0));
  // nori: thin plates wrapped over the front and back of the lower half
  const nShape=new THREE.Shape();
  nShape.moveTo(-.86,0);nShape.lineTo(.86,0);nShape.lineTo(.5,.62);nShape.lineTo(-.5,.62);nShape.closePath();
  const nGeo=new THREE.ExtrudeGeometry(nShape,{depth:D+.34,bevelEnabled:false});
  nGeo.translate(0,0,-(D+.34)/2);
  const nm=mesh(nGeo,clay(0x0f1722,.55),0,.12,0);nm.scale.set(1.0,1.0,1.0);g.add(nm);
  // the nori band only shows front/back, so wrap the rice sides with rice-coloured caps
  const dot=mesh(new THREE.CircleGeometry(.17,24),clay(0xe8825a,.6),0,.98,D/2+.15);g.add(dot);
  return g;
};

B.sandwich=()=>{
  const g=new THREE.Group();
  const layer=(c,y,h,k=1)=>{
    const gm=new THREE.ExtrudeGeometry(triShape(1.9*k,1.7*k,.05),{depth:h,bevelEnabled:true,bevelSize:.05,bevelThickness:.04,bevelSegments:3});
    gm.rotateX(-Math.PI/2);          // triangle now lies flat, extrusion goes up
    gm.translate(0,y,.0);
    return mesh(gm,clay(c,.8));
  };
  g.add(layer(0xd9ae6b,0,.22));
  g.add(layer(0xf7d44a,.26,.16,.97));
  g.add(layer(0xe9e4c8,.46,.06,.9));
  g.add(layer(0xd9ae6b,.54,.22));
  g.rotation.y=.35;
  return g;
};

B.salad=()=>{
  const g=new THREE.Group();
  const prof=[[0,0],[.55,0],[.75,.08],[.95,.55],[1.05,.62],[1.05,.7],[0,.7]].map(p=>new THREE.Vector2(p[0],p[1]));
  g.add(mesh(new THREE.LatheGeometry(prof,40),glass(0xe8f2f0,.32),0,0,0));
  const leafMats=[0x4f9a5a,0x7dbb63,0x3f8450,0x9ccf6e].map(c=>clay(c,.75));
  for(let i=0;i<16;i++){
    const m=mesh(new THREE.IcosahedronGeometry(.28+.1*((i*7)%3)/3,1),leafMats[i%4],Math.sin(i*2.4)*.55,.55+((i*3)%4)*.07,Math.cos(i*2.4)*.55);
    m.scale.set(1.1,.55,1.0);m.rotation.set(i,i*2,i*.5);g.add(m);
  }
  [[.1,.8,.2],[-.3,.78,-.25],[.35,.76,-.3]].forEach(p=>g.add(mesh(new THREE.SphereGeometry(.15,16,12),clay(0xd8432b,.45),...p)));
  [[-.1,.82,.4],[.4,.8,.1],[-.45,.8,.15]].forEach(p=>g.add(mesh(new THREE.SphereGeometry(.07,10,8),clay(0xf3cf4f,.5),...p)));
  const lid=new THREE.Mesh(new THREE.SphereGeometry(1.08,40,16,0,Math.PI*2,0,Math.PI*.3),glass(0xeaf3ff,.22));
  lid.position.y=.52;g.add(lid);
  return g;
};

B.ice=()=>{
  const g=new THREE.Group();
  g.add(mesh(cyl(.8,.6,1.0,48),clay(0xf2b8c8,.55),0,.5,0));
  g.add(mesh(cyl(.84,.84,.09,48),clay(0xfffef3,.5),0,1.04,0));
  g.add(mesh(cyl(.86,.86,.05,48),clay(0xf2b8c8,.5),0,1.1,0));
  g.add(mesh(cyl(.8,.8,.26,48),clay(0xfffef3,.5),0,.36,0));
  const sp=mesh(rbox(.12,.04,.9,.02),clay(0xd8b88a),.25,1.18,.3);sp.rotation.y=.5;g.add(sp);
  return g;
};

B.raincoat=()=>{
  const g=new THREE.Group();
  g.add(mesh(rbox(1.7,.24,2.2,.1),glass(0x4f8fd4,.85),0,.12,0));
  g.add(mesh(rbox(1.1,.05,.4,.02),clay(0xfffef3,.5),0,.27,.5));
  const hood=mesh(new THREE.SphereGeometry(.42,24,12,0,Math.PI*2,0,Math.PI/2),glass(0xcfe4ff,.9),0,.24,-.5);hood.scale.set(1,.45,1);g.add(hood);
  g.add(mesh(rbox(.38,.05,.38,.02),clay(0xc8383a,.5),-.5,.27,-.6));
  return g;
};

B.bottle=()=>{
  const g=new THREE.Group();
  const prof=[[0,0],[.42,0],[.5,.06],[.52,.2],[.52,1.35],[.45,1.65],[.22,1.9],[.2,2.05],[0,2.05]].map(p=>new THREE.Vector2(p[0],p[1]));
  g.add(mesh(new THREE.LatheGeometry(prof,40),glass(0xb7d49a,.55),0,0,0));
  const liq=[[0,.04],[.4,.04],[.48,.12],[.48,1.3],[.4,1.58],[0,1.6]].map(p=>new THREE.Vector2(p[0],p[1]));
  g.add(mesh(new THREE.LatheGeometry(liq,32),clay(0x8fa84a,.4),0,0,0));
  g.add(mesh(cyl(.235,.235,.18,24),clay(0x3f8450,.4),0,2.12,0));
  const label=mesh(new THREE.CylinderGeometry(.535,.535,.66,40,1,true),clay(0xfffef3,.55),0,.85,0);label.material.side=THREE.DoubleSide;g.add(label);
  g.add(mesh(new THREE.CylinderGeometry(.54,.54,.16,40,1,true),clay(0x3f8450,.5),0,.85,0));
  return g;
};

B.eggs=()=>{
  const g=new THREE.Group();
  g.add(mesh(rbox(2.0,.34,1.3,.1),clay(0xb9ae92,.9),0,.17,0));
  for(let i=0;i<3;i++)for(let j=0;j<2;j++){
    const e=mesh(new THREE.SphereGeometry(.3,24,16),clay(0xe0b283,.55),-.66+i*.66,.46,-.32+j*.64);e.scale.set(1,1.28,1);g.add(e);
  }
  const lid=new THREE.Group();
  lid.add(mesh(rbox(2.0,.14,1.3,.06),clay(0xb9ae92,.9),0,0,.65));
  lid.position.set(0,.34,-.65);lid.rotation.x=-1.25;g.add(lid);
  return g;
};

export const MODEL_IDS=Object.keys(B);

/* per-model framing for portraits: height, camera elevation */
export const VIEW={
  umbrella:{h:3.0,cy:3.2},
  bento:{h:3,w:3.1,cy:5.8,rot:-.4},
  milk:{h:2.5,cy:3.4},
  can:{h:2.2,cy:3.4},
  noodle:{h:2.0,cy:3.8},
  onigiri:{h:2.3,cy:3.2,rot:-.3},
  sandwich:{h:3,w:2.9,cy:5.4,rot:-.5},
  salad:{h:3,w:2.8,cy:4.8},
  ice:{h:1.9,cy:3.8},
  raincoat:{h:3,w:2.9,cy:6.2,rot:-.5},
  bottle:{h:2.9,cy:3.4},
  eggs:{h:3,w:2.9,cy:5.6,rot:-.45},
  umbrellaClosed:{h:2.6,cy:3.4},
};

/* normalise: base on y=0, centred, height h (limited by width too) */
export function buildProduct(model,h=2,w){
  const src=B[model]?B[model]():B.bento();
  const wrap=new THREE.Group();wrap.add(src);
  const box=new THREE.Box3().setFromObject(src);
  const size=box.getSize(new THREE.Vector3());
  const s=Math.min(h/Math.max(size.y,.0001), (w||h*2.2+.6)/Math.max(size.x,size.z,.0001));
  src.scale.setScalar(s);
  box.setFromObject(src);
  const c=box.getCenter(new THREE.Vector3());
  src.position.x-=c.x;src.position.z-=c.z;src.position.y-=box.min.y;
  wrap.userData.height=h;wrap.userData.fitH=new THREE.Box3().setFromObject(wrap).getSize(new THREE.Vector3()).y;
  return wrap;
}

/* ───────── portraits: render each model once to a PNG data-URL ───────── */
export function renderPortraits(items,{size=420}={}){
  const out={};
  const renderer=new THREE.WebGLRenderer({antialias:true,alpha:true,preserveDrawingBuffer:true});
  renderer.setPixelRatio(1);renderer.setSize(size,size,false);
  renderer.setClearColor(0x000000,0);
  renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.05;
  renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFShadowMap;
  const scene=new THREE.Scene();
  const pm=new THREE.PMREMGenerator(renderer);
  scene.environment=pm.fromScene(new RoomEnvironment(),.04).texture;
  scene.environmentIntensity=.9;
  const key=new THREE.DirectionalLight(0xfff3e0,2.2);key.position.set(3,6,4);key.castShadow=true;
  key.shadow.mapSize.set(1024,1024);key.shadow.camera.left=-3;key.shadow.camera.right=3;key.shadow.camera.top=3;key.shadow.camera.bottom=-3;key.shadow.radius=6;key.shadow.bias=-.0004;
  scene.add(key);
  const rim=new THREE.DirectionalLight(0xbcd2ff,1.1);rim.position.set(-4,3,-3);scene.add(rim);
  const floor=new THREE.Mesh(new THREE.PlaneGeometry(14,14),new THREE.ShadowMaterial({opacity:.28}));floor.rotation.x=-Math.PI/2;floor.receiveShadow=true;scene.add(floor);
  const cam=new THREE.PerspectiveCamera(24,1,.1,60);cam.position.set(4.6,3.4,6.4);cam.lookAt(0,1.0,0);scene.add(cam);
  for(const {id,model} of items){
    const v=VIEW[model]||{h:2.1,cy:3.4};
    const m=buildProduct(model,v.h,v.w);m.rotation.y=(v.rot??-.5);scene.add(m);
    cam.position.set(4.6,v.cy,6.4);cam.lookAt(0,Math.min(m.userData.fitH*.5,1.2),0);
    renderer.render(scene,cam);
    out[id]=renderer.domElement.toDataURL('image/png');
    scene.remove(m);
  }
  pm.dispose();renderer.dispose();renderer.forceContextLoss();
  return out;
}

/* ───────── live turntable on its own canvas ───────── */
export class Turntable{
  constructor(canvas){
    this.canvas=canvas;
    this.renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:true});
    this.renderer.setClearColor(0x000000,0);
    this.renderer.toneMapping=THREE.ACESFilmicToneMapping;this.renderer.toneMappingExposure=1.05;
    this.renderer.shadowMap.enabled=true;this.renderer.shadowMap.type=THREE.PCFShadowMap;
    this.scene=new THREE.Scene();
    const pm=new THREE.PMREMGenerator(this.renderer);
    this.scene.environment=pm.fromScene(new RoomEnvironment(),.04).texture;this.scene.environmentIntensity=.95;pm.dispose();
    const key=new THREE.DirectionalLight(0xfff3e0,2.2);key.position.set(3,6,4);key.castShadow=true;
    key.shadow.mapSize.set(1024,1024);key.shadow.camera.left=-3;key.shadow.camera.right=3;key.shadow.camera.top=3;key.shadow.camera.bottom=-3;key.shadow.radius=6;key.shadow.bias=-.0004;
    this.scene.add(key);
    const rim=new THREE.DirectionalLight(0xbcd2ff,1.0);rim.position.set(-4,3,-3);this.scene.add(rim);
    const floor=new THREE.Mesh(new THREE.PlaneGeometry(14,14),new THREE.ShadowMaterial({opacity:.22}));floor.rotation.x=-Math.PI/2;floor.receiveShadow=true;this.scene.add(floor);
    this.cam=new THREE.PerspectiveCamera(26,1,.1,60);this.cam.position.set(4.6,3.2,6.4);this.cam.lookAt(0,1.0,0);
    this.current=null;this.spin=0;this.running=false;this.speed=.35;
    this._tick=this._tick.bind(this);
  }
  set(model){
    if(this.current)this.scene.remove(this.current);
    const v=VIEW[model]||{h:2.1,cy:3.4};
    this.current=buildProduct(model,v.h,v.w);this.scene.add(this.current);
    this.current.rotation.y=this.spin;
    this.cam.position.set(4.6,v.cy,6.4);this.cam.lookAt(0,Math.min(this.current.userData.fitH*.5,1.2),0);
  }
  resize(){
    const w=this.canvas.clientWidth,h=this.canvas.clientHeight;if(!w||!h)return;
    const dpr=Math.min(window.devicePixelRatio||1,2);
    this.renderer.setPixelRatio(dpr);this.renderer.setSize(w,h,false);
    this.cam.aspect=w/h;this.cam.updateProjectionMatrix();
  }
  start(){if(this.running)return;this.running=true;this.last=performance.now();requestAnimationFrame(this._tick)}
  stop(){this.running=false}
  _tick(t){
    if(!this.running)return;
    const dt=Math.min(.05,(t-this.last)/1000);this.last=t;
    this.spin+=dt*this.speed;
    if(this.current)this.current.rotation.y=this.spin;
    this.renderer.render(this.scene,this.cam);
    requestAnimationFrame(this._tick);
  }
  dispose(){this.running=false;this.renderer.dispose();this.renderer.forceContextLoss()}
}
