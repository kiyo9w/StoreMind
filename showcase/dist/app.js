(()=>{var Iu=0,Zc=1,Lu=2;var tn=1,Du=2,Zs=3,On=0,Je=1,We=2,Ci=0,Bn=1,yi=2,Jc=3,Kc=4,Nu=5;var as=100,Uu=101,Fu=102,Ou=103,Bu=104,ku=200,zu=201,Hu=202,Vu=203,jc=204,Qc=205,Gu=206,Wu=207,$u=208,Xu=209,qu=210,Yu=211,Zu=212,Ju=213,Ku=214,ao=0,oo=1,lo=2,Ds=3,co=4,ho=5,uo=6,fo=7,$o=0,ju=1,Qu=2,Hi=0,ta=1,ea=2,ia=3,en=4,na=5,sa=6,ra=7;var th=300,kn=301,os=302,Xo=303,qo=304,aa=306,Ns=1e3,Zi=1001,po=1002,Ge=1003,td=1004;var oa=1005;var Ze=1006,Yo=1007;var zn=1008;var ui=1009,eh=1010,ih=1011,Js=1012,Zo=1013,Vi=1014,Ri=1015,Ke=1016,Jo=1017,Ko=1018,Ks=1020,nh=35902,sh=35899,rh=1021,ah=1022,Pi=1023,Ji=1026,Hn=1027,jo=1028,Qo=1029,Vn=1030,tl=1031;var el=1033,la=33776,ca=33777,ha=33778,ua=33779,il=35840,nl=35841,sl=35842,rl=35843,al=36196,ol=37492,ll=37496,cl=37488,hl=37489,da=37490,ul=37491,dl=37808,fl=37809,pl=37810,ml=37811,gl=37812,xl=37813,_l=37814,vl=37815,yl=37816,Ml=37817,bl=37818,Sl=37819,wl=37820,El=37821,Tl=36492,Al=36494,Cl=36495,Rl=36283,Pl=36284,fa=36285,Il=36286;var Mr=2300,mo=2301,no=2302,Oc=2303,Bc=2400,kc=2401,zc=2402;var ed=3200;var pa=0,id=1,mn="",qe="srgb",br="srgb-linear",Sr="linear",ce="srgb";var so=7680;var nd=519,sd=512,rd=513,ad=514,Ll=515,od=516,ld=517,Dl=518,cd=519,hd=35044;var oh="300 es",ki=2e3,Us=2001;function Nf(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function Uf(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}function wr(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function ud(){let n=wr("canvas");return n.style.display="block",n}var Jh={},Fs=null;function lh(...n){let t="THREE."+n.shift();Fs?Fs("log",t,...n):console.log(t,...n)}function dd(n){let t=n[0];if(typeof t=="string"&&t.startsWith("TSL:")){let e=n[1];e&&e.isStackTrace?n[0]+=" "+e.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Ot(...n){n=dd(n);let t="THREE."+n.shift();if(Fs)Fs("warn",t,...n);else{let e=n[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...n)}}function Ht(...n){n=dd(n);let t="THREE."+n.shift();if(Fs)Fs("error",t,...n);else{let e=n[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...n)}}function jn(...n){let t=n.join(" ");t in Jh||(Jh[t]=!0,Ot(...n))}function fd(n,t,e){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(t,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:i()}}setTimeout(r,e)})}var pd={[ao]:oo,[lo]:uo,[co]:fo,[Ds]:ho,[oo]:ao,[uo]:lo,[fo]:co,[ho]:Ds},Ki=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){let i=this._listeners;return i===void 0?!1:i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){let i=this._listeners;if(i===void 0)return;let s=i[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let i=e[t.type];if(i!==void 0){t.target=this;let s=i.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}},ei=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var ro=Math.PI/180,go=180/Math.PI;function js(){let n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(ei[n&255]+ei[n>>8&255]+ei[n>>16&255]+ei[n>>24&255]+"-"+ei[t&255]+ei[t>>8&255]+"-"+ei[t>>16&15|64]+ei[t>>24&255]+"-"+ei[e&63|128]+ei[e>>8&255]+"-"+ei[e>>16&255]+ei[e>>24&255]+ei[i&255]+ei[i>>8&255]+ei[i>>16&255]+ei[i>>24&255]).toLowerCase()}function Jt(n,t,e){return Math.max(t,Math.min(e,n))}function Ff(n,t){return(n%t+t)%t}function hc(n,t,e){return(1-e)*n+e*t}function hr(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:case Uint8ClampedArray:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function ci(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var ph=class ph{constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,i=this.y,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6],this.y=s[1]*e+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Jt(this.x,t.x,e.x),this.y=Jt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Jt(this.x,t,e),this.y=Jt(this.y,t,e),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Jt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let i=this.dot(t)/e;return Math.acos(Jt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let i=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*i-a*s+t.x,this.y=r*s+a*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};ph.prototype.isVector2=!0;var it=ph,Ti=class{constructor(t=0,e=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=s}static slerpFlat(t,e,i,s,r,a,o){let l=i[s+0],c=i[s+1],h=i[s+2],f=i[s+3],u=r[a+0],d=r[a+1],g=r[a+2],v=r[a+3];if(f!==v||l!==u||c!==d||h!==g){let m=l*u+c*d+h*g+f*v;m<0&&(u=-u,d=-d,g=-g,v=-v,m=-m);let p=1-o;if(m<.9995){let b=Math.acos(m),E=Math.sin(b);p=Math.sin(p*b)/E,o=Math.sin(o*b)/E,l=l*p+u*o,c=c*p+d*o,h=h*p+g*o,f=f*p+v*o}else{l=l*p+u*o,c=c*p+d*o,h=h*p+g*o,f=f*p+v*o;let b=1/Math.sqrt(l*l+c*c+h*h+f*f);l*=b,c*=b,h*=b,f*=b}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=f}static multiplyQuaternionsFlat(t,e,i,s,r,a){let o=i[s],l=i[s+1],c=i[s+2],h=i[s+3],f=r[a],u=r[a+1],d=r[a+2],g=r[a+3];return t[e]=o*g+h*f+l*d-c*u,t[e+1]=l*g+h*u+c*f-o*d,t[e+2]=c*g+h*d+o*u-l*f,t[e+3]=h*g-o*f-l*u-c*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,s){return this._x=t,this._y=e,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let i=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(i/2),h=o(s/2),f=o(r/2),u=l(i/2),d=l(s/2),g=l(r/2);switch(a){case"XYZ":this._x=u*h*f+c*d*g,this._y=c*d*f-u*h*g,this._z=c*h*g+u*d*f,this._w=c*h*f-u*d*g;break;case"YXZ":this._x=u*h*f+c*d*g,this._y=c*d*f-u*h*g,this._z=c*h*g-u*d*f,this._w=c*h*f+u*d*g;break;case"ZXY":this._x=u*h*f-c*d*g,this._y=c*d*f+u*h*g,this._z=c*h*g+u*d*f,this._w=c*h*f-u*d*g;break;case"ZYX":this._x=u*h*f-c*d*g,this._y=c*d*f+u*h*g,this._z=c*h*g-u*d*f,this._w=c*h*f+u*d*g;break;case"YZX":this._x=u*h*f+c*d*g,this._y=c*d*f+u*h*g,this._z=c*h*g-u*d*f,this._w=c*h*f-u*d*g;break;case"XZY":this._x=u*h*f-c*d*g,this._y=c*d*f-u*h*g,this._z=c*h*g+u*d*f,this._w=c*h*f+u*d*g;break;default:Ot("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let i=e/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,i=e[0],s=e[4],r=e[8],a=e[1],o=e[5],l=e[9],c=e[2],h=e[6],f=e[10],u=i+o+f;if(u>0){let d=.5/Math.sqrt(u+1);this._w=.25/d,this._x=(h-l)*d,this._y=(r-c)*d,this._z=(a-s)*d}else if(i>o&&i>f){let d=2*Math.sqrt(1+i-o-f);this._w=(h-l)/d,this._x=.25*d,this._y=(s+a)/d,this._z=(r+c)/d}else if(o>f){let d=2*Math.sqrt(1+o-i-f);this._w=(r-c)/d,this._x=(s+a)/d,this._y=.25*d,this._z=(l+h)/d}else{let d=2*Math.sqrt(1+f-i-o);this._w=(a-s)/d,this._x=(r+c)/d,this._y=(l+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<1e-8?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Jt(this.dot(t),-1,1)))}rotateTowards(t,e){let i=this.angleTo(t);if(i===0)return this;let s=Math.min(1,e/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let i=t._x,s=t._y,r=t._z,a=t._w,o=e._x,l=e._y,c=e._z,h=e._w;return this._x=i*h+a*o+s*c-r*l,this._y=s*h+a*l+r*o-i*c,this._z=r*h+a*c+i*l-s*o,this._w=a*h-i*o-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){let i=t._x,s=t._y,r=t._z,a=t._w,o=this.dot(t);o<0&&(i=-i,s=-s,r=-r,a=-a,o=-o);let l=1-e;if(o<.9995){let c=Math.acos(o),h=Math.sin(c);l=Math.sin(l*c)/h,e=Math.sin(e*c)/h,this._x=this._x*l+i*e,this._y=this._y*l+s*e,this._z=this._z*l+r*e,this._w=this._w*l+a*e,this._onChangeCallback()}else this._x=this._x*l+i*e,this._y=this._y*l+s*e,this._z=this._z*l+r*e,this._w=this._w*l+a*e,this.normalize();return this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},mh=class mh{constructor(t=0,e=0,i=0){this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Kh.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Kh.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6]*s,this.y=r[1]*e+r[4]*i+r[7]*s,this.z=r[2]*e+r[5]*i+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,i=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*i+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*i+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*i+r[10]*s+r[14])*a,this}applyQuaternion(t){let e=this.x,i=this.y,s=this.z,r=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*s-o*i),h=2*(o*e-r*s),f=2*(r*i-a*e);return this.x=e+l*c+a*f-o*h,this.y=i+l*h+o*c-r*f,this.z=s+l*f+r*h-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*s,this.y=r[1]*e+r[5]*i+r[9]*s,this.z=r[2]*e+r[6]*i+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Jt(this.x,t.x,e.x),this.y=Jt(this.y,t.y,e.y),this.z=Jt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Jt(this.x,t,e),this.y=Jt(this.y,t,e),this.z=Jt(this.z,t,e),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Jt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let i=t.x,s=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=s*l-r*o,this.y=r*a-i*l,this.z=i*o-s*a,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return uc.copy(this).projectOnVector(t),this.sub(uc)}reflect(t){return this.sub(uc.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let i=this.dot(t)/e;return Math.acos(Jt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return e*e+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){let s=Math.sin(e)*t;return this.x=s*Math.sin(i),this.y=Math.cos(e)*t,this.z=s*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};mh.prototype.isVector3=!0;var R=mh,uc=new R,Kh=new Ti,gh=class gh{constructor(t,e,i,s,r,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,a,o,l,c)}set(t,e,i,s,r,a,o,l,c){let h=this.elements;return h[0]=t,h[1]=s,h[2]=o,h[3]=e,h[4]=r,h[5]=l,h[6]=i,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let i=t.elements,s=e.elements,r=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],h=i[4],f=i[7],u=i[2],d=i[5],g=i[8],v=s[0],m=s[3],p=s[6],b=s[1],E=s[4],y=s[7],w=s[2],S=s[5],C=s[8];return r[0]=a*v+o*b+l*w,r[3]=a*m+o*E+l*S,r[6]=a*p+o*y+l*C,r[1]=c*v+h*b+f*w,r[4]=c*m+h*E+f*S,r[7]=c*p+h*y+f*C,r[2]=u*v+d*b+g*w,r[5]=u*m+d*E+g*S,r[8]=u*p+d*y+g*C,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8];return e*a*h-e*o*c-i*r*h+i*o*l+s*r*c-s*a*l}invert(){let t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],f=h*a-o*c,u=o*l-h*r,d=c*r-a*l,g=e*f+i*u+s*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let v=1/g;return t[0]=f*v,t[1]=(s*c-h*i)*v,t[2]=(o*i-s*a)*v,t[3]=u*v,t[4]=(h*e-s*l)*v,t[5]=(s*r-o*e)*v,t[6]=d*v,t[7]=(i*l-c*e)*v,t[8]=(a*e-i*r)*v,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,s,r,a,o){let l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*a+c*o)+a+t,-s*c,s*l,-s*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return jn("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(dc.makeScale(t,e)),this}rotate(t){return jn("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(dc.makeRotation(-t)),this}translate(t,e){return jn("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(dc.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,i=t.elements;for(let s=0;s<9;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){let i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}};gh.prototype.isMatrix3=!0;var Xt=gh,dc=new Xt,jh=new Xt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Qh=new Xt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Of(){let n={enabled:!0,workingColorSpace:br,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===ce&&(s.r=dn(s.r),s.g=dn(s.g),s.b=dn(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===ce&&(s.r=Ls(s.r),s.g=Ls(s.g),s.b=Ls(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===mn?Sr:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return jn("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return jn("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[br]:{primaries:t,whitePoint:i,transfer:Sr,toXYZ:jh,fromXYZ:Qh,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:qe},outputColorSpaceConfig:{drawingBufferColorSpace:qe}},[qe]:{primaries:t,whitePoint:i,transfer:ce,toXYZ:jh,fromXYZ:Qh,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:qe}}}),n}var ie=Of();function dn(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Ls(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}var _s,xo=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let i;if(t instanceof HTMLCanvasElement)i=t;else{_s===void 0&&(_s=wr("canvas")),_s.width=t.width,_s.height=t.height;let s=_s.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),i=_s}return i.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=wr("canvas");e.width=t.width,e.height=t.height;let i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);let s=i.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=dn(r[a]/255)*255;return i.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(dn(e[i]/255)*255):e[i]=dn(e[i]);return{data:e,width:t.width,height:t.height}}else return Ot("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},Bf=0,Os=class{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Bf++}),this.uuid=js(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(fc(s[a].image)):r.push(fc(s[a]))}else r=fc(s);i.url=r}return e||(t.images[this.uuid]=i),i}};function fc(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?xo.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Ot("Texture: Unable to serialize Texture."),{})}var kf=0,pc=new R,ai=class n extends Ki{constructor(t=n.DEFAULT_IMAGE,e=n.DEFAULT_MAPPING,i=Zi,s=Zi,r=Ze,a=zn,o=Pi,l=ui,c=n.DEFAULT_ANISOTROPY,h=mn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:kf++}),this.uuid=js(),this.name="",this.source=new Os(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new it(0,0),this.repeat=new it(1,1),this.center=new it(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Xt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(pc).x}get height(){return this.source.getSize(pc).y}get depth(){return this.source.getSize(pc).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let e in t){let i=t[e];if(i===void 0){Ot(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){Ot(`Texture.setValues(): property '${e}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[e]=i}}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==th)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Ns:t.x=t.x-Math.floor(t.x);break;case Zi:t.x=t.x<0?0:1;break;case po:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Ns:t.y=t.y-Math.floor(t.y);break;case Zi:t.y=t.y<0?0:1;break;case po:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};ai.DEFAULT_IMAGE=null;ai.DEFAULT_MAPPING=th;ai.DEFAULT_ANISOTROPY=1;var xh=class xh{constructor(t=0,e=0,i=0,s=1){this.x=t,this.y=e,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,s){return this.x=t,this.y=e,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,i=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*i+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*i+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*i+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*i+a[11]*s+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,s,r,l=t.elements,c=l[0],h=l[4],f=l[8],u=l[1],d=l[5],g=l[9],v=l[2],m=l[6],p=l[10];if(Math.abs(h-u)<.01&&Math.abs(f-v)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+u)<.1&&Math.abs(f+v)<.1&&Math.abs(g+m)<.1&&Math.abs(c+d+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let E=(c+1)/2,y=(d+1)/2,w=(p+1)/2,S=(h+u)/4,C=(f+v)/4,_=(g+m)/4;return E>y&&E>w?E<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(E),s=S/i,r=C/i):y>w?y<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(y),i=S/s,r=_/s):w<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(w),i=C/r,s=_/r),this.set(i,s,r,e),this}let b=Math.sqrt((m-g)*(m-g)+(f-v)*(f-v)+(u-h)*(u-h));return Math.abs(b)<.001&&(b=1),this.x=(m-g)/b,this.y=(f-v)/b,this.z=(u-h)/b,this.w=Math.acos((c+d+p-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Jt(this.x,t.x,e.x),this.y=Jt(this.y,t.y,e.y),this.z=Jt(this.z,t.z,e.z),this.w=Jt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Jt(this.x,t,e),this.y=Jt(this.y,t,e),this.z=Jt(this.z,t,e),this.w=Jt(this.w,t,e),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Jt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};xh.prototype.isVector4=!0;var Ce=xh,_o=class extends Ki{constructor(t=1,e=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ze,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=i.depth,this.scissor=new Ce(0,0,t,e),this.scissorTest=!1,this.viewport=new Ce(0,0,t,e),this.textures=[];let s={width:t,height:e,depth:i.depth},r=new ai(s),a=i.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveColorBuffer=i.resolveColorBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.storeMultisampledColorBuffer=i.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=i.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=i.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(t={}){let e={minFilter:Ze,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=i,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,i=t.textures.length;e<i;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;let s=Object.assign({},t.textures[e].image);this.textures[e].source=new Os(s)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){let e=t.depthTexture.clone();e.renderTarget=null,this.depthTexture=e}else this.depthTexture=t.depthTexture;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},Be=class extends _o{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}},Er=class extends ai{constructor(t=null,e=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=Ge,this.minFilter=Ge,this.wrapR=Zi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var vo=class extends ai{constructor(t=null,e=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=Ge,this.minFilter=Ge,this.wrapR=Zi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}};var Wo=class Wo{constructor(t,e,i,s,r,a,o,l,c,h,f,u,d,g,v,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,a,o,l,c,h,f,u,d,g,v,m)}set(t,e,i,s,r,a,o,l,c,h,f,u,d,g,v,m){let p=this.elements;return p[0]=t,p[4]=e,p[8]=i,p[12]=s,p[1]=r,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=h,p[10]=f,p[14]=u,p[3]=d,p[7]=g,p[11]=v,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Wo().fromArray(this.elements)}copy(t){let e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){let e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),i.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();let e=this.elements,i=t.elements,s=1/vs.setFromMatrixColumn(t,0).length(),r=1/vs.setFromMatrixColumn(t,1).length(),a=1/vs.setFromMatrixColumn(t,2).length();return e[0]=i[0]*s,e[1]=i[1]*s,e[2]=i[2]*s,e[3]=0,e[4]=i[4]*r,e[5]=i[5]*r,e[6]=i[6]*r,e[7]=0,e[8]=i[8]*a,e[9]=i[9]*a,e[10]=i[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,i=t.x,s=t.y,r=t.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),f=Math.sin(r);if(t.order==="XYZ"){let u=a*h,d=a*f,g=o*h,v=o*f;e[0]=l*h,e[4]=-l*f,e[8]=c,e[1]=d+g*c,e[5]=u-v*c,e[9]=-o*l,e[2]=v-u*c,e[6]=g+d*c,e[10]=a*l}else if(t.order==="YXZ"){let u=l*h,d=l*f,g=c*h,v=c*f;e[0]=u+v*o,e[4]=g*o-d,e[8]=a*c,e[1]=a*f,e[5]=a*h,e[9]=-o,e[2]=d*o-g,e[6]=v+u*o,e[10]=a*l}else if(t.order==="ZXY"){let u=l*h,d=l*f,g=c*h,v=c*f;e[0]=u-v*o,e[4]=-a*f,e[8]=g+d*o,e[1]=d+g*o,e[5]=a*h,e[9]=v-u*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){let u=a*h,d=a*f,g=o*h,v=o*f;e[0]=l*h,e[4]=g*c-d,e[8]=u*c+v,e[1]=l*f,e[5]=v*c+u,e[9]=d*c-g,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){let u=a*l,d=a*c,g=o*l,v=o*c;e[0]=l*h,e[4]=v-u*f,e[8]=g*f+d,e[1]=f,e[5]=a*h,e[9]=-o*h,e[2]=-c*h,e[6]=d*f+g,e[10]=u-v*f}else if(t.order==="XZY"){let u=a*l,d=a*c,g=o*l,v=o*c;e[0]=l*h,e[4]=-f,e[8]=c*h,e[1]=u*f+v,e[5]=a*h,e[9]=d*f-g,e[2]=g*f-d,e[6]=o*h,e[10]=v*f+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(zf,t,Hf)}lookAt(t,e,i){let s=this.elements;return fi.subVectors(t,e),fi.lengthSq()===0&&(fi.z=1),fi.normalize(),Sn.crossVectors(i,fi),Sn.lengthSq()===0&&(Math.abs(i.z)===1?fi.x+=1e-4:fi.z+=1e-4,fi.normalize(),Sn.crossVectors(i,fi)),Sn.normalize(),Pa.crossVectors(fi,Sn),s[0]=Sn.x,s[4]=Pa.x,s[8]=fi.x,s[1]=Sn.y,s[5]=Pa.y,s[9]=fi.y,s[2]=Sn.z,s[6]=Pa.z,s[10]=fi.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let i=t.elements,s=e.elements,r=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],h=i[1],f=i[5],u=i[9],d=i[13],g=i[2],v=i[6],m=i[10],p=i[14],b=i[3],E=i[7],y=i[11],w=i[15],S=s[0],C=s[4],_=s[8],T=s[12],P=s[1],D=s[5],F=s[9],V=s[13],N=s[2],B=s[6],$=s[10],W=s[14],st=s[3],X=s[7],j=s[11],et=s[15];return r[0]=a*S+o*P+l*N+c*st,r[4]=a*C+o*D+l*B+c*X,r[8]=a*_+o*F+l*$+c*j,r[12]=a*T+o*V+l*W+c*et,r[1]=h*S+f*P+u*N+d*st,r[5]=h*C+f*D+u*B+d*X,r[9]=h*_+f*F+u*$+d*j,r[13]=h*T+f*V+u*W+d*et,r[2]=g*S+v*P+m*N+p*st,r[6]=g*C+v*D+m*B+p*X,r[10]=g*_+v*F+m*$+p*j,r[14]=g*T+v*V+m*W+p*et,r[3]=b*S+E*P+y*N+w*st,r[7]=b*C+E*D+y*B+w*X,r[11]=b*_+E*F+y*$+w*j,r[15]=b*T+E*V+y*W+w*et,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],i=t[4],s=t[8],r=t[12],a=t[1],o=t[5],l=t[9],c=t[13],h=t[2],f=t[6],u=t[10],d=t[14],g=t[3],v=t[7],m=t[11],p=t[15],b=l*d-c*u,E=o*d-c*f,y=o*u-l*f,w=a*d-c*h,S=a*u-l*h,C=a*f-o*h;return e*(v*b-m*E+p*y)-i*(g*b-m*w+p*S)+s*(g*E-v*w+p*C)-r*(g*y-v*S+m*C)}determinantAffine(){let t=this.elements,e=t[0],i=t[4],s=t[8],r=t[1],a=t[5],o=t[9],l=t[2],c=t[6],h=t[10];return e*(a*h-o*c)-i*(r*h-o*l)+s*(r*c-a*l)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=i),this}invert(){let t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],f=t[9],u=t[10],d=t[11],g=t[12],v=t[13],m=t[14],p=t[15],b=e*o-i*a,E=e*l-s*a,y=e*c-r*a,w=i*l-s*o,S=i*c-r*o,C=s*c-r*l,_=h*v-f*g,T=h*m-u*g,P=h*p-d*g,D=f*m-u*v,F=f*p-d*v,V=u*p-d*m,N=b*V-E*F+y*D+w*P-S*T+C*_;if(N===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let B=1/N;return t[0]=(o*V-l*F+c*D)*B,t[1]=(s*F-i*V-r*D)*B,t[2]=(v*C-m*S+p*w)*B,t[3]=(u*S-f*C-d*w)*B,t[4]=(l*P-a*V-c*T)*B,t[5]=(e*V-s*P+r*T)*B,t[6]=(m*y-g*C-p*E)*B,t[7]=(h*C-u*y+d*E)*B,t[8]=(a*F-o*P+c*_)*B,t[9]=(i*P-e*F-r*_)*B,t[10]=(g*S-v*y+p*b)*B,t[11]=(f*y-h*S-d*b)*B,t[12]=(o*T-a*D-l*_)*B,t[13]=(e*D-i*T+s*_)*B,t[14]=(v*E-g*w-m*b)*B,t[15]=(h*w-f*E+u*b)*B,this}scale(t){let e=this.elements,i=t.x,s=t.y,r=t.z;return e[0]*=i,e[4]*=s,e[8]*=r,e[1]*=i,e[5]*=s,e[9]*=r,e[2]*=i,e[6]*=s,e[10]*=r,e[3]*=i,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,s))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let i=Math.cos(e),s=Math.sin(e),r=1-i,a=t.x,o=t.y,l=t.z,c=r*a,h=r*o;return this.set(c*a+i,c*o-s*l,c*l+s*o,0,c*o+s*l,h*o+i,h*l-s*a,0,c*l-s*o,h*l+s*a,r*l*l+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,s,r,a){return this.set(1,i,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,i){let s=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,c=r+r,h=a+a,f=o+o,u=r*c,d=r*h,g=r*f,v=a*h,m=a*f,p=o*f,b=l*c,E=l*h,y=l*f,w=i.x,S=i.y,C=i.z;return s[0]=(1-(v+p))*w,s[1]=(d+y)*w,s[2]=(g-E)*w,s[3]=0,s[4]=(d-y)*S,s[5]=(1-(u+p))*S,s[6]=(m+b)*S,s[7]=0,s[8]=(g+E)*C,s[9]=(m-b)*C,s[10]=(1-(u+v))*C,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,i){let s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];let r=this.determinantAffine();if(r===0)return i.set(1,1,1),e.identity(),this;let a=vs.set(s[0],s[1],s[2]).length(),o=vs.set(s[4],s[5],s[6]).length(),l=vs.set(s[8],s[9],s[10]).length();r<0&&(a=-a),Ui.copy(this);let c=1/a,h=1/o,f=1/l;return Ui.elements[0]*=c,Ui.elements[1]*=c,Ui.elements[2]*=c,Ui.elements[4]*=h,Ui.elements[5]*=h,Ui.elements[6]*=h,Ui.elements[8]*=f,Ui.elements[9]*=f,Ui.elements[10]*=f,e.setFromRotationMatrix(Ui),i.x=a,i.y=o,i.z=l,this}makePerspective(t,e,i,s,r,a,o=ki,l=!1){let c=this.elements,h=2*r/(e-t),f=2*r/(i-s),u=(e+t)/(e-t),d=(i+s)/(i-s),g,v;if(l)g=r/(a-r),v=a*r/(a-r);else if(o===ki)g=-(a+r)/(a-r),v=-2*a*r/(a-r);else if(o===Us)g=-a/(a-r),v=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=f,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=v,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,i,s,r,a,o=ki,l=!1){let c=this.elements,h=2/(e-t),f=2/(i-s),u=-(e+t)/(e-t),d=-(i+s)/(i-s),g,v;if(l)g=1/(a-r),v=a/(a-r);else if(o===ki)g=-2/(a-r),v=-(a+r)/(a-r);else if(o===Us)g=-1/(a-r),v=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=f,c[9]=0,c[13]=d,c[2]=0,c[6]=0,c[10]=g,c[14]=v,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){let e=this.elements,i=t.elements;for(let s=0;s<16;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){let i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}};Wo.prototype.isMatrix4=!0;var he=Wo,vs=new R,Ui=new he,zf=new R(0,0,0),Hf=new R(1,1,1),Sn=new R,Pa=new R,fi=new R,tu=new he,eu=new Ti,Ai=class n{constructor(t=0,e=0,i=0,s=n.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,s=this._order){return this._x=t,this._y=e,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){let s=t.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],h=s[9],f=s[2],u=s[6],d=s[10];switch(e){case"XYZ":this._y=Math.asin(Jt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Jt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin(Jt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-f,d),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Jt(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(u,d),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Jt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(o,d));break;case"XZY":this._z=Math.asin(-Jt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,d),this._y=0);break;default:Ot("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return tu.makeRotationFromQuaternion(t),this.setFromRotationMatrix(tu,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return eu.setFromEuler(this),this.setFromQuaternion(eu,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Ai.DEFAULT_ORDER="XYZ";var Bs=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},Vf=0,iu=new R,ys=new Ti,an=new he,Ia=new R,ur=new R,Gf=new R,Wf=new Ti,nu=new R(1,0,0),su=new R(0,1,0),ru=new R(0,0,1),au={type:"added"},$f={type:"removed"},Ms={type:"childadded",child:null},mc={type:"childremoved",child:null},ke=class n extends Ki{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Vf++}),this.uuid=js(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=n.DEFAULT_UP.clone();let t=new R,e=new Ai,i=new Ti,s=new R(1,1,1);function r(){i.setFromEuler(e,!1)}function a(){e.setFromQuaternion(i,void 0,!1)}e._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new he},normalMatrix:{value:new Xt}}),this.matrix=new he,this.matrixWorld=new he,this.matrixAutoUpdate=n.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Bs,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return ys.setFromAxisAngle(t,e),this.quaternion.multiply(ys),this}rotateOnWorldAxis(t,e){return ys.setFromAxisAngle(t,e),this.quaternion.premultiply(ys),this}rotateX(t){return this.rotateOnAxis(nu,t)}rotateY(t){return this.rotateOnAxis(su,t)}rotateZ(t){return this.rotateOnAxis(ru,t)}translateOnAxis(t,e){return iu.copy(t).applyQuaternion(this.quaternion),this.position.add(iu.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(nu,t)}translateY(t){return this.translateOnAxis(su,t)}translateZ(t){return this.translateOnAxis(ru,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(an.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?Ia.copy(t):Ia.set(t,e,i);let s=this.parent;this.updateWorldMatrix(!0,!1),ur.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?an.lookAt(ur,Ia,this.up):an.lookAt(Ia,ur,this.up),this.quaternion.setFromRotationMatrix(an),s&&(an.extractRotation(s.matrixWorld),ys.setFromRotationMatrix(an),this.quaternion.premultiply(ys.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(Ht("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(au),Ms.child=t,this.dispatchEvent(Ms),Ms.child=null):Ht("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent($f),mc.child=t,this.dispatchEvent(mc),mc.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),an.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),an.multiply(t.parent.matrixWorld)),t.applyMatrix4(an),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(au),Ms.child=t,this.dispatchEvent(Ms),Ms.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,s=this.children.length;i<s;i++){let a=this.children[i].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ur,t,Gf),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ur,Wf,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(t){t(this);let e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let t=this.pivot;if(t!==null){let e=t.x,i=t.y,s=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*i-r[8]*s,r[13]+=i-r[1]*e-r[5]*i-r[9]*s,r[14]+=s-r[2]*e-r[6]*i-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e,i=!1){let s=this.parent;if(t===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),e===!0){let r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,i)}}toJSON(t){let e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let f=l[c];r(t.shapes,f)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];s.animations.push(r(t.animations,l))}}if(e){let o=a(t.geometries),l=a(t.materials),c=a(t.textures),h=a(t.images),f=a(t.shapes),u=a(t.skeletons),d=a(t.animations),g=a(t.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),h.length>0&&(i.images=h),f.length>0&&(i.shapes=f),u.length>0&&(i.skeletons=u),d.length>0&&(i.animations=d),g.length>0&&(i.nodes=g)}return i.object=s,i;function a(o){let l=[];for(let c in o){let h=o[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){let s=t.children[i];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};ke.DEFAULT_UP=new R(0,1,0);ke.DEFAULT_MATRIX_AUTO_UPDATE=!0;ke.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var de=class extends ke{constructor(){super(),this.isGroup=!0,this.type="Group"}},Xf={type:"move"},ks=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new de,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new de,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new R,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new R),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new de,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new R,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new R,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let s=null,r=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(let v of t.hand.values()){let m=e.getJointPose(v,i),p=this._getHandJoint(c,v);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}let h=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],u=h.position.distanceTo(f.position),d=.02,g=.005;c.inputState.pinching&&u>d+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&u<=d-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:t,target:this})));o!==null&&(s=e.getPose(t.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Xf)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let i=new de;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}},md={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},wn={h:0,s:0,l:0},La={h:0,s:0,l:0};function gc(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}var Ft=class{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=qe){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ie.colorSpaceToWorking(this,e),this}setRGB(t,e,i,s=ie.workingColorSpace){return this.r=t,this.g=e,this.b=i,ie.colorSpaceToWorking(this,s),this}setHSL(t,e,i,s=ie.workingColorSpace){if(t=Ff(t,1),e=Jt(e,0,1),i=Jt(i,0,1),e===0)this.r=this.g=this.b=i;else{let r=i<=.5?i*(1+e):i+e-i*e,a=2*i-r;this.r=gc(a,r,t+1/3),this.g=gc(a,r,t),this.b=gc(a,r,t-1/3)}return ie.colorSpaceToWorking(this,s),this}setStyle(t,e=qe){function i(r){r!==void 0&&parseFloat(r)<1&&Ot("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:Ot("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);Ot("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=qe){let i=md[t.toLowerCase()];return i!==void 0?this.setHex(i,e):Ot("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=dn(t.r),this.g=dn(t.g),this.b=dn(t.b),this}copyLinearToSRGB(t){return this.r=Ls(t.r),this.g=Ls(t.g),this.b=Ls(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=qe){return ie.workingToColorSpace(ii.copy(this),t),Math.round(Jt(ii.r*255,0,255))*65536+Math.round(Jt(ii.g*255,0,255))*256+Math.round(Jt(ii.b*255,0,255))}getHexString(t=qe){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ie.workingColorSpace){ie.workingToColorSpace(ii.copy(this),e);let i=ii.r,s=ii.g,r=ii.b,a=Math.max(i,s,r),o=Math.min(i,s,r),l,c,h=(o+a)/2;if(o===a)l=0,c=0;else{let f=a-o;switch(c=h<=.5?f/(a+o):f/(2-a-o),a){case i:l=(s-r)/f+(s<r?6:0);break;case s:l=(r-i)/f+2;break;case r:l=(i-s)/f+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=ie.workingColorSpace){return ie.workingToColorSpace(ii.copy(this),e),t.r=ii.r,t.g=ii.g,t.b=ii.b,t}getStyle(t=qe){ie.workingToColorSpace(ii.copy(this),t);let e=ii.r,i=ii.g,s=ii.b;return t!==qe?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(t,e,i){return this.getHSL(wn),this.setHSL(wn.h+t,wn.s+e,wn.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(wn),t.getHSL(La);let i=hc(wn.h,La.h,e),s=hc(wn.s,La.s,e),r=hc(wn.l,La.l,e);return this.setHSL(i,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,i=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*i+r[6]*s,this.g=r[1]*e+r[4]*i+r[7]*s,this.b=r[2]*e+r[5]*i+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},ii=new Ft;Ft.NAMES=md;var Tr=class n{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new Ft(t),this.density=e}clone(){return new n(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}};var ji=class extends ke{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Ai,this.environmentIntensity=1,this.environmentRotation=new Ai,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e.object.backgroundBlurriness=this.backgroundBlurriness,e.object.backgroundIntensity=this.backgroundIntensity,e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentIntensity=this.environmentIntensity,e.object.environmentRotation=this.environmentRotation.toArray(),e}},Fi=new R,on=new R,xc=new R,ln=new R,bs=new R,Ss=new R,ou=new R,_c=new R,vc=new R,yc=new R,Mc=new Ce,bc=new Ce,Sc=new Ce,un=class n{constructor(t=new R,e=new R,i=new R){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,s){s.subVectors(i,e),Fi.subVectors(t,e),s.cross(Fi);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,i,s,r){Fi.subVectors(s,e),on.subVectors(i,e),xc.subVectors(t,e);let a=Fi.dot(Fi),o=Fi.dot(on),l=Fi.dot(xc),c=on.dot(on),h=on.dot(xc),f=a*c-o*o;if(f===0)return r.set(0,0,0),null;let u=1/f,d=(c*l-o*h)*u,g=(a*h-o*l)*u;return r.set(1-d-g,g,d)}static containsPoint(t,e,i,s){return this.getBarycoord(t,e,i,s,ln)===null?!1:ln.x>=0&&ln.y>=0&&ln.x+ln.y<=1}static getInterpolation(t,e,i,s,r,a,o,l){return this.getBarycoord(t,e,i,s,ln)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,ln.x),l.addScaledVector(a,ln.y),l.addScaledVector(o,ln.z),l)}static getInterpolatedAttribute(t,e,i,s,r,a){return Mc.setScalar(0),bc.setScalar(0),Sc.setScalar(0),Mc.fromBufferAttribute(t,e),bc.fromBufferAttribute(t,i),Sc.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(Mc,r.x),a.addScaledVector(bc,r.y),a.addScaledVector(Sc,r.z),a}static isFrontFacing(t,e,i,s){return Fi.subVectors(i,e),on.subVectors(t,e),Fi.cross(on).dot(s)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,s){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,i,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Fi.subVectors(this.c,this.b),on.subVectors(this.a,this.b),Fi.cross(on).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return n.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return n.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,s,r){return n.getInterpolation(t,this.a,this.b,this.c,e,i,s,r)}containsPoint(t){return n.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return n.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let i=this.a,s=this.b,r=this.c,a,o;bs.subVectors(s,i),Ss.subVectors(r,i),_c.subVectors(t,i);let l=bs.dot(_c),c=Ss.dot(_c);if(l<=0&&c<=0)return e.copy(i);vc.subVectors(t,s);let h=bs.dot(vc),f=Ss.dot(vc);if(h>=0&&f<=h)return e.copy(s);let u=l*f-h*c;if(u<=0&&l>=0&&h<=0)return a=l/(l-h),e.copy(i).addScaledVector(bs,a);yc.subVectors(t,r);let d=bs.dot(yc),g=Ss.dot(yc);if(g>=0&&d<=g)return e.copy(r);let v=d*c-l*g;if(v<=0&&c>=0&&g<=0)return o=c/(c-g),e.copy(i).addScaledVector(Ss,o);let m=h*g-d*f;if(m<=0&&f-h>=0&&d-g>=0)return ou.subVectors(r,s),o=(f-h)/(f-h+(d-g)),e.copy(s).addScaledVector(ou,o);let p=1/(m+v+u);return a=v*p,o=u*p,e.copy(i).addScaledVector(bs,a).addScaledVector(Ss,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},oi=class{constructor(t=new R(1/0,1/0,1/0),e=new R(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(Oi.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(Oi.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let i=Oi.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let i=t.geometry;if(i!==void 0){let r=i.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,Oi):Oi.fromBufferAttribute(r,a),Oi.applyMatrix4(t.matrixWorld),this.expandByPoint(Oi);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Da.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Da.copy(i.boundingBox)),Da.applyMatrix4(t.matrixWorld),this.union(Da)}let s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Oi),Oi.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(dr),Na.subVectors(this.max,dr),ws.subVectors(t.a,dr),Es.subVectors(t.b,dr),Ts.subVectors(t.c,dr),En.subVectors(Es,ws),Tn.subVectors(Ts,Es),qn.subVectors(ws,Ts);let e=[0,-En.z,En.y,0,-Tn.z,Tn.y,0,-qn.z,qn.y,En.z,0,-En.x,Tn.z,0,-Tn.x,qn.z,0,-qn.x,-En.y,En.x,0,-Tn.y,Tn.x,0,-qn.y,qn.x,0];return!wc(e,ws,Es,Ts,Na)||(e=[1,0,0,0,1,0,0,0,1],!wc(e,ws,Es,Ts,Na))?!1:(Ua.crossVectors(En,Tn),e=[Ua.x,Ua.y,Ua.z],wc(e,ws,Es,Ts,Na))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Oi).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Oi).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(cn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),cn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),cn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),cn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),cn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),cn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),cn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),cn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(cn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},cn=[new R,new R,new R,new R,new R,new R,new R,new R],Oi=new R,Da=new oi,ws=new R,Es=new R,Ts=new R,En=new R,Tn=new R,qn=new R,dr=new R,Na=new R,Ua=new R,Yn=new R;function wc(n,t,e,i,s){for(let r=0,a=n.length-3;r<=a;r+=3){Yn.fromArray(n,r);let o=s.x*Math.abs(Yn.x)+s.y*Math.abs(Yn.y)+s.z*Math.abs(Yn.z),l=t.dot(Yn),c=e.dot(Yn),h=i.dot(Yn);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}var Fe=new R,Fa=new it,qf=0,Ye=class extends Ki{constructor(t,e,i=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:qf++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=hd,this.updateRanges=[],this.gpuType=Ri,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[i+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)Fa.fromBufferAttribute(this,e),Fa.applyMatrix3(t),this.setXY(e,Fa.x,Fa.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)Fe.fromBufferAttribute(this,e),Fe.applyMatrix3(t),this.setXYZ(e,Fe.x,Fe.y,Fe.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)Fe.fromBufferAttribute(this,e),Fe.applyMatrix4(t),this.setXYZ(e,Fe.x,Fe.y,Fe.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)Fe.fromBufferAttribute(this,e),Fe.applyNormalMatrix(t),this.setXYZ(e,Fe.x,Fe.y,Fe.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)Fe.fromBufferAttribute(this,e),Fe.transformDirection(t),this.setXYZ(e,Fe.x,Fe.y,Fe.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=hr(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=ci(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=hr(e,this.array)),e}setX(t,e){return this.normalized&&(e=ci(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=hr(e,this.array)),e}setY(t,e){return this.normalized&&(e=ci(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=hr(e,this.array)),e}setZ(t,e){return this.normalized&&(e=ci(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=hr(e,this.array)),e}setW(t,e){return this.normalized&&(e=ci(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=ci(e,this.array),i=ci(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,s){return t*=this.itemSize,this.normalized&&(e=ci(e,this.array),i=ci(i,this.array),s=ci(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this}setXYZW(t,e,i,s,r){return t*=this.itemSize,this.normalized&&(e=ci(e,this.array),i=ci(i,this.array),s=ci(s,this.array),r=ci(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}};var Ar=class extends Ye{constructor(t,e,i){super(new Uint16Array(t),e,i)}};var Cr=class extends Ye{constructor(t,e,i){super(new Uint32Array(t),e,i)}};var Yt=class extends Ye{constructor(t,e,i){super(new Float32Array(t),e,i)}},Yf=new oi,fr=new R,Ec=new R,fn=class{constructor(t=new R,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let i=this.center;e!==void 0?i.copy(e):Yf.setFromPoints(t).getCenter(i);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,i.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;fr.subVectors(t,this.center);let e=fr.lengthSq();if(e>this.radius*this.radius){let i=Math.sqrt(e),s=(i-this.radius)*.5;this.center.addScaledVector(fr,s/i),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Ec.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(fr.copy(t.center).add(Ec)),this.expandByPoint(fr.copy(t.center).sub(Ec))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},Zf=0,Ei=new he,Tc=new ke,As=new R,pi=new oi,pr=new oi,Ve=new R,Te=class n extends Ki{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Zf++}),this.uuid=js(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Nf(t)?Cr:Ar)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let r=new Xt().getNormalMatrix(t);i.applyNormalMatrix(r),i.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return Ei.makeRotationFromQuaternion(t),this.applyMatrix4(Ei),this}rotateX(t){return Ei.makeRotationX(t),this.applyMatrix4(Ei),this}rotateY(t){return Ei.makeRotationY(t),this.applyMatrix4(Ei),this}rotateZ(t){return Ei.makeRotationZ(t),this.applyMatrix4(Ei),this}translate(t,e,i){return Ei.makeTranslation(t,e,i),this.applyMatrix4(Ei),this}scale(t,e,i){return Ei.makeScale(t,e,i),this.applyMatrix4(Ei),this}lookAt(t){return Tc.lookAt(t),Tc.updateMatrix(),this.applyMatrix4(Tc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(As).negate(),this.translate(As.x,As.y,As.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let i=[];for(let s=0,r=t.length;s<r;s++){let a=t[s];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Yt(i,3))}else{let i=Math.min(t.length,e.count);for(let s=0;s<i;s++){let r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&Ot("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new oi);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Ht("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new R(-1/0,-1/0,-1/0),new R(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,s=e.length;i<s;i++){let r=e[i];pi.setFromBufferAttribute(r),this.morphTargetsRelative?(Ve.addVectors(this.boundingBox.min,pi.min),this.boundingBox.expandByPoint(Ve),Ve.addVectors(this.boundingBox.max,pi.max),this.boundingBox.expandByPoint(Ve)):(this.boundingBox.expandByPoint(pi.min),this.boundingBox.expandByPoint(pi.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Ht('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new fn);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Ht("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new R,1/0);return}if(t){let i=this.boundingSphere.center;if(pi.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){let o=e[r];pr.setFromBufferAttribute(o),this.morphTargetsRelative?(Ve.addVectors(pi.min,pr.min),pi.expandByPoint(Ve),Ve.addVectors(pi.max,pr.max),pi.expandByPoint(Ve)):(pi.expandByPoint(pr.min),pi.expandByPoint(pr.max))}pi.getCenter(i);let s=0;for(let r=0,a=t.count;r<a;r++)Ve.fromBufferAttribute(t,r),s=Math.max(s,i.distanceToSquared(Ve));if(e)for(let r=0,a=e.length;r<a;r++){let o=e[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Ve.fromBufferAttribute(o,c),l&&(As.fromBufferAttribute(t,c),Ve.add(As)),s=Math.max(s,i.distanceToSquared(Ve))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Ht('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){Ht("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=e.position,s=e.normal,r=e.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==i.count)&&(a=new Ye(new Float32Array(4*i.count),4),this.setAttribute("tangent",a));let o=[],l=[];for(let _=0;_<i.count;_++)o[_]=new R,l[_]=new R;let c=new R,h=new R,f=new R,u=new it,d=new it,g=new it,v=new R,m=new R;function p(_,T,P){c.fromBufferAttribute(i,_),h.fromBufferAttribute(i,T),f.fromBufferAttribute(i,P),u.fromBufferAttribute(r,_),d.fromBufferAttribute(r,T),g.fromBufferAttribute(r,P),h.sub(c),f.sub(c),d.sub(u),g.sub(u);let D=1/(d.x*g.y-g.x*d.y);isFinite(D)&&(v.copy(h).multiplyScalar(g.y).addScaledVector(f,-d.y).multiplyScalar(D),m.copy(f).multiplyScalar(d.x).addScaledVector(h,-g.x).multiplyScalar(D),o[_].add(v),o[T].add(v),o[P].add(v),l[_].add(m),l[T].add(m),l[P].add(m))}let b=this.groups;b.length===0&&(b=[{start:0,count:t.count}]);for(let _=0,T=b.length;_<T;++_){let P=b[_],D=P.start,F=P.count;for(let V=D,N=D+F;V<N;V+=3)p(t.getX(V+0),t.getX(V+1),t.getX(V+2))}let E=new R,y=new R,w=new R,S=new R;function C(_){w.fromBufferAttribute(s,_),S.copy(w);let T=o[_];E.copy(T),E.sub(w.multiplyScalar(w.dot(T))).normalize(),y.crossVectors(S,T);let D=y.dot(l[_])<0?-1:1;a.setXYZW(_,E.x,E.y,E.z,D)}for(let _=0,T=b.length;_<T;++_){let P=b[_],D=P.start,F=P.count;for(let V=D,N=D+F;V<N;V+=3)C(t.getX(V+0)),C(t.getX(V+1)),C(t.getX(V+2))}this._transformed=!0}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==e.count)i=new Ye(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let u=0,d=i.count;u<d;u++)i.setXYZ(u,0,0,0);let s=new R,r=new R,a=new R,o=new R,l=new R,c=new R,h=new R,f=new R;if(t)for(let u=0,d=t.count;u<d;u+=3){let g=t.getX(u+0),v=t.getX(u+1),m=t.getX(u+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,v),a.fromBufferAttribute(e,m),h.subVectors(a,r),f.subVectors(s,r),h.cross(f),o.fromBufferAttribute(i,g),l.fromBufferAttribute(i,v),c.fromBufferAttribute(i,m),o.add(h),l.add(h),c.add(h),i.setXYZ(g,o.x,o.y,o.z),i.setXYZ(v,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let u=0,d=e.count;u<d;u+=3)s.fromBufferAttribute(e,u+0),r.fromBufferAttribute(e,u+1),a.fromBufferAttribute(e,u+2),h.subVectors(a,r),f.subVectors(s,r),h.cross(f),i.setXYZ(u+0,h.x,h.y,h.z),i.setXYZ(u+1,h.x,h.y,h.z),i.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)Ve.fromBufferAttribute(t,e),Ve.normalize(),t.setXYZ(e,Ve.x,Ve.y,Ve.z)}toNonIndexed(){function t(o,l){let c=o.array,h=o.itemSize,f=o.normalized,u=new c.constructor(l.length*h),d=0,g=0;for(let v=0,m=l.length;v<m;v++){o.isInterleavedBufferAttribute?d=l[v]*o.data.stride+o.offset:d=l[v]*h;for(let p=0;p<h;p++)u[g++]=c[d++]}return new Ye(u,h,f)}if(this.index===null)return Ot("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new n,i=this.index.array,s=this.attributes;for(let o in s){let l=s[o],c=t(l,i);e.setAttribute(o,c)}let r=this.morphAttributes;for(let o in r){let l=[],c=r[o];for(let h=0,f=c.length;h<f;h++){let u=c[h],d=t(u,i);l.push(d)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let i=this.attributes;for(let l in i){let c=i[l];t.data.attributes[l]=c.toJSON(t.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let f=0,u=c.length;f<u;f++){let d=c[f];h.push(d.toJSON(t.data))}h.length>0&&(s[l]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let i=t.index;i!==null&&this.setIndex(i.clone());let s=t.attributes;for(let c in s){let h=s[c];this.setAttribute(c,h.clone(e))}let r=t.morphAttributes;for(let c in r){let h=[],f=r[c];for(let u=0,d=f.length;u<d;u++)h.push(f[u].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;let a=t.groups;for(let c=0,h=a.length;c<h;c++){let f=a[c];this.addGroup(f.start,f.count,f.materialIndex)}let o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}};var Ac=new R,Jf=new R,Kf=new Xt,Bi=class{constructor(t=new R(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,s){return this.normal.set(t,e,i),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){let s=Ac.subVectors(i,e).cross(Jf.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,i=!0){let s=t.delta(Ac),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let a=-(t.start.dot(this.normal)+this.constant)/r;return i===!0&&(a<0||a>1)?null:e.copy(t.start).addScaledVector(s,a)}intersectsLine(t){let e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let i=e||Kf.getNormalMatrix(t),s=this.coplanarPoint(Ac).applyMatrix4(t),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}},jf=0,zi=class extends Ki{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:jf++}),this.uuid=js(),this.name="",this.type="Material",this.blending=Bn,this.side=On,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=jc,this.blendDst=Qc,this.blendEquation=as,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ft(0,0,0),this.blendAlpha=0,this.depthFunc=Ds,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=nd,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=so,this.stencilZFail=so,this.stencilZPass=so,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let i=t[e];if(i===void 0){Ot(`Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){Ot(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector2&&i&&i.isVector2||s&&s.isEuler&&i&&i.isEuler||s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[e]=i}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,i.blending=this.blending,i.side=this.side,i.shadowSide=this.shadowSide,i.vertexColors=this.vertexColors,i.opacity=this.opacity,i.transparent=this.transparent,i.blendSrc=this.blendSrc,i.blendDst=this.blendDst,i.blendEquation=this.blendEquation,i.blendSrcAlpha=this.blendSrcAlpha,i.blendDstAlpha=this.blendDstAlpha,i.blendEquationAlpha=this.blendEquationAlpha,i.blendColor=this.blendColor.getHex(),i.blendAlpha=this.blendAlpha,i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.clipIntersection=this.clipIntersection,i.clipShadows=this.clipShadows,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,i.stencilWrite=this.stencilWrite,i.polygonOffset=this.polygonOffset,i.polygonOffsetFactor=this.polygonOffsetFactor,i.polygonOffsetUnits=this.polygonOffsetUnits,i.dithering=this.dithering,i.alphaTest=this.alphaTest,i.alphaHash=this.alphaHash,i.alphaToCoverage=this.alphaToCoverage,i.premultipliedAlpha=this.premultipliedAlpha,i.forceSinglePass=this.forceSinglePass,i.allowOverride=this.allowOverride,i.visible=this.visible,i.toneMapped=this.toneMapped,i.name=this.name,this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(i.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(i.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(i.rotation=this.rotation),this.depthPacking!==void 0&&(i.depthPacking=this.depthPacking),this.linewidth!==void 0&&(i.linewidth=this.linewidth),this.linecap!==void 0&&(i.linecap=this.linecap),this.linejoin!==void 0&&(i.linejoin=this.linejoin),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.wireframe!==void 0&&(i.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(i.flatShading=this.flatShading),this.fog!==void 0&&(i.fog=this.fog),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){let a=[];for(let o in r){let l=r[o];delete l.metadata,a.push(l)}return a}if(e){let r=s(t.textures),a=s(t.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new Ft().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(i=>new Bi().fromJSON(i))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let i=t.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new it().fromArray(i)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new it().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,i=null;if(e!==null){let s=e.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=e[r].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}};var hn=new R,Cc=new R,Oa=new R,Ba=new R,zs=class{constructor(t=new R,e=new R(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,hn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=hn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(hn.copy(this.origin).addScaledVector(this.direction,e),hn.distanceToSquared(t))}distanceSqToSegment(t,e,i,s){Cc.copy(t).add(e).multiplyScalar(.5),Oa.copy(e).sub(t).normalize(),Ba.copy(this.origin).sub(Cc);let r=t.distanceTo(e)*.5,a=-this.direction.dot(Oa),o=Ba.dot(this.direction),l=-Ba.dot(Oa),c=Ba.lengthSq(),h=Math.abs(1-a*a),f,u,d,g;if(h>0)if(f=a*l-o,u=a*o-l,g=r*h,f>=0)if(u>=-g)if(u<=g){let v=1/h;f*=v,u*=v,d=f*(f+a*u+2*o)+u*(a*f+u+2*l)+c}else u=r,f=Math.max(0,-(a*u+o)),d=-f*f+u*(u+2*l)+c;else u=-r,f=Math.max(0,-(a*u+o)),d=-f*f+u*(u+2*l)+c;else u<=-g?(f=Math.max(0,-(-a*r+o)),u=f>0?-r:Math.min(Math.max(-r,-l),r),d=-f*f+u*(u+2*l)+c):u<=g?(f=0,u=Math.min(Math.max(-r,-l),r),d=u*(u+2*l)+c):(f=Math.max(0,-(a*r+o)),u=f>0?r:Math.min(Math.max(-r,-l),r),d=-f*f+u*(u+2*l)+c);else u=a>0?-r:r,f=Math.max(0,-(a*u+o)),d=-f*f+u*(u+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,f),s&&s.copy(Cc).addScaledVector(Oa,u),d}intersectSphere(t,e){if(t.radius<0)return null;hn.subVectors(t.center,this.origin);let i=hn.dot(this.direction),s=hn.dot(hn)-i*i,r=t.radius*t.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){let i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,s,r,a,o,l,c=1/this.direction.x,h=1/this.direction.y,f=1/this.direction.z,u=this.origin;return c>=0?(i=(t.min.x-u.x)*c,s=(t.max.x-u.x)*c):(i=(t.max.x-u.x)*c,s=(t.min.x-u.x)*c),h>=0?(r=(t.min.y-u.y)*h,a=(t.max.y-u.y)*h):(r=(t.max.y-u.y)*h,a=(t.min.y-u.y)*h),i>a||r>s||((r>i||isNaN(i))&&(i=r),(a<s||isNaN(s))&&(s=a),f>=0?(o=(t.min.z-u.z)*f,l=(t.max.z-u.z)*f):(o=(t.max.z-u.z)*f,l=(t.min.z-u.z)*f),i>l||o>s)||((o>i||i!==i)&&(i=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,e)}intersectsBox(t){return this.intersectBox(t,hn)!==null}intersectTriangle(t,e,i,s,r){let a=this.origin,o=this.direction,l=o.x,c=o.y,h=o.z,f=t.x-a.x,u=t.y-a.y,d=t.z-a.z,g=e.x-a.x,v=e.y-a.y,m=e.z-a.z,p=i.x-a.x,b=i.y-a.y,E=i.z-a.z,y=Math.abs(l),w=Math.abs(c),S=Math.abs(h),C,_,T,P,D,F,V,N,B,$,W,st;if(y>=w&&y>=S?(T=l,F=f,B=g,st=p,l>=0?(C=c,_=h,P=u,D=d,V=v,N=m,$=b,W=E):(C=h,_=c,P=d,D=u,V=m,N=v,$=E,W=b)):w>=S?(T=c,F=u,B=v,st=b,c>=0?(C=h,_=l,P=d,D=f,V=m,N=g,$=E,W=p):(C=l,_=h,P=f,D=d,V=g,N=m,$=p,W=E)):(T=h,F=d,B=m,st=E,h>=0?(C=l,_=c,P=f,D=u,V=g,N=v,$=p,W=b):(C=c,_=l,P=u,D=f,V=v,N=g,$=b,W=p)),T===0)return null;let X=C/T,j=_/T,et=1/T,Pt=P-X*F,wt=D-j*F,ue=V-X*B,ne=N-j*B,ae=$-X*st,Z=W-j*st,Q=ae*ne-Z*ue,xt=Pt*Z-wt*ae,Vt=ue*wt-ne*Pt;if(s){if(Q<0||xt<0||Vt<0)return null}else if((Q<0||xt<0||Vt<0)&&(Q>0||xt>0||Vt>0))return null;let Mt=Q+xt+Vt;if(Mt===0)return null;let Gt=et*(Q*F+xt*B+Vt*st);return(Mt>0?Gt<0:Gt>0)?null:this.at(Gt/Mt,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},ni=class extends zi{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ft(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ai,this.combine=$o,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},lu=new he,Zn=new zs,ka=new fn,cu=new R,za=new R,Ha=new R,Va=new R,Rc=new R,Ga=new R,hu=new R,Wa=new R,Qt=class extends ke{constructor(t=new Te,e=new ni){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){let s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){let i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;e.fromBufferAttribute(s,t);let o=this.morphTargetInfluences;if(r&&o){Ga.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=o[l],f=r[l];h!==0&&(Rc.fromBufferAttribute(f,t),a?Ga.addScaledVector(Rc,h):Ga.addScaledVector(Rc.sub(e),h))}e.add(Ga)}return e}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),ka.copy(i.boundingSphere),ka.applyMatrix4(r),Zn.copy(t.ray).recast(t.near),!(ka.containsPoint(Zn.origin)===!1&&(Zn.intersectSphere(ka,cu)===null||Zn.origin.distanceToSquared(cu)>(t.far-t.near)**2))&&(lu.copy(r).invert(),Zn.copy(t.ray).applyMatrix4(lu),!(i.boundingBox!==null&&Zn.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,Zn)))}_computeIntersections(t,e,i){let s,r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,f=r.attributes.normal,u=r.groups,d=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,v=u.length;g<v;g++){let m=u[g],p=a[m.materialIndex],b=Math.max(m.start,d.start),E=Math.min(o.count,Math.min(m.start+m.count,d.start+d.count));for(let y=b,w=E;y<w;y+=3){let S=o.getX(y),C=o.getX(y+1),_=o.getX(y+2);s=$a(this,p,t,i,c,h,f,S,C,_),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let g=Math.max(0,d.start),v=Math.min(o.count,d.start+d.count);for(let m=g,p=v;m<p;m+=3){let b=o.getX(m),E=o.getX(m+1),y=o.getX(m+2);s=$a(this,a,t,i,c,h,f,b,E,y),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,v=u.length;g<v;g++){let m=u[g],p=a[m.materialIndex],b=Math.max(m.start,d.start),E=Math.min(l.count,Math.min(m.start+m.count,d.start+d.count));for(let y=b,w=E;y<w;y+=3){let S=y,C=y+1,_=y+2;s=$a(this,p,t,i,c,h,f,S,C,_),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let g=Math.max(0,d.start),v=Math.min(l.count,d.start+d.count);for(let m=g,p=v;m<p;m+=3){let b=m,E=m+1,y=m+2;s=$a(this,a,t,i,c,h,f,b,E,y),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}};function Qf(n,t,e,i,s,r,a,o){let l;if(t.side===Je?l=i.intersectTriangle(a,r,s,!0,o):l=i.intersectTriangle(s,r,a,t.side===On,o),l===null)return null;Wa.copy(o),Wa.applyMatrix4(n.matrixWorld);let c=e.ray.origin.distanceTo(Wa);return c<e.near||c>e.far?null:{distance:c,point:Wa.clone(),object:n}}function $a(n,t,e,i,s,r,a,o,l,c){n.getVertexPosition(o,za),n.getVertexPosition(l,Ha),n.getVertexPosition(c,Va);let h=Qf(n,t,e,i,za,Ha,Va,hu);if(h){let f=new R;un.getBarycoord(hu,za,Ha,Va,f),s&&(h.uv=un.getInterpolatedAttribute(s,o,l,c,f,new it)),r&&(h.uv1=un.getInterpolatedAttribute(r,o,l,c,f,new it)),a&&(h.normal=un.getInterpolatedAttribute(a,o,l,c,f,new R),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));let u={a:o,b:l,c,normal:new R,materialIndex:0};un.getNormal(za,Ha,Va,u.normal),h.face=u,h.barycoord=f}return h}var Rr=class extends ai{constructor(t=null,e=1,i=1,s,r,a,o,l,c=Ge,h=Ge,f,u){super(null,a,o,l,c,h,s,r,f,u),this.isDataTexture=!0,this.image={data:t,width:e,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Pr=class extends Ye{constructor(t,e,i,s=1){super(t,e,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){let t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}},Cs=new he,uu=new he,Xa=[],du=new oi,tp=new he,mr=new Qt,gr=new fn,Qn=class extends Qt{constructor(t,e,i){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Pr(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<i;s++)this.setMatrixAt(s,tp)}computeBoundingBox(){let t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new oi),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,Cs),du.copy(t.boundingBox).applyMatrix4(Cs),this.boundingBox.union(du)}computeBoundingSphere(){let t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new fn),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,Cs),gr.copy(t.boundingSphere).applyMatrix4(Cs),this.boundingSphere.union(gr)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){return this.instanceColor===null?e.setRGB(1,1,1):e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){return e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){let i=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=i.length+1,a=t*r+1;for(let o=0;o<i.length;o++)i[o]=s[a+o]}raycast(t,e){let i=this.matrixWorld,s=this.count;if(mr.geometry=this.geometry,mr.material=this.material,mr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),gr.copy(this.boundingSphere),gr.applyMatrix4(i),t.ray.intersectsSphere(gr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Cs),uu.multiplyMatrices(i,Cs),mr.matrixWorld=uu,mr.raycast(t,Xa);for(let a=0,o=Xa.length;a<o;a++){let l=Xa[a];l.instanceId=r,l.object=this,e.push(l)}Xa.length=0}}setColorAt(t,e){return this.instanceColor===null&&(this.instanceColor=new Pr(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3),this}setMatrixAt(t,e){return e.toArray(this.instanceMatrix.array,t*16),this}setMorphAt(t,e){let i=e.morphTargetInfluences,s=i.length+1;this.morphTexture===null&&(this.morphTexture=new Rr(new Float32Array(s*this.count),s,this.count,jo,Ri));let r=this.morphTexture.source.data.data,a=0;for(let c=0;c<i.length;c++)a+=i[c];let o=this.geometry.morphTargetsRelative?1:1-a,l=s*t;return r[l]=o,r.set(i,l+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Jn=new fn,ep=new it(.5,.5),qa=new R,Hs=class{constructor(t=new Bi,e=new Bi,i=new Bi,s=new Bi,r=new Bi,a=new Bi){this.planes=[t,e,i,s,r,a]}set(t,e,i,s,r,a){let o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(i),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){let e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=ki,i=!1){let s=this.planes,r=t.elements,a=r[0],o=r[1],l=r[2],c=r[3],h=r[4],f=r[5],u=r[6],d=r[7],g=r[8],v=r[9],m=r[10],p=r[11],b=r[12],E=r[13],y=r[14],w=r[15];if(s[0].setComponents(c-a,d-h,p-g,w-b).normalize(),s[1].setComponents(c+a,d+h,p+g,w+b).normalize(),s[2].setComponents(c+o,d+f,p+v,w+E).normalize(),s[3].setComponents(c-o,d-f,p-v,w-E).normalize(),i)s[4].setComponents(l,u,m,y).normalize(),s[5].setComponents(c-l,d-u,p-m,w-y).normalize();else if(s[4].setComponents(c-l,d-u,p-m,w-y).normalize(),e===ki)s[5].setComponents(c+l,d+u,p+m,w+y).normalize();else if(e===Us)s[5].setComponents(l,u,m,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Jn.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Jn.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Jn)}intersectsSprite(t){Jn.center.set(0,0,0);let e=ep.distanceTo(t.center);return Jn.radius=.7071067811865476+e,Jn.applyMatrix4(t.matrixWorld),this.intersectsSphere(Jn)}intersectsSphere(t){let e=this.planes,i=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let i=0;i<6;i++){let s=e[i];if(qa.x=s.normal.x>0?t.max.x:t.min.x,qa.y=s.normal.y>0?t.max.y:t.min.y,qa.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(qa)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var Cn=class extends zi{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ft(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}},yo=new R,Mo=new R,fu=new he,xr=new zs,Ya=new fn,Pc=new R,pu=new R,bo=class extends ke{constructor(t=new Te,e=new Cn){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,i=[0];for(let s=1,r=e.count;s<r;s++)yo.fromBufferAttribute(e,s-1),Mo.fromBufferAttribute(e,s),i[s]=i[s-1],i[s]+=yo.distanceTo(Mo);t.setAttribute("lineDistance",new Yt(i,1))}else Ot("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let i=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Ya.copy(i.boundingSphere),Ya.applyMatrix4(s),Ya.radius+=r,t.ray.intersectsSphere(Ya)===!1)return;fu.copy(s).invert(),xr.copy(t.ray).applyMatrix4(fu);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=i.index,u=i.attributes.position;if(h!==null){let d=Math.max(0,a.start),g=Math.min(h.count,a.start+a.count);for(let v=d,m=g-1;v<m;v+=c){let p=h.getX(v),b=h.getX(v+1),E=Za(this,t,xr,l,p,b,v);E&&e.push(E)}if(this.isLineLoop){let v=h.getX(g-1),m=h.getX(d),p=Za(this,t,xr,l,v,m,g-1);p&&e.push(p)}}else{let d=Math.max(0,a.start),g=Math.min(u.count,a.start+a.count);for(let v=d,m=g-1;v<m;v+=c){let p=Za(this,t,xr,l,v,v+1,v);p&&e.push(p)}if(this.isLineLoop){let v=Za(this,t,xr,l,g-1,d,g-1);v&&e.push(v)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){let s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function Za(n,t,e,i,s,r,a){let o=n.geometry.attributes.position;if(yo.fromBufferAttribute(o,s),Mo.fromBufferAttribute(o,r),e.distanceSqToSegment(yo,Mo,Pc,pu)>i)return;Pc.applyMatrix4(n.matrixWorld);let c=t.ray.origin.distanceTo(Pc);if(!(c<t.near||c>t.far))return{distance:c,point:pu.clone().applyMatrix4(n.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:n}}var mu=new R,gu=new R,Rn=class extends bo{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,i=[];for(let s=0,r=e.count;s<r;s+=2)mu.fromBufferAttribute(e,s),gu.fromBufferAttribute(e,s+1),i[s]=s===0?0:i[s-1],i[s+1]=i[s]+mu.distanceTo(gu);t.setAttribute("lineDistance",new Yt(i,1))}else Ot("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var Ir=class extends ai{constructor(t=[],e=kn,i,s,r,a,o,l,c,h){super(t,e,i,s,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},Vs=class extends ai{constructor(t,e,i,s,r,a,o,l,c){super(t,e,i,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}};var Pn=class extends ai{constructor(t,e,i=Vi,s,r,a,o=Ge,l=Ge,c,h=Ji,f=1){if(h!==Ji&&h!==Hn)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let u={width:t,height:e,depth:f};super(u,s,r,a,o,l,h,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Os(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return e.compareFunction=this.compareFunction,e}},So=class extends Pn{constructor(t,e=Vi,i=kn,s,r,a=Ge,o=Ge,l,c=Ji){let h={width:t,height:t,depth:1},f=[h,h,h,h,h,h];super(t,t,e,i,s,r,a,o,l,c),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}},Lr=class extends ai{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}},hi=class n extends Te{constructor(t=1,e=1,i=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let l=[],c=[],h=[],f=[],u=0,d=0;g("z","y","x",-1,-1,i,e,t,a,r,0),g("z","y","x",1,-1,i,e,-t,a,r,1),g("x","z","y",1,1,t,i,e,s,a,2),g("x","z","y",1,-1,t,i,-e,s,a,3),g("x","y","z",1,-1,t,e,i,s,r,4),g("x","y","z",-1,-1,t,e,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new Yt(c,3)),this.setAttribute("normal",new Yt(h,3)),this.setAttribute("uv",new Yt(f,2));function g(v,m,p,b,E,y,w,S,C,_,T){let P=y/C,D=w/_,F=y/2,V=w/2,N=S/2,B=C+1,$=_+1,W=0,st=0,X=new R;for(let j=0;j<$;j++){let et=j*D-V;for(let Pt=0;Pt<B;Pt++){let wt=Pt*P-F;X[v]=wt*b,X[m]=et*E,X[p]=N,c.push(X.x,X.y,X.z),X[v]=0,X[m]=0,X[p]=S>0?1:-1,h.push(X.x,X.y,X.z),f.push(Pt/C),f.push(1-j/_),W+=1}}for(let j=0;j<_;j++)for(let et=0;et<C;et++){let Pt=u+et+B*j,wt=u+et+B*(j+1),ue=u+(et+1)+B*(j+1),ne=u+(et+1)+B*j;l.push(Pt,wt,ne),l.push(wt,ue,ne),st+=6}o.addGroup(d,st,T),d+=st,u+=W}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};var pn=class n extends Te{constructor(t=1,e=32,i=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:i,thetaLength:s},e=Math.max(3,e);let r=[],a=[],o=[],l=[],c=new R,h=new it;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let f=0,u=3;f<=e;f++,u+=3){let d=i+f/e*s;c.x=t*Math.cos(d),c.y=t*Math.sin(d),a.push(c.x,c.y,c.z),o.push(0,0,1),h.x=(a[u]/t+1)/2,h.y=(a[u+1]/t+1)/2,l.push(h.x,h.y)}for(let f=1;f<=e;f++)r.push(f,f+1,0);this.setIndex(r),this.setAttribute("position",new Yt(a,3)),this.setAttribute("normal",new Yt(o,3)),this.setAttribute("uv",new Yt(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.radius,t.segments,t.thetaStart,t.thetaLength)}},mi=class n extends Te{constructor(t=1,e=1,i=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:i,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};let c=this;s=Math.floor(s),r=Math.floor(r);let h=[],f=[],u=[],d=[],g=0,v=[],m=i/2,p=0;b(),a===!1&&(t>0&&E(!0),e>0&&E(!1)),this.setIndex(h),this.setAttribute("position",new Yt(f,3)),this.setAttribute("normal",new Yt(u,3)),this.setAttribute("uv",new Yt(d,2));function b(){let y=new R,w=new R,S=0,C=(e-t)/i;for(let _=0;_<=r;_++){let T=[],P=_/r,D=P*(e-t)+t;for(let F=0;F<=s;F++){let V=F/s,N=V*l+o,B=Math.sin(N),$=Math.cos(N);w.x=D*B,w.y=-P*i+m,w.z=D*$,f.push(w.x,w.y,w.z),y.set(B,C,$).normalize(),u.push(y.x,y.y,y.z),d.push(V,1-P),T.push(g++)}v.push(T)}for(let _=0;_<s;_++)for(let T=0;T<r;T++){let P=v[T][_],D=v[T+1][_],F=v[T+1][_+1],V=v[T][_+1];(t>0||T!==0)&&(h.push(P,D,V),S+=3),(e>0||T!==r-1)&&(h.push(D,F,V),S+=3)}c.addGroup(p,S,0),p+=S}function E(y){let w=g,S=new it,C=new R,_=0,T=y===!0?t:e,P=y===!0?1:-1;for(let F=1;F<=s;F++)f.push(0,m*P,0),u.push(0,P,0),d.push(.5,.5),g++;let D=g;for(let F=0;F<=s;F++){let N=F/s*l+o,B=Math.cos(N),$=Math.sin(N);C.x=T*$,C.y=m*P,C.z=T*B,f.push(C.x,C.y,C.z),u.push(0,P,0),S.x=B*.5+.5,S.y=$*.5*P+.5,d.push(S.x,S.y),g++}for(let F=0;F<s;F++){let V=w+F,N=D+F;y===!0?h.push(N,N+1,V):h.push(N+1,N,V),_+=3}c.addGroup(p,_,y===!0?1:2),p+=_}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Dr=class n extends mi{constructor(t=1,e=1,i=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,t,e,i,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:i,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(t){return new n(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},wo=class n extends Te{constructor(t=[],e=[],i=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:i,detail:s};let r=[],a=[];o(s),c(i),h(),this.setAttribute("position",new Yt(r,3)),this.setAttribute("normal",new Yt(r.slice(),3)),this.setAttribute("uv",new Yt(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(b){let E=new R,y=new R,w=new R;for(let S=0;S<e.length;S+=3)d(e[S+0],E),d(e[S+1],y),d(e[S+2],w),l(E,y,w,b)}function l(b,E,y,w){let S=w+1,C=[];for(let _=0;_<=S;_++){C[_]=[];let T=b.clone().lerp(y,_/S),P=E.clone().lerp(y,_/S),D=S-_;for(let F=0;F<=D;F++)F===0&&_===S?C[_][F]=T:C[_][F]=T.clone().lerp(P,F/D)}for(let _=0;_<S;_++)for(let T=0;T<2*(S-_)-1;T++){let P=Math.floor(T/2);T%2===0?(u(C[_][P+1]),u(C[_+1][P]),u(C[_][P])):(u(C[_][P+1]),u(C[_+1][P+1]),u(C[_+1][P]))}}function c(b){let E=new R;for(let y=0;y<r.length;y+=3)E.x=r[y+0],E.y=r[y+1],E.z=r[y+2],E.normalize().multiplyScalar(b),r[y+0]=E.x,r[y+1]=E.y,r[y+2]=E.z}function h(){let b=new R;for(let E=0;E<r.length;E+=3){b.x=r[E+0],b.y=r[E+1],b.z=r[E+2];let y=m(b)/2/Math.PI+.5,w=p(b)/Math.PI+.5;a.push(y,1-w)}g(),f()}function f(){for(let b=0;b<a.length;b+=6){let E=a[b+0],y=a[b+2],w=a[b+4],S=Math.max(E,y,w),C=Math.min(E,y,w);S>.9&&C<.1&&(E<.2&&(a[b+0]+=1),y<.2&&(a[b+2]+=1),w<.2&&(a[b+4]+=1))}}function u(b){r.push(b.x,b.y,b.z)}function d(b,E){let y=b*3;E.x=t[y+0],E.y=t[y+1],E.z=t[y+2]}function g(){let b=new R,E=new R,y=new R,w=new R,S=new it,C=new it,_=new it;for(let T=0,P=0;T<r.length;T+=9,P+=6){b.set(r[T+0],r[T+1],r[T+2]),E.set(r[T+3],r[T+4],r[T+5]),y.set(r[T+6],r[T+7],r[T+8]),S.set(a[P+0],a[P+1]),C.set(a[P+2],a[P+3]),_.set(a[P+4],a[P+5]),w.copy(b).add(E).add(y).divideScalar(3);let D=m(w);v(S,P+0,b,D),v(C,P+2,E,D),v(_,P+4,y,D)}}function v(b,E,y,w){w<0&&b.x===1&&(a[E]=b.x-1),y.x===0&&y.z===0&&(a[E]=w/2/Math.PI+.5)}function m(b){return Math.atan2(b.z,-b.x)}function p(b){return Math.atan2(-b.y,Math.sqrt(b.x*b.x+b.z*b.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.vertices,t.indices,t.radius,t.detail)}};var Ja=new R,Ka=new R,Ic=new R,ja=new un,ts=class extends Te{constructor(t=null,e=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:e},t!==null){let s=Math.pow(10,4),r=Math.cos(ro*e),a=t.getIndex(),o=t.getAttribute("position"),l=a?a.count:o.count,c=[0,0,0],h=["a","b","c"],f=new Array(3),u={},d=[];for(let g=0;g<l;g+=3){a?(c[0]=a.getX(g),c[1]=a.getX(g+1),c[2]=a.getX(g+2)):(c[0]=g,c[1]=g+1,c[2]=g+2);let{a:v,b:m,c:p}=ja;if(v.fromBufferAttribute(o,c[0]),m.fromBufferAttribute(o,c[1]),p.fromBufferAttribute(o,c[2]),ja.getNormal(Ic),f[0]=`${Math.round(v.x*s)},${Math.round(v.y*s)},${Math.round(v.z*s)}`,f[1]=`${Math.round(m.x*s)},${Math.round(m.y*s)},${Math.round(m.z*s)}`,f[2]=`${Math.round(p.x*s)},${Math.round(p.y*s)},${Math.round(p.z*s)}`,!(f[0]===f[1]||f[1]===f[2]||f[2]===f[0]))for(let b=0;b<3;b++){let E=(b+1)%3,y=f[b],w=f[E],S=ja[h[b]],C=ja[h[E]],_=`${y}_${w}`,T=`${w}_${y}`;T in u&&u[T]?(Ic.dot(u[T].normal)<=r&&(d.push(S.x,S.y,S.z),d.push(C.x,C.y,C.z)),u[T]=null):_ in u||(u[_]={index0:c[b],index1:c[E],normal:Ic.clone()})}}for(let g in u)if(u[g]){let{index0:v,index1:m}=u[g];Ja.fromBufferAttribute(o,v),Ka.fromBufferAttribute(o,m),d.push(Ja.x,Ja.y,Ja.z),d.push(Ka.x,Ka.y,Ka.z)}this.setAttribute("position",new Yt(d,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}},gi=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Ot("Curve: .getPoint() not implemented.")}getPointAt(t,e){let i=this.getUtoTmapping(t);return this.getPoint(i,e)}getPoints(t=5){let e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return e}getSpacedPoints(t=5){let e=[];for(let i=0;i<=t;i++)e.push(this.getPointAt(i/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],i,s=this.getPoint(0),r=0;e.push(0);for(let a=1;a<=t;a++)i=this.getPoint(a/t),r+=i.distanceTo(s),e.push(r),s=i;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){let i=this.getLengths(),s=0,r=i.length,a;e?a=e:a=t*i[r-1];let o=0,l=r-1,c;for(;o<=l;)if(s=Math.floor(o+(l-o)/2),c=i[s]-a,c<0)o=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,i[s]===a)return s/(r-1);let h=i[s],u=i[s+1]-h,d=(a-h)/u;return(s+d)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);let a=this.getPoint(s),o=this.getPoint(r),l=e||(a.isVector2?new it:new R);return l.copy(o).sub(a).normalize(),l}getTangentAt(t,e){let i=this.getUtoTmapping(t);return this.getTangent(i,e)}computeFrenetFrames(t,e=!1){let i=new R,s=[],r=[],a=[],o=new R,l=new he;for(let d=0;d<=t;d++){let g=d/t;s[d]=this.getTangentAt(g,new R)}r[0]=new R,a[0]=new R;let c=Number.MAX_VALUE,h=Math.abs(s[0].x),f=Math.abs(s[0].y),u=Math.abs(s[0].z);h<=c&&(c=h,i.set(1,0,0)),f<=c&&(c=f,i.set(0,1,0)),u<=c&&i.set(0,0,1),o.crossVectors(s[0],i).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let d=1;d<=t;d++){if(r[d]=r[d-1].clone(),a[d]=a[d-1].clone(),o.crossVectors(s[d-1],s[d]),o.length()>Number.EPSILON){o.normalize();let g=Math.acos(Jt(s[d-1].dot(s[d]),-1,1));r[d].applyMatrix4(l.makeRotationAxis(o,g))}a[d].crossVectors(s[d],r[d])}if(e===!0){let d=Math.acos(Jt(r[0].dot(r[t]),-1,1));d/=t,s[0].dot(o.crossVectors(r[0],r[t]))>0&&(d=-d);for(let g=1;g<=t;g++)r[g].applyMatrix4(l.makeRotationAxis(s[g],d*g)),a[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){let t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}},Gs=class extends gi{constructor(t=0,e=0,i=1,s=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=i,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(t,e=new it){let i=e,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);let o=this.aStartAngle+t*r,l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let h=Math.cos(this.aRotation),f=Math.sin(this.aRotation),u=l-this.aX,d=c-this.aY;l=u*h-d*f+this.aX,c=u*f+d*h+this.aY}return i.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},Eo=class extends Gs{constructor(t,e,i,s,r,a){super(t,e,i,i,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}};function ch(){let n=0,t=0,e=0,i=0;function s(r,a,o,l){n=r,t=o,e=-3*r+3*a-2*o-l,i=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){s(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,h,f){let u=(a-r)/c-(o-r)/(c+h)+(o-a)/h,d=(o-a)/h-(l-a)/(h+f)+(l-o)/f;u*=h,d*=h,s(a,o,u,d)},calc:function(r){let a=r*r,o=a*r;return n+t*r+e*a+i*o}}}var xu=new R,_u=new R,Lc=new ch,Dc=new ch,Nc=new ch,es=class extends gi{constructor(t=[],e=!1,i="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=i,this.tension=s}getPoint(t,e=new R){let i=e,s=this.points,r=s.length,a=(r-(this.closed?0:1))*t,o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,h;this.closed||o>0?c=s[(o-1)%r]:(_u.subVectors(s[0],s[1]).add(s[0]),c=_u);let f=s[o%r],u=s[(o+1)%r];if(this.closed||o+2<r?h=s[(o+2)%r]:(xu.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=xu),this.curveType==="centripetal"||this.curveType==="chordal"){let d=this.curveType==="chordal"?.5:.25,g=Math.pow(c.distanceToSquared(f),d),v=Math.pow(f.distanceToSquared(u),d),m=Math.pow(u.distanceToSquared(h),d);v<1e-4&&(v=1),g<1e-4&&(g=v),m<1e-4&&(m=v),Lc.initNonuniformCatmullRom(c.x,f.x,u.x,h.x,g,v,m),Dc.initNonuniformCatmullRom(c.y,f.y,u.y,h.y,g,v,m),Nc.initNonuniformCatmullRom(c.z,f.z,u.z,h.z,g,v,m)}else this.curveType==="catmullrom"&&(Lc.initCatmullRom(c.x,f.x,u.x,h.x,this.tension),Dc.initCatmullRom(c.y,f.y,u.y,h.y,this.tension),Nc.initCatmullRom(c.z,f.z,u.z,h.z,this.tension));return i.set(Lc.calc(l),Dc.calc(l),Nc.calc(l)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){let s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let s=t.points[e];this.points.push(new R().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};function vu(n,t,e,i,s){let r=(i-t)*.5,a=(s-e)*.5,o=n*n,l=n*o;return(2*e-2*i+r+a)*l+(-3*e+3*i-2*r-a)*o+r*n+e}function ip(n,t){let e=1-n;return e*e*t}function np(n,t){return 2*(1-n)*n*t}function sp(n,t){return n*n*t}function vr(n,t,e,i){return ip(n,t)+np(n,e)+sp(n,i)}function rp(n,t){let e=1-n;return e*e*e*t}function ap(n,t){let e=1-n;return 3*e*e*n*t}function op(n,t){return 3*(1-n)*n*n*t}function lp(n,t){return n*n*n*t}function yr(n,t,e,i,s){return rp(n,t)+ap(n,e)+op(n,i)+lp(n,s)}var Nr=class extends gi{constructor(t=new it,e=new it,i=new it,s=new it){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=i,this.v3=s}getPoint(t,e=new it){let i=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return i.set(yr(t,s.x,r.x,a.x,o.x),yr(t,s.y,r.y,a.y,o.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},To=class extends gi{constructor(t=new R,e=new R,i=new R,s=new R){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=i,this.v3=s}getPoint(t,e=new R){let i=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return i.set(yr(t,s.x,r.x,a.x,o.x),yr(t,s.y,r.y,a.y,o.y),yr(t,s.z,r.z,a.z,o.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Ur=class extends gi{constructor(t=new it,e=new it){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new it){let i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new it){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Ao=class extends gi{constructor(t=new R,e=new R){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new R){let i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new R){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Fr=class extends gi{constructor(t=new it,e=new it,i=new it){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new it){let i=e,s=this.v0,r=this.v1,a=this.v2;return i.set(vr(t,s.x,r.x,a.x),vr(t,s.y,r.y,a.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Or=class extends gi{constructor(t=new R,e=new R,i=new R){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new R){let i=e,s=this.v0,r=this.v1,a=this.v2;return i.set(vr(t,s.x,r.x,a.x),vr(t,s.y,r.y,a.y),vr(t,s.z,r.z,a.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Br=class extends gi{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new it){let i=e,s=this.points,r=(s.length-1)*t,a=Math.floor(r),o=r-a,l=s[a===0?a:a-1],c=s[a],h=s[a>s.length-2?s.length-1:a+1],f=s[a>s.length-3?s.length-1:a+2];return i.set(vu(o,l.x,c.x,h.x,f.x),vu(o,l.y,c.y,h.y,f.y)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let s=t.points[e];this.points.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){let s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let s=t.points[e];this.points.push(new it().fromArray(s))}return this}},Co=Object.freeze({__proto__:null,ArcCurve:Eo,CatmullRomCurve3:es,CubicBezierCurve:Nr,CubicBezierCurve3:To,EllipseCurve:Gs,LineCurve:Ur,LineCurve3:Ao,QuadraticBezierCurve:Fr,QuadraticBezierCurve3:Or,SplineCurve:Br}),Ro=class extends gi{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){let t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){let i=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Co[i](e,t))}return this}getPoint(t,e){let i=t*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=i){let a=s[r]-i,o=this.curves[r],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,e)}r++}return null}getLength(){let t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let t=[],e=0;for(let i=0,s=this.curves.length;i<s;i++)e+=this.curves[i].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){let e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){let e=[],i;for(let s=0,r=this.curves;s<r.length;s++){let a=r[s],o=a.isEllipseCurve?t*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?t*a.points.length:t,l=a.getPoints(o);for(let c=0;c<l.length;c++){let h=l[c];i&&i.equals(h)||(e.push(h),i=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,i=t.curves.length;e<i;e++){let s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){let t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,i=this.curves.length;e<i;e++){let s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,i=t.curves.length;e<i;e++){let s=t.curves[e];this.curves.push(new Co[s.type]().fromJSON(s))}return this}},kr=class extends Ro{constructor(t){super(),this.type="Path",this.currentPoint=new it,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,i=t.length;e<i;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){let i=new Ur(this.currentPoint.clone(),new it(t,e));return this.curves.push(i),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,i,s){let r=new Fr(this.currentPoint.clone(),new it(t,e),new it(i,s));return this.curves.push(r),this.currentPoint.set(i,s),this}bezierCurveTo(t,e,i,s,r,a){let o=new Nr(this.currentPoint.clone(),new it(t,e),new it(i,s),new it(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(t){let e=[this.currentPoint.clone()].concat(t),i=new Br(e);return this.curves.push(i),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,i,s,r,a){let o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+o,e+l,i,s,r,a),this}absarc(t,e,i,s,r,a){return this.absellipse(t,e,i,i,s,r,a),this}ellipse(t,e,i,s,r,a,o,l){let c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+c,e+h,i,s,r,a,o,l),this}absellipse(t,e,i,s,r,a,o,l){let c=new Gs(t,e,i,s,r,a,o,l);if(this.curves.length>0){let f=c.getPoint(0);f.equals(this.currentPoint)||this.lineTo(f.x,f.y)}this.curves.push(c);let h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){let t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}},is=class extends kr{constructor(t){super(t),this.uuid=js(),this.type="Shape",this.holes=[]}getPointsHoles(t){let e=[];for(let i=0,s=this.holes.length;i<s;i++)e[i]=this.holes[i].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,i=t.holes.length;e<i;e++){let s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,i=this.holes.length;e<i;e++){let s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,i=t.holes.length;e<i;e++){let s=t.holes[e];this.holes.push(new kr().fromJSON(s))}return this}};function cp(n,t,e=2){let i=t&&t.length,s=i?t[0]*e:n.length,r=gd(n,0,s,e,!0),a=[];if(!r||r.next===r.prev)return a;let o,l,c;if(i&&(r=pp(n,t,r,e)),n.length>80*e){o=n[0],l=n[1];let h=o,f=l;for(let u=e;u<s;u+=e){let d=n[u],g=n[u+1];d<o&&(o=d),g<l&&(l=g),d>h&&(h=d),g>f&&(f=g)}c=Math.max(h-o,f-l),c=c!==0?32767/c:0}return zr(r,a,e,o,l,c,0),a}function gd(n,t,e,i,s){let r;if(s===Ep(n,t,e,i)>0)for(let a=t;a<e;a+=i)r=yu(a/i|0,n[a],n[a+1],r);else for(let a=e-i;a>=t;a-=i)r=yu(a/i|0,n[a],n[a+1],r);return r&&Ws(r,r.next)&&(Vr(r),r=r.next),r}function ns(n,t){if(!n)return n;t||(t=n);let e=n,i;do if(i=!1,!e.steiner&&(Ws(e,e.next)||Pe(e.prev,e,e.next)===0)){if(Vr(e),e=t=e.prev,e===e.next)break;i=!0}else e=e.next;while(i||e!==t);return t}function zr(n,t,e,i,s,r,a){if(!n)return;!a&&r&&vp(n,i,s,r);let o=n;for(;n.prev!==n.next;){let l=n.prev,c=n.next;if(r?up(n,i,s,r):hp(n)){t.push(l.i,n.i,c.i),Vr(n),n=c.next,o=c.next;continue}if(n=c,n===o){a?a===1?(n=dp(ns(n),t),zr(n,t,e,i,s,r,2)):a===2&&fp(n,t,e,i,s,r):zr(ns(n),t,e,i,s,r,1);break}}}function hp(n){let t=n.prev,e=n,i=n.next;if(Pe(t,e,i)>=0)return!1;let s=t.x,r=e.x,a=i.x,o=t.y,l=e.y,c=i.y,h=Math.min(s,r,a),f=Math.min(o,l,c),u=Math.max(s,r,a),d=Math.max(o,l,c),g=i.next;for(;g!==t;){if(g.x>=h&&g.x<=u&&g.y>=f&&g.y<=d&&_r(s,o,r,l,a,c,g.x,g.y)&&Pe(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function up(n,t,e,i){let s=n.prev,r=n,a=n.next;if(Pe(s,r,a)>=0)return!1;let o=s.x,l=r.x,c=a.x,h=s.y,f=r.y,u=a.y,d=Math.min(o,l,c),g=Math.min(h,f,u),v=Math.max(o,l,c),m=Math.max(h,f,u),p=Hc(d,g,t,e,i),b=Hc(v,m,t,e,i),E=n.prevZ,y=n.nextZ;for(;E&&E.z>=p&&y&&y.z<=b;){if(E.x>=d&&E.x<=v&&E.y>=g&&E.y<=m&&E!==s&&E!==a&&_r(o,h,l,f,c,u,E.x,E.y)&&Pe(E.prev,E,E.next)>=0||(E=E.prevZ,y.x>=d&&y.x<=v&&y.y>=g&&y.y<=m&&y!==s&&y!==a&&_r(o,h,l,f,c,u,y.x,y.y)&&Pe(y.prev,y,y.next)>=0))return!1;y=y.nextZ}for(;E&&E.z>=p;){if(E.x>=d&&E.x<=v&&E.y>=g&&E.y<=m&&E!==s&&E!==a&&_r(o,h,l,f,c,u,E.x,E.y)&&Pe(E.prev,E,E.next)>=0)return!1;E=E.prevZ}for(;y&&y.z<=b;){if(y.x>=d&&y.x<=v&&y.y>=g&&y.y<=m&&y!==s&&y!==a&&_r(o,h,l,f,c,u,y.x,y.y)&&Pe(y.prev,y,y.next)>=0)return!1;y=y.nextZ}return!0}function dp(n,t){let e=n;do{let i=e.prev,s=e.next.next;!Ws(i,s)&&_d(i,e,e.next,s)&&Hr(i,s)&&Hr(s,i)&&(t.push(i.i,e.i,s.i),Vr(e),Vr(e.next),e=n=s),e=e.next}while(e!==n);return ns(e)}function fp(n,t,e,i,s,r){let a=n;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&bp(a,o)){let l=vd(a,o);a=ns(a,a.next),l=ns(l,l.next),zr(a,t,e,i,s,r,0),zr(l,t,e,i,s,r,0);return}o=o.next}a=a.next}while(a!==n)}function pp(n,t,e,i){let s=[];for(let r=0,a=t.length;r<a;r++){let o=t[r]*i,l=r<a-1?t[r+1]*i:n.length,c=gd(n,o,l,i,!1);c===c.next&&(c.steiner=!0),s.push(Mp(c))}s.sort(mp);for(let r=0;r<s.length;r++)e=gp(s[r],e);return e}function mp(n,t){let e=n.x-t.x;if(e===0&&(e=n.y-t.y,e===0)){let i=(n.next.y-n.y)/(n.next.x-n.x),s=(t.next.y-t.y)/(t.next.x-t.x);e=i-s}return e}function gp(n,t){let e=xp(n,t);if(!e)return t;let i=vd(e,n);return ns(i,i.next),ns(e,e.next)}function xp(n,t){let e=t,i=n.x,s=n.y,r=-1/0,a;if(Ws(n,e))return e;do{if(Ws(n,e.next))return e.next;if(s<=e.y&&s>=e.next.y&&e.next.y!==e.y){let f=e.x+(s-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(f<=i&&f>r&&(r=f,a=e.x<e.next.x?e:e.next,f===i))return a}e=e.next}while(e!==t);if(!a)return null;let o=a,l=a.x,c=a.y,h=1/0;e=a;do{if(i>=e.x&&e.x>=l&&i!==e.x&&xd(s<c?i:r,s,l,c,s<c?r:i,s,e.x,e.y)){let f=Math.abs(s-e.y)/(i-e.x);Hr(e,n)&&(f<h||f===h&&(e.x>a.x||e.x===a.x&&_p(a,e)))&&(a=e,h=f)}e=e.next}while(e!==o);return a}function _p(n,t){return Pe(n.prev,n,t.prev)<0&&Pe(t.next,n,n.next)<0}function vp(n,t,e,i){let s=n;do s.z===0&&(s.z=Hc(s.x,s.y,t,e,i)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==n);s.prevZ.nextZ=null,s.prevZ=null,yp(s)}function yp(n){let t,e=1;do{let i=n,s;n=null;let r=null;for(t=0;i;){t++;let a=i,o=0;for(let c=0;c<e&&(o++,a=a.nextZ,!!a);c++);let l=e;for(;o>0||l>0&&a;)o!==0&&(l===0||!a||i.z<=a.z)?(s=i,i=i.nextZ,o--):(s=a,a=a.nextZ,l--),r?r.nextZ=s:n=s,s.prevZ=r,r=s;i=a}r.nextZ=null,e*=2}while(t>1);return n}function Hc(n,t,e,i,s){return n=(n-e)*s|0,t=(t-i)*s|0,n=(n|n<<8)&16711935,n=(n|n<<4)&252645135,n=(n|n<<2)&858993459,n=(n|n<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,n|t<<1}function Mp(n){let t=n,e=n;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==n);return e}function xd(n,t,e,i,s,r,a,o){return(s-a)*(t-o)>=(n-a)*(r-o)&&(n-a)*(i-o)>=(e-a)*(t-o)&&(e-a)*(r-o)>=(s-a)*(i-o)}function _r(n,t,e,i,s,r,a,o){return!(n===a&&t===o)&&xd(n,t,e,i,s,r,a,o)}function bp(n,t){return n.next.i!==t.i&&n.prev.i!==t.i&&!Sp(n,t)&&(Hr(n,t)&&Hr(t,n)&&wp(n,t)&&(Pe(n.prev,n,t.prev)||Pe(n,t.prev,t))||Ws(n,t)&&Pe(n.prev,n,n.next)>0&&Pe(t.prev,t,t.next)>0)}function Pe(n,t,e){return(t.y-n.y)*(e.x-t.x)-(t.x-n.x)*(e.y-t.y)}function Ws(n,t){return n.x===t.x&&n.y===t.y}function _d(n,t,e,i){let s=to(Pe(n,t,e)),r=to(Pe(n,t,i)),a=to(Pe(e,i,n)),o=to(Pe(e,i,t));return!!(s!==r&&a!==o||s===0&&Qa(n,e,t)||r===0&&Qa(n,i,t)||a===0&&Qa(e,n,i)||o===0&&Qa(e,t,i))}function Qa(n,t,e){return t.x<=Math.max(n.x,e.x)&&t.x>=Math.min(n.x,e.x)&&t.y<=Math.max(n.y,e.y)&&t.y>=Math.min(n.y,e.y)}function to(n){return n>0?1:n<0?-1:0}function Sp(n,t){let e=n;do{if(e.i!==n.i&&e.next.i!==n.i&&e.i!==t.i&&e.next.i!==t.i&&_d(e,e.next,n,t))return!0;e=e.next}while(e!==n);return!1}function Hr(n,t){return Pe(n.prev,n,n.next)<0?Pe(n,t,n.next)>=0&&Pe(n,n.prev,t)>=0:Pe(n,t,n.prev)<0||Pe(n,n.next,t)<0}function wp(n,t){let e=n,i=!1,s=(n.x+t.x)/2,r=(n.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(i=!i),e=e.next;while(e!==n);return i}function vd(n,t){let e=Vc(n.i,n.x,n.y),i=Vc(t.i,t.x,t.y),s=n.next,r=t.prev;return n.next=t,t.prev=n,e.next=s,s.prev=e,i.next=e,e.prev=i,r.next=i,i.prev=r,i}function yu(n,t,e,i){let s=Vc(n,t,e);return i?(s.next=i.next,s.prev=i,i.next.prev=s,i.next=s):(s.prev=s,s.next=s),s}function Vr(n){n.next.prev=n.prev,n.prev.next=n.next,n.prevZ&&(n.prevZ.nextZ=n.nextZ),n.nextZ&&(n.nextZ.prevZ=n.prevZ)}function Vc(n,t,e){return{i:n,x:t,y:e,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function Ep(n,t,e,i){let s=0;for(let r=t,a=e-i;r<e;r+=i)s+=(n[a]-n[r])*(n[r+1]+n[a+1]),a=r;return s}var Gc=class{static triangulate(t,e,i=2){return cp(t,e,i)}},Kn=class n{static area(t){let e=t.length,i=0;for(let s=e-1,r=0;r<e;s=r++)i+=t[s].x*t[r].y-t[r].x*t[s].y;return i*.5}static isClockWise(t){return n.area(t)<0}static triangulateShape(t,e){let i=[],s=[],r=[];Mu(t),bu(i,t);let a=t.length;e.forEach(Mu);for(let l=0;l<e.length;l++)s.push(a),a+=e[l].length,bu(i,e[l]);let o=Gc.triangulate(i,s);for(let l=0;l<o.length;l+=3)r.push(o.slice(l,l+3));return r}};function Mu(n){let t=n.length;t>2&&n[t-1].equals(n[0])&&n.pop()}function bu(n,t){for(let e=0;e<t.length;e++)n.push(t[e].x),n.push(t[e].y)}var In=class n extends Te{constructor(t=new is([new it(.5,.5),new it(-.5,.5),new it(-.5,-.5),new it(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];let i=this,s=[],r=[];for(let o=0,l=t.length;o<l;o++){let c=t[o];a(c)}this.setAttribute("position",new Yt(s,3)),this.setAttribute("uv",new Yt(r,2)),this.computeVertexNormals();function a(o){let l=[],c=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,f=e.depth!==void 0?e.depth:1,u=e.bevelEnabled!==void 0?e.bevelEnabled:!0,d=e.bevelThickness!==void 0?e.bevelThickness:.2,g=e.bevelSize!==void 0?e.bevelSize:d-.1,v=e.bevelOffset!==void 0?e.bevelOffset:0,m=e.bevelSegments!==void 0?e.bevelSegments:3,p=e.extrudePath,b=e.UVGenerator!==void 0?e.UVGenerator:Tp,E,y=!1,w,S,C,_;if(p){E=p.getSpacedPoints(h),y=!0,u=!1;let tt=p.isCatmullRomCurve3?p.closed:!1;w=p.computeFrenetFrames(h,tt),S=new R,C=new R,_=new R}u||(m=0,d=0,g=0,v=0);let T=o.extractPoints(c),P=T.shape,D=T.holes;if(!Kn.isClockWise(P)){P=P.reverse();for(let tt=0,rt=D.length;tt<rt;tt++){let at=D[tt];Kn.isClockWise(at)&&(D[tt]=at.reverse())}}function V(tt){let at=10000000000000001e-36,ot=tt[0];for(let ht=1;ht<=tt.length;ht++){let Bt=ht%tt.length,Ut=tt[Bt],Wt=Ut.x-ot.x,qt=Ut.y-ot.y,I=Wt*Wt+qt*qt,pe=Math.max(Math.abs(Ut.x),Math.abs(Ut.y),Math.abs(ot.x),Math.abs(ot.y)),se=at*pe*pe;if(I<=se){tt.splice(Bt,1),ht--;continue}ot=Ut}}V(P),D.forEach(V);let N=D.length,B=P;for(let tt=0;tt<N;tt++){let rt=D[tt];P=P.concat(rt)}function $(tt,rt,at){return rt||Ht("ExtrudeGeometry: vec does not exist"),tt.clone().addScaledVector(rt,at)}let W=P.length;function st(tt,rt,at){let ot,ht,Bt,Ut=tt.x-rt.x,Wt=tt.y-rt.y,qt=at.x-tt.x,I=at.y-tt.y,pe=Ut*Ut+Wt*Wt,se=Ut*I-Wt*qt;if(Math.abs(se)>Number.EPSILON){let A=Math.sqrt(pe),x=Math.sqrt(qt*qt+I*I),O=rt.x-Wt/A,H=rt.y+Ut/A,q=at.x-I/x,lt=at.y+qt/x,ct=((q-O)*I-(lt-H)*qt)/(Ut*I-Wt*qt);ot=O+Ut*ct-tt.x,ht=H+Wt*ct-tt.y;let Y=ot*ot+ht*ht;if(Y<=2)return new it(ot,ht);Bt=Math.sqrt(Y/2)}else{let A=!1;Ut>Number.EPSILON?qt>Number.EPSILON&&(A=!0):Ut<-Number.EPSILON?qt<-Number.EPSILON&&(A=!0):Math.sign(Wt)===Math.sign(I)&&(A=!0),A?(ot=-Wt,ht=Ut,Bt=Math.sqrt(pe)):(ot=Ut,ht=Wt,Bt=Math.sqrt(pe/2))}return new it(ot/Bt,ht/Bt)}let X=[];for(let tt=0,rt=B.length,at=rt-1,ot=tt+1;tt<rt;tt++,at++,ot++)at===rt&&(at=0),ot===rt&&(ot=0),X[tt]=st(B[tt],B[at],B[ot]);let j=[],et,Pt=X.concat();for(let tt=0,rt=N;tt<rt;tt++){let at=D[tt];et=[];for(let ot=0,ht=at.length,Bt=ht-1,Ut=ot+1;ot<ht;ot++,Bt++,Ut++)Bt===ht&&(Bt=0),Ut===ht&&(Ut=0),et[ot]=st(at[ot],at[Bt],at[Ut]);j.push(et),Pt=Pt.concat(et)}let wt;if(m===0)wt=Kn.triangulateShape(B,D);else{let tt=[],rt=[];for(let at=0;at<m;at++){let ot=at/m,ht=d*Math.cos(ot*Math.PI/2),Bt=g*Math.sin(ot*Math.PI/2)+v;for(let Ut=0,Wt=B.length;Ut<Wt;Ut++){let qt=$(B[Ut],X[Ut],Bt);xt(qt.x,qt.y,-ht),ot===0&&tt.push(qt)}for(let Ut=0,Wt=N;Ut<Wt;Ut++){let qt=D[Ut];et=j[Ut];let I=[];for(let pe=0,se=qt.length;pe<se;pe++){let A=$(qt[pe],et[pe],Bt);xt(A.x,A.y,-ht),ot===0&&I.push(A)}ot===0&&rt.push(I)}}wt=Kn.triangulateShape(tt,rt)}let ue=wt.length,ne=g+v;for(let tt=0;tt<W;tt++){let rt=u?$(P[tt],Pt[tt],ne):P[tt];y?(C.copy(w.normals[0]).multiplyScalar(rt.x),S.copy(w.binormals[0]).multiplyScalar(rt.y),_.copy(E[0]).add(C).add(S),xt(_.x,_.y,_.z)):xt(rt.x,rt.y,0)}for(let tt=1;tt<=h;tt++)for(let rt=0;rt<W;rt++){let at=u?$(P[rt],Pt[rt],ne):P[rt];y?(C.copy(w.normals[tt]).multiplyScalar(at.x),S.copy(w.binormals[tt]).multiplyScalar(at.y),_.copy(E[tt]).add(C).add(S),xt(_.x,_.y,_.z)):xt(at.x,at.y,f/h*tt)}for(let tt=m-1;tt>=0;tt--){let rt=tt/m,at=d*Math.cos(rt*Math.PI/2),ot=g*Math.sin(rt*Math.PI/2)+v;for(let ht=0,Bt=B.length;ht<Bt;ht++){let Ut=$(B[ht],X[ht],ot);xt(Ut.x,Ut.y,f+at)}for(let ht=0,Bt=D.length;ht<Bt;ht++){let Ut=D[ht];et=j[ht];for(let Wt=0,qt=Ut.length;Wt<qt;Wt++){let I=$(Ut[Wt],et[Wt],ot);y?xt(I.x,I.y+E[h-1].y,E[h-1].x+at):xt(I.x,I.y,f+at)}}}ae(),Z();function ae(){let tt=s.length/3;if(u){let rt=0,at=W*rt;for(let ot=0;ot<ue;ot++){let ht=wt[ot];Vt(ht[2]+at,ht[1]+at,ht[0]+at)}rt=h+m*2,at=W*rt;for(let ot=0;ot<ue;ot++){let ht=wt[ot];Vt(ht[0]+at,ht[1]+at,ht[2]+at)}}else{for(let rt=0;rt<ue;rt++){let at=wt[rt];Vt(at[2],at[1],at[0])}for(let rt=0;rt<ue;rt++){let at=wt[rt];Vt(at[0]+W*h,at[1]+W*h,at[2]+W*h)}}i.addGroup(tt,s.length/3-tt,0)}function Z(){let tt=s.length/3,rt=0;Q(B,rt),rt+=B.length;for(let at=0,ot=D.length;at<ot;at++){let ht=D[at];Q(ht,rt),rt+=ht.length}i.addGroup(tt,s.length/3-tt,1)}function Q(tt,rt){let at=tt.length;for(;--at>=0;){let ot=at,ht=at-1;ht<0&&(ht=tt.length-1);for(let Bt=0,Ut=h+m*2;Bt<Ut;Bt++){let Wt=W*Bt,qt=W*(Bt+1),I=rt+ot+Wt,pe=rt+ht+Wt,se=rt+ht+qt,A=rt+ot+qt;Mt(I,pe,se,A)}}}function xt(tt,rt,at){l.push(tt),l.push(rt),l.push(at)}function Vt(tt,rt,at){Gt(tt),Gt(rt),Gt(at);let ot=s.length/3,ht=b.generateTopUV(i,s,ot-3,ot-2,ot-1);ve(ht[0]),ve(ht[1]),ve(ht[2])}function Mt(tt,rt,at,ot){Gt(tt),Gt(rt),Gt(ot),Gt(rt),Gt(at),Gt(ot);let ht=s.length/3,Bt=b.generateSideWallUV(i,s,ht-6,ht-3,ht-2,ht-1);ve(Bt[0]),ve(Bt[1]),ve(Bt[3]),ve(Bt[1]),ve(Bt[2]),ve(Bt[3])}function Gt(tt){s.push(l[tt*3+0]),s.push(l[tt*3+1]),s.push(l[tt*3+2])}function ve(tt){r.push(tt.x),r.push(tt.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),e=this.parameters.shapes,i=this.parameters.options;return Ap(e,i,t)}static fromJSON(t,e){let i=[];for(let r=0,a=t.shapes.length;r<a;r++){let o=e[t.shapes[r]];i.push(o)}let s=t.options.extrudePath;return s!==void 0&&(t.options.extrudePath=new Co[s.type]().fromJSON(s)),new n(i,t.options)}},Tp={generateTopUV:function(n,t,e,i,s){let r=t[e*3],a=t[e*3+1],o=t[i*3],l=t[i*3+1],c=t[s*3],h=t[s*3+1];return[new it(r,a),new it(o,l),new it(c,h)]},generateSideWallUV:function(n,t,e,i,s,r){let a=t[e*3],o=t[e*3+1],l=t[e*3+2],c=t[i*3],h=t[i*3+1],f=t[i*3+2],u=t[s*3],d=t[s*3+1],g=t[s*3+2],v=t[r*3],m=t[r*3+1],p=t[r*3+2];return Math.abs(o-h)<Math.abs(a-c)?[new it(a,1-l),new it(c,1-f),new it(u,1-g),new it(v,1-p)]:[new it(o,1-l),new it(h,1-f),new it(d,1-g),new it(m,1-p)]}};function Ap(n,t,e){if(e.shapes=[],Array.isArray(n))for(let i=0,s=n.length;i<s;i++){let r=n[i];e.shapes.push(r.uuid)}else e.shapes.push(n.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}var Gr=class n extends wo{constructor(t=1,e=0){let i=(1+Math.sqrt(5))/2,s=[-1,i,0,1,i,0,-1,-i,0,1,-i,0,0,-1,i,0,1,i,0,-1,-i,0,1,-i,i,0,-1,i,0,1,-i,0,-1,-i,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new n(t.radius,t.detail)}},ss=class n extends Te{constructor(t=[new it(0,-.5),new it(.5,0),new it(0,.5)],e=12,i=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:i,phiLength:s},e=Math.floor(e),s=Jt(s,0,Math.PI*2);let r=[],a=[],o=[],l=[],c=[],h=1/e,f=new R,u=new it,d=new R,g=new R,v=new R,m=0,p=0;for(let b=0;b<=t.length-1;b++)switch(b){case 0:m=t[b+1].x-t[b].x,p=t[b+1].y-t[b].y,d.x=p*1,d.y=-m,d.z=p*0,v.copy(d),d.normalize(),l.push(d.x,d.y,d.z);break;case t.length-1:l.push(v.x,v.y,v.z);break;default:m=t[b+1].x-t[b].x,p=t[b+1].y-t[b].y,d.x=p*1,d.y=-m,d.z=p*0,g.copy(d),d.x+=v.x,d.y+=v.y,d.z+=v.z,d.normalize(),l.push(d.x,d.y,d.z),v.copy(g)}for(let b=0;b<=e;b++){let E=i+b*h*s,y=Math.sin(E),w=Math.cos(E);for(let S=0;S<=t.length-1;S++){f.x=t[S].x*y,f.y=t[S].y,f.z=t[S].x*w,a.push(f.x,f.y,f.z),u.x=b/e,u.y=S/(t.length-1),o.push(u.x,u.y);let C=l[3*S+0]*y,_=l[3*S+1],T=l[3*S+0]*w;c.push(C,_,T)}}for(let b=0;b<e;b++)for(let E=0;E<t.length-1;E++){let y=E+b*t.length,w=y,S=y+t.length,C=y+t.length+1,_=y+1;r.push(w,S,_),r.push(C,_,S)}this.setIndex(r),this.setAttribute("position",new Yt(a,3)),this.setAttribute("uv",new Yt(o,2)),this.setAttribute("normal",new Yt(c,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.points,t.segments,t.phiStart,t.phiLength)}};var xi=class n extends Te{constructor(t=1,e=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:s};let r=t/2,a=e/2,o=Math.floor(i),l=Math.floor(s),c=o+1,h=l+1,f=t/o,u=e/l,d=[],g=[],v=[],m=[];for(let p=0;p<h;p++){let b=p*u-a;for(let E=0;E<c;E++){let y=E*f-r;g.push(y,-b,0),v.push(0,0,1),m.push(E/o),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let b=0;b<o;b++){let E=b+c*p,y=b+c*(p+1),w=b+1+c*(p+1),S=b+1+c*p;d.push(E,y,S),d.push(y,w,S)}this.setIndex(d),this.setAttribute("position",new Yt(g,3)),this.setAttribute("normal",new Yt(v,3)),this.setAttribute("uv",new Yt(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.width,t.height,t.widthSegments,t.heightSegments)}},Wr=class n extends Te{constructor(t=.5,e=1,i=32,s=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:i,phiSegments:s,thetaStart:r,thetaLength:a},i=Math.max(3,i),s=Math.max(1,s);let o=[],l=[],c=[],h=[],f=t,u=(e-t)/s,d=new R,g=new it;for(let v=0;v<=s;v++){for(let m=0;m<=i;m++){let p=r+m/i*a;d.x=f*Math.cos(p),d.y=f*Math.sin(p),l.push(d.x,d.y,d.z),c.push(0,0,1),g.x=(d.x/e+1)/2,g.y=(d.y/e+1)/2,h.push(g.x,g.y)}f+=u}for(let v=0;v<s;v++){let m=v*(i+1);for(let p=0;p<i;p++){let b=p+m,E=b,y=b+i+1,w=b+i+2,S=b+1;o.push(E,y,S),o.push(y,w,S)}}this.setIndex(o),this.setAttribute("position",new Yt(l,3)),this.setAttribute("normal",new Yt(c,3)),this.setAttribute("uv",new Yt(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}};var _i=class n extends Te{constructor(t=1,e=32,i=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:i,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),i=Math.max(2,Math.floor(i));let l=Math.min(a+o,Math.PI),c=0,h=[],f=new R,u=new R,d=[],g=[],v=[],m=[];for(let p=0;p<=i;p++){let b=[],E=p/i,y=a+E*o,w=t*Math.cos(y),S=Math.sqrt(t*t-w*w),C=0;p===0&&a===0?C=.5/e:p===i&&l===Math.PI&&(C=-.5/e);for(let _=0;_<=e;_++){let T=_/e,P=s+T*r;f.x=-S*Math.cos(P),f.y=w,f.z=S*Math.sin(P),g.push(f.x,f.y,f.z),u.copy(f).normalize(),v.push(u.x,u.y,u.z),m.push(T+C,1-E),b.push(c++)}h.push(b)}for(let p=0;p<i;p++)for(let b=0;b<e;b++){let E=h[p][b+1],y=h[p][b],w=h[p+1][b],S=h[p+1][b+1];(p!==0||a>0)&&d.push(E,y,S),(p!==i-1||l<Math.PI)&&d.push(y,w,S)}this.setIndex(d),this.setAttribute("position",new Yt(g,3)),this.setAttribute("normal",new Yt(v,3)),this.setAttribute("uv",new Yt(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};var $r=class n extends Te{constructor(t=1,e=.4,i=12,s=48,r=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:i,tubularSegments:s,arc:r,thetaStart:a,thetaLength:o},i=Math.floor(i),s=Math.floor(s);let l=[],c=[],h=[],f=[],u=new R,d=new R,g=new R;for(let v=0;v<=i;v++){let m=a+v/i*o;for(let p=0;p<=s;p++){let b=p/s*r;d.x=(t+e*Math.cos(m))*Math.cos(b),d.y=(t+e*Math.cos(m))*Math.sin(b),d.z=e*Math.sin(m),c.push(d.x,d.y,d.z),u.x=t*Math.cos(b),u.y=t*Math.sin(b),g.subVectors(d,u).normalize(),h.push(g.x,g.y,g.z),f.push(p/s),f.push(v/i)}}for(let v=1;v<=i;v++)for(let m=1;m<=s;m++){let p=(s+1)*v+m-1,b=(s+1)*(v-1)+m-1,E=(s+1)*(v-1)+m,y=(s+1)*v+m;l.push(p,b,y),l.push(b,E,y)}this.setIndex(l),this.setAttribute("position",new Yt(c,3)),this.setAttribute("normal",new Yt(h,3)),this.setAttribute("uv",new Yt(f,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc,t.thetaStart,t.thetaLength)}};var $s=class n extends Te{constructor(t=new Or(new R(-1,-1,0),new R(-1,1,0),new R(1,1,0)),e=64,i=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:i,radialSegments:s,closed:r};let a=t.computeFrenetFrames(e,r);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;let o=new R,l=new R,c=new it,h=new R,f=[],u=[],d=[],g=[];v(),this.setIndex(g),this.setAttribute("position",new Yt(f,3)),this.setAttribute("normal",new Yt(u,3)),this.setAttribute("uv",new Yt(d,2));function v(){for(let E=0;E<e;E++)m(E);m(r===!1?e:0),b(),p()}function m(E){h=t.getPointAt(E/e,h);let y=a.normals[E],w=a.binormals[E];for(let S=0;S<=s;S++){let C=S/s*Math.PI*2,_=Math.sin(C),T=-Math.cos(C);l.x=T*y.x+_*w.x,l.y=T*y.y+_*w.y,l.z=T*y.z+_*w.z,l.normalize(),u.push(l.x,l.y,l.z),o.x=h.x+i*l.x,o.y=h.y+i*l.y,o.z=h.z+i*l.z,f.push(o.x,o.y,o.z)}}function p(){for(let E=1;E<=e;E++)for(let y=1;y<=s;y++){let w=(s+1)*(E-1)+(y-1),S=(s+1)*E+(y-1),C=(s+1)*E+y,_=(s+1)*(E-1)+y;g.push(w,S,_),g.push(S,C,_)}}function b(){for(let E=0;E<=e;E++)for(let y=0;y<=s;y++)c.x=E/e,c.y=y/s,d.push(c.x,c.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new n(new Co[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}};var Xs=class extends zi{constructor(t){super(),this.isShadowMaterial=!0,this.type="ShadowMaterial",this.color=new Ft(0),this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.fog=t.fog,this}};function ls(n){let t={};for(let e in n){t[e]={};for(let i in n[e]){let s=n[e][i];if(Su(s))s.isRenderTargetTexture?(Ot("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=s.clone();else if(Array.isArray(s))if(Su(s[0])){let r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();t[e][i]=r}else t[e][i]=s.slice();else t[e][i]=s}}return t}function si(n){let t={};for(let e=0;e<n.length;e++){let i=ls(n[e]);for(let s in i)t[s]=i[s]}return t}function Su(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function Cp(n){let t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function hh(n){let t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ie.workingColorSpace}var gn={clone:ls,merge:si},Rp=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Pp=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Ae=class extends zi{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Rp,this.fragmentShader=Pp,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=ls(t.uniforms),this.uniformsGroups=Cp(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let i={};for(let s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(let i in t.uniforms){let s=t.uniforms[i];switch(this.uniforms[i]={},s.type){case"t":this.uniforms[i].value=e[s.value]||null;break;case"c":this.uniforms[i].value=new Ft().setHex(s.value);break;case"v2":this.uniforms[i].value=new it().fromArray(s.value);break;case"v3":this.uniforms[i].value=new R().fromArray(s.value);break;case"v4":this.uniforms[i].value=new Ce().fromArray(s.value);break;case"m3":this.uniforms[i].value=new Xt().fromArray(s.value);break;case"m4":this.uniforms[i].value=new he().fromArray(s.value);break;default:this.uniforms[i].value=s.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(let i in t.extensions)this.extensions[i]=t.extensions[i];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}},qs=class extends Ae{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},De=class extends zi{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ft(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ft(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=pa,this.normalScale=new it(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ai,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}},Ln=class extends De{constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new it(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Jt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Ft(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Ft(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Ft(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(t){this._retroreflectivity>0!=t>0&&this.version++,this._retroreflectivity=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.retroreflectivity=t.retroreflectivity,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}};var Xr=class extends zi{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Ft(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ft(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=pa,this.normalScale=new it(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ai,this.combine=$o,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.envMapIntensity=t.envMapIntensity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}},Po=class extends zi{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=ed,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},Io=class extends zi{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function Rs(n,t){return!n||n.constructor===t?n:typeof t.BYTES_PER_ELEMENT=="number"?new t(n):Array.prototype.slice.call(n)}function Uc(n){return n!==void 0&&n.inTangents!==void 0&&n.outTangents!==void 0}var Dn=class{constructor(t,e,i,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(i),this.sampleValues=e,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,i=this._cachedIndex,s=e[i],r=e[i-1];i:{t:{let a;e:{n:if(!(t<s)){for(let o=i+2;;){if(s===void 0){if(t<r)break n;return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===o)break;if(r=s,s=e[++i],t<s)break t}a=e.length;break e}if(!(t>=r)){let o=e[1];t<o&&(i=2,r=o);for(let l=i-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===l)break;if(s=r,r=e[--i-1],t>=r)break t}a=i,i=0;break e}break i}for(;i<a;){let o=i+a>>>1;t<e[o]?a=o:i=o+1}if(s=e[i],r=e[i-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,r,s)}return this.interpolate_(i,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,i=this.sampleValues,s=this.valueSize,r=t*s;for(let a=0;a!==s;++a)e[a]=i[r+a];return e}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},Lo=class extends Dn{constructor(t,e,i,s){super(t,e,i,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Bc,endingEnd:Bc}}intervalChanged_(t,e,i){let s=this.parameterPositions,r=t-2,a=t+1,o=s[r],l=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case kc:r=t,o=2*e-i;break;case zc:r=s.length-2,o=e+s[r]-s[r+1];break;default:r=t,o=i}if(l===void 0)switch(this.getSettings_().endingEnd){case kc:a=t,l=2*i-e;break;case zc:a=1,l=i+s[1]-s[0];break;default:a=t-1,l=e}let c=(i-e)*.5,h=this.valueSize;this._weightPrev=c/(e-o),this._weightNext=c/(l-i),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(t,e,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=this._offsetPrev,f=this._offsetNext,u=this._weightPrev,d=this._weightNext,g=(i-e)/(s-e),v=g*g,m=v*g,p=-u*m+2*u*v-u*g,b=(1+u)*m+(-1.5-2*u)*v+(-.5+u)*g+1,E=(-1-d)*m+(1.5+d)*v+.5*g,y=d*m-d*v;for(let w=0;w!==o;++w)r[w]=p*a[h+w]+b*a[c+w]+E*a[l+w]+y*a[f+w];return r}},Do=class extends Dn{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t,e,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=(i-e)/(s-e),f=1-h;for(let u=0;u!==o;++u)r[u]=a[c+u]*f+a[l+u]*h;return r}},No=class extends Dn{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t){return this.copySampleValue_(t-1)}},Uo=class extends Dn{interpolate_(t,e,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=this.inTangents,f=this.outTangents;if(!h||!f){let g=(i-e)/(s-e),v=1-g;for(let m=0;m!==o;++m)r[m]=a[c+m]*v+a[l+m]*g;return r}let u=o*2,d=t-1;for(let g=0;g!==o;++g){let v=a[c+g],m=a[l+g],p=d*u+g*2,b=f[p],E=f[p+1],y=t*u+g*2,w=h[y],S=h[y+1],C=Lp(i,e,b,w,s);r[g]=yd(C,v,E,S,m)}return r}};function yd(n,t,e,i,s){let r=1-n;return r*r*r*t+3*r*r*n*e+3*r*n*n*i+n*n*n*s}function Ip(n,t,e,i,s){let r=1-n;return 3*r*r*(e-t)+6*r*n*(i-e)+3*n*n*(s-i)}function Lp(n,t,e,i,s){let r=(n-t)/(s-t);for(let a=0;a<8;a++){let o=yd(r,t,e,i,s)-n;if(Math.abs(o)<1e-10)break;let l=Ip(r,t,e,i,s);if(Math.abs(l)<1e-10)break;r=Math.max(0,Math.min(1,r-o/l))}return r}var vi=class{constructor(t,e,i,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=Rs(e,this.TimeBufferType),this.values=Rs(i,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,i;if(e.toJSON!==this.toJSON)i=e.toJSON(t);else{i={name:t.name,times:Rs(t.times,Array),values:Rs(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(i.interpolation=s),Uc(t.settings)&&(i.settings={inTangents:Rs(t.settings.inTangents,Array),outTangents:Rs(t.settings.outTangents,Array)})}return i.type=t.ValueTypeName,i}InterpolantFactoryMethodDiscrete(t){return new No(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Do(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Lo(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodBezier(t){let e=new Uo(this.times,this.values,this.getValueSize(),t);return this.settings&&(e.inTangents=this.settings.inTangents,e.outTangents=this.settings.outTangents),e}setInterpolation(t){let e;switch(t){case Mr:e=this.InterpolantFactoryMethodDiscrete;break;case mo:e=this.InterpolantFactoryMethodLinear;break;case no:e=this.InterpolantFactoryMethodSmooth;break;case Oc:e=this.InterpolantFactoryMethodBezier;break}if(e===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return Ot("KeyframeTrack:",i),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Mr;case this.InterpolantFactoryMethodLinear:return mo;case this.InterpolantFactoryMethodSmooth:return no;case this.InterpolantFactoryMethodBezier:return Oc}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let i=0,s=e.length;i!==s;++i)e[i]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let i=0,s=e.length;i!==s;++i)e[i]*=t;Uc(this.settings)&&(wu(this.settings.inTangents,t),wu(this.settings.outTangents,t))}return this}trim(t,e){let i=this.times,s=i.length,r=0,a=s-1;for(;r!==s&&i[r]<t;)++r;for(;a!==-1&&i[a]>e;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=i.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(Ht("KeyframeTrack: Invalid value size in track.",this),t=!1);let i=this.times,s=this.values,r=i.length;r===0&&(Ht("KeyframeTrack: Track is empty.",this),t=!1);let a=null;for(let o=0;o!==r;o++){let l=i[o];if(typeof l=="number"&&isNaN(l)){Ht("KeyframeTrack: Time is not a valid number.",this,o,l),t=!1;break}if(a!==null&&a>l){Ht("KeyframeTrack: Out of order keys.",this,o,l,a),t=!1;break}a=l}if(s!==void 0&&Uf(s))for(let o=0,l=s.length;o!==l;++o){let c=s[o];if(isNaN(c)){Ht("KeyframeTrack: Value is not a valid number.",this,o,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),i=this.getValueSize(),s=this.getInterpolation()===no,r=t.length-1,a=1;for(let o=1;o<r;++o){let l=!1,c=t[o],h=t[o+1];if(c!==h&&(o!==1||c!==t[0]))if(s)l=!0;else{let f=o*i,u=f-i,d=f+i;for(let g=0;g!==i;++g){let v=e[f+g];if(v!==e[u+g]||v!==e[d+g]){l=!0;break}}}if(l){if(o!==a){t[a]=t[o];let f=o*i,u=a*i;for(let d=0;d!==i;++d)e[u+d]=e[f+d]}++a}}if(r>0){t[a]=t[r];for(let o=r*i,l=a*i,c=0;c!==i;++c)e[l+c]=e[o+c];++a}return a!==t.length?(this.times=t.slice(0,a),this.values=e.slice(0,a*i)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),i=this.constructor,s=new i(this.name,t,e);return s.createInterpolant=this.createInterpolant,Uc(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}};function wu(n,t){for(let e=0,i=n.length;e!==i;e+=2)n[e]*=t}vi.prototype.ValueTypeName="";vi.prototype.TimeBufferType=Float32Array;vi.prototype.ValueBufferType=Float32Array;vi.prototype.DefaultInterpolation=mo;var Nn=class extends vi{constructor(t,e,i){super(t,e,i)}};Nn.prototype.ValueTypeName="bool";Nn.prototype.ValueBufferType=Array;Nn.prototype.DefaultInterpolation=Mr;Nn.prototype.InterpolantFactoryMethodLinear=void 0;Nn.prototype.InterpolantFactoryMethodSmooth=void 0;var Fo=class extends vi{constructor(t,e,i,s){super(t,e,i,s)}};Fo.prototype.ValueTypeName="color";var Oo=class extends vi{constructor(t,e,i,s){super(t,e,i,s)}};Oo.prototype.ValueTypeName="number";var Bo=class extends Dn{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t,e,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(i-e)/(s-e),c=t*o;for(let h=c+o;c!==h;c+=4)Ti.slerpFlat(r,0,a,c-o,a,c,l);return r}},qr=class extends vi{constructor(t,e,i,s){super(t,e,i,s)}InterpolantFactoryMethodLinear(t){return new Bo(this.times,this.values,this.getValueSize(),t)}};qr.prototype.ValueTypeName="quaternion";qr.prototype.InterpolantFactoryMethodSmooth=void 0;var Un=class extends vi{constructor(t,e,i){super(t,e,i)}};Un.prototype.ValueTypeName="string";Un.prototype.ValueBufferType=Array;Un.prototype.DefaultInterpolation=Mr;Un.prototype.InterpolantFactoryMethodLinear=void 0;Un.prototype.InterpolantFactoryMethodSmooth=void 0;var ko=class extends vi{constructor(t,e,i,s){super(t,e,i,s)}};ko.prototype.ValueTypeName="vector";var zo=class{constructor(t,e,i){let s=this,r=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=i,this._abortController=null,this.itemStart=function(h){o++,r===!1&&s.onStart!==void 0&&s.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,s.onProgress!==void 0&&s.onProgress(h,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,f){return c.push(h,f),this},this.removeHandler=function(h){let f=c.indexOf(h);return f!==-1&&c.splice(f,2),this},this.getHandler=function(h){for(let f=0,u=c.length;f<u;f+=2){let d=c[f],g=c[f+1];if(d.global&&(d.lastIndex=0),d.test(h))return g}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},Md=new zo,Ho=class{constructor(t){this.manager=t!==void 0?t:Md,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,e){let i=this;return new Promise(function(s,r){i.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}};Ho.DEFAULT_MATERIAL_NAME="__DEFAULT";var Ys=class extends ke{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Ft(t),this.intensity=e}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}},Yr=class extends Ys{constructor(t,e,i){super(t,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(ke.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ft(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}toJSON(t){let e=super.toJSON(t);return e.object.groundColor=this.groundColor.getHex(),e}},Fc=new he,Eu=new R,Tu=new R,Zr=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new it(512,512),this.mapType=ui,this.map=null,this.mapPass=null,this.matrix=new he,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Hs,this._frameExtents=new it(1,1),this._viewportCount=1,this._viewports=[new Ce(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera;Eu.setFromMatrixPosition(t.matrixWorld),e.position.copy(Eu),Tu.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Tu),e.updateMatrixWorld(),this._updateMatrix(e,this.matrix,this._frustum)}_updateMatrix(t,e,i,s){Fc.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),i.setFromProjectionMatrix(Fc,t.coordinateSystem,t.reversedDepth);let r=this._frameExtents,a=s?s.z/r.x:1,o=s?s.w/r.y:1,l=s?s.x/r.x:0,c=s?s.y/r.y:0;t.coordinateSystem===Us||t.reversedDepth?e.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):e.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),e.multiply(Fc)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}},eo=new R,io=new Ti,Yi=new R,Jr=class extends ke{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new he,this.projectionMatrix=new he,this.projectionMatrixInverse=new he,this.coordinateSystem=ki,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(eo,io,Yi),Yi.x===1&&Yi.y===1&&Yi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(eo,io,Yi.set(1,1,1)).invert()}updateWorldMatrix(t,e,i=!1){super.updateWorldMatrix(t,e,i),this.matrixWorld.decompose(eo,io,Yi),Yi.x===1&&Yi.y===1&&Yi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(eo,io,Yi.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},An=new R,Au=new it,Cu=new it,Oe=class extends Jr{constructor(t=50,e=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=go*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(ro*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return go*2*Math.atan(Math.tan(ro*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){An.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(An.x,An.y).multiplyScalar(-t/An.z),An.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(An.x,An.y).multiplyScalar(-t/An.z)}getViewSize(t,e){return this.getViewBounds(t,Au,Cu),e.subVectors(Cu,Au)}setViewOffset(t,e,i,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(ro*.5*this.fov)/this.zoom,i=2*e,s=this.aspect*i,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,e-=a.offsetY*i/c,s*=a.width/l,i*=a.height/c}let o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-i,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}};var Wc=class extends Zr{constructor(){super(new Oe(90,1,.5,500)),this.isPointLightShadow=!0}},rs=class extends Ys{constructor(t,e,i=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=s,this.shadow=new Wc}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.distance=this.distance,e.object.decay=this.decay,e.object.shadow=this.shadow.toJSON(),e}},Fn=class extends Jr{constructor(t=-1,e=1,i=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=i-t,a=i+t,o=s+e,l=s-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},$c=class extends Zr{constructor(){super(new Fn(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Qi=class extends Ys{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ke.DEFAULT_UP),this.updateMatrix(),this.target=new ke,this.shadow=new $c}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}};var Ps=-90,Is=1,Vo=class extends ke{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Oe(Ps,Is,t,e);s.layers=this.layers,this.add(s);let r=new Oe(Ps,Is,t,e);r.layers=this.layers,this.add(r);let a=new Oe(Ps,Is,t,e);a.layers=this.layers,this.add(a);let o=new Oe(Ps,Is,t,e);o.layers=this.layers,this.add(o);let l=new Oe(Ps,Is,t,e);l.layers=this.layers,this.add(l);let c=new Oe(Ps,Is,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[i,s,r,a,o,l]=e;for(let c of e)this.remove(c);if(t===ki)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Us)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,l,c,h]=this.children,f=t.getRenderTarget(),u=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;let v=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let m=!1;t.isWebGLRenderer===!0?m=t.state.buffers.depth.getReversed():m=t.reversedDepthBuffer,t.setRenderTarget(i,0,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(i,1,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(i,2,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(i,3,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),t.setRenderTarget(i,4,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),i.texture.generateMipmaps=v,t.setRenderTarget(i,5,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,h),t.setRenderTarget(f,u,d),t.xr.enabled=g,i.texture.needsPMREMUpdate=!0}},Go=class extends Oe{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}},Kr=class{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(t){this._document=t,t.hidden!==void 0&&(this._pageVisibilityHandler=Dp.bind(this),t.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(t){return this._timescale=t,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(t){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(t!==void 0?t:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}};function Dp(){this._document.hidden===!1&&this.reset()}var uh="\\[\\]\\.:\\/",Np=new RegExp("["+uh+"]","g"),dh="[^"+uh+"]",Up="[^"+uh.replace("\\.","")+"]",Fp=/((?:WC+[\/:])*)/.source.replace("WC",dh),Op=/(WCOD+)?/.source.replace("WCOD",Up),Bp=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",dh),kp=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",dh),zp=new RegExp("^"+Fp+Op+Bp+kp+"$"),Hp=["material","materials","bones","map"],Xc=class{constructor(t,e,i){let s=i||Ee.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let i=this._targetGroup.nCachedObjects_,s=this._bindings[i];s!==void 0&&s.getValue(t,e)}setValue(t,e){let i=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=i.length;s!==r;++s)i[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].unbind()}},Ee=class n{constructor(t,e,i){this.path=e,this.parsedPath=i||n.parseTrackName(e),this.node=n.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,i){return t&&t.isAnimationObjectGroup?new n.Composite(t,e,i):new n(t,e,i)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(Np,"")}static parseTrackName(t){let e=zp.exec(t);if(e===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+t);let i={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=i.nodeName&&i.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=i.nodeName.substring(s+1);Hp.indexOf(r)!==-1&&(i.nodeName=i.nodeName.substring(0,s),i.objectName=r)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+t);return i}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let i=t.skeleton.getBoneByName(e);if(i!==void 0)return i}if(t.children){let i=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===e||o.uuid===e)return o;let l=i(o.children);if(l)return l}return null},s=i(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)t[e++]=i[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,i=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=n.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){Ot("PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let c=e.objectIndex;switch(i){case"materials":if(!t.material){Ht("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){Ht("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){Ht("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===c){c=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){Ht("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){Ht("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[i]===void 0){Ht("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[i]}if(c!==void 0){if(t[c]===void 0){Ht("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let a=t[s];if(a===void 0){let c=e.nodeName;Ht("PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",t);return}let o=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?o=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){Ht("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){Ht("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Ee.Composite=Xc;Ee.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Ee.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Ee.prototype.GetterByBindingType=[Ee.prototype._getValue_direct,Ee.prototype._getValue_array,Ee.prototype._getValue_arrayElement,Ee.prototype._getValue_toArray];Ee.prototype.SetterByBindingTypeAndVersioning=[[Ee.prototype._setValue_direct,Ee.prototype._setValue_direct_setNeedsUpdate,Ee.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Ee.prototype._setValue_array,Ee.prototype._setValue_array_setNeedsUpdate,Ee.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Ee.prototype._setValue_arrayElement,Ee.prototype._setValue_arrayElement_setNeedsUpdate,Ee.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Ee.prototype._setValue_fromArray,Ee.prototype._setValue_fromArray_setNeedsUpdate,Ee.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var iv=new Float32Array(1);var Ru=new he,jr=class{constructor(t,e,i=0,s=1/0){this.ray=new zs(t,e),this.near=i,this.far=s,this.camera=null,this.layers=new Bs,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,e.projectionMatrix.elements[14]).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):Ht("Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Ru.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Ru),this}intersectObject(t,e=!0,i=[]){return qc(t,this,i,e),i.sort(Pu),i}intersectObjects(t,e=!0,i=[]){for(let s=0,r=t.length;s<r;s++)qc(t[s],this,i,e);return i.sort(Pu),i}};function Pu(n,t){return n.distance-t.distance}function qc(n,t,e,i){let s=!0;if(n.layers.test(t.layers)&&n.raycast(t,e)===!1&&(s=!1),s===!0&&i===!0){let r=n.children;for(let a=0,o=r.length;a<o;a++)qc(r[a],t,e,!0)}}var Qr=class{constructor(t=1,e=0,i=0){this.radius=t,this.phi=e,this.theta=i}set(t,e,i){return this.radius=t,this.phi=e,this.theta=i,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Jt(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,i){return this.radius=Math.sqrt(t*t+e*e+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,i),this.phi=Math.acos(Jt(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var _h=class _h{constructor(t,e,i,s){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,i,s)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let i=0;i<4;i++)this.elements[i]=t[i+e];return this}set(t,e,i,s){let r=this.elements;return r[0]=t,r[2]=e,r[1]=i,r[3]=s,this}};_h.prototype.isMatrix2=!0;var Yc=_h;function fh(n,t,e,i){let s=Vp(i);switch(e){case rh:return n*t;case jo:return n*t/s.components*s.byteLength;case Qo:return n*t/s.components*s.byteLength;case Vn:return n*t*2/s.components*s.byteLength;case tl:return n*t*2/s.components*s.byteLength;case ah:return n*t*3/s.components*s.byteLength;case Pi:return n*t*4/s.components*s.byteLength;case el:return n*t*4/s.components*s.byteLength;case la:case ca:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case ha:case ua:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case nl:case rl:return Math.max(n,16)*Math.max(t,8)/4;case il:case sl:return Math.max(n,8)*Math.max(t,8)/2;case al:case ol:case cl:case hl:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case ll:case da:case ul:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case dl:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case fl:return Math.floor((n+4)/5)*Math.floor((t+3)/4)*16;case pl:return Math.floor((n+4)/5)*Math.floor((t+4)/5)*16;case ml:return Math.floor((n+5)/6)*Math.floor((t+4)/5)*16;case gl:return Math.floor((n+5)/6)*Math.floor((t+5)/6)*16;case xl:return Math.floor((n+7)/8)*Math.floor((t+4)/5)*16;case _l:return Math.floor((n+7)/8)*Math.floor((t+5)/6)*16;case vl:return Math.floor((n+7)/8)*Math.floor((t+7)/8)*16;case yl:return Math.floor((n+9)/10)*Math.floor((t+4)/5)*16;case Ml:return Math.floor((n+9)/10)*Math.floor((t+5)/6)*16;case bl:return Math.floor((n+9)/10)*Math.floor((t+7)/8)*16;case Sl:return Math.floor((n+9)/10)*Math.floor((t+9)/10)*16;case wl:return Math.floor((n+11)/12)*Math.floor((t+9)/10)*16;case El:return Math.floor((n+11)/12)*Math.floor((t+11)/12)*16;case Tl:case Al:case Cl:return Math.ceil(n/4)*Math.ceil(t/4)*16;case Rl:case Pl:return Math.ceil(n/4)*Math.ceil(t/4)*8;case fa:case Il:return Math.ceil(n/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Vp(n){switch(n){case ui:case eh:return{byteLength:1,components:1};case Js:case ih:case Ke:return{byteLength:2,components:1};case Jo:case Ko:return{byteLength:2,components:4};case Vi:case Zo:case Ri:return{byteLength:4,components:1};case nh:case sh:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window<"u"&&(window.__THREE__?Ot("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");function Gd(){let n=null,t=!1,e=null,i=null;function s(r,a){i=n.requestAnimationFrame(s),e(r,a)}return{start:function(){t!==!0&&e!==null&&n!==null&&(i=n.requestAnimationFrame(s),t=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){n=r}}}function Wp(n){let t=new WeakMap;function e(o,l){let c=o.array,h=o.usage,f=c.byteLength,u=n.createBuffer();n.bindBuffer(l,u),n.bufferData(l,c,h),o.onUploadCallback();let d;if(c instanceof Float32Array)d=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)d=n.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?d=n.HALF_FLOAT:d=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=n.SHORT;else if(c instanceof Uint32Array)d=n.UNSIGNED_INT;else if(c instanceof Int32Array)d=n.INT;else if(c instanceof Int8Array)d=n.BYTE;else if(c instanceof Uint8Array)d=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:f}}function i(o,l,c){let h=l.array,f=l.updateRanges;if(n.bindBuffer(c,o),f.length===0)n.bufferSubData(c,0,h);else{f.sort((d,g)=>d.start-g.start);let u=0;for(let d=1;d<f.length;d++){let g=f[u],v=f[d];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++u,f[u]=v)}f.length=u+1;for(let d=0,g=f.length;d<g;d++){let v=f[d];n.bufferSubData(c,v.start*h.BYTES_PER_ELEMENT,h,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=t.get(o);l&&(n.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var $p=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Xp=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,qp=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Yp=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Zp=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Jp=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Kp=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,jp=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Qp=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,tm=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,em=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,im=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,nm=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,sm=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,rm=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,am=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,om=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,lm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,cm=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,hm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,um=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,dm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,fm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,pm=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,mm=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,gm=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,xm=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,_m=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,vm=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,ym=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Mm="gl_FragColor = linearToOutputTexel( gl_FragColor );",bm=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Sm=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,wm=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Em=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Tm=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Am=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Cm=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Rm=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Pm=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Im=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Lm=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Dm=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Nm=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Um=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Fm=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,Om=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,Bm=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,km=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,zm=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Hm=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Vm=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Gm=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Wm=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,$m=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Xm=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,qm=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,Ym=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Zm=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Jm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Km=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,jm=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Qm=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,tg=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,eg=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ig=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,ng=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,sg=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,rg=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,ag=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,og=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,lg=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,cg=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,hg=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,ug=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,dg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,fg=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,pg=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,mg=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,gg=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,xg=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,_g=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,vg=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,yg=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,Mg=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,bg=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Sg=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,wg=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Eg=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Tg=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Ag=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,Cg=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Rg=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Pg=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Ig=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Lg=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Dg=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Ng=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Ug=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Fg=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Og=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Bg=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,kg=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,zg=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Hg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Vg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Gg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Wg=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,$g=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Xg=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,qg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Yg=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Zg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Jg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Kg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,jg=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Qg=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,t0=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,e0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,i0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,n0=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,s0=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,r0=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,a0=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,o0=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,l0=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,c0=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,h0=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,u0=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,d0=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,f0=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,p0=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,m0=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,g0=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,x0=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,_0=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,v0=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,y0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,M0=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,b0=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,S0=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,w0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,te={alphahash_fragment:$p,alphahash_pars_fragment:Xp,alphamap_fragment:qp,alphamap_pars_fragment:Yp,alphatest_fragment:Zp,alphatest_pars_fragment:Jp,aomap_fragment:Kp,aomap_pars_fragment:jp,batching_pars_vertex:Qp,batching_vertex:tm,begin_vertex:em,beginnormal_vertex:im,bsdfs:nm,iridescence_fragment:sm,bumpmap_pars_fragment:rm,clipping_planes_fragment:am,clipping_planes_pars_fragment:om,clipping_planes_pars_vertex:lm,clipping_planes_vertex:cm,color_fragment:hm,color_pars_fragment:um,color_pars_vertex:dm,color_vertex:fm,common:pm,cube_uv_reflection_fragment:mm,defaultnormal_vertex:gm,displacementmap_pars_vertex:xm,displacementmap_vertex:_m,emissivemap_fragment:vm,emissivemap_pars_fragment:ym,colorspace_fragment:Mm,colorspace_pars_fragment:bm,envmap_fragment:Sm,envmap_common_pars_fragment:wm,envmap_pars_fragment:Em,envmap_pars_vertex:Tm,envmap_physical_pars_fragment:Om,envmap_vertex:Am,fog_vertex:Cm,fog_pars_vertex:Rm,fog_fragment:Pm,fog_pars_fragment:Im,gradientmap_pars_fragment:Lm,lightmap_pars_fragment:Dm,lights_lambert_fragment:Nm,lights_lambert_pars_fragment:Um,lights_pars_begin:Fm,lights_toon_fragment:Bm,lights_toon_pars_fragment:km,lights_phong_fragment:zm,lights_phong_pars_fragment:Hm,lights_physical_fragment:Vm,lights_physical_pars_fragment:Gm,lights_fragment_begin:Wm,lights_fragment_maps:$m,lights_fragment_end:Xm,lightprobes_pars_fragment:qm,logdepthbuf_fragment:Ym,logdepthbuf_pars_fragment:Zm,logdepthbuf_pars_vertex:Jm,logdepthbuf_vertex:Km,map_fragment:jm,map_pars_fragment:Qm,map_particle_fragment:tg,map_particle_pars_fragment:eg,metalnessmap_fragment:ig,metalnessmap_pars_fragment:ng,morphinstance_vertex:sg,morphcolor_vertex:rg,morphnormal_vertex:ag,morphtarget_pars_vertex:og,morphtarget_vertex:lg,normal_fragment_begin:cg,normal_fragment_maps:hg,normal_pars_fragment:ug,normal_pars_vertex:dg,normal_vertex:fg,normalmap_pars_fragment:pg,clearcoat_normal_fragment_begin:mg,clearcoat_normal_fragment_maps:gg,clearcoat_pars_fragment:xg,iridescence_pars_fragment:_g,opaque_fragment:vg,packing:yg,premultiplied_alpha_fragment:Mg,project_vertex:bg,dithering_fragment:Sg,dithering_pars_fragment:wg,roughnessmap_fragment:Eg,roughnessmap_pars_fragment:Tg,shadowmap_pars_fragment:Ag,shadowmap_pars_vertex:Cg,shadowmap_vertex:Rg,shadowmask_pars_fragment:Pg,skinbase_vertex:Ig,skinning_pars_vertex:Lg,skinning_vertex:Dg,skinnormal_vertex:Ng,specularmap_fragment:Ug,specularmap_pars_fragment:Fg,tonemapping_fragment:Og,tonemapping_pars_fragment:Bg,transmission_fragment:kg,transmission_pars_fragment:zg,uv_pars_fragment:Hg,uv_pars_vertex:Vg,uv_vertex:Gg,worldpos_vertex:Wg,background_vert:$g,background_frag:Xg,backgroundCube_vert:qg,backgroundCube_frag:Yg,cube_vert:Zg,cube_frag:Jg,depth_vert:Kg,depth_frag:jg,distance_vert:Qg,distance_frag:t0,equirect_vert:e0,equirect_frag:i0,linedashed_vert:n0,linedashed_frag:s0,meshbasic_vert:r0,meshbasic_frag:a0,meshlambert_vert:o0,meshlambert_frag:l0,meshmatcap_vert:c0,meshmatcap_frag:h0,meshnormal_vert:u0,meshnormal_frag:d0,meshphong_vert:f0,meshphong_frag:p0,meshphysical_vert:m0,meshphysical_frag:g0,meshtoon_vert:x0,meshtoon_frag:_0,points_vert:v0,points_frag:y0,shadow_vert:M0,shadow_frag:b0,sprite_vert:S0,sprite_frag:w0},gt={common:{diffuse:{value:new Ft(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Xt},alphaMap:{value:null},alphaMapTransform:{value:new Xt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Xt}},envmap:{envMap:{value:null},envMapRotation:{value:new Xt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Xt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Xt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Xt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Xt},normalScale:{value:new it(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Xt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Xt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Xt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Xt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ft(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new R},probesMax:{value:new R},probesResolution:{value:new R}},points:{diffuse:{value:new Ft(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Xt},alphaTest:{value:0},uvTransform:{value:new Xt}},sprite:{diffuse:{value:new Ft(16777215)},opacity:{value:1},center:{value:new it(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Xt},alphaMap:{value:null},alphaMapTransform:{value:new Xt},alphaTest:{value:0}}},sn={basic:{uniforms:si([gt.common,gt.specularmap,gt.envmap,gt.aomap,gt.lightmap,gt.fog]),vertexShader:te.meshbasic_vert,fragmentShader:te.meshbasic_frag},lambert:{uniforms:si([gt.common,gt.specularmap,gt.envmap,gt.aomap,gt.lightmap,gt.emissivemap,gt.bumpmap,gt.normalmap,gt.displacementmap,gt.fog,gt.lights,{emissive:{value:new Ft(0)},envMapIntensity:{value:1}}]),vertexShader:te.meshlambert_vert,fragmentShader:te.meshlambert_frag},phong:{uniforms:si([gt.common,gt.specularmap,gt.envmap,gt.aomap,gt.lightmap,gt.emissivemap,gt.bumpmap,gt.normalmap,gt.displacementmap,gt.fog,gt.lights,{emissive:{value:new Ft(0)},specular:{value:new Ft(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:te.meshphong_vert,fragmentShader:te.meshphong_frag},standard:{uniforms:si([gt.common,gt.envmap,gt.aomap,gt.lightmap,gt.emissivemap,gt.bumpmap,gt.normalmap,gt.displacementmap,gt.roughnessmap,gt.metalnessmap,gt.fog,gt.lights,{emissive:{value:new Ft(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:te.meshphysical_vert,fragmentShader:te.meshphysical_frag},toon:{uniforms:si([gt.common,gt.aomap,gt.lightmap,gt.emissivemap,gt.bumpmap,gt.normalmap,gt.displacementmap,gt.gradientmap,gt.fog,gt.lights,{emissive:{value:new Ft(0)}}]),vertexShader:te.meshtoon_vert,fragmentShader:te.meshtoon_frag},matcap:{uniforms:si([gt.common,gt.bumpmap,gt.normalmap,gt.displacementmap,gt.fog,{matcap:{value:null}}]),vertexShader:te.meshmatcap_vert,fragmentShader:te.meshmatcap_frag},points:{uniforms:si([gt.points,gt.fog]),vertexShader:te.points_vert,fragmentShader:te.points_frag},dashed:{uniforms:si([gt.common,gt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:te.linedashed_vert,fragmentShader:te.linedashed_frag},depth:{uniforms:si([gt.common,gt.displacementmap]),vertexShader:te.depth_vert,fragmentShader:te.depth_frag},normal:{uniforms:si([gt.common,gt.bumpmap,gt.normalmap,gt.displacementmap,{opacity:{value:1}}]),vertexShader:te.meshnormal_vert,fragmentShader:te.meshnormal_frag},sprite:{uniforms:si([gt.sprite,gt.fog]),vertexShader:te.sprite_vert,fragmentShader:te.sprite_frag},background:{uniforms:{uvTransform:{value:new Xt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:te.background_vert,fragmentShader:te.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Xt}},vertexShader:te.backgroundCube_vert,fragmentShader:te.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:te.cube_vert,fragmentShader:te.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:te.equirect_vert,fragmentShader:te.equirect_frag},distance:{uniforms:si([gt.common,gt.displacementmap,{referencePosition:{value:new R},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:te.distance_vert,fragmentShader:te.distance_frag},shadow:{uniforms:si([gt.lights,gt.fog,{color:{value:new Ft(0)},opacity:{value:1}}]),vertexShader:te.shadow_vert,fragmentShader:te.shadow_frag}};sn.physical={uniforms:si([sn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Xt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Xt},clearcoatNormalScale:{value:new it(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Xt},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Xt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Xt},sheen:{value:0},sheenColor:{value:new Ft(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Xt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Xt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Xt},transmissionSamplerSize:{value:new it},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Xt},attenuationDistance:{value:0},attenuationColor:{value:new Ft(0)},specularColor:{value:new Ft(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Xt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Xt},anisotropyVector:{value:new it},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Xt}}]),vertexShader:te.meshphysical_vert,fragmentShader:te.meshphysical_frag};var Nl={r:0,b:0,g:0},E0=new he,Wd=new Xt;Wd.set(-1,0,0,0,1,0,0,0,1);function T0(n,t,e,i,s,r){let a=new Ft(0),o=s===!0?0:1,l,c,h=null,f=0,u=null;function d(b){let E=b.isScene===!0?b.background:null;if(E&&E.isTexture){let y=b.backgroundBlurriness>0;E=t.get(E,y)}return E}function g(b){let E=!1,y=d(b);y===null?m(a,o):y&&y.isColor&&(m(y,1),E=!0);let w=n.xr.getEnvironmentBlendMode();w==="additive"?e.buffers.color.setClear(0,0,0,1,r):w==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(n.autoClear||E)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function v(b,E){let y=d(E);y&&(y.isCubeTexture||y.mapping===aa)?(c===void 0&&(c=new Qt(new hi(1,1,1),new Ae({name:"BackgroundCubeMaterial",uniforms:ls(sn.backgroundCube.uniforms),vertexShader:sn.backgroundCube.vertexShader,fragmentShader:sn.backgroundCube.fragmentShader,side:Je,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(w,S,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=y,c.material.uniforms.backgroundBlurriness.value=E.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(E0.makeRotationFromEuler(E.backgroundRotation)).transpose(),y.isCubeTexture&&y.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(Wd),c.material.toneMapped=ie.getTransfer(y.colorSpace)!==ce,(h!==y||f!==y.version||u!==n.toneMapping)&&(c.material.needsUpdate=!0,h=y,f=y.version,u=n.toneMapping),c.layers.enableAll(),b.unshift(c,c.geometry,c.material,0,0,null)):y&&y.isTexture&&(l===void 0&&(l=new Qt(new xi(2,2),new Ae({name:"BackgroundMaterial",uniforms:ls(sn.background.uniforms),vertexShader:sn.background.vertexShader,fragmentShader:sn.background.fragmentShader,side:On,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=y,l.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,l.material.toneMapped=ie.getTransfer(y.colorSpace)!==ce,y.matrixAutoUpdate===!0&&y.updateMatrix(),l.material.uniforms.uvTransform.value.copy(y.matrix),(h!==y||f!==y.version||u!==n.toneMapping)&&(l.material.needsUpdate=!0,h=y,f=y.version,u=n.toneMapping),l.layers.enableAll(),b.unshift(l,l.geometry,l.material,0,0,null))}function m(b,E){b.getRGB(Nl,hh(n)),e.buffers.color.setClear(Nl.r,Nl.g,Nl.b,E,r)}function p(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(b,E=1){a.set(b),o=E,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(b){o=b,m(a,o)},render:g,addToRenderList:v,dispose:p}}function A0(n,t){let e=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=u(null),r=s,a=!1;function o(D,F,V,N,B){let $=!1,W=f(D,N,V,F);r!==W&&(r=W,c(r.object)),$=d(D,N,V,B),$&&g(D,N,V,B),B!==null&&t.update(B,n.ELEMENT_ARRAY_BUFFER),($||a)&&(a=!1,y(D,F,V,N),B!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(B).buffer))}function l(){return n.createVertexArray()}function c(D){return n.bindVertexArray(D)}function h(D){return n.deleteVertexArray(D)}function f(D,F,V,N){let B=N.wireframe===!0,$=i[F.id];$===void 0&&($={},i[F.id]=$);let W=D.isInstancedMesh===!0?D.id:0,st=$[W];st===void 0&&(st={},$[W]=st);let X=st[V.id];X===void 0&&(X={},st[V.id]=X);let j=X[B];return j===void 0&&(j=u(l()),X[B]=j),j}function u(D){let F=[],V=[],N=[];for(let B=0;B<e;B++)F[B]=0,V[B]=0,N[B]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:F,enabledAttributes:V,attributeDivisors:N,object:D,attributes:{},index:null}}function d(D,F,V,N){let B=r.attributes,$=F.attributes,W=0,st=V.getAttributes();for(let X in st)if(st[X].location>=0){let et=B[X],Pt=$[X];if(Pt===void 0&&(X==="instanceMatrix"&&D.instanceMatrix&&(Pt=D.instanceMatrix),X==="instanceColor"&&D.instanceColor&&(Pt=D.instanceColor)),et===void 0||et.attribute!==Pt||Pt&&et.data!==Pt.data)return!0;W++}return r.attributesNum!==W||r.index!==N}function g(D,F,V,N){let B={},$=F.attributes,W=0,st=V.getAttributes();for(let X in st)if(st[X].location>=0){let et=$[X];et===void 0&&(X==="instanceMatrix"&&D.instanceMatrix&&(et=D.instanceMatrix),X==="instanceColor"&&D.instanceColor&&(et=D.instanceColor));let Pt={};Pt.attribute=et,et&&et.data&&(Pt.data=et.data),B[X]=Pt,W++}r.attributes=B,r.attributesNum=W,r.index=N}function v(){let D=r.newAttributes;for(let F=0,V=D.length;F<V;F++)D[F]=0}function m(D){p(D,0)}function p(D,F){let V=r.newAttributes,N=r.enabledAttributes,B=r.attributeDivisors;V[D]=1,N[D]===0&&(n.enableVertexAttribArray(D),N[D]=1),B[D]!==F&&(n.vertexAttribDivisor(D,F),B[D]=F)}function b(){let D=r.newAttributes,F=r.enabledAttributes;for(let V=0,N=F.length;V<N;V++)F[V]!==D[V]&&(n.disableVertexAttribArray(V),F[V]=0)}function E(D,F,V,N,B,$,W){W===!0?n.vertexAttribIPointer(D,F,V,B,$):n.vertexAttribPointer(D,F,V,N,B,$)}function y(D,F,V,N){v();let B=N.attributes,$=V.getAttributes(),W=F.defaultAttributeValues;for(let st in $){let X=$[st];if(X.location>=0){let j=B[st];if(j===void 0&&(st==="instanceMatrix"&&D.instanceMatrix&&(j=D.instanceMatrix),st==="instanceColor"&&D.instanceColor&&(j=D.instanceColor)),j!==void 0){let et=j.normalized,Pt=j.itemSize,wt=t.get(j);if(wt===void 0)continue;let ue=wt.buffer,ne=wt.type,ae=wt.bytesPerElement,Z=ne===n.INT||ne===n.UNSIGNED_INT||j.gpuType===Zo;if(j.isInterleavedBufferAttribute){let Q=j.data,xt=Q.stride,Vt=j.offset;if(Q.isInstancedInterleavedBuffer){for(let Mt=0;Mt<X.locationSize;Mt++)p(X.location+Mt,Q.meshPerAttribute);D.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=Q.meshPerAttribute*Q.count)}else for(let Mt=0;Mt<X.locationSize;Mt++)m(X.location+Mt);n.bindBuffer(n.ARRAY_BUFFER,ue);for(let Mt=0;Mt<X.locationSize;Mt++)E(X.location+Mt,Pt/X.locationSize,ne,et,xt*ae,(Vt+Pt/X.locationSize*Mt)*ae,Z)}else{if(j.isInstancedBufferAttribute){for(let Q=0;Q<X.locationSize;Q++)p(X.location+Q,j.meshPerAttribute);D.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=j.meshPerAttribute*j.count)}else for(let Q=0;Q<X.locationSize;Q++)m(X.location+Q);n.bindBuffer(n.ARRAY_BUFFER,ue);for(let Q=0;Q<X.locationSize;Q++)E(X.location+Q,Pt/X.locationSize,ne,et,Pt*ae,Pt/X.locationSize*Q*ae,Z)}}else if(W!==void 0){let et=W[st];if(et!==void 0)switch(et.length){case 2:n.vertexAttrib2fv(X.location,et);break;case 3:n.vertexAttrib3fv(X.location,et);break;case 4:n.vertexAttrib4fv(X.location,et);break;default:n.vertexAttrib1fv(X.location,et)}}}}b()}function w(){T();for(let D in i){let F=i[D];for(let V in F){let N=F[V];for(let B in N){let $=N[B];for(let W in $)h($[W].object),delete $[W];delete N[B]}}delete i[D]}}function S(D){if(i[D.id]===void 0)return;let F=i[D.id];for(let V in F){let N=F[V];for(let B in N){let $=N[B];for(let W in $)h($[W].object),delete $[W];delete N[B]}}delete i[D.id]}function C(D){for(let F in i){let V=i[F];for(let N in V){let B=V[N];if(B[D.id]===void 0)continue;let $=B[D.id];for(let W in $)h($[W].object),delete $[W];delete B[D.id]}}}function _(D){for(let F in i){let V=i[F],N=D.isInstancedMesh===!0?D.id:0,B=V[N];if(B!==void 0){for(let $ in B){let W=B[$];for(let st in W)h(W[st].object),delete W[st];delete B[$]}delete V[N],Object.keys(V).length===0&&delete i[F]}}}function T(){P(),a=!0,r!==s&&(r=s,c(r.object))}function P(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:T,resetDefaultState:P,dispose:w,releaseStatesOfGeometry:S,releaseStatesOfObject:_,releaseStatesOfProgram:C,initAttributes:v,enableAttribute:m,disableUnusedAttributes:b}}function C0(n,t,e){let i;function s(l){i=l}function r(l,c){n.drawArrays(i,l,c),e.update(c,i,1)}function a(l,c,h){h!==0&&(n.drawArraysInstanced(i,l,c,h),e.update(c,i,h))}function o(l,c,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,h);let u=0;for(let d=0;d<h;d++)u+=c[d];e.update(u,i,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function R0(n,t,e,i){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let C=t.get("EXT_texture_filter_anisotropic");s=n.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(C){return!(C!==Pi&&i.convert(C)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(C){let _=C===Ke&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(C!==ui&&C!==Ri&&!_&&i.convert(C)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE))}function l(C){if(C==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp",h=l(c);h!==c&&(Ot("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let f=e.logarithmicDepthBuffer===!0,u=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control");e.reversedDepthBuffer===!0&&u===!1&&Ot("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let d=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),p=n.getParameter(n.MAX_VERTEX_ATTRIBS),b=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),E=n.getParameter(n.MAX_VARYING_VECTORS),y=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),w=n.getParameter(n.MAX_SAMPLES),S=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:f,reversedDepthBuffer:u,maxTextures:d,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:b,maxVaryings:E,maxFragmentUniforms:y,maxSamples:w,samples:S}}function P0(n){let t=this,e=null,i=0,s=!1,r=!1,a=new Bi,o=new Xt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,u){let d=f.length!==0||u||i!==0||s;return s=u,i=f.length,d},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,u){e=h(f,u,0)},this.setState=function(f,u,d){let g=f.clippingPlanes,v=f.clipIntersection,m=f.clipShadows,p=n.get(f);if(!s||g===null||g.length===0||r&&!m)r?h(null):c();else{let b=r?0:i,E=b*4,y=p.clippingState||null;l.value=y,y=h(g,u,E,d);for(let w=0;w!==E;++w)y[w]=e[w];p.clippingState=y,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=b}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function h(f,u,d,g){let v=f!==null?f.length:0,m=null;if(v!==0){if(m=l.value,g!==!0||m===null){let p=d+v*4,b=u.matrixWorldInverse;o.getNormalMatrix(b),(m===null||m.length<p)&&(m=new Float32Array(p));for(let E=0,y=d;E!==v;++E,y+=4)a.copy(f[E]).applyMatrix4(b,o),a.normal.toArray(m,y),m[y+3]=a.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,m}}var tr=4,I0=6,L0=20,D0=256,ma=new Fn,bd=new Ft,vh=null,yh=0,Mh=0,bh=!1,N0=new R,cs=new R,xn=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,i=.1,s=100,r={}){let{size:a=256,position:o=N0}=r;vh=this._renderer.getRenderTarget(),yh=this._renderer.getActiveCubeFace(),Mh=this._renderer.getActiveMipmapLevel(),bh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,i,s,l,o),e>0&&this._blur(l,0,0,e),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ed(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=wd(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(vh,yh,Mh),this._renderer.xr.enabled=bh,t.scissorTest=!1,Qs(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===kn||t.mapping===os?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),vh=this._renderer.getRenderTarget(),yh=this._renderer.getActiveCubeFace(),Mh=this._renderer.getActiveMipmapLevel(),bh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:Ze,minFilter:Ze,generateMipmaps:!1,type:Ke,format:Pi,colorSpace:br,depthBuffer:!1},s=Sd(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Sd(t,e,i);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=U0(r)),this._blurMaterial=O0(r,t,e),this._ggxMaterial=F0(r,t,e)}return s}_compileMaterial(t){let e=new Qt(new Te,t);this._renderer.compile(e,ma)}_sceneToCubeUV(t,e,i,s,r){let l=new Oe(90,1,e,i),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],f=this._renderer,u=f.autoClear,d=f.toneMapping;f.getClearColor(bd),f.toneMapping=Hi,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(s),f.clearDepth(),f.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Qt(new hi,new ni({name:"PMREM.Background",side:Je,depthWrite:!1,depthTest:!1})));let v=this._backgroundBox,m=v.material,p=!1,b=t.background;b?b.isColor&&(m.color.copy(b),t.background=null,p=!0):(m.color.copy(bd),p=!0);for(let E=0;E<6;E++){let y=E%3;y===0?(l.up.set(0,c[E],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[E],r.y,r.z)):y===1?(l.up.set(0,0,c[E]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[E],r.z)):(l.up.set(0,c[E],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[E]));let w=this._cubeSize;Qs(s,y*w,E>2?w:0,w,w),f.setRenderTarget(s),p&&f.render(v,l),f.render(t,l)}f.toneMapping=d,f.autoClear=u,t.background=b}_textureToCubeUV(t,e){let i=this._renderer,s=t.mapping===kn||t.mapping===os;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ed()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=wd());let r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;let o=r.uniforms;o.envMap.value=t;let l=this._cubeSize;Qs(e,0,0,3*l,2*l),i.setRenderTarget(e),i.render(a,ma)}_applyPMREM(t){let e=this._renderer,i=e.autoClear;e.autoClear=!1;let s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(t,r-1,r);e.autoClear=i}_applyGGXFilter(t,e,i){let s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;let l=a.uniforms,c=i/(this._lodMeshes.length-1),h=e/(this._lodMeshes.length-1),f=Math.sqrt(c*c-h*h),u=c*1.25,d=f*u,{_lodMax:g}=this,v=this._sizeLods[i],m=3*v*(i>g-tr?i-g+tr:0),p=4*(this._cubeSize-v);l.envMap.value=t.texture,l.roughness.value=d,l.mipInt.value=g-e,Qs(r,m,p,3*v,2*v),s.setRenderTarget(r),s.render(o,ma),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=g-i,Qs(t,m,p,3*v,2*v),s.setRenderTarget(t),s.render(o,ma)}_blur(t,e,i,s){let r=this._pingPongRenderTarget,a=Math.min(s,Math.PI)/Math.SQRT2;this._blurPass(t,r,e,i,a),this._blurPass(r,t,i,i,a)}_blurPass(t,e,i,s,r){let a=this._renderer,o=this._blurMaterial,l=this._lodMeshes[s];l.material=o;let c=o.uniforms;c.envMap.value=t.texture,c.sigma.value=r,c.mipInt.value=this._lodMax-i;let h=this._sizeLods[s],f=3*h*(s>this._lodMax-tr?s-this._lodMax+tr:0),u=4*(this._cubeSize-h);Qs(e,f,u,3*h,2*h),a.setRenderTarget(e),a.render(l,ma)}};function U0(n){let t=[],e=[],i=n,s=n-tr+1+I0;for(let r=0;r<s;r++){let a=Math.pow(2,i);t.push(a);let o=1/(a-2),l=-o,c=1+o,h=[l,l,c,l,c,c,l,l,c,c,l,c],f=6,u=6,d=3,g=new Float32Array(d*u*f),v=new Float32Array(d*u*f);for(let p=0;p<f;p++){let b=p%3*2/3-1,E=p>2?0:-1,y=[b,E,0,b+2/3,E,0,b+2/3,E+1,0,b,E,0,b+2/3,E+1,0,b,E+1,0];g.set(y,d*u*p);for(let w=0;w<u;w++){let S=h[w*2]*2-1,C=h[w*2+1]*2-1;p===0?cs.set(1,C,S):p===1?cs.set(-S,1,-C):p===2?cs.set(-S,C,1):p===3?cs.set(-1,C,-S):p===4?cs.set(-S,-1,C):cs.set(S,C,-1),cs.toArray(v,(p*u+w)*d)}}let m=new Te;m.setAttribute("position",new Ye(g,d)),m.setAttribute("outputDirection",new Ye(v,d)),e.push(new Qt(m,null)),i>tr&&i--}return{lodMeshes:e,sizeLods:t}}function Sd(n,t,e){let i=new Be(n,t,e);return i.texture.mapping=aa,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Qs(n,t,e,i,s){n.viewport.set(t,e,i,s),n.scissor.set(t,e,i,s)}function F0(n,t,e){return new Ae({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:D0,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Ol(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Ci,depthTest:!1,depthWrite:!1})}function O0(n,t,e){return new Ae({name:"SphericalGaussianBlur",defines:{SAMPLES:L0,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Ol(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:Ci,depthTest:!1,depthWrite:!1})}function wd(){return new Ae({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ol(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Ci,depthTest:!1,depthWrite:!1})}function Ed(){return new Ae({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ol(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ci,depthTest:!1,depthWrite:!1})}function Ol(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var Fl=class extends Be{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let i={width:t,height:t,depth:1},s=[i,i,i,i,i,i];this.texture=new Ir(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new hi(5,5,5),r=new Ae({name:"CubemapFromEquirect",uniforms:ls(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Je,blending:Ci});r.uniforms.tEquirect.value=e;let a=new Qt(s,r),o=e.minFilter;return e.minFilter===zn&&(e.minFilter=Ze),new Vo(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,i=!0,s=!0){let r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,i,s);t.setRenderTarget(r)}};function B0(n){let t=new WeakMap,e=new WeakMap,i=null;function s(u,d=!1){return u==null?null:d?a(u):r(u)}function r(u){if(u&&u.isTexture){let d=u.mapping;if(d===Xo||d===qo)if(t.has(u)){let g=t.get(u).texture;return o(g,u.mapping)}else{let g=u.image;if(g&&g.height>0){let v=new Fl(g.height);return v.fromEquirectangularTexture(n,u),t.set(u,v),u.addEventListener("dispose",c),o(v.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture){let d=u.mapping,g=d===Xo||d===qo,v=d===kn||d===os;if(g||v){let m=e.get(u),p=m!==void 0?m.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==p)return i===null&&(i=new xn(n)),m=g?i.fromEquirectangular(u,m):i.fromCubemap(u,m),m.texture.pmremVersion=u.pmremVersion,e.set(u,m),m.texture;if(m!==void 0)return m.texture;{let b=u.image;return g&&b&&b.height>0||v&&b&&l(b)?(i===null&&(i=new xn(n)),m=g?i.fromEquirectangular(u):i.fromCubemap(u),m.texture.pmremVersion=u.pmremVersion,e.set(u,m),u.addEventListener("dispose",h),m.texture):null}}}return u}function o(u,d){return d===Xo?u.mapping=kn:d===qo&&(u.mapping=os),u}function l(u){let d=0,g=6;for(let v=0;v<g;v++)u[v]!==void 0&&d++;return d===g}function c(u){let d=u.target;d.removeEventListener("dispose",c);let g=t.get(d);g!==void 0&&(t.delete(d),g.dispose())}function h(u){let d=u.target;d.removeEventListener("dispose",h);let g=e.get(d);g!==void 0&&(e.delete(d),g.dispose())}function f(){t=new WeakMap,e=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:f}}function k0(n){let t={};function e(i){if(t[i]!==void 0)return t[i];let s=n.getExtension(i);return t[i]=s,s}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){let s=e(i);return s===null&&jn("WebGLRenderer: "+i+" extension not supported."),s}}}function z0(n,t,e,i){let s={},r=new WeakMap;function a(f){let u=f.target;u.index!==null&&t.remove(u.index);for(let g in u.attributes)t.remove(u.attributes[g]);u.removeEventListener("dispose",a),delete s[u.id];let d=r.get(u);d&&(t.remove(d),r.delete(u)),i.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,e.memory.geometries--}function o(f,u){return s[u.id]===!0||(u.addEventListener("dispose",a),s[u.id]=!0,e.memory.geometries++),u}function l(f){let u=f.attributes;for(let d in u)t.update(u[d],n.ARRAY_BUFFER)}function c(f){let u=[],d=f.index,g=f.attributes.position,v=0;if(g===void 0)return;if(d!==null){let b=d.array;v=d.version;for(let E=0,y=b.length;E<y;E+=3){let w=b[E+0],S=b[E+1],C=b[E+2];u.push(w,S,S,C,C,w)}}else{let b=g.array;v=g.version;for(let E=0,y=b.length/3-1;E<y;E+=3){let w=E+0,S=E+1,C=E+2;u.push(w,S,S,C,C,w)}}let m=new(g.count>=65535?Cr:Ar)(u,1);m.version=v;let p=r.get(f);p&&t.remove(p),r.set(f,m)}function h(f){let u=r.get(f);if(u){let d=f.index;d!==null&&u.version<d.version&&c(f)}else c(f);return r.get(f)}return{get:o,update:l,getWireframeAttribute:h}}function H0(n,t,e){let i;function s(f){i=f}let r,a;function o(f){r=f.type,a=f.bytesPerElement}function l(f,u){n.drawElements(i,u,r,f*a),e.update(u,i,1)}function c(f,u,d){d!==0&&(n.drawElementsInstanced(i,u,r,f*a,d),e.update(u,i,d))}function h(f,u,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,u,0,r,f,0,d);let v=0;for(let m=0;m<d;m++)v+=u[m];e.update(v,i,1)}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function V0(n){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(e.calls++,a){case n.TRIANGLES:e.triangles+=o*(r/3);break;case n.LINES:e.lines+=o*(r/2);break;case n.LINE_STRIP:e.lines+=o*(r-1);break;case n.LINE_LOOP:e.lines+=o*r;break;case n.POINTS:e.points+=o*r;break;default:Ht("WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:i}}function G0(n,t,e){let i=new WeakMap,s=new Ce;function r(a,o,l){let c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,f=h!==void 0?h.length:0,u=i.get(o);if(u===void 0||u.count!==f){let T=function(){C.dispose(),i.delete(o),o.removeEventListener("dispose",T)};u!==void 0&&u.texture.dispose();let d=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,v=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],b=o.morphAttributes.color||[],E=0;d===!0&&(E=1),g===!0&&(E=2),v===!0&&(E=3);let y=o.attributes.position.count*E,w=1;y>t.maxTextureSize&&(w=Math.ceil(y/t.maxTextureSize),y=t.maxTextureSize);let S=new Float32Array(y*w*4*f),C=new Er(S,y,w,f);C.type=Ri,C.needsUpdate=!0;let _=E*4;for(let P=0;P<f;P++){let D=m[P],F=p[P],V=b[P],N=y*w*4*P;for(let B=0;B<D.count;B++){let $=B*_;d===!0&&(s.fromBufferAttribute(D,B),S[N+$+0]=s.x,S[N+$+1]=s.y,S[N+$+2]=s.z,S[N+$+3]=0),g===!0&&(s.fromBufferAttribute(F,B),S[N+$+4]=s.x,S[N+$+5]=s.y,S[N+$+6]=s.z,S[N+$+7]=0),v===!0&&(s.fromBufferAttribute(V,B),S[N+$+8]=s.x,S[N+$+9]=s.y,S[N+$+10]=s.z,S[N+$+11]=V.itemSize===4?s.w:1)}}u={count:f,texture:C,size:new it(y,w)},i.set(o,u),o.addEventListener("dispose",T)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",a.morphTexture,e);else{let d=0;for(let v=0;v<c.length;v++)d+=c[v];let g=o.morphTargetsRelative?1:1-d;l.getUniforms().setValue(n,"morphTargetBaseInfluence",g),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",u.texture,e),l.getUniforms().setValue(n,"morphTargetsTextureSize",u.size)}return{update:r}}function W0(n,t,e,i,s){let r=new WeakMap;function a(c){let h=s.render.frame,f=c.geometry,u=t.get(c,f);if(r.get(u)!==h&&(t.update(u),r.set(u,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==h&&(e.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,n.ARRAY_BUFFER),r.set(c,h))),c.isSkinnedMesh){let d=c.skeleton;r.get(d)!==h&&(d.update(),r.set(d,h))}return u}function o(){r=new WeakMap}function l(c){let h=c.target;h.removeEventListener("dispose",l),i.releaseStatesOfObject(h),e.remove(h.instanceMatrix),h.instanceColor!==null&&e.remove(h.instanceColor)}return{update:a,dispose:o}}var $0={[ta]:"LINEAR_TONE_MAPPING",[ea]:"REINHARD_TONE_MAPPING",[ia]:"CINEON_TONE_MAPPING",[en]:"ACES_FILMIC_TONE_MAPPING",[sa]:"AGX_TONE_MAPPING",[ra]:"NEUTRAL_TONE_MAPPING",[na]:"CUSTOM_TONE_MAPPING"};function X0(n,t,e,i,s,r){let a=new Be(t,e,{type:n,depthBuffer:s,stencilBuffer:r,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,l=null,c=new Te;c.setAttribute("position",new Yt([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new Yt([0,2,0,0,2,0],2));let h=new qs({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),f=new Qt(c,h),u=new Fn(-1,1,1,-1,0,1),d=null,g=null,v=!1,m,p=null,b=[],E=!1;this.setSize=function(y,w){a.setSize(y,w),o!==null&&o.setSize(y,w),l!==null&&l.setSize(y,w);for(let S=0;S<b.length;S++){let C=b[S];C.setSize&&C.setSize(y,w)}},this.setEffects=function(y){b=y,E=b.length>0&&b[0].isRenderPass===!0;let w=a.width,S=a.height;b.length>0&&o===null&&(o=new Be(w,S,{type:Ke,depthBuffer:!1,stencilBuffer:!1}),l=new Be(w,S,{type:Ke,depthBuffer:!1,stencilBuffer:!1}));for(let C=0;C<b.length;C++){let _=b[C];_.setSize&&_.setSize(w,S)}},this.begin=function(y,w){if(v||y.toneMapping===Hi&&b.length===0)return!1;if(p=w,w!==null){let S=w.width,C=w.height;(a.width!==S||a.height!==C)&&this.setSize(S,C)}return E===!1&&y.setRenderTarget(a),m=y.toneMapping,y.toneMapping=Hi,!0},this.hasRenderPass=function(){return E},this.end=function(y,w){y.toneMapping=m,v=!0;let S=a,C=o;for(let _=0;_<b.length;_++){let T=b[_];T.enabled!==!1&&(T.render(y,C,S,w),T.needsSwap!==!1&&(S=C,C=C===o?l:o))}if(d!==y.outputColorSpace||g!==y.toneMapping){d=y.outputColorSpace,g=y.toneMapping,h.defines={},ie.getTransfer(d)===ce&&(h.defines.SRGB_TRANSFER="");let _=$0[g];_&&(h.defines[_]=""),h.needsUpdate=!0}h.uniforms.tDiffuse.value=S.texture,y.setRenderTarget(p),y.render(f,u),p=null,v=!1},this.isCompositing=function(){return v},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),c.dispose(),h.dispose()}}var $d=new ai,Eh=new Pn(1,1),Xd=new Er,qd=new vo,Yd=new Ir,Td=[],Ad=[],Cd=new Float32Array(16),Rd=new Float32Array(9),Pd=new Float32Array(4);function ir(n,t,e){let i=n[0];if(i<=0||i>0)return n;let s=t*e,r=Td[s];if(r===void 0&&(r=new Float32Array(s),Td[s]=r),t!==0){i.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,n[a].toArray(r,o)}return r}function ze(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function He(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function Bl(n,t){let e=Ad[t];e===void 0&&(e=new Int32Array(t),Ad[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function q0(n,t){let e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function Y0(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ze(e,t))return;n.uniform2fv(this.addr,t),He(e,t)}}function Z0(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(ze(e,t))return;n.uniform3fv(this.addr,t),He(e,t)}}function J0(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ze(e,t))return;n.uniform4fv(this.addr,t),He(e,t)}}function K0(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(ze(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),He(e,t)}else{if(ze(e,i))return;Pd.set(i),n.uniformMatrix2fv(this.addr,!1,Pd),He(e,i)}}function j0(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(ze(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),He(e,t)}else{if(ze(e,i))return;Rd.set(i),n.uniformMatrix3fv(this.addr,!1,Rd),He(e,i)}}function Q0(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(ze(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),He(e,t)}else{if(ze(e,i))return;Cd.set(i),n.uniformMatrix4fv(this.addr,!1,Cd),He(e,i)}}function tx(n,t){let e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function ex(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ze(e,t))return;n.uniform2iv(this.addr,t),He(e,t)}}function ix(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ze(e,t))return;n.uniform3iv(this.addr,t),He(e,t)}}function nx(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ze(e,t))return;n.uniform4iv(this.addr,t),He(e,t)}}function sx(n,t){let e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function rx(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ze(e,t))return;n.uniform2uiv(this.addr,t),He(e,t)}}function ax(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ze(e,t))return;n.uniform3uiv(this.addr,t),He(e,t)}}function ox(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ze(e,t))return;n.uniform4uiv(this.addr,t),He(e,t)}}function lx(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(Eh.compareFunction=e.isReversedDepthBuffer()?Dl:Ll,r=Eh):r=$d,e.setTexture2D(t||r,s)}function cx(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture3D(t||qd,s)}function hx(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTextureCube(t||Yd,s)}function ux(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture2DArray(t||Xd,s)}function dx(n){switch(n){case 5126:return q0;case 35664:return Y0;case 35665:return Z0;case 35666:return J0;case 35674:return K0;case 35675:return j0;case 35676:return Q0;case 5124:case 35670:return tx;case 35667:case 35671:return ex;case 35668:case 35672:return ix;case 35669:case 35673:return nx;case 5125:return sx;case 36294:return rx;case 36295:return ax;case 36296:return ox;case 35678:case 36198:case 36298:case 36306:case 35682:return lx;case 35679:case 36299:case 36307:return cx;case 35680:case 36300:case 36308:case 36293:return hx;case 36289:case 36303:case 36311:case 36292:return ux}}function fx(n,t){n.uniform1fv(this.addr,t)}function px(n,t){let e=ir(t,this.size,2);n.uniform2fv(this.addr,e)}function mx(n,t){let e=ir(t,this.size,3);n.uniform3fv(this.addr,e)}function gx(n,t){let e=ir(t,this.size,4);n.uniform4fv(this.addr,e)}function xx(n,t){let e=ir(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function _x(n,t){let e=ir(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function vx(n,t){let e=ir(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function yx(n,t){n.uniform1iv(this.addr,t)}function Mx(n,t){n.uniform2iv(this.addr,t)}function bx(n,t){n.uniform3iv(this.addr,t)}function Sx(n,t){n.uniform4iv(this.addr,t)}function wx(n,t){n.uniform1uiv(this.addr,t)}function Ex(n,t){n.uniform2uiv(this.addr,t)}function Tx(n,t){n.uniform3uiv(this.addr,t)}function Ax(n,t){n.uniform4uiv(this.addr,t)}function Cx(n,t,e){let i=this.cache,s=t.length,r=Bl(e,s);ze(i,r)||(n.uniform1iv(this.addr,r),He(i,r));let a;this.type===n.SAMPLER_2D_SHADOW?a=Eh:a=$d;for(let o=0;o!==s;++o)e.setTexture2D(t[o]||a,r[o])}function Rx(n,t,e){let i=this.cache,s=t.length,r=Bl(e,s);ze(i,r)||(n.uniform1iv(this.addr,r),He(i,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||qd,r[a])}function Px(n,t,e){let i=this.cache,s=t.length,r=Bl(e,s);ze(i,r)||(n.uniform1iv(this.addr,r),He(i,r));for(let a=0;a!==s;++a)e.setTextureCube(t[a]||Yd,r[a])}function Ix(n,t,e){let i=this.cache,s=t.length,r=Bl(e,s);ze(i,r)||(n.uniform1iv(this.addr,r),He(i,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||Xd,r[a])}function Lx(n){switch(n){case 5126:return fx;case 35664:return px;case 35665:return mx;case 35666:return gx;case 35674:return xx;case 35675:return _x;case 35676:return vx;case 5124:case 35670:return yx;case 35667:case 35671:return Mx;case 35668:case 35672:return bx;case 35669:case 35673:return Sx;case 5125:return wx;case 36294:return Ex;case 36295:return Tx;case 36296:return Ax;case 35678:case 36198:case 36298:case 36306:case 35682:return Cx;case 35679:case 36299:case 36307:return Rx;case 35680:case 36300:case 36308:case 36293:return Px;case 36289:case 36303:case 36311:case 36292:return Ix}}var Th=class{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=dx(e.type)}},Ah=class{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Lx(e.type)}},Ch=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(t,e[o.id],i)}}},Sh=/(\w+)(\])?(\[|\.)?/g;function Id(n,t){n.seq.push(t),n.map[t.id]=t}function Dx(n,t,e){let i=n.name,s=i.length;for(Sh.lastIndex=0;;){let r=Sh.exec(i),a=Sh.lastIndex,o=r[1],l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){Id(e,c===void 0?new Th(o,n,t):new Ah(o,n,t));break}else{let f=e.map[o];f===void 0&&(f=new Ch(o),Id(e,f)),e=f}}}var er=class{constructor(t,e){this.seq=[],this.map={};let i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){let o=t.getActiveUniform(e,a),l=t.getUniformLocation(e,o.name);Dx(o,l,this)}let s=[],r=[];for(let a of this.seq)a.type===t.SAMPLER_2D_SHADOW||a.type===t.SAMPLER_CUBE_SHADOW||a.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(t,e,i,s){let r=this.map[e];r!==void 0&&r.setValue(t,i,s)}setOptional(t,e,i){let s=e[i];s!==void 0&&this.setValue(t,i,s)}static upload(t,e,i,s){for(let r=0,a=e.length;r!==a;++r){let o=e[r],l=i[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,s)}}static seqWithValue(t,e){let i=[];for(let s=0,r=t.length;s!==r;++s){let a=t[s];a.id in e&&i.push(a)}return i}};function Ld(n,t,e){let i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}var Nx=37297,Ux=0;function Fx(n,t){let e=n.split(`
`),i=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){let o=a+1;i.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return i.join(`
`)}var Dd=new Xt;function Ox(n){ie._getMatrix(Dd,ie.workingColorSpace,n);let t=`mat3( ${Dd.elements.map(e=>e.toFixed(4))} )`;switch(ie.getTransfer(n)){case Sr:return[t,"LinearTransferOETF"];case ce:return[t,"sRGBTransferOETF"];default:return Ot("WebGLProgram: Unsupported color space: ",n),[t,"LinearTransferOETF"]}}function Nd(n,t,e){let i=n.getShaderParameter(t,n.COMPILE_STATUS),r=(n.getShaderInfoLog(t)||"").trim();if(i&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return e.toUpperCase()+`

`+r+`

`+Fx(n.getShaderSource(t),o)}else return r}function Bx(n,t){let e=Ox(t);return[`vec4 ${n}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}var kx={[ta]:"Linear",[ea]:"Reinhard",[ia]:"Cineon",[en]:"ACESFilmic",[sa]:"AgX",[ra]:"Neutral",[na]:"Custom"};function zx(n,t){let e=kx[t];return e===void 0?(Ot("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var Ul=new R;function Hx(){ie.getLuminanceCoefficients(Ul);let n=Ul.x.toFixed(4),t=Ul.y.toFixed(4),e=Ul.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Vx(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(xa).join(`
`)}function Gx(n){let t=[];for(let e in n){let i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function Wx(n,t){let e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){let r=n.getActiveAttrib(t,s),a=r.name,o=1;r.type===n.FLOAT_MAT2&&(o=2),r.type===n.FLOAT_MAT3&&(o=3),r.type===n.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:n.getAttribLocation(t,a),locationSize:o}}return e}function xa(n){return n!==""}function Ud(n,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Fd(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var $x=/^[ \t]*#include +<([\w\d./]+)>/gm;function Rh(n){return n.replace($x,qx)}var Xx=new Map;function qx(n,t){let e=te[t];if(e===void 0){let i=Xx.get(t);if(i!==void 0)e=te[i],Ot('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return Rh(e)}var Yx=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Od(n){return n.replace(Yx,Zx)}function Zx(n,t,e,i){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Bd(n){let t=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?t+=`
#define HIGH_PRECISION`:n.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}var Jx={[tn]:"SHADOWMAP_TYPE_PCF",[Zs]:"SHADOWMAP_TYPE_VSM"};function Kx(n){return Jx[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var jx={[kn]:"ENVMAP_TYPE_CUBE",[os]:"ENVMAP_TYPE_CUBE",[aa]:"ENVMAP_TYPE_CUBE_UV"};function Qx(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":jx[n.envMapMode]||"ENVMAP_TYPE_CUBE"}var t_={[os]:"ENVMAP_MODE_REFRACTION"};function e_(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":t_[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}var i_={[$o]:"ENVMAP_BLENDING_MULTIPLY",[ju]:"ENVMAP_BLENDING_MIX",[Qu]:"ENVMAP_BLENDING_ADD"};function n_(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":i_[n.combine]||"ENVMAP_BLENDING_NONE"}function s_(n){let t=n.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:i,maxMip:e}}function r_(n,t,e,i){let s=n.getContext(),r=e.defines,a=e.vertexShader,o=e.fragmentShader,l=Kx(e),c=Qx(e),h=e_(e),f=n_(e),u=s_(e),d=Vx(e),g=Gx(r),v=s.createProgram(),m,p,b=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(xa).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(xa).join(`
`),p.length>0&&(p+=`
`)):(m=[Bd(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(xa).join(`
`),p=[Bd(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+f:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.retroreflection?"#define USE_RETROREFLECTION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Hi?"#define TONE_MAPPING":"",e.toneMapping!==Hi?te.tonemapping_pars_fragment:"",e.toneMapping!==Hi?zx("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",te.colorspace_pars_fragment,Bx("linearToOutputTexel",e.outputColorSpace),Hx(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(xa).join(`
`)),a=Rh(a),a=Ud(a,e),a=Fd(a,e),o=Rh(o),o=Ud(o,e),o=Fd(o,e),a=Od(a),o=Od(o),e.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===oh?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===oh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let E=b+m+a,y=b+p+o,w=Ld(s,s.VERTEX_SHADER,E),S=Ld(s,s.FRAGMENT_SHADER,y);s.attachShader(v,w),s.attachShader(v,S),e.index0AttributeName!==void 0?s.bindAttribLocation(v,0,e.index0AttributeName):e.hasPositionAttribute===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function C(D){if(n.debug.checkShaderErrors){let F=s.getProgramInfoLog(v)||"",V=s.getShaderInfoLog(w)||"",N=s.getShaderInfoLog(S)||"",B=F.trim(),$=V.trim(),W=N.trim(),st=!0,X=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(st=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,v,w,S);else{let j=Nd(s,w,"vertex"),et=Nd(s,S,"fragment");Ht("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+B+`
`+j+`
`+et)}else B!==""?Ot("WebGLProgram: Program Info Log:",B):($===""||W==="")&&(X=!1);X&&(D.diagnostics={runnable:st,programLog:B,vertexShader:{log:$,prefix:m},fragmentShader:{log:W,prefix:p}})}s.deleteShader(w),s.deleteShader(S),_=new er(s,v),T=Wx(s,v)}let _;this.getUniforms=function(){return _===void 0&&C(this),_};let T;this.getAttributes=function(){return T===void 0&&C(this),T};let P=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return P===!1&&(P=s.getProgramParameter(v,Nx)),P},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Ux++,this.cacheKey=t,this.usedTimes=1,this.program=v,this.vertexShader=w,this.fragmentShader=S,this}var a_=0,Ph=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,i){let s=this._getShaderCacheForMaterial(t);return s.has(e)===!1&&(s.add(e),e.usedTimes++),s.has(i)===!1&&(s.add(i),i.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){let e=this.shaderCache,i=e.get(t);return i===void 0&&(i=new Ih(t),e.set(t,i)),i}},Ih=class{constructor(t){this.id=a_++,this.code=t,this.usedTimes=0}};function o_(n){return n===Vn||n===da||n===fa}function l_(n,t,e,i,s,r){let a=new Bs,o=new Ph,l=new Set,c=[],h=new Map,f=i.logarithmicDepthBuffer,u=i.precision,d={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(_){return l.add(_),_===0?"uv":`uv${_}`}function v(_,T,P,D,F,V){let N=D.fog,B=F.geometry,$=_.isMeshStandardMaterial||_.isMeshLambertMaterial||_.isMeshPhongMaterial?D.environment:null,W=_.isMeshStandardMaterial||_.isMeshLambertMaterial&&!_.envMap||_.isMeshPhongMaterial&&!_.envMap,st=t.get(_.envMap||$,W),X=st&&st.mapping===aa?st.image.height:null,j=d[_.type];_.precision!==null&&(u=i.getMaxPrecision(_.precision),u!==_.precision&&Ot("WebGLProgram.getParameters:",_.precision,"not supported, using",u,"instead."));let et=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,Pt=et!==void 0?et.length:0,wt=0;B.morphAttributes.position!==void 0&&(wt=1),B.morphAttributes.normal!==void 0&&(wt=2),B.morphAttributes.color!==void 0&&(wt=3);let ue,ne,ae,Z;if(j){let be=sn[j];ue=be.vertexShader,ne=be.fragmentShader}else{ue=_.vertexShader,ne=_.fragmentShader;let be=o.getVertexShaderStage(_),me=o.getFragmentShaderStage(_);o.update(_,be,me),ae=be.id,Z=me.id}let Q=n.getRenderTarget(),xt=n.state.buffers.depth.getReversed(),Vt=F.isInstancedMesh===!0,Mt=F.isBatchedMesh===!0,Gt=!!_.map,ve=!!_.matcap,tt=!!st,rt=!!_.aoMap,at=!!_.lightMap,ot=!!_.bumpMap&&_.wireframe===!1,ht=!!_.normalMap,Bt=!!_.displacementMap,Ut=!!_.emissiveMap,Wt=!!_.metalnessMap,qt=!!_.roughnessMap,I=_.anisotropy>0,pe=_.clearcoat>0,se=_.dispersion>0,A=_.retroreflectivity>0,x=_.iridescence>0,O=_.sheen>0,H=_.transmission>0,q=I&&!!_.anisotropyMap,lt=pe&&!!_.clearcoatMap,ct=pe&&!!_.clearcoatNormalMap,Y=pe&&!!_.clearcoatRoughnessMap,K=x&&!!_.iridescenceMap,ut=x&&!!_.iridescenceThicknessMap,It=O&&!!_.sheenColorMap,mt=O&&!!_.sheenRoughnessMap,dt=!!_.specularMap,Lt=!!_.specularColorMap,kt=!!_.specularIntensityMap,Zt=H&&!!_.transmissionMap,U=H&&!!_.thicknessMap,ft=!!_.gradientMap,J=!!_.alphaMap,pt=_.alphaTest>0,yt=!!_.alphaHash,nt=!!_.extensions,Dt=Hi;_.toneMapped&&(Q===null||Q.isXRRenderTarget===!0)&&(Dt=n.toneMapping);let Ct={shaderID:j,shaderType:_.type,shaderName:_.name,vertexShader:ue,fragmentShader:ne,defines:_.defines,customVertexShaderID:ae,customFragmentShaderID:Z,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:u,batching:Mt,batchingColor:Mt&&F._colorsTexture!==null,instancing:Vt,instancingColor:Vt&&F.instanceColor!==null,instancingMorph:Vt&&F.morphTexture!==null,outputColorSpace:Q===null?n.outputColorSpace:Q.isXRRenderTarget===!0?Q.texture.colorSpace:ie.workingColorSpace,alphaToCoverage:!!_.alphaToCoverage,map:Gt,matcap:ve,envMap:tt,envMapMode:tt&&st.mapping,envMapCubeUVHeight:X,aoMap:rt,lightMap:at,bumpMap:ot,normalMap:ht,displacementMap:Bt,emissiveMap:Ut,normalMapObjectSpace:ht&&_.normalMapType===id,normalMapTangentSpace:ht&&_.normalMapType===pa,packedNormalMap:ht&&_.normalMapType===pa&&o_(_.normalMap.format),metalnessMap:Wt,roughnessMap:qt,anisotropy:I,anisotropyMap:q,clearcoat:pe,clearcoatMap:lt,clearcoatNormalMap:ct,clearcoatRoughnessMap:Y,dispersion:se,retroreflection:A,iridescence:x,iridescenceMap:K,iridescenceThicknessMap:ut,sheen:O,sheenColorMap:It,sheenRoughnessMap:mt,specularMap:dt,specularColorMap:Lt,specularIntensityMap:kt,transmission:H,transmissionMap:Zt,thicknessMap:U,gradientMap:ft,opaque:_.transparent===!1&&_.blending===Bn&&_.alphaToCoverage===!1,alphaMap:J,alphaTest:pt,alphaHash:yt,combine:_.combine,mapUv:Gt&&g(_.map.channel),aoMapUv:rt&&g(_.aoMap.channel),lightMapUv:at&&g(_.lightMap.channel),bumpMapUv:ot&&g(_.bumpMap.channel),normalMapUv:ht&&g(_.normalMap.channel),displacementMapUv:Bt&&g(_.displacementMap.channel),emissiveMapUv:Ut&&g(_.emissiveMap.channel),metalnessMapUv:Wt&&g(_.metalnessMap.channel),roughnessMapUv:qt&&g(_.roughnessMap.channel),anisotropyMapUv:q&&g(_.anisotropyMap.channel),clearcoatMapUv:lt&&g(_.clearcoatMap.channel),clearcoatNormalMapUv:ct&&g(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Y&&g(_.clearcoatRoughnessMap.channel),iridescenceMapUv:K&&g(_.iridescenceMap.channel),iridescenceThicknessMapUv:ut&&g(_.iridescenceThicknessMap.channel),sheenColorMapUv:It&&g(_.sheenColorMap.channel),sheenRoughnessMapUv:mt&&g(_.sheenRoughnessMap.channel),specularMapUv:dt&&g(_.specularMap.channel),specularColorMapUv:Lt&&g(_.specularColorMap.channel),specularIntensityMapUv:kt&&g(_.specularIntensityMap.channel),transmissionMapUv:Zt&&g(_.transmissionMap.channel),thicknessMapUv:U&&g(_.thicknessMap.channel),alphaMapUv:J&&g(_.alphaMap.channel),vertexTangents:!!B.attributes.tangent&&(ht||I),vertexNormals:!!B.attributes.normal,vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,pointsUvs:F.isPoints===!0&&!!B.attributes.uv&&(Gt||J),fog:!!N,useFog:_.fog===!0,fogExp2:!!N&&N.isFogExp2,flatShading:_.wireframe===!1&&(_.flatShading===!0||B.attributes.normal===void 0&&ht===!1&&(_.isMeshLambertMaterial||_.isMeshPhongMaterial||_.isMeshStandardMaterial||_.isMeshPhysicalMaterial)),sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:xt,skinning:F.isSkinnedMesh===!0,hasPositionAttribute:B.attributes.position!==void 0,morphTargets:B.morphAttributes.position!==void 0,morphNormals:B.morphAttributes.normal!==void 0,morphColors:B.morphAttributes.color!==void 0,morphTargetsCount:Pt,morphTextureStride:wt,numSunLights:T.sun.length,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numSunLightShadows:T.sunShadowMap.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numLightProbeGrids:V.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:_.dithering,shadowMapEnabled:n.shadowMap.enabled&&P.length>0,shadowMapType:n.shadowMap.type,toneMapping:Dt,decodeVideoTexture:Gt&&_.map.isVideoTexture===!0&&ie.getTransfer(_.map.colorSpace)===ce,decodeVideoTextureEmissive:Ut&&_.emissiveMap.isVideoTexture===!0&&ie.getTransfer(_.emissiveMap.colorSpace)===ce,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===We,flipSided:_.side===Je,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:nt&&_.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(nt&&_.extensions.multiDraw===!0||Mt)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return Ct.vertexUv1s=l.has(1),Ct.vertexUv2s=l.has(2),Ct.vertexUv3s=l.has(3),l.clear(),Ct}function m(_){let T=[];if(_.shaderID?T.push(_.shaderID):(T.push(_.customVertexShaderID),T.push(_.customFragmentShaderID)),_.defines!==void 0)for(let P in _.defines)T.push(P),T.push(_.defines[P]);return _.isRawShaderMaterial===!1&&(p(T,_),b(T,_),T.push(n.outputColorSpace)),T.push(_.customProgramCacheKey),T.join()}function p(_,T){_.push(T.precision),_.push(T.outputColorSpace),_.push(T.envMapMode),_.push(T.envMapCubeUVHeight),_.push(T.mapUv),_.push(T.alphaMapUv),_.push(T.lightMapUv),_.push(T.aoMapUv),_.push(T.bumpMapUv),_.push(T.normalMapUv),_.push(T.displacementMapUv),_.push(T.emissiveMapUv),_.push(T.metalnessMapUv),_.push(T.roughnessMapUv),_.push(T.anisotropyMapUv),_.push(T.clearcoatMapUv),_.push(T.clearcoatNormalMapUv),_.push(T.clearcoatRoughnessMapUv),_.push(T.iridescenceMapUv),_.push(T.iridescenceThicknessMapUv),_.push(T.sheenColorMapUv),_.push(T.sheenRoughnessMapUv),_.push(T.specularMapUv),_.push(T.specularColorMapUv),_.push(T.specularIntensityMapUv),_.push(T.transmissionMapUv),_.push(T.thicknessMapUv),_.push(T.combine),_.push(T.fogExp2),_.push(T.sizeAttenuation),_.push(T.morphTargetsCount),_.push(T.morphAttributeCount),_.push(T.numSunLights),_.push(T.numDirLights),_.push(T.numPointLights),_.push(T.numSpotLights),_.push(T.numSpotLightMaps),_.push(T.numHemiLights),_.push(T.numRectAreaLights),_.push(T.numSunLightShadows),_.push(T.numDirLightShadows),_.push(T.numPointLightShadows),_.push(T.numSpotLightShadows),_.push(T.numSpotLightShadowsWithMaps),_.push(T.numLightProbes),_.push(T.shadowMapType),_.push(T.toneMapping),_.push(T.numClippingPlanes),_.push(T.numClipIntersection),_.push(T.depthPacking)}function b(_,T){a.disableAll(),T.instancing&&a.enable(0),T.instancingColor&&a.enable(1),T.instancingMorph&&a.enable(2),T.matcap&&a.enable(3),T.envMap&&a.enable(4),T.normalMapObjectSpace&&a.enable(5),T.normalMapTangentSpace&&a.enable(6),T.clearcoat&&a.enable(7),T.iridescence&&a.enable(8),T.alphaTest&&a.enable(9),T.vertexColors&&a.enable(10),T.vertexAlphas&&a.enable(11),T.vertexUv1s&&a.enable(12),T.vertexUv2s&&a.enable(13),T.vertexUv3s&&a.enable(14),T.vertexTangents&&a.enable(15),T.anisotropy&&a.enable(16),T.alphaHash&&a.enable(17),T.batching&&a.enable(18),T.dispersion&&a.enable(19),T.retroreflection&&a.enable(24),T.batchingColor&&a.enable(20),T.gradientMap&&a.enable(21),T.packedNormalMap&&a.enable(22),T.vertexNormals&&a.enable(23),_.push(a.mask),a.disableAll(),T.fog&&a.enable(0),T.useFog&&a.enable(1),T.flatShading&&a.enable(2),T.logarithmicDepthBuffer&&a.enable(3),T.reversedDepthBuffer&&a.enable(4),T.skinning&&a.enable(5),T.morphTargets&&a.enable(6),T.morphNormals&&a.enable(7),T.morphColors&&a.enable(8),T.premultipliedAlpha&&a.enable(9),T.shadowMapEnabled&&a.enable(10),T.doubleSided&&a.enable(11),T.flipSided&&a.enable(12),T.useDepthPacking&&a.enable(13),T.dithering&&a.enable(14),T.transmission&&a.enable(15),T.sheen&&a.enable(16),T.opaque&&a.enable(17),T.pointsUvs&&a.enable(18),T.decodeVideoTexture&&a.enable(19),T.decodeVideoTextureEmissive&&a.enable(20),T.alphaToCoverage&&a.enable(21),T.numLightProbeGrids>0&&a.enable(22),T.hasPositionAttribute&&a.enable(23),_.push(a.mask)}function E(_){let T=d[_.type],P;if(T){let D=sn[T];P=gn.clone(D.uniforms)}else P=_.uniforms;return P}function y(_,T){let P=h.get(T);return P!==void 0?++P.usedTimes:(P=new r_(n,T,_,s),c.push(P),h.set(T,P)),P}function w(_){if(--_.usedTimes===0){let T=c.indexOf(_);c[T]=c[c.length-1],c.pop(),h.delete(_.cacheKey),_.destroy()}}function S(_){o.remove(_)}function C(){o.dispose()}return{getParameters:v,getProgramCacheKey:m,getUniforms:E,acquireProgram:y,releaseProgram:w,releaseShaderCache:S,programs:c,dispose:C}}function c_(){let n=new WeakMap;function t(a){return n.has(a)}function e(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function s(a,o,l){n.get(a)[o]=l}function r(){n=new WeakMap}return{has:t,get:e,remove:i,update:s,dispose:r}}function h_(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.materialVariant!==t.materialVariant?n.materialVariant-t.materialVariant:n.z!==t.z?n.z-t.z:n.id-t.id}function kd(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function zd(){let n=[],t=0,e=[],i=[],s=[];function r(){t=0,e.length=0,i.length=0,s.length=0}function a(u){let d=0;return u.isInstancedMesh&&(d+=2),u.isSkinnedMesh&&(d+=1),d}function o(u,d,g,v,m,p){let b=n[t];return b===void 0?(b={id:u.id,object:u,geometry:d,material:g,materialVariant:a(u),groupOrder:v,renderOrder:u.renderOrder,z:m,group:p},n[t]=b):(b.id=u.id,b.object=u,b.geometry=d,b.material=g,b.materialVariant=a(u),b.groupOrder=v,b.renderOrder=u.renderOrder,b.z=m,b.group=p),t++,b}function l(u,d,g,v,m,p,b){b.reversedDepth===!0&&(m=-m);let E=o(u,d,g,v,m,p);g.transmission>0?i.push(E):g.transparent===!0?s.push(E):e.push(E)}function c(u,d,g,v,m,p){let b=o(u,d,g,v,m,p);g.transmission>0?i.unshift(b):g.transparent===!0?s.unshift(b):e.unshift(b)}function h(u,d){e.length>1&&e.sort(u||h_),i.length>1&&i.sort(d||kd),s.length>1&&s.sort(d||kd)}function f(){for(let u=t,d=n.length;u<d;u++){let g=n[u];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:e,transmissive:i,transparent:s,init:r,push:l,unshift:c,finish:f,sort:h}}function u_(){let n=new WeakMap;function t(i,s){let r=n.get(i),a;return r===void 0?(a=new zd,n.set(i,[a])):s>=r.length?(a=new zd,r.push(a)):a=r[s],a}function e(){n=new WeakMap}return{get:t,dispose:e}}function d_(){let n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={direction:new R,color:new Ft};break;case"SpotLight":e={position:new R,direction:new R,color:new Ft,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new R,color:new Ft,distance:0,decay:0};break;case"HemisphereLight":e={direction:new R,skyColor:new Ft,groundColor:new Ft};break;case"RectAreaLight":e={color:new Ft,position:new R,halfWidth:new R,halfHeight:new R};break}return n[t.id]=e,e}}}function f_(){let n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new it};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new it};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new it,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}var p_=0;function m_(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function g_(n){let t=new d_,e=f_(),i={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new R);let s=new R,r=new he,a=new he;function o(c){let h=0,f=0,u=0;for(let F=0;F<9;F++)i.probe[F].set(0,0,0);let d=0,g=0,v=0,m=0,p=0,b=0,E=0,y=0,w=0,S=0,C=0,_=0,T=0,P=0;c.sort(m_);for(let F=0,V=c.length;F<V;F++){let N=c[F],B=N.color,$=N.intensity,W=N.distance,st=null;if(N.shadow&&N.shadow.map&&(N.shadow.map.texture.format===Vn?st=N.shadow.map.texture:st=N.shadow.map.depthTexture||N.shadow.map.texture),N.isAmbientLight)h+=B.r*$,f+=B.g*$,u+=B.b*$;else if(N.isLightProbe){for(let X=0;X<9;X++)i.probe[X].addScaledVector(N.sh.coefficients[X],$);P++}else if(N.isSunLight){let X=t.get(N);if(X.color.copy(N.color).multiplyScalar(N.intensity),N.castShadow){let j=N.shadow,et=e.get(N);et.shadowIntensity=j.intensity,et.shadowBias=j.bias,et.shadowNormalBias=j.normalBias,et.shadowRadius=j.radius,et.shadowMapSize.copy(j.mapSize).multiply(j.getFrameExtents()),i.sunShadow[g]=et,i.sunShadowMap[g]=st;let Pt=j.getViewportCount();for(let wt=0;wt<Pt;wt++)i.sunShadowMatrix[v+wt]=j.getMatrix(wt),i.sunShadowCascade[v+wt]=j._cascadeData[wt];v+=Pt,g++}i.sun[d]=X,d++}else if(N.isDirectionalLight){let X=t.get(N);if(X.color.copy(N.color).multiplyScalar(N.intensity),N.castShadow){let j=N.shadow,et=e.get(N);et.shadowIntensity=j.intensity,et.shadowBias=j.bias,et.shadowNormalBias=j.normalBias,et.shadowRadius=j.radius,et.shadowMapSize=j.mapSize,i.directionalShadow[m]=et,i.directionalShadowMap[m]=st,i.directionalShadowMatrix[m]=N.shadow.matrix,w++}i.directional[m]=X,m++}else if(N.isSpotLight){let X=t.get(N);X.position.setFromMatrixPosition(N.matrixWorld),X.color.copy(B).multiplyScalar($),X.distance=W,X.coneCos=Math.cos(N.angle),X.penumbraCos=Math.cos(N.angle*(1-N.penumbra)),X.decay=N.decay,i.spot[b]=X;let j=N.shadow;if(N.map&&(i.spotLightMap[_]=N.map,_++,j.updateMatrices(N),N.castShadow&&T++),i.spotLightMatrix[b]=j.matrix,N.castShadow){let et=e.get(N);et.shadowIntensity=j.intensity,et.shadowBias=j.bias,et.shadowNormalBias=j.normalBias,et.shadowRadius=j.radius,et.shadowMapSize=j.mapSize,i.spotShadow[b]=et,i.spotShadowMap[b]=st,C++}b++}else if(N.isRectAreaLight){let X=t.get(N);X.color.copy(B).multiplyScalar($),X.halfWidth.set(N.width*.5,0,0),X.halfHeight.set(0,N.height*.5,0),i.rectArea[E]=X,E++}else if(N.isPointLight){let X=t.get(N);if(X.color.copy(N.color).multiplyScalar(N.intensity),X.distance=N.distance,X.decay=N.decay,N.castShadow){let j=N.shadow,et=e.get(N);et.shadowIntensity=j.intensity,et.shadowBias=j.bias,et.shadowNormalBias=j.normalBias,et.shadowRadius=j.radius,et.shadowMapSize=j.mapSize,et.shadowCameraNear=j.camera.near,et.shadowCameraFar=j.camera.far,i.pointShadow[p]=et,i.pointShadowMap[p]=st,i.pointShadowMatrix[p]=N.shadow.matrix,S++}i.point[p]=X,p++}else if(N.isHemisphereLight){let X=t.get(N);X.skyColor.copy(N.color).multiplyScalar($),X.groundColor.copy(N.groundColor).multiplyScalar($),i.hemi[y]=X,y++}}E>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=gt.LTC_FLOAT_1,i.rectAreaLTC2=gt.LTC_FLOAT_2):(i.rectAreaLTC1=gt.LTC_HALF_1,i.rectAreaLTC2=gt.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=f,i.ambient[2]=u;let D=i.hash;(D.sunLength!==d||D.directionalLength!==m||D.pointLength!==p||D.spotLength!==b||D.rectAreaLength!==E||D.hemiLength!==y||D.numSunShadows!==g||D.numDirectionalShadows!==w||D.numPointShadows!==S||D.numSpotShadows!==C||D.numSpotMaps!==_||D.numLightProbes!==P)&&(i.sun.length=d,i.directional.length=m,i.spot.length=b,i.rectArea.length=E,i.point.length=p,i.hemi.length=y,i.sunShadow.length=g,i.sunShadowMap.length=g,i.sunShadowMatrix.length=v,i.sunShadowCascade.length=v,i.directionalShadow.length=w,i.directionalShadowMap.length=w,i.directionalShadowMatrix.length=w,i.pointShadow.length=S,i.pointShadowMap.length=S,i.pointShadowMatrix.length=S,i.spotShadow.length=C,i.spotShadowMap.length=C,i.spotLightMatrix.length=C+_-T,i.spotLightMap.length=_,i.numSpotLightShadowsWithMaps=T,i.numLightProbes=P,D.sunLength=d,D.directionalLength=m,D.pointLength=p,D.spotLength=b,D.rectAreaLength=E,D.hemiLength=y,D.numSunShadows=g,D.numDirectionalShadows=w,D.numPointShadows=S,D.numSpotShadows=C,D.numSpotMaps=_,D.numLightProbes=P,i.version=p_++)}function l(c,h){let f=0,u=0,d=0,g=0,v=0,m=0,p=h.matrixWorldInverse;for(let b=0,E=c.length;b<E;b++){let y=c[b];if(y.isSunLight){let w=i.sun[f];w.direction.setFromMatrixPosition(y.matrixWorld),w.direction.transformDirection(p),f++}else if(y.isDirectionalLight){let w=i.directional[u];w.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),w.direction.sub(s),w.direction.transformDirection(p),u++}else if(y.isSpotLight){let w=i.spot[g];w.position.setFromMatrixPosition(y.matrixWorld),w.position.applyMatrix4(p),w.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),w.direction.sub(s),w.direction.transformDirection(p),g++}else if(y.isRectAreaLight){let w=i.rectArea[v];w.position.setFromMatrixPosition(y.matrixWorld),w.position.applyMatrix4(p),a.identity(),r.copy(y.matrixWorld),r.premultiply(p),a.extractRotation(r),w.halfWidth.set(y.width*.5,0,0),w.halfHeight.set(0,y.height*.5,0),w.halfWidth.applyMatrix4(a),w.halfHeight.applyMatrix4(a),v++}else if(y.isPointLight){let w=i.point[d];w.position.setFromMatrixPosition(y.matrixWorld),w.position.applyMatrix4(p),d++}else if(y.isHemisphereLight){let w=i.hemi[m];w.direction.setFromMatrixPosition(y.matrixWorld),w.direction.transformDirection(p),m++}}}return{setup:o,setupView:l,state:i}}function Hd(n){let t=new g_(n),e=[],i=[],s=[];function r(u){f.camera=u,e.length=0,i.length=0,s.length=0}function a(u){e.push(u)}function o(u){i.push(u)}function l(u){s.push(u)}function c(){t.setup(e)}function h(u){t.setupView(e,u)}let f={lightsArray:e,shadowsArray:i,lightProbeGridArray:s,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:f,setupLights:c,setupLightsView:h,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function x_(n){let t=new WeakMap;function e(s,r=0){let a=t.get(s),o;return a===void 0?(o=new Hd(n),t.set(s,[o])):r>=a.length?(o=new Hd(n),a.push(o)):o=a[r],o}function i(){t=new WeakMap}return{get:e,dispose:i}}var __=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,v_=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,y_=[new R(1,0,0),new R(-1,0,0),new R(0,1,0),new R(0,-1,0),new R(0,0,1),new R(0,0,-1)],M_=[new R(0,-1,0),new R(0,-1,0),new R(0,0,1),new R(0,0,-1),new R(0,-1,0),new R(0,-1,0)],Vd=new he,ga=new R,wh=new R;function b_(n,t,e){let i=new Hs,s=new it,r=new it,a=new Ce,o=new Po,l=new Io,c={},h=e.maxTextureSize,f={[On]:Je,[Je]:On,[We]:We},u=new Ae({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new it},radius:{value:4}},vertexShader:__,fragmentShader:v_}),d=u.clone();d.defines.HORIZONTAL_PASS=1;let g=new Te;g.setAttribute("position",new Ye(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let v=new Qt(g,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=tn;let p=this.type;this.render=function(S,C,_){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||S.length===0)return;this.type===Du&&(Ot("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=tn);let T=n.getRenderTarget(),P=n.getActiveCubeFace(),D=n.getActiveMipmapLevel(),F=n.state;F.setBlending(Ci),F.buffers.depth.getReversed()===!0?F.buffers.color.setClear(0,0,0,0):F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);let V=p!==this.type;V&&C.traverse(function(N){N.material&&(Array.isArray(N.material)?N.material.forEach(B=>B.needsUpdate=!0):N.material.needsUpdate=!0)});for(let N=0,B=S.length;N<B;N++){let $=S[N],W=$.shadow;if(W===void 0){Ot("WebGLShadowMap:",$,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;s.copy(W.mapSize);let st=W.getFrameExtents();s.multiply(st),r.copy(W.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/st.x),s.x=r.x*st.x,W.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/st.y),s.y=r.y*st.y,W.mapSize.y=r.y));let X=n.state.buffers.depth.getReversed();if(W.camera._reversedDepth=X,W.map===null||V===!0){if(W.map!==null&&(W.map.depthTexture!==null&&(W.map.depthTexture.dispose(),W.map.depthTexture=null),W.map.dispose()),this.type===Zs){if($.isPointLight){Ot("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}W.map=new Be(s.x,s.y,{format:Vn,type:Ke,minFilter:Ze,magFilter:Ze,generateMipmaps:!1}),W.map.texture.name=$.name+".shadowMap",W.map.depthTexture=new Pn(s.x,s.y,Ri),W.map.depthTexture.name=$.name+".shadowMapDepth",W.map.depthTexture.format=Ji,W.map.depthTexture.compareFunction=null,W.map.depthTexture.minFilter=Ge,W.map.depthTexture.magFilter=Ge}else $.isPointLight?(W.map=new Fl(s.x),W.map.depthTexture=new So(s.x,Vi)):(W.map=new Be(s.x,s.y),W.map.depthTexture=new Pn(s.x,s.y,Vi)),W.map.depthTexture.name=$.name+".shadowMap",W.map.depthTexture.format=Ji,this.type===tn?(W.map.depthTexture.compareFunction=X?Dl:Ll,W.map.depthTexture.minFilter=Ze,W.map.depthTexture.magFilter=Ze):(W.map.depthTexture.compareFunction=null,W.map.depthTexture.minFilter=Ge,W.map.depthTexture.magFilter=Ge);W.camera.updateProjectionMatrix()}W.map.isWebGLCubeRenderTarget!==!0&&(W.map.width!==s.x||W.map.height!==s.y)&&W.map.setSize(s.x,s.y);let j=W.map.isWebGLCubeRenderTarget?6:W.getViewportCount();$.isPointLight!==!0&&W.updateMatrices($,_);for(let et=0;et<j;et++){let Pt=W.getCamera(et);if($.isPointLight){let wt=W.camera,ue=W.matrix,ne=$.distance||wt.far;ne!==wt.far&&(wt.far=ne,wt.updateProjectionMatrix()),ga.setFromMatrixPosition($.matrixWorld),wt.position.copy(ga),wh.copy(wt.position),wh.add(y_[et]),wt.up.copy(M_[et]),wt.lookAt(wh),wt.updateMatrixWorld(),ue.makeTranslation(-ga.x,-ga.y,-ga.z),Vd.multiplyMatrices(wt.projectionMatrix,wt.matrixWorldInverse),W._frustum.setFromProjectionMatrix(Vd,wt.coordinateSystem,wt.reversedDepth)}if(W.map.isWebGLCubeRenderTarget)n.setRenderTarget(W.map,et),n.clear();else{et===0&&(n.setRenderTarget(W.map),n.clear());let wt=W.getViewport(et);a.set(r.x*wt.x,r.y*wt.y,r.x*wt.z,r.y*wt.w),F.viewport(a)}i=W.getFrustum(et),y(C,_,Pt,$,this.type)}W.isPointLightShadow!==!0&&this.type===Zs&&b(W,_),W.needsUpdate=!1}p=this.type,m.needsUpdate=!1,n.setRenderTarget(T,P,D)};function b(S,C){let _=t.update(v);u.defines.VSM_SAMPLES!==S.blurSamples&&(u.defines.VSM_SAMPLES=S.blurSamples,d.defines.VSM_SAMPLES=S.blurSamples,u.needsUpdate=!0,d.needsUpdate=!0),S.mapPass===null?S.mapPass=new Be(s.x,s.y,{format:Vn,type:Ke}):(S.mapPass.width!==S.map.width||S.mapPass.height!==S.map.height)&&S.mapPass.setSize(S.map.width,S.map.height),u.uniforms.shadow_pass.value=S.map.depthTexture,u.uniforms.resolution.value.set(S.map.width,S.map.height),u.uniforms.radius.value=S.radius,n.setRenderTarget(S.mapPass),n.clear(),n.renderBufferDirect(C,null,_,u,v,null),d.uniforms.shadow_pass.value=S.mapPass.texture,d.uniforms.resolution.value.set(S.map.width,S.map.height),d.uniforms.radius.value=S.radius,n.setRenderTarget(S.map),n.clear(),n.renderBufferDirect(C,null,_,d,v,null)}function E(S,C,_,T){let P=null,D=_.isPointLight===!0?S.customDistanceMaterial:S.customDepthMaterial;if(D!==void 0)P=D;else if(P=_.isPointLight===!0?l:o,n.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){let F=P.uuid,V=C.uuid,N=c[F];N===void 0&&(N={},c[F]=N);let B=N[V];B===void 0&&(B=P.clone(),N[V]=B,C.addEventListener("dispose",w)),P=B}if(P.visible=C.visible,P.wireframe=C.wireframe,T===Zs?P.side=C.shadowSide!==null?C.shadowSide:C.side:P.side=C.shadowSide!==null?C.shadowSide:f[C.side],P.alphaMap=C.alphaMap,P.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,P.map=C.map,P.clipShadows=C.clipShadows,P.clippingPlanes=C.clippingPlanes,P.clipIntersection=C.clipIntersection,P.displacementMap=C.displacementMap,P.displacementScale=C.displacementScale,P.displacementBias=C.displacementBias,P.wireframeLinewidth=C.wireframeLinewidth,P.linewidth=C.linewidth,_.isPointLight===!0&&P.isMeshDistanceMaterial===!0){let F=n.properties.get(P);F.light=_}return P}function y(S,C,_,T,P){if(S.visible===!1)return;if(S.layers.test(C.layers)&&(S.isMesh||S.isLine||S.isPoints)&&(S.castShadow||S.receiveShadow&&P===Zs)&&(!S.frustumCulled||S.intersectsFrustum(i))){S.modelViewMatrix.multiplyMatrices(_.matrixWorldInverse,S.matrixWorld);let V=t.update(S),N=S.material;if(Array.isArray(N)){let B=V.groups;for(let $=0,W=B.length;$<W;$++){let st=B[$],X=N[st.materialIndex];if(X&&X.visible){let j=E(S,X,T,P);S.onBeforeShadow(n,S,C,_,V,j,st),n.renderBufferDirect(_,null,V,j,S,st),S.onAfterShadow(n,S,C,_,V,j,st)}}}else if(N.visible){let B=E(S,N,T,P);S.onBeforeShadow(n,S,C,_,V,B,null),n.renderBufferDirect(_,null,V,B,S,null),S.onAfterShadow(n,S,C,_,V,B,null)}}let F=S.children;for(let V=0,N=F.length;V<N;V++)y(F[V],C,_,T,P)}function w(S){S.target.removeEventListener("dispose",w);for(let _ in c){let T=c[_],P=S.target.uuid;P in T&&(T[P].dispose(),delete T[P])}}}function S_(n,t){function e(){let U=!1,ft=new Ce,J=null,pt=new Ce(0,0,0,0);return{setMask:function(yt){J!==yt&&!U&&(n.colorMask(yt,yt,yt,yt),J=yt)},setLocked:function(yt){U=yt},setClear:function(yt,nt,Dt,Ct,be){be===!0&&(yt*=Ct,nt*=Ct,Dt*=Ct),ft.set(yt,nt,Dt,Ct),pt.equals(ft)===!1&&(n.clearColor(yt,nt,Dt,Ct),pt.copy(ft))},reset:function(){U=!1,J=null,pt.set(-1,0,0,0)}}}function i(){let U=!1,ft=!1,J=null,pt=null,yt=null;return{setReversed:function(nt){if(ft!==nt){let Dt=t.get("EXT_clip_control");nt?Dt.clipControlEXT(Dt.LOWER_LEFT_EXT,Dt.ZERO_TO_ONE_EXT):Dt.clipControlEXT(Dt.LOWER_LEFT_EXT,Dt.NEGATIVE_ONE_TO_ONE_EXT),ft=nt;let Ct=yt;yt=null,this.setClear(Ct)}},getReversed:function(){return ft},setTest:function(nt){nt?Q(n.DEPTH_TEST):xt(n.DEPTH_TEST)},setMask:function(nt){J!==nt&&!U&&(n.depthMask(nt),J=nt)},setFunc:function(nt){if(ft&&(nt=pd[nt]),pt!==nt){switch(nt){case ao:n.depthFunc(n.NEVER);break;case oo:n.depthFunc(n.ALWAYS);break;case lo:n.depthFunc(n.LESS);break;case Ds:n.depthFunc(n.LEQUAL);break;case co:n.depthFunc(n.EQUAL);break;case ho:n.depthFunc(n.GEQUAL);break;case uo:n.depthFunc(n.GREATER);break;case fo:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}pt=nt}},setLocked:function(nt){U=nt},setClear:function(nt){yt!==nt&&(yt=nt,ft&&(nt=1-nt),n.clearDepth(nt))},reset:function(){U=!1,J=null,pt=null,yt=null,ft=!1}}}function s(){let U=!1,ft=null,J=null,pt=null,yt=null,nt=null,Dt=null,Ct=null,be=null;return{setTest:function(me){U||(me?Q(n.STENCIL_TEST):xt(n.STENCIL_TEST))},setMask:function(me){ft!==me&&!U&&(n.stencilMask(me),ft=me)},setFunc:function(me,Ni,Xi){(J!==me||pt!==Ni||yt!==Xi)&&(n.stencilFunc(me,Ni,Xi),J=me,pt=Ni,yt=Xi)},setOp:function(me,Ni,Xi){(nt!==me||Dt!==Ni||Ct!==Xi)&&(n.stencilOp(me,Ni,Xi),nt=me,Dt=Ni,Ct=Xi)},setLocked:function(me){U=me},setClear:function(me){be!==me&&(n.clearStencil(me),be=me)},reset:function(){U=!1,ft=null,J=null,pt=null,yt=null,nt=null,Dt=null,Ct=null,be=null}}}let r=new e,a=new i,o=new s,l=new WeakMap,c=new WeakMap,h={},f={},u={},d=new WeakMap,g=[],v=null,m=!1,p=null,b=null,E=null,y=null,w=null,S=null,C=null,_=new Ft(0,0,0),T=0,P=!1,D=null,F=null,V=null,N=null,B=null,$=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS),W=!1,st=0,X=n.getParameter(n.VERSION);X.indexOf("WebGL")!==-1?(st=parseFloat(/^WebGL (\d)/.exec(X)[1]),W=st>=1):X.indexOf("OpenGL ES")!==-1&&(st=parseFloat(/^OpenGL ES (\d)/.exec(X)[1]),W=st>=2);let j=null,et={},Pt=n.getParameter(n.SCISSOR_BOX),wt=n.getParameter(n.VIEWPORT),ue=new Ce().fromArray(Pt),ne=new Ce().fromArray(wt);function ae(U,ft,J,pt){let yt=new Uint8Array(4),nt=n.createTexture();n.bindTexture(U,nt),n.texParameteri(U,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(U,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Dt=0;Dt<J;Dt++)U===n.TEXTURE_3D||U===n.TEXTURE_2D_ARRAY?n.texImage3D(ft,0,n.RGBA,1,1,pt,0,n.RGBA,n.UNSIGNED_BYTE,yt):n.texImage2D(ft+Dt,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,yt);return nt}let Z={};Z[n.TEXTURE_2D]=ae(n.TEXTURE_2D,n.TEXTURE_2D,1),Z[n.TEXTURE_CUBE_MAP]=ae(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),Z[n.TEXTURE_2D_ARRAY]=ae(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),Z[n.TEXTURE_3D]=ae(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),Q(n.DEPTH_TEST),a.setFunc(Ds),ot(!1),ht(Zc),Q(n.CULL_FACE),rt(Ci);function Q(U){h[U]!==!0&&(n.enable(U),h[U]=!0)}function xt(U){h[U]!==!1&&(n.disable(U),h[U]=!1)}function Vt(U,ft){return u[U]!==ft?(n.bindFramebuffer(U,ft),u[U]=ft,U===n.DRAW_FRAMEBUFFER&&(u[n.FRAMEBUFFER]=ft),U===n.FRAMEBUFFER&&(u[n.DRAW_FRAMEBUFFER]=ft),!0):!1}function Mt(U,ft){let J=g,pt=!1;if(U){J=d.get(ft),J===void 0&&(J=[],d.set(ft,J));let yt=U.textures;if(J.length!==yt.length||J[0]!==n.COLOR_ATTACHMENT0){for(let nt=0,Dt=yt.length;nt<Dt;nt++)J[nt]=n.COLOR_ATTACHMENT0+nt;J.length=yt.length,pt=!0}}else J[0]!==n.BACK&&(J[0]=n.BACK,pt=!0);pt&&n.drawBuffers(J)}function Gt(U){return v!==U?(n.useProgram(U),v=U,!0):!1}let ve={[as]:n.FUNC_ADD,[Uu]:n.FUNC_SUBTRACT,[Fu]:n.FUNC_REVERSE_SUBTRACT};ve[Ou]=n.MIN,ve[Bu]=n.MAX;let tt={[ku]:n.ZERO,[zu]:n.ONE,[Hu]:n.SRC_COLOR,[jc]:n.SRC_ALPHA,[qu]:n.SRC_ALPHA_SATURATE,[$u]:n.DST_COLOR,[Gu]:n.DST_ALPHA,[Vu]:n.ONE_MINUS_SRC_COLOR,[Qc]:n.ONE_MINUS_SRC_ALPHA,[Xu]:n.ONE_MINUS_DST_COLOR,[Wu]:n.ONE_MINUS_DST_ALPHA,[Yu]:n.CONSTANT_COLOR,[Zu]:n.ONE_MINUS_CONSTANT_COLOR,[Ju]:n.CONSTANT_ALPHA,[Ku]:n.ONE_MINUS_CONSTANT_ALPHA};function rt(U,ft,J,pt,yt,nt,Dt,Ct,be,me){if(U===Ci){m===!0&&(xt(n.BLEND),m=!1);return}if(m===!1&&(Q(n.BLEND),m=!0),U!==Nu){if(U!==p||me!==P){if((b!==as||w!==as)&&(n.blendEquation(n.FUNC_ADD),b=as,w=as),me)switch(U){case Bn:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case yi:n.blendFunc(n.ONE,n.ONE);break;case Jc:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Kc:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:Ht("WebGLState: Invalid blending: ",U);break}else switch(U){case Bn:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case yi:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case Jc:Ht("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Kc:Ht("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Ht("WebGLState: Invalid blending: ",U);break}E=null,y=null,S=null,C=null,_.set(0,0,0),T=0,p=U,P=me}return}yt=yt||ft,nt=nt||J,Dt=Dt||pt,(ft!==b||yt!==w)&&(n.blendEquationSeparate(ve[ft],ve[yt]),b=ft,w=yt),(J!==E||pt!==y||nt!==S||Dt!==C)&&(n.blendFuncSeparate(tt[J],tt[pt],tt[nt],tt[Dt]),E=J,y=pt,S=nt,C=Dt),(Ct.equals(_)===!1||be!==T)&&(n.blendColor(Ct.r,Ct.g,Ct.b,be),_.copy(Ct),T=be),p=U,P=!1}function at(U,ft){U.side===We?xt(n.CULL_FACE):Q(n.CULL_FACE);let J=U.side===Je;ft&&(J=!J),ot(J),U.blending===Bn&&U.transparent===!1?rt(Ci):rt(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),a.setFunc(U.depthFunc),a.setTest(U.depthTest),a.setMask(U.depthWrite),r.setMask(U.colorWrite);let pt=U.stencilWrite;o.setTest(pt),pt&&(o.setMask(U.stencilWriteMask),o.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),o.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),Ut(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?Q(n.SAMPLE_ALPHA_TO_COVERAGE):xt(n.SAMPLE_ALPHA_TO_COVERAGE)}function ot(U){D!==U&&(U?n.frontFace(n.CW):n.frontFace(n.CCW),D=U)}function ht(U){U!==Iu?(Q(n.CULL_FACE),U!==F&&(U===Zc?n.cullFace(n.BACK):U===Lu?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):xt(n.CULL_FACE),F=U}function Bt(U){U!==V&&(W&&n.lineWidth(U),V=U)}function Ut(U,ft,J){U?(Q(n.POLYGON_OFFSET_FILL),(N!==ft||B!==J)&&(N=ft,B=J,a.getReversed()&&(ft=-ft),n.polygonOffset(ft,J))):xt(n.POLYGON_OFFSET_FILL)}function Wt(U){U?Q(n.SCISSOR_TEST):xt(n.SCISSOR_TEST)}function qt(U){U===void 0&&(U=n.TEXTURE0+$-1),j!==U&&(n.activeTexture(U),j=U)}function I(U,ft,J){J===void 0&&(j===null?J=n.TEXTURE0+$-1:J=j);let pt=et[J];pt===void 0&&(pt={type:void 0,texture:void 0},et[J]=pt),(pt.type!==U||pt.texture!==ft)&&(j!==J&&(n.activeTexture(J),j=J),n.bindTexture(U,ft||Z[U]),pt.type=U,pt.texture=ft)}function pe(){let U=et[j];U!==void 0&&U.type!==void 0&&(n.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function se(){try{n.compressedTexImage2D(...arguments)}catch(U){Ht("WebGLState:",U)}}function A(){try{n.compressedTexImage3D(...arguments)}catch(U){Ht("WebGLState:",U)}}function x(){try{n.texSubImage2D(...arguments)}catch(U){Ht("WebGLState:",U)}}function O(){try{n.texSubImage3D(...arguments)}catch(U){Ht("WebGLState:",U)}}function H(){try{n.compressedTexSubImage2D(...arguments)}catch(U){Ht("WebGLState:",U)}}function q(){try{n.compressedTexSubImage3D(...arguments)}catch(U){Ht("WebGLState:",U)}}function lt(){try{n.texStorage2D(...arguments)}catch(U){Ht("WebGLState:",U)}}function ct(){try{n.texStorage3D(...arguments)}catch(U){Ht("WebGLState:",U)}}function Y(){try{n.texImage2D(...arguments)}catch(U){Ht("WebGLState:",U)}}function K(){try{n.texImage3D(...arguments)}catch(U){Ht("WebGLState:",U)}}function ut(U){return f[U]!==void 0?f[U]:n.getParameter(U)}function It(U,ft){f[U]!==ft&&(n.pixelStorei(U,ft),f[U]=ft)}function mt(U){ue.equals(U)===!1&&(n.scissor(U.x,U.y,U.z,U.w),ue.copy(U))}function dt(U){ne.equals(U)===!1&&(n.viewport(U.x,U.y,U.z,U.w),ne.copy(U))}function Lt(U,ft){let J=c.get(ft);J===void 0&&(J=new WeakMap,c.set(ft,J));let pt=J.get(U);pt===void 0&&(pt=n.getUniformBlockIndex(ft,U.name),J.set(U,pt))}function kt(U,ft){let pt=c.get(ft).get(U);l.get(ft)!==pt&&(n.uniformBlockBinding(ft,pt,U.__bindingPointIndex),l.set(ft,pt))}function Zt(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),h={},f={},j=null,et={},u={},d=new WeakMap,g=[],v=null,m=!1,p=null,b=null,E=null,y=null,w=null,S=null,C=null,_=new Ft(0,0,0),T=0,P=!1,D=null,F=null,V=null,N=null,B=null,ue.set(0,0,n.canvas.width,n.canvas.height),ne.set(0,0,n.canvas.width,n.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:Q,disable:xt,bindFramebuffer:Vt,drawBuffers:Mt,useProgram:Gt,setBlending:rt,setMaterial:at,setFlipSided:ot,setCullFace:ht,setLineWidth:Bt,setPolygonOffset:Ut,setScissorTest:Wt,activeTexture:qt,bindTexture:I,unbindTexture:pe,compressedTexImage2D:se,compressedTexImage3D:A,texImage2D:Y,texImage3D:K,pixelStorei:It,getParameter:ut,updateUBOMapping:Lt,uniformBlockBinding:kt,texStorage2D:lt,texStorage3D:ct,texSubImage2D:x,texSubImage3D:O,compressedTexSubImage2D:H,compressedTexSubImage3D:q,scissor:mt,viewport:dt,reset:Zt}}function w_(n,t,e,i,s,r,a){let o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new it,h=new WeakMap,f=new Set,u,d=new WeakMap,g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(A,x){return g?new OffscreenCanvas(A,x):wr("canvas")}function m(A,x,O){let H=1,q=se(A);if((q.width>O||q.height>O)&&(H=O/Math.max(q.width,q.height)),H<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){let lt=Math.floor(H*q.width),ct=Math.floor(H*q.height);u===void 0&&(u=v(lt,ct));let Y=x?v(lt,ct):u;return Y.width=lt,Y.height=ct,Y.getContext("2d").drawImage(A,0,0,lt,ct),Ot("WebGLRenderer: Texture has been resized from ("+q.width+"x"+q.height+") to ("+lt+"x"+ct+")."),Y}else return"data"in A&&Ot("WebGLRenderer: Image in DataTexture is too big ("+q.width+"x"+q.height+")."),A;return A}function p(A){return A.generateMipmaps}function b(A){n.generateMipmap(A)}function E(A){return A.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?n.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function y(A,x,O,H,q,lt=!1){if(A!==null){if(n[A]!==void 0)return n[A];Ot("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let ct;H&&(ct=t.get("EXT_texture_norm16"),ct||Ot("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Y=x;if(x===n.RED&&(O===n.FLOAT&&(Y=n.R32F),O===n.HALF_FLOAT&&(Y=n.R16F),O===n.UNSIGNED_BYTE&&(Y=n.R8),O===n.UNSIGNED_SHORT&&ct&&(Y=ct.R16_EXT),O===n.SHORT&&ct&&(Y=ct.R16_SNORM_EXT)),x===n.RED_INTEGER&&(O===n.UNSIGNED_BYTE&&(Y=n.R8UI),O===n.UNSIGNED_SHORT&&(Y=n.R16UI),O===n.UNSIGNED_INT&&(Y=n.R32UI),O===n.BYTE&&(Y=n.R8I),O===n.SHORT&&(Y=n.R16I),O===n.INT&&(Y=n.R32I)),x===n.RG&&(O===n.FLOAT&&(Y=n.RG32F),O===n.HALF_FLOAT&&(Y=n.RG16F),O===n.UNSIGNED_BYTE&&(Y=n.RG8),O===n.UNSIGNED_SHORT&&ct&&(Y=ct.RG16_EXT),O===n.SHORT&&ct&&(Y=ct.RG16_SNORM_EXT)),x===n.RG_INTEGER&&(O===n.UNSIGNED_BYTE&&(Y=n.RG8UI),O===n.UNSIGNED_SHORT&&(Y=n.RG16UI),O===n.UNSIGNED_INT&&(Y=n.RG32UI),O===n.BYTE&&(Y=n.RG8I),O===n.SHORT&&(Y=n.RG16I),O===n.INT&&(Y=n.RG32I)),x===n.RGB_INTEGER&&(O===n.UNSIGNED_BYTE&&(Y=n.RGB8UI),O===n.UNSIGNED_SHORT&&(Y=n.RGB16UI),O===n.UNSIGNED_INT&&(Y=n.RGB32UI),O===n.BYTE&&(Y=n.RGB8I),O===n.SHORT&&(Y=n.RGB16I),O===n.INT&&(Y=n.RGB32I)),x===n.RGBA_INTEGER&&(O===n.UNSIGNED_BYTE&&(Y=n.RGBA8UI),O===n.UNSIGNED_SHORT&&(Y=n.RGBA16UI),O===n.UNSIGNED_INT&&(Y=n.RGBA32UI),O===n.BYTE&&(Y=n.RGBA8I),O===n.SHORT&&(Y=n.RGBA16I),O===n.INT&&(Y=n.RGBA32I)),x===n.RGB&&(O===n.UNSIGNED_SHORT&&ct&&(Y=ct.RGB16_EXT),O===n.SHORT&&ct&&(Y=ct.RGB16_SNORM_EXT),O===n.UNSIGNED_INT_5_9_9_9_REV&&(Y=n.RGB9_E5),O===n.UNSIGNED_INT_10F_11F_11F_REV&&(Y=n.R11F_G11F_B10F)),x===n.RGBA){let K=lt?Sr:ie.getTransfer(q);O===n.FLOAT&&(Y=n.RGBA32F),O===n.HALF_FLOAT&&(Y=n.RGBA16F),O===n.UNSIGNED_BYTE&&(Y=K===ce?n.SRGB8_ALPHA8:n.RGBA8),O===n.UNSIGNED_SHORT&&ct&&(Y=ct.RGBA16_EXT),O===n.SHORT&&ct&&(Y=ct.RGBA16_SNORM_EXT),O===n.UNSIGNED_SHORT_4_4_4_4&&(Y=n.RGBA4),O===n.UNSIGNED_SHORT_5_5_5_1&&(Y=n.RGB5_A1)}return(Y===n.R16F||Y===n.R32F||Y===n.RG16F||Y===n.RG32F||Y===n.RGBA16F||Y===n.RGBA32F)&&t.get("EXT_color_buffer_float"),Y}function w(A,x){let O;return A?x===null||x===Vi||x===Ks?O=n.DEPTH24_STENCIL8:x===Ri?O=n.DEPTH32F_STENCIL8:x===Js&&(O=n.DEPTH24_STENCIL8,Ot("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===Vi||x===Ks?O=n.DEPTH_COMPONENT24:x===Ri?O=n.DEPTH_COMPONENT32F:x===Js&&(O=n.DEPTH_COMPONENT16),O}function S(A,x){return p(A)===!0||A.isFramebufferTexture&&A.minFilter!==Ge&&A.minFilter!==Ze?Math.log2(Math.max(x.width,x.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?x.mipmaps.length:1}function C(A){let x=A.target;x.removeEventListener("dispose",C),T(x),x.isVideoTexture&&h.delete(x),x.isHTMLTexture&&f.delete(x)}function _(A){let x=A.target;x.removeEventListener("dispose",_),D(x)}function T(A){let x=i.get(A);if(x.__webglInit===void 0)return;let O=A.source,H=d.get(O);if(H){let q=H[x.__cacheKey];q.usedTimes--,q.usedTimes===0&&P(A),Object.keys(H).length===0&&d.delete(O)}i.remove(A)}function P(A){let x=i.get(A);n.deleteTexture(x.__webglTexture);let O=A.source,H=d.get(O);delete H[x.__cacheKey],a.memory.textures--}function D(A){let x=i.get(A);if(A.depthTexture&&(A.depthTexture.dispose(),i.remove(A.depthTexture)),A.isWebGLCubeRenderTarget)for(let H=0;H<6;H++){if(Array.isArray(x.__webglFramebuffer[H]))for(let q=0;q<x.__webglFramebuffer[H].length;q++)n.deleteFramebuffer(x.__webglFramebuffer[H][q]);else n.deleteFramebuffer(x.__webglFramebuffer[H]);x.__webglDepthbuffer&&n.deleteRenderbuffer(x.__webglDepthbuffer[H])}else{if(Array.isArray(x.__webglFramebuffer))for(let H=0;H<x.__webglFramebuffer.length;H++)n.deleteFramebuffer(x.__webglFramebuffer[H]);else n.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&n.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&n.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let H=0;H<x.__webglColorRenderbuffer.length;H++)x.__webglColorRenderbuffer[H]&&n.deleteRenderbuffer(x.__webglColorRenderbuffer[H]);x.__webglDepthRenderbuffer&&n.deleteRenderbuffer(x.__webglDepthRenderbuffer)}let O=A.textures;for(let H=0,q=O.length;H<q;H++){let lt=i.get(O[H]);lt.__webglTexture&&(n.deleteTexture(lt.__webglTexture),a.memory.textures--),i.remove(O[H])}i.remove(A)}let F=0;function V(){F=0}function N(){return F}function B(A){F=A}function $(){let A=F;return A>=s.maxTextures&&Ot("WebGLTextures: Trying to use "+(A+1)+" texture units while this GPU supports only "+s.maxTextures),F+=1,A}function W(A){let x=[];return x.push(A.wrapS),x.push(A.wrapT),x.push(A.wrapR||0),x.push(A.magFilter),x.push(A.minFilter),x.push(A.anisotropy),x.push(A.internalFormat),x.push(A.format),x.push(A.type),x.push(A.generateMipmaps),x.push(A.premultiplyAlpha),x.push(A.flipY),x.push(A.unpackAlignment),x.push(A.colorSpace),x.join()}function st(A,x){let O=i.get(A);if(A.isVideoTexture&&I(A),A.isRenderTargetTexture===!1&&A.isExternalTexture!==!0&&A.version>0&&O.__version!==A.version){let H=A.image;if(H===null)Ot("WebGLRenderer: Texture marked for update but no image data found.");else if(H.complete===!1)Ot("WebGLRenderer: Texture marked for update but image is incomplete");else{xt(O,A,x);return}}else A.isExternalTexture&&(O.__webglTexture=A.sourceTexture?A.sourceTexture:null);e.bindTexture(n.TEXTURE_2D,O.__webglTexture,n.TEXTURE0+x)}function X(A,x){let O=i.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&O.__version!==A.version){xt(O,A,x);return}else A.isExternalTexture&&(O.__webglTexture=A.sourceTexture?A.sourceTexture:null);e.bindTexture(n.TEXTURE_2D_ARRAY,O.__webglTexture,n.TEXTURE0+x)}function j(A,x){let O=i.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&O.__version!==A.version){xt(O,A,x);return}e.bindTexture(n.TEXTURE_3D,O.__webglTexture,n.TEXTURE0+x)}function et(A,x){let O=i.get(A);if(A.isCubeDepthTexture!==!0&&A.version>0&&O.__version!==A.version){Vt(O,A,x);return}e.bindTexture(n.TEXTURE_CUBE_MAP,O.__webglTexture,n.TEXTURE0+x)}let Pt={[Ns]:n.REPEAT,[Zi]:n.CLAMP_TO_EDGE,[po]:n.MIRRORED_REPEAT},wt={[Ge]:n.NEAREST,[td]:n.NEAREST_MIPMAP_NEAREST,[oa]:n.NEAREST_MIPMAP_LINEAR,[Ze]:n.LINEAR,[Yo]:n.LINEAR_MIPMAP_NEAREST,[zn]:n.LINEAR_MIPMAP_LINEAR},ue={[sd]:n.NEVER,[cd]:n.ALWAYS,[rd]:n.LESS,[Ll]:n.LEQUAL,[ad]:n.EQUAL,[Dl]:n.GEQUAL,[od]:n.GREATER,[ld]:n.NOTEQUAL};function ne(A,x){if(x.type===Ri&&t.has("OES_texture_float_linear")===!1&&(x.magFilter===Ze||x.magFilter===Yo||x.magFilter===oa||x.magFilter===zn||x.minFilter===Ze||x.minFilter===Yo||x.minFilter===oa||x.minFilter===zn)&&Ot("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(A,n.TEXTURE_WRAP_S,Pt[x.wrapS]),n.texParameteri(A,n.TEXTURE_WRAP_T,Pt[x.wrapT]),(A===n.TEXTURE_3D||A===n.TEXTURE_2D_ARRAY)&&n.texParameteri(A,n.TEXTURE_WRAP_R,Pt[x.wrapR]),n.texParameteri(A,n.TEXTURE_MAG_FILTER,wt[x.magFilter]),n.texParameteri(A,n.TEXTURE_MIN_FILTER,wt[x.minFilter]),x.compareFunction&&(n.texParameteri(A,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(A,n.TEXTURE_COMPARE_FUNC,ue[x.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===Ge||x.minFilter!==oa&&x.minFilter!==zn||x.type===Ri&&t.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||i.get(x).__currentAnisotropy){let O=t.get("EXT_texture_filter_anisotropic");n.texParameterf(A,O.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,s.getMaxAnisotropy())),i.get(x).__currentAnisotropy=x.anisotropy}}}function ae(A,x){let O=!1;A.__webglInit===void 0&&(A.__webglInit=!0,x.addEventListener("dispose",C));let H=x.source,q=d.get(H);q===void 0&&(q={},d.set(H,q));let lt=W(x);if(lt!==A.__cacheKey){q[lt]===void 0&&(q[lt]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,O=!0),q[lt].usedTimes++;let ct=q[A.__cacheKey];ct!==void 0&&(q[A.__cacheKey].usedTimes--,ct.usedTimes===0&&P(x)),A.__cacheKey=lt,A.__webglTexture=q[lt].texture}return O}function Z(A,x,O){return Math.floor(Math.floor(A/O)/x)}function Q(A,x,O,H){let lt=A.updateRanges;if(lt.length===0)e.texSubImage2D(n.TEXTURE_2D,0,0,0,x.width,x.height,O,H,x.data);else{lt.sort((It,mt)=>It.start-mt.start);let ct=0;for(let It=1;It<lt.length;It++){let mt=lt[ct],dt=lt[It],Lt=mt.start+mt.count,kt=Z(dt.start,x.width,4),Zt=Z(mt.start,x.width,4);dt.start<=Lt+1&&kt===Zt&&Z(dt.start+dt.count-1,x.width,4)===kt?mt.count=Math.max(mt.count,dt.start+dt.count-mt.start):(++ct,lt[ct]=dt)}lt.length=ct+1;let Y=e.getParameter(n.UNPACK_ROW_LENGTH),K=e.getParameter(n.UNPACK_SKIP_PIXELS),ut=e.getParameter(n.UNPACK_SKIP_ROWS);e.pixelStorei(n.UNPACK_ROW_LENGTH,x.width);for(let It=0,mt=lt.length;It<mt;It++){let dt=lt[It],Lt=Math.floor(dt.start/4),kt=Math.ceil(dt.count/4),Zt=Lt%x.width,U=Math.floor(Lt/x.width),ft=kt,J=1;e.pixelStorei(n.UNPACK_SKIP_PIXELS,Zt),e.pixelStorei(n.UNPACK_SKIP_ROWS,U),e.texSubImage2D(n.TEXTURE_2D,0,Zt,U,ft,J,O,H,x.data)}A.clearUpdateRanges(),e.pixelStorei(n.UNPACK_ROW_LENGTH,Y),e.pixelStorei(n.UNPACK_SKIP_PIXELS,K),e.pixelStorei(n.UNPACK_SKIP_ROWS,ut)}}function xt(A,x,O){let H=n.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(H=n.TEXTURE_2D_ARRAY),x.isData3DTexture&&(H=n.TEXTURE_3D);let q=ae(A,x),lt=x.source;e.bindTexture(H,A.__webglTexture,n.TEXTURE0+O);let ct=i.get(lt);if(lt.version!==ct.__version||q===!0){if(e.activeTexture(n.TEXTURE0+O),(typeof ImageBitmap<"u"&&x.image instanceof ImageBitmap)===!1){let J=ie.getPrimaries(ie.workingColorSpace),pt=x.colorSpace===mn?null:ie.getPrimaries(x.colorSpace),yt=x.colorSpace===mn||J===pt?n.NONE:n.BROWSER_DEFAULT_WEBGL;e.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,x.flipY),e.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),e.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,yt)}e.pixelStorei(n.UNPACK_ALIGNMENT,x.unpackAlignment);let K=m(x.image,!1,s.maxTextureSize);K=pe(x,K);let ut=r.convert(x.format,x.colorSpace),It=r.convert(x.type),mt=y(x.internalFormat,ut,It,x.normalized,x.colorSpace,x.isVideoTexture);ne(H,x);let dt,Lt=x.mipmaps,kt=x.isVideoTexture!==!0,Zt=ct.__version===void 0||q===!0,U=lt.dataReady,ft=S(x,K);if(x.isDepthTexture)mt=w(x.format===Hn,x.type),Zt&&(kt?e.texStorage2D(n.TEXTURE_2D,1,mt,K.width,K.height):e.texImage2D(n.TEXTURE_2D,0,mt,K.width,K.height,0,ut,It,null));else if(x.isDataTexture)if(Lt.length>0){kt&&Zt&&e.texStorage2D(n.TEXTURE_2D,ft,mt,Lt[0].width,Lt[0].height);for(let J=0,pt=Lt.length;J<pt;J++)dt=Lt[J],kt?U&&e.texSubImage2D(n.TEXTURE_2D,J,0,0,dt.width,dt.height,ut,It,dt.data):e.texImage2D(n.TEXTURE_2D,J,mt,dt.width,dt.height,0,ut,It,dt.data);x.generateMipmaps=!1}else kt?(Zt&&e.texStorage2D(n.TEXTURE_2D,ft,mt,K.width,K.height),U&&Q(x,K,ut,It)):e.texImage2D(n.TEXTURE_2D,0,mt,K.width,K.height,0,ut,It,K.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){kt&&Zt&&e.texStorage3D(n.TEXTURE_2D_ARRAY,ft,mt,Lt[0].width,Lt[0].height,K.depth);for(let J=0,pt=Lt.length;J<pt;J++)if(dt=Lt[J],x.format!==Pi)if(ut!==null)if(kt){if(U)if(x.layerUpdates.size>0){let yt=fh(dt.width,dt.height,x.format,x.type);for(let nt of x.layerUpdates){let Dt=dt.data.subarray(nt*yt/dt.data.BYTES_PER_ELEMENT,(nt+1)*yt/dt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,J,0,0,nt,dt.width,dt.height,1,ut,Dt)}}else e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,J,0,0,0,dt.width,dt.height,K.depth,ut,dt.data)}else e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,J,mt,dt.width,dt.height,K.depth,0,dt.data,0,0);else Ot("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else kt?U&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,J,0,0,0,dt.width,dt.height,K.depth,ut,It,dt.data):e.texImage3D(n.TEXTURE_2D_ARRAY,J,mt,dt.width,dt.height,K.depth,0,ut,It,dt.data);x.layerUpdates.size>0&&x.clearLayerUpdates()}else{kt&&Zt&&e.texStorage2D(n.TEXTURE_2D,ft,mt,Lt[0].width,Lt[0].height);for(let J=0,pt=Lt.length;J<pt;J++)dt=Lt[J],x.format!==Pi?ut!==null?kt?U&&e.compressedTexSubImage2D(n.TEXTURE_2D,J,0,0,dt.width,dt.height,ut,dt.data):e.compressedTexImage2D(n.TEXTURE_2D,J,mt,dt.width,dt.height,0,dt.data):Ot("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):kt?U&&e.texSubImage2D(n.TEXTURE_2D,J,0,0,dt.width,dt.height,ut,It,dt.data):e.texImage2D(n.TEXTURE_2D,J,mt,dt.width,dt.height,0,ut,It,dt.data)}else if(x.isDataArrayTexture)if(kt){if(Zt&&e.texStorage3D(n.TEXTURE_2D_ARRAY,ft,mt,K.width,K.height,K.depth),U)if(x.layerUpdates.size>0){let J=fh(K.width,K.height,x.format,x.type);for(let pt of x.layerUpdates){let yt=K.data.subarray(pt*J/K.data.BYTES_PER_ELEMENT,(pt+1)*J/K.data.BYTES_PER_ELEMENT);e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,pt,K.width,K.height,1,ut,It,yt)}x.clearLayerUpdates()}else e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,K.width,K.height,K.depth,ut,It,K.data)}else e.texImage3D(n.TEXTURE_2D_ARRAY,0,mt,K.width,K.height,K.depth,0,ut,It,K.data);else if(x.isData3DTexture)kt?(Zt&&e.texStorage3D(n.TEXTURE_3D,ft,mt,K.width,K.height,K.depth),U&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,K.width,K.height,K.depth,ut,It,K.data)):e.texImage3D(n.TEXTURE_3D,0,mt,K.width,K.height,K.depth,0,ut,It,K.data);else if(x.isFramebufferTexture){if(Zt)if(kt)e.texStorage2D(n.TEXTURE_2D,ft,mt,K.width,K.height);else{let J=K.width,pt=K.height;for(let yt=0;yt<ft;yt++)e.texImage2D(n.TEXTURE_2D,yt,mt,J,pt,0,ut,It,null),J>>=1,pt>>=1}}else if(x.isHTMLTexture){if("texElementImage2D"in n){let J=n.canvas;if(J.hasAttribute("layoutsubtree")||J.setAttribute("layoutsubtree","true"),K.parentNode!==J){J.appendChild(K),f.add(x),J.onpaint=pt=>{let yt=pt.changedElements;for(let nt of f)yt.includes(nt.image)&&(nt.needsUpdate=!0)},J.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,K);else{let yt=n.RGBA,nt=n.RGBA,Dt=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,yt,nt,Dt,K)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(Lt.length>0){if(kt&&Zt){let J=se(Lt[0]);e.texStorage2D(n.TEXTURE_2D,ft,mt,J.width,J.height)}for(let J=0,pt=Lt.length;J<pt;J++)dt=Lt[J],kt?U&&e.texSubImage2D(n.TEXTURE_2D,J,0,0,ut,It,dt):e.texImage2D(n.TEXTURE_2D,J,mt,ut,It,dt);x.generateMipmaps=!1}else if(kt){if(Zt){let J=se(K);e.texStorage2D(n.TEXTURE_2D,ft,mt,J.width,J.height)}U&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,ut,It,K)}else e.texImage2D(n.TEXTURE_2D,0,mt,ut,It,K);p(x)&&b(H),ct.__version=lt.version,x.onUpdate&&x.onUpdate(x)}A.__version=x.version}function Vt(A,x,O){if(x.image.length!==6)return;let H=ae(A,x),q=x.source;e.bindTexture(n.TEXTURE_CUBE_MAP,A.__webglTexture,n.TEXTURE0+O);let lt=i.get(q);if(q.version!==lt.__version||H===!0){e.activeTexture(n.TEXTURE0+O);let ct=ie.getPrimaries(ie.workingColorSpace),Y=x.colorSpace===mn?null:ie.getPrimaries(x.colorSpace),K=x.colorSpace===mn||ct===Y?n.NONE:n.BROWSER_DEFAULT_WEBGL;e.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,x.flipY),e.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),e.pixelStorei(n.UNPACK_ALIGNMENT,x.unpackAlignment),e.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,K);let ut=x.isCompressedTexture||x.image[0].isCompressedTexture,It=x.image[0]&&x.image[0].isDataTexture,mt=[];for(let nt=0;nt<6;nt++)!ut&&!It?mt[nt]=m(x.image[nt],!0,s.maxCubemapSize):mt[nt]=It?x.image[nt].image:x.image[nt],mt[nt]=pe(x,mt[nt]);let dt=mt[0],Lt=r.convert(x.format,x.colorSpace),kt=r.convert(x.type),Zt=y(x.internalFormat,Lt,kt,x.normalized,x.colorSpace),U=x.isVideoTexture!==!0,ft=lt.__version===void 0||H===!0,J=q.dataReady,pt=S(x,dt);ne(n.TEXTURE_CUBE_MAP,x);let yt;if(ut){U&&ft&&e.texStorage2D(n.TEXTURE_CUBE_MAP,pt,Zt,dt.width,dt.height);for(let nt=0;nt<6;nt++){yt=mt[nt].mipmaps;for(let Dt=0;Dt<yt.length;Dt++){let Ct=yt[Dt];x.format!==Pi?Lt!==null?U?J&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Dt,0,0,Ct.width,Ct.height,Lt,Ct.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Dt,Zt,Ct.width,Ct.height,0,Ct.data):Ot("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):U?J&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Dt,0,0,Ct.width,Ct.height,Lt,kt,Ct.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Dt,Zt,Ct.width,Ct.height,0,Lt,kt,Ct.data)}}}else{if(yt=x.mipmaps,U&&ft){yt.length>0&&pt++;let nt=se(mt[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,pt,Zt,nt.width,nt.height)}for(let nt=0;nt<6;nt++)if(It){U?J&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,0,0,mt[nt].width,mt[nt].height,Lt,kt,mt[nt].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,Zt,mt[nt].width,mt[nt].height,0,Lt,kt,mt[nt].data);for(let Dt=0;Dt<yt.length;Dt++){let be=yt[Dt].image[nt].image;U?J&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Dt+1,0,0,be.width,be.height,Lt,kt,be.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Dt+1,Zt,be.width,be.height,0,Lt,kt,be.data)}}else{U?J&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,0,0,Lt,kt,mt[nt]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,Zt,Lt,kt,mt[nt]);for(let Dt=0;Dt<yt.length;Dt++){let Ct=yt[Dt];U?J&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Dt+1,0,0,Lt,kt,Ct.image[nt]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Dt+1,Zt,Lt,kt,Ct.image[nt])}}}p(x)&&b(n.TEXTURE_CUBE_MAP),lt.__version=q.version,x.onUpdate&&x.onUpdate(x)}A.__version=x.version}function Mt(A,x,O,H,q,lt){let ct=r.convert(O.format,O.colorSpace),Y=r.convert(O.type),K=y(O.internalFormat,ct,Y,O.normalized,O.colorSpace),ut=i.get(x),It=i.get(O);if(It.__renderTarget=x,!ut.__hasExternalTextures){let mt=Math.max(1,x.width>>lt),dt=Math.max(1,x.height>>lt);q===n.TEXTURE_3D||q===n.TEXTURE_2D_ARRAY?e.texImage3D(q,lt,K,mt,dt,x.depth,0,ct,Y,null):e.texImage2D(q,lt,K,mt,dt,0,ct,Y,null)}e.bindFramebuffer(n.FRAMEBUFFER,A),qt(x)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,H,q,It.__webglTexture,0,Wt(x)):(q===n.TEXTURE_2D||q>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&q<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,H,q,It.__webglTexture,lt),e.bindFramebuffer(n.FRAMEBUFFER,null)}function Gt(A,x,O){if(n.bindRenderbuffer(n.RENDERBUFFER,A),x.depthBuffer){let H=x.depthTexture,q=H&&H.isDepthTexture?H.type:null,lt=w(x.stencilBuffer,q),ct=x.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;qt(x)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Wt(x),lt,x.width,x.height):O?n.renderbufferStorageMultisample(n.RENDERBUFFER,Wt(x),lt,x.width,x.height):n.renderbufferStorage(n.RENDERBUFFER,lt,x.width,x.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,ct,n.RENDERBUFFER,A)}else{let H=x.textures;for(let q=0;q<H.length;q++){let lt=H[q],ct=r.convert(lt.format,lt.colorSpace),Y=r.convert(lt.type),K=y(lt.internalFormat,ct,Y,lt.normalized,lt.colorSpace);qt(x)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Wt(x),K,x.width,x.height):O?n.renderbufferStorageMultisample(n.RENDERBUFFER,Wt(x),K,x.width,x.height):n.renderbufferStorage(n.RENDERBUFFER,K,x.width,x.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function ve(A,x,O){let H=x.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(n.FRAMEBUFFER,A),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let q=i.get(x.depthTexture);if(q.__renderTarget=x,(!q.__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),H){if(q.__webglInit===void 0&&(q.__webglInit=!0,x.depthTexture.addEventListener("dispose",C)),q.__webglTexture===void 0){q.__webglTexture=n.createTexture(),e.bindTexture(n.TEXTURE_CUBE_MAP,q.__webglTexture),ne(n.TEXTURE_CUBE_MAP,x.depthTexture);let ut=r.convert(x.depthTexture.format),It=r.convert(x.depthTexture.type),mt;x.depthTexture.format===Ji?mt=n.DEPTH_COMPONENT24:x.depthTexture.format===Hn&&(mt=n.DEPTH24_STENCIL8);for(let dt=0;dt<6;dt++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+dt,0,mt,x.width,x.height,0,ut,It,null)}}else st(x.depthTexture,0);let lt=q.__webglTexture,ct=Wt(x),Y=H?n.TEXTURE_CUBE_MAP_POSITIVE_X+O:n.TEXTURE_2D,K=x.depthTexture.format===Hn?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(x.depthTexture.format===Ji)qt(x)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,K,Y,lt,0,ct):n.framebufferTexture2D(n.FRAMEBUFFER,K,Y,lt,0);else if(x.depthTexture.format===Hn)qt(x)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,K,Y,lt,0,ct):n.framebufferTexture2D(n.FRAMEBUFFER,K,Y,lt,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function tt(A){let x=i.get(A),O=A.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==A.depthTexture){let H=A.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),H){let q=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,H.removeEventListener("dispose",q)};H.addEventListener("dispose",q),x.__depthDisposeCallback=q}x.__boundDepthTexture=H}if(A.depthTexture&&!x.__autoAllocateDepthBuffer)if(O)for(let H=0;H<6;H++)ve(x.__webglFramebuffer[H],A,H);else{let H=A.texture.mipmaps;H&&H.length>0?ve(x.__webglFramebuffer[0],A,0):ve(x.__webglFramebuffer,A,0)}else if(O){x.__webglDepthbuffer=[];for(let H=0;H<6;H++)if(e.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer[H]),x.__webglDepthbuffer[H]===void 0)x.__webglDepthbuffer[H]=n.createRenderbuffer(),Gt(x.__webglDepthbuffer[H],A,!1);else{let q=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,lt=x.__webglDepthbuffer[H];n.bindRenderbuffer(n.RENDERBUFFER,lt),n.framebufferRenderbuffer(n.FRAMEBUFFER,q,n.RENDERBUFFER,lt)}}else{let H=A.texture.mipmaps;if(H&&H.length>0?e.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer[0]):e.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=n.createRenderbuffer(),Gt(x.__webglDepthbuffer,A,!1);else{let q=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,lt=x.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,lt),n.framebufferRenderbuffer(n.FRAMEBUFFER,q,n.RENDERBUFFER,lt)}}e.bindFramebuffer(n.FRAMEBUFFER,null)}function rt(A,x,O){let H=i.get(A);x!==void 0&&Mt(H.__webglFramebuffer,A,A.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),O!==void 0&&tt(A)}function at(A){let x=A.texture,O=i.get(A),H=i.get(x);A.addEventListener("dispose",_);let q=A.textures,lt=A.isWebGLCubeRenderTarget===!0,ct=q.length>1;if(ct||(H.__webglTexture===void 0&&(H.__webglTexture=n.createTexture()),H.__version=x.version,a.memory.textures++),lt){O.__webglFramebuffer=[];for(let Y=0;Y<6;Y++)if(x.mipmaps&&x.mipmaps.length>0){O.__webglFramebuffer[Y]=[];for(let K=0;K<x.mipmaps.length;K++)O.__webglFramebuffer[Y][K]=n.createFramebuffer()}else O.__webglFramebuffer[Y]=n.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){O.__webglFramebuffer=[];for(let Y=0;Y<x.mipmaps.length;Y++)O.__webglFramebuffer[Y]=n.createFramebuffer()}else O.__webglFramebuffer=n.createFramebuffer();if(ct)for(let Y=0,K=q.length;Y<K;Y++){let ut=i.get(q[Y]);ut.__webglTexture===void 0&&(ut.__webglTexture=n.createTexture(),a.memory.textures++)}if(A.samples>0&&qt(A)===!1){O.__webglMultisampledFramebuffer=n.createFramebuffer(),O.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,O.__webglMultisampledFramebuffer);for(let Y=0;Y<q.length;Y++){let K=q[Y];O.__webglColorRenderbuffer[Y]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,O.__webglColorRenderbuffer[Y]);let ut=r.convert(K.format,K.colorSpace),It=r.convert(K.type),mt=y(K.internalFormat,ut,It,K.normalized,K.colorSpace,A.isXRRenderTarget===!0),dt=Wt(A);n.renderbufferStorageMultisample(n.RENDERBUFFER,dt,mt,A.width,A.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Y,n.RENDERBUFFER,O.__webglColorRenderbuffer[Y])}n.bindRenderbuffer(n.RENDERBUFFER,null),A.depthBuffer&&(O.__webglDepthRenderbuffer=n.createRenderbuffer(),Gt(O.__webglDepthRenderbuffer,A,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(lt){e.bindTexture(n.TEXTURE_CUBE_MAP,H.__webglTexture),ne(n.TEXTURE_CUBE_MAP,x);for(let Y=0;Y<6;Y++)if(x.mipmaps&&x.mipmaps.length>0)for(let K=0;K<x.mipmaps.length;K++)Mt(O.__webglFramebuffer[Y][K],A,x,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,K);else Mt(O.__webglFramebuffer[Y],A,x,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0);p(x)&&b(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(ct){for(let Y=0,K=q.length;Y<K;Y++){let ut=q[Y],It=i.get(ut),mt=n.TEXTURE_2D;(A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(mt=A.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(mt,It.__webglTexture),ne(mt,ut),Mt(O.__webglFramebuffer,A,ut,n.COLOR_ATTACHMENT0+Y,mt,0),p(ut)&&b(mt)}e.unbindTexture()}else{let Y=n.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(Y=A.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(Y,H.__webglTexture),ne(Y,x),x.mipmaps&&x.mipmaps.length>0)for(let K=0;K<x.mipmaps.length;K++)Mt(O.__webglFramebuffer[K],A,x,n.COLOR_ATTACHMENT0,Y,K);else Mt(O.__webglFramebuffer,A,x,n.COLOR_ATTACHMENT0,Y,0);p(x)&&b(Y),e.unbindTexture()}A.depthBuffer&&tt(A)}function ot(A){let x=A.textures;for(let O=0,H=x.length;O<H;O++){let q=x[O];if(p(q)){let lt=E(A),ct=i.get(q).__webglTexture;e.bindTexture(lt,ct),b(lt),e.unbindTexture()}}}let ht=[],Bt=[];function Ut(A){if(A.samples>0){if(qt(A)===!1){let x=A.textures,O=A.width,H=A.height,q=n.COLOR_BUFFER_BIT,lt=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ct=i.get(A),Y=x.length>1;if(Y)for(let ut=0;ut<x.length;ut++)e.bindFramebuffer(n.FRAMEBUFFER,ct.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ut,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,ct.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ut,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,ct.__webglMultisampledFramebuffer);let K=A.texture.mipmaps;K&&K.length>0?e.bindFramebuffer(n.DRAW_FRAMEBUFFER,ct.__webglFramebuffer[0]):e.bindFramebuffer(n.DRAW_FRAMEBUFFER,ct.__webglFramebuffer);for(let ut=0;ut<x.length;ut++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(q|=n.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(q|=n.STENCIL_BUFFER_BIT)),Y){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,ct.__webglColorRenderbuffer[ut]);let It=i.get(x[ut]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,It,0)}n.blitFramebuffer(0,0,O,H,0,0,O,H,q,n.NEAREST),l===!0&&(ht.length=0,Bt.length=0,ht.push(n.COLOR_ATTACHMENT0+ut),A.depthBuffer&&A.storeMultisampledDepthBuffer===!1&&(ht.push(lt),Bt.push(lt),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,Bt)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,ht))}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),Y)for(let ut=0;ut<x.length;ut++){e.bindFramebuffer(n.FRAMEBUFFER,ct.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ut,n.RENDERBUFFER,ct.__webglColorRenderbuffer[ut]);let It=i.get(x[ut]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,ct.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ut,n.TEXTURE_2D,It,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,ct.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.storeMultisampledDepthBuffer===!1&&l){let x=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[x])}}}function Wt(A){return Math.min(s.maxSamples,A.samples)}function qt(A){let x=i.get(A);return A.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function I(A){let x=a.render.frame;h.get(A)!==x&&(h.set(A,x),A.update())}function pe(A,x){let O=A.colorSpace,H=A.format,q=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||O!==br&&O!==mn&&(ie.getTransfer(O)===ce?(H!==Pi||q!==ui)&&Ot("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Ht("WebGLTextures: Unsupported texture color space:",O)),x}function se(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(c.width=A.naturalWidth||A.width,c.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(c.width=A.displayWidth,c.height=A.displayHeight):(c.width=A.width,c.height=A.height),c}this.allocateTextureUnit=$,this.resetTextureUnits=V,this.getTextureUnits=N,this.setTextureUnits=B,this.setTexture2D=st,this.setTexture2DArray=X,this.setTexture3D=j,this.setTextureCube=et,this.rebindTextures=rt,this.setupRenderTarget=at,this.updateRenderTargetMipmap=ot,this.updateMultisampleRenderTarget=Ut,this.setupDepthRenderbuffer=tt,this.setupFrameBufferTexture=Mt,this.useMultisampledRTT=qt,this.isReversedDepthBuffer=function(){return e.buffers.depth.getReversed()}}function E_(n,t){function e(i,s=mn){let r,a=ie.getTransfer(s);if(i===ui)return n.UNSIGNED_BYTE;if(i===Jo)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Ko)return n.UNSIGNED_SHORT_5_5_5_1;if(i===nh)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===sh)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===eh)return n.BYTE;if(i===ih)return n.SHORT;if(i===Js)return n.UNSIGNED_SHORT;if(i===Zo)return n.INT;if(i===Vi)return n.UNSIGNED_INT;if(i===Ri)return n.FLOAT;if(i===Ke)return n.HALF_FLOAT;if(i===rh)return n.ALPHA;if(i===ah)return n.RGB;if(i===Pi)return n.RGBA;if(i===Ji)return n.DEPTH_COMPONENT;if(i===Hn)return n.DEPTH_STENCIL;if(i===jo)return n.RED;if(i===Qo)return n.RED_INTEGER;if(i===Vn)return n.RG;if(i===tl)return n.RG_INTEGER;if(i===el)return n.RGBA_INTEGER;if(i===la||i===ca||i===ha||i===ua)if(a===ce)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===la)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===ca)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===ha)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===ua)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===la)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===ca)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===ha)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===ua)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===il||i===nl||i===sl||i===rl)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===il)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===nl)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===sl)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===rl)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===al||i===ol||i===ll||i===cl||i===hl||i===da||i===ul)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(i===al||i===ol)return a===ce?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===ll)return a===ce?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===cl)return r.COMPRESSED_R11_EAC;if(i===hl)return r.COMPRESSED_SIGNED_R11_EAC;if(i===da)return r.COMPRESSED_RG11_EAC;if(i===ul)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===dl||i===fl||i===pl||i===ml||i===gl||i===xl||i===_l||i===vl||i===yl||i===Ml||i===bl||i===Sl||i===wl||i===El)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(i===dl)return a===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===fl)return a===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===pl)return a===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===ml)return a===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===gl)return a===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===xl)return a===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===_l)return a===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===vl)return a===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===yl)return a===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Ml)return a===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===bl)return a===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Sl)return a===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===wl)return a===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===El)return a===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Tl||i===Al||i===Cl)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(i===Tl)return a===ce?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Al)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Cl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Rl||i===Pl||i===fa||i===Il)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(i===Rl)return r.COMPRESSED_RED_RGTC1_EXT;if(i===Pl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===fa)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Il)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Ks?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:e}}var T_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,A_=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Lh=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){let i=new Lr(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,i=new Ae({vertexShader:T_,fragmentShader:A_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Qt(new xi(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Dh=class extends Ki{constructor(t,e){super();let i=this,s=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,f=null,u=null,d=null,g=null,v=typeof XRWebGLBinding<"u",m=new Lh,p={},b=e.getContextAttributes(),E=null,y=null,w=[],S=[],C=new it,_=null,T=null,P=new Oe;P.viewport=new Ce;let D=new Oe;D.viewport=new Ce;let F=[P,D],V=new Go,N=null,B=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Z){let Q=w[Z];return Q===void 0&&(Q=new ks,w[Z]=Q),Q.getTargetRaySpace()},this.getControllerGrip=function(Z){let Q=w[Z];return Q===void 0&&(Q=new ks,w[Z]=Q),Q.getGripSpace()},this.getHand=function(Z){let Q=w[Z];return Q===void 0&&(Q=new ks,w[Z]=Q),Q.getHandSpace()};function $(Z){let Q=S.indexOf(Z.inputSource);if(Q===-1)return;let xt=w[Q];xt!==void 0&&(xt.update(Z.inputSource,Z.frame,c||a),xt.dispatchEvent({type:Z.type,data:Z.inputSource}))}function W(){s.removeEventListener("select",$),s.removeEventListener("selectstart",$),s.removeEventListener("selectend",$),s.removeEventListener("squeeze",$),s.removeEventListener("squeezestart",$),s.removeEventListener("squeezeend",$),s.removeEventListener("end",W),s.removeEventListener("inputsourceschange",st);for(let Z=0;Z<w.length;Z++){let Q=S[Z];Q!==null&&(S[Z]=null,w[Z].disconnect(Q))}N=null,B=null,m.reset();for(let Z in p)delete p[Z];if(t.setRenderTarget(E),d=null,u=null,f=null,s=null,y=null,ae.stop(),i.isPresenting=!1,t.setPixelRatio(_),t.setSize(C.width,C.height,!1),T!==null){let Z=T.camera;Z.fov=T.fov,Z.zoom=T.zoom,Z.updateProjectionMatrix(),T=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Z){r=Z,i.isPresenting===!0&&Ot("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Z){o=Z,i.isPresenting===!0&&Ot("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(Z){c=Z},this.getBaseLayer=function(){return u!==null?u:d},this.getBinding=function(){return f===null&&v&&(f=new XRWebGLBinding(s,e)),f},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(Z){if(s=Z,s!==null){if(E=t.getRenderTarget(),s.addEventListener("select",$),s.addEventListener("selectstart",$),s.addEventListener("selectend",$),s.addEventListener("squeeze",$),s.addEventListener("squeezestart",$),s.addEventListener("squeezeend",$),s.addEventListener("end",W),s.addEventListener("inputsourceschange",st),b.xrCompatible!==!0&&await e.makeXRCompatible(),_=t.getPixelRatio(),t.getSize(C),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let xt=null,Vt=null,Mt=null;b.depth&&(Mt=b.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,xt=b.stencil?Hn:Ji,Vt=b.stencil?Ks:Vi);let Gt={colorFormat:e.RGBA8,depthFormat:Mt,scaleFactor:r};f=this.getBinding(),u=f.createProjectionLayer(Gt),s.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),y=new Be(u.textureWidth,u.textureHeight,{format:Pi,type:ui,depthTexture:new Pn(u.textureWidth,u.textureHeight,Vt,void 0,void 0,void 0,void 0,void 0,void 0,xt),stencilBuffer:b.stencil,colorSpace:t.outputColorSpace,samples:b.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}else{let xt={antialias:b.antialias,alpha:!0,depth:b.depth,stencil:b.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,e,xt),s.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),y=new Be(d.framebufferWidth,d.framebufferHeight,{format:Pi,type:ui,colorSpace:t.outputColorSpace,stencilBuffer:b.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),ae.setContext(s),ae.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function st(Z){for(let Q=0;Q<Z.removed.length;Q++){let xt=Z.removed[Q],Vt=S.indexOf(xt);Vt>=0&&(S[Vt]=null,w[Vt].disconnect(xt))}for(let Q=0;Q<Z.added.length;Q++){let xt=Z.added[Q],Vt=S.indexOf(xt);if(Vt===-1){for(let Gt=0;Gt<w.length;Gt++)if(Gt>=S.length){S.push(xt),Vt=Gt;break}else if(S[Gt]===null){S[Gt]=xt,Vt=Gt;break}if(Vt===-1)break}let Mt=w[Vt];Mt&&Mt.connect(xt)}}let X=new R,j=new R;function et(Z,Q,xt){X.setFromMatrixPosition(Q.matrixWorld),j.setFromMatrixPosition(xt.matrixWorld);let Vt=X.distanceTo(j),Mt=Q.projectionMatrix.elements,Gt=xt.projectionMatrix.elements,ve=Mt[14]/(Mt[10]-1),tt=Mt[14]/(Mt[10]+1),rt=(Mt[9]+1)/Mt[5],at=(Mt[9]-1)/Mt[5],ot=(Mt[8]-1)/Mt[0],ht=(Gt[8]+1)/Gt[0],Bt=ve*ot,Ut=ve*ht,Wt=Vt/(-ot+ht),qt=Wt*-ot;if(Q.matrixWorld.decompose(Z.position,Z.quaternion,Z.scale),Z.translateX(qt),Z.translateZ(Wt),Z.matrixWorld.compose(Z.position,Z.quaternion,Z.scale),Z.matrixWorldInverse.copy(Z.matrixWorld).invert(),Mt[10]===-1)Z.projectionMatrix.copy(Q.projectionMatrix),Z.projectionMatrixInverse.copy(Q.projectionMatrixInverse);else{let I=ve+Wt,pe=tt+Wt,se=Bt-qt,A=Ut+(Vt-qt),x=rt*tt/pe*I,O=at*tt/pe*I;Z.projectionMatrix.makePerspective(se,A,x,O,I,pe),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert()}}function Pt(Z,Q){Q===null?Z.matrixWorld.copy(Z.matrix):Z.matrixWorld.multiplyMatrices(Q.matrixWorld,Z.matrix),Z.matrixWorldInverse.copy(Z.matrixWorld).invert()}this.updateCamera=function(Z){if(s===null)return;let Q=Z.near,xt=Z.far;m.texture!==null&&(m.depthNear>0&&(Q=m.depthNear),m.depthFar>0&&(xt=m.depthFar)),V.near=D.near=P.near=Q,V.far=D.far=P.far=xt,(N!==V.near||B!==V.far)&&(s.updateRenderState({depthNear:V.near,depthFar:V.far}),N=V.near,B=V.far),V.layers.mask=Z.layers.mask|6,P.layers.mask=V.layers.mask&-5,D.layers.mask=V.layers.mask&-3;let Vt=Z.parent,Mt=V.cameras;Pt(V,Vt);for(let Gt=0;Gt<Mt.length;Gt++)Pt(Mt[Gt],Vt);Mt.length===2?et(V,P,D):V.projectionMatrix.copy(P.projectionMatrix),T===null&&Z.isPerspectiveCamera&&(T={camera:Z,fov:Z.fov,zoom:Z.zoom}),wt(Z,V,Vt)};function wt(Z,Q,xt){xt===null?Z.matrix.copy(Q.matrixWorld):(Z.matrix.copy(xt.matrixWorld),Z.matrix.invert(),Z.matrix.multiply(Q.matrixWorld)),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.updateMatrixWorld(!0),Z.projectionMatrix.copy(Q.projectionMatrix),Z.projectionMatrixInverse.copy(Q.projectionMatrixInverse),Z.isPerspectiveCamera&&(Z.fov=go*2*Math.atan(1/Z.projectionMatrix.elements[5]),Z.zoom=1)}this.getCamera=function(){return V},this.getFoveation=function(){if(!(u===null&&d===null))return l},this.setFoveation=function(Z){l=Z,u!==null&&(u.fixedFoveation=Z),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=Z)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(V)},this.getCameraTexture=function(Z){return p[Z]};let ue=null;function ne(Z,Q){if(h=Q.getViewerPose(c||a),g=Q,h!==null){let xt=h.views;d!==null&&(t.setRenderTargetFramebuffer(y,d.framebuffer),t.setRenderTarget(y));let Vt=!1;xt.length!==V.cameras.length&&(V.cameras.length=0,Vt=!0);for(let tt=0;tt<xt.length;tt++){let rt=xt[tt],at=null;if(d!==null)at=d.getViewport(rt);else{let ht=f.getViewSubImage(u,rt);at=ht.viewport,tt===0&&(t.setRenderTargetTextures(y,ht.colorTexture,ht.depthStencilTexture),t.setRenderTarget(y))}let ot=F[tt];ot===void 0&&(ot=new Oe,ot.layers.enable(tt),ot.viewport=new Ce,F[tt]=ot),ot.matrix.fromArray(rt.transform.matrix),ot.matrix.decompose(ot.position,ot.quaternion,ot.scale),ot.projectionMatrix.fromArray(rt.projectionMatrix),ot.projectionMatrixInverse.copy(ot.projectionMatrix).invert(),ot.viewport.set(at.x,at.y,at.width,at.height),tt===0&&(V.matrix.copy(ot.matrix),V.matrix.decompose(V.position,V.quaternion,V.scale)),Vt===!0&&V.cameras.push(ot)}let Mt=s.enabledFeatures;if(Mt&&Mt.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&v){f=i.getBinding();let tt=f.getDepthInformation(xt[0]);tt&&tt.isValid&&tt.texture&&m.init(tt,s.renderState)}if(Mt&&Mt.includes("camera-access")&&v){t.state.unbindTexture(),f=i.getBinding();for(let tt=0;tt<xt.length;tt++){let rt=xt[tt].camera;if(rt){let at=p[rt];at||(at=new Lr,p[rt]=at);let ot=f.getCameraImage(rt);at.sourceTexture=ot}}}}for(let xt=0;xt<w.length;xt++){let Vt=S[xt],Mt=w[xt];Vt!==null&&Mt!==void 0&&Mt.update(Vt,Q,c||a)}ue&&ue(Z,Q),Q.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:Q}),g=null}let ae=new Gd;ae.setAnimationLoop(ne),this.setAnimationLoop=function(Z){ue=Z},this.dispose=function(){}}},C_=new he,Zd=new Xt;Zd.set(-1,0,0,0,1,0,0,0,1);function R_(n,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function i(m,p){p.color.getRGB(m.fogColor.value,hh(n)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,b,E,y){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?r(m,p):p.isMeshLambertMaterial?(r(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(r(m,p),f(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(r(m,p),u(m,p),p.isMeshPhysicalMaterial&&d(m,p,y)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),v(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?l(m,p,b,E):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Je&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Je&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);let b=t.get(p),E=b.envMap,y=b.envMapRotation;E&&(m.envMap.value=E,m.envMapRotation.value.setFromMatrix4(C_.makeRotationFromEuler(y)).transpose(),E.isCubeTexture&&E.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(Zd),m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,b,E){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*b,m.scale.value=E*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function f(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function u(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function d(m,p,b){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Je&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.retroreflectivity>0&&(m.retroreflectivity.value=p.retroreflectivity),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=b.texture,m.transmissionSamplerSize.value.set(b.width,b.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function v(m,p){let b=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(b.matrixWorld),m.nearDistance.value=b.shadow.camera.near,m.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function P_(n,t,e,i){let s={},r={},a=[],o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(y,w){let S=w.program;i.uniformBlockBinding(y,S)}function c(y,w){let S=s[y.id];S===void 0&&(m(y),S=h(y),s[y.id]=S,y.addEventListener("dispose",b));let C=w.program;i.updateUBOMapping(y,C);let _=t.render.frame;r[y.id]!==_&&(u(y),r[y.id]=_)}function h(y){let w=f();y.__bindingPointIndex=w;let S=n.createBuffer(),C=y.__size,_=y.usage;return n.bindBuffer(n.UNIFORM_BUFFER,S),n.bufferData(n.UNIFORM_BUFFER,C,_),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,w,S),S}function f(){for(let y=0;y<o;y++)if(a.indexOf(y)===-1)return a.push(y),y;return Ht("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(y){let w=s[y.id],S=y.uniforms,C=y.__cache;n.bindBuffer(n.UNIFORM_BUFFER,w);for(let _=0,T=S.length;_<T;_++){let P=S[_];if(Array.isArray(P))for(let D=0,F=P.length;D<F;D++)d(P[D],_,D,C);else d(P,_,0,C)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function d(y,w,S,C){if(v(y,w,S,C)===!0){let _=y.__offset,T=y.value;if(Array.isArray(T)){let P=0;for(let D=0;D<T.length;D++){let F=T[D],V=p(F);g(F,y.__data,P),typeof F!="number"&&typeof F!="boolean"&&!F.isMatrix3&&!ArrayBuffer.isView(F)&&(P+=V.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(T,y.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,_,y.__data)}}function g(y,w,S){typeof y=="number"||typeof y=="boolean"?w[0]=y:y.isMatrix3?(w[0]=y.elements[0],w[1]=y.elements[1],w[2]=y.elements[2],w[3]=0,w[4]=y.elements[3],w[5]=y.elements[4],w[6]=y.elements[5],w[7]=0,w[8]=y.elements[6],w[9]=y.elements[7],w[10]=y.elements[8],w[11]=0):ArrayBuffer.isView(y)?w.set(new y.constructor(y.buffer,y.byteOffset,w.length)):y.toArray(w,S)}function v(y,w,S,C){let _=y.value,T=w+"_"+S;if(C[T]===void 0)return typeof _=="number"||typeof _=="boolean"?C[T]=_:ArrayBuffer.isView(_)?C[T]=_.slice():C[T]=_.clone(),!0;{let P=C[T];if(typeof _=="number"||typeof _=="boolean"){if(P!==_)return C[T]=_,!0}else{if(ArrayBuffer.isView(_))return!0;if(P.equals(_)===!1)return P.copy(_),!0}}return!1}function m(y){let w=y.uniforms,S=0,C=16;for(let T=0,P=w.length;T<P;T++){let D=Array.isArray(w[T])?w[T]:[w[T]];for(let F=0,V=D.length;F<V;F++){let N=D[F],B=Array.isArray(N.value)?N.value:[N.value];for(let $=0,W=B.length;$<W;$++){let st=B[$],X=p(st),j=S%C,et=j%X.boundary,Pt=j+et;S+=et,Pt!==0&&C-Pt<X.storage&&(S+=C-Pt),N.__data=new Float32Array(X.storage/Float32Array.BYTES_PER_ELEMENT),N.__offset=S,S+=X.storage}}}let _=S%C;return _>0&&(S+=C-_),y.__size=S,y.__cache={},this}function p(y){let w={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(w.boundary=4,w.storage=4):y.isVector2?(w.boundary=8,w.storage=8):y.isVector3||y.isColor?(w.boundary=16,w.storage=12):y.isVector4?(w.boundary=16,w.storage=16):y.isMatrix3?(w.boundary=48,w.storage=48):y.isMatrix4?(w.boundary=64,w.storage=64):y.isTexture?Ot("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(y)?(w.boundary=16,w.storage=y.byteLength):Ot("WebGLRenderer: Unsupported uniform value type.",y),w}function b(y){let w=y.target;w.removeEventListener("dispose",b);let S=a.indexOf(w.__bindingPointIndex);a.splice(S,1),n.deleteBuffer(s[w.id]),delete s[w.id],delete r[w.id]}function E(){for(let y in s)n.deleteBuffer(s[y]);a=[],s={},r={}}return{bind:l,update:c,dispose:E}}var I_=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),nn=null;function L_(){return nn===null&&(nn=new Rr(I_,16,16,Vn,Ke),nn.name="DFG_LUT",nn.minFilter=Ze,nn.magFilter=Ze,nn.wrapS=Zi,nn.wrapT=Zi,nn.generateMipmaps=!1,nn.needsUpdate=!0),nn}var hs=class{constructor(t={}){let{canvas:e=ud(),context:i=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:u=!1,outputBufferType:d=ui}=t;this.isWebGLRenderer=!0;let g;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=i.getContextAttributes().alpha}else g=a;let v=d,m=new Set([el,tl,Qo]),p=new Set([ui,Vi,Js,Ks,Jo,Ko]),b=new Uint32Array(4),E=new Int32Array(4),y=new R,w=null,S=null,C=[],_=[],T=null;this.domElement=e,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Hi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let P=this,D=!1,F=null,V=null,N=null,B=null;this._outputColorSpace=qe;let $=0,W=0,st=null,X=-1,j=null,et=new Ce,Pt=new Ce,wt=null,ue=new Ft(0),ne=0,ae=e.width,Z=e.height,Q=1,xt=null,Vt=null,Mt=new Ce(0,0,ae,Z),Gt=new Ce(0,0,ae,Z),ve=!1,tt=new Hs,rt=!1,at=!1,ot=new he,ht=new R,Bt=new Ce,Ut={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Wt=!1;function qt(){return st===null?Q:1}let I=i;function pe(M,L){return e.getContext(M,L)}let se,A,x,O,H,q,lt,ct,Y,K,ut,It,mt,dt,Lt,kt,Zt,U,ft,J,pt,yt,nt;try{let M={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:f};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${"186"}`),e.addEventListener("webglcontextlost",be,!1),e.addEventListener("webglcontextrestored",me,!1),e.addEventListener("webglcontextcreationerror",Ni,!1),I===null){let L="webgl2";if(I=pe(L,M),I===null)throw pe(L)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Dt()}catch(M){throw e.removeEventListener("webglcontextlost",be,!1),e.removeEventListener("webglcontextrestored",me,!1),e.removeEventListener("webglcontextcreationerror",Ni,!1),Ht("WebGLRenderer: "+M.message),M}function Dt(){se=new k0(I),se.init(),pt=new E_(I,se),A=new R0(I,se,t,pt),x=new S_(I,se),A.reversedDepthBuffer&&u&&x.buffers.depth.setReversed(!0),V=I.createFramebuffer(),N=I.createFramebuffer(),B=I.createFramebuffer(),O=new V0(I),H=new c_,q=new w_(I,se,x,H,A,pt,O),lt=new B0(P),ct=new Wp(I),yt=new A0(I,ct),Y=new z0(I,ct,O,yt),K=new W0(I,Y,ct,yt,O),U=new G0(I,A,q),Lt=new P0(H),ut=new l_(P,lt,se,A,yt,Lt),It=new R_(P,H),mt=new u_,dt=new x_(se),Zt=new T0(P,lt,x,K,g,l),kt=new b_(P,K,A),nt=new P_(I,O,A,x),ft=new C0(I,se,O),J=new H0(I,se,O),O.programs=ut.programs,P.capabilities=A,P.extensions=se,P.properties=H,P.renderLists=mt,P.shadowMap=kt,P.state=x,P.info=O}v!==ui&&(T=new X0(v,e.width,e.height,o,s,r));let Ct=new Dh(P,I);this.xr=Ct,this.getContext=function(){return I},this.getContextAttributes=function(){return I.getContextAttributes()},this.forceContextLoss=function(){let M=se.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){let M=se.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return Q},this.setPixelRatio=function(M){M!==void 0&&(Q=M,this.setSize(ae,Z,!1))},this.getSize=function(M){return M.set(ae,Z)},this.setSize=function(M,L,G=!0){if(Ct.isPresenting){Ot("WebGLRenderer: Can't change size while VR device is presenting.");return}ae=M,Z=L,e.width=Math.floor(M*Q),e.height=Math.floor(L*Q),G===!0&&(e.style.width=M+"px",e.style.height=L+"px"),T!==null&&T.setSize(e.width,e.height),this.setViewport(0,0,M,L)},this.getDrawingBufferSize=function(M){return M.set(ae*Q,Z*Q).floor()},this.setDrawingBufferSize=function(M,L,G){ae=M,Z=L,Q=G,e.width=Math.floor(M*G),e.height=Math.floor(L*G),this.setViewport(0,0,M,L)},this.setEffects=function(M){if(v===ui){Ht("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(M){for(let L=0;L<M.length;L++)if(M[L].isOutputPass===!0){Ot("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}T.setEffects(M||[])},this.getCurrentViewport=function(M){return M.copy(et)},this.getViewport=function(M){return M.copy(Mt)},this.setViewport=function(M,L,G,k){M.isVector4?Mt.set(M.x,M.y,M.z,M.w):Mt.set(M,L,G,k),x.viewport(et.copy(Mt).multiplyScalar(Q).round())},this.getScissor=function(M){return M.copy(Gt)},this.setScissor=function(M,L,G,k){M.isVector4?Gt.set(M.x,M.y,M.z,M.w):Gt.set(M,L,G,k),x.scissor(Pt.copy(Gt).multiplyScalar(Q).round())},this.getScissorTest=function(){return ve},this.setScissorTest=function(M){x.setScissorTest(ve=M)},this.setOpaqueSort=function(M){xt=M},this.setTransparentSort=function(M){Vt=M},this.getClearColor=function(M){return M.copy(Zt.getClearColor())},this.setClearColor=function(){Zt.setClearColor(...arguments)},this.getClearAlpha=function(){return Zt.getClearAlpha()},this.setClearAlpha=function(){Zt.setClearAlpha(...arguments)},this.clear=function(M=!0,L=!0,G=!0){let k=0;if(M){let z=!1;if(st!==null){let vt=st.texture.format;z=m.has(vt)}if(z){let vt=st.texture.type,St=p.has(vt),_t=Zt.getClearColor(),Tt=Zt.getClearAlpha(),Rt=_t.r,jt=_t.g,re=_t.b;St?(b[0]=Rt,b[1]=jt,b[2]=re,b[3]=Tt,I.clearBufferuiv(I.COLOR,0,b)):(E[0]=Rt,E[1]=jt,E[2]=re,E[3]=Tt,I.clearBufferiv(I.COLOR,0,E))}else k|=I.COLOR_BUFFER_BIT}L&&(k|=I.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),G&&(k|=I.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),k!==0&&I.clear(k)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(M){M.setRenderer(this),F=M},this.dispose=function(){e.removeEventListener("webglcontextlost",be,!1),e.removeEventListener("webglcontextrestored",me,!1),e.removeEventListener("webglcontextcreationerror",Ni,!1),Zt.dispose(),mt.dispose(),dt.dispose(),H.dispose(),lt.dispose(),K.dispose(),yt.dispose(),nt.dispose(),ut.dispose(),Ct.dispose(),Ct.removeEventListener("sessionstart",Hh),Ct.removeEventListener("sessionend",Vh),Xn.stop()};function be(M){M.preventDefault(),lh("WebGLRenderer: Context Lost."),D=!0}function me(){lh("WebGLRenderer: Context Restored."),D=!1;let M=O.autoReset,L=kt.enabled,G=kt.autoUpdate,k=kt.needsUpdate,z=kt.type;Dt(),O.autoReset=M,kt.enabled=L,kt.autoUpdate=G,kt.needsUpdate=k,kt.type=z}function Ni(M){Ht("WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function Xi(M){let L=M.target;L.removeEventListener("dispose",Xi),Af(L)}function Af(M){Cf(M),H.remove(M)}function Cf(M){let L=H.get(M).programs;L!==void 0&&(L.forEach(function(G){ut.releaseProgram(G)}),M.isShaderMaterial&&ut.releaseShaderCache(M))}this.renderBufferDirect=function(M,L,G,k,z,vt){L===null&&(L=Ut);let St=z.isMesh&&z.matrixWorld.determinantAffine()<0,_t=If(M,L,G,k,z);x.setMaterial(k,St);let Tt=G.index,Rt=1;if(k.wireframe===!0){if(Tt=Y.getWireframeAttribute(G),Tt===void 0)return;Rt=2}let jt=G.drawRange,re=G.attributes.position,At=jt.start*Rt,ge=(jt.start+jt.count)*Rt;vt!==null&&(At=Math.max(At,vt.start*Rt),ge=Math.min(ge,(vt.start+vt.count)*Rt)),Tt!==null?(At=Math.max(At,0),ge=Math.min(ge,Tt.count)):re!=null&&(At=Math.max(At,0),ge=Math.min(ge,re.count));let Ue=ge-At;if(Ue<0||Ue===1/0)return;yt.setup(z,k,_t,G,Tt);let we,Me=ft;if(Tt!==null&&(we=ct.get(Tt),Me=J,Me.setIndex(we)),z.isMesh)k.wireframe===!0?(x.setLineWidth(k.wireframeLinewidth*qt()),Me.setMode(I.LINES)):Me.setMode(I.TRIANGLES);else if(z.isLine){let ti=k.linewidth;ti===void 0&&(ti=1),x.setLineWidth(ti*qt()),z.isLineSegments?Me.setMode(I.LINES):z.isLineLoop?Me.setMode(I.LINE_LOOP):Me.setMode(I.LINE_STRIP)}else z.isPoints?Me.setMode(I.POINTS):z.isSprite&&Me.setMode(I.TRIANGLES);if(z.isBatchedMesh)if(se.get("WEBGL_multi_draw"))Me.renderMultiDraw(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount);else{let ti=z._multiDrawStarts,bt=z._multiDrawCounts,ri=z._multiDrawCount,oe=Tt?ct.get(Tt).bytesPerElement:1,wi=H.get(k).currentProgram.getUniforms();for(let qi=0;qi<ri;qi++)wi.setValue(I,"_gl_DrawID",qi),Me.render(ti[qi]/oe,bt[qi])}else if(z.isInstancedMesh)Me.renderInstances(At,Ue,z.count);else if(G.isInstancedBufferGeometry){let ti=G._maxInstanceCount!==void 0?G._maxInstanceCount:1/0,bt=Math.min(G.instanceCount,ti);Me.renderInstances(At,Ue,bt)}else Me.render(At,Ue)};function zh(M,L,G,k){F!==null&&M.isNodeMaterial&&F.setObject(k,M),rt===!0&&Lt.setState(M,G,!1),M.transparent===!0&&M.side===We&&M.forceSinglePass===!1?(M.side=Je,M.needsUpdate=!0,Ra(M,L,k),M.side=On,M.needsUpdate=!0,Ra(M,L,k),M.side=We):Ra(M,L,k)}this.compile=function(M,L,G=null){G===null&&(G=M),F!==null&&F.renderStart(M,L,G),S=dt.get(G),S.init(L),_.push(S),G.traverseVisible(function(z){z.isLight&&z.layers.test(L.layers)&&(S.pushLight(z),z.castShadow&&S.pushShadow(z))}),M!==G&&M.traverseVisible(function(z){z.isLight&&z.layers.test(L.layers)&&(S.pushLight(z),z.castShadow&&S.pushShadow(z))}),S.setupLights(),F!==null&&F.updateLights(S.state.lightsArray),at=this.localClippingEnabled,rt=Lt.init(this.clippingPlanes,at),rt===!0&&Lt.setGlobalState(this.clippingPlanes,L),F!==null&&kt.render(S.state.shadowsArray,G,L);let k=new Set;return M.traverse(function(z){if(!(z.isMesh||z.isPoints||z.isLine||z.isSprite))return;let vt=z.material;if(vt)if(Array.isArray(vt))for(let St=0;St<vt.length;St++){let _t=vt[St];zh(_t,G,L,z),k.add(_t)}else zh(vt,G,L,z),k.add(vt)}),S=_.pop(),F!==null&&F.renderEnd(),k},this.compileAsync=function(M,L,G=null){let k=this.compile(M,L,G);return new Promise(z=>{function vt(){if(k.forEach(function(St){let Tt=H.get(St).currentProgram;(Tt===void 0||Tt.isReady())&&k.delete(St)}),k.size===0){z(M);return}setTimeout(vt,10)}se.get("KHR_parallel_shader_compile")!==null?vt():setTimeout(vt,10)})};let lc=null;function Rf(M){lc&&lc(M)}function Hh(){Xn.stop()}function Vh(){Xn.start()}let Xn=new Gd;Xn.setAnimationLoop(Rf),typeof self<"u"&&Xn.setContext(self),this.setAnimationLoop=function(M){lc=M,Ct.setAnimationLoop(M),M===null?Xn.stop():Xn.start()},Ct.addEventListener("sessionstart",Hh),Ct.addEventListener("sessionend",Vh),this.render=function(M,L){if(L!==void 0&&L.isCamera!==!0){Ht("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(D===!0)return;F!==null&&F.renderStart(M,L);let G=Ct.enabled===!0&&Ct.isPresenting===!0,k=T!==null&&(st===null||G)&&T.begin(P,st);if(M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),L.parent===null&&L.matrixWorldAutoUpdate===!0&&L.updateMatrixWorld(),Ct.enabled===!0&&Ct.isPresenting===!0&&(T===null||T.isCompositing()===!1)&&(Ct.cameraAutoUpdate===!0&&Ct.updateCamera(L),L=Ct.getCamera()),M.isScene===!0&&M.onBeforeRender(P,M,L,st),S=dt.get(M,_.length),S.init(L),S.state.textureUnits=q.getTextureUnits(),_.push(S),ot.multiplyMatrices(L.projectionMatrix,L.matrixWorldInverse),tt.setFromProjectionMatrix(ot,ki,L.reversedDepth),at=this.localClippingEnabled,rt=Lt.init(this.clippingPlanes,at),w=mt.get(M,C.length),w.init(),C.push(w),Ct.enabled===!0&&Ct.isPresenting===!0){let St=P.xr.getDepthSensingMesh();St!==null&&cc(St,L,-1/0,P.sortObjects)}cc(M,L,0,P.sortObjects),w.finish(),F!==null&&F.updateLights(S.state.lightsArray),P.sortObjects===!0&&w.sort(xt,Vt),Wt=Ct.enabled===!1||Ct.isPresenting===!1||Ct.hasDepthSensing()===!1,Wt&&Zt.addToRenderList(w,M),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),rt===!0&&Lt.beginShadows();let z=S.state.shadowsArray;if(kt.render(z,M,L),rt===!0&&Lt.endShadows(),(k&&T.hasRenderPass())===!1){let St=w.opaque,_t=w.transmissive;if(S.setupLights(),L.isArrayCamera){let Tt=L.cameras;if(_t.length>0)for(let Rt=0,jt=Tt.length;Rt<jt;Rt++){let re=Tt[Rt];Wh(St,_t,M,re)}Wt&&Zt.render(M);for(let Rt=0,jt=Tt.length;Rt<jt;Rt++){let re=Tt[Rt];Gh(w,M,re,re.viewport)}}else _t.length>0&&Wh(St,_t,M,L),Wt&&Zt.render(M),Gh(w,M,L)}st!==null&&W===0&&(q.updateMultisampleRenderTarget(st),q.updateRenderTargetMipmap(st)),k&&T.end(P),M.isScene===!0&&M.onAfterRender(P,M,L),yt.resetDefaultState(),X=-1,j=null,_.pop(),_.length>0?(S=_[_.length-1],q.setTextureUnits(S.state.textureUnits),rt===!0&&Lt.setGlobalState(P.clippingPlanes,S.state.camera)):S=null,C.pop(),C.length>0?w=C[C.length-1]:w=null,F!==null&&F.renderEnd()};function cc(M,L,G,k){if(M.visible===!1)return;if(M.layers.test(L.layers)){if(M.isGroup)G=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(L);else if(M.isLightProbeGrid)S.pushLightProbeGrid(M);else if(M.isLight)S.pushLight(M),M.castShadow&&S.pushShadow(M);else if(M.isSprite){if(!M.frustumCulled||M.intersectsFrustum(tt)){k&&Bt.setFromMatrixPosition(M.matrixWorld).applyMatrix4(ot);let St=K.update(M),_t=M.material;_t.visible&&w.push(M,St,_t,G,Bt.z,null,L)}}else if((M.isMesh||M.isLine||M.isPoints)&&(!M.frustumCulled||M.intersectsFrustum(tt))){let St=K.update(M),_t=M.material;if(k&&(M.boundingSphere!==void 0?(M.boundingSphere===null&&M.computeBoundingSphere(),Bt.copy(M.boundingSphere.center)):(St.boundingSphere===null&&St.computeBoundingSphere(),Bt.copy(St.boundingSphere.center)),Bt.applyMatrix4(M.matrixWorld).applyMatrix4(ot)),Array.isArray(_t)){let Tt=St.groups;for(let Rt=0,jt=Tt.length;Rt<jt;Rt++){let re=Tt[Rt],At=_t[re.materialIndex];At&&At.visible&&w.push(M,St,At,G,Bt.z,re,L)}}else _t.visible&&w.push(M,St,_t,G,Bt.z,null,L)}}let vt=M.children;for(let St=0,_t=vt.length;St<_t;St++)cc(vt[St],L,G,k)}function Gh(M,L,G,k){let{opaque:z,transmissive:vt,transparent:St}=M;S.setupLightsView(G),rt===!0&&Lt.setGlobalState(P.clippingPlanes,G),k&&x.viewport(et.copy(k)),z.length>0&&Ca(z,L,G),vt.length>0&&Ca(vt,L,G),St.length>0&&Ca(St,L,G),x.buffers.depth.setTest(!0),x.buffers.depth.setMask(!0),x.buffers.color.setMask(!0),x.setPolygonOffset(!1)}function Wh(M,L,G,k){if((G.isScene===!0?G.overrideMaterial:null)!==null)return;if(S.state.transmissionRenderTarget[k.id]===void 0){let At=se.has("EXT_color_buffer_half_float")||se.has("EXT_color_buffer_float");S.state.transmissionRenderTarget[k.id]=new Be(1,1,{generateMipmaps:!0,type:At?Ke:ui,minFilter:zn,samples:Math.max(4,A.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:ie.workingColorSpace})}let vt=S.state.transmissionRenderTarget[k.id],St=k.viewport||et;vt.setSize(St.z*P.transmissionResolutionScale,St.w*P.transmissionResolutionScale);let _t=P.getRenderTarget(),Tt=P.getActiveCubeFace(),Rt=P.getActiveMipmapLevel();P.setRenderTarget(vt),P.getClearColor(ue),ne=P.getClearAlpha(),ne<1&&P.setClearColor(16777215,.5),P.clear(),Wt&&Zt.render(G);let jt=P.toneMapping;P.toneMapping=Hi;let re=k.viewport;if(k.viewport!==void 0&&(k.viewport=void 0),S.setupLightsView(k),rt===!0&&Lt.setGlobalState(P.clippingPlanes,k),Ca(M,G,k),q.updateMultisampleRenderTarget(vt),q.updateRenderTargetMipmap(vt),se.has("WEBGL_multisampled_render_to_texture")===!1){let At=!1;for(let ge=0,Ue=L.length;ge<Ue;ge++){let we=L[ge],{object:Me,geometry:ti,material:bt,group:ri}=we;if(bt.side===We&&Me.layers.test(k.layers)){let oe=bt.side;bt.side=Je,bt.needsUpdate=!0,$h(Me,G,k,ti,bt,ri),bt.side=oe,bt.needsUpdate=!0,At=!0}}At===!0&&(q.updateMultisampleRenderTarget(vt),q.updateRenderTargetMipmap(vt))}P.setRenderTarget(_t,Tt,Rt),P.setClearColor(ue,ne),re!==void 0&&(k.viewport=re),P.toneMapping=jt}function Ca(M,L,G){let k=L.isScene===!0?L.overrideMaterial:null;for(let z=0,vt=M.length;z<vt;z++){let St=M[z],{object:_t,geometry:Tt,group:Rt}=St,jt=St.material;jt.allowOverride===!0&&k!==null&&(jt=k),_t.layers.test(G.layers)&&$h(_t,L,G,Tt,jt,Rt)}}function $h(M,L,G,k,z,vt){F!==null&&z.isNodeMaterial&&F.setObject(M,z),M.onBeforeRender(P,L,G,k,z,vt),M.modelViewMatrix.multiplyMatrices(G.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),z.onBeforeRender(P,L,G,k,M,vt),z.transparent===!0&&z.side===We&&z.forceSinglePass===!1?(z.side=Je,z.needsUpdate=!0,P.renderBufferDirect(G,L,k,z,M,vt),z.side=On,z.needsUpdate=!0,P.renderBufferDirect(G,L,k,z,M,vt),z.side=We):P.renderBufferDirect(G,L,k,z,M,vt),M.onAfterRender(P,L,G,k,z,vt)}function Ra(M,L,G){L.isScene!==!0&&(L=Ut);let k=H.get(M),z=S.state.lights,vt=S.state.shadowsArray,St=z.state.version,_t=ut.getParameters(M,z.state,vt,L,G,S.state.lightProbeGridArray),Tt=ut.getProgramCacheKey(_t),Rt=k.programs;k.environment=M.isMeshStandardMaterial||M.isMeshLambertMaterial||M.isMeshPhongMaterial?L.environment:null,k.fog=L.fog;let jt=M.isMeshStandardMaterial||M.isMeshLambertMaterial&&!M.envMap||M.isMeshPhongMaterial&&!M.envMap;k.envMap=lt.get(M.envMap||k.environment,jt),k.envMapRotation=k.environment!==null&&M.envMap===null?L.environmentRotation:M.envMapRotation,Rt===void 0&&(M.addEventListener("dispose",Xi),Rt=new Map,k.programs=Rt);let re=Rt.get(Tt);if(re!==void 0){if(k.currentProgram===re&&k.lightsStateVersion===St)return qh(M,_t),re}else _t.uniforms=ut.getUniforms(M),F!==null&&M.isNodeMaterial&&F.build(M,G,_t),M.onBeforeCompile(_t,P),re=ut.acquireProgram(_t,Tt),Rt.set(Tt,re),k.uniforms=_t.uniforms;let At=k.uniforms;return(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)&&(At.clippingPlanes=Lt.uniform),qh(M,_t),k.needsLights=Df(M),k.lightsStateVersion=St,k.needsLights&&(At.ambientLightColor.value=z.state.ambient,At.lightProbe.value=z.state.probe,At.sunLights.value=z.state.sun,At.sunLightShadows.value=z.state.sunShadow,At.directionalLights.value=z.state.directional,At.directionalLightShadows.value=z.state.directionalShadow,At.spotLights.value=z.state.spot,At.spotLightShadows.value=z.state.spotShadow,At.rectAreaLights.value=z.state.rectArea,At.ltc_1.value=z.state.rectAreaLTC1,At.ltc_2.value=z.state.rectAreaLTC2,At.pointLights.value=z.state.point,At.pointLightShadows.value=z.state.pointShadow,At.hemisphereLights.value=z.state.hemi,At.sunShadowMatrix.value=z.state.sunShadowMatrix,At.sunShadowCascade.value=z.state.sunShadowCascade,At.directionalShadowMatrix.value=z.state.directionalShadowMatrix,At.spotLightMatrix.value=z.state.spotLightMatrix,At.spotLightMap.value=z.state.spotLightMap,At.pointShadowMatrix.value=z.state.pointShadowMatrix),k.lightProbeGrid=S.state.lightProbeGridArray.length>0,k.currentProgram=re,k.uniformsList=null,re}function Xh(M){if(M.uniformsList===null){let L=M.currentProgram.getUniforms();M.uniformsList=er.seqWithValue(L.seq,M.uniforms)}return M.uniformsList}function qh(M,L){let G=H.get(M);G.outputColorSpace=L.outputColorSpace,G.batching=L.batching,G.batchingColor=L.batchingColor,G.instancing=L.instancing,G.instancingColor=L.instancingColor,G.instancingMorph=L.instancingMorph,G.skinning=L.skinning,G.morphTargets=L.morphTargets,G.morphNormals=L.morphNormals,G.morphColors=L.morphColors,G.morphTargetsCount=L.morphTargetsCount,G.numClippingPlanes=L.numClippingPlanes,G.numIntersection=L.numClipIntersection,G.vertexAlphas=L.vertexAlphas,G.vertexTangents=L.vertexTangents,G.toneMapping=L.toneMapping}function Pf(M,L){if(M.length===0)return null;if(M.length===1)return M[0].texture!==null?M[0]:null;y.setFromMatrixPosition(L.matrixWorld);for(let G=0,k=M.length;G<k;G++){let z=M[G];if(z.texture!==null&&z.boundingBox.containsPoint(y))return z}return null}function If(M,L,G,k,z){L.isScene!==!0&&(L=Ut),q.resetTextureUnits();let vt=L.fog,St=k.isMeshStandardMaterial||k.isMeshLambertMaterial||k.isMeshPhongMaterial?L.environment:null,_t=st===null?P.outputColorSpace:st.isXRRenderTarget===!0?st.texture.colorSpace:ie.workingColorSpace,Tt=k.isMeshStandardMaterial||k.isMeshLambertMaterial&&!k.envMap||k.isMeshPhongMaterial&&!k.envMap,Rt=lt.get(k.envMap||St,Tt),jt=k.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,re=!!G.attributes.tangent&&(!!k.normalMap||k.anisotropy>0),At=!!G.morphAttributes.position,ge=!!G.morphAttributes.normal,Ue=!!G.morphAttributes.color,we=Hi;k.toneMapped&&(st===null||st.isXRRenderTarget===!0)&&(we=P.toneMapping);let Me=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,ti=Me!==void 0?Me.length:0,bt=H.get(k),ri=S.state.lights;if(rt===!0&&(at===!0||M!==j)){let Se=M===j&&k.id===X;Lt.setState(k,M,Se)}let oe=!1;k.version===bt.__version?(bt.needsLights&&bt.lightsStateVersion!==ri.state.version||bt.outputColorSpace!==_t||z.isBatchedMesh&&bt.batching===!1||!z.isBatchedMesh&&bt.batching===!0||z.isBatchedMesh&&bt.batchingColor===!0&&z._colorsTexture===null||z.isBatchedMesh&&bt.batchingColor===!1&&z._colorsTexture!==null||z.isInstancedMesh&&bt.instancing===!1||!z.isInstancedMesh&&bt.instancing===!0||z.isSkinnedMesh&&bt.skinning===!1||!z.isSkinnedMesh&&bt.skinning===!0||z.isInstancedMesh&&bt.instancingColor===!0&&z.instanceColor===null||z.isInstancedMesh&&bt.instancingColor===!1&&z.instanceColor!==null||z.isInstancedMesh&&bt.instancingMorph===!0&&z.morphTexture===null||z.isInstancedMesh&&bt.instancingMorph===!1&&z.morphTexture!==null||bt.envMap!==Rt||k.fog===!0&&bt.fog!==vt||bt.numClippingPlanes!==void 0&&(bt.numClippingPlanes!==Lt.numPlanes||bt.numIntersection!==Lt.numIntersection)||bt.vertexAlphas!==jt||bt.vertexTangents!==re||bt.morphTargets!==At||bt.morphNormals!==ge||bt.morphColors!==Ue||bt.toneMapping!==we||bt.morphTargetsCount!==ti||!!bt.lightProbeGrid!=S.state.lightProbeGridArray.length>0)&&(oe=!0):(oe=!0,bt.__version=k.version);let wi=bt.currentProgram;oe===!0&&(wi=Ra(k,L,z),F&&k.isNodeMaterial&&F.onUpdateProgram(k,wi,bt));let qi=!1,yn=!1,gs=!1,ye=wi.getUniforms(),Le=bt.uniforms;if(x.useProgram(wi.program)&&(qi=!0,yn=!0,gs=!0),k.id!==X&&(X=k.id,yn=!0),bt.needsLights){let Se=Pf(S.state.lightProbeGridArray,z);bt.lightProbeGrid!==Se&&(bt.lightProbeGrid=Se,yn=!0)}if(qi||j!==M){x.buffers.depth.getReversed()&&M.reversedDepth!==!0&&(M._reversedDepth=!0,M.updateProjectionMatrix()),ye.setValue(I,"projectionMatrix",M.projectionMatrix),ye.setValue(I,"viewMatrix",M.matrixWorldInverse);let bn=ye.map.cameraPosition;bn!==void 0&&bn.setValue(I,ht.setFromMatrixPosition(M.matrixWorld)),A.logarithmicDepthBuffer&&ye.setValue(I,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2)),(k.isMeshPhongMaterial||k.isMeshToonMaterial||k.isMeshLambertMaterial||k.isMeshBasicMaterial||k.isMeshStandardMaterial||k.isShaderMaterial)&&ye.setValue(I,"isOrthographic",M.isOrthographicCamera===!0),j!==M&&(j=M,yn=!0,gs=!0)}if(bt.needsLights&&(ri.state.sunShadowMap.length>0&&ye.setValue(I,"sunShadowMap",ri.state.sunShadowMap,q),ri.state.directionalShadowMap.length>0&&ye.setValue(I,"directionalShadowMap",ri.state.directionalShadowMap,q),ri.state.spotShadowMap.length>0&&ye.setValue(I,"spotShadowMap",ri.state.spotShadowMap,q),ri.state.pointShadowMap.length>0&&ye.setValue(I,"pointShadowMap",ri.state.pointShadowMap,q)),z.isSkinnedMesh){ye.setOptional(I,z,"bindMatrix"),ye.setOptional(I,z,"bindMatrixInverse");let Se=z.skeleton;Se&&(Se.boneTexture===null&&Se.computeBoneTexture(),ye.setValue(I,"boneTexture",Se.boneTexture,q))}z.isBatchedMesh&&(ye.setOptional(I,z,"batchingTexture"),ye.setValue(I,"batchingTexture",z._matricesTexture,q),ye.setOptional(I,z,"batchingIdTexture"),ye.setValue(I,"batchingIdTexture",z._indirectTexture,q),ye.setOptional(I,z,"batchingColorTexture"),z._colorsTexture!==null&&ye.setValue(I,"batchingColorTexture",z._colorsTexture,q));let Mn=G.morphAttributes;if((Mn.position!==void 0||Mn.normal!==void 0||Mn.color!==void 0)&&U.update(z,G,wi),(yn||bt.receiveShadow!==z.receiveShadow)&&(bt.receiveShadow=z.receiveShadow,ye.setValue(I,"receiveShadow",z.receiveShadow)),(k.isMeshStandardMaterial||k.isMeshLambertMaterial||k.isMeshPhongMaterial)&&k.envMap===null&&L.environment!==null&&(Le.envMapIntensity.value=L.environmentIntensity),Le.dfgLUT!==void 0&&(Le.dfgLUT.value=L_()),yn){if(ye.setValue(I,"toneMappingExposure",P.toneMappingExposure),bt.needsLights&&Lf(Le,gs),vt&&k.fog===!0&&It.refreshFogUniforms(Le,vt),It.refreshMaterialUniforms(Le,k,Q,Z,S.state.transmissionRenderTarget[M.id]),bt.needsLights&&bt.lightProbeGrid){let Se=bt.lightProbeGrid;Le.probesSH.value=Se.texture,Le.probesMin.value.copy(Se.boundingBox.min),Le.probesMax.value.copy(Se.boundingBox.max),Le.probesResolution.value.copy(Se.resolution)}er.upload(I,Xh(bt),Le,q)}if(k.isShaderMaterial&&k.uniformsNeedUpdate===!0&&(er.upload(I,Xh(bt),Le,q),k.uniformsNeedUpdate=!1),k.isSpriteMaterial&&ye.setValue(I,"center",z.center),ye.setValue(I,"modelViewMatrix",z.modelViewMatrix),ye.setValue(I,"normalMatrix",z.normalMatrix),ye.setValue(I,"modelMatrix",z.matrixWorld),k.uniformsGroups!==void 0){let Se=k.uniformsGroups;for(let bn=0,xs=Se.length;bn<xs;bn++){let Zh=Se[bn];nt.update(Zh,wi),nt.bind(Zh,wi)}}return wi}function Lf(M,L){M.ambientLightColor.needsUpdate=L,M.lightProbe.needsUpdate=L,M.sunLights.needsUpdate=L,M.sunLightShadows.needsUpdate=L,M.directionalLights.needsUpdate=L,M.directionalLightShadows.needsUpdate=L,M.pointLights.needsUpdate=L,M.pointLightShadows.needsUpdate=L,M.spotLights.needsUpdate=L,M.spotLightShadows.needsUpdate=L,M.rectAreaLights.needsUpdate=L,M.hemisphereLights.needsUpdate=L}function Df(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return $},this.getActiveMipmapLevel=function(){return W},this.getRenderTarget=function(){return st},this.setRenderTargetTextures=function(M,L,G){let k=H.get(M);k.__autoAllocateDepthBuffer=M.resolveDepthBuffer===!1,k.__autoAllocateDepthBuffer===!1&&(k.__useRenderToTexture=!1),H.get(M.texture).__webglTexture=L,H.get(M.depthTexture).__webglTexture=k.__autoAllocateDepthBuffer?void 0:G,k.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(M,L){let G=H.get(M);G.__webglFramebuffer=L,G.__useDefaultFramebuffer=L===void 0},this.setRenderTarget=function(M,L=0,G=0){st=M,$=L,W=G;let k=null,z=!1,vt=!1;if(M){let _t=H.get(M);if(_t.__useDefaultFramebuffer!==void 0){x.bindFramebuffer(I.FRAMEBUFFER,_t.__webglFramebuffer),et.copy(M.viewport),Pt.copy(M.scissor),wt=M.scissorTest,x.viewport(et),x.scissor(Pt),x.setScissorTest(wt),X=-1;return}else if(_t.__webglFramebuffer===void 0)q.setupRenderTarget(M);else if(_t.__hasExternalTextures)q.rebindTextures(M,H.get(M.texture).__webglTexture,H.get(M.depthTexture).__webglTexture);else if(M.depthBuffer){let jt=M.depthTexture;if(_t.__boundDepthTexture!==jt){if(jt!==null&&H.has(jt)&&(M.width!==jt.image.width||M.height!==jt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");q.setupDepthRenderbuffer(M)}}let Tt=M.texture;(Tt.isData3DTexture||Tt.isDataArrayTexture||Tt.isCompressedArrayTexture)&&(vt=!0);let Rt=H.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(Array.isArray(Rt[L])?k=Rt[L][G]:k=Rt[L],z=!0):M.samples>0&&q.useMultisampledRTT(M)===!1?k=H.get(M).__webglMultisampledFramebuffer:Array.isArray(Rt)?k=Rt[G]:k=Rt,et.copy(M.viewport),Pt.copy(M.scissor),wt=M.scissorTest}else et.copy(Mt).multiplyScalar(Q).floor(),Pt.copy(Gt).multiplyScalar(Q).floor(),wt=ve;if(G!==0&&(k=V),x.bindFramebuffer(I.FRAMEBUFFER,k)&&x.drawBuffers(M,k),x.viewport(et),x.scissor(Pt),x.setScissorTest(wt),z){let _t=H.get(M.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_CUBE_MAP_POSITIVE_X+L,_t.__webglTexture,G)}else if(vt){let _t=L;for(let Tt=0;Tt<M.textures.length;Tt++){let Rt=H.get(M.textures[Tt]);I.framebufferTextureLayer(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0+Tt,Rt.__webglTexture,G,_t)}}else if(M!==null&&G!==0){let _t=H.get(M.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,_t.__webglTexture,G)}X=-1};function Yh(M){let L=H.get(M);return(L.__readFormat!==M.format||L.__readType!==M.type)&&(L.__readFormat=M.format,L.__readType=M.type,L.__formatReadable=A.textureFormatReadable(M.format),L.__typeReadable=A.textureTypeReadable(M.type)),L}this.readRenderTargetPixels=function(M,L,G,k,z,vt,St,_t=0){if(!(M&&M.isWebGLRenderTarget)){Ht("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Tt=H.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&St!==void 0&&(Tt=Tt[St]),Tt){x.bindFramebuffer(I.FRAMEBUFFER,Tt);try{let Rt=M.textures[_t],jt=Rt.format,re=Rt.type;M.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+_t);let At=Yh(Rt);if(At.__formatReadable===!1){Ht("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(At.__typeReadable===!1){Ht("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}L>=0&&L<=M.width-k&&G>=0&&G<=M.height-z&&I.readPixels(L,G,k,z,pt.convert(jt),pt.convert(re),vt)}finally{let Rt=st!==null?H.get(st).__webglFramebuffer:null;x.bindFramebuffer(I.FRAMEBUFFER,Rt)}}},this.readRenderTargetPixelsAsync=async function(M,L,G,k,z,vt,St,_t=0){if(!(M&&M.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Tt=H.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&St!==void 0&&(Tt=Tt[St]),Tt)if(L>=0&&L<=M.width-k&&G>=0&&G<=M.height-z){x.bindFramebuffer(I.FRAMEBUFFER,Tt);let Rt=M.textures[_t],jt=Rt.format,re=Rt.type;M.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+_t);let At=Yh(Rt);if(At.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(At.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let ge=I.createBuffer();I.bindBuffer(I.PIXEL_PACK_BUFFER,ge),I.bufferData(I.PIXEL_PACK_BUFFER,vt.byteLength,I.STREAM_READ),I.readPixels(L,G,k,z,pt.convert(jt),pt.convert(re),0),I.bindBuffer(I.PIXEL_PACK_BUFFER,null);let Ue=st!==null?H.get(st).__webglFramebuffer:null;x.bindFramebuffer(I.FRAMEBUFFER,Ue);let we=I.fenceSync(I.SYNC_GPU_COMMANDS_COMPLETE,0);return I.flush(),await fd(I,we,4),I.bindBuffer(I.PIXEL_PACK_BUFFER,ge),I.getBufferSubData(I.PIXEL_PACK_BUFFER,0,vt),I.bindBuffer(I.PIXEL_PACK_BUFFER,null),I.deleteBuffer(ge),I.deleteSync(we),vt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(M,L=null,G=0){let k=Math.pow(2,-G),z=Math.floor(M.image.width*k),vt=Math.floor(M.image.height*k),St=L!==null?L.x:0,_t=L!==null?L.y:0;q.setTexture2D(M,0),I.copyTexSubImage2D(I.TEXTURE_2D,G,0,0,St,_t,z,vt),x.unbindTexture()},this.copyTextureToTexture=function(M,L,G=null,k=null,z=0,vt=0){let St,_t,Tt,Rt,jt,re,At,ge,Ue,we=M.isCompressedTexture?M.mipmaps[vt]:M.image;if(G!==null)St=G.max.x-G.min.x,_t=G.max.y-G.min.y,Tt=G.isBox3?G.max.z-G.min.z:1,Rt=G.min.x,jt=G.min.y,re=G.isBox3?G.min.z:0;else{let Le=Math.pow(2,-z);St=Math.floor(we.width*Le),_t=Math.floor(we.height*Le),M.isDataArrayTexture?Tt=we.depth:M.isData3DTexture?Tt=Math.floor(we.depth*Le):Tt=1,Rt=0,jt=0,re=0}k!==null?(At=k.x,ge=k.y,Ue=k.z):(At=0,ge=0,Ue=0);let Me=pt.convert(L.format),ti=pt.convert(L.type),bt;L.isData3DTexture?(q.setTexture3D(L,0),bt=I.TEXTURE_3D):L.isDataArrayTexture||L.isCompressedArrayTexture?(q.setTexture2DArray(L,0),bt=I.TEXTURE_2D_ARRAY):(q.setTexture2D(L,0),bt=I.TEXTURE_2D),x.activeTexture(I.TEXTURE0),x.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,L.flipY),x.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,L.premultiplyAlpha),x.pixelStorei(I.UNPACK_ALIGNMENT,L.unpackAlignment);let ri=x.getParameter(I.UNPACK_ROW_LENGTH),oe=x.getParameter(I.UNPACK_IMAGE_HEIGHT),wi=x.getParameter(I.UNPACK_SKIP_PIXELS),qi=x.getParameter(I.UNPACK_SKIP_ROWS),yn=x.getParameter(I.UNPACK_SKIP_IMAGES);x.pixelStorei(I.UNPACK_ROW_LENGTH,we.width),x.pixelStorei(I.UNPACK_IMAGE_HEIGHT,we.height),x.pixelStorei(I.UNPACK_SKIP_PIXELS,Rt),x.pixelStorei(I.UNPACK_SKIP_ROWS,jt),x.pixelStorei(I.UNPACK_SKIP_IMAGES,re);let gs=M.isDataArrayTexture||M.isData3DTexture,ye=L.isDataArrayTexture||L.isData3DTexture;if(M.isDepthTexture){let Le=H.get(M),Mn=H.get(L),Se=H.get(Le.__renderTarget),bn=H.get(Mn.__renderTarget);x.bindFramebuffer(I.READ_FRAMEBUFFER,Se.__webglFramebuffer),x.bindFramebuffer(I.DRAW_FRAMEBUFFER,bn.__webglFramebuffer);for(let xs=0;xs<Tt;xs++)gs&&(I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,H.get(M).__webglTexture,z,re+xs),I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,H.get(L).__webglTexture,vt,Ue+xs)),I.blitFramebuffer(Rt,jt,St,_t,At,ge,St,_t,I.DEPTH_BUFFER_BIT,I.NEAREST);x.bindFramebuffer(I.READ_FRAMEBUFFER,null),x.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else if(z!==0||M.isRenderTargetTexture||H.has(M)){let Le=H.get(M),Mn=H.get(L);x.bindFramebuffer(I.READ_FRAMEBUFFER,N),x.bindFramebuffer(I.DRAW_FRAMEBUFFER,B);for(let Se=0;Se<Tt;Se++)gs?I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,Le.__webglTexture,z,re+Se):I.framebufferTexture2D(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,Le.__webglTexture,z),ye?I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,Mn.__webglTexture,vt,Ue+Se):I.framebufferTexture2D(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,Mn.__webglTexture,vt),z!==0?I.blitFramebuffer(Rt,jt,St,_t,At,ge,St,_t,I.COLOR_BUFFER_BIT,I.NEAREST):ye?I.copyTexSubImage3D(bt,vt,At,ge,Ue+Se,Rt,jt,St,_t):I.copyTexSubImage2D(bt,vt,At,ge,Rt,jt,St,_t);x.bindFramebuffer(I.READ_FRAMEBUFFER,null),x.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else ye?M.isDataTexture||M.isData3DTexture?I.texSubImage3D(bt,vt,At,ge,Ue,St,_t,Tt,Me,ti,we.data):L.isCompressedArrayTexture?I.compressedTexSubImage3D(bt,vt,At,ge,Ue,St,_t,Tt,Me,we.data):I.texSubImage3D(bt,vt,At,ge,Ue,St,_t,Tt,Me,ti,we):M.isDataTexture?I.texSubImage2D(I.TEXTURE_2D,vt,At,ge,St,_t,Me,ti,we.data):M.isCompressedTexture?I.compressedTexSubImage2D(I.TEXTURE_2D,vt,At,ge,we.width,we.height,Me,we.data):I.texSubImage2D(I.TEXTURE_2D,vt,At,ge,St,_t,Me,ti,we);x.pixelStorei(I.UNPACK_ROW_LENGTH,ri),x.pixelStorei(I.UNPACK_IMAGE_HEIGHT,oe),x.pixelStorei(I.UNPACK_SKIP_PIXELS,wi),x.pixelStorei(I.UNPACK_SKIP_ROWS,qi),x.pixelStorei(I.UNPACK_SKIP_IMAGES,yn),vt===0&&L.generateMipmaps&&I.generateMipmap(bt),x.unbindTexture()},this.initRenderTarget=function(M){H.get(M).__webglFramebuffer===void 0&&q.setupRenderTarget(M)},this.initTexture=function(M){M.isCubeTexture?q.setTextureCube(M,0):M.isData3DTexture?q.setTexture3D(M,0):M.isDataArrayTexture||M.isCompressedArrayTexture?q.setTexture2DArray(M,0):q.setTexture2D(M,0),x.unbindTexture()},this.resetState=function(){$=0,W=0,st=null,x.reset(),yt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ki}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=ie._getDrawingBufferColorSpace(t),e.unpackColorSpace=ie._getUnpackColorSpace()}};var nr={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};var Mi=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}},D_=new Fn(-1,1,1,-1,0,1),Nh=class extends Te{constructor(){super(),this.setAttribute("position",new Yt([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Yt([0,2,0,0,2,0],2))}},N_=new Nh,Gn=class{constructor(t){this._mesh=new Qt(N_,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,D_)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}};var kl=class extends Mi{constructor(t,e="tDiffuse"){super(),this.textureID=e,this.uniforms=null,this.material=null,t instanceof Ae?(this.uniforms=t.uniforms,this.material=t):t&&(this.uniforms=gn.clone(t.uniforms),this.material=new Ae({name:t.name!==void 0?t.name:"unspecified",defines:Object.assign({},t.defines),uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader})),this._fsQuad=new Gn(this.material)}render(t,e,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this._fsQuad.material=this.material,this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this._fsQuad.render(t))}dispose(){this.material.dispose(),this._fsQuad.dispose()}};var _a=class extends Mi{constructor(t,e){super(),this.scene=t,this.camera=e,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(t,e,i){let s=t.getContext(),r=t.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),r.buffers.stencil.setFunc(s.ALWAYS,a,4294967295),r.buffers.stencil.setClear(o),r.buffers.stencil.setLocked(!0),t.setRenderTarget(i),this.clear&&t.clear(),t.render(this.scene,this.camera),t.setRenderTarget(e),this.clear&&t.clear(),t.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(s.EQUAL,1,4294967295),r.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),r.buffers.stencil.setLocked(!0)}},zl=class extends Mi{constructor(){super(),this.needsSwap=!1}render(t){t.state.buffers.stencil.setLocked(!1),t.state.buffers.stencil.setTest(!1)}};var Hl=class{constructor(t,e){if(this.renderer=t,this._pixelRatio=t.getPixelRatio(),e===void 0){let i=t.getSize(new it);this._width=i.width,this._height=i.height,e=new Be(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:Ke}),e.texture.name="EffectComposer.rt1"}else this._width=e.width,this._height=e.height;this.renderTarget1=e,this.renderTarget2=e.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new kl(nr),this.copyPass.material.blending=Ci,this.timer=new Kr}swapBuffers(){let t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(t,e){this.passes.splice(e,0,t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(t){let e=this.passes.indexOf(t);e!==-1&&this.passes.splice(e,1)}isLastEnabledPass(t){for(let e=t+1;e<this.passes.length;e++)if(this.passes[e].enabled)return!1;return!0}render(t){this.timer.update(),t===void 0&&(t=this.timer.getDelta());let e=this.renderer.getRenderTarget(),i=!1;for(let s=0,r=this.passes.length;s<r;s++){let a=this.passes[s];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),a.render(this.renderer,this.writeBuffer,this.readBuffer,t,i),a.needsSwap){if(i){let o=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,t),l.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}_a!==void 0&&(a instanceof _a?i=!0:a instanceof zl&&(i=!1))}}this.renderer.setRenderTarget(e)}reset(t){if(t===void 0){let e=this.renderer.getSize(new it);this._pixelRatio=this.renderer.getPixelRatio(),this._width=e.width,this._height=e.height,t=this.renderTarget1.clone(),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(t,e){this._width=t,this._height=e;let i=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(i,s),this.renderTarget2.setSize(i,s);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(i,s)}setPixelRatio(t){this._pixelRatio=t,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}};var Vl=class extends Mi{constructor(t,e,i=null,s=null,r=null){super(),this.scene=t,this.camera=e,this.overrideMaterial=i,this.clearColor=s,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new Ft}render(t,e,i){let s=t.autoClear;t.autoClear=!1;let r,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(t.getClearColor(this._oldClearColor),t.setClearColor(this.clearColor,t.getClearAlpha())),this.clearAlpha!==null&&(r=t.getClearAlpha(),t.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&t.clearDepth(),t.setRenderTarget(this.renderToScreen?null:i),this.clear===!0&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),t.render(this.scene,this.camera),this.clearColor!==null&&t.setClearColor(this._oldClearColor),this.clearAlpha!==null&&t.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),t.autoClear=s}};var Kd={name:"LuminosityHighPassShader",uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new Ft(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};var sr=class n extends Mi{constructor(t,e=1,i,s){super(),this.strength=e,this.radius=i,this.threshold=s,this.resolution=t!==void 0?new it(t.x,t.y):new it(256,256),this.clearColor=new Ft(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new Be(r,a,{type:Ke,depthBuffer:!1}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let h=0;h<this.nMips;h++){let f=new Be(r,a,{type:Ke,depthBuffer:!1});f.texture.name="UnrealBloomPass.h"+h,f.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(f);let u=new Be(r,a,{type:Ke,depthBuffer:!1});u.texture.name="UnrealBloomPass.v"+h,u.texture.generateMipmaps=!1,this.renderTargetsVertical.push(u),r=Math.round(r/2),a=Math.round(a/2)}let o=Kd;this.highPassUniforms=gn.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=s,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new Ae({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];let l=[6,10,14,18,22];r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let h=0;h<this.nMips;h++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(l[h])),this.separableBlurMaterials[h].uniforms.invSize.value=new it(1/r,1/a),r=Math.round(r/2),a=Math.round(a/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=e,this.compositeMaterial.uniforms.bloomRadius.value=.1;let c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new R(1,1,1),new R(1,1,1),new R(1,1,1),new R(1,1,1),new R(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=gn.clone(nr.uniforms),this.blendMaterial=new Ae({uniforms:this.copyUniforms,vertexShader:nr.vertexShader,fragmentShader:nr.fragmentShader,premultipliedAlpha:!0,blending:yi,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new Ft,this._oldClearAlpha=1,this._basic=new ni,this._fsQuad=new Gn(null)}dispose(){for(let t=0;t<this.renderTargetsHorizontal.length;t++)this.renderTargetsHorizontal[t].dispose();for(let t=0;t<this.renderTargetsVertical.length;t++)this.renderTargetsVertical[t].dispose();this.renderTargetBright.dispose();for(let t=0;t<this.separableBlurMaterials.length;t++)this.separableBlurMaterials[t].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(t,e){let i=Math.round(t/2),s=Math.round(e/2);this.renderTargetBright.setSize(i,s);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(i,s),this.renderTargetsVertical[r].setSize(i,s),this.separableBlurMaterials[r].uniforms.invSize.value=new it(1/i,1/s),i=Math.round(i/2),s=Math.round(s/2)}render(t,e,i,s,r){t.getClearColor(this._oldClearColor),this._oldClearAlpha=t.getClearAlpha();let a=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),r&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=i.texture,t.setRenderTarget(null),t.clear(),this._fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=i.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this._fsQuad.render(t);let o=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this._fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=o.texture,this.separableBlurMaterials[l].uniforms.direction.value=n.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[l]),t.clear(),this._fsQuad.render(t),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=n.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[l]),t.clear(),this._fsQuad.render(t),o=this.renderTargetsVertical[l];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this._fsQuad.render(t),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(i),this._fsQuad.render(t)),t.setClearColor(this._oldClearColor,this._oldClearAlpha),t.autoClear=a}_getSeparableBlurMaterial(t){let e=[],i=t/3;for(let a=0;a<t;a++)e.push(.39894*Math.exp(-.5*a*a/(i*i))/i);let s=[],r=[];for(let a=1;a<t;a+=2){let o=e[a],l=a+1<t?e[a+1]:0,c=o+l;s.push((a*o+(a+1)*l)/c),r.push(c)}return new Ae({defines:{KERNEL_PAIRS:s.length},uniforms:{colorTexture:{value:null},invSize:{value:new it(.5,.5)},direction:{value:new it(.5,.5)},centerWeight:{value:e[0]},gaussianOffsets:{value:s},gaussianWeights:{value:r}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				#include <common>

				varying vec2 vUv;

				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float centerWeight;
				uniform float gaussianOffsets[KERNEL_PAIRS];
				uniform float gaussianWeights[KERNEL_PAIRS];

				void main() {

					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * centerWeight;

					for ( int i = 0; i < KERNEL_PAIRS; i ++ ) {

						vec2 uvOffset = direction * invSize * gaussianOffsets[ i ];
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += ( sample1 + sample2 ) * gaussianWeights[ i ];

					}

					gl_FragColor = vec4( diffuseSum, 1.0 );

				}`})}_getCompositeMaterial(t){return new Ae({defines:{NUM_MIPS:t},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				varying vec2 vUv;

				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor( const in float factor ) {

					float mirrorFactor = 1.2 - factor;
					return mix( factor, mirrorFactor, bloomRadius );

				}

				void main() {

					// 3.0 for backwards compatibility with previous alpha-based intensity
					vec3 bloom = 3.0 * bloomStrength * (
						lerpBloomFactor( bloomFactors[ 0 ] ) * bloomTintColors[ 0 ] * texture2D( blurTexture1, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 1 ] ) * bloomTintColors[ 1 ] * texture2D( blurTexture2, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 2 ] ) * bloomTintColors[ 2 ] * texture2D( blurTexture3, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 3 ] ) * bloomTintColors[ 3 ] * texture2D( blurTexture4, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 4 ] ) * bloomTintColors[ 4 ] * texture2D( blurTexture5, vUv ).rgb
					);

					float bloomAlpha = max( bloom.r, max( bloom.g, bloom.b ) );
					gl_FragColor = vec4( bloom, bloomAlpha );

				}`})}};sr.BlurDirectionX=new it(1,0);sr.BlurDirectionY=new it(0,1);var va={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};var Gl=class extends Mi{constructor(){super(),this.isOutputPass=!0,this.uniforms=gn.clone(va.uniforms),this.material=new qs({name:va.name,uniforms:this.uniforms,vertexShader:va.vertexShader,fragmentShader:va.fragmentShader}),this._fsQuad=new Gn(this.material),this._outputColorSpace=null,this._toneMapping=null}render(t,e,i){this.uniforms.tDiffuse.value=i.texture,this.uniforms.toneMappingExposure.value=t.toneMappingExposure,(this._outputColorSpace!==t.outputColorSpace||this._toneMapping!==t.toneMapping)&&(this._outputColorSpace=t.outputColorSpace,this._toneMapping=t.toneMapping,this.material.defines={},ie.getTransfer(this._outputColorSpace)===ce&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===ta?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===ea?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===ia?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===en?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===sa?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===ra?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===na&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this._fsQuad.render(t))}dispose(){this.material.dispose(),this._fsQuad.dispose()}};var us=class extends ji{constructor(){super(),this.name="RoomEnvironment",this.position.y=-3.5;let t=new hi;t.deleteAttribute("uv");let e=new De({side:Je}),i=new De,s=new rs(16777215,900,28,2);s.position.set(.418,16.199,.3),this.add(s);let r=new Qt(t,e);r.position.set(-.757,13.219,.717),r.scale.set(31.713,28.305,28.591),this.add(r);let a=new Qn(t,i,6),o=new ke;o.position.set(-10.906,2.009,1.846),o.rotation.set(0,-.195,0),o.scale.set(2.328,7.905,4.651),o.updateMatrix(),a.setMatrixAt(0,o.matrix),o.position.set(-5.607,-.754,-.758),o.rotation.set(0,.994,0),o.scale.set(1.97,1.534,3.955),o.updateMatrix(),a.setMatrixAt(1,o.matrix),o.position.set(6.167,.857,7.803),o.rotation.set(0,.561,0),o.scale.set(3.927,6.285,3.687),o.updateMatrix(),a.setMatrixAt(2,o.matrix),o.position.set(-2.017,.018,6.124),o.rotation.set(0,.333,0),o.scale.set(2.002,4.566,2.064),o.updateMatrix(),a.setMatrixAt(3,o.matrix),o.position.set(2.291,-.756,-2.621),o.rotation.set(0,-.286,0),o.scale.set(1.546,1.552,1.496),o.updateMatrix(),a.setMatrixAt(4,o.matrix),o.position.set(-2.193,-.369,-5.547),o.rotation.set(0,.516,0),o.scale.set(3.875,3.487,2.986),o.updateMatrix(),a.setMatrixAt(5,o.matrix),this.add(a);let l=new Qt(t,rr(50));l.position.set(-16.116,14.37,8.208),l.scale.set(.1,2.428,2.739),this.add(l);let c=new Qt(t,rr(50));c.position.set(-16.109,18.021,-8.207),c.scale.set(.1,2.425,2.751),this.add(c);let h=new Qt(t,rr(17));h.position.set(14.904,12.198,-1.832),h.scale.set(.15,4.265,6.331),this.add(h);let f=new Qt(t,rr(43));f.position.set(-.462,8.89,14.52),f.scale.set(4.38,5.441,.088),this.add(f);let u=new Qt(t,rr(20));u.position.set(3.235,11.486,-12.541),u.scale.set(2.5,2,.1),this.add(u);let d=new Qt(t,rr(100));d.position.set(0,20,0),d.scale.set(1,.1,1),this.add(d)}dispose(){let t=new Set;this.traverse(e=>{e.isMesh&&(t.add(e.geometry),t.add(e.material))});for(let e of t)e.dispose()}};function rr(n){return new Xr({color:0,emissive:16777215,emissiveIntensity:n})}var ya=new R;function Ii(n,t,e,i,s,r){let a=2*Math.PI*s/4,o=Math.max(r-2*s,0),l=Math.PI/4;ya.copy(t),ya[i]=0,ya.normalize();let c=.5*a/(a+o),h=1-ya.angleTo(n)/l;return Math.sign(ya[e])===1?h*c:o/(a+o)+c+c*(1-h)}var ds=class n extends hi{constructor(t=1,e=1,i=1,s=2,r=.1){let a=s*2+1;if(r=Math.min(t/2,e/2,i/2,r),super(1,1,1,a,a,a),this.type="RoundedBoxGeometry",this.parameters={width:t,height:e,depth:i,segments:s,radius:r},a===1)return;let o=this.toNonIndexed();this.index=null,this.attributes.position=o.attributes.position,this.attributes.normal=o.attributes.normal,this.attributes.uv=o.attributes.uv;let l=new R,c=new R,h=new R(t,e,i).divideScalar(2).subScalar(r),f=this.attributes.position.array,u=this.attributes.normal.array,d=this.attributes.uv.array,g=f.length/6,v=new R,m=.5/a;for(let p=0,b=0;p<f.length;p+=3,b+=2)switch(l.fromArray(f,p),c.copy(l),c.x-=Math.sign(c.x)*m,c.y-=Math.sign(c.y)*m,c.z-=Math.sign(c.z)*m,c.normalize(),f[p+0]=h.x*Math.sign(l.x)+c.x*r,f[p+1]=h.y*Math.sign(l.y)+c.y*r,f[p+2]=h.z*Math.sign(l.z)+c.z*r,u[p+0]=c.x,u[p+1]=c.y,u[p+2]=c.z,Math.floor(p/g)){case 0:v.set(1,0,0),d[b+0]=Ii(v,c,"z","y",r,i),d[b+1]=1-Ii(v,c,"y","z",r,e);break;case 1:v.set(-1,0,0),d[b+0]=1-Ii(v,c,"z","y",r,i),d[b+1]=1-Ii(v,c,"y","z",r,e);break;case 2:v.set(0,1,0),d[b+0]=1-Ii(v,c,"x","z",r,t),d[b+1]=Ii(v,c,"z","x",r,i);break;case 3:v.set(0,-1,0),d[b+0]=1-Ii(v,c,"x","z",r,t),d[b+1]=1-Ii(v,c,"z","x",r,i);break;case 4:v.set(0,0,1),d[b+0]=1-Ii(v,c,"x","y",r,t),d[b+1]=1-Ii(v,c,"y","x",r,e);break;case 5:v.set(0,0,-1),d[b+0]=Ii(v,c,"x","y",r,t),d[b+1]=1-Ii(v,c,"y","x",r,e);break}}static fromJSON(t){return new n(t.width,t.height,t.depth,t.segments,t.radius)}};var Kt=(n,t=.62)=>new De({color:n,roughness:t,metalness:0}),jd=(n,t=.22)=>new Ln({color:n,roughness:t,metalness:0,clearcoat:.7,clearcoatRoughness:.2}),Ma=(n,t=.3)=>new De({color:n,roughness:t,metalness:.85}),Wn=(n,t=.38)=>new Ln({color:n,roughness:.06,metalness:0,transparent:!0,opacity:t,side:We,depthWrite:!1}),Nt=(n,t,e=0,i=0,s=0)=>{let r=new Qt(n,t);return r.position.set(e,i,s),r.castShadow=!0,r.receiveShadow=!0,r},bi=(n,t,e,i=.08,s=3)=>new ds(n,t,e,s,Math.min(i,n/2-.001,t/2-.001,e/2-.001)),$e=(n,t,e,i=40)=>new mi(n,t,e,i);function Uh(n,t,e){let i=new is,s=[-n/2,0],r=[n/2,0],a=[0,t],o=(v,m,p)=>[v[0]+(m[0]-v[0])*p,v[1]+(m[1]-v[1])*p],l=e,c=o(s,r,l),h=o(s,r,1-l),f=o(r,a,l),u=o(r,a,1-l),d=o(a,s,l),g=o(a,s,1-l);return i.moveTo(...c),i.lineTo(...h),i.quadraticCurveTo(...r,...f),i.lineTo(...u),i.quadraticCurveTo(...a,...d),i.lineTo(...g),i.quadraticCurveTo(...s,...c),i}var je={};je.umbrella=()=>{let n=new de,t=1.5,e=Math.PI*.33,i=new Qt(new _i(t,48,24,0,Math.PI*2,0,e),Wn(13624063,.62));i.position.y=1.1,i.castShadow=!0,n.add(i);let s=Kt(1254479,.5);for(let a=0;a<8;a++){let o=a/8*Math.PI*2,l=[];for(let c=0;c<=12;c++){let h=c/12*e;l.push(new R(Math.sin(h)*t*Math.cos(o)*1.004,1.1+Math.cos(h)*t*1.004,Math.sin(h)*t*Math.sin(o)*1.004))}n.add(Nt(new $s(new es(l),24,.018,6),s))}n.add(Nt($e(.035,.035,2.7,12),Ma(14672874,.35),0,1.35,0)),n.add(Nt(new _i(.07,16,12),s,0,2.62,0));let r=new es([new R(0,.1,0),new R(0,-.08,0),new R(.12,-.2,0),new R(.3,-.2,0),new R(.42,-.08,0),new R(.42,.05,0)]);return n.add(Nt(new $s(r,24,.055,10),Kt(16776947,.45))),n.position.y=.22,n.rotation.z=.06,n};je.umbrellaClosed=()=>{let n=new de;return n.add(Nt(new Dr(.15,1.7,16),Wn(13624063,.7),0,1.1,0)),n.add(Nt($e(.02,.02,2,8),Ma(14672874),0,1,0)),n.add(Nt(new $r(.1,.035,8,16,Math.PI),Kt(16776947),.1,.02,0)),n};je.bento=()=>{let n=new de;n.add(Nt(bi(2.5,.42,1.75,.1),Kt(1583701,.45),0,.21,0));let t=(i,s,r,a,o,l=.16,c=.05)=>n.add(Nt(bi(i,l,s,c),Kt(o,.7),r,.46+l/2-.06,a));t(1,1.4,-.62,0,16447726,.26,.12);for(let i=0;i<14;i++)n.add(Nt(new _i(.028,6,5),Kt(1710618),-.62+Math.sin(i*2.7)*.4,.77,Math.cos(i*1.9)*.55));n.add(Nt(new _i(.12,16,12),Kt(13121594,.5),-.62,.77,0)),t(.8,.5,.34,-.48,14977596,.2),t(.8,.42,.34,.02,16044894,.18),t(.8,.4,.34,.5,5216858,.16),t(.38,.5,.92,-.48,13917050,.14,.08),t(.38,.5,.92,.2,9132602,.16,.08),n.add(Nt(bi(2.56,.1,1.8,.04),Wn(14674687,.28),0,1,0)),n.add(Nt(bi(.62,.03,1.78,.015),Kt(16776947,.5),0,1.065,0));let e=Nt(new pn(.14,24),Kt(13121594,.5),0,1.085,0);return e.rotation.x=-Math.PI/2,n.add(e),n};je.milk=()=>{let n=new de;n.add(Nt(bi(.98,1.35,.98,.05),Kt(16776947,.45),0,.675,0)),n.add(Nt(bi(1,.46,1,.02),Kt(2971576,.5),0,.4,0));let t=new In(Uh(.98,.5,.001),{depth:.98,bevelEnabled:!1});t.translate(0,0,-.49);let e=Nt(t,Kt(16776947,.45),0,1.35,0);n.add(e),n.add(Nt(bi(.1,.14,.98,.02),Kt(15328722,.5),0,1.9,0));let i=Nt(new pn(.17,24),Kt(13121594,.5),0,.98,.495);return n.add(i),n};je.can=()=>{let n=new de;return n.add(Nt($e(.55,.55,1.5,48),jd(3875606,.28),0,.75,0)),n.add(Nt($e(.552,.552,.34,48),jd(14132814,.3),0,.78,0)),n.add(Nt($e(.552,.552,.08,48),Kt(13121594,.4),0,1.08,0)),n.add(Nt($e(.5,.55,.06,48),Ma(13225686),0,1.52,0)),n.add(Nt($e(.48,.48,.03,48),Ma(15001838),0,1.56,0)),n.add(Nt($e(.55,.5,.06,48),Ma(13225686),0,-0+.03,0)),n};je.noodle=()=>{let n=new de;n.add(Nt($e(.95,.66,1.25,48),Kt(13780267,.5),0,.625,0)),n.add(Nt($e(.9,.7,.34,48),Kt(16776947,.5),0,.42,0)),n.add(Nt($e(.97,.97,.1,48),Kt(16776947,.5),0,1.28,0)),n.add(Nt($e(.99,.99,.05,48),Kt(13780267,.5),0,1.33,0));let t=Nt($e(.02,.02,1.7,8),Kt(14203018),.15,1.5,.15);t.rotation.z=1.3,n.add(t);let e=t.clone();return e.position.set(.15,1.5,.3),n.add(e),n};je.onigiri=()=>{let n=new de,t=.62,e=new In(Uh(1.7,1.45,.18),{depth:t,bevelEnabled:!0,bevelSize:.12,bevelThickness:.14,bevelSegments:5,curveSegments:10});e.translate(0,0,-t/2),n.add(Nt(e,Kt(16316138,.8),0,.12,0));let i=new is;i.moveTo(-.86,0),i.lineTo(.86,0),i.lineTo(.5,.62),i.lineTo(-.5,.62),i.closePath();let s=new In(i,{depth:t+.34,bevelEnabled:!1});s.translate(0,0,-(t+.34)/2);let r=Nt(s,Kt(988962,.55),0,.12,0);r.scale.set(1,1,1),n.add(r);let a=Nt(new pn(.17,24),Kt(15237722,.6),0,.98,t/2+.15);return n.add(a),n};je.sandwich=()=>{let n=new de,t=(e,i,s,r=1)=>{let a=new In(Uh(1.9*r,1.7*r,.05),{depth:s,bevelEnabled:!0,bevelSize:.05,bevelThickness:.04,bevelSegments:3});return a.rotateX(-Math.PI/2),a.translate(0,i,0),Nt(a,Kt(e,.8))};return n.add(t(14265963,0,.22)),n.add(t(16241738,.26,.16,.97)),n.add(t(15328456,.46,.06,.9)),n.add(t(14265963,.54,.22)),n.rotation.y=.35,n};je.salad=()=>{let n=new de,t=[[0,0],[.55,0],[.75,.08],[.95,.55],[1.05,.62],[1.05,.7],[0,.7]].map(s=>new it(s[0],s[1]));n.add(Nt(new ss(t,40),Wn(15266544,.32),0,0,0));let e=[5216858,8239971,4162640,10276718].map(s=>Kt(s,.75));for(let s=0;s<16;s++){let r=Nt(new Gr(.28+.1*(s*7%3)/3,1),e[s%4],Math.sin(s*2.4)*.55,.55+s*3%4*.07,Math.cos(s*2.4)*.55);r.scale.set(1.1,.55,1),r.rotation.set(s,s*2,s*.5),n.add(r)}[[.1,.8,.2],[-.3,.78,-.25],[.35,.76,-.3]].forEach(s=>n.add(Nt(new _i(.15,16,12),Kt(14172971,.45),...s))),[[-.1,.82,.4],[.4,.8,.1],[-.45,.8,.15]].forEach(s=>n.add(Nt(new _i(.07,10,8),Kt(15978319,.5),...s)));let i=new Qt(new _i(1.08,40,16,0,Math.PI*2,0,Math.PI*.3),Wn(15397887,.22));return i.position.y=.52,n.add(i),n};je.ice=()=>{let n=new de;n.add(Nt($e(.8,.6,1,48),Kt(15907016,.55),0,.5,0)),n.add(Nt($e(.84,.84,.09,48),Kt(16776947,.5),0,1.04,0)),n.add(Nt($e(.86,.86,.05,48),Kt(15907016,.5),0,1.1,0)),n.add(Nt($e(.8,.8,.26,48),Kt(16776947,.5),0,.36,0));let t=Nt(bi(.12,.04,.9,.02),Kt(14203018),.25,1.18,.3);return t.rotation.y=.5,n.add(t),n};je.raincoat=()=>{let n=new de;n.add(Nt(bi(1.7,.24,2.2,.1),Wn(5214164,.85),0,.12,0)),n.add(Nt(bi(1.1,.05,.4,.02),Kt(16776947,.5),0,.27,.5));let t=Nt(new _i(.42,24,12,0,Math.PI*2,0,Math.PI/2),Wn(13624575,.9),0,.24,-.5);return t.scale.set(1,.45,1),n.add(t),n.add(Nt(bi(.38,.05,.38,.02),Kt(13121594,.5),-.5,.27,-.6)),n};je.bottle=()=>{let n=new de,t=[[0,0],[.42,0],[.5,.06],[.52,.2],[.52,1.35],[.45,1.65],[.22,1.9],[.2,2.05],[0,2.05]].map(s=>new it(s[0],s[1]));n.add(Nt(new ss(t,40),Wn(12047514,.55),0,0,0));let e=[[0,.04],[.4,.04],[.48,.12],[.48,1.3],[.4,1.58],[0,1.6]].map(s=>new it(s[0],s[1]));n.add(Nt(new ss(e,32),Kt(9414730,.4),0,0,0)),n.add(Nt($e(.235,.235,.18,24),Kt(4162640,.4),0,2.12,0));let i=Nt(new mi(.535,.535,.66,40,1,!0),Kt(16776947,.55),0,.85,0);return i.material.side=We,n.add(i),n.add(Nt(new mi(.54,.54,.16,40,1,!0),Kt(4162640,.5),0,.85,0)),n};je.eggs=()=>{let n=new de;n.add(Nt(bi(2,.34,1.3,.1),Kt(12168850,.9),0,.17,0));for(let e=0;e<3;e++)for(let i=0;i<2;i++){let s=Nt(new _i(.3,24,16),Kt(14725763,.55),-.66+e*.66,.46,-.32+i*.64);s.scale.set(1,1.28,1),n.add(s)}let t=new de;return t.add(Nt(bi(2,.14,1.3,.06),Kt(12168850,.9),0,0,.65)),t.position.set(0,.34,-.65),t.rotation.x=-1.25,n.add(t),n};var Ub=Object.keys(je),Qd={umbrella:{h:3,cy:3.2},bento:{h:3,w:3.1,cy:5.8,rot:-.4},milk:{h:2.5,cy:3.4},can:{h:2.2,cy:3.4},noodle:{h:2,cy:3.8},onigiri:{h:2.3,cy:3.2,rot:-.3},sandwich:{h:3,w:2.9,cy:5.4,rot:-.5},salad:{h:3,w:2.8,cy:4.8},ice:{h:1.9,cy:3.8},raincoat:{h:3,w:2.9,cy:6.2,rot:-.5},bottle:{h:2.9,cy:3.4},eggs:{h:3,w:2.9,cy:5.6,rot:-.45},umbrellaClosed:{h:2.6,cy:3.4}};function ba(n,t=2,e){let i=je[n]?je[n]():je.bento(),s=new de;s.add(i);let r=new oi().setFromObject(i),a=r.getSize(new R),o=Math.min(t/Math.max(a.y,1e-4),(e||t*2.2+.6)/Math.max(a.x,a.z,1e-4));i.scale.setScalar(o),r.setFromObject(i);let l=r.getCenter(new R);return i.position.x-=l.x,i.position.z-=l.z,i.position.y-=r.min.y,s.userData.height=t,s.userData.fitH=new oi().setFromObject(s).getSize(new R).y,s}function tf(n,{size:t=420}={}){let e={},i=new hs({antialias:!0,alpha:!0,preserveDrawingBuffer:!0});i.setPixelRatio(1),i.setSize(t,t,!1),i.setClearColor(0,0),i.toneMapping=en,i.toneMappingExposure=1.05,i.shadowMap.enabled=!0,i.shadowMap.type=tn;let s=new ji,r=new xn(i);s.environment=r.fromScene(new us,.04).texture,s.environmentIntensity=.9;let a=new Qi(16774112,2.2);a.position.set(3,6,4),a.castShadow=!0,a.shadow.mapSize.set(1024,1024),a.shadow.camera.left=-3,a.shadow.camera.right=3,a.shadow.camera.top=3,a.shadow.camera.bottom=-3,a.shadow.radius=6,a.shadow.bias=-4e-4,s.add(a);let o=new Qi(12374783,1.1);o.position.set(-4,3,-3),s.add(o);let l=new Qt(new xi(14,14),new Xs({opacity:.28}));l.rotation.x=-Math.PI/2,l.receiveShadow=!0,s.add(l);let c=new Oe(24,1,.1,60);c.position.set(4.6,3.4,6.4),c.lookAt(0,1,0),s.add(c);for(let{id:h,model:f}of n){let u=Qd[f]||{h:2.1,cy:3.4},d=ba(f,u.h,u.w);d.rotation.y=u.rot??-.5,s.add(d),c.position.set(4.6,u.cy,6.4),c.lookAt(0,Math.min(d.userData.fitH*.5,1.2),0),i.render(s,c),e[h]=i.domElement.toDataURL("image/png"),s.remove(d)}return r.dispose(),i.dispose(),i.forceContextLoss(),e}var Wl=class{constructor(t){this.canvas=t,this.renderer=new hs({canvas:t,antialias:!0,alpha:!0}),this.renderer.setClearColor(0,0),this.renderer.toneMapping=en,this.renderer.toneMappingExposure=1.05,this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=tn,this.scene=new ji;let e=new xn(this.renderer);this.scene.environment=e.fromScene(new us,.04).texture,this.scene.environmentIntensity=.95,e.dispose();let i=new Qi(16774112,2.2);i.position.set(3,6,4),i.castShadow=!0,i.shadow.mapSize.set(1024,1024),i.shadow.camera.left=-3,i.shadow.camera.right=3,i.shadow.camera.top=3,i.shadow.camera.bottom=-3,i.shadow.radius=6,i.shadow.bias=-4e-4,this.scene.add(i);let s=new Qi(12374783,1);s.position.set(-4,3,-3),this.scene.add(s);let r=new Qt(new xi(14,14),new Xs({opacity:.22}));r.rotation.x=-Math.PI/2,r.receiveShadow=!0,this.scene.add(r),this.cam=new Oe(26,1,.1,60),this.cam.position.set(4.6,3.2,6.4),this.cam.lookAt(0,1,0),this.current=null,this.spin=0,this.running=!1,this.speed=.35,this._tick=this._tick.bind(this)}set(t){this.current&&this.scene.remove(this.current);let e=Qd[t]||{h:2.1,cy:3.4};this.current=ba(t,e.h,e.w),this.scene.add(this.current),this.current.rotation.y=this.spin,this.cam.position.set(4.6,e.cy,6.4),this.cam.lookAt(0,Math.min(this.current.userData.fitH*.5,1.2),0)}resize(){let t=this.canvas.clientWidth,e=this.canvas.clientHeight;if(!t||!e)return;let i=Math.min(window.devicePixelRatio||1,2);this.renderer.setPixelRatio(i),this.renderer.setSize(t,e,!1),this.cam.aspect=t/e,this.cam.updateProjectionMatrix()}start(){this.running||(this.running=!0,this.last=performance.now(),requestAnimationFrame(this._tick))}stop(){this.running=!1}_tick(t){if(!this.running)return;let e=Math.min(.05,(t-this.last)/1e3);this.last=t,this.spin+=e*this.speed,this.current&&(this.current.rotation.y=this.spin),this.renderer.render(this.scene,this.cam),requestAnimationFrame(this._tick)}dispose(){this.running=!1,this.renderer.dispose(),this.renderer.forceContextLoss()}};var Ne=window.gsap,Qe=(n=0,t=0,e=0)=>new R(n,t,e),Li=n=>new Ft(n),Gi=(n,t,e)=>n+(t-n)*e,Si={clay:15328722,clayDk:13354670,clayLt:16184292,navy:924992,navyHi:1781862,navyMid:1254479,steel:8293544,lamp:16761963,cold:12572415,floorN:2834553,floorD:11117967},di={bg:330525,fog:.014,hemiSky:5929160,hemiGnd:725542,hemiI:.38,key:10139391,keyI:.8,env:.18,emis:1,bloom:.5,thr:.74,rain:1,ground:462630,pave:1318725,edge:.34,lampI:1,exposure:1},U_={bg:14473412,fog:.006,hemiSky:16774882,hemiGnd:12038298,hemiI:.5,key:16773336,keyI:1.5,env:.35,emis:.5,bloom:.08,thr:.92,rain:.32,ground:13815481,pave:12894118,edge:.16,lampI:.25,exposure:.9},ef={bg:1779792,fog:.011,hemiSky:10335999,hemiGnd:2761792,hemiI:.55,key:16759178,keyI:1.9,env:.3,emis:.85,bloom:.5,thr:.78,rain:.5,ground:1384261,pave:2305370,edge:.28,lampI:.7,exposure:1},$l={hero:{pos:[21.4,11.2,22.8],target:[0,.7,.3],fov:25},wide:{pos:[17.4,12.4,19.2],target:[0,.4,.7],fov:27},orbitL:{pos:[-12,8.6,15.5],target:[.4,.8,0],fov:27},top:{pos:[1.5,20,5.6],target:[0,0,0],fov:28},door:{pos:[3.4,3.8,10.2],target:[-5.2,1.1,2.1],fov:25},cooler:{pos:[3.6,3.2,8.2],target:[-2.2,1.3,-3.6],fov:27},register:{pos:[10.5,4.2,6.5],target:[3.6,1,-2.2],fov:25},night:{pos:[25.6,11.6,24.6],target:[-.2,.9,0],fov:27}};function Et(n,t,e,i,s=0,r=0,a=0,{edge:o=!1,cast:l=!0,rcv:c=!0,r:h=0}={}){let f=h?new ds(n,t,e,2,h):new hi(n,t,e),u=new Qt(f,i);return u.position.set(s,r,a),u.castShadow=l,u.receiveShadow=c,u.userData.edge=o,u}function F_(n,t,e,i,s=0,r=0,a=0,o=24){let l=new Qt(new mi(n,t,e,o),i);return l.position.set(s,r,a),l.castShadow=!0,l.receiveShadow=!0,l}function O_(){let n=document.createElement("canvas");n.width=n.height=256;let t=n.getContext("2d"),e=4,i=256/e;for(let r=0;r<e;r++)for(let a=0;a<e;a++)t.fillStyle=(r+a)%2?"#ffffff":"#e9e9ef",t.fillRect(r*i,a*i,i,i);t.strokeStyle="rgba(0,0,0,.14)",t.lineWidth=2;for(let r=0;r<=e;r++)t.beginPath(),t.moveTo(r*i,0),t.lineTo(r*i,256),t.stroke(),t.beginPath(),t.moveTo(0,r*i),t.lineTo(256,r*i),t.stroke();let s=new Vs(n);return s.wrapS=s.wrapT=Ns,s.colorSpace=qe,s.anisotropy=8,s}function Xl(n,t,e,i="#0b1226"){let s=document.createElement("canvas");s.width=512,s.height=192;let r=s.getContext("2d");r.fillStyle=i,r.fillRect(0,0,512,192),r.strokeStyle=e,r.lineWidth=6,r.strokeRect(10,10,492,172),r.shadowColor=e,r.shadowBlur=22,r.fillStyle=e,r.textAlign="center",r.textBaseline="middle",r.font='700 112px "Bodoni 72","Bodoni Moda",serif',r.fillText(n,256,84),r.font='700 30px "Helvetica Neue",sans-serif',r.fillText(t,256,152);let a=new Vs(s);return a.colorSpace=qe,a}var ql=class{constructor(t,{quality:e=1}={}){this.canvas=t,this.paused=!1,this.k=0,this.driftAmp=0,this.t=0,this.pins=[],this.bays={},this.hoverCb=null,this.pickCb=null,this._pointer=new it(0,0),this._pt=new it(0,0),this._uiShift=0,this._frameCbs=new Set,this._dpr=Math.min(window.devicePixelRatio||1,1.6),this._quality=e;let i=this.renderer=new hs({canvas:t,antialias:!1,powerPreference:"high-performance",alpha:!1});i.setPixelRatio(this._dpr),i.shadowMap.enabled=!0,i.shadowMap.type=tn,i.toneMapping=en,i.toneMappingExposure=1,i.outputColorSpace=qe;let s=this.scene=new ji;s.background=Li(di.bg),s.fog=new Tr(di.bg,di.fog);let r=new xn(i);s.environment=r.fromScene(new us,.04).texture,r.dispose(),s.environmentIntensity=di.env,this.cam=new Oe(26,1,.5,200),this.camState={pos:Qe(...$l.hero.pos),target:Qe(...$l.hero.target),fov:$l.hero.fov,yaw:0},this._applyCam(),this._lights(),this._build(),this._rain(),this._post(),this.resize(),this._pick(),this.applyMood(0),this._loop=this._loop.bind(this),this._last=performance.now(),requestAnimationFrame(this._loop),this._fpsAcc=0,this._fpsN=0,this._onResize=()=>this.resize(),window.addEventListener("resize",this._onResize),this._beat=setInterval(()=>{document.hidden&&this.step(performance.now())},120),window.addEventListener("pointermove",a=>{this._pointer.set(a.clientX/innerWidth*2-1,-(a.clientY/innerHeight*2-1))})}_lights(){let t=this.scene;this.hemi=new Yr(di.hemiSky,di.hemiGnd,di.hemiI),t.add(this.hemi);let e=this.key=new Qi(di.key,di.keyI);e.position.set(-8,16,12),e.castShadow=!0,e.shadow.mapSize.set(2048,2048),Object.assign(e.shadow.camera,{left:-12,right:12,top:12,bottom:-12,near:2,far:50}),e.shadow.bias=-3e-4,e.shadow.normalBias=.03,e.shadow.radius=5,t.add(e),t.add(e.target),this.lamps=[];let i=(s,r,a,o,l,c)=>{let h=new rs(o,l,c,1.6);return h.position.set(s,r,a),h.userData.base=l,t.add(h),this.lamps.push(h),h};i(-1.2,2.7,-.6,16773590,4.2,13),i(3.6,2.5,-2.2,16761963,2.4,9),i(-3.8,2.4,2.4,16769712,1.6,8),i(8.6,4.2,-2.6,16761963,7,16)}_mats(){let t=this.M={},e=(s,r=.7,a=0)=>new De({color:s,roughness:r,metalness:a});t.clay=e(Si.clay,.78),t.clayLt=e(Si.clayLt,.7),t.clayDk=e(Si.clayDk,.8),t.navy=e(Si.navy,.55),t.navyHi=e(Si.navyHi,.5),t.navyMid=e(Si.navyMid,.6),t.steel=e(12041676,.35,.7),this.floorTex=O_(),this.floorTex.repeat.set(12,8),t.floor=new De({color:Si.floorN,roughness:.34,metalness:.08,map:this.floorTex}),t.ground=new De({color:di.ground,roughness:.22,metalness:.55}),t.paving=new De({color:di.pave,roughness:.55,metalness:.15}),t.glass=new Ln({color:13624063,roughness:.05,metalness:0,transparent:!0,opacity:.16,depthWrite:!1,side:We}),this.emis=[];let i=(s,r,a)=>{let o=new De({color:1118481,emissive:s,emissiveIntensity:r,roughness:.4});return o.userData.base=r,this.emis.push(o),o};t.coolW=i(13624319,1.55),t.warmW=i(16773327,2.1),t.amber=i(16758874,2.4),t.coldBlue=i(10470399,1.6),t.vend=i(12574975,1.7),t.lampHead=i(16766090,3.2),t.edge=new Cn({color:16776947,transparent:!0,opacity:.34,depthWrite:!1}),t.heatOk=new ni({color:8380590,transparent:!0,opacity:0,depthWrite:!1,blending:yi})}_build(){this._mats();let t=this.M,e=this.root=new de;this.scene.add(e),this.structural=[];let i=(l,c=e)=>(c.add(l),l.userData.edge&&this.structural.push(l),l),s=new Qt(new pn(60,64),t.ground);s.rotation.x=-Math.PI/2,s.position.y=-.41,s.receiveShadow=!0,e.add(s),this.ground=s;let r=Et(24,.2,3.2,t.paving,0,-.31,6.4,{});r.receiveShadow=!0,e.add(r);let a=Et(3,.2,18,t.paving,9.2,-.31,-.4,{});e.add(a),i(Et(12.6,.42,8.6,t.clay,0,-.21,0,{edge:!0}));let o=new Qt(new xi(12.2,8.2),t.floor);o.rotation.x=-Math.PI/2,o.position.y=.012,o.receiveShadow=!0,e.add(o),this.floor=o,i(Et(12.6,3.5,.3,t.clay,0,1.75,-4.15,{edge:!0})),i(Et(.3,3.5,8.6,t.clay,-6.15,1.75,0,{edge:!0})),i(Et(12.2,.16,.12,t.navy,0,.08,-3.97)),i(Et(.12,.16,8.2,t.navy,-5.97,.08,0)),e.add(Et(12,.07,.07,t.warmW,0,3.28,-3.94,{cast:!1})),e.add(Et(.07,.07,8,t.warmW,-5.94,3.28,0,{cast:!1})),this.ceilBars=[],[[-2.8,-1.2],[.4,-1.2],[3.6,-1.2],[-2.8,1.9],[.4,1.9],[3.6,1.9]].forEach(([l,c])=>{let h=Et(2.3,.07,.34,t.warmW,l,3.05,c,{cast:!1});e.add(h),this.ceilBars.push(h),[-.9,.9].forEach(f=>e.add(Et(.025,.7,.025,t.steel,l+f,3.45,c,{cast:!1})))}),this._coolers(i),this._counter(i),this._gondolas(i),this._leftWall(i),this._freezer(i),this._entrance(i),this._street(i),this._buildShelfInstances(),this._edges(),this._beacon(),this._scanner(),this._heat(),this.addVirtualBay("SKY",Qe(3.2,3.6,-1.2),"\u5929\u6C17")}_edges(){let t=this.edgeGroup=new de;for(let e of this.structural){let i=new Rn(new ts(e.geometry,28),this.M.edge);i.position.copy(e.position),i.rotation.copy(e.rotation),i.scale.copy(e.scale),t.add(i)}this.root.add(t)}_coolers(t){let e=this.M;this.coolerDefs=[{code:"C-01",x0:-5.7,x1:-2.65,label:"\u51B7\u8535\u30B1\u30FC\u30B9\uFF08\u5F01\u5F53\u30FB\u304A\u306B\u304E\u308A\uFF09"},{code:"C-02",x0:-2.55,x1:-.35,label:"\u51B7\u8535\u30B1\u30FC\u30B9\uFF08\u4E73\u88FD\u54C1\uFF09"},{code:"C-03",x0:-.25,x1:2.05,label:"\u51B7\u8535\u30B1\u30FC\u30B9\uFF08\u30B5\u30E9\u30C0\uFF09"}];let i=-3.55;for(let s of this.coolerDefs){let r=s.x1-s.x0,a=(s.x0+s.x1)/2;t(Et(r,2.55,.9,e.clayLt,a,1.27,i-.05,{edge:!0})),this.root.add(Et(r-.1,2,.04,e.coolW,a,1.3,i-.5,{cast:!1})),this.root.add(Et(r,.16,.92,e.navy,a,.08,i-.04)),this.root.add(Et(r,.2,.94,e.navyHi,a,2.5,i-.03)),this.root.add(Et(r-.2,.05,.06,e.coolW,a,2.5,i+.45,{cast:!1}));for(let h=0;h<4;h++)this.root.add(Et(r-.1,.035,.62,e.steel,a,.34+h*.5,i-.18,{cast:!1}));let o=Math.max(2,Math.round(r/.95)),l=r/o;for(let h=0;h<o;h++){let f=s.x0+l*(h+.5);this.root.add(Et(l-.03,2.05,.03,e.glass,f,1.28,i+.5,{cast:!1,rcv:!1})),this.root.add(Et(.045,.9,.05,e.steel,f+(h%2?-1:1)*(l/2-.1),1.3,i+.55,{cast:!1})),this.root.add(Et(.025,2.05,.05,e.steel,s.x0+l*h,1.28,i+.5,{cast:!1}))}this.root.add(Et(.025,2.05,.05,e.steel,s.x1,1.28,i+.5,{cast:!1}));let c=Et(r,2.4,.9,new ni({visible:!1}),a,1.25,i,{cast:!1,rcv:!1});this._bay(s.code,s.label,c,{anchor:Qe(a,2.85,i+.3)})}}_counter(t){let e=this.M;t(Et(3.5,1.02,1,e.navyHi,4.15,.51,-2.55,{edge:!0})),this.root.add(Et(3.7,.08,1.2,e.clayLt,4.15,1.06,-2.55)),this.root.add(Et(.5,.34,.4,e.navy,5.15,1.27,-2.6)),this.root.add(Et(.46,.28,.03,e.coldBlue,5.15,1.43,-2.4,{cast:!1}));let i=new de;i.position.set(2.95,1.1,-2.55),i.add(Et(1.1,.78,.7,e.amber,0,.4,0,{cast:!1})),i.add(Et(1.14,.04,.74,e.steel,0,.8,0,{cast:!1})),i.add(Et(1.12,.72,.04,e.glass,0,.4,.36,{cast:!1,rcv:!1})),this.root.add(i);let s=Et(1.2,.9,.8,new ni({visible:!1}),2.95,1.55,-2.55,{cast:!1,rcv:!1});this._bay("D-01","\u30DB\u30C3\u30C8\u30A6\u30A9\u30FC\u30DE\u30FC\uFF08\u30EC\u30B8\u6A2A\uFF09",s,{anchor:Qe(2.95,2.2,-2.2)}),t(Et(3.5,1.9,.18,e.clayDk,4.15,1.75,-3.94,{edge:!0}));for(let r=0;r<5;r++)for(let a=0;a<14;a++){let o=[16777215,13121594,2971576,2764602,15320170][(r*3+a)%5];this.root.add(Et(.2,.14,.05,new De({color:o,roughness:.6}),2.6+a*.245,1.18+r*.3,-3.82,{cast:!1}))}this.root.add(Et(3.4,.4,.08,e.navy,4.15,3.05,-3.9,{cast:!1})),this.root.add(Et(3,.05,.04,e.warmW,4.15,2.92,-3.82,{cast:!1}))}_gondolas(t){let e=this.M;this.gondolas=[{z:-1.05,codes:["B-01","B-02","B-03","B-04"]},{z:1.65,codes:["B-05","B-06","B-07","B-08"]}];let i=-3.2,s=5.2,r=s/4;for(let a of this.gondolas){t(Et(s,.22,1.15,e.navy,i+s/2,.11,a.z,{edge:!0})),t(Et(s,1.7,.08,e.clayLt,i+s/2,1.07,a.z,{edge:!0}));for(let o=0;o<3;o++)for(let l of[-1,1])this.root.add(Et(s,.04,.48,e.clayLt,i+s/2,.42+o*.5,a.z+l*.28,{cast:!1}));[i,i+s].forEach(o=>this.root.add(Et(.06,1.7,1.15,e.clay,o,1.07,a.z,{cast:!1}))),this.root.add(Et(s,.05,.06,e.warmW,i+s/2,1.94,a.z+.55,{cast:!1})),a.codes.forEach((o,l)=>{let c=i+r*(l+.5),h=Et(r-.04,1.8,1.15,new ni({visible:!1}),c,1.05,a.z,{cast:!1,rcv:!1});this._bay(o,o==="B-02"?"\u4E2D\u592E\u68DA\uFF08\u5373\u5E2D\u9EBA\uFF09":"\u4E2D\u592E\u68DA",h,{anchor:Qe(c,2.35,a.z)})})}}_leftWall(t){let e=this.M,i=new de;i.position.set(-5.35,0,2.7),i.add(Et(.8,.14,1.5,e.navy,0,.07,0,{edge:!0})),i.add(Et(.06,1.5,1.5,e.clayLt,-.37,.82,0,{edge:!0})),i.add(Et(.8,.04,1.5,e.steel,0,1,0,{cast:!1})),this.root.add(i),this.umbrellas=[];let s=ba("umbrellaClosed",1.5);for(let l=0;l<30;l++){let c=s.clone(!0),h=l%10,f=Math.floor(l/10);c.position.set(-5.35+.18+f*.26,.13,2.7-.64+h*.14),c.rotation.z=-.05-.05*f,c.traverse(u=>{u.castShadow=!0}),this.root.add(c),this.umbrellas.push(c)}let r=Et(1,1.8,1.6,new ni({visible:!1}),-5.35,.95,2.7,{cast:!1,rcv:!1});this._bay("A-03","\u5098\u30B9\u30BF\u30F3\u30C9\uFF08\u5165\u53E3\u6A2A\uFF09",r,{anchor:Qe(-5.35,2.15,2.7),kind:"umbrella"}),t(Et(.1,1.3,1.5,e.clayLt,-5.9,1.5,1,{edge:!0})),this.raincoats=[];let a=ba("raincoat",.55);for(let l=0;l<12;l++){let c=a.clone(!0);c.scale.setScalar(.14),c.rotation.set(0,0,Math.PI/2),c.position.set(-5.78,1.1+Math.floor(l/6)*.55,.35+l%6*.26),c.traverse(h=>{h.castShadow=!0}),this.root.add(c),this.raincoats.push(c)}let o=Et(.6,1.5,1.6,new ni({visible:!1}),-5.7,1.5,1,{cast:!1,rcv:!1});this._bay("A-04","\u30EC\u30A4\u30F3\u30B0\u30C3\u30BA\uFF08\u5165\u53E3\u6A2A\uFF09",o,{anchor:Qe(-5.6,2.55,1),kind:"raincoat"}),t(Et(.5,1.9,2.4,e.clayLt,-5.75,.97,-1.7,{edge:!0}));for(let l=0;l<4;l++)this.root.add(Et(.52,.04,2.4,e.steel,-5.72,.3+l*.45,-1.7,{cast:!1}));this.root.add(Et(.06,.5,3.6,e.navy,-5.96,2.88,-.3,{cast:!1})),this.root.add(Et(.04,.05,3.2,e.warmW,-5.92,2.68,-.3,{cast:!1}))}_freezer(t){let e=this.M;t(Et(2.3,.82,1,e.clayLt,4.5,.41,2,{edge:!0})),this.root.add(Et(2.1,.02,.82,e.coldBlue,4.5,.82,2,{cast:!1})),this.root.add(Et(2.2,.05,.9,e.glass,4.5,.9,2,{cast:!1,rcv:!1})),this.root.add(Et(2.3,.1,1.02,e.navy,4.5,.05,2));let i=Et(2.3,1.1,1,new ni({visible:!1}),4.5,.6,2,{cast:!1,rcv:!1});this._bay("F-01","\u51B7\u51CD\u30B1\u30FC\u30B9\uFF08\u30A2\u30A4\u30B9\uFF09",i,{anchor:Qe(4.5,1.7,2)})}_entrance(t){let e=this.M;this.root.add(Et(2.1,.02,1.1,e.navyHi,-3.2,.025,3.55,{cast:!1})),[-4.25,-2.15].forEach(i=>this.root.add(Et(.1,.14,.1,e.navy,i,.07,4.05,{cast:!1}))),this.signMats={closed:new De({color:2236962,map:Xl("CLOSED","\u9589\u5E97","#8fa8e8"),emissive:16777215,emissiveMap:Xl("CLOSED","\u9589\u5E97","#8fa8e8"),emissiveIntensity:.8}),open:new De({color:2236962,map:Xl("OPEN","\u55B6\u696D\u4E2D","#ffc46b"),emissive:16777215,emissiveMap:Xl("OPEN","\u55B6\u696D\u4E2D","#ffc46b"),emissiveIntensity:2.2})},this.sign=new Qt(new xi(1.5,.56),this.signMats.closed),this.sign.position.set(-5.9,2.55,4-1.1),this.sign.rotation.y=Math.PI/2,this.root.add(this.sign),this._open=!1}_street(t){let e=this.M,i=new de;i.position.set(8.6,0,2.4),i.rotation.y=-.55,i.add(Et(1,1.95,.8,e.clayLt,0,.97,0,{})),i.add(Et(.82,1.1,.04,e.vend,0,1.32,.41,{cast:!1}));for(let r=0;r<2;r++)for(let a=0;a<5;a++)i.add(Et(.11,.26,.05,new De({color:[13121594,2971576,4162640,15320170,15921906][(r+a*2)%5],roughness:.5}),-.33+a*.165,1.6-r*.4,.44,{cast:!1}));i.add(Et(.82,.22,.04,e.navy,0,.5,.41,{cast:!1})),this.root.add(i),((r,a,o)=>{let l=new de;l.position.set(r,0,a),l.rotation.y=o,l.add(F_(.06,.09,4.4,e.steel,0,2.2,0,12));let c=Et(1.1,.06,.06,e.steel,.5,4.35,0,{});l.add(c),l.add(Et(.5,.12,.3,e.lampHead,1,4.28,0,{cast:!1})),this.root.add(l)})(8.6,-3,0)}_bay(t,e,i,{anchor:s,kind:r}={}){this.root.add(i);let a=new oi().setFromObject(i),o=a.getCenter(Qe()),l=a.getSize(Qe());this.bays[t]={code:t,label:e,hit:i,center:o,size:l,anchor:s||Qe(o.x,a.max.y+.3,o.z),fill:1,kind:r||null,heat:null,instances:[]},i.userData.bay=t}addVirtualBay(t,e,i=""){this.bays[t]={code:t,label:i,hit:null,center:e.clone(),size:Qe(1,1,1),anchor:e.clone(),fill:1,virtual:!0,heat:null}}_buildShelfInstances(){let t=(d,g,v,m=.02)=>new ds(d,g,v,2,Math.min(m,d/2-.001,g/2-.001,v/2-.001)),e=(d,g,v,m=14)=>new mi(d,g,v,m),i=(d,g=.6)=>new De({color:d,roughness:g}),s=(d,g)=>{let v=new mi(d,d,g,3);return v.rotateX(-Math.PI/2),v},r={bento:[{g:t(.5,.09,.36,.03),m:i(1583701,.45),y:.045},{g:t(.46,.05,.32,.02),m:i(16776947,.5),y:.1}],onigiri:[{g:s(.13,.1),m:i(16316138,.8),y:.12},{g:t(.2,.07,.104,.01),m:i(988962,.55),y:.04}],sandwich:[{g:e(.15,.15,.06,3),m:i(14265963,.7),y:.03,rx:0},{g:e(.13,.13,.04,3),m:i(16241738,.6),y:.07}],salad:[{g:e(.12,.1,.09,18),m:i(8369002,.6),y:.045},{g:e(.125,.125,.02,18),m:i(15266544,.3),y:.1}],milk:[{g:t(.1,.2,.1,.01),m:i(16776947,.5),y:.1},{g:t(.102,.07,.102,.005),m:i(2971576,.5),y:.07}],eggs:[{g:t(.22,.07,.15,.02),m:i(14725763,.7),y:.035}],coffee:[{g:e(.04,.04,.12,14),m:i(3875606,.35),y:.06},{g:e(.0415,.0415,.04,14),m:i(14132814,.35),y:.06}],bottle:[{g:e(.04,.04,.2,12),m:i(11061647,.3),y:.1},{g:e(.02,.02,.04,10),m:i(4162640,.4),y:.22}],noodle:[{g:e(.075,.055,.1,16),m:i(13780267,.5),y:.05},{g:e(.078,.078,.01,16),m:i(16776947,.5),y:.105}],ice:[{g:e(.06,.045,.07,16),m:i(15907016,.5),y:.035},{g:e(.062,.062,.01,16),m:i(16776947,.5),y:.075}],snackA:[{g:t(.16,.22,.06,.01),m:i(16184292,.6),y:.11}],snackB:[{g:t(.16,.22,.06,.01),m:i(8293544,.6),y:.11}],snackC:[{g:t(.16,.22,.06,.01),m:i(1781862,.55),y:.11}],snackD:[{g:t(.16,.22,.06,.01),m:i(14977596,.6),y:.11}],drinkB:[{g:e(.04,.04,.2,12),m:i(2971576,.3),y:.1}],drinkR:[{g:e(.04,.04,.2,12),m:i(13121594,.3),y:.1}]};this._kinds={};for(let[d,g]of Object.entries(r))this._kinds[d]={parts:g,mats:[],bay:[]};let a=(d,g,v,m,p,b=0)=>{let E=this._kinds[d];E.mats.push(new he().compose(Qe(v,m,p),new Ti().setFromEuler(new Ai(0,b,0)),Qe(1,1,1))),E.bay.push(g)},o=(d,g,v,m,p,b,E,y=0)=>{for(let w=v;w<=m+1e-6;w+=E)a(d,g,w,p,b,y)},l=(d,g,v,m,p,b,E,y=0)=>{for(let w=v;w<=m+1e-6;w+=E)a(d,g,b,p,w,y)},c=-3.58;o("bento","C-01",-5.4,-2.95,.36,c,.56),o("bento","C-01",-5.4,-2.95,.36,c+0,.56),o("bento","C-01",-5.4,-2.95,.86,c,.56),o("onigiri","C-01",-5.5,-2.9,1.36,c,.29),o("sandwich","C-01",-5.5,-2.9,1.86,c,.4),o("milk","C-02",-2.4,-.5,.36,c,.13),o("milk","C-02",-2.4,-.5,.86,c,.13),o("milk","C-02",-2.4,-.5,1.36,c,.13),o("eggs","C-02",-2.35,-.55,1.86,c,.27),o("salad","C-03",-.1,1.9,.36,c,.28),o("salad","C-03",-.1,1.9,.86,c,.28),o("snackC","C-03",-.1,1.9,1.36,c,.22),o("drinkB","C-03",-.1,1.9,1.86,c,.1),o("coffee","D-01",2.55,3.35,1.12,-2.55,.1),o("coffee","D-01",2.55,3.35,1.12,-2.35,.1),o("bottle","D-01",2.55,3.35,1.5,-2.55,.12);let h=-3.2,f=1.3,u=["snackA","snackB","snackC","snackD","drinkB","drinkR"];for(let d of this.gondolas)d.codes.forEach((g,v)=>{let m=h+f*v+.12,p=h+f*(v+1)-.12;for(let b=0;b<3;b++)for(let E of[-1,1]){let y=.44+b*.5,w=d.z+E*.28;g==="B-02"?o("noodle",g,m+.04,p-.04,y,w,.17):o(u[(v+b+(E>0?2:0))%u.length],g,m,p,y,w,.2)}});for(let d=0;d<4;d++)l(u[d%4],"A-01",-2.8,-.6,.32+d*.45,-5.72,.22);for(let d=0;d<8;d++)for(let g=0;g<3;g++)a("ice","F-01",3.6+d*.25,.84,1.65+g*.3);this.instMeshes=[];for(let[d,g]of Object.entries(this._kinds))g.mats.length&&(g.parts.forEach(v=>{let m=new Qn(v.g,v.m,g.mats.length);m.castShadow=!0,m.receiveShadow=!0,m.frustumCulled=!1,g.mats.forEach((p,b)=>{let E=p.clone();E.elements[13]+=v.y,m.setMatrixAt(b,E)}),m.instanceMatrix.needsUpdate=!0,m.userData={kind:d,part:v},this.root.add(m),this.instMeshes.push(m),(g.ims||(g.ims=[])).push(m)}),g.orig=g.mats.map(v=>v.clone()));this._bayKinds={};for(let[d,g]of Object.entries(this._kinds))g.bay.forEach((v,m)=>{((this._bayKinds[v]||(this._bayKinds[v]={}))[d]||(this._bayKinds[v][d]=[])).push(m)})}setFill(t,e,i=0){let s=this.bays[t];if(!s)return;let r=a=>{if(s.fill=a,s.kind==="umbrella"){let o=Math.round(a*this.umbrellas.length);this.umbrellas.forEach((l,c)=>l.visible=c<o)}else if(s.kind==="raincoat"){let o=Math.round(a*this.raincoats.length);this.raincoats.forEach((l,c)=>l.visible=c<o)}else{let o=this._bayKinds[t];if(!o)return;let l=this.PRIMARY[t];for(let[c,h]of Object.entries(o)){if(l&&!l.includes(c))continue;let f=this._kinds[c],u=Math.round(a*h.length),d=new he().makeScale(0,0,0);f.ims.forEach((g,v)=>{let m=f.parts[v];h.forEach((p,b)=>{if(b<u){let E=f.orig[p].clone();E.elements[13]+=m.y,g.setMatrixAt(p,E)}else g.setMatrixAt(p,d)}),g.instanceMatrix.needsUpdate=!0})}}};if(!i){r(e);return}Ne.killTweensOf(s,"fill"),Ne.to(s,{fill:e,duration:i,ease:"power2.inOut",onUpdate:()=>r(s.fill)})}get PRIMARY(){return this._primary||(this._primary={"C-01":["bento"],"B-02":["noodle"],"D-01":["coffee"],"F-01":["ice"],"C-02":["milk"],"C-03":["salad"]})}_beacon(){let t=this.beacon=new de;t.visible=!1;let e=new Ae({transparent:!0,depthWrite:!1,blending:yi,side:We,uniforms:{uT:{value:0},uC:{value:Li(Si.lamp)},uO:{value:0}},vertexShader:"varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",fragmentShader:`varying vec2 vUv;uniform float uT,uO;uniform vec3 uC;
        void main(){float a=pow(1.-vUv.y,1.6)*(.55+.45*sin(uT*3.+vUv.y*10.));
          float e=smoothstep(0.,.18,vUv.x)*smoothstep(1.,.82,vUv.x);gl_FragColor=vec4(uC,a*.5*uO*(.4+.6*e));}`});this._beaconMat=e;let i=new Qt(new mi(.34,.5,4.2,32,1,!0),e);i.position.y=2.1,t.add(i);let s=new ni({color:Si.lamp,transparent:!0,opacity:0,depthWrite:!1,blending:yi,side:We});this._ringMat=s;let r=new Qt(new Wr(.55,.62,64),s);r.rotation.x=-Math.PI/2,r.position.y=.03,t.add(r),this._ring=r;let a=r.clone();a.material=s,t.add(a),this._ring2=a;let o=new Cn({color:924992,transparent:!0,opacity:0,depthWrite:!1});this._hoverMat=o,this._hoverHalo=new Rn(new ts(new hi(1,1,1)),o),this._hoverHalo.visible=!1,this.root.add(this._hoverHalo);let l=new Cn({color:Si.lamp,transparent:!0,opacity:0,depthWrite:!1,blending:yi});this._haloMat=l;let c=new Rn(new ts(new hi(1,1,1)),l);t.add(c),this._halo=c,this.root.add(t)}locate(t,{camera:e=!0,duration:i=2.1,keep:s=!1,shot:r}={}){let a=this.bays[t];if(!a)return;this.located=t;let o=this.beacon;if(o.visible=!0,o.position.set(a.center.x,0,a.center.z),this._halo.position.set(0,a.center.y,0),this._halo.scale.set(a.size.x+.12,a.size.y+.12,a.size.z+.12),Ne.killTweensOf([this._beaconMat.uniforms.uO,this._ringMat,this._haloMat]),Ne.to(this._beaconMat.uniforms.uO,{value:1,duration:.8,ease:"power2.out"}),Ne.to(this._ringMat,{opacity:.9,duration:.6}),Ne.to(this._haloMat,{opacity:.95,duration:.5}),e){let l=Qe(a.center.x,Math.min(a.center.y,1.6)*.9+.2,a.center.z),c=r?.offset||[8.6,4.8,11.4];this.shot({pos:[l.x+c[0],l.y+c[1],l.z+c[2]],target:[l.x,l.y,l.z],fov:r?.fov||23},{duration:i})}this._emit("locate",t)}hover(t){let e=t&&this.bays[t];if(!e||e.virtual){Ne.to(this._hoverMat,{opacity:0,duration:.2,onComplete:()=>{this._hover||(this._hoverHalo.visible=!1)}});return}this._hoverHalo.visible=!0,this._hoverHalo.position.copy(e.center),this._hoverHalo.scale.set(e.size.x+.08,e.size.y+.08,e.size.z+.08),Ne.to(this._hoverMat,{opacity:.95,duration:.2})}ping(t,e=1700){this.locate(t,{camera:!1}),clearTimeout(this._pingT),this._pingT=setTimeout(()=>{this.located===t&&this.clearLocate()},e)}drift(t,e=1.5){Ne.to(this,{driftAmp:t,duration:e,ease:"power2.inOut"})}clearLocate(){this.located=null,Ne.killTweensOf([this._beaconMat.uniforms.uO,this._ringMat,this._haloMat]),Ne.to(this._beaconMat.uniforms.uO,{value:0,duration:.5}),Ne.to(this._ringMat,{opacity:0,duration:.5}),Ne.to(this._haloMat,{opacity:0,duration:.5,onComplete:()=>{this.located||(this.beacon.visible=!1)}})}_scanner(){let t=this._scanMat=new Ae({transparent:!0,depthWrite:!1,blending:yi,side:We,uniforms:{uO:{value:0},uC:{value:Li(10470399)}},vertexShader:"varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",fragmentShader:`varying vec2 vUv;uniform float uO;uniform vec3 uC;
        void main(){float a=smoothstep(0.,1.,vUv.x);a=pow(a,5.);float edge=smoothstep(.985,1.,vUv.x)*1.4;
          float g=.35+.65*smoothstep(0.,.25,vUv.y)*smoothstep(1.,.75,vUv.y);
          gl_FragColor=vec4(uC,(a*.5+edge)*uO*g);}`}),e=new Qt(new xi(2.6,3.4),t);e.rotation.y=Math.PI/2,e.position.set(-6,1.6,0),e.scale.set(8.4/2.6,1,1),e.visible=!1,this.scanSheet=e,this.root.add(e)}scan(t){let e=this.scanSheet;if(this._scanTl&&(this._scanTl.kill(),this._scanTl=null),!t){Ne.to(this._scanMat.uniforms.uO,{value:0,duration:.5,onComplete:()=>e.visible=!1});return}e.visible=!0,this._scanMat.uniforms.uO.value=0;let i=this._scanTl=Ne.timeline({repeat:-1});i.set(e.position,{x:-6}),i.to(this._scanMat.uniforms.uO,{value:1,duration:.4},0),i.to(e.position,{x:6,duration:3.6,ease:"sine.inOut"},0),i.to(this._scanMat.uniforms.uO,{value:0,duration:.5},3.1)}_heat(){this.heatMeshes=[];for(let t of Object.values(this.bays)){if(t.code==="A-01"||t.virtual)continue;let e=Math.max(.6,t.size.x*.92),i=Math.max(.5,Math.min(t.size.z,1)),s=this.M.heatOk.clone(),r=new Qt(new xi(e,i+.4),s);r.rotation.x=-Math.PI/2,r.position.set(t.center.x,.04,t.center.z+(t.size.z>1?0:.3)),r.visible=!1,this.root.add(r),t.heat=r,this.heatMeshes.push(r)}}setHeat(t,e={}){this._heatOn=t;for(let i of Object.values(this.bays)){if(!i.heat||i.virtual)continue;let s=e[i.code]??.7,r=s<.2?16738911:s<.45?16761963:8380590;i.heat.material.color.set(r),i.heat.visible=!0,Ne.to(i.heat.material,{opacity:t?.5:0,duration:.8,delay:t?Math.random()*.5:0,onComplete:()=>{t||(i.heat.visible=!1)}})}}_rain(){let e=new Float32Array(15600),i=new Float32Array(2600*2),s=new Float32Array(2600*2);for(let l=0;l<2600;l++){let c=(Math.random()-.5)*46,h=(Math.random()-.5)*40,f=Math.random();for(let u=0;u<2;u++){let d=(l*2+u)*3;e[d]=c,e[d+1]=0,e[d+2]=h,i[l*2+u]=f,s[l*2+u]=u}}let r=new Te;r.setAttribute("position",new Ye(e,3)),r.setAttribute("aSeed",new Ye(i,1)),r.setAttribute("aEnd",new Ye(s,1));let a=this._rainMat=new Ae({transparent:!0,depthWrite:!1,blending:yi,uniforms:{uTime:{value:0},uH:{value:20},uLen:{value:.9},uO:{value:1},uC:{value:Li(11126015)}},vertexShader:`attribute float aSeed,aEnd;uniform float uTime,uH,uLen;varying float vA;
        void main(){vec3 p=position;float f=mod(uTime*(17.+aSeed*8.)+aSeed*uH*3.,uH);p.y=uH-f-aEnd*uLen;p.x+=(uH-p.y)*.1+aEnd*.1;
          vA=mix(1.,.0,aEnd)*smoothstep(0.,2.,p.y+1.)*(.35+aSeed*.65);gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);}`,fragmentShader:"uniform vec3 uC;uniform float uO;varying float vA;void main(){gl_FragColor=vec4(uC,vA*uO*.55);}"}),o=this.rainMesh=new Rn(r,a);o.frustumCulled=!1,this.scene.add(o)}rain(t,e=1){this._rainLevel=this._rainLevel??{v:1},Ne.to(this._rainLevel,{v:t,duration:e,ease:"power2.inOut"})}_post(){let t=this.renderer;this.composer=new Hl(t),this.composer.addPass(new Vl(this.scene,this.cam)),this.bloom=new sr(new it(256,256),di.bloom,.9,di.thr),this.composer.addPass(this.bloom),this.composer.addPass(new Gl)}applyMood(t){this.k=t;let e=t<.5?t*2:(t-.5)*2,i=t<.5?di:ef,s=t<.5?ef:U_,r=u=>Gi(i[u],s[u],e),a=u=>Li(i[u]).lerp(Li(s[u]),e),o=a("bg");this.scene.background=o,this.scene.fog.color.copy(o),this.scene.fog.density=r("fog"),this.hemi.color.copy(a("hemiSky")),this.hemi.groundColor.copy(a("hemiGnd")),this.hemi.intensity=r("hemiI"),this.key.color.copy(a("key")),this.key.intensity=r("keyI");let l=t<.5?Gi(16,7,e):Gi(7,18,e),c=t<.5?Gi(-8,-16,e):Gi(-16,-6,e),h=t<.5?Gi(12,10,e):Gi(10,9,e);this.key.position.set(c,l,h),this.scene.environmentIntensity=r("env"),this.emis.forEach(u=>u.emissiveIntensity=u.userData.base*r("emis")),this.lamps.forEach(u=>u.intensity=u.userData.base*r("lampI")),this.bloom.strength=r("bloom"),this.bloom.threshold=r("thr"),this.renderer.toneMappingExposure=r("exposure"),this.M.ground.color.copy(a("ground")),this.M.ground.metalness=Gi(.55,.05,t),this.M.ground.roughness=Gi(.22,.8,t),this.M.floor.color.copy(Li(Si.floorN).lerp(Li(Si.floorD),Math.min(1,t*1.15))),this.M.paving.color.copy(a("pave")),this.M.paving.metalness=Gi(.15,.05,t),this.M.paving.roughness=Gi(.55,.85,t),this.M.edge.opacity=r("edge"),this.M.edge.color.copy(Li(16776947).lerp(Li(924992),Math.max(0,(t-.5)*2))),this._rainMat.uniforms.uC.value.copy(Li(11126015).lerp(Li(7308984),t)),this.rainBase=r("rain");let f=t>.6;if(this._beaconMat){let u=f?Bn:yi,d=f?15233818:Si.lamp;this._beaconMat.blending!==u&&[this._beaconMat,this._ringMat,this._haloMat].forEach(g=>{g.blending=u,g.needsUpdate=!0}),this._beaconMat.uniforms.uC.value.set(d),this._ringMat.color.set(d),this._haloMat.color.set(d)}document.documentElement.style.setProperty("--mood",t.toFixed(3))}mood(t,e=2){this._moodTween&&this._moodTween.kill();let i={v:this.k};return e?this._moodTween=Ne.to(i,{v:t,duration:e,ease:"power2.inOut",onUpdate:()=>this.applyMood(i.v)}):(this.applyMood(t),null)}setOpen(t,e=.8){t!==this._open&&(this._open=t,this.sign.material=t?this.signMats.open:this.signMats.closed)}_applyCam(){let t=this.cam,e=this.camState,i=e.pos.clone().sub(e.target),s=new Qr().setFromVector3(i);s.theta+=this._pt.x*.07+e.yaw+Math.sin(this.t*.1)*(this.driftAmp||0),s.phi=Math.max(.2,Math.min(1.45,s.phi-this._pt.y*.035)),i.setFromSpherical(s),t.position.copy(e.target).add(i),t.lookAt(e.target),t.fov!==e.fov&&(t.fov=e.fov,t.updateProjectionMatrix())}shot(t,{duration:e=2.4,ease:i="power3.inOut",delay:s=0,instant:r=!1}={}){let a=typeof t=="string"?$l[t]:t;if(!a)return null;let o=this.camState,l={px:a.pos[0],py:a.pos[1],pz:a.pos[2],tx:a.target[0],ty:a.target[1],tz:a.target[2],fov:a.fov};Ne.killTweensOf(this._camProxy||{});let c=this._camProxy={px:o.pos.x,py:o.pos.y,pz:o.pos.z,tx:o.target.x,ty:o.target.y,tz:o.target.z,fov:o.fov},h=()=>{o.pos.set(c.px,c.py,c.pz),o.target.set(c.tx,c.ty,c.tz),o.fov=c.fov};return r?(Object.assign(c,l),h(),null):Ne.to(c,{...l,duration:e,ease:i,delay:s,onUpdate:h})}uiShift(t,e=1.6){Ne.to(this,{_uiShift:t,duration:e,ease:"power3.inOut"})}setPaused(t){this.paused=t}get _pv(){return this.__pv||(this.__pv=Qe())}addPin(t,e,i={x:0,y:0,z:0}){let s={code:t,el:e,offset:i};return this.pins.push(s),s}removePin(t){this.pins=this.pins.filter(e=>e!==t)}clearPins(){this.pins.length=0}project(t){let e=t.clone().project(this.cam),i=this.canvas.clientWidth,s=this.canvas.clientHeight;return{x:(e.x*.5+.5)*i,y:(-e.y*.5+.5)*s,visible:e.z<1&&e.z>-1}}_updatePins(){for(let t of this.pins){let e=this.bays[t.code];if(!e)continue;let i=t.offset||{},s=this.project(this._pv.set(e.anchor.x+(i.x||0),e.anchor.y+(i.y||0),e.anchor.z+(i.z||0)));t.el.style.transform=`translate3d(${s.x.toFixed(1)}px,${s.y.toFixed(1)}px,0)`,t.el.style.opacity=s.visible?"":"0"}}_pick(){let t=this.raycaster=new jr,e=()=>Object.values(this.bays).filter(i=>i.hit).map(i=>i.hit);this.canvas.addEventListener("pointermove",i=>{if(!this.hoverCb&&!this.interactive)return;let s=this.canvas.getBoundingClientRect(),r=new it((i.clientX-s.left)/s.width*2-1,-((i.clientY-s.top)/s.height*2-1));t.setFromCamera(r,this.cam);let a=t.intersectObjects(e(),!1)[0],o=a?a.object.userData.bay:null;o!==this._hover&&(this._hover=o,this.hoverCb&&this.hoverCb(o))}),this.canvas.addEventListener("click",()=>{this._hover&&this.pickCb&&this.pickCb(this._hover)})}_emit(){}onFrame(t){return this._frameCbs.add(t),()=>this._frameCbs.delete(t)}resize(){let t=innerWidth,e=innerHeight;this.renderer.setPixelRatio(this._dpr*this._quality),this.renderer.setSize(t,e,!1),this.composer.setPixelRatio(this._dpr*this._quality),this.composer.setSize(t,e),this.cam.aspect=t/e,this.cam.updateProjectionMatrix(),this.bloom.setSize(t*.5,e*.5)}_loop(t){requestAnimationFrame(this._loop),!document.hidden&&this.step(t)}step(t){let e=Math.min(.05,(t-this._last)/1e3);if(this._last=t,this.paused)return;if(this.t+=e,this._pt.lerp(this._pointer,1-Math.pow(.001,e)),this._rainMat.uniforms.uTime.value=this.t,this._rainMat.uniforms.uO.value=(this._rainLevel?this._rainLevel.v:1)*(this.rainBase??1),this._beaconMat.uniforms.uT.value=this.t,this.beacon.visible){let r=this.t*.9%1;this._ring.scale.setScalar(1+r*1.6),this._ring.material.opacity=this._ringMat.opacity*(1-r)}this._applyCam();let i=innerWidth,s=innerHeight;Math.abs(this._uiShift)>1e-4?this.cam.setViewOffset(i,s,-this._uiShift*i,0,i,s):this.cam.view&&this.cam.view.enabled&&this.cam.clearViewOffset();for(let r of this._frameCbs)r(e,this.t);if(this.composer.render(e),this._updatePins(),this._fpsAcc+=e,this._fpsN++,this._fpsN>=90){let r=this._fpsAcc/this._fpsN;this._fpsAcc=0,this._fpsN=0,r>.026&&this._quality>.6&&(this._quality=Math.max(.6,this._quality-.2),this.resize())}}};function B_(n){let t=n>>>0;return()=>{t|=0,t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}var nf=n=>String(n).padStart(2,"0"),sf=["\u65E5","\u6708","\u706B","\u6C34","\u6728","\u91D1","\u571F"];function rf(n=0){let t=new Date;return t.setDate(t.getDate()+n),{m:t.getMonth()+1,d:t.getDate(),w:sf[t.getDay()],iso:`${t.getFullYear()}-${nf(t.getMonth()+1)}-${nf(t.getDate())}`,label:`${t.getMonth()+1}\u6708${t.getDate()}\u65E5\uFF08${sf[t.getDay()]}\uFF09`}}var Di={id:"S-014",name:"\u99C5\u524D\u5E97",chain:"\u30E2\u30C7\u30EB\u5E97\u8217",format:"\u30B3\u30F3\u30D3\u30CB",area:"1\u5E97\u8217\u30FB1\u30AB\u30C6\u30B4\u30EA\uFF08\u98DF\u54C1\uFF0B\u65E5\u7528\u54C1\uFF09",orderCutoff:"06:30",today:rf(0),tomorrow:rf(1)},xe={cond:"\u96E8",pop:.8,pop2:.6,hi:14,lo:11,wind:"\u5317 5m/s",note:"\u524D\u7DDA\u306E\u901A\u904E\u3067\u7D42\u65E5\u96E8\u3002\u5915\u65B9\u306B\u5F37\u307E\u308B\u898B\u8FBC\u307F",hourly:[{h:"06",p:.5},{h:"09",p:.7},{h:"12",p:.8},{h:"15",p:.9},{h:"18",p:.9},{h:"21",p:.7}],source:"\u6C17\u8C61\u30C7\u30FC\u30BF\uFF08\u30C7\u30E2\u7528\u306E\u67B6\u7A7A\u4E88\u5831\uFF09"},fs=[0,0,1,1,0,0,0,1,0,0,1,1,0,0],k_=[19,20,15,14,18,19,21,13,17,19,12,11,18,20],ee=[{id:"umbrella",no:1,name:"\u30D3\u30CB\u30FC\u30EB\u5098",short:"\u5098",en:"Vinyl umbrella",cat:"\u65E5\u7528\u54C1",unit:"\u672C",pack:6,price:550,stock:6,cap:30,usual:6,dry:1.4,rain:17.6,cold:1,safety:4,sku:"JP-UMB-0065",supplier:"\u65E5\u7528\u54C1\u5378 A",delivery:"07:30",shelf:{code:"A-03",zone:"\u5165\u53E3\u6A2A",label:"\u5098\u30B9\u30BF\u30F3\u30C9"},model:"umbrella"},{id:"bento",no:2,name:"\u5E55\u306E\u5185\u5F01\u5F53",short:"\u5F01\u5F53",en:"Makunouchi bento",cat:"\u30C7\u30A4\u30EA\u30FC",unit:"\u500B",pack:6,price:498,stock:7,cap:40,usual:30,dry:26,rain:22.8,cold:1,safety:0,sku:"JP-BNT-0112",supplier:"\u30C7\u30A4\u30EA\u30FC\u4FBF",delivery:"06:00",shelf:{code:"C-01",zone:"\u51B7\u8535\u30B1\u30FC\u30B9",label:"\u5F01\u5F53\u30FB\u304A\u306B\u304E\u308A"},model:"bento",expiresTonight:!0,shelfLifeH:20},{id:"milk",no:3,name:"\u725B\u4E73 200ml\uFF0824\u672C\u5165\uFF09",short:"\u725B\u4E73",en:"Milk 200ml \xD724",cat:"\u30C1\u30EB\u30C9",unit:"\u30B1\u30FC\u30B9",pack:1,price:2640,stock:.5,cap:12,usual:5,dry:2.2,rain:2.4,cold:1,safety:.4,sku:"JP-MLK-2024",supplier:"\u4E73\u696D B",delivery:"07:00",shelf:{code:"C-02",zone:"\u51B7\u8535\u30B1\u30FC\u30B9",label:"\u4E73\u88FD\u54C1"},model:"milk"},{id:"coffee",no:4,name:"\u30DB\u30C3\u30C8\u7F36\u30B3\u30FC\u30D2\u30FC",short:"\u7F36\u30B3\u30FC\u30D2\u30FC",en:"Hot canned coffee",cat:"\u98F2\u6599",unit:"\u672C",pack:12,price:150,stock:4,cap:72,usual:24,dry:11,rain:13,cold:1.45,safety:6,sku:"JP-CFE-0310",supplier:"\u98F2\u6599\u5378 C",delivery:"09:00",shelf:{code:"D-01",zone:"\u30EC\u30B8\u6A2A",label:"\u30DB\u30C3\u30C8\u30A6\u30A9\u30FC\u30DE\u30FC"},model:"can"},{id:"noodle",no:5,name:"\u30AB\u30C3\u30D7\u9EBA",short:"\u30AB\u30C3\u30D7\u9EBA",en:"Instant noodles",cat:"\u5E38\u6E29",unit:"\u500B",pack:12,price:228,stock:8,cap:96,usual:24,dry:15,rain:17,cold:1.3,safety:8,sku:"JP-NDL-0421",supplier:"\u98F2\u6599\u5378 C",delivery:"09:00",shelf:{code:"B-02",zone:"\u4E2D\u592E\u68DA",label:"\u5373\u5E2D\u9EBA"},model:"noodle"},{id:"onigiri",no:6,name:"\u304A\u306B\u304E\u308A\uFF08\u9BAD\uFF09",short:"\u304A\u306B\u304E\u308A",en:"Salmon onigiri",cat:"\u30C7\u30A4\u30EA\u30FC",unit:"\u500B",pack:10,price:158,stock:11,cap:60,usual:40,dry:38,rain:38,cold:1,safety:2,sku:"JP-ONG-0118",supplier:"\u30C7\u30A4\u30EA\u30FC\u4FBF",delivery:"06:00",shelf:{code:"C-01",zone:"\u51B7\u8535\u30B1\u30FC\u30B9",label:"\u5F01\u5F53\u30FB\u304A\u306B\u304E\u308A"},model:"onigiri",expiresTonight:!0,shelfLifeH:20},{id:"sandwich",no:7,name:"\u305F\u307E\u3054\u30B5\u30F3\u30C9",short:"\u30B5\u30F3\u30C9",en:"Egg sandwich",cat:"\u30C7\u30A4\u30EA\u30FC",unit:"\u500B",pack:4,price:268,stock:5,cap:30,usual:20,dry:17,rain:14.4,cold:1,safety:0,sku:"JP-SND-0130",supplier:"\u30C7\u30A4\u30EA\u30FC\u4FBF",delivery:"06:00",shelf:{code:"C-01",zone:"\u51B7\u8535\u30B1\u30FC\u30B9",label:"\u5F01\u5F53\u30FB\u304A\u306B\u304E\u308A"},model:"sandwich",expiresTonight:!0,shelfLifeH:20},{id:"salad",no:8,name:"\u30B5\u30E9\u30C0\uFF08\u30C1\u30AD\u30F3\uFF09",short:"\u30B5\u30E9\u30C0",en:"Chicken salad",cat:"\u30C7\u30A4\u30EA\u30FC",unit:"\u500B",pack:3,price:398,stock:4,cap:24,usual:15,dry:12,rain:8.6,cold:.8,safety:0,sku:"JP-SLD-0142",supplier:"\u30C7\u30A4\u30EA\u30FC\u4FBF",delivery:"06:00",shelf:{code:"C-03",zone:"\u51B7\u8535\u30B1\u30FC\u30B9",label:"\u30B5\u30E9\u30C0\u30FB\u30C7\u30B6\u30FC\u30C8"},model:"salad",expiresTonight:!0,shelfLifeH:20},{id:"ice",no:9,name:"\u30AB\u30C3\u30D7\u30A2\u30A4\u30B9",short:"\u30A2\u30A4\u30B9",en:"Ice cream cup",cat:"\u51B7\u51CD",unit:"\u500B",pack:6,price:178,stock:0,cap:60,usual:24,dry:9,rain:4.2,cold:.55,safety:0,sku:"JP-ICE-0507",supplier:"\u51B7\u51CD\u4FBF",delivery:"10:00",shelf:{code:"F-01",zone:"\u51B7\u51CD\u30B1\u30FC\u30B9",label:"\u30A2\u30A4\u30B9"},model:"ice"},{id:"raincoat",no:10,name:"\u4F7F\u3044\u6368\u3066\u30EC\u30A4\u30F3\u30B3\u30FC\u30C8",short:"\u30EC\u30A4\u30F3\u30B3\u30FC\u30C8",en:"Disposable raincoat",cat:"\u65E5\u7528\u54C1",unit:"\u679A",pack:4,price:330,stock:2,cap:16,usual:4,dry:.3,rain:4.2,cold:1,safety:6,sku:"JP-RNC-0066",supplier:"\u65E5\u7528\u54C1\u5378 A",delivery:"07:30",shelf:{code:"A-04",zone:"\u5165\u53E3\u6A2A",label:"\u30EC\u30A4\u30F3\u30B0\u30C3\u30BA"},model:"raincoat"},{id:"tea",no:11,name:"\u304A\u8336\uFF08\u6E29\uFF09500ml",short:"\u6E29\u304B\u3044\u304A\u8336",en:"Hot tea 500ml",cat:"\u98F2\u6599",unit:"\u672C",pack:6,price:160,stock:0,cap:48,usual:24,dry:8,rain:9.4,cold:1.35,safety:8,sku:"JP-TEA-0318",supplier:"\u98F2\u6599\u5378 C",delivery:"09:00",shelf:{code:"D-01",zone:"\u30EC\u30B8\u6A2A",label:"\u30DB\u30C3\u30C8\u30A6\u30A9\u30FC\u30DE\u30FC"},model:"bottle"},{id:"eggs",no:12,name:"\u5375 6\u500B\u5165",short:"\u5375",en:"Eggs \xD76",cat:"\u30C1\u30EB\u30C9",unit:"\u30D1\u30C3\u30AF",pack:4,price:248,stock:2,cap:30,usual:12,dry:6.2,rain:6.2,cold:1,safety:0,sku:"JP-EGG-0215",supplier:"\u4E73\u696D B",delivery:"07:00",shelf:{code:"C-02",zone:"\u51B7\u8535\u30B1\u30FC\u30B9",label:"\u4E73\u88FD\u54C1"},model:"eggs"}];function z_(n){let t=B_(n.no*7919+13);return fs.map((e,i)=>{let s=e?n.rain:n.dry,r=k_[i]<13?n.cold:1,a=s*(e?1:r)*(1+(t()-.5)*.16);return Math.max(0,Math.round(a*10)/10)})}ee.forEach(n=>{n.history=z_(n);let t=n.history.filter((s,r)=>fs[r]),e=n.history.filter((s,r)=>!fs[r]),i=s=>s.reduce((r,a)=>r+a,0)/(s.length||1);n.rainAvg=i(t),n.dryAvg=i(e)});{let n=ee[0];n.history=[1,2,19,16,1,0,2,18,1,1,17,18,2,1];let t=ee[1];t.history=[27,25,23,22,26,28,26,22,27,25,23,22,26,25];let e=i=>i.reduce((s,r)=>s+r,0)/(i.length||1);for(let i of[n,t])i.rainAvg=e(i.history.filter((s,r)=>fs[r])),i.dryAvg=e(i.history.filter((s,r)=>!fs[r]))}function H_(n,t=[xe.pop,xe.pop2],e=xe.lo){let i=e<13?n.cold:1;return t.reduce((s,r)=>s+(n.dryAvg*i*(1-r)+n.rainAvg*r),0)}function V_(n,t,e){let i=H_(n,t,e),s=n.expiresTonight?0:n.stock,r=i+n.safety-s,o=Math.ceil(Math.max(0,r)/n.pack)*n.pack,l=Math.max(0,n.cap-(n.expiresTonight?0:n.stock)),c=Math.min(o,Math.floor(l/n.pack)*n.pack);return{demand:i,need:r,raw:o,qty:c,capped:o>c,room:l}}function Yl(n,t=xe.pop,e=xe.lo,i=xe.pop2){let s=n.expiresTonight?[t]:[t,i];return V_(n,s,e)}var G_={umbrella:{draft:36,fix:"cap",fixNote:"\u68DA\u306E\u4E0A\u9650\u306F30\u672C\u3002\u5728\u5EAB6\u672C\u306E\u305F\u3081\u3001\u8FFD\u52A0\u306F24\u672C\u307E\u3067\u3067\u3059\u3002"},milk:{draft:5,fix:"sku",fixNote:"SKU\u300C\u725B\u4E73 1L\u300D\u306F\u4ED5\u5165\u5148\u30AB\u30BF\u30ED\u30B0\u306B\u3042\u308A\u307E\u305B\u3093\u3002\u300C\u725B\u4E73 200ml\uFF0824\u672C\u5165\uFF09\u300D\u3078\u7F6E\u304D\u63DB\u3048\u307E\u3057\u305F\u3002"}};ee.forEach(n=>{let t=Yl(n);n.order=t,n.proposed=t.qty,n.delta=n.proposed-n.usual,n.dir=n.delta>0?"up":n.delta<0?"down":"hold";let e=G_[n.id];n.draft=e?e.draft:n.proposed,n.fix=e?e.fix:null,n.fixNote=e?e.fixNote:null,n.checks=[{id:"sku",label:"SKU\u306E\u6574\u5408",detail:`${n.sku} \u306F\u4ED5\u5165\u5148\u30AB\u30BF\u30ED\u30B0\u306B\u3042\u308A\u307E\u3059`,state:n.fix==="sku"?"fixed":"ok"},{id:"unit",label:"\u767A\u6CE8\u5358\u4F4D",detail:`${n.pack}${n.unit}\u5358\u4F4D\u3067\u767A\u6CE8\u3067\u304D\u307E\u3059`,state:"ok"},{id:"cap",label:"\u6570\u91CF\u306E\u4E0A\u9650",detail:`\u68DA\u3068\u4FDD\u7BA1\u306E\u4E0A\u9650\u306F${n.cap}${n.unit}\u3067\u3059`,state:n.fix==="cap"?"fixed":"ok"},{id:"life",label:"\u8CDE\u5473\u30FB\u6D88\u8CBB\u671F\u9650",detail:n.expiresTonight?"\u58F2\u308C\u6B8B\u308A\u306F\u4ECA\u591C\u3067\u671F\u9650\u5207\u308C\u3002\u660E\u65E5\u306E\u8CA9\u58F2\u306B\u306F\u4F7F\u3044\u307E\u305B\u3093":"\u8CA9\u58F2\u671F\u9593\u5185\u306B\u4F7F\u3044\u5207\u308C\u308B\u91CF\u3067\u3059",state:"ok"}]});var $n={productId:"milk",from:5,to:8,question:"3\u756A\u306E\u725B\u4E73\u3001\u5148\u9031\u306F\u5728\u5EAB\u304C\u5207\u308C\u305D\u3046\u3067\u3057\u305F\u3002\u3082\u3046\u5C11\u3057\u5FC5\u8981\u3067\u306F\u306A\u3044\u3067\u3059\u304B\uFF1F",answer:"\u3054\u6307\u6458\u306E\u3068\u304A\u308A\u3001\u5148\u9031\u306F2\u56DE\u3001\u5728\u5EAB\u304C12\u672C\u3092\u4E0B\u56DE\u308A\u307E\u3057\u305F\u3002\u9031\u672B\u306F\u9700\u8981\u304C\u7D0418%\u5897\u3048\u308B\u50BE\u5411\u304C\u3042\u308A\u3001\u914D\u9001\u30822\u65E5\u304A\u304D\u3067\u3059\u30025\u30B1\u30FC\u30B9\u304B\u30898\u30B1\u30FC\u30B9\u306B\u4FEE\u6B63\u3057\u307E\u3059\u3002"};function af(n){let t=n.rainAvg.toFixed(1),e=n.dryAvg.toFixed(1);switch(n.id){case"umbrella":return`\u660E\u65E5\u306F\u96E8\uFF08\u964D\u6C34\u78BA\u738780%\uFF09\u3002\u96E8\u306E\u65E5\u306F1\u65E5\u5E73\u5747${Math.round(n.rainAvg)}\u672C\u58F2\u308C\u3001\u5728\u5EAB\u306F${n.stock}\u672C\u3067\u3059\u3002`;case"bento":return`\u5728\u5EAB\u304C${n.stock}\u500B\u6B8B\u308A\u3001\u671F\u9650\u306F\u4ECA\u591C\u3067\u3059\u3002\u96E8\u306E\u65E5\u306F\u58F2\u308C\u884C\u304D\u304C\u843D\u3061\u308B\u305F\u3081\u3001\u5C11\u306A\u3081\u306B\u3057\u307E\u3059\u3002`;case"milk":return`\u6BCE\u65E5${Math.round(n.rainAvg*24)}\u672C\u524D\u5F8C\u304C\u52D5\u304D\u307E\u3059\u3002\u914D\u9001\u306F2\u65E5\u304A\u304D\u3067\u3001\u5728\u5EAB\u306F\u6B8B\u308A\u534A\u30B1\u30FC\u30B9\u3067\u3059\u3002`;case"coffee":return`\u6700\u4F4E\u6C17\u6E2911\u2103\u3002\u6C17\u6E29\u304C\u4F4E\u3044\u65E5\u306E\u8CA9\u58F2\u306F\u7D04${Math.round((n.cold-1)*100)}%\u5897\u3048\u3066\u3044\u307E\u3059\u3002`;case"noodle":return"\u96E8\u3068\u5BD2\u3055\u304C\u91CD\u306A\u308B\u65E5\u306F\u3001\u30AB\u30C3\u30D7\u9EBA\u304C\u4F38\u3073\u3066\u3044\u307E\u3059\u3002";case"onigiri":return"\u96E8\u3067\u3082\u58F2\u308C\u884C\u304D\u306F\u5909\u308F\u308A\u307E\u305B\u3093\u3002\u524D\u65E5\u3068\u540C\u3058\u91CF\u306B\u3057\u307E\u3059\u3002";case"sandwich":return`\u96E8\u306E\u65E5\u306F\u8EFD\u98DF\u306E\u8CA9\u58F2\u304C\u7D04${Math.round((1-n.rainAvg/n.dryAvg)*100)}%\u6E1B\u308A\u307E\u3059\u3002\u671F\u9650\u3082\u4ECA\u591C\u3067\u3059\u3002`;case"salad":return"\u6C17\u6E29\u304C\u4F4E\u304F\u3001\u96E8\u306E\u65E5\u306F\u8CA9\u58F2\u304C\u843D\u3061\u307E\u3059\u3002\u5EC3\u68C4\u3092\u907F\u3051\u308B\u305F\u3081\u5C11\u306A\u3081\u306B\u3057\u307E\u3059\u3002";case"ice":return`\u6700\u4F4E\u6C17\u6E2911\u2103\u306E\u305F\u3081\u3001\u30A2\u30A4\u30B9\u306F\u5E73\u5E38\u306E\u7D04${Math.round(n.cold*100)}%\u307E\u3067\u4E0B\u304C\u308A\u307E\u3059\u3002`;case"raincoat":return`\u5098\u3068\u5408\u308F\u305B\u3066\u3001\u96E8\u306E\u65E5\u306B\u52D5\u304F\u5546\u54C1\u3067\u3059\u3002\u5728\u5EAB\u306F${n.stock}\u679A\u3057\u304B\u3042\u308A\u307E\u305B\u3093\u3002`;case"tea":return"\u5BD2\u3044\u65E5\u306F\u6E29\u304B\u3044\u98F2\u307F\u7269\u304C\u58F2\u308C\u307E\u3059\u3002\u30EC\u30B8\u6A2A\u306E\u30A6\u30A9\u30FC\u30DE\u30FC\u3092\u88DC\u5145\u3057\u307E\u3059\u3002";case"eggs":return"\u5929\u6C17\u306E\u5F71\u97FF\u304C\u5C0F\u3055\u3044\u5546\u54C1\u3067\u3059\u3002\u901A\u5E38\u3069\u304A\u308A\u767A\u6CE8\u3057\u307E\u3059\u3002"}return`\u904E\u53BB14\u65E5\u306E\u8CA9\u58F2\uFF08\u6674${e}\uFF0F\u96E8${t}\uFF09\u3068\u5929\u6C17\u4E88\u5831\u304B\u3089\u7B97\u51FA\u3057\u307E\u3057\u305F\u3002`}function Zl(n){let t=s=>(Math.round(s*10)/10).toString(),e=n.order,i=[];return i.push(`\u904E\u53BB14\u65E5\u306E\u3046\u3061\u96E8\u306E\u65E5\u306F5\u65E5\u3002${n.short}\u306F\u96E8\u306E\u65E5\u306B1\u65E5\u5E73\u5747${t(n.rainAvg)}${n.unit}\u3001\u305D\u308C\u4EE5\u5916\u306F${t(n.dryAvg)}${n.unit}\u3067\u3057\u305F\u3002`),n.expiresTonight?(i.push(`\u660E\u65E5\u306E\u964D\u6C34\u78BA\u7387\u306F80%\u30021\u65E5\u306E\u9700\u8981\u306F\u7D04${t(e.demand)}${n.unit}\u3068\u898B\u8FBC\u307F\u307E\u3059\u3002`),i.push(`\u4ECA\u3042\u308B${n.stock}${n.unit}\u306F\u4ECA\u591C\u3067\u671F\u9650\u5207\u308C\u306E\u305F\u3081\u3001\u660E\u65E5\u306E\u8CA9\u58F2\u306B\u306F\u6570\u3048\u307E\u305B\u3093\u3002\u5FC5\u8981\u6570\u306F${n.proposed}${n.unit}\u3067\u3059\u3002`)):(i.push(`\u660E\u65E580%\u30FB\u660E\u5F8C\u65E560%\u306E\u96E8\u4E88\u5831\u304B\u3089\u30012\u65E5\u5206\u306E\u9700\u8981\u3092\u7D04${Math.round(e.demand)}${n.unit}\u3068\u898B\u8FBC\u307F\u307E\u3059\u3002`),i.push(`\u5728\u5EAB${n.stock}${n.unit}\u3068\u5B89\u5168\u5728\u5EAB${n.safety}${n.unit}\u3092\u8E0F\u307E\u3048\u3066\u3001${n.proposed}${n.unit}\u3092\u63D0\u6848\u3057\u307E\u3059\u3002`)),i}var _n={startedAt:"22:00",steps:[{t:"22:04",id:"sync",label:"\u5728\u5EAB\u30FB\u8CA9\u58F2\u30C7\u30FC\u30BF\u3092\u540C\u671F",detail:"\u5728\u5EABDB 1,284 SKU \xB7 \u8CA9\u58F2\u5C65\u6B74 14\u65E5\u5206"},{t:"23:30",id:"weather",label:"\u5929\u6C17\u4E88\u5831\u3092\u53D6\u5F97",detail:"\u964D\u6C34\u78BA\u7387 80% \xB7 \u6700\u4F4E\u6C17\u6E29 11\u2103"},{t:"01:10",id:"supplier",label:"\u4ED5\u5165\u5148\u30AB\u30BF\u30ED\u30B0\u3092\u7167\u5408",detail:"\u767A\u6CE8\u5358\u4F4D\u30FB\u4E0A\u9650\u30FB\u30EA\u30FC\u30C9\u30BF\u30A4\u30E0"},{t:"02:30",id:"draft",label:"LLM\u304C\u88DC\u5145\u6848\u3092\u4E0B\u66F8\u304D",detail:"12\u54C1\u76EE \xB7 \u7406\u7531\u3064\u304D"},{t:"03:20",id:"verify",label:"\u30B3\u30FC\u30C9\u3067\u78BA\u8A8D",detail:"SKU\u30FB\u6570\u91CF\u30FB\u671F\u9650\u3092\u691C\u8A3C"},{t:"04:12",id:"ready",label:"\u4E0B\u66F8\u304D\u5B8C\u6210",detail:"\u7BA1\u7406\u8005\u306E\u627F\u8A8D\u5F85\u3061"}],sources:[{id:"inv",label:"\u5728\u5EABDB",sub:"Inventory",stat:"1,284 SKU"},{id:"sales",label:"\u8CA9\u58F2\u5C65\u6B74",sub:"Sales",stat:"14\u65E5\u5206"},{id:"wx",label:"\u5929\u6C17\u4E88\u5831",sub:"Weather",stat:"\u660E\u65E5 \u96E8 80%"},{id:"sup",label:"\u30B5\u30D7\u30E9\u30A4\u30E4\u30FC",sub:"Catalog",stat:"\u767A\u6CE8\u5358\u4F4D\u30FB\u4E0A\u9650"}],retry:{wrong:"\u725B\u4E73 1L\uFF08SKU JP-MLK-1000\uFF09",right:"\u725B\u4E73 200ml\uFF0824\u672C\u5165\uFF09JP-MLK-2024"}},Jl=[{time:"06:00",name:"\u30C7\u30A4\u30EA\u30FC\u4FBF\uFF081\u4FBF\uFF09",items:"\u5F01\u5F53\u30FB\u304A\u306B\u304E\u308A\u30FB\u30B5\u30F3\u30C9\u30A4\u30C3\u30C1\u30FB\u30B5\u30E9\u30C0",status:"done"},{time:"07:00",name:"\u30C1\u30EB\u30C9\u4FBF",items:"\u725B\u4E73\u30FB\u5375",status:"done"},{time:"07:30",name:"\u65E5\u7528\u54C1\u4FBF",items:"\u30D3\u30CB\u30FC\u30EB\u5098 24\u672C\u30FB\u30EC\u30A4\u30F3\u30B3\u30FC\u30C8 12\u679A",status:"next"},{time:"09:00",name:"\u5E38\u6E29\u30FB\u98F2\u6599\u4FBF",items:"\u7F36\u30B3\u30FC\u30D2\u30FC\u30FB\u304A\u8336\u30FB\u30AB\u30C3\u30D7\u9EBA",status:"todo"},{time:"15:00",name:"\u30C7\u30A4\u30EA\u30FC\u4FBF\uFF082\u4FBF\uFF09",items:"\u5F01\u5F53\u30FB\u304A\u306B\u304E\u308A",status:"todo"}];function Re(n){return ee.find(t=>t.id===n)}function of(){return{total:ee.length,up:ee.filter(n=>n.dir==="up").length,down:ee.filter(n=>n.dir==="down").length,hold:ee.filter(n=>n.dir==="hold").length,fixed:ee.filter(n=>n.fix).length}}var $i=Math.max(.25,Math.min(20,+new URLSearchParams(location.search).get("speed")||1)),le=n=>new Promise(t=>setTimeout(t,n/$i)),lf=n=>String(n).padStart(2,"0");function _e(n){let t=document.createElement("template");return t.innerHTML=n.trim(),t.content.firstElementChild}var Sa=n=>(n=(Math.round(n)%1440+1440)%1440,`${lf(Math.floor(n/60))}:${lf(n%60)}`),Kl=n=>{let[t,e]=n.split(":").map(Number);return t*60+e},Wi=class{constructor(){this.dead=!1,this.skip=!1,this._res=new Set}kill(){this.dead=!0,this._res.forEach(t=>t()),this._res.clear()}wait(t){return this.dead?Promise.reject(new Error("run-dead")):this.skip?Promise.resolve():new Promise((e,i)=>{let s=setTimeout(()=>{this._res.delete(r),e()},t/$i),r=()=>{clearTimeout(s),i(new Error("run-dead"))};this._res.add(r)})}},jl=n=>n&&n.message==="run-dead";var Ql=class{constructor(){this.scenes=[],this.i=-1,this.busy=!1,this.auto=!1,this._autoToken=0,this.ctx=null,this.chrome=null}register(t){this.scenes.push(t)}mountAll(t,e){this.ctx=t;for(let i of this.scenes){let s=document.createElement("section");s.className=`scene scene-${i.id}`,s.dataset.scene=i.id,e.append(s),i.root=s,i.mount(s,t)}}get scene(){return this.scenes[this.i]}async go(t,{force:e=!1}={}){if(t<0||t>=this.scenes.length)return;if(this.busy&&!e){this._queued=t;return}if(t===this.i)return;this.busy=!0;let i=this.scenes[this.i],s=this.scenes[t];try{this.ctx.sfx&&this.ctx.sfx.whoosh(),i&&(await i.leave(s),i.root.classList.remove("is-active")),this.i=t,s.root.classList.add("is-active"),this.chrome.setScene(s,t),await s.enter(i)}finally{this.busy=!1}if(this.updateHint(),this._queued!=null){let r=this._queued;this._queued=null,r!==this.i&&await this.go(r)}}async next(){await this.go(this.i+1)}async prev(){await this.go(this.i-1)}async primary(){if(this.busy)return;let t=this.scene;if(!t)return;await t.primary()==="next"&&await this.next(),this.updateHint()}updateHint(){let t=this.scene;if(!t)return;let e=document.getElementById("next-hint");if(!e)return;let i=t.hint?t.hint():"";e.classList.toggle("is-on",!!i&&!this.auto);let s=e.querySelector(".lab");s&&(s.textContent=i||"")}async reset(){this.stopAuto();for(let t of this.scenes)t.reset&&t.reset();if(this.ctx.state.reset(),this.ctx.world.clearLocate(),this.ctx.world.setHeat(!1),this.ctx.world.scan(!1),this.ctx.world.setFill("A-03",6/30),this.ctx.world.setFill("C-01",7/40),this.i===0){let t=this.scenes[0];await t.leave(t),t.reset&&t.reset(),await t.enter(null),this.updateHint();return}this.chrome.jumpClock("22:00","\u5E97\u8217\u306E\u6642\u523B"),await this.go(0,{force:!0})}async startAuto(){if(this.auto)return;this.auto=!0;let t=++this._autoToken;this.chrome.toast("\u81EA\u52D5\u518D\u751F\u3092\u958B\u59CB\uFF08A \u307E\u305F\u306F Esc \u3067\u505C\u6B62\uFF09"),document.body.classList.add("is-auto"),this.updateHint();try{for(;this.auto&&t===this._autoToken;){let e=this.scene;if(await le(e.autoPause??1200),!this.auto||t!==this._autoToken)break;if(this.busy){await le(300);continue}let i=e.autoStep?await e.autoStep():await e.primary();if(i==="wait"){await le(450);continue}if(i==="next"){if(this.i>=this.scenes.length-1){if(await le(6e3),!this.auto||t!==this._autoToken)break;await this.reset(),this.startAuto();return}await this.next()}await le(e.beatPause??900)}}catch(e){console.warn(e)}}stopAuto(){this.auto=!1,this._autoToken++,document.body.classList.remove("is-auto"),this.updateHint()}toggleAuto(){this.auto?(this.stopAuto(),this.chrome.toast("\u81EA\u52D5\u518D\u751F\u3092\u505C\u6B62")):this.startAuto()}};var fe=(n,{w:t=48,h:e=48,sw:i=2.2}={})=>`<svg viewBox="0 0 ${t} ${e}" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="${i}" stroke-linecap="square" stroke-linejoin="miter" aria-hidden="true">${n}</svg>`,$t={db:fe('<ellipse cx="14" cy="9" rx="9" ry="3.5"/><path d="M5 9v7c0 2 4 3.5 9 3.5s9-1.5 9-3.5V9"/><path d="M5 16v7c0 2 4 3.5 9 3.5s9-1.5 9-3.5v-7"/><ellipse cx="34" cy="14" rx="9" ry="3.5"/><path d="M25 14v7c0 2 4 3.5 9 3.5s9-1.5 9-3.5v-7"/><path d="M25 21v7c0 2 4 3.5 9 3.5s9-1.5 9-3.5v-7"/><path d="M14 27v8M34 30v5M14 35h20M24 35v7" /><path d="M20 42h8"/>'),dbOne:fe('<ellipse cx="24" cy="12" rx="13" ry="5"/><path d="M11 12v10c0 2.8 5.8 5 13 5s13-2.2 13-5V12"/><path d="M11 22v10c0 2.8 5.8 5 13 5s13-2.2 13-5V22"/>'),chart:fe('<path d="M7 7v34h35"/><path d="M13 32l9-10 7 6 11-14"/><path d="M36 14h4v4"/>'),rain:fe('<path d="M13 28a8 8 0 0 1 1.2-15.9A10 10 0 0 1 33.6 14 7 7 0 0 1 35 28z"/><path d="M15 34l-3 7M24 34l-3 7M33 34l-3 7"/>'),catalog:fe('<path d="M8 8h26l6 6v26H8z"/><path d="M34 8v6h6"/><path d="M14 22h20M14 28h20M14 34h12"/>'),box:fe('<path d="M24 5l17 8v22l-17 8-17-8V13z"/><path d="M7 13l17 8 17-8M24 21v22"/>'),spark:fe('<path d="M24 5c1.4 9.6 5.4 13.6 15 15-9.6 1.4-13.6 5.4-15 15-1.4-9.6-5.4-13.6-15-15 9.6-1.4 13.6-5.4 15-15z"/><path d="M38 33c.6 3.6 2 5 5.6 5.6-3.6.6-5 2-5.6 5.6-.6-3.6-2-5-5.6-5.6 3.6-.6 5-2 5.6-5.6z" stroke-width="1.8"/>'),bubble:fe('<path d="M10 12h28a3 3 0 0 1 3 3v15a3 3 0 0 1-3 3H22l-8 7v-7h-4a3 3 0 0 1-3-3V15a3 3 0 0 1 3-3z" stroke-dasharray="4 3.5"/><circle cx="17" cy="22.5" r="1.8" fill="currentColor"/><circle cx="24" cy="22.5" r="1.8" fill="currentColor"/><circle cx="31" cy="22.5" r="1.8" fill="currentColor"/>'),checks:fe('<rect x="7" y="6" width="34" height="36"/><path d="M13 15l3 3 5-6M13 25l3 3 5-6" /><path d="M26 16h10M26 26h10"/><path d="M13 35l5 4M18 35l-5 4"/><path d="M26 36h10"/>'),person:fe('<circle cx="24" cy="15" r="7"/><path d="M9 41c1-9 7-14 15-14s14 5 15 14"/>'),seal:fe('<circle cx="24" cy="24" r="17"/><circle cx="24" cy="24" r="13" stroke-width="1.4"/><path d="M17 20h14M24 14v14M18 29h12"/>'),check:fe('<path d="M9 25l9 9 21-22"/>',{sw:3.2}),x:fe('<path d="M12 12l24 24M36 12L12 36"/>',{sw:3}),arrowR:fe('<path d="M6 24h34M30 14l10 10-10 10"/>',{sw:2.6}),arrowUp:fe('<path d="M24 40V8M13 19l11-11 11 11"/>',{sw:3}),arrowDn:fe('<path d="M24 8v32M13 29l11 11 11-11"/>',{sw:3}),minus:fe('<path d="M10 24h28"/>',{sw:3.2}),plus:fe('<path d="M10 24h28M24 10v28"/>',{sw:3.2}),send:fe('<path d="M24 40V9M12 20L24 8l12 12"/>',{sw:3}),mic:fe('<rect x="17" y="5" width="14" height="24" rx="7"/><path d="M10 22c0 8 6 13 14 13s14-5 14-13M24 35v8M17 43h14"/>'),scan:fe('<path d="M6 16V8h8M34 8h8v8M42 32v8h-8M14 40H6v-8"/><path d="M6 24h36" stroke-dasharray="3 3"/>'),cube:fe('<path d="M24 5l17 9.5v19L24 43 7 33.5v-19z"/><path d="M7 14.5L24 24l17-9.5M24 24v19"/>'),pin:fe('<path d="M24 43s13-12 13-22a13 13 0 0 0-26 0c0 10 13 22 13 22z"/><circle cx="24" cy="21" r="4.5"/>'),clock:fe('<circle cx="24" cy="24" r="17"/><path d="M24 13v11l7 5"/>'),truck:fe('<path d="M5 12h24v22H5zM29 20h9l6 7v7H29z"/><circle cx="14" cy="36" r="4" fill="var(--paper,#fffef3)"/><circle cx="36" cy="36" r="4" fill="var(--paper,#fffef3)"/>'),shield:fe('<path d="M24 5l16 6v12c0 10-7 17-16 20-9-3-16-10-16-20V11z"/><path d="M16 24l6 6 11-12"/>'),loop:fe('<path d="M10 24a14 14 0 0 1 24-9.8M38 24a14 14 0 0 1-24 9.8"/><path d="M34 6v9h-9M14 42v-9h9"/>'),eye:fe('<path d="M3 24s8-14 21-14 21 14 21 14-8 14-21 14S3 24 3 24z"/><circle cx="24" cy="24" r="6"/>'),heat:fe('<rect x="6" y="6" width="12" height="12"/><rect x="21" y="6" width="12" height="12" stroke-dasharray="3 3"/><rect x="6" y="21" width="12" height="12" stroke-dasharray="3 3"/><rect x="21" y="21" width="12" height="12"/><rect x="36" y="21" width="6" height="12"/>'),help:fe('<circle cx="24" cy="24" r="17"/><path d="M18 19a6 6 0 1 1 8 5.7c-1.4.6-2 1.6-2 3.3M24 34v2"/>'),umbrella:fe('<path d="M5 26C5 14 13.5 6 24 6s19 8 19 20z"/><path d="M5 26c3.5-3 7.5-3 9.5 0 2-3 5-3 9.5 0 4.5-3 7.5-3 9.5 0 2-3 6-3 9.5 0"/><path d="M24 6V3M24 26v13a4.5 4.5 0 0 1-9 0"/>'),mark:'<svg viewBox="0 0 48 48" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M5 14c0-1.1.9-2 2-2h8.5c1.7 0 3.2.9 4.1 2.3L21 16.4c.4.6 1 1 1.7 1.2l11 2.4c.9.2 1.5 1 1.5 1.9 0 .3-.1.7-.3 1l-5 9.5c-.9 1.7-2.6 2.8-4.5 2.8H21c-2.3 0-4.3-1.4-5.1-3.5L11 17H7c-1.1 0-2-.9-2-2z"/><rect x="25" y="14" width="4.4" height="6" rx=".6"/><rect x="31" y="9" width="4.4" height="11" rx=".6"/><rect x="37" y="4" width="4.4" height="16" rx=".6"/><circle cx="19" cy="41" r="3"/><circle cx="31" cy="41" r="3"/></svg>'};var tc=[{id:"open",t:"22:00",l:"\u9589\u5E97\u5F8C"},{id:"night",t:"04:12",l:"\u591C\u306B\u6E96\u5099\u3059\u308B"},{id:"morning",t:"07:30",l:"\u671D\u306B\u5224\u65AD\u3059\u308B"},{id:"day",t:"14:20",l:"\u65E5\u4E2D\u306B\u78BA\u8A8D\u3059\u308B"},{id:"end",t:"\u7FCC\u671D",l:"\u6B21\u306E\u30B9\u30C6\u30C3\u30D7"}],ec=class{constructor(t,e){this.director=t,this.clockMin=Kl("22:00"),this.folio=_e(`<header id="folio" aria-label="StoreMind">
      <div class="brand">${$t.mark}<span class="wm">STOREMIND</span></div>
      <div class="rule"></div>
      <div class="hint" id="next-hint" role="status"><kbd>\u23CE</kbd><span class="lab"></span></div>
      <div class="store">${e.chain} ${e.name}</div>
      <div class="sec"><em>01</em><span>\u9589\u5E97\u5F8C</span></div>
      <div class="demo"><span class="tag is-concept" title="\u30C7\u30E2\u7528\u306E\u67B6\u7A7A\u30C7\u30FC\u30BF\u3067\u3059"><span class="dot"></span>\u30C7\u30E2\u30C7\u30FC\u30BF</span></div>
    </header>`),this.arc=_e(`<footer id="arc" aria-label="\u4E00\u65E5\u306E\u6D41\u308C">
      <div class="clock-box"><div class="clock" id="clock">22:00</div><div class="clock-sub" id="clock-sub">\u5E97\u8217\u306E\u6642\u523B</div></div>
      <div class="track"><div class="base"></div><div class="fill" id="arc-fill"></div>
        ${tc.map((i,s)=>`<button class="stop" data-i="${s}" style="left:${s/(tc.length-1)*100}%"><span class="t">${i.t}</span><span class="d"></span><span class="l">${i.l}</span></button>`).join("")}
      </div>
    </footer>`),this.presenter=_e('<aside id="presenter" aria-label="\u30D7\u30EC\u30BC\u30F3\u30BF\u30FC\u30E1\u30E2"></aside>'),this.help=_e(`<div id="help" role="dialog" aria-label="\u30B7\u30E7\u30FC\u30C8\u30AB\u30C3\u30C8"><div class="sheet"><h3>\u30B7\u30E7\u30FC\u30C8\u30AB\u30C3\u30C8</h3><div class="grid">
      <div class="row"><span>\u6B21\u3078 / \u5B9F\u884C</span><span><kbd>Enter</kbd><kbd>\u2192</kbd><kbd>Space</kbd></span></div>
      <div class="row"><span>\u524D\u306E\u30B7\u30FC\u30F3</span><span><kbd>\u2190</kbd></span></div>
      <div class="row"><span>\u30B7\u30FC\u30F3\u3078\u79FB\u52D5</span><span><kbd>1</kbd>\u2013<kbd>5</kbd></span></div>
      <div class="row"><span>\u81EA\u52D5\u518D\u751F</span><span><kbd>A</kbd></span></div>
      <div class="row"><span>\u767B\u58C7\u8005\u30E1\u30E2</span><span><kbd>P</kbd></span></div>
      <div class="row"><span>\u753B\u9762\u3060\u3051\u8868\u793A</span><span><kbd>H</kbd></span></div>
      <div class="row"><span>\u5168\u753B\u9762</span><span><kbd>F</kbd></span></div>
      <div class="row"><span>\u52B9\u679C\u97F3</span><span><kbd>M</kbd></span></div>
      <div class="row"><span>\u6700\u521D\u304B\u3089</span><span><kbd>R</kbd></span></div>
      <div class="row"><span>\u3053\u306E\u753B\u9762</span><span><kbd>?</kbd></span></div>
    </div></div></div>`),this.toastEl=_e('<div id="toast" role="status" aria-live="polite"></div>'),this.hintEl=null,document.body.append(this.folio,this.arc,this.presenter,this.help,this.toastEl),this.clockEl=this.arc.querySelector("#clock"),this.clockSub=this.arc.querySelector("#clock-sub"),this.fill=this.arc.querySelector("#arc-fill"),this.secEl=this.folio.querySelector(".sec"),this.arc.querySelectorAll(".stop").forEach(i=>i.addEventListener("click",()=>t.go(+i.dataset.i))),this.help.addEventListener("click",()=>this.toggleHelp(!1)),this.arc.querySelector(".track").style.setProperty("--n",tc.length)}setScene(t,e){document.body.classList.toggle("theme-day",t.theme==="day"),document.body.classList.toggle("theme-night",t.theme!=="day"),this.secEl.innerHTML=`<em>${String(e+1).padStart(2,"0")}</em><span>${t.title}</span>`,this.arc.querySelectorAll(".stop").forEach((i,s)=>{i.classList.toggle("is-done",s<e),i.classList.toggle("is-now",s===e)}),this.setProgress(e),this.clockSub.textContent=t.clockSub||"",this.renderPresenter(t)}setProgress(t,e=1.4){let i=Math.max(0,Math.min(1,t/(tc.length-1)))*100;window.gsap.to(this.fill,{width:i+"%",duration:e,ease:"power3.inOut"})}setClock(t,{dur:e=1.6,instant:i=!1,sub:s}={}){let a=typeof t=="string"?Kl(t):t,o=this.clockMin;for(;a<o-1;)a+=1440;if(s!==void 0&&(this.clockSub.textContent=s),this._clockTween&&(this._clockTween.kill(),this._clockTween=null),i||a-o>1440)return this.clockMin=a,this.clockEl.textContent=Sa(a),null;let l={v:o};return this._clockTween=window.gsap.to(l,{v:a,duration:e,ease:"power2.inOut",onUpdate:()=>{this.clockMin=l.v,this.clockEl.textContent=Sa(l.v)},onComplete:()=>{this.clockMin=a,this.clockEl.textContent=Sa(a)}})}jumpClock(t,e){let i=typeof t=="string"?Kl(t):t;this.clockMin=i,this.clockEl.textContent=Sa(i),e!==void 0&&(this.clockSub.textContent=e)}renderPresenter(t){let e=(t.notes||[]).map(i=>`<li>${i}</li>`).join("");this.presenter.innerHTML=`<h4>\u767B\u58C7\u8005\u30E1\u30E2 \xB7 ${t.title}</h4><ul>${e}</ul>
      <div class="keys"><span><kbd>Enter</kbd>\u5B9F\u884C/\u6B21\u3078</span><span><kbd>\u2190</kbd>\u623B\u308B</span><span><kbd>A</kbd>\u81EA\u52D5\u518D\u751F</span><span><kbd>?</kbd>\u30D8\u30EB\u30D7</span></div>`}togglePresenter(t){this.presenter.classList.toggle("is-open",t??!this.presenter.classList.contains("is-open"))}toggleHelp(t){this.help.classList.toggle("is-open",t??!this.help.classList.contains("is-open"))}toggleChrome(t){document.body.classList.toggle("chrome-off",t??!document.body.classList.contains("chrome-off"))}toast(t,e=1800){this.toastEl.textContent=t,this.toastEl.classList.add("is-on"),clearTimeout(this._tt),this._tt=setTimeout(()=>this.toastEl.classList.remove("is-on"),e)}};var zt={edits:new Map,reviewed:new Set,rejected:new Set,sim:null,approved:!1,approvedAt:null,revisedByChat:!1,sessionStart:Date.now(),morningStart:null,sound:!1,reset(){this.edits.clear(),this.reviewed.clear(),this.rejected.clear(),this.sim=null,this.approved=!1,this.approvedAt=null,this.revisedByChat=!1,this.sessionStart=Date.now(),this.morningStart=null}};var Fh=window.gsap;function cf(n,{cls:t="ch"}={}){let e=n.textContent;return n.textContent="",n.setAttribute("aria-label",e),[...e].map(i=>{let s=document.createElement("span");return s.className=t,s.setAttribute("aria-hidden","true"),s.style.display="inline-block",s.textContent=i===" "?"\xA0":i,n.append(s),s})}function hf(n,{delay:t=0,stagger:e=.045,y:i="105%",dur:s=1.1,ease:r="expo.out",blur:a=!0}={}){return Fh.set(n,{yPercent:105,opacity:0,filter:a?"blur(6px)":"none"}),Fh.to(n,{yPercent:0,opacity:1,filter:"blur(0px)",duration:s,ease:r,stagger:e,delay:t,clearProps:"filter,transform"})}function ar(n,t,{cps:e=34,jitter:i=.5,onTick:s,caret:r=!0,run:a}={}){let o=0,l=!1,c={cancel(){l=!0},finish(){o=t.length}},h=r?Object.assign(document.createElement("span"),{className:"caret"}):null;n.textContent="",h&&n.append(h);let f=document.createTextNode("");n.insertBefore(f,h);let u=new Promise(d=>{let g=()=>{if(l){d(!1);return}if(a&&a.dead){d(!1);return}a&&a.skip&&(o=t.length);let v=1+Math.floor(Math.random()*2);if(o=Math.min(t.length,o+v),f.nodeValue=t.slice(0,o),s&&s(o),o>=t.length){h&&h.remove(),d(!0);return}let m=t[o-1],p=1e3/(e*$i)*(1+(Math.random()-.5)*i*2);"\u3001\uFF0C,".includes(m)&&(p+=90/$i),"\u3002\uFF01\uFF1F.!?".includes(m)&&(p+=240/$i),m===`
`&&(p+=320/$i),setTimeout(g,p)};g()});return u.ctl=c,u}function Oh(n,t,{from:e=0,dur:i=1.2,fmt:s=o=>Math.round(o).toString(),ease:r="power3.out",delay:a=0}={}){let o={v:e};return n.textContent=s(e),Fh.to(o,{v:t,duration:i,delay:a,ease:r,onUpdate:()=>{n.textContent=s(o.v)},onComplete:()=>{n.textContent=s(t)}})}var wa=window.gsap,uf={id:"open",title:"\u9589\u5E97\u5F8C",theme:"night",clockSub:"\u9589\u5E97\u5F8C\u306E\u5E97\u8217",notes:["\u9589\u5E97\u5F8C\u306E\u5E97\u8217\u3067\u3059\u3002\u660E\u65E5\u306F\u96E8\u3002\u4ECA\u65E5\u306E\u5F01\u5F53\u306F\u5C11\u3057\u6B8B\u3063\u3066\u3044\u307E\u3059\u3002","\u4E00\u65B9\u3067\u3001\u5098\u306E\u5728\u5EAB\u306F\u5C11\u306A\u3044\u3002\u3067\u306F\u3001\u660E\u65E5\u306F\u4F55\u3092\u3001\u3069\u308C\u3060\u3051\u88DC\u5145\u3059\u308B\u304B\u3002","\u753B\u9762\u306E3\u3064\u306E\u6570\u5B57\u304C\u3001\u7BA1\u7406\u8005\u304C\u6BCE\u6669\u78BA\u8A8D\u3057\u3066\u3044\u308B\u6750\u6599\u3067\u3059\u3002"],_first:!0,mount(n,t){this.ctx=t;let e=Re("umbrella"),i=Re("bento");n.innerHTML=`
      <div class="copy">
        <div class="eyebrow label">${Di.chain} \xB7 ${Di.name}</div>
        <h1 aria-live="off">\u9589\u5E97\u5F8C\u306E\u5E97\u8217\u3002</h1>
        <ul class="signals">
          <li data-k="wx">${`<span class="ic">${$t.rain}</span>`}<div><span class="k">\u660E\u65E5\u306E\u5929\u6C17</span><span class="v">\u96E8<small>\u6700\u4F4E ${xe.lo}\u2103 \xB7 ${xe.note.split("\u3002")[0]}</small></span></div><span class="n">${Math.round(xe.pop*100)}<small>%</small></span></li>
          <li data-k="bento"><span class="ic">${$t.box}</span><div><span class="k">\u4ECA\u65E5\u306E\u5F01\u5F53</span><span class="v">\u5C11\u3057\u6B8B\u3063\u3066\u3044\u308B<small>\u671F\u9650\u306F\u4ECA\u591C</small></span></div><span class="n">${i.stock}<small>\u500B</small></span></li>
          <li data-k="umb"><span class="ic">${$t.umbrella}</span><div><span class="k">\u5098\u306E\u5728\u5EAB</span><span class="v">\u5C11\u306A\u3044<small>\u68DA\u306E\u4E0A\u9650 ${e.cap}\u672C</small></span></div><span class="n">${e.stock}<small>\u672C</small></span></li>
        </ul>
        <p class="ask">\u660E\u65E5\u306F\u3001<mark>\u4F55\u3092\u3001\u3069\u308C\u3060\u3051</mark>\u88DC\u5145\u3059\u308B\u304B\u3002</p>
        <div class="cta"><button class="btn is-fill" data-act="start">\u591C\u306E\u6E96\u5099\u3092\u59CB\u3081\u308B <kbd>\u23CE</kbd></button><span class="aside">\u9589\u5E97\u304B\u3089\u7FCC\u671D\u307E\u3067\u3092\u3001\u3072\u3068\u3064\u306E\u5E97\u8217\u3067\u3002</span></div>
      </div>
      <div class="pins">
        ${this._pin("SKY","\u660E\u65E5\u306E\u5929\u6C17",`\u96E8 <b>${Math.round(xe.pop*100)}</b>%`,`${xe.hi}\u2103 / ${xe.lo}\u2103`,"","5.6rem")}
        ${this._pin("A-03","\u5098",`\u5728\u5EAB <b>${e.stock}</b>\u672C`,`${e.shelf.code} ${e.shelf.zone}`,"is-warn","3rem")}
        ${this._pin("C-01","\u5F01\u5F53",`\u6B8B\u308A <b>${i.stock}</b>\u500B`,"\u671F\u9650\u306F\u4ECA\u591C","is-warn","3rem")}
      </div>`,n.querySelector("[data-act=start]").addEventListener("click",()=>t.director.primary()),this.pinEls=[...n.querySelectorAll(".pin")],this.pinEls.forEach(s=>t.world.addPin(s.dataset.code,s,s.dataset.code==="SKY"?{x:0,y:0,z:0}:{x:0,y:.1,z:0}))},_pin(n,t,e,i,s,r){return`<div class="pin ${s}" data-code="${n}"${r?` style="--stem:${r}"`:""}><i class="stem"></i><i class="dot"></i><div class="card"><span class="k">${t}</span><span class="v">${e}</span><span class="s">${i}</span></div></div>`},async enter(n){let{world:t,chrome:e}=this.ctx,i=this.root;t.setPaused(!1),document.getElementById("gl").style.opacity=1,t.mood(0,n?1.6:0),t.rain(1,n?1.2:0),t.setOpen(!1),t.scan(!1),t.uiShift(.235,n?2:0),t.drift(.1),e.jumpClock("22:00","\u9589\u5E97\u5F8C\u306E\u5E97\u8217");let s=i.querySelector("h1"),r=cf(s),a=i.querySelectorAll(".signals li"),o=i.querySelector(".ask"),l=i.querySelector(".cta"),c=i.querySelector(".eyebrow");this._first||!n?(t.shot({pos:[33,21,36],target:[0,.5,0],fov:31},{instant:!0}),t.shot("hero",{duration:4.6,ease:"power3.out"})):t.shot("hero",{duration:2.6}),this._first=!1,wa.set([a,o,l,c],{opacity:0}),wa.set(this.pinEls,{opacity:0});let h=wa.timeline({delay:n?.2:.5});h.fromTo(c,{x:-24,opacity:0},{x:0,opacity:1,duration:1,ease:"expo.out"},0).add(hf(r,{stagger:.07,dur:1.3}),.1).fromTo(a,{y:36,opacity:0},{y:0,opacity:1,duration:1,ease:"expo.out",stagger:.22},.9).fromTo(o,{y:24,opacity:0},{y:0,opacity:1,duration:1.1,ease:"expo.out"},1.9).fromTo(l,{y:24,opacity:0},{y:0,opacity:1,duration:1,ease:"expo.out"},2.3),this.pinEls.forEach((f,u)=>{let d=f.querySelector(".stem"),g=f.querySelector(".dot"),v=f.querySelector(".card");h.set(f,{opacity:1},1.5+u*.35).fromTo(g,{scale:0},{scale:1,duration:.5,ease:"back.out(3)"},1.5+u*.35).fromTo(d,{scaleY:0},{scaleY:1,duration:.7,ease:"power3.out"},1.55+u*.35).fromTo(v,{opacity:0,y:12,scale:.92},{opacity:1,y:0,scale:1,duration:.6,ease:"expo.out"},1.95+u*.35)}),await le(n?900:1400)},async leave(){let n=this.root;await wa.to([n.querySelector(".copy"),n.querySelector(".pins")],{opacity:0,y:-14,duration:.7,ease:"power2.in"}).then(),wa.set([n.querySelector(".copy"),n.querySelector(".pins")],{clearProps:"all"})},primary(){return"next"},hint(){return""},autoPause:5800,reset(){}};var Ie=window.gsap,W_=["umbrella","bento","milk","coffee"];var $_={up:"\u2191",down:"\u2193",hold:"\u2192"},df={id:"night",title:"\u591C\u306B\u6E96\u5099\u3059\u308B",theme:"night",clockSub:"\u591C\u9593\u30D0\u30C3\u30C1",notes:["\u3053\u3053\u304C\u3001\u3055\u304D\u307B\u3069\u306E\u30B9\u30E9\u30A4\u30C9\u306E\u6D41\u308C\u3067\u3059\u3002\u65E2\u5B58\u30C7\u30FC\u30BF \u2192 LLM\u304C\u4E0B\u66F8\u304D \u2192 \u30B3\u30FC\u30C9\u3067\u78BA\u8A8D \u2192 \u7BA1\u7406\u8005\u304C\u627F\u8A8D\u3002","\u591C\u306E\u3046\u3061\u306B\u5728\u5EAB\u30FB\u8CA9\u58F2\u5C65\u6B74\u30FB\u5929\u6C17\u30FB\u4ED5\u5165\u5148\u306E\u30C7\u30FC\u30BF\u3092\u96C6\u3081\u3001LLM\u304C\u7406\u7531\u3064\u304D\u3067\u88DC\u5145\u6848\u3092\u4E0B\u66F8\u304D\u3057\u307E\u3059\u3002","\u5098\u306F\u3001LLM\u304C36\u672C\u3068\u66F8\u304D\u307E\u3057\u305F\u3002\u68DA\u306E\u4E0A\u9650\u306F30\u672C\u3002\u30B3\u30FC\u30C9\u304C24\u672C\u306B\u76F4\u3057\u307E\u3057\u305F\u3002","\u725B\u4E73\u306F\u3001LLM\u304C\u5B58\u5728\u3057\u306A\u3044\u5546\u54C1\u30B3\u30FC\u30C9\u3092\u66F8\u304D\u307E\u3057\u305F\u3002\u30B3\u30FC\u30C9\u304C\u5DEE\u3057\u623B\u3057\u3001LLM\u304C\u76F4\u3057\u307E\u3057\u305F\u3002","LLM\u3060\u3051\u306B\u4EFB\u305B\u305A\u3001\u30B3\u30FC\u30C9\u3067\u78BA\u8A8D\u3057\u3066\u304B\u3089\u7BA1\u7406\u8005\u306B\u5C4A\u3051\u307E\u3059\u3002"],phase:"idle",mount(n,t){this.ctx=t,this._build()},_build(){let n=this.root,t=this.ctx;(this._pins||[]).forEach(e=>t.world.removePin(e)),this._pins=[],n.innerHTML=`
    <div class="hud">
      <div class="head">
        <div><h2>\u591C\u306E\u3046\u3061\u306B\u3001\u88DC\u5145\u6848\u3092\u4E0B\u66F8\u304D\u3059\u308B\u3002</h2>
        <p>\u5728\u5EAB\u30FB\u8CA9\u58F2\u30FB\u5929\u6C17\u30FB\u4ED5\u5165\u5148\u3092\u307E\u3068\u3081\u3066\u3001LLM\u304C\u7406\u7531\u3064\u304D\u3067\u4E0B\u66F8\u304D\u3057\u307E\u3059\u3002\u30B3\u30FC\u30C9\u304C\u78BA\u8A8D\u3057\u3066\u304B\u3089\u3001\u671D\u306E\u7BA1\u7406\u8005\u306B\u5C4A\u304D\u307E\u3059\u3002</p></div>
        <button class="btn is-fill go" data-act="go">\u671D\u3078 <kbd>\u23CE</kbd></button>
      </div>
      <section class="pipe" aria-label="\u591C\u9593\u30D0\u30C3\u30C1\u306E\u6D41\u308C">
        <div class="node" data-n="data"><div class="ico"><span class="ic">${$t.db}</span><span class="badge">${$t.check}</span></div><div class="nm">\u65E2\u5B58\u30C7\u30FC\u30BF</div><div class="when">22:04</div>
          <ul class="srcs">${_n.sources.map((e,i)=>`<li class="src" data-s="${e.id}"><i class="d"></i><span>${e.label}</span><span class="st">${e.stat}</span></li>`).join("")}</ul></div>
        <div class="link" data-l="0"><i class="on"></i><i class="dot"></i></div>
        <div class="node is-dashed" data-n="llm"><div class="ico"><span class="ic">${$t.bubble}</span><span class="badge">${$t.check}</span></div><div class="nm">LLM\u304C\u4E0B\u66F8\u304D</div><div class="when">02:30</div></div>
        <div class="link" data-l="1"><i class="on"></i><i class="dot"></i></div>
        <div class="node" data-n="code"><div class="ico"><span class="ic">${$t.checks}</span><span class="badge">${$t.check}</span></div><div class="nm">\u30B3\u30FC\u30C9\u3067\u78BA\u8A8D</div><div class="when">03:20</div></div>
        <div class="link" data-l="2"><i class="on"></i><i class="dot"></i></div>
        <div class="node" data-n="human"><div class="ico"><span class="ic">${$t.person}</span><span class="badge">${$t.check}</span></div><div class="nm">\u7BA1\u7406\u8005\u304C\u627F\u8A8D</div><div class="when">\u671D 07:30</div></div>
        <svg class="retry" viewBox="0 0 1000 60" preserveAspectRatio="none"><path d="M680 58 C 680 -14, 438 -14, 438 58"/><path class="tip" d="M438 58 l-7 -11 l14 0 z" /></svg>
        <div class="retry-lab">SKU\u4E0D\u6574\u5408 \u2192 LLM\u3078\u5DEE\u3057\u623B\u3057</div>
      </section>
      <div class="panels">
        <section class="panel is-dashed" data-p="llm"><div class="ph"><h3><span class="ic">${$t.bubble}</span>LLM\u306E\u4E0B\u66F8\u304D</h3><span class="meter" data-m="tok">0 tokens</span></div>
          <div class="stream"><div class="inner"></div></div></section>
        <section class="panel" data-p="code"><div class="ph"><h3><span class="ic">${$t.checks}</span>\u30B3\u30FC\u30C9\u306E\u78BA\u8A8D</h3><span class="meter" data-m="chk">0 / ${ee.length}</span></div>
          <div class="chk-head"><span class="th"></span><span class="th">\u5546\u54C1</span><span class="th">SKU</span><span class="th">\u5358\u4F4D</span><span class="th">\u4E0A\u9650</span><span class="th">\u671F\u9650</span></div>
          <div class="chk-wrap"><div class="chk">
            ${ee.map(e=>`<span class="c no">${String(e.no).padStart(2,"0")}</span><span class="c nm" data-r="${e.id}">${e.short}</span>${["sku","unit","cap","life"].map(i=>`<span class="c" data-r="${e.id}"><i class="dot" data-c="${i}"><span class="ic">${$t.check}</span></i></span>`).join("")}`).join("")}
          </div></div>
          <div class="chk-note" data-note></div></section>
      </div>
    </div>
    <div class="pins"></div>`,this.el={h2:n.querySelector("h2"),sub:n.querySelector(".head p"),go:n.querySelector(".go"),inner:n.querySelector(".stream .inner"),tok:n.querySelector("[data-m=tok]"),chk:n.querySelector("[data-m=chk]"),note:n.querySelector("[data-note]"),retry:n.querySelector(".retry"),retryLab:n.querySelector(".retry-lab"),pins:n.querySelector(".pins")},n.querySelector("[data-act=go]").addEventListener("click",()=>this.ctx.director.next()),this.tokens=0,this.phase="idle",this.checked=0},async enter(n){let{world:t,chrome:e}=this.ctx;t.setPaused(!1),document.getElementById("gl").style.opacity=1,t.mood(0,n?1.2:0),t.rain(1,1),t.setOpen(!1),t.clearLocate(),t.setHeat(!1),t.shot("night",{duration:2.6}),t.uiShift(.315,2.2),t.drift(.09),e.setClock("22:00",{instant:!0,sub:"\u591C\u9593\u30D0\u30C3\u30C1"}),this._build(),Ie.fromTo(this.root.querySelector(".hud"),{opacity:0,y:18},{opacity:1,y:0,duration:1.1,ease:"expo.out"}),Ie.fromTo(this.root.querySelectorAll(".node"),{opacity:0,y:20},{opacity:1,y:0,duration:.9,ease:"expo.out",stagger:.12,delay:.25}),Ie.fromTo(this.root.querySelectorAll(".panel"),{opacity:0,y:26},{opacity:1,y:0,duration:1,ease:"expo.out",stagger:.14,delay:.6}),await le(900),this._autostart=setTimeout(()=>{this.phase==="idle"&&this._run()},800)},async leave(){clearTimeout(this._autostart),this.run&&this.run.kill(),this.ctx.world.scan(!1),await Ie.to(this.root.querySelector(".hud"),{opacity:0,y:-12,duration:.6,ease:"power2.in"}).then(),this.root.querySelector(".pins").style.opacity=0},reset(){clearTimeout(this._autostart),this.run&&this.run.kill(),this.phase="idle"},primary(){return this.phase==="idle"?(clearTimeout(this._autostart),this._run(),"handled"):this.phase==="running"?(this.run.skip=!0,"handled"):"next"},autoStep(){return this.phase==="idle"?(clearTimeout(this._autostart),this._run(),"wait"):this.phase==="running"?"wait":"next"},hint(){return this.phase==="running"?"\u7D50\u679C\u307E\u3067\u30B9\u30AD\u30C3\u30D7":this.phase==="done"?"\u671D\u306E\u627F\u8A8D\u3078":""},autoPause:1500,beatPause:2500,setNode(n,t){let e=this.root.querySelector(`.node[data-n=${n}]`);e&&(e.classList.toggle("is-active",t==="active"),e.classList.toggle("is-done",t==="done"))},async flow(n,{dur:t=.9}={}){let e=this.root.querySelector(`.link[data-l="${n}"]`),i=e.querySelector(".on"),s=e.querySelector(".dot"),r=e.clientWidth;Ie.set(s,{x:0,opacity:1}),Ie.to(s,{x:r,duration:t,ease:"power2.inOut",onComplete:()=>Ie.set(s,{opacity:0})}),Ie.fromTo(i,{width:0},{width:"100%",duration:t,ease:"power2.inOut"}),await this.run.wait(t*1e3*.85)},src(n,t){let e=this.root.querySelector(`.src[data-s=${n}]`);e&&(e.classList.toggle("is-run",t==="run"),e.classList.toggle("is-ok",t==="ok"))},pin(n,t,e="",i){let s=_e(`<div class="pin mini ${e}" data-code="${n}"${i?` style="--stem:${i}rem"`:""}><i class="stem"></i><i class="dot"></i><div class="card"><span class="v">${t}</span></div></div>`);this.el.pins.append(s);let r=this.ctx.world.addPin(n,s,{x:0,y:.1,z:0});this._pins.push(r),n!=="SKY"&&this.ctx.world.ping(n,1500);let a=s.querySelector(".stem"),o=s.querySelector(".dot"),l=s.querySelector(".card");return Ie.fromTo(o,{scale:0},{scale:1,duration:.4,ease:"back.out(3)"}),Ie.fromTo(a,{scaleY:0},{scaleY:1,duration:.5,ease:"power3.out"}),Ie.fromTo(l,{opacity:0,y:10,scale:.92},{opacity:1,y:0,scale:1,duration:.5,ease:"expo.out",delay:.2}),s},updatePin(n,t,e){n.querySelector(".v").innerHTML=t,e&&n.classList.add(e),Ie.fromTo(n.querySelector(".card"),{scale:1.12},{scale:1,duration:.6,ease:"elastic.out(1,.55)"})},block(n,{name:t,meta:e}={}){let i=_e(`<div class="blk"><div class="bh"><img src="${n.portrait}" alt=""><span>${t||n.name}</span><span class="meta">${e||`\u5728\u5EAB ${n.stock}${n.unit}`}</span></div></div>`);return this.el.inner.append(i),Ie.from(i,{opacity:0,y:12,duration:.45,ease:"power2.out"}),i},async say(n,t,e=""){let i=_e(`<div class="ln ${e}"></div>`);return n.append(i),await ar(i,t,{cps:52,run:this.run,onTick:()=>{this.tokens+=1,this.el.tok.textContent=`${Math.round(this.tokens*1.6).toLocaleString("ja-JP")} tokens`}}),await this.run.wait(180),i},async tickCell(n,t,e){let i=this.root.querySelector(`.c[data-r=${n}] .dot[data-c=${t}]`);i&&(i.className="dot "+e,e==="fix"&&(i.querySelector(".ic").innerHTML=$t.arrowDn))},note(n,t=!1){let e=this.el.note;e.innerHTML=n,e.classList.toggle("bad",!!t),e.classList.add("is-on")},setHead(n,t){Ie.to([this.el.h2,this.el.sub],{opacity:0,y:-8,duration:.3,onComplete:()=>{this.el.h2.textContent=n,this.el.sub.textContent=t,Ie.to([this.el.h2,this.el.sub],{opacity:1,y:0,duration:.6,ease:"expo.out"})}})},async _run(){if(this.phase!=="idle")return;let n=this.run=new Wi;this.phase="running",this.ctx.director.updateHint();let{world:t,chrome:e}=this.ctx,i=(s,r=.9)=>n.skip?e.setClock(s,{instant:!0}):e.setClock(s,{dur:r});try{this.setNode("data","active"),t.scan(!0),i("22:04",.9),await n.wait(700),this.src("inv","run"),await n.wait(650),this.src("inv","ok"),this.src("sales","run"),await n.wait(550),this.src("sales","ok"),i("23:30",.9),this.src("wx","run"),await n.wait(700),this.src("wx","ok"),this.pin("SKY",`\u96E8 <b>${Math.round(xe.pop*100)}</b>%`,"",3.4),i("01:10",.9),this.src("sup","run"),await n.wait(700),this.src("sup","ok"),this.setNode("data","done"),await this.flow(0),this.setNode("llm","active"),i("02:30",.9);let s={},r=Re("umbrella"),a=Re("bento"),o=Re("milk"),l=Re("coffee"),c=this.block(r);await this.say(c,`\u904E\u53BB14\u65E5\u306E\u3046\u3061\u96E8\u306E\u65E5\u306F5\u65E5\u3002\u5098\u306F\u96E8\u306E\u65E5\u306B1\u65E5\u5E73\u5747${Math.round(r.rainAvg*10)/10}\u672C\u3001\u6674\u308C\u306E\u65E5\u306F${Math.round(r.dryAvg*10)/10}\u672C\u3067\u3057\u305F\u3002`),await this.say(c,`\u660E\u65E580%\u30FB\u660E\u5F8C\u65E560%\u306E\u96E8\u4E88\u5831\u304B\u3089\u30012\u65E5\u5206\u306E\u9700\u8981\u3092\u7D04${Math.round(r.order.demand)}\u672C\u3068\u898B\u8FBC\u307F\u307E\u3059\u3002`),await this.say(c,`\u96E8\u304C\u7D9A\u304F\u5834\u5408\u306B\u5099\u3048\u3066\u3001\u4F59\u88D5\u3092\u6301\u305F\u305B\u305F\u6570\u91CF\u3092\u63D0\u6848\u3057\u307E\u3059\u3002\u2192 ${r.draft}\u672C`,"res"),s.umbrella=this.pin("A-03",`\u5098 <b>${r.draft}</b>\u672C`,"",2.2),c=this.block(a,{meta:`\u5728\u5EAB ${a.stock}\u500B \xB7 \u671F\u9650 \u4ECA\u591C`}),await this.say(c,`\u96E8\u306E\u65E5\u306E\u8CA9\u58F2\u306F\u5E73\u5747${Math.round(a.rainAvg)}\u500B\u3002\u6674\u308C\u306E\u65E5\u306F${Math.round(a.dryAvg)}\u500B\u3067\u3001\u8CA9\u58F2\u304C\u7D04${Math.round((1-a.rainAvg/a.dryAvg)*100)}%\u6E1B\u308A\u307E\u3059\u3002`),await this.say(c,`\u4ECA\u3042\u308B${a.stock}\u500B\u306F\u4ECA\u591C\u3067\u671F\u9650\u5207\u308C\u3002\u660E\u65E5\u306E\u8CA9\u58F2\u306B\u306F\u4F7F\u3048\u307E\u305B\u3093\u3002`),await this.say(c,`\u901A\u5E38${a.usual}\u500B\u306E\u3068\u3053\u308D\u3001\u5C11\u306A\u3081\u306B\u3002\u2192 ${a.draft}\u500B`,"res"),s.bento=this.pin("C-01",`\u5F01\u5F53 <b>${a.draft}</b>\u500B`,"",5.6),c=this.block(o,{name:_n.retry.wrong,meta:"\u5728\u5EAB 0.5\u30B1\u30FC\u30B9"}),this.milkBlk=c,await this.say(c,"\u6BCE\u65E560\u672C\u524D\u5F8C\u304C\u52D5\u304D\u307E\u3059\u3002\u914D\u9001\u306F2\u65E5\u304A\u304D\u3067\u3059\u3002"),await this.say(c,`\u5728\u5EAB\u306F\u6B8B\u308A\u534A\u30B1\u30FC\u30B9\u3002\u2192 ${o.draft}\u30B1\u30FC\u30B9`,"res"),s.milk=this.pin("C-02",`\u725B\u4E73 <b>${o.draft}</b>\u30B1\u30FC\u30B9`,"",2.4),c=this.block(l),await this.say(c,`\u6700\u4F4E\u6C17\u6E29\u306F${xe.lo}\u2103\u3002\u6C17\u6E29\u304C\u4F4E\u3044\u65E5\u306F\u8CA9\u58F2\u304C\u7D04${Math.round((l.cold-1)*100)}%\u5897\u3048\u3066\u3044\u307E\u3059\u3002`),await this.say(c,`\u901A\u5E38${l.usual}\u672C\u306E\u3068\u3053\u308D\u3001\u5897\u3084\u3057\u307E\u3059\u3002\u2192 ${l.draft}\u672C`,"res"),s.coffee=this.pin("D-01",`\u7F36\u30B3\u30FC\u30D2\u30FC <b>${l.draft}</b>\u672C`,"",5.2);let h=ee.filter(d=>!W_.includes(d.id));c=_e(`<div class="blk"><div class="bh"><span>\u307B\u304B${h.length}\u54C1\u76EE</span><span class="meta">\u540C\u3058\u624B\u9806\u3067\u4E0B\u66F8\u304D</span></div><div class="tick"></div></div>`),this.el.inner.append(c),Ie.from(c,{opacity:0,y:12,duration:.4});let f=c.querySelector(".tick");for(let d of h){let g=_e(`<span class="chip ${d.dir}">${d.short}<b>${d.draft}</b><i>${$_[d.dir]}${d.delta?Math.abs(d.delta):""}</i></span>`);f.append(g),Ie.from(g,{opacity:0,scale:.8,duration:.3,ease:"back.out(2)"}),this.tokens+=14,this.el.tok.textContent=`${Math.round(this.tokens*1.6).toLocaleString("ja-JP")} tokens`,await n.wait(150)}await n.wait(500),this.setNode("llm","done"),await this.flow(1),this.setNode("code","active"),i("03:20",.9);for(let d of ee){let g=this.root.querySelectorAll(`[data-r=${d.id}]`);await n.wait(d.fix?300:200),this.ctx.sfx&&this.ctx.sfx.tick();let v=["sku","unit","cap","life"];for(let m of v)d.fix==="cap"&&m==="cap"||d.fix==="sku"&&m==="sku"||this.tickCell(d.id,m,"ok"),await n.wait(55);d.fix==="cap"&&(g.forEach(m=>m.classList.add("row-hl")),this.tickCell(d.id,"cap","fix"),this.note(`<b>\u5098</b>\u3000${d.draft}\u672C \u2192 <b>${d.proposed}\u672C</b>\u306B\u4FEE\u6B63\u3002\u68DA\u306E\u4E0A\u9650\u306F${d.cap}\u672C\u3001\u5728\u5EAB${d.stock}\u672C\u306E\u305F\u3081\u3001\u8FFD\u52A0\u306F${d.cap-d.stock}\u672C\u307E\u3067\u3067\u3059\u3002`),this.updatePin(s.umbrella,`\u5098 <s>${d.draft}</s><b>${d.proposed}</b>\u672C`,"is-fix"),await n.wait(1900),g.forEach(m=>m.classList.remove("row-hl"))),d.fix==="sku"&&(g.forEach(m=>m.classList.add("row-hl")),this.tickCell(d.id,"sku","bad"),this.root.querySelector(`.c[data-r=${d.id}] .dot[data-c=sku] .ic`).innerHTML=$t.x,this.note(`<b>\u725B\u4E73</b>\u3000\u300C${_n.retry.wrong}\u300D\u306F\u4ED5\u5165\u5148\u30AB\u30BF\u30ED\u30B0\u306B\u3042\u308A\u307E\u305B\u3093\u3002LLM\u3078\u5DEE\u3057\u623B\u3057\u307E\u3059\u3002`,!0),await n.wait(700),await this._retryArc(),this.setNode("code","active"),this.tickCell(d.id,"sku","fix"),this.root.querySelector(`.c[data-r=${d.id}] .dot[data-c=sku] .ic`).innerHTML=$t.check,this.note(`<b>\u725B\u4E73</b>\u3000LLM\u304C\u300C${_n.retry.right}\u300D\u306B\u7F6E\u304D\u63DB\u3048\u3002\u518D\u78BA\u8A8D\u3067\u901A\u904E\u3057\u307E\u3057\u305F\u3002`),this.updatePin(s.milk,`\u725B\u4E73 <b>${o.draft}</b>\u30B1\u30FC\u30B9`,"is-fix"),await n.wait(1700),g.forEach(m=>m.classList.remove("row-hl"))),this.checked++,this.el.chk.textContent=`${this.checked} / ${ee.length}`;{let m=this.root.querySelector(".chk-wrap"),p=this.root.querySelector(`.c.nm[data-r=${d.id}]`);Ie.to(m,{scrollTop:Math.max(0,p.offsetTop-m.clientHeight+p.offsetHeight*3),duration:.35,ease:"power2.out"})}}this.note("<b>12\u54C1\u76EE</b>\u306E\u78BA\u8A8D\u304C\u7D42\u308F\u308A\u307E\u3057\u305F\u3002\u30B3\u30FC\u30C9\u304C\u76F4\u3057\u305F\u306E\u306F<b>2\u4EF6</b>\u3067\u3059\u3002"),this.setNode("code","done"),await this.flow(2),this.setNode("human","done"),t.scan(!1),i("04:12",1.1),e.clockSub.textContent="\u4E0B\u66F8\u304D\u5B8C\u6210";let u=of();this.setHead("\u4E0B\u66F8\u304D\u5B8C\u6210\u3002\u671D\u306E\u627F\u8A8D\u3092\u5F85\u3063\u3066\u3044\u307E\u3059\u3002",`${u.total}\u54C1\u76EE \xB7 \u5897\u3084\u3059${u.up} \xB7 \u6E1B\u3089\u3059${u.down} \xB7 \u636E\u3048\u7F6E\u304D${u.hold} \xB7 \u30B3\u30FC\u30C9\u306E\u4FEE\u6B63${u.fixed}\u4EF6`),this.el.go.classList.add("is-on"),this.phase="done",this.ctx.sfx&&this.ctx.sfx.chime(),this.ctx.director.updateHint()}catch(s){jl(s)||console.error(s)}},async _retryArc(){let n=this.run,t=this.el.retry.querySelector("path:not(.tip)"),e=this.el.retry.querySelector(".tip"),i=this.el.retryLab,s=t.getTotalLength();Ie.set(t,{strokeDasharray:"6 5",opacity:1}),Ie.fromTo(t,{strokeDashoffset:s},{strokeDashoffset:0,duration:.9,ease:"power2.inOut"}),Ie.to(i,{opacity:1,duration:.4}),Ie.to(e,{opacity:1,duration:.3,delay:.8}),this.setNode("code",""),this.setNode("llm","active"),await n.wait(1e3);let r=this.milkBlk;await this.say(r,`\u30B3\u30FC\u30C9\u304B\u3089\u5DEE\u3057\u623B\u3057: \u300C${_n.retry.wrong}\u300D\u306F\u30AB\u30BF\u30ED\u30B0\u306B\u3042\u308A\u307E\u305B\u3093\u3002`,"fix"),await this.say(r,`\u2192 \u300C${_n.retry.right}\u300D\u306B\u7F6E\u304D\u63DB\u3048\u307E\u3059\u30025\u30B1\u30FC\u30B9\u306E\u307E\u307E\u3002`,"ok"),r.querySelector(".bh span").textContent=ee.find(a=>a.id==="milk").name,this.setNode("llm","done"),Ie.to([t,e,i],{opacity:0,duration:.5}),await n.wait(300)}};var Ea=window.gsap,or=class{constructor(t,{renderCard:e,onAction:i,who:s="StoreMind"}={}){this.root=t,this.renderCard=e,this.onAction=i,this.who=s,this.root.classList.add("chat"),this.msgs=_e('<div class="msgs" role="log" aria-live="polite"></div>'),this.root.append(this.msgs),this.busy=!1}clear(){this.msgs.innerHTML=""}scroll(){let t=this.msgs;Ea.to(t,{scrollTop:t.scrollHeight,duration:.4,ease:"power2.out",overwrite:!0})}addUser(t){let e=_e('<div class="msg user"><div class="bub"></div></div>');return e.querySelector(".bub").textContent=t,this.msgs.append(e),Ea.from(e,{opacity:0,y:14,duration:.45,ease:"expo.out"}),this.scroll(),e}async reply(t,{run:e}={}){this.busy=!0;let i=_e(`<div class="msg ai"><div class="av">${$t.spark}</div><div class="body"></div></div>`),s=i.querySelector(".body");this.msgs.append(i),Ea.from(i,{opacity:0,y:14,duration:.45,ease:"expo.out"});let r=_e('<div class="thinking"><i></i><i></i><i></i></div>');s.append(r),this.scroll();try{for await(let a of t){if(e&&e.dead)break;if(r.remove(),a.type==="tool")await this._tool(s,a,e);else if(a.type==="text")await this._text(s,a.text,e);else if(a.type==="card"&&this.renderCard){let o=this.renderCard(a);o&&(s.append(o),Ea.from(o,{opacity:0,y:16,duration:.6,ease:"expo.out"}),this.scroll())}else a.type==="action"&&this.onAction&&await this.onAction(a);!s.contains(r)&&a.type!=="action"&&a.type,this.scroll()}}catch(a){if(!jl(a))throw a}finally{r.remove(),this.busy=!1}}async _tool(t,e,i){let s=_e(`<div class="tool is-run"><span class="ti">${$t[e.icon]||$t.db}</span><span class="tl">${e.label}</span><span class="ta">${e.arg||""}</span><span class="tr"></span><span class="ts"></span></div>`);t.append(s),Ea.from(s,{opacity:0,x:-10,duration:.4,ease:"expo.out"}),this.scroll();let r=i&&i.skip?0:(e.ms??800)/$i;await new Promise(a=>setTimeout(a,r)),s.classList.remove("is-run"),s.classList.add("is-done"),window.__sfx&&window.__sfx.pop(),s.querySelector(".tr").textContent=e.result||"",s.querySelector(".ts").innerHTML=$t.check}async _text(t,e,i){for(let s of e.split(`
`)){let r=_e('<p class="tx"></p>');t.append(r),await ar(r,s,{cps:56,run:i,onTick:()=>this.scroll()})}}};function ic(n){let{kind:t,data:e}=n;switch(t){case"revision":{let{p:i,from:s,to:r}=e;return _e(`<div class="rcard is-rev"><div class="rh"><span>\u6570\u91CF\u306E\u4FEE\u6B63</span><span>${r===s?"\u5909\u66F4\u306A\u3057":"\u30B3\u30FC\u30C9\u306E\u78BA\u8A8D \u2713"}</span></div>
        <div class="rb"><span class="from">${s}</span><span class="ic arr">${$t.arrowR}</span><span class="to">${r}</span><span class="nm">${i.name}<small>${i.unit} \xB7 \u627F\u8A8D\u5F85\u3061\u306B\u53CD\u6620\u6E08\u307F</small></span></div></div>`)}case"stock":{let{p:i,now:s}=e,r=Math.min(100,Math.round(s/i.cap*100));return _e(`<div class="rcard is-stock"><div class="rh"><span>\u5728\u5EAB</span><span>14:20 \u6642\u70B9</span></div>
        <div class="rb"><div class="big">${s}<small>${i.unit}</small></div>
        <div class="kv"><span>${i.name}</span><span class="mute">${i.shelf.zone} \xB7 ${i.shelf.code}\uFF08${i.shelf.label}\uFF09</span>
        <span class="mute">\u68DA\u306E\u4E0A\u9650 ${i.cap}${i.unit} \u306B\u5BFE\u3057\u3066 ${r}%</span></div></div></div>`)}case"locate":{let{p:i}=e;return _e(`<div class="rcard is-stock"><div class="rh"><span>\u68DA\u306E\u5834\u6240</span><span>\u5E97\u5185\u306E\u6A21\u578B\u306B\u8868\u793A\u4E2D</span></div>
        <div class="rb"><div class="big" style="font-size:2.8rem">${i.shelf.code}</div><div class="kv"><span>${i.shelf.zone}</span><span class="mute">${i.shelf.label}</span></div></div></div>`)}case"delivery":return _e(`<div class="rcard"><div class="rh"><span>\u672C\u65E5\u306E\u5165\u8377\u4E88\u5B9A</span><span>${e.rows.length}\u4FBF</span></div><div class="rb"><table>${e.rows.map(i=>`<tr class="${i.status==="next"?"is-next":i.status==="done"?"is-done":""}"><td>${i.time}</td><td><b>${i.name}</b><br><span class="mute">${i.items}</span></td><td style="text-align:right;white-space:nowrap">${i.status==="done"?"\u5165\u8377\u6E08\u307F":i.status==="next"?"\u6B21\u306E\u4FBF":""}</td></tr>`).join("")}</table></div></div>`);case"expiry":return _e(`<div class="rcard"><div class="rh"><span>\u671F\u9650\u304C\u8FD1\u3044\u5546\u54C1</span><span>\u4ECA\u591C 24:00</span></div><div class="rb"><table>${e.rows.map(i=>`<tr><td>${String(i.p.shelf.code)}</td><td><b>${i.p.name}</b></td><td style="text-align:right;white-space:nowrap">${i.now}${i.p.unit}</td></tr>`).join("")}</table></div></div>`);case"weather":return _e(`<div class="rcard"><div class="rh"><span>\u4ECA\u65E5\u306E\u964D\u6C34\u78BA\u7387</span><span>3\u6642\u9593\u3054\u3068</span></div><div class="rb"><div class="bars" style="margin-bottom:1.5rem">${e.hourly.map(i=>`<i data-l="${i.h}\u6642" style="height:${Math.round(i.p*100)}%"><b>${Math.round(i.p*100)}</b></i>`).join("")}</div></div></div>`)}return null}var vn="#0E1D40",lr="#000";function ff(n,{w:t=560,h:e=168}={}){let i=n.history,s=Math.max(...i)*1.18||1,r=(t-20)/14-8,a=10,o=e-26,l=40,c=i.map((u,d)=>{let g=Math.max(2,u/s*(o-l)),v=a+d*(r+8),m=o-g,p=fs[d];return`<g class="bar" data-i="${d}"><rect x="${v}" y="${m}" width="${r}" height="${g}" fill="${p?vn:"#ECE9D6"}" stroke="${p?vn:"#9a9680"}" stroke-width="${p?0:1.6}" ${p?"":'stroke-dasharray="4 3"'}/>
      ${p?`<text x="${v+r/2}" y="${o+16}" text-anchor="middle" font-size="12" font-weight="700" fill="${vn}">\u96E8</text>`:""}</g>`}).join(""),h=n.rainAvg.toFixed(1),f=n.dryAvg.toFixed(1);return`<svg viewBox="0 0 ${t} ${e}" class="chart sales" role="img" aria-label="${n.name}\u306E\u904E\u53BB14\u65E5\u306E\u8CA9\u58F2\u3002\u96E8\u306E\u65E5\u306E\u5E73\u5747${h}\u3001\u6674\u308C\u306E\u65E5\u306E\u5E73\u5747${f}">
    <line x1="0" y1="${o}" x2="${t}" y2="${o}" stroke="${lr}" stroke-width="2"/>${c}
    <g font-size="14" font-weight="700" fill="${lr}"><rect x="0" y="4" width="13" height="13" fill="${vn}"/><text x="20" y="16">\u96E8\u306E\u65E5 \u5E73\u5747 ${h}</text></g>
    <g font-size="14" font-weight="700" fill="${lr}"><rect x="${t/2}" y="4" width="13" height="13" fill="#ECE9D6" stroke="#9a9680" stroke-width="1.6" stroke-dasharray="3 2"/><text x="${t/2+20}" y="16">\u305D\u308C\u4EE5\u5916 \u5E73\u5747 ${f}</text></g>
  </svg>`}function pf(n,t,{w:e=560,h:i=78}={}){let s=n.cap,r=n.expiresTonight?0:n.stock,a=n.expiresTonight?n.stock:0,o=f=>Math.min(1,f/s)*e,l=o(r),c=o(t),h=o(a);return`<svg viewBox="0 0 ${e} ${i}" class="chart stock" role="img" aria-label="\u5728\u5EAB${n.stock}\u3001\u767A\u6CE8${t}\u3001\u4E0A\u9650${s}">
    <defs><pattern id="hatch" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="7" stroke="${lr}" stroke-width="1.6"/></pattern></defs>
    <rect x="0" y="14" width="${e}" height="26" fill="#F4F2E4" stroke="${vn}" stroke-width="2"/>
    ${a?`<rect x="0" y="14" width="${h}" height="26" fill="url(#hatch)" opacity=".55"/>`:""}
    ${r?`<rect x="0" y="14" width="${l}" height="26" fill="${vn}"/>`:""}
    <rect class="order" x="${r?l:0}" y="14" width="${c}" height="26" fill="${vn}" fill-opacity=".22" stroke="${vn}" stroke-width="2" stroke-dasharray="6 4"/>
    <line x1="${e-1}" y1="6" x2="${e-1}" y2="48" stroke="${lr}" stroke-width="3"/>
    <g font-size="13" font-weight="700" fill="${lr}">
      <text x="2" y="62">${a?`\u5728\u5EAB ${n.stock}${n.unit}\uFF08\u4ECA\u591C\u3067\u671F\u9650\u5207\u308C\uFF09`:`\u5728\u5EAB ${n.stock}${n.unit}`}</text>
      <text x="${e}" y="10" text-anchor="end">\u4E0A\u9650 ${s}${n.unit}</text>
      <text x="${Math.min(e-6,(r?l:0)+c)}" y="62" text-anchor="end" fill="${vn}">\u767A\u6CE8 +${t}${n.unit}</text>
    </g></svg>`}var Bh=n=>(Math.round(n*10)/10).toString(),rn=n=>zt.edits.has(n.id)?zt.edits.get(n.id):zt.sim?Yl(n,zt.sim.pop,xe.lo,zt.sim.pop*.75).qty:n.proposed,X_=n=>Math.round(n.rainAvg*.62*10)/10;function cr(n){let t=(n.expiresTonight?0:n.stock)+rn(n);return Math.max(0,Math.round(t-X_(n)))}var q_=n=>{let t=n.match(/\d+(?:\.\d+)?/g);return t?t.map(Number):[]},nc=n=>ee.find(t=>n.includes(t.short)||n.includes(t.name.slice(0,2))||n.toLowerCase().includes(t.en.toLowerCase().split(" ")[0]));function gf(n,t={}){let e=n.trim(),i=q_(e),s=e.match(/(\d{1,2})\s*番/),r=s?ee.find(a=>a.no===+s[1]):nc(e);if(/承認|発注して|確定|これで(いい|OK)/.test(e)&&!/理由|なぜ/.test(e))return{type:"approve"};if(/降らな|晴れ|止ん|もし|降水確率|雨が?(弱|止)/.test(e)){let a=e.match(/(\d{1,3})\s*[%％]/);return{type:"whatif",pop:a?Math.min(100,+a[1])/100:(/降らな|止/.test(e),.2)}}if(/理由|なぜ|どうして|根拠|説明/.test(e))return{type:"explain",p:r||t.selected||ee[0]};if(r&&(/見直|増や|多|足り|切れ|少な|減ら|変更|修正|もっと|にして|へ/.test(e)||i.length>=(s?2:1))){let a=s?i.filter(c=>c!==+s[1]||i.indexOf(c)>0):i,o=s?i.length>1?i[i.length-1]:null:i.length?i[i.length-1]:null,l=0;return/増や|多|足り|切れ|もっと/.test(e)&&(l=1),/減ら|少な|余/.test(e)&&(l=-1),{type:"revise",p:r,target:o,dir:l}}return/状況|未確認|残り|進捗/.test(e)?{type:"status"}:{type:"fallback",text:e}}async function*xf(n,t={}){switch(n.type){case"revise":{let e=n.p,i=rn(e),s=e.id==="milk"&&n.target==null,r=n.target!=null?n.target:n.dir<0?i-e.pack:i+(s?$n.to-$n.from:e.pack);r=Math.max(0,Math.min(Math.floor(e.cap/e.pack)*e.pack,Math.round(r/e.pack)*e.pack)),s&&(r=$n.to),yield{type:"tool",icon:"chart",label:"\u8CA9\u58F2\u5C65\u6B74\u3092\u518D\u96C6\u8A08",arg:`${e.short} \xB7 \u76F4\u8FD17\u65E5`,result:`\u5E73\u5747 ${Bh(e.rainAvg)}${e.unit}/\u65E5`,ms:900},yield{type:"tool",icon:"db",label:"\u5728\u5EAB\u306E\u63A8\u79FB\u3092\u78BA\u8A8D",arg:e.short,result:e.id==="milk"?"12\u672C\u3092\u4E0B\u56DE\u3063\u305F\u65E5 2\u56DE":`\u73FE\u5728\u5EAB ${e.stock}${e.unit}`,ms:800},e.id==="milk"&&(yield{type:"tool",icon:"cube",label:"\u9031\u672B\u306E\u9700\u8981\u3092\u88DC\u6B63",arg:"\u571F\u65E5\u306E\u50BE\u5411",result:"+18%",ms:700}),yield{type:"tool",icon:"checks",label:"\u30B3\u30FC\u30C9\u3067\u518D\u78BA\u8A8D",arg:`SKU \xB7 \u767A\u6CE8\u5358\u4F4D \xB7 \u4E0A\u9650 ${e.cap}${e.unit}`,result:r<=e.cap?"\u3059\u3079\u3066\u901A\u904E":"\u4E0A\u9650\u3092\u8D85\u3048\u308B\u305F\u3081\u8ABF\u6574",ms:900,ok:!0},e.id==="milk"&&n.target==null?yield{type:"text",text:$n.answer}:yield{type:"text",text:r===i?`${e.name}\u306F${i}${e.unit}\u306E\u307E\u307E\u3067\u554F\u984C\u3042\u308A\u307E\u305B\u3093\u3002\u904E\u53BB\u306E\u8CA9\u58F2\u3068\u5929\u6C17\u4E88\u5831\u304B\u3089\u898B\u3066\u3001\u3053\u306E\u6570\u91CF\u3067\u8DB3\u308A\u308B\u898B\u8FBC\u307F\u3067\u3059\u3002`:`${e.name}\u3092${i}${e.unit}\u304B\u3089${r}${e.unit}\u306B\u4FEE\u6B63\u3057\u307E\u3059\u3002${r>i?"\u6B20\u54C1\u306E\u30EA\u30B9\u30AF\u3092\u4E0B\u3052\u308B\u65B9\u5411\u3067\u3059\u3002":"\u5EC3\u68C4\u306E\u30EA\u30B9\u30AF\u3092\u4E0B\u3052\u308B\u65B9\u5411\u3067\u3059\u3002"}\u30B3\u30FC\u30C9\u306E\u78BA\u8A8D\u3082\u901A\u904E\u3057\u307E\u3057\u305F\u3002`},yield{type:"card",kind:"revision",data:{p:e,from:i,to:r}},r!==i&&(yield{type:"action",name:"setQty",payload:{id:e.id,qty:r,byChat:!0}});return}case"explain":{let e=n.p;yield{type:"tool",icon:"db",label:"\u5728\u5EABDB\u3092\u7167\u4F1A",arg:e.name,result:`${e.stock}${e.unit}`,ms:700},yield{type:"tool",icon:"rain",label:"\u5929\u6C17\u4E88\u5831\u3092\u53C2\u7167",arg:"\u660E\u65E5 \u96E8 80%",result:`\u6700\u4F4E ${xe.lo}\u2103`,ms:700},yield{type:"tool",icon:"chart",label:"\u8CA9\u58F2\u5C65\u6B74\u3092\u96C6\u8A08",arg:"14\u65E5",result:`\u96E8 ${Bh(e.rainAvg)} / \u6674 ${Bh(e.dryAvg)}`,ms:800},yield{type:"text",text:Zl(e).join(`
`)+(e.fix==="cap"?`
LLM\u306E\u4E0B\u66F8\u304D\u306F${e.draft}${e.unit}\u3067\u3057\u305F\u304C\u3001\u68DA\u306E\u4E0A\u9650\u3092\u8D85\u3048\u308B\u305F\u3081\u3001\u30B3\u30FC\u30C9\u304C${e.proposed}${e.unit}\u306B\u4FEE\u6B63\u3057\u3066\u3044\u307E\u3059\u3002`:"")},yield{type:"action",name:"select",payload:{id:e.id}};return}case"whatif":{let e=n.pop;yield{type:"tool",icon:"rain",label:"\u6761\u4EF6\u3092\u5909\u3048\u3066\u518D\u8A08\u7B97",arg:`\u964D\u6C34\u78BA\u7387 ${Math.round(e*100)}%`,result:"12\u54C1\u76EE",ms:1100},yield{type:"tool",icon:"checks",label:"\u30B3\u30FC\u30C9\u3067\u518D\u78BA\u8A8D",arg:"\u4E0A\u9650 \xB7 \u767A\u6CE8\u5358\u4F4D",result:"\u3059\u3079\u3066\u901A\u904E",ms:700,ok:!0};let i=ee.map(r=>({p:r,from:r.proposed,to:Yl(r,e,xe.lo,e*.75).qty})).filter(r=>r.from!==r.to),s=i.find(r=>r.p.id==="umbrella");yield{type:"text",text:`\u964D\u6C34\u78BA\u7387\u304C${Math.round(e*100)}%\u306E\u5834\u5408\u3001${i.length}\u54C1\u76EE\u306E\u6570\u91CF\u304C\u5909\u308F\u308A\u307E\u3059\u3002${s?`\u5098\u306F${s.from}\u672C\u304B\u3089${s.to}\u672C\u306B\u6E1B\u308A\u307E\u3059\u3002`:""}\u753B\u9762\u306B\u53CD\u6620\u3057\u307E\u3057\u305F\u3002\u5143\u306E\u4E88\u5831\uFF0880%\uFF09\u306B\u623B\u3059\u306B\u306F\u3001\u30B9\u30E9\u30A4\u30C0\u30FC\u3092\u52D5\u304B\u3057\u3066\u304F\u3060\u3055\u3044\u3002`},yield{type:"action",name:"sim",payload:{pop:e}};return}case"approve":{yield{type:"tool",icon:"checks",label:"\u627F\u8A8D\u524D\u306E\u78BA\u8A8D",arg:"12\u54C1\u76EE",result:"\u3059\u3079\u3066\u901A\u904E",ms:900,ok:!0},yield{type:"text",text:"12\u54C1\u76EE\u306E\u5185\u5BB9\u3092\u78BA\u8A8D\u3057\u307E\u3057\u305F\u3002\u627F\u8A8D\u3059\u308B\u3068\u3001\u4ED5\u5165\u5148\u3054\u3068\u306E\u767A\u6CE8\u66F8\u306B\u307E\u3068\u307E\u308A\u307E\u3059\u3002"},yield{type:"action",name:"approve",payload:{}};return}case"status":{let e=zt.reviewed.size;yield{type:"text",text:`\u78BA\u8A8D\u6E08\u307F\u306F${e}\u54C1\u76EE\u3001\u624B\u3067\u76F4\u3057\u305F\u306E\u306F${zt.edits.size}\u54C1\u76EE\u3067\u3059\u3002\u6B8B\u308A\u306E${ee.length-e}\u54C1\u76EE\u306F\u3001\u305D\u306E\u307E\u307E\u627F\u8A8D\u3059\u308B\u3053\u3068\u3082\u3067\u304D\u307E\u3059\u3002`};return}default:{yield{type:"tool",icon:"db",label:"\u5728\u5EAB\u30FB\u8CA9\u58F2\u30C7\u30FC\u30BF\u3092\u78BA\u8A8D",arg:"12\u54C1\u76EE",result:"\u5909\u66F4\u306E\u5FC5\u8981\u306A\u3057",ms:900},yield{type:"text",text:"\u3044\u307E\u306E\u63D0\u6848\u306B\u306F\u3001\u8FFD\u52A0\u3067\u76F4\u3059\u70B9\u306F\u898B\u3064\u304B\u308A\u307E\u305B\u3093\u3067\u3057\u305F\u3002\u6570\u91CF\u3092\u5909\u3048\u305F\u3044\u3068\u304D\u306F\u3001\u300C3\u756A\u30928\u30B1\u30FC\u30B9\u306B\u3057\u3066\u300D\u306E\u3088\u3046\u306B\u4F1D\u3048\u3066\u304F\u3060\u3055\u3044\u3002\u7406\u7531\u3092\u77E5\u308A\u305F\u3044\u3068\u304D\u306F\u3001\u300C\u5098\u306E\u7406\u7531\u3092\u6559\u3048\u3066\u300D\u3068\u805E\u3044\u3066\u304F\u3060\u3055\u3044\u3002"};return}}}function _f(n,t={}){let e=n.trim(),i=nc(e)||t.last;return/AR|スキャン|カメラ|棚を(見|映)/i.test(e)?{type:"ar"}:/期限|賞味|廃棄|消費/.test(e)?{type:"expiry"}:/入荷|納品|届く|次の便|いつ.*(来|届|着)/.test(e)?{type:"delivery",p:nc(e)}:/どこ|場所|探|置いて|ある\?|ありますか|棚/.test(e)&&!/在庫/.test(e)?{type:"where",p:i||Re("umbrella")}:/天気|雨|降水|傘が/.test(e)&&!/在庫|いくつ|何本|何個/.test(e)&&!nc(e)?{type:"weather"}:/在庫|いくつ|何個|何本|何パック|残り|ある/.test(e)||i?{type:"stock",p:i||Re("umbrella")}:{type:"fallback",text:e}}async function*vf(n){switch(n.type){case"stock":{let t=n.p,e=cr(t),i=t.delivery;yield{type:"tool",icon:"db",label:"\u5728\u5EABDB\u3092\u7167\u4F1A",arg:t.name,result:`${e}${t.unit}`,ms:800},yield{type:"tool",icon:"truck",label:"\u5165\u8377\u4E88\u5B9A\u3092\u78BA\u8A8D",arg:t.supplier,result:mf(t),ms:700},yield{type:"text",text:`${t.name}\u306E\u5728\u5EAB\u306F\u3001\u3044\u307E${e}${t.unit}\u3067\u3059\u3002\u5834\u6240\u306F${t.shelf.zone}\uFF08${t.shelf.code}\uFF09\u3002${mf(t,!0)}`},yield{type:"card",kind:"stock",data:{p:t,now:e}},yield{type:"action",name:"locate",payload:{code:t.shelf.code,p:t}};return}case"where":{let t=n.p;yield{type:"tool",icon:"pin",label:"\u68DA\u306E\u4F4D\u7F6E\u3092\u691C\u7D22",arg:t.name,result:t.shelf.code,ms:700},yield{type:"text",text:`${t.name}\u306F\u3001${t.shelf.zone}\u306E\u300C${t.shelf.label}\u300D\uFF08${t.shelf.code}\uFF09\u306B\u3042\u308A\u307E\u3059\u3002\u5E97\u5185\u306E\u6A21\u578B\u3067\u5834\u6240\u3092\u793A\u3057\u307E\u3059\u3002`},yield{type:"card",kind:"locate",data:{p:t}},yield{type:"action",name:"locate",payload:{code:t.shelf.code,p:t}};return}case"delivery":{yield{type:"tool",icon:"truck",label:"\u5165\u8377\u4E88\u5B9A\u3092\u7167\u4F1A",arg:"\u672C\u65E5",result:`${Jl.length}\u4FBF`,ms:800};let t=Jl.find(e=>e.status==="next");yield{type:"text",text:`\u6B21\u306E\u5165\u8377\u306F${t.time}\u306E${t.name}\u3067\u3059\u3002${t.items}\u304C\u5C4A\u304D\u307E\u3059\u3002`},yield{type:"card",kind:"delivery",data:{rows:Jl}};return}case"expiry":{yield{type:"tool",icon:"clock",label:"\u671F\u9650\u304C\u8FD1\u3044\u5546\u54C1\u3092\u691C\u7D22",arg:"\u4ECA\u591C\u307E\u3067",result:"3\u54C1\u76EE",ms:900};let t=ee.filter(e=>e.expiresTonight).slice(0,3).map(e=>({p:e,now:cr(e)}));yield{type:"text",text:`\u4ECA\u591C24:00\u304C\u671F\u9650\u306E\u5546\u54C1\u306F3\u54C1\u76EE\u3067\u3059\u3002${t.map(e=>`${e.p.short} ${e.now}${e.p.unit}`).join("\u3001")}\u300215:00\u306E2\u4FBF\u304C\u5C4A\u304F\u524D\u306B\u3001\u68DA\u306E\u624B\u524D\u306B\u4E26\u3079\u76F4\u3059\u3068\u58F2\u308A\u5207\u308A\u3084\u3059\u304F\u306A\u308A\u307E\u3059\u3002`},yield{type:"card",kind:"expiry",data:{rows:t}};return}case"weather":{yield{type:"tool",icon:"rain",label:"\u5929\u6C17\u4E88\u5831\u3092\u53C2\u7167",arg:"\u4ECA\u65E5\u30FB\u660E\u65E5",result:`\u964D\u6C34\u78BA\u7387 ${Math.round(xe.pop*100)}%`,ms:800},yield{type:"text",text:"\u5915\u65B9\u306B\u304B\u3051\u3066\u96E8\u304C\u5F37\u307E\u308B\u4E88\u5831\u3067\u3059\u3002\u964D\u6C34\u78BA\u7387\u306F15\u6642\u306818\u6642\u304C90%\u3002\u5098\u306F\u671D\u306E\u5165\u8377\u5206\u3067\u8DB3\u308A\u308B\u898B\u8FBC\u307F\u3067\u3059\u304C\u3001\u9589\u5E97\u524D\u306B\u6B8B\u308A\u3092\u3054\u78BA\u8A8D\u304F\u3060\u3055\u3044\u3002"},yield{type:"card",kind:"weather",data:{hourly:xe.hourly}};return}case"ar":{yield{type:"text",text:"\u68DA\u3092\u30AB\u30E1\u30E9\u3067\u898B\u306A\u304C\u3089\u3001\u5546\u54C1\u3068\u5728\u5EAB\u306E\u6570\u3092\u91CD\u306D\u3066\u8868\u793A\u3057\u307E\u3059\u3002"},yield{type:"action",name:"ar",payload:{}};return}default:{yield{type:"tool",icon:"db",label:"\u5728\u5EAB\u30FB\u5165\u8377\u30C7\u30FC\u30BF\u3092\u691C\u7D22",arg:n.text.slice(0,18),result:"\u5019\u88DC\u306A\u3057",ms:800},yield{type:"text",text:"\u5546\u54C1\u540D\u3092\u6559\u3048\u3066\u304F\u3060\u3055\u3044\u3002\u305F\u3068\u3048\u3070\u300C\u5098\u306E\u5728\u5EAB\u306F\uFF1F\u300D\u300C\u51B7\u305F\u3044\u304A\u8336\u306F\u3069\u3053\uFF1F\u300D\u300C\u6B21\u306E\u5165\u8377\u306F\u3044\u3064\uFF1F\u300D\u306E\u3088\u3046\u306B\u805E\u3051\u307E\u3059\u3002"};return}}}function mf(n,t=!1){return n.expiresTonight&&n.cat==="\u30C7\u30A4\u30EA\u30FC"?t?"\u6B21\u306E\u5165\u8377\u306F15:00\uFF082\u4FBF\uFF09\u3067\u3059\u3002":"15:00 2\u4FBF":t?"\u4ECA\u65E5\u306E\u5165\u8377\u306F\u5B8C\u4E86\u3057\u3066\u3044\u307E\u3059\u3002":"\u5165\u8377\u6E08\u307F"}var Xe=window.gsap,sc=n=>String(n).padStart(2,"0"),yf=n=>Math.floor((n.cap-(n.expiresTonight?0:n.stock))/n.pack)*n.pack,Mf=n=>n>0?`+${n}`:n<0?`\u2212${Math.abs(n)}`:"\xB10",Y_=`<svg viewBox="0 0 200 200" aria-hidden="true"><defs>
  <filter id="inkroughen" x="-10%" y="-10%" width="120%" height="120%"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="3" seed="7" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="4.2" xChannelSelector="R" yChannelSelector="G"/></filter>
  <filter id="inkspeck"><feTurbulence type="fractalNoise" baseFrequency="1.4" numOctaves="2" seed="2"/><feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -2.2 1.35"/><feComposite in2="SourceGraphic" operator="in"/></filter></defs>
  <g filter="url(#inkroughen)" fill="none" stroke="#0E1D40">
    <circle cx="100" cy="100" r="90" stroke-width="8"/><circle cx="100" cy="100" r="76" stroke-width="2.6"/>
    <g fill="#0E1D40" stroke="none" font-family="Hiragino Mincho ProN,Yu Mincho,serif" font-weight="800" text-anchor="middle">
      <text x="100" y="94" font-size="66">\u627F</text><text x="100" y="158" font-size="66">\u8A8D</text></g>
    <text x="100" y="36" text-anchor="middle" font-family="Bodoni 72,Bodoni Moda,serif" font-size="17" fill="#0E1D40" stroke="none" letter-spacing="3">${sc(Di.tomorrow.m)}.${sc(Di.tomorrow.d)}</text>
  </g></svg>`,bf={id:"morning",title:"\u671D\u306B\u5224\u65AD\u3059\u308B",theme:"day",clockSub:"\u7BA1\u7406\u8005\u306E\u78BA\u8A8D",notes:["\u671D\u3001\u7BA1\u7406\u8005\u304C\u753B\u9762\u3092\u958B\u304F\u3068\u3001\u88DC\u5145\u5019\u88DC\u3068\u305D\u306E\u7406\u7531\u304C\u3059\u3067\u306B\u307E\u3068\u307E\u3063\u3066\u3044\u307E\u3059\u3002","\u6570\u91CF\u3092\u78BA\u8A8D\u3057\u3066\u3001\u5FC5\u8981\u306A\u3089\u4FEE\u6B63\u3059\u308B\u3002\u554F\u984C\u304C\u306A\u3051\u308C\u3070\u627F\u8A8D\u3059\u308B\u3002","\u300C3\u756A\u3001\u5148\u9031\u5207\u308C\u305D\u3046\u3067\u3057\u305F\u300D\u3068\u30C1\u30E3\u30C3\u30C8\u3067\u4F1D\u3048\u308B\u3068\u3001\u8CA9\u58F2\u5C65\u6B74\u3092\u518D\u96C6\u8A08\u3057\u3066\u6570\u91CF\u3092\u76F4\u3057\u3001\u30B3\u30FC\u30C9\u304C\u3082\u3046\u4E00\u5EA6\u78BA\u8A8D\u3057\u307E\u3059\u3002","\u3082\u3057\u96E8\u304C\u964D\u3089\u306A\u304B\u3063\u305F\u3089\uFF1F \u30B9\u30E9\u30A4\u30C0\u30FC\u3092\u52D5\u304B\u3059\u3068\u3001\u5168\u54C1\u76EE\u306E\u6570\u91CF\u304C\u8A08\u7B97\u3057\u76F4\u3055\u308C\u307E\u3059\u3002","\u6700\u7D42\u5224\u65AD\u306F\u7BA1\u7406\u8005\u3067\u3059\u3002\u627F\u8A8D\u3059\u308B\u3068\u3001\u4ED5\u5165\u5148\u3054\u3068\u306E\u767A\u6CE8\u66F8\u306B\u307E\u3068\u307E\u308A\u307E\u3059\u3002"],sel:null,beat:0,mount(n,t){this.ctx=t,this._build()},_build(){let n=this.root;this.tt&&(this.tt.dispose(),this.tt=null),zt.sim=null,n.innerHTML=`
    <div class="paper-bg"></div>
    <div class="sheet" id="sheet">
      <header class="sh-head">
        <div><h2>\u660E\u65E5\u306E\u767A\u6CE8\u63D0\u6848</h2><div class="meta"><span>${Di.tomorrow.label}</span><span>${xe.cond} ${Math.round(xe.pop*100)}%</span><span>${Di.name}</span></div></div>
        <div class="counts">
          <div class="cnt"><b data-c="total">${ee.length}</b><span>\u63D0\u6848</span></div>
          <div class="cnt"><b data-c="rev">0</b><span>\u78BA\u8A8D\u6E08</span></div>
          <div class="cnt"><b data-c="edit">0</b><span>\u4FEE\u6B63</span></div>
        </div>
        <div class="stamp-state"><span>\u627F\u8A8D\u6E08</span><b data-c="at">07:42</b></div>
      </header>
      <div class="sh-body">
        <aside class="list" aria-label="\u63D0\u6848\u306E\u4E00\u89A7">
          <div class="lh"><span>#</span><span></span><span>\u54C1\u76EE\u3068\u7406\u7531</span><span>\u6570\u91CF</span><span>\u901A\u5E38\u6BD4</span></div>
          <ol class="rows">${ee.map(t=>this._row(t)).join("")}</ol>
        </aside>
        <section class="detail" aria-live="polite">
          <div class="d-top">
            <div class="tt"><canvas></canvas><span class="lab">3D</span></div>
            <div class="di"><div class="eb"><b data-d="no">01</b><span>/ ${ee.length}</span><span data-d="cat"></span></div>
              <h3 data-d="nm"></h3>
              <div class="loc"><span><span class="ic">${$t.pin}</span><b data-d="loc"></b></span><span><span class="ic">${$t.truck}</span><b data-d="del"></b></span></div>
              <div class="stats">
                <div class="stat"><div class="l">\u73FE\u5728\u5EAB</div><div class="v" data-d="stock"></div></div>
                <div class="stat"><div class="l">\u901A\u5E38\u306E\u767A\u6CE8</div><div class="v" data-d="usual"></div></div>
                <div class="stat is-main"><div class="l">\u63D0\u6848</div><div class="v" data-d="qty"></div></div>
                <div class="stat"><div class="l">\u901A\u5E38\u6BD4</div><div class="v" data-d="delta"></div></div>
              </div></div>
          </div>
          <div class="d-bot">
            <section><h4>\u7406\u7531 <span class="tag is-concept">LLM</span></h4><div class="why-box" data-d="why"></div>
              <h4 style="margin-top:1rem">\u30B3\u30FC\u30C9\u306E\u78BA\u8A8D <span class="tag">\u30B3\u30FC\u30C9</span></h4><div class="checks" data-d="checks"></div></section>
            <section class="ev">
              <div class="blk"><h4>\u904E\u53BB14\u65E5\u306E\u8CA9\u58F2</h4><div data-d="sales"></div></div>
              <div class="blk"><h4>\u5728\u5EAB\u3068\u68DA\u306E\u4E0A\u9650</h4><div data-d="stockbar"></div></div>
              <div class="blk sim" data-sim><div class="sh"><span class="lab">\u3082\u3057\u964D\u6C34\u78BA\u7387\u304C</span><span class="pct"><span data-sim-pct>${Math.round(xe.pop*100)}</span><small>%</small></span></div>
                <input type="range" min="0" max="100" step="5" value="${Math.round(xe.pop*100)}" aria-label="\u964D\u6C34\u78BA\u7387\u3067\u518D\u8A08\u7B97">
                <div class="res" data-sim-res></div><button class="rst" data-act="rst">\u4E88\u5831\u3069\u304A\u308A\uFF08${Math.round(xe.pop*100)}%\uFF09\u306B\u623B\u3059</button></div>
            </section>
          </div>
        </section>
        <aside class="drawer" aria-label="\u30A2\u30B7\u30B9\u30BF\u30F3\u30C8"><div class="dh"><h3><span class="ic">${$t.spark}</span>\u30A2\u30B7\u30B9\u30BF\u30F3\u30C8\u306B\u76F8\u8AC7</h3><button class="x" aria-label="\u9589\u3058\u308B" data-act="close">${$t.x}</button></div><div class="chat-host"></div></aside>
      </div>
      <footer class="sh-foot">
        <div class="ask-wrap"><div class="ask-bar"><span class="spark"><span class="ic">${$t.spark}</span></span><input type="text" placeholder="\u3053\u306E\u63D0\u6848\u306B\u3064\u3044\u3066\u8CEA\u554F\u3059\u308B\u2026" aria-label="\u8CEA\u554F"><div class="wave">${"<i></i>".repeat(30)}</div><button class="ib" aria-label="\u97F3\u58F0" data-act="mic" title="\u97F3\u58F0\u5165\u529B\uFF08\u30B3\u30F3\u30BB\u30D7\u30C8\uFF09">${$t.mic}</button><button class="ib go" aria-label="\u9001\u4FE1">${$t.send}</button></div>
          <div class="chips sg"><button class="chip" data-q="${$n.question}">3\u756A\u306E\u6570\u91CF\u3092\u898B\u76F4\u3057\u3066</button><button class="chip" data-q="\u5098\u306E\u7406\u7531\u3092\u6559\u3048\u3066">\u5098\u306E\u7406\u7531\u306F\uFF1F</button><button class="chip" data-q="\u3082\u3057\u96E8\u304C\u964D\u3089\u306A\u304B\u3063\u305F\u3089\uFF1F">\u96E8\u304C\u964D\u3089\u306A\u304B\u3063\u305F\u3089\uFF1F</button></div></div>
        <button class="btn is-fill approve" data-act="approve">\u3059\u3079\u3066\u627F\u8A8D\u3059\u308B</button>
        <div class="sent"></div>
      </footer>
      <div class="seal-layer"><div class="seal-ring"></div>${Y_}</div>
    </div>`,this.el={sheet:n.querySelector(".sheet"),rows:n.querySelector(".rows"),drawer:n.querySelector(".drawer"),input:n.querySelector(".ask-bar input"),sg:n.querySelector(".sg"),paper:n.querySelector(".paper-bg"),sim:n.querySelector("[data-sim]"),range:n.querySelector("[data-sim] input"),d:t=>n.querySelector(`[data-d=${t}]`),c:t=>n.querySelector(`[data-c=${t}]`)},this.chat=new or(n.querySelector(".chat-host"),{renderCard:t=>this.card(t),onAction:t=>this.action(t)}),this._bind(),this.sel=null,this.beat=0,this._seen=new Set,this.busy=!1,ee.forEach(t=>this.updateRow(t,{quiet:!0})),this.updateCounts()},_row(n){return`<li class="row" data-id="${n.id}" tabindex="0" role="button" aria-label="${n.name}\u3092\u958B\u304F">
      <i class="rv"></i><span class="no">${sc(n.no)}</span>
      <span class="ph"><img src="${n.portrait}" alt=""></span>
      <span class="tx"><span class="top"><b class="nm">${n.name}</b><span class="flag"></span></span><span class="why">${af(n)}</span></span>
      <span class="qty"><button class="st" data-d="-1" aria-label="\u6E1B\u3089\u3059"><span class="ic">${$t.minus}</span></button><span class="q"><b></b><small>${n.unit}</small></span><button class="st" data-d="1" aria-label="\u5897\u3084\u3059"><span class="ic">${$t.plus}</span></button></span>
      <span class="dl"><b></b><small>\u901A\u5E38\u6BD4</small></span></li>`},_bind(){let n=this.root,{el:t}=this;n.querySelectorAll(".row").forEach(i=>{let s=Re(i.dataset.id);i.addEventListener("click",r=>{r.target.closest(".st")||this.select(s.id)}),i.addEventListener("keydown",r=>{r.key==="Enter"&&!r.target.closest(".st")&&(r.stopPropagation(),this.select(s.id))}),i.querySelectorAll(".st").forEach(r=>{let a=+r.dataset.d,o,l,c=()=>{clearTimeout(o),clearInterval(l)};r.addEventListener("pointerdown",h=>{zt.approved||(h.preventDefault(),this.step(s,a),o=setTimeout(()=>{l=setInterval(()=>this.step(s,a),85)},380))}),["pointerup","pointerleave","pointercancel"].forEach(h=>r.addEventListener(h,c)),r.addEventListener("click",h=>{h.detail===0&&this.step(s,a)})})}),n.querySelector("[data-act=approve]").addEventListener("click",()=>this.approve()),n.querySelector("[data-act=close]").addEventListener("click",()=>this.drawer(!1)),n.querySelector("[data-act=rst]").addEventListener("click",()=>this.setSim(null,{animate:!0})),t.range.addEventListener("input",()=>this.setSim(+t.range.value/100));let e=()=>{let i=t.input.value.trim();i&&(t.input.value="",this.toggleChips(!0),this.ask(i))};n.querySelector(".ib.go").addEventListener("click",e),t.input.addEventListener("keydown",i=>{i.stopPropagation(),i.key==="Enter"&&!i.isComposing&&i.keyCode!==229&&e()}),t.input.addEventListener("input",()=>this.toggleChips(!t.input.value)),n.querySelectorAll(".sg .chip").forEach(i=>i.addEventListener("click",()=>this.ask(i.dataset.q))),n.querySelector("[data-act=mic]").addEventListener("click",()=>this.voice())},toggleChips(n){this.el.sg.classList.toggle("is-hidden",!n)},rowEl(n){return this.root.querySelector(`.row[data-id=${n.id}]`)},updateRow(n,{quiet:t=!1,flash:e=!1}={}){let i=this.rowEl(n),s=rn(n),r=s-n.usual,a=i.querySelector(".q b"),o=a.textContent;a.textContent=s,!t&&o!==String(s)&&o!==""&&(a.classList.remove("is-bump"),a.offsetWidth,a.classList.add("is-bump"));let l=i.querySelector(".dl b");l.textContent=Mf(r),i.classList.toggle("up",r>0),i.classList.toggle("down",r<0),i.classList.toggle("hold",r===0);let c=zt.edits.has(n.id);i.querySelector(".flag").innerHTML=`${n.fix&&!c?'<i class="fx">\u30B3\u30FC\u30C9\u4FEE\u6B63</i>':""}${c?`<i class="ed">${zt.edits.get(n.id)===n.proposed?"":"\u4FEE\u6B63\u6E08\u307F"}</i>`:""}`,i.querySelector('.st[data-d="-1"]').disabled=s<=0,i.querySelector('.st[data-d="1"]').disabled=s>=yf(n),i.classList.toggle("is-rev",zt.reviewed.has(n.id)),e&&(i.classList.remove("is-flash"),i.offsetWidth,i.classList.add("is-flash")),this.sel&&this.sel.id===n.id&&this.renderDetailNumbers(n)},updateCounts(){let n=t=>this.el.c(t);n("rev").textContent=zt.reviewed.size,n("edit").textContent=[...zt.edits].filter(([t,e])=>e!==Re(t).proposed).length},step(n,t){if(zt.approved)return;let e=rn(n),i=e+t*n.pack;if(!(i<0)){if(i>yf(n)){this.shake(this.rowEl(n)),this.ctx.chrome.toast(`${n.short}\u306F\u68DA\u306E\u4E0A\u9650\uFF08${n.cap}${n.unit}\uFF09\u307E\u3067\u3067\u3059`);return}this.setQty(n,i)}},setQty(n,t,{byChat:e=!1}={}){t===n.proposed&&!zt.sim?zt.edits.delete(n.id):zt.edits.set(n.id,t),e&&n.id==="milk"&&(zt.revisedByChat=!0),zt.reviewed.add(n.id),this.updateRow(n,{flash:e}),this.updateCounts()},shake(n){Xe.fromTo(n,{x:-6},{x:0,duration:.5,ease:"elastic.out(1.2,.3)"})},async select(n,{auto:t=!1}={}){let e=Re(n);if(!e||this.sel&&this.sel.id===n)return;this.sel=e,this.root.querySelectorAll(".row").forEach(r=>r.classList.toggle("is-sel",r.dataset.id===n));let i=this.rowEl(e),s=this.el.rows;s.scrollTo({top:Math.max(0,i.offsetTop-s.clientHeight/2+i.offsetHeight/2),behavior:"smooth"}),zt.reviewed.add(n),this.updateRow(e,{quiet:!0}),this.updateCounts(),this.renderDetail(e)},renderDetailNumbers(n){let t=rn(n),e=t-n.usual,i=this.el;i.d("stock").innerHTML=`${n.expiresTonight?`${n.stock}<small>${n.unit}\u30FB\u671F\u9650\u4ECA\u591C</small>`:`${n.stock}<small>${n.unit}</small>`}`,i.d("usual").innerHTML=`${n.usual}<small>${n.unit}</small>`,i.d("qty").innerHTML=`${t}<small>${n.unit}</small>`;let s=i.d("delta");s.className="v "+(e>0?"up":e<0?"down":""),s.innerHTML=`${Mf(e)}<small>${n.unit}</small>`,i.d("stockbar").innerHTML=pf(n,t),this.updateSimRes()},renderDetail(n){let t=this.el;t.d("no").textContent=sc(n.no),t.d("cat").textContent=n.cat,t.d("nm").textContent=n.name,t.d("loc").textContent=`${n.shelf.code} ${n.shelf.zone}\u30FB${n.shelf.label}`,t.d("del").textContent=`\u7D0D\u54C1 ${n.delivery}\u30FB${n.supplier}`,t.d("sales").innerHTML=ff(n),this.renderDetailNumbers(n),this.tt&&(this.tt.set(n.model),this.tt.spin=-.5),Xe.fromTo(this.root.querySelector(".tt canvas"),{opacity:0,scale:.92},{opacity:1,scale:1,duration:.7,ease:"expo.out"}),Xe.fromTo(this.el.d("nm"),{y:14,opacity:0},{y:0,opacity:1,duration:.7,ease:"expo.out"}),Xe.fromTo(this.root.querySelectorAll(".stat .v"),{y:10,opacity:0},{y:0,opacity:1,duration:.6,ease:"expo.out",stagger:.05}),Xe.from(this.el.d("sales").querySelectorAll(".bar rect"),{scaleY:0,transformOrigin:"50% 100%",duration:.7,ease:"power3.out",stagger:.025}),this._wc&&this._wc.cancel();let e=t.d("why");e.innerHTML="";let i=Zl(n).slice();n.fix==="cap"&&i.push(`LLM\u306E\u4E0B\u66F8\u304D\u306F${n.draft}${n.unit}\u3002\u68DA\u306E\u4E0A\u9650\uFF08${n.cap}${n.unit}\uFF09\u3092\u8D85\u3048\u308B\u305F\u3081\u3001\u30B3\u30FC\u30C9\u304C${n.proposed}${n.unit}\u306B\u4FEE\u6B63\u3057\u307E\u3057\u305F\u3002`),n.fix==="sku"&&i.push(`LLM\u304C\u66F8\u3044\u305F\u5546\u54C1\u30B3\u30FC\u30C9\u304C\u30AB\u30BF\u30ED\u30B0\u306B\u3042\u308A\u307E\u305B\u3093\u3067\u3057\u305F\u3002\u30B3\u30FC\u30C9\u304C\u5DEE\u3057\u623B\u3057\u3001\u300C${_n.retry.right}\u300D\u306B\u76F4\u3057\u307E\u3057\u305F\u3002`);let s=!this._seen.has(n.id);this._seen.add(n.id);let r=t.d("checks");r.innerHTML=n.checks.map(c=>`<div class="chkc" data-k="${c.id}"><span class="dot">${$t.check}</span><span>${c.label}<small>${c.state==="fixed"?"\u4FEE\u6B63\u3057\u3066\u901A\u904E":c.detail}</small></span></div>`).join("");let a=()=>{r.querySelectorAll(".chkc").forEach((c,h)=>{let f=n.checks[h];setTimeout(()=>c.classList.add(f.state==="fixed"?"is-fixed":"is-ok"),s?250+h*170:0)})},o={cancel(){this.dead=!0}};this._wc=o;let l=async()=>{for(let c=0;c<i.length;c++){let f=_e(`<p class="${c===3?"fix":""}"></p>`);if(e.append(f),s){if(await ar(f,i[c],{cps:70,run:{get dead(){return o.dead}},caret:!0}),o.dead)return}else f.textContent=i[c]}};a(),l()},updateSimRes(){let n=this.sel;if(!n)return;let t=zt.sim,e=this.root.querySelector("[data-sim-res]"),i=ee.filter(s=>rn(s)!==s.proposed&&!zt.edits.has(s.id)).length;e.innerHTML=t?`${n.short}\u306E\u63D0\u6848\u306F <b>${rn(n)}</b>${n.unit}\u3002\u5168\u4F53\u3067${i}\u54C1\u76EE\u304C\u5909\u308F\u308A\u307E\u3059\u3002`:`\u4E88\u5831\u3069\u304A\u308A\u3002${n.short}\u306E\u63D0\u6848\u306F <b>${rn(n)}</b>${n.unit}\u3002`},setSim(n,{animate:t=!1}={}){let e=xe.pop,i=n??e,s=r=>{let a=Math.abs(r-e)<.001?null:{pop:r};zt.sim=a;let o=Math.round(r*100);this.root.querySelector("[data-sim-pct]").textContent=o,this.el.range.value=o,this.el.range.style.setProperty("--p",o+"%"),this.el.sim.classList.toggle("is-changed",!!a),ee.forEach(l=>{let c=this.rowEl(l).querySelector(".q b").textContent;this.updateRow(l,{quiet:!1})}),this.updateCounts(),this.updateSimRes()};if(t){let a={v:zt.sim?zt.sim.pop:e};return new Promise(o=>Xe.to(a,{v:i,duration:1.1,ease:"power2.inOut",onUpdate:()=>s(Math.round(a.v*20)/20),onComplete:()=>{s(i),o()}}))}return s(i),Promise.resolve()},drawer(n){this.el.drawer.classList.toggle("is-open",n)},async ask(n,{run:t}={}){if(this.chat.busy||zt.approved)return;this.drawer(!0),this.chat.msgs.children.length||this.chat.clear(),this.run=t||new Wi,this.chat.addUser(n);let e=gf(n,{selected:this.sel});e.p&&(e.type==="revise"||e.type==="explain")&&await this.select(e.p.id),this.busyAsk=!0,this.ctx.director.updateHint();try{await this.chat.reply(xf(e,{}),{run:this.run})}finally{this.busyAsk=!1,this.ctx.director.updateHint()}},async action(n){let{name:t,payload:e}=n;if(t==="setQty"){let i=Re(e.id);this.setQty(i,e.qty,{byChat:e.byChat}),await le(500)}else t==="select"?await this.select(e.id):t==="sim"?(await le(500),this.drawer(!1),await le(650),await this.setSim(e.pop,{animate:!0})):t==="approve"&&(await le(400),this.drawer(!1),await le(500),await this.approve())},card(n){return ic(n)},async voice(n="\u5098\u306E\u7406\u7531\u3092\u6559\u3048\u3066"){if(this.chat.busy||zt.approved)return;let t=this.root.querySelector(".ask-bar"),e=this.root.querySelector("[data-act=mic]");this.toggleChips(!1),t.classList.add("is-listening"),e.classList.add("is-live"),await le(1700),t.classList.remove("is-listening"),e.classList.remove("is-live"),this.run=new Wi,await this.typeAsk(n)},async typeAsk(n){this.typing=!0;let t=this.el.input;this.toggleChips(!1),t.focus({preventScroll:!0}),t.value="";for(let e of n)t.value+=e,await le(this.run&&this.run.skip?0:34);await le(350),t.value="",t.blur(),this.toggleChips(!0),this.typing=!1,await this.ask(n,{run:this.run})},async approve(){if(zt.approved)return;zt.approved=!0,zt.approvedAt=Date.now(),this.ctx.director.updateHint(),zt.sim&&await this.setSim(null,{animate:!0}),this.drawer(!1);let n=this.root.querySelector(".seal-layer"),t=n.querySelector(".seal-ring"),e=this.el.sheet,i=this.ctx.sfx;Xe.set(n,{opacity:0,scale:2.7,rotation:-20,y:-70,transformOrigin:"50% 50%"}),await new Promise(a=>{Xe.timeline({onComplete:a}).to(n,{opacity:1,scale:1,rotation:-9,y:0,duration:.36,ease:"power4.in"}).add(()=>{i&&i.thump(),Xe.fromTo(e,{y:0},{y:5,duration:.07,yoyo:!0,repeat:1,ease:"power1.out"}),Xe.fromTo(t,{opacity:.6,scale:.86},{opacity:0,scale:1.55,duration:.8,ease:"expo.out"}),Xe.fromTo(n.querySelector("svg"),{scale:1.04},{scale:1,duration:.5,ease:"elastic.out(1,.4)"})}).to({},{duration:.5})}),e.classList.add("is-approved"),this.ctx.chrome.setClock("07:42",{dur:.8,sub:"\u627F\u8A8D\u6E08\u307F"});let s={};ee.forEach(a=>{rn(a)>0&&(s[a.supplier]||(s[a.supplier]=[])).push(a)});let r=this.root.querySelector(".sent");r.innerHTML='<span class="lab">\u767A\u6CE8\u66F8\u3092\u9001\u4FE1</span>'+Object.entries(s).map(([a,o])=>`<span class="env"><span class="ic">${$t.check}</span>${a}<small>${o.length}\u54C1\u76EE</small></span>`).join(""),Xe.from(r.children,{opacity:0,y:14,duration:.6,ease:"expo.out",stagger:.12}),this.ctx.director.updateHint()},async enter(n){let{world:t,chrome:e}=this.ctx,i=this.root;this._build(),zt.approved=!1,zt.morningStart=Date.now(),Xe.set(this.el.sheet,{opacity:0,y:30}),Xe.set(this.el.paper,{y:"100%"}),t.mood(.55,2),t.drift(0,.6),e.setClock("07:30",{dur:1.6,sub:"\u671D"}),await Xe.to(this.el.paper,{y:"0%",duration:1.35,ease:"power3.inOut"}).then(),document.getElementById("gl").style.opacity=0,t.setPaused(!0),Xe.to(this.el.sheet,{opacity:1,y:0,duration:1,ease:"expo.out"}),Xe.from(i.querySelectorAll(".row"),{opacity:0,x:-24,duration:.8,ease:"expo.out",stagger:.045,delay:.15}),this.tt=new Wl(i.querySelector(".tt canvas")),this.tt.resize(),this.tt.start(),this._onResize=()=>this.tt&&this.tt.resize(),addEventListener("resize",this._onResize),await le(700),await this.select("umbrella",{auto:!0}),this.ctx.chrome.setClock("07:30",{instant:!0,sub:"\u7BA1\u7406\u8005\u306E\u78BA\u8A8D"}),this.beat=0,this.ctx.director.updateHint()},async leave(){this.run&&this.run.kill(),removeEventListener("resize",this._onResize),this.tt&&this.tt.stop(),await Xe.to(this.el.sheet,{opacity:0,y:-20,duration:.6,ease:"power2.in"}).then()},reset(){this.run&&this.run.kill(),zt.sim=null},_beats(){return[{label:"\u5F01\u5F53\u306E\u63D0\u6848\u3092\u898B\u308B",run:()=>this.select("bento")},{label:"\u725B\u4E73\u306E\u6570\u91CF\u3092\u76F8\u8AC7\u3059\u308B",run:()=>this.typeAsk($n.question)},{label:"\u300C\u96E8\u304C\u964D\u3089\u306A\u304B\u3063\u305F\u3089\uFF1F\u300D\u3092\u8A66\u3059",run:()=>this.typeAsk("\u3082\u3057\u96E8\u304C\u964D\u3089\u306A\u304B\u3063\u305F\u3089\uFF1F")},{label:"\u3059\u3079\u3066\u627F\u8A8D\u3059\u308B",run:()=>this.approve()}]},primary(){if(zt.approved)return"next";if(this.chat&&this.chat.busy)return this.run&&(this.run.skip=!0),"handled";let n=this._beats()[this.beat];return n?(this.beat++,this.run=new Wi,Promise.resolve(n.run()).then(()=>"handled")):this.approve().then(()=>"handled")},autoStep(){return this.chat&&this.chat.busy||this.typing?"wait":this.primary()},hint(){if(zt.approved)return"\u65E5\u4E2D\u306E\u78BA\u8A8D\u3078";if(this.chat&&this.chat.busy)return"\u56DE\u7B54\u3092\u30B9\u30AD\u30C3\u30D7";let n=this._beats()[this.beat];return n?n.label:"\u3059\u3079\u3066\u627F\u8A8D\u3059\u308B"},autoPause:2200,beatPause:2600};var li=window.gsap,ps={"A-03":"umbrella","A-04":"raincoat","C-01":"bento","C-02":"milk","C-03":"salad","D-01":"coffee","B-02":"noodle","F-01":"ice"},Z_=-.17,J_=n=>n<.2?"crit":n<.45?"low":"ok",kh=n=>Math.min(1,cr(n)/n.cap),Ta=[{x:11,y:14,w:21,h:21,t:"\u5E55\u306E\u5185\u5F01\u5F53",n:4},{x:17,y:62,w:20,h:25,t:"\u713C\u9BAD\u5F01\u5F53",n:3},{x:50,y:61,w:15,h:28,t:"\u65E5\u66FF\u308F\u308A\u5F01\u5F53",n:3},{x:86,y:8,w:13,h:22,t:"\u305F\u307E\u3054\u30B5\u30F3\u30C9",n:7,cold:!0}],Sf={id:"day",title:"\u65E5\u4E2D\u306B\u78BA\u8A8D\u3059\u308B",theme:"day",clockSub:"\u30B9\u30BF\u30C3\u30D5\u306E\u554F\u3044\u5408\u308F\u305B",notes:["\u65E5\u4E2D\u306F\u3001\u30B9\u30BF\u30C3\u30D5\u3082\u540C\u3058\u30C7\u30FC\u30BF\u3092\u4F7F\u3063\u3066\u3001\u30C1\u30E3\u30C3\u30C8\u304B\u3089\u78BA\u8A8D\u3067\u304D\u307E\u3059\u3002","\u300C\u5098\u306E\u5728\u5EAB\u306F\uFF1F\u300D\u3068\u805E\u304F\u3068\u3001\u5728\u5EABDB\u3092\u5F15\u3044\u3066\u7B54\u3048\u3001\u5E97\u5185\u306E\u6A21\u578B\u3067\u305D\u306E\u68DA\u3092\u793A\u3057\u307E\u3059\u3002\u671D\u306E\u5165\u8377\u5206\u304C\u53CD\u6620\u3055\u308C\u3066\u3044\u307E\u3059\u3002","\u6B21\u306E\u5165\u8377\u3001\u671F\u9650\u304C\u8FD1\u3044\u5546\u54C1\u3001\u68DA\u306E\u5834\u6240\u3082\u540C\u3058\u753B\u9762\u3067\u805E\u3051\u307E\u3059\u3002","\u68DA\u3092\u30AB\u30E1\u30E9\u3067\u898B\u3066\u6570\u3092\u6570\u3048\u308B\u300C\u68DA\u30B9\u30AD\u30E3\u30F3\u300D\u3084\u3001\u97F3\u58F0\u3067\u306E\u554F\u3044\u5408\u308F\u305B\u306F\u3001\u307E\u3060\u30B3\u30F3\u30BB\u30D7\u30C8\u3067\u3059\u3002"],mount(n,t){this.ctx=t,this._build()},_build(){let n=this.root,t=this.ctx;(this._pinObjs||[]).forEach(e=>t.world.removePin(e.pin)),this._pinObjs=[],this.pinMap={},n.innerHTML=`
    <div class="hud-b">
      <div class="legend"><span class="ok"><i></i>\u5341\u5206</span><span class="low"><i></i>\u5C11\u306A\u3081</span><span class="crit"><i></i>\u88DC\u5145\u304C\u5FC5\u8981</span></div>
      <div class="tools"><button class="tgl" data-act="heat"><span class="ic">${$t.heat}</span>\u5728\u5EAB\u30D2\u30FC\u30C8\u30DE\u30C3\u30D7</button><button class="tgl" data-act="ar"><span class="ic">${$t.scan}</span>\u68DA\u30B9\u30AD\u30E3\u30F3<span class="tag is-concept">\u30B3\u30F3\u30BB\u30D7\u30C8</span></button></div>
      <div class="seg" role="group" aria-label="\u8996\u70B9"><button data-v="wide" class="is-on">\u5168\u4F53</button><button data-v="door">\u5165\u53E3</button><button data-v="cooler">\u51B7\u8535\u30B1\u30FC\u30B9</button><button data-v="register">\u30EC\u30B8</button></div>
    </div>
    <div class="pins"></div>
    <div class="tip3d"></div>
    <aside class="panel" aria-label="\u5E97\u5185\u30A2\u30B7\u30B9\u30BF\u30F3\u30C8">
      <div class="ph"><h3>\u5E97\u5185\u30A2\u30B7\u30B9\u30BF\u30F3\u30C8<small>\u5728\u5EAB \xB7 \u5165\u8377 \xB7 \u68DA\u306E\u5834\u6240</small></h3><span class="tag">\u30B9\u30BF\u30C3\u30D5</span></div>
      <div class="chat-host"></div>
      <div class="foot">
        <div class="chips"><button class="chip" data-q="\u30D3\u30CB\u30FC\u30EB\u5098\u306E\u5728\u5EAB\u306F\u3044\u304F\u3064\u3067\u3059\u304B\uFF1F">\u5098\u306E\u5728\u5EAB\u306F\uFF1F</button><button class="chip" data-q="\u6E29\u304B\u3044\u304A\u8336\u306F\u3069\u3053\u306B\u3042\u308A\u307E\u3059\u304B\uFF1F">\u6E29\u304B\u3044\u304A\u8336\u306F\u3069\u3053\uFF1F</button><button class="chip" data-q="\u6B21\u306E\u5165\u8377\u306F\u3044\u3064\u3067\u3059\u304B\uFF1F">\u6B21\u306E\u5165\u8377\u306F\uFF1F</button><button class="chip" data-q="\u671F\u9650\u304C\u8FD1\u3044\u5546\u54C1\u306F\uFF1F">\u671F\u9650\u304C\u8FD1\u3044\u5546\u54C1</button></div>
        <div class="ask-bar"><span class="spark"><span class="ic">${$t.spark}</span></span><input type="text" placeholder="\u5728\u5EAB\u30FB\u5165\u8377\u30FB\u68DA\u306E\u5834\u6240\u3092\u805E\u304F\u2026" aria-label="\u8CEA\u554F"><div class="wave">${"<i></i>".repeat(30)}</div><button class="ib" data-act="mic" aria-label="\u97F3\u58F0\u5165\u529B" title="\u97F3\u58F0\u5165\u529B\uFF08\u30B3\u30F3\u30BB\u30D7\u30C8\uFF09">${$t.mic}</button><button class="ib go" aria-label="\u9001\u4FE1">${$t.send}</button></div>
      </div>
    </aside>
    <div class="ar" aria-label="\u68DA\u30B9\u30AD\u30E3\u30F3\uFF08AR \u30B3\u30F3\u30BB\u30D7\u30C8\uFF09">
      <button class="btn is-ghost close" data-act="arclose">\u9589\u3058\u308B <kbd>Esc</kbd></button>
      <div class="ar-in">
        <div class="frame"><img src="assets/plates/shelf-bento.jpg" alt="\u5F01\u5F53\u306E\u68DA">
          <i class="corner tl"></i><i class="corner tr"></i><i class="corner bl"></i><i class="corner br"></i><div class="scanline"></div>
          ${Ta.map(e=>`<div class="box ${e.cold?"cold":""}" style="left:${e.x}%;top:${e.y}%;width:${e.w}%;height:${e.h}%;opacity:0"><span class="lb">${e.t}<b>\xD7${e.n}</b></span></div>`).join("")}
          <div class="hud-b"><span>C-01 \u5F01\u5F53\u30B1\u30FC\u30B9</span><span>14:23:08</span><span>AR \xB7 CONCEPT</span></div>
          <div class="cap">\u5199\u771F: Martin Lewison / Wikimedia Commons\uFF08CC BY-SA\uFF09\xB7 \u30B3\u30F3\u30BB\u30D7\u30C8\u8868\u793A</div></div>
        <div class="side"><h3>\u68DA\u3092\u30AB\u30E1\u30E9\u3067\u898B\u3066\u3001\u6570\u3048\u308B\u3002<small>\u898B\u3064\u3051\u305F\u5546\u54C1\u3068\u6570\u3092\u3001\u5728\u5EABDB\u3068\u7167\u3089\u3057\u5408\u308F\u305B\u307E\u3059\u3002</small></h3>
          <ul class="det">${Ta.map(e=>`<li style="opacity:0"><span>${e.t}</span><b>${e.n}</b><small>${e.cold?"":"\u671F\u9650 \u4ECA\u591C"}</small></li>`).join("")}</ul>
          <div class="sum"><div><div class="l">\u691C\u51FA</div><div class="v"><span data-ar="n">0</span><small>\u70B9</small></div></div><div><div class="l">\u8A8D\u8B58</div><div class="v"><span data-ar="p">0</span><small>%</small></div></div></div>
          <div class="match"><span class="ic">${$t.check}</span>\u5F01\u5F53 ${Ta.slice(0,3).reduce((e,i)=>e+i.n,0)}\u500B \xB7 \u5728\u5EABDB\u3068\u4E00\u81F4</div></div>
      </div>
    </div>`,this.el={pins:n.querySelector(".pins"),tip:n.querySelector(".tip3d"),input:n.querySelector(".ask-bar input"),bar:n.querySelector(".ask-bar"),legend:n.querySelector(".legend"),ar:n.querySelector(".ar"),heatBtn:n.querySelector("[data-act=heat]"),arBtn:n.querySelector("[data-act=ar]")},this.chat=new or(n.querySelector(".chat-host"),{renderCard:ic,onAction:e=>this.action(e)}),this.chat.msgs.insertAdjacentHTML("beforeend",`<div class="msg ai"><div class="av"><span class="ic">${$t.spark}</span></div><div class="body"><p class="tx">\u5728\u5EAB\u30FB\u5165\u8377\u4E88\u5B9A\u30FB\u68DA\u306E\u5834\u6240\u306B\u7B54\u3048\u307E\u3059\u3002\u5E97\u5185\u306E\u6A21\u578B\u306E\u68DA\u3092\u30AF\u30EA\u30C3\u30AF\u3057\u3066\u3001\u305D\u306E\u68DA\u306E\u5728\u5EAB\u3092\u805E\u304F\u3053\u3068\u3082\u3067\u304D\u307E\u3059\u3002</p></div></div>`),this._bind(),this.heatOn=!1,this.arOpen=!1,this.beat=0,this.lastP=null},_bind(){let n=this.root,{el:t}=this;n.querySelectorAll(".seg button").forEach(i=>i.addEventListener("click",()=>{n.querySelectorAll(".seg button").forEach(s=>s.classList.toggle("is-on",s===i)),this.ctx.world.clearLocate(),this._clearLocPins(),this.ctx.world.shot(i.dataset.v,{duration:1.8})})),t.heatBtn.addEventListener("click",()=>this.heat(!this.heatOn)),t.arBtn.addEventListener("click",()=>this.openAR()),n.querySelector("[data-act=arclose]").addEventListener("click",()=>this.closeAR()),n.querySelectorAll(".foot .chip").forEach(i=>i.addEventListener("click",()=>this.ask(i.dataset.q)));let e=()=>{let i=t.input.value.trim();i&&(t.input.value="",this.ask(i))};n.querySelector(".ib.go").addEventListener("click",e),t.input.addEventListener("keydown",i=>{i.stopPropagation(),i.key==="Enter"&&!i.isComposing&&i.keyCode!==229&&e()}),n.querySelector("[data-act=mic]").addEventListener("click",()=>this.voice())},pinFor(n,{loc:t=!1}={}){if(this.pinMap[n])return this.pinMap[n];let e=Re(ps[n]);if(!e)return null;let i=kh(e),s=cr(e),r=_e(`<div class="pin stk ${J_(i)} ${t?"is-loc":""}" data-code="${n}"><i class="stem"></i><i class="dot"></i><div class="card"><span class="k">${e.short}</span><span class="v"><b>${s}</b>${e.unit}</span><span class="bar"><u style="width:${Math.round(i*100)}%"></u></span></div></div>`);this.el.pins.append(r);let a=this.ctx.world.addPin(n,r,{x:0,y:.1,z:0}),o={el:r,pin:a,loc:t};return this._pinObjs.push(o),this.pinMap[n]=o,li.fromTo(r.querySelector(".card"),{opacity:0,y:10,scale:.92},{opacity:1,y:0,scale:1,duration:.5,ease:"expo.out"}),li.fromTo(r.querySelector(".stem"),{scaleY:0},{scaleY:1,duration:.5,ease:"power3.out"}),li.fromTo(r.querySelector(".dot"),{scale:0},{scale:1,duration:.4,ease:"back.out(3)"}),o},dropPin(n){let t=this.pinMap[n];t&&(this.ctx.world.removePin(t.pin),this._pinObjs=this._pinObjs.filter(e=>e!==t),delete this.pinMap[n],li.to(t.el,{opacity:0,duration:.3,onComplete:()=>t.el.remove()}))},_clearLocPins(){Object.keys(this.pinMap).forEach(n=>{this.pinMap[n].loc&&!this.heatOn&&this.dropPin(n)})},levels(){let n={};for(let[t,e]of Object.entries(ps))n[t]=kh(Re(e));return n},heat(n){this.heatOn=n;let{world:t}=this.ctx;this.el.heatBtn.classList.toggle("is-on",n),this.el.legend.classList.toggle("is-on",n),t.setHeat(n,this.levels()),n?(t.clearLocate(),this._clearLocPins(),this.root.querySelectorAll(".seg button").forEach(e=>e.classList.toggle("is-on",e.dataset.v==="wide")),t.shot("wide",{duration:1.8}),Object.keys(ps).forEach((e,i)=>setTimeout(()=>{this.heatOn&&this.pinFor(e)},350+i*130))):Object.keys(ps).forEach(e=>this.dropPin(e))},async ask(n,{run:t}={}){if(this.chat.busy)return;this.run=t||new Wi,this.chat.addUser(n);let e=_f(n,{last:this.lastP});e.p&&(this.lastP=e.p),this.ctx.director.updateHint();try{await this.chat.reply(vf(e),{run:this.run})}finally{this.ctx.director.updateHint()}},async action(n){let{name:t,payload:e}=n,{world:i}=this.ctx;t==="locate"?(this.root.querySelectorAll(".seg button").forEach(s=>s.classList.remove("is-on")),this.heatOn||Object.keys(this.pinMap).forEach(s=>{this.pinMap[s].loc&&this.dropPin(s)}),i.locate(e.code,{camera:!0,duration:2.2}),setTimeout(()=>{let s=this.pinMap[e.code];s?s.el.classList.add("is-loc"):this.pinFor(e.code,{loc:!0})},900)):t==="ar"&&(await le(600),await this.openAR())},async typeAsk(n){this.typing=!0;let t=this.el.input;t.focus({preventScroll:!0}),t.value="";for(let e of n)t.value+=e,await le(this.run&&this.run.skip?0:36);await le(320),t.value="",t.blur(),this.typing=!1,await this.ask(n,{run:this.run})},async voice(n="\u6B21\u306E\u5165\u8377\u306F\u3044\u3064\u3067\u3059\u304B\uFF1F"){if(this.chat.busy)return;let t=this.root.querySelector("[data-act=mic]");this.el.bar.classList.add("is-listening"),t.classList.add("is-live"),await le(1700),this.el.bar.classList.remove("is-listening"),t.classList.remove("is-live"),await this.typeAsk(n)},async openAR(){if(this.arOpen)return;this.arOpen=!0;let n=this.el.ar,t=c=>n.querySelector(c),e=c=>n.querySelectorAll(c);document.body.classList.replace("theme-day","theme-night"),document.body.classList.add("ar-open"),n.classList.add("is-open"),this.ctx.director.updateHint(),li.fromTo(n,{opacity:0},{opacity:1,duration:.55,ease:"power2.out"}),li.set(e(".box"),{opacity:0,scale:1.12}),li.set(e(".det li"),{opacity:0,x:16}),li.set(t(".match"),{opacity:0}),t("[data-ar=n]").textContent="0",t("[data-ar=p]").textContent="0",li.fromTo(e(".corner"),{scale:1.7,opacity:0},{scale:1,opacity:1,duration:.7,ease:"expo.out",stagger:.05,delay:.2});let i=t(".scanline"),s=t(".frame"),r=s.clientHeight,a=li.timeline({delay:.6});a.fromTo(i,{y:-r*.12},{y:r*1.1,duration:1.7,ease:"sine.inOut"}).set(i,{y:-r*.12}).fromTo(i,{y:-r*.12},{y:r*1.1,duration:1.7,ease:"sine.inOut"},"+=.1");let o=e(".box");Ta.forEach((c,h)=>{let f=.6+c.y/100*1.7+.2;a.to(o[h],{opacity:1,scale:1,duration:.55,ease:"back.out(2)"},f),a.to(e(".det li")[h],{opacity:1,x:0,duration:.5,ease:"expo.out"},f+.1)});let l=Ta.reduce((c,h)=>c+h.n,0);a.add(()=>{Oh(t("[data-ar=n]"),l,{dur:1.2}),Oh(t("[data-ar=p]"),98,{dur:1.4})},2.2),a.to(t(".match"),{opacity:1,duration:.6},3.6),this._arTl=a,await le(4600)},async closeAR(){this.arOpen&&(this.arOpen=!1,this._arTl&&this._arTl.kill(),await li.to(this.el.ar,{opacity:0,duration:.45,ease:"power2.in"}).then(),this.el.ar.classList.remove("is-open"),document.body.classList.replace("theme-night","theme-day"),document.body.classList.remove("ar-open"),this.ctx.director.updateHint())},async enter(n){let{world:t,chrome:e}=this.ctx,i=this.root;this._build(),t.setPaused(!1),document.getElementById("gl").style.opacity=1,t.mood(1,2.2),t.drift(0,.6),t.rain(.35,1.5),t.setOpen(!0),t.clearLocate(),t.setHeat(!1),t.scan(!1),t.setFill("A-03",.2),t.setFill("C-01",.18),t.shot({pos:[22,15,24],target:[0,.4,.7],fov:27},{instant:!0}),t.shot("wide",{duration:2.8,ease:"power3.out"}),t.uiShift(Z_,0);for(let[s,r]of Object.entries(ps)){let a=Re(r);t.setFill(s,kh(a),2.4)}t.hoverCb=s=>this._hover(s),t.pickCb=s=>this._pick(s),t.interactive=!0,this._onMove=s=>{this.el.tip.style.transform=`translate(${s.clientX+18}px,${s.clientY+18}px)`},addEventListener("pointermove",this._onMove),e.setClock("14:20",{dur:1.8,sub:"\u30B9\u30BF\u30C3\u30D5\u306E\u554F\u3044\u5408\u308F\u305B"}),li.from(i.querySelector(".panel"),{x:60,opacity:0,duration:1.1,ease:"expo.out",delay:.5}),li.from(i.querySelectorAll(".hud-b > *"),{y:18,opacity:0,duration:.9,ease:"expo.out",stagger:.1,delay:.35}),this.beat=0,await le(1400)},async leave(){let{world:n}=this.ctx;this.arOpen&&await this.closeAR(),removeEventListener("pointermove",this._onMove),n.hoverCb=null,n.pickCb=null,n.interactive=!1,n.hover(null),n.clearLocate(),n.setHeat(!1),this._pinObjs.forEach(t=>n.removePin(t.pin)),this._pinObjs=[],this.pinMap={},await li.to(this.root.children,{opacity:0,duration:.5,ease:"power2.in",stagger:0}).then(),li.set(this.root.children,{clearProps:"opacity"})},reset(){this.run&&this.run.kill(),this.heatOn=!1,this.arOpen=!1},escape(){return this.arOpen?(this.closeAR(),!0):!1},_hover(n){let{world:t}=this.ctx,e=this.el.tip,i=n&&ps[n];if(t.hover(n),document.getElementById("gl").style.cursor=i?"pointer":"default",!n){e.classList.remove("is-on");return}let s=t.bays[n];e.innerHTML=i?`${s.label}<small>${Re(i).name} \xB7 \u3044\u307E ${cr(Re(i))}${Re(i).unit} \xB7 \u30AF\u30EA\u30C3\u30AF\u3067\u8CEA\u554F</small>`:`${s.label}`,e.classList.add("is-on")},_pick(n){let t=ps[n];if(!t||this.chat.busy)return;let e=Re(t);this.ask(`${e.name}\u306E\u5728\u5EAB\u306F\u3044\u304F\u3064\u3067\u3059\u304B\uFF1F`)},_beats(){return[{label:"\u300C\u5098\u306E\u5728\u5EAB\u306F\uFF1F\u300D\u3068\u805E\u304F",run:()=>this.typeAsk("\u30D3\u30CB\u30FC\u30EB\u5098\u306E\u5728\u5EAB\u306F\u3044\u304F\u3064\u3067\u3059\u304B\uFF1F")},{label:"\u6E29\u304B\u3044\u304A\u8336\u306E\u5834\u6240\u3092\u805E\u304F",run:()=>this.typeAsk("\u6E29\u304B\u3044\u304A\u8336\u306F\u3069\u3053\u306B\u3042\u308A\u307E\u3059\u304B\uFF1F")},{label:"\u6B21\u306E\u5165\u8377\u3092\u805E\u304F",run:()=>this.typeAsk("\u6B21\u306E\u5165\u8377\u306F\u3044\u3064\u3067\u3059\u304B\uFF1F")},{label:"\u68DA\u30B9\u30AD\u30E3\u30F3\uFF08AR\uFF09\u3092\u898B\u308B",run:()=>this.openAR()},{label:"\u5728\u5EAB\u30D2\u30FC\u30C8\u30DE\u30C3\u30D7\u3092\u898B\u308B",run:()=>this.heat(!0)}]},primary(){if(this.arOpen)return this.closeAR(),"handled";if(this.chat.busy)return this.run&&(this.run.skip=!0),"handled";let n=this._beats()[this.beat];return n?(this.beat++,this.run=new Wi,Promise.resolve(n.run()).then(()=>"handled")):"next"},autoStep(){return this.chat&&this.chat.busy||this.typing?"wait":this.primary()},hint(){if(this.arOpen)return"AR \u3092\u9589\u3058\u308B";if(this.chat&&this.chat.busy)return"\u56DE\u7B54\u3092\u30B9\u30AD\u30C3\u30D7";let n=this._beats()[this.beat];return n?n.label:"\u6B21\u306E\u30B9\u30C6\u30C3\u30D7\u3078"},autoPause:2200,beatPause:2200};var ms=window.gsap,K_=n=>{let t=Math.max(0,Math.round(n/1e3));return`${String(Math.floor(t/60)).padStart(2,"0")}:${String(t%60).padStart(2,"0")}`},wf={id:"end",title:"\u6B21\u306E\u30B9\u30C6\u30C3\u30D7",theme:"night",clockSub:"\u7FCC\u671D \u958B\u5E97",notes:["\u591C\u306B\u6E96\u5099\u3057\u3001\u671D\u306B\u5224\u65AD\u3057\u3001\u65E5\u4E2D\u306B\u78BA\u8A8D\u3059\u308B\u3002\u3053\u306E\u4E00\u65E5\u3092\u3001\u3072\u3068\u3064\u306E\u4ED5\u7D44\u307F\u306B\u3057\u307E\u3059\u3002","\u307E\u305A\u30011\u5E97\u8217\u30FB1\u30AB\u30C6\u30B4\u30EA\u3067\u3001\u4ECA\u306E\u767A\u6CE8\u3068\u4E26\u3079\u3066\u8A66\u3057\u307E\u3059\u3002","\u898B\u308B\u6570\u5B57\u306F\u3001\u767A\u6CE8\u306B\u304B\u304B\u308B\u6642\u9593\u3001\u5EC3\u68C4\u3001\u6B20\u54C1\u3001\u305D\u3057\u3066\u63D0\u6848\u3092\u3069\u308C\u3060\u3051\u63A1\u7528\u30FB\u4FEE\u6B63\u3057\u305F\u304B\u3002","\u53F3\u4E0B\u306E\u6570\u5B57\u306F\u3001\u3053\u306E\u30C7\u30E2\u3067\u5B9F\u969B\u306B\u64CD\u4F5C\u3057\u305F\u8A18\u9332\u3067\u3059\u3002\u307B\u304B\u306E\u6570\u5B57\u306F\u3001\u30D1\u30A4\u30ED\u30C3\u30C8\u3067\u6E2C\u308A\u307E\u3059\u3002"],mount(n,t){this.ctx=t,this._build()},_build(){let n=this.root,t=[...zt.edits].filter(([e,i])=>i!==ee.find(s=>s.id===e).proposed).length;n.innerHTML=`
    <div class="copy">
      <div class="eyebrow label">\u7FCC\u671D 08:00 \xB7 ${Di.name} \u958B\u5E97</div>
      <h2><span class="ln" data-l="1">\u6BCE\u671D\u3001\u5E97\u9577\u304C</span><span class="ln" data-l="2"><span class="chip">\u6750\u6599\u306E\u63C3\u3063\u305F\u6848</span>\u3092</span><span class="ln" data-l="3">\u898B\u3066\u3001\u6C7A\u3081\u308B\u3002</span></h2>
      <div class="rule2"></div>
      <p class="lead">1\u5E97\u8217\u30FB1\u30AB\u30C6\u30B4\u30EA\u3067\u3001\u4ECA\u306E\u767A\u6CE8\u3068\u4E26\u3079\u3066\u8A66\u3057\u307E\u3059\u3002</p>
      <div class="pilot">
        <div><div class="grid3">${Array.from({length:9},(e,i)=>`<i class="${i===4?"on":""}"></i>`).join("")}</div><div class="cap">1\u5E97\u8217\u30FB1\u30AB\u30C6\u30B4\u30EA</div></div>
        <div class="kpis">
          <div class="kpi"><div class="n">01</div><div class="t">\u767A\u6CE8\u6642\u9593</div><div class="s">\u8EFD\u304F\u306A\u3063\u305F\u304B</div><div class="v" data-k>\u2014</div><span class="tag is-concept">\u30D1\u30A4\u30ED\u30C3\u30C8\u3067\u8A08\u6E2C</span></div>
          <div class="kpi"><div class="n">02</div><div class="t">\u5EC3\u68C4</div><div class="s">\u4F59\u308A\u306F\u6E1B\u3063\u305F\u304B</div><div class="v" data-k>\u2014</div><span class="tag is-concept">\u30D1\u30A4\u30ED\u30C3\u30C8\u3067\u8A08\u6E2C</span></div>
          <div class="kpi"><div class="n">03</div><div class="t">\u6B20\u54C1</div><div class="s">\u58F2\u308A\u9003\u3057\u306F\u6E1B\u3063\u305F\u304B</div><div class="v" data-k>\u2014</div><span class="tag is-concept">\u30D1\u30A4\u30ED\u30C3\u30C8\u3067\u8A08\u6E2C</span></div>
          <div class="kpi is-live"><div class="n">04</div><div class="t">\u63A1\u7528\u30FB\u4FEE\u6B63</div><div class="s">\u73FE\u5834\u3067\u4F7F\u3048\u308B\u304B</div><div class="v" data-live>${t}/${ee.length}</div><span class="tag">\u3053\u306E\u30C7\u30E2\u306E\u8A18\u9332</span></div>
        </div>
      </div>
      <div class="foot"><span class="tag is-concept">\u4EEE\u8AAC</span>\u6599\u91D1\u306F\u672A\u5B9A\u3067\u3059\u3002\u5E97\u8217\u3054\u3068\u306E\u6708\u984D\uFF08SaaS\uFF09\u3092\u8003\u3048\u3066\u3044\u307E\u3059\u3002</div>
      <div class="rec" data-rec></div>
    </div>
    <div class="credit">\u5E97\u8217\u306E\u5199\u771F: Japanexperterna, Martin Lewison / Wikimedia Commons\uFF08CC BY-SA\uFF09\u307B\u304B\u3001\u751F\u6210\u30A4\u30E1\u30FC\u30B8\u3092\u542B\u307F\u307E\u3059\u3002</div>
    <button class="btn is-ghost again" data-act="again">\u6700\u521D\u304B\u3089 <kbd>R</kbd></button>`,n.querySelector("[data-act=again]").addEventListener("click",()=>this.ctx.director.reset())},async enter(n){let{world:t,chrome:e}=this.ctx,i=this.root;this._build(),t.setPaused(!1),document.getElementById("gl").style.opacity=1,t.clearLocate(),t.setHeat(!1),t.mood(.5,2.4),t.rain(.55,1.6),t.setOpen(!0),t.setFill("A-03",1,2.2),t.uiShift(.25,0),t.shot({pos:[19.8,10.4,21.2],target:[0,.7,.3],fov:25},{duration:3.2,ease:"power3.inOut"}),e.setClock("08:00",{dur:1.6,sub:"\u7FCC\u671D \u958B\u5E97"});let s=zt.morningStart?(zt.approvedAt||Date.now())-zt.morningStart:0,r=[...zt.edits].filter(([o,l])=>l!==ee.find(c=>c.id===o).proposed).length;i.querySelector("[data-rec]").innerHTML=`<span>\u627F\u8A8D<b>${zt.approved?ee.length:0}</b>\u4EF6</span><span>\u624B\u3067\u4FEE\u6B63<b>${r}</b>\u4EF6</span><span>\u78BA\u8A8D\u304B\u3089\u627F\u8A8D\u307E\u3067<b>${zt.approved?K_(s):"\u2014"}</b></span>`,t.drift(.2);let a=[...i.querySelectorAll("h2 .ln")];ms.fromTo(a,{yPercent:105,opacity:0},{yPercent:0,opacity:1,duration:1.2,ease:"expo.out",stagger:.18,delay:.5}),ms.from(i.querySelectorAll(".eyebrow,.rule2,.lead,.foot,.rec"),{opacity:0,y:20,duration:.9,ease:"expo.out",stagger:.12,delay:1.1}),ms.from(i.querySelectorAll(".pilot .grid3 i"),{opacity:0,scale:.6,duration:.5,ease:"back.out(2)",stagger:.05,delay:1.6}),ms.from(i.querySelectorAll(".kpi"),{opacity:0,y:24,duration:.8,ease:"expo.out",stagger:.12,delay:1.8}),ms.from(i.querySelectorAll(".credit,.again"),{opacity:0,duration:1,delay:2.4}),await le(1400)},async leave(){this.ctx.world.drift(0,.8),await ms.to(this.root.children,{opacity:0,duration:.5}).then(),ms.set(this.root.children,{clearProps:"opacity"})},reset(){},primary(){return"next"},hint(){return""},autoPause:6e3};var rc=class{constructor(t){this.state=t,this.ctx=null}get on(){return!!this.state.sound}_ac(){if(!this.ctx){let t=window.AudioContext||window.webkitAudioContext;if(!t)return null;this.ctx=new t,this.master=this.ctx.createGain(),this.master.gain.value=.55,this.master.connect(this.ctx.destination)}return this.ctx.state==="suspended"&&this.ctx.resume(),this.ctx}toggle(){return this.state.sound=!this.state.sound,this.state.sound&&this._ac(),this.state.sound}_tone({f:t=440,f2:e,dur:i=.2,type:s="sine",vol:r=.25,delay:a=0,attack:o=.005}){if(!this.on)return;let l=this._ac();if(!l)return;let c=l.currentTime+a,h=l.createOscillator(),f=l.createGain();h.type=s,h.frequency.setValueAtTime(t,c),e&&h.frequency.exponentialRampToValueAtTime(e,c+i),f.gain.setValueAtTime(0,c),f.gain.linearRampToValueAtTime(r,c+o),f.gain.exponentialRampToValueAtTime(1e-4,c+i),h.connect(f),f.connect(this.master),h.start(c),h.stop(c+i+.05)}_noise({dur:t=.15,vol:e=.2,hp:i=800,delay:s=0}){if(!this.on)return;let r=this._ac();if(!r)return;let a=Math.floor(r.sampleRate*t),o=r.createBuffer(1,a,r.sampleRate),l=o.getChannelData(0);for(let u=0;u<a;u++)l[u]=(Math.random()*2-1)*(1-u/a);let c=r.createBufferSource(),h=r.createBiquadFilter(),f=r.createGain();c.buffer=o,h.type="highpass",h.frequency.value=i,f.gain.value=e,c.connect(h),h.connect(f),f.connect(this.master),c.start(r.currentTime+s)}thump(){this._tone({f:120,f2:44,dur:.34,type:"sine",vol:.7}),this._noise({dur:.09,vol:.35,hp:1800}),this._tone({f:62,f2:36,dur:.5,type:"triangle",vol:.3,delay:.02})}tick(){this._tone({f:1800,f2:1200,dur:.045,type:"square",vol:.04})}chime(){[784,988,1318].forEach((t,e)=>this._tone({f:t,dur:.9,type:"sine",vol:.14,delay:e*.11}))}whoosh(){this._noise({dur:.7,vol:.12,hp:300})}pop(){this._tone({f:520,f2:880,dur:.12,type:"sine",vol:.12})}};var oc=window.gsap;oc.ticker.lagSmoothing(0);oc.globalTimeline.timeScale($i);setInterval(()=>{document.hidden&&oc.ticker.tick(!0)},50);var j_=document.querySelector("#boot .bar i"),Q_=document.querySelector("#boot .msg"),ac=(n,t)=>{oc.to(j_,{scaleX:n,duration:.5,ease:"power2.out"}),t&&(Q_.textContent=t)},Aa=()=>new Promise(n=>{let t=!1,e=()=>{t||(t=!0,n())};requestAnimationFrame(e),setTimeout(e,40)}),tv=()=>Promise.race([document.fonts.ready,le(1400)]);async function ev(){let n=performance.now(),t=g=>console.info(`[boot] ${g} ${Math.round(performance.now()-n)}ms`);ac(.1),await Aa(),await tv(),ac(.3,"\u5546\u54C1\u3092\u6E96\u5099\u3057\u3066\u3044\u307E\u3059"),await Aa(),await Aa();let e=[...new Set(ee.map(g=>g.model))].map(g=>({id:g,model:g}));t("fonts");let i=tf(e);t("portraits"),ee.forEach(g=>{g.portrait=i[g.model]}),ac(.6,"\u5E97\u8217\u306E\u6A21\u578B\u3092\u7D44\u307F\u7ACB\u3066\u3066\u3044\u307E\u3059"),await Aa(),await Aa();let s,r=new URLSearchParams(location.search);try{if(r.get("nogl")==="1")throw new Error("nogl");s=new ql(document.getElementById("gl"),{quality:r.get("q")==="low"?.6:1})}catch(g){console.warn("3D disabled:",g.message),document.getElementById("gl").style.display="none",document.body.classList.add("no-gl"),s=new Proxy({bays:{},pins:[],camState:{yaw:0}},{get:(v,m)=>m in v?v[m]:m==="onFrame"?()=>()=>{}:()=>({kill(){}})})}window.world=s,t("world"),s.setFill("A-03",6/30),s.setFill("C-01",7/40);let a=window.director=new Ql,o=new ec(a,Di);a.chrome=o;let l=new rc(zt);window.__sfx=l,window.__demo={director:a,world:s,state:zt};let c={world:s,chrome:o,director:a,state:zt,portraits:i,sfx:l};[uf,df,bf,Sf,wf].forEach(g=>a.register(g)),a.mountAll(c,document.getElementById("scenes")),ac(1,"\u6E96\u5099\u5B8C\u4E86"),await le(500),document.getElementById("boot").classList.add("is-gone");let h=["open","night","morning","day","end"],f=r.get("scene"),u=f==null?0:isNaN(+f)?Math.max(0,h.indexOf(f)):+f;r.get("chrome")==="0"&&o.toggleChrome(!0),await a.go(Math.min(u,a.scenes.length-1)),a.updateHint(),t("ready");let d=+r.get("beats")||0;(async()=>{for(let g=0;g<d;g++)await le(5e3),await a.primary()})()}addEventListener("click",n=>{let t=n.target.closest&&n.target.closest("button");t&&n.detail>0&&t.blur()},!0);var Ef,Tf=()=>{document.body.classList.remove("hide-cursor"),clearTimeout(Ef),Ef=setTimeout(()=>document.body.classList.add("hide-cursor"),2500)};addEventListener("pointermove",Tf);Tf();addEventListener("keydown",n=>{let t=window.director;if(!t)return;let e=n.target&&n.target.tagName||"";if(e==="INPUT"||e==="TEXTAREA"||n.metaKey||n.ctrlKey||n.altKey)return;let i=n.key;if(i==="Enter"||i===" "||i==="ArrowRight")n.preventDefault(),t.stopAuto(),t.primary();else if(i==="ArrowLeft")n.preventDefault(),t.stopAuto(),t.prev();else if(/^[1-5]$/.test(i))t.stopAuto(),t.go(+i-1);else if(i==="a"||i==="A")t.toggleAuto();else if(i==="p"||i==="P")t.chrome.togglePresenter();else if(i==="h"||i==="H")t.chrome.toggleChrome();else if(i==="f"||i==="F")document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen?.();else if(i==="m"||i==="M")t.chrome.toast(t.ctx.sfx.toggle()?"\u52B9\u679C\u97F3: \u30AA\u30F3":"\u52B9\u679C\u97F3: \u30AA\u30D5");else if(i==="r"||i==="R")t.reset();else if(i==="?"||i==="/")t.chrome.toggleHelp();else if(i==="Escape"){if(t.scene&&t.scene.escape&&t.scene.escape())return;t.stopAuto(),t.chrome.toggleHelp(!1),t.chrome.togglePresenter(!1)}});ev().catch(n=>{console.error(n),document.querySelector("#boot .msg").textContent="\u8AAD\u307F\u8FBC\u307F\u306B\u5931\u6557\u3057\u307E\u3057\u305F: "+n.message});})();
/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */
