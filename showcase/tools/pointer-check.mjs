/* Real-mouse check of the day scene: hover a shelf → tooltip; click it → the assistant is asked.
   node tools/pointer-check.mjs   (Chrome + python3 required) */
import {spawn} from 'node:child_process';
import {dirname,join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {launch} from './cdp.mjs';
const root=join(dirname(fileURLToPath(import.meta.url)),'..');
const srv=spawn('python3',[join(root,'serve.py'),'8743','--no-open'],{stdio:'ignore'});
await new Promise(r=>setTimeout(r,700));
let fail=0;const ok=(c,m)=>{console.log(c?'  ✓':'  ✗',m);if(!c)fail++};
const b=await launch({width:1920,height:1080});
try{
  await b.goto('http://localhost:8743/index.html?speed=8&scene=day');
  await b.until('!!(window.__demo&&window.__demo.director.scene&&window.__demo.director.scene.id==="day")',{timeout:90000});
  await b.sleep(5000);
  const p=await b.eval(`(()=>{const w=__demo.world;const s=w.project(w.bays['A-03'].center);return {x:s.x,y:s.y}})()`);
  await b.mouse(p.x-4,p.y);await b.mouse(p.x,p.y);await b.sleep(500);
  ok(await b.eval(`__demo.world._hover==='A-03'`),'hovering the umbrella stand highlights bay A-03');
  ok(await b.eval(`document.querySelector('.tip3d').classList.contains('is-on')`),'tooltip appears');
  await b.click(p.x,p.y);await b.sleep(1500);
  ok((await b.eval(`document.querySelector('.scene-day .msg.user .bub')?.textContent||''`)).includes('傘'),'clicking the shelf asks the assistant about it');
  await b.until(`!__demo.director.scene.chat.busy`,{timeout:60000});
  ok((await b.eval(`document.querySelector('.scene-day .rcard.is-stock .big')?.textContent||''`)).startsWith('19'),'and the answer arrives (19本)');
  await b.mouse(960,60);await b.sleep(300);
  ok(await b.eval(`!document.querySelector('.tip3d').classList.contains('is-on')`),'tooltip hides when the pointer leaves the shelf');
}catch(e){fail++;console.log('  ✗ aborted:',e.message)}
finally{await b.close();srv.kill()}
console.log(fail?'FAILED':'ok');process.exit(fail?1:0);
