/* ─────────────────────────────────────────────────────────────────────────
   Mock LLM.  No network, no model: every reply is a short script of events
   (tool calls → streamed text → result card → UI action) chosen by a small
   rule-based intent parser over the demo's own data.

   To wire the real service later: replace `managerReply` / `staffReply` with
   an SSE client that yields the same event shapes (docs/HANDOFF.md §3).

   Event shapes
     {type:'tool', icon, label, arg, result, ms}
     {type:'text', text}
     {type:'card', kind, data}
     {type:'action', name, payload}
   ───────────────────────────────────────────────────────────────────────── */
import {products,productById,weather,deliveries,revision,orderForProduct,findProduct,reasonLong} from './data.js';
import {state} from '../state.js';

const N=v=>(Math.round(v*10)/10).toString();

/* the quantity currently on the sheet for a product (manager edits win) */
export const qtyOf=p=>state.edits.has(p.id)?state.edits.get(p.id):(state.sim?orderForProduct(p,state.sim.pop,weather.lo,state.sim.pop*.75).qty:p.proposed);

/* stock on the shelf at 14:20: this morning's approved order has arrived, today's sales are out */
export const soldNow=p=>Math.round(p.rainAvg*.62*10)/10;
export function stockNow(p){
  const base=(p.expiresTonight?0:p.stock)+qtyOf(p);
  return Math.max(0,Math.round(base-soldNow(p)));
}

const numFrom=t=>{const m=t.match(/\d+(?:\.\d+)?/g);return m?m.map(Number):[]};
const nameHit=t=>products.find(p=>t.includes(p.short)||t.includes(p.name.slice(0,2))||t.toLowerCase().includes(p.en.toLowerCase().split(' ')[0]));

/* ───────────────────────── manager ───────────────────────── */
export function parseManager(text,ctx={}){
  const t=text.trim();
  const nums=numFrom(t);
  const nBan=t.match(/(\d{1,2})\s*番/);
  const prod=nBan?products.find(p=>p.no===+nBan[1]):nameHit(t);
  if(/承認|発注して|確定|これで(いい|OK)/.test(t)&&!/理由|なぜ/.test(t))return {type:'approve'};
  if(/降らな|晴れ|止ん|もし|降水確率|雨が?(弱|止)/.test(t)){
    const pct=t.match(/(\d{1,3})\s*[%％]/);
    return {type:'whatif',pop:pct?Math.min(100,+pct[1])/100:/降らな|止/.test(t)?.2:.2};
  }
  if(/理由|なぜ|どうして|根拠|説明/.test(t))return {type:'explain',p:prod||ctx.selected||products[0]};
  if(prod&&(/見直|増や|多|足り|切れ|少な|減ら|変更|修正|もっと|にして|へ/.test(t)||nums.length>=(nBan?2:1))){
    const rest=nBan?nums.filter(n=>n!==+nBan[1]||nums.indexOf(n)>0):nums;
    const target=nBan?(nums.length>1?nums[nums.length-1]:null):(nums.length?nums[nums.length-1]:null);
    let dir=0;if(/増や|多|足り|切れ|もっと/.test(t))dir=1;if(/減ら|少な|余/.test(t))dir=-1;
    return {type:'revise',p:prod,target,dir};
  }
  if(/状況|未確認|残り|進捗/.test(t))return {type:'status'};
  return {type:'fallback',text:t};
}

