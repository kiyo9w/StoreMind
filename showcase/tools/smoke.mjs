/* End-to-end smoke test: plays the whole story in headless Chrome at 8× speed, asserts the facts
   the presentation depends on, and writes full-resolution screenshots.

     node tools/smoke.mjs                 # asserts + screenshots → docs/screens/
     node tools/smoke.mjs --no-shots      # asserts only
     PORT=8123 node tools/smoke.mjs       # use another port
   Needs Google Chrome (set CHROME=/path if it is elsewhere) and python3 (for serve.py). No npm install. */
import {spawn} from 'node:child_process';
import {mkdirSync} from 'node:fs';
import {dirname,join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {launch} from './cdp.mjs';

const root=join(dirname(fileURLToPath(import.meta.url)),'..');
const PORT=+process.env.PORT||8731;
const shots=!process.argv.includes('--no-shots');
const outDir=join(root,'docs','screens');if(shots)mkdirSync(outDir,{recursive:true});

const srv=spawn('python3',[join(root,'serve.py'),String(PORT),'--no-open'],{stdio:'ignore'});
await new Promise(r=>setTimeout(r,800));

let pass=0,fail=0;
const ok=(c,msg)=>{if(c){pass++;console.log('  ✓',msg)}else{fail++;console.log('  ✗',msg)}};
const b=await launch({width:1920,height:1080});
const E=x=>b.eval(x);
const snap=async name=>{if(shots){await b.sleep(900);await b.shot(join(outDir,name+'.jpg'))}};
const idle=()=>b.until('!window.__demo.director.scene.chat?.busy && !window.__demo.director.scene.typing && !window.__demo.director.busy',{timeout:90000,label:'chat idle'});
const press=async()=>{await E('window.__demo.director.primary()')};

try{
  console.log('boot');
  await b.goto(`http://localhost:${PORT}/index.html?speed=8`);
  await b.until('!!(window.__demo&&window.__demo.director.scene)',{timeout:90000,label:'boot'});
  await b.sleep(3500);
  ok(await E(`__demo.director.scene.id`)==='open','starts on 01 open');
  ok(await E(`document.querySelectorAll('.scene-open .signals li').length`)===3,'three signals shown');
  await snap('01-open');

  console.log('night');
  await press();await b.until(`__demo.director.scene.id==='night'`,{label:'night scene'});
  await b.until(`__demo.director.scene.phase==='done'`,{timeout:120000,label:'night run done'});
  ok(await E(`document.querySelectorAll('.scene-night .node.is-done').length`)===4,'all four pipeline nodes done');
  ok(await E(`document.querySelectorAll('.scene-night .src.is-ok').length`)===4,'four data sources loaded');
  ok(await E(`document.querySelectorAll('.scene-night .chk .dot.fix').length`)===2,'code corrected exactly two drafts');
  ok((await E(`document.querySelector('.scene-night .pin[data-code="A-03"] .v').textContent`)).includes('24'),'umbrella pin shows corrected 24');
  await snap('02-night');

  console.log('morning');
  await press();await b.until(`__demo.director.scene.id==='morning'`,{label:'morning scene'});
  await b.until(`document.querySelectorAll('.scene-morning .row').length===12 && getComputedStyle(document.querySelector('.scene-morning .sheet')).opacity==='1'`,{timeout:30000,label:'sheet visible'});
  await b.sleep(1500);
  ok(await E(`document.querySelector('.scene-morning .row[data-id=umbrella] .q b').textContent`)==='24','umbrella proposes 24');
  ok(await E(`document.querySelector('.scene-morning .row[data-id=bento] .q b').textContent`)==='24','bento proposes 24 (少なめ)');
  await snap('03-morning');
  await press();await b.sleep(600);
  ok(await E(`!!document.querySelector('.scene-morning .row.is-sel[data-id=bento]')`),'beat 1 selects 弁当');
  await press();await idle();await b.sleep(800);
  ok(await E(`document.querySelector('.scene-morning .row[data-id=milk] .q b').textContent`)==='8','chat revised 牛乳 5 → 8');
  ok(await E(`__demo.state.revisedByChat`),'revision recorded as chat-made');
  await snap('04-morning-chat');
  await press();await idle();await b.sleep(2500);
  ok(await E(`document.querySelector('.scene-morning [data-sim] input').value`)==='20','what-if slider moved to 20%');
  ok(await E(`document.querySelector('.scene-morning .row[data-id=umbrella] .q b').textContent`)==='12','umbrella recalculated to 12');
  await snap('05-morning-whatif');
  await press();await b.until(`document.getElementById('sheet').classList.contains('is-approved')`,{timeout:30000,label:'approved'});
  ok(await E(`document.querySelector('.scene-morning .row[data-id=umbrella] .q b').textContent`)==='24','approval restores forecast quantities (24)');
  ok(await E(`document.querySelectorAll('.scene-morning .sent .env').length`)===5,'five supplier orders listed');
  await b.sleep(1200);await snap('06-morning-approved');

  console.log('day');
  await press();await b.until(`__demo.director.scene.id==='day'`,{label:'day scene'});
  await b.sleep(3500);
  await press();await idle();await b.sleep(2500);
  ok((await E(`document.querySelector('.scene-day .rcard.is-stock .big').textContent`)).startsWith('19'),'umbrella stock 19 after the morning delivery');
  ok(await E(`__demo.world.located`)==='A-03','camera located the umbrella stand');
  await snap('07-day-locate');
  await press();await idle();await b.sleep(2500);
  ok(await E(`__demo.world.located`)==='D-01','warm tea located at the register warmer');
  await press();await idle();
  ok(await E(`!!document.querySelector('.scene-day tr.is-next')`),'delivery card highlights the next truck');
  await press();await b.sleep(7000);
  ok(await E(`document.querySelector('.scene-day .ar').classList.contains('is-open')`),'AR shelf-scan concept opens');
  await snap('08-day-ar');
  await press();await b.sleep(1200);
  await press();await b.sleep(4500);
  ok(await E(`document.querySelectorAll('.scene-day .pin.stk').length`)>=6,'heat map pins shown');
  await snap('09-day-heat');

  console.log('end');
  await press();await b.until(`__demo.director.scene.id==='end'`,{label:'end scene'});
  await b.sleep(5000);
  ok(await E(`document.querySelector('.scene-end [data-live]').textContent`)==='1/12','finale shows this session: 1 of 12 edited');
  ok(await E(`document.querySelectorAll('.scene-end .kpi:not(.is-live) .v').length`)===3,'three KPIs stay unmeasured');
  await snap('10-end');

  console.log('keyboard');
  await b.key('ArrowLeft');await b.until(`__demo.director.scene.id==='day' && !__demo.director.busy`,{label:'← goes back to day'});
  ok(true,'← returns to the previous scene');
  await b.key('3');await b.until(`__demo.director.scene.id==='morning' && !__demo.director.busy`,{label:'3 jumps to morning'});
  ok(true,'3 jumps to the morning sheet');
  await b.key('r');await b.until(`__demo.director.scene.id==='open' && !__demo.director.busy`,{timeout:40000,label:'r resets'});
  ok(await E(`__demo.state.edits.size===0 && !__demo.state.approved`),'R resets the session (edits cleared, not approved)');

  const errs=b.logs.filter(l=>l.startsWith('[exception]')||l.startsWith('[error]'));
  ok(errs.length===0,'no console errors'+(errs.length?': '+errs.slice(0,3).join(' | '):''));
}catch(e){fail++;console.log('  ✗ aborted:',e.message);console.log(b.logs.slice(-8).join('\n'))}
finally{await b.close();srv.kill()}
console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail?1:0);
