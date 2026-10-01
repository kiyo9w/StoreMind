/* Minimal Chrome DevTools Protocol driver. No dependencies (Node ≥ 22 has WebSocket + fetch).
   Used by smoke.mjs; also handy for ad-hoc screenshots:  node tools/cdp.mjs <url> <out.png> [WxH] */
import {spawn} from 'node:child_process';
import {mkdtempSync,writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';

const CHROME=process.env.CHROME||'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const sleep=ms=>new Promise(r=>setTimeout(r,ms));

export async function launch({width=1920,height=1080,port=9300+Math.floor(Math.random()*500),gl=true}={}){
  const dir=mkdtempSync(join(tmpdir(),'sm-chrome-'));
  const args=['--headless=new','--remote-debugging-port='+port,'--user-data-dir='+dir,`--window-size=${width},${height}`,
    '--no-first-run','--no-default-browser-check','--hide-scrollbars','--mute-audio',
    ...(gl?['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']:[]),'about:blank'];
  const proc=spawn(CHROME,args,{stdio:'ignore'});
  let list;
  for(let i=0;i<60;i++){
    try{list=await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();if(list.length)break}catch{}
    await sleep(250);
  }
  const page=list.find(t=>t.type==='page');
  const ws=new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((res,rej)=>{ws.onopen=res;ws.onerror=rej});
  let id=0;const pend=new Map();const logs=[];
  ws.onmessage=e=>{
    const m=JSON.parse(e.data);
    if(m.id&&pend.has(m.id)){const {res,rej}=pend.get(m.id);pend.delete(m.id);m.error?rej(new Error(m.error.message)):res(m.result)}
    else if(m.method==='Runtime.consoleAPICalled')logs.push(`[${m.params.type}] `+m.params.args.map(a=>a.value??a.description).join(' '));
    else if(m.method==='Runtime.exceptionThrown')logs.push('[exception] '+(m.params.exceptionDetails.exception?.description||m.params.exceptionDetails.text));
  };
  const send=(method,params={})=>new Promise((res,rej)=>{const i=++id;pend.set(i,{res,rej});ws.send(JSON.stringify({id:i,method,params}))});
  await send('Runtime.enable');await send('Page.enable');
  await send('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:false});
  const api={
    logs,
    async goto(url){await send('Page.navigate',{url})},
    async eval(expr){
      const r=await send('Runtime.evaluate',{expression:expr,awaitPromise:true,returnByValue:true});
      if(r.exceptionDetails)throw new Error(r.exceptionDetails.exception?.description||r.exceptionDetails.text);
      return r.result.value;
    },
    async until(expr,{timeout=60000,every=250,label=expr}={}){
      const t0=Date.now();
      while(Date.now()-t0<timeout){try{if(await api.eval(expr))return true}catch{}await sleep(every)}
      throw new Error('timeout waiting for: '+label);
    },
    async shot(file){
      const jpg=/\.jpe?g$/.test(file);
      const r=await send('Page.captureScreenshot',jpg?{format:'jpeg',quality:84}:{format:'png'});
      writeFileSync(file,Buffer.from(r.data,'base64'));return file;
    },
    async key(k){
      const map={ArrowLeft:[37,'ArrowLeft'],ArrowRight:[39,'ArrowRight'],Enter:[13,'Enter'],Escape:[27,'Escape'],' ':[32,'Space']};
      const [vk,code]=map[k]||[k.toUpperCase().charCodeAt(0),/^\d$/.test(k)?'Digit'+k:'Key'+k.toUpperCase()];
      const base={key:k,code,windowsVirtualKeyCode:vk,nativeVirtualKeyCode:vk};
      await send('Input.dispatchKeyEvent',{type:'keyDown',...base,text:k.length===1?k:undefined});
      await send('Input.dispatchKeyEvent',{type:'keyUp',...base});
    },
    async mouse(x,y,type='mouseMoved'){await send('Input.dispatchMouseEvent',{type,x,y,button:type==='mouseMoved'?'none':'left',clickCount:type==='mouseMoved'?0:1})},
    async click(x,y){await api.mouse(x,y);await api.mouse(x,y,'mousePressed');await api.mouse(x,y,'mouseReleased')},
    sleep,
    async close(){try{await send('Browser.close')}catch{}ws.close();proc.kill()},
  };
  return api;
}

if(process.argv[1]&&process.argv[1].endsWith('cdp.mjs')&&process.argv[2]){
  const [url,out,wh='1920x1080']=process.argv.slice(2);const [w,h]=wh.split('x').map(Number);
  const b=await launch({width:w,height:h});
  await b.goto(url);await b.until('!!(window.director&&window.director.scene)',{timeout:90000});
  await b.sleep(Number(process.env.WAIT||6000));await b.shot(out);console.log('wrote',out);await b.close();
}