export async function* managerReply(intent,ctx={}){
  switch(intent.type){
    case 'revise':{
      const p=intent.p,cur=qtyOf(p);
      const isMilk=p.id==='milk'&&intent.target==null;
      let to=intent.target!=null?intent.target:(intent.dir<0?cur-p.pack:cur+(isMilk?revision.to-revision.from:p.pack));
      to=Math.max(0,Math.min(Math.floor(p.cap/p.pack)*p.pack,Math.round(to/p.pack)*p.pack));
      if(isMilk)to=revision.to;
      yield {type:'tool',icon:'chart',label:'販売履歴を再集計',arg:`${p.short} · 直近7日`,result:`平均 ${N(p.rainAvg)}${p.unit}/日`,ms:900};
      yield {type:'tool',icon:'db',label:'在庫の推移を確認',arg:p.short,result:p.id==='milk'?'12本を下回った日 2回':`現在庫 ${p.stock}${p.unit}`,ms:800};
      if(p.id==='milk')yield {type:'tool',icon:'cube',label:'週末の需要を補正',arg:'土日の傾向',result:'+18%',ms:700};
      yield {type:'tool',icon:'checks',label:'コードで再確認',arg:`SKU · 発注単位 · 上限 ${p.cap}${p.unit}`,result:to<=p.cap?'すべて通過':'上限を超えるため調整',ms:900,ok:true};
      if(p.id==='milk'&&intent.target==null)yield {type:'text',text:revision.answer};
      else yield {type:'text',text:to===cur?`${p.name}は${cur}${p.unit}のままで問題ありません。過去の販売と天気予報から見て、この数量で足りる見込みです。`:`${p.name}を${cur}${p.unit}から${to}${p.unit}に修正します。${to>cur?'欠品のリスクを下げる方向です。':'廃棄のリスクを下げる方向です。'}コードの確認も通過しました。`};
      yield {type:'card',kind:'revision',data:{p,from:cur,to}};
      if(to!==cur)yield {type:'action',name:'setQty',payload:{id:p.id,qty:to,byChat:true}};
      return;
    }
    case 'explain':{
      const p=intent.p;
      yield {type:'tool',icon:'db',label:'在庫DBを照会',arg:p.name,result:`${p.stock}${p.unit}`,ms:700};
      yield {type:'tool',icon:'rain',label:'天気予報を参照',arg:'明日 雨 80%',result:`最低 ${weather.lo}℃`,ms:700};
      yield {type:'tool',icon:'chart',label:'販売履歴を集計',arg:'14日',result:`雨 ${N(p.rainAvg)} / 晴 ${N(p.dryAvg)}`,ms:800};
      yield {type:'text',text:reasonLong(p).join('\n')+(p.fix==='cap'?`\nLLMの下書きは${p.draft}${p.unit}でしたが、棚の上限を超えるため、コードが${p.proposed}${p.unit}に修正しています。`:'')};
      yield {type:'action',name:'select',payload:{id:p.id}};
      return;
    }
    case 'whatif':{
      const pop=intent.pop;
      yield {type:'tool',icon:'rain',label:'条件を変えて再計算',arg:`降水確率 ${Math.round(pop*100)}%`,result:'12品目',ms:1100};
      yield {type:'tool',icon:'checks',label:'コードで再確認',arg:'上限 · 発注単位',result:'すべて通過',ms:700,ok:true};
      const rows=products.map(p=>({p,from:p.proposed,to:orderForProduct(p,pop,weather.lo,pop*.75).qty})).filter(r=>r.from!==r.to);
      const u=rows.find(r=>r.p.id==='umbrella');
      yield {type:'text',text:`降水確率が${Math.round(pop*100)}%の場合、${rows.length}品目の数量が変わります。${u?`傘は${u.from}本から${u.to}本に減ります。`:''}画面に反映しました。元の予報（80%）に戻すには、スライダーを動かしてください。`};
      yield {type:'action',name:'sim',payload:{pop}};
      return;
    }
    case 'approve':{
      yield {type:'tool',icon:'checks',label:'承認前の確認',arg:'12品目',result:'すべて通過',ms:900,ok:true};
      yield {type:'text',text:'12品目の内容を確認しました。承認すると、仕入先ごとの発注書にまとまります。'};
      yield {type:'action',name:'approve',payload:{}};
      return;
    }
    case 'status':{
      const done=state.reviewed.size;
      yield {type:'text',text:`確認済みは${done}品目、手で直したのは${state.edits.size}品目です。残りの${products.length-done}品目は、そのまま承認することもできます。`};
      return;
    }
    default:{
      yield {type:'tool',icon:'db',label:'在庫・販売データを確認',arg:'12品目',result:'変更の必要なし',ms:900};
      yield {type:'text',text:'いまの提案には、追加で直す点は見つかりませんでした。数量を変えたいときは、「3番を8ケースにして」のように伝えてください。理由を知りたいときは、「傘の理由を教えて」と聞いてください。'};
      return;
    }
  }
}

/* ───────────────────────── staff (daytime) ───────────────────────── */
export function parseStaff(text,ctx={}){
  const t=text.trim();
  const prod=nameHit(t)||ctx.last;
  if(/AR|スキャン|カメラ|棚を(見|映)/i.test(t))return {type:'ar'};
  if(/期限|賞味|廃棄|消費/.test(t))return {type:'expiry'};
  if(/入荷|納品|届く|次の便|いつ.*(来|届|着)/.test(t))return {type:'delivery',p:nameHit(t)};
  if(/どこ|場所|探|置いて|ある\?|ありますか|棚/.test(t)&&!/在庫/.test(t))return {type:'where',p:prod||productById('umbrella')};
  if(/天気|雨|降水|傘が/.test(t)&&!/在庫|いくつ|何本|何個/.test(t)&&!nameHit(t))return {type:'weather'};
  if(/在庫|いくつ|何個|何本|何パック|残り|ある/.test(t)||prod)return {type:'stock',p:prod||productById('umbrella')};
  return {type:'fallback',text:t};
}

export async function* staffReply(intent){
  switch(intent.type){
    case 'stock':{
      const p=intent.p,now=stockNow(p),nextDel=p.delivery;
      yield {type:'tool',icon:'db',label:'在庫DBを照会',arg:p.name,result:`${now}${p.unit}`,ms:800};
      yield {type:'tool',icon:'truck',label:'入荷予定を確認',arg:p.supplier,result:nextDelivery(p),ms:700};
      yield {type:'text',text:`${p.name}の在庫は、いま${now}${p.unit}です。場所は${p.shelf.zone}（${p.shelf.code}）。${nextDelivery(p,true)}`};
      yield {type:'card',kind:'stock',data:{p,now}};
      yield {type:'action',name:'locate',payload:{code:p.shelf.code,p}};
      return;
    }
    case 'where':{
      const p=intent.p;
      yield {type:'tool',icon:'pin',label:'棚の位置を検索',arg:p.name,result:p.shelf.code,ms:700};
      yield {type:'text',text:`${p.name}は、${p.shelf.zone}の「${p.shelf.label}」（${p.shelf.code}）にあります。店内の模型で場所を示します。`};
      yield {type:'card',kind:'locate',data:{p}};
      yield {type:'action',name:'locate',payload:{code:p.shelf.code,p}};
      return;
    }
    case 'delivery':{
      yield {type:'tool',icon:'truck',label:'入荷予定を照会',arg:'本日',result:`${deliveries.length}便`,ms:800};
      const nxt=deliveries.find(d=>d.status==='next');
      yield {type:'text',text:`次の入荷は${nxt.time}の${nxt.name}です。${nxt.items}が届きます。`};
      yield {type:'card',kind:'delivery',data:{rows:deliveries}};
      return;
    }
    case 'expiry':{
      yield {type:'tool',icon:'clock',label:'期限が近い商品を検索',arg:'今夜まで',result:'3品目',ms:900};
      const ex=products.filter(p=>p.expiresTonight).slice(0,3).map(p=>({p,now:stockNow(p)}));
      yield {type:'text',text:`今夜24:00が期限の商品は3品目です。${ex.map(e=>`${e.p.short} ${e.now}${e.p.unit}`).join('、')}。15:00の2便が届く前に、棚の手前に並べ直すと売り切りやすくなります。`};
      yield {type:'card',kind:'expiry',data:{rows:ex}};
      return;
    }
    case 'weather':{
      yield {type:'tool',icon:'rain',label:'天気予報を参照',arg:'今日・明日',result:`降水確率 ${Math.round(weather.pop*100)}%`,ms:800};
      yield {type:'text',text:`夕方にかけて雨が強まる予報です。降水確率は15時と18時が90%。傘は朝の入荷分で足りる見込みですが、閉店前に残りをご確認ください。`};
      yield {type:'card',kind:'weather',data:{hourly:weather.hourly}};
      return;
    }
    case 'ar':{
      yield {type:'text',text:'棚をカメラで見ながら、商品と在庫の数を重ねて表示します。'};
      yield {type:'action',name:'ar',payload:{}};
      return;
    }
    default:{
      yield {type:'tool',icon:'db',label:'在庫・入荷データを検索',arg:intent.text.slice(0,18),result:'候補なし',ms:800};
      yield {type:'text',text:'商品名を教えてください。たとえば「傘の在庫は？」「冷たいお茶はどこ？」「次の入荷はいつ？」のように聞けます。'};
      return;
    }
  }
}
function nextDelivery(p,long=false){
  if(p.expiresTonight&&p.cat==='デイリー')return long?'次の入荷は15:00（2便）です。':'15:00 2便';
  return long?'今日の入荷は完了しています。':'入荷済み';
}
