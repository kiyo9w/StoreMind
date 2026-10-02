/* ─────────────────────────────────────────────────────────────────────────
   StoreMind Showcase · mock data (single source of truth)

   Everything the demo shows comes from here: one fictional store, tomorrow's
   forecast, 14 days of sales per product, the LLM drafts, the code checks.
   No DOM, no network. A later agent swaps these exports for real endpoints
   without touching the scenes (see showcase/docs/HANDOFF.md).
   ───────────────────────────────────────────────────────────────────────── */

/* deterministic noise so the history is stable between runs */
function mulberry32(seed){let a=seed>>>0;return()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}

const pad=n=>String(n).padStart(2,'0');
const WD=['日','月','火','水','木','金','土'];
export function jpDate(offsetDays=0){
  const d=new Date();d.setDate(d.getDate()+offsetDays);
  return {m:d.getMonth()+1,d:d.getDate(),w:WD[d.getDay()],iso:`${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`,
    label:`${d.getMonth()+1}月${d.getDate()}日（${WD[d.getDay()]}）`};
}

/* ───── store ───── */
export const store={
  id:'S-014',
  name:'駅前店',
  chain:'モデル店舗',
  format:'コンビニ',
  area:'1店舗・1カテゴリ（食品＋日用品）',
  orderCutoff:'06:30',
  today:jpDate(0),
  tomorrow:jpDate(1),
};

/* ───── weather (tomorrow, fictional) ───── */
export const weather={
  cond:'雨',
  pop:0.8,                    // 明日の降水確率
  pop2:0.6,                   // 明後日
  hi:14, lo:11,
  wind:'北 5m/s',
  note:'前線の通過で終日雨。夕方に強まる見込み',
  hourly:[ // 3時間ごとの降水確率
    {h:'06',p:.5},{h:'09',p:.7},{h:'12',p:.8},{h:'15',p:.9},{h:'18',p:.9},{h:'21',p:.7},
  ],
  source:'気象データ（デモ用の架空予報）',
};

/* 過去14日: 0=晴/曇, 1=雨 */
export const rainDays=[0,0,1,1,0,0,0,1,0,0,1,1,0,0];
export const temps=[19,20,15,14,18,19,21,13,17,19,12,11,18,20];

/* ───── products ─────
   dry / rain : 平均販売数（1日）  — the history below is generated around these
   safety     : 安全在庫
   cap        : 棚・保管の上限数（在庫＋発注 ≦ cap）
   usual      : 通常の発注量
   pack       : 発注単位（この倍数でしか発注できない）
   cold       : 気温が低い日の需要倍率（lo<13℃で適用）                              */
export const products=[
  {id:'umbrella', no:1,  name:'ビニール傘',        short:'傘',   en:'Vinyl umbrella', cat:'日用品',   unit:'本', pack:6,  price:550, stock:6,  cap:30,  usual:6,  dry:1.4,  rain:17.6, cold:1,    safety:4,  sku:'JP-UMB-0065', supplier:'日用品卸 A',  delivery:'07:30', shelf:{code:'A-03',zone:'入口横',label:'傘スタンド'}, model:'umbrella'},
  {id:'bento',    no:2,  name:'幕の内弁当',        short:'弁当', en:'Makunouchi bento', cat:'デイリー', unit:'個', pack:6,  price:498, stock:7,  cap:40,  usual:30, dry:26,   rain:22.8, cold:1,    safety:0,  sku:'JP-BNT-0112', supplier:'デイリー便',    delivery:'06:00', shelf:{code:'C-01',zone:'冷蔵ケース',label:'弁当・おにぎり'}, model:'bento', expiresTonight:true, shelfLifeH:20},
  {id:'milk',     no:3,  name:'牛乳 200ml（24本入）', short:'牛乳', en:'Milk 200ml ×24', cat:'チルド',   unit:'ケース', pack:1, price:2640, stock:0.5, cap:12, usual:5,  dry:2.2,  rain:2.4,  cold:1,    safety:.4, sku:'JP-MLK-2024', supplier:'乳業 B',       delivery:'07:00', shelf:{code:'C-02',zone:'冷蔵ケース',label:'乳製品'}, model:'milk'},
  {id:'coffee',   no:4,  name:'ホット缶コーヒー',  short:'缶コーヒー', en:'Hot canned coffee', cat:'飲料', unit:'本', pack:12, price:150, stock:4, cap:72, usual:24, dry:11,   rain:13,   cold:1.45, safety:6,  sku:'JP-CFE-0310', supplier:'飲料卸 C',    delivery:'09:00', shelf:{code:'D-01',zone:'レジ横',label:'ホットウォーマー'}, model:'can'},
  {id:'noodle',   no:5,  name:'カップ麺',          short:'カップ麺', en:'Instant noodles', cat:'常温', unit:'個', pack:12, price:228, stock:8, cap:96, usual:24, dry:15,   rain:17,   cold:1.3,  safety:8,  sku:'JP-NDL-0421', supplier:'飲料卸 C',    delivery:'09:00', shelf:{code:'B-02',zone:'中央棚',label:'即席麺'}, model:'noodle'},
  {id:'onigiri',  no:6,  name:'おにぎり（鮭）',    short:'おにぎり', en:'Salmon onigiri', cat:'デイリー', unit:'個', pack:10, price:158, stock:11, cap:60, usual:40, dry:38,   rain:38,   cold:1,    safety:2,  sku:'JP-ONG-0118', supplier:'デイリー便',    delivery:'06:00', shelf:{code:'C-01',zone:'冷蔵ケース',label:'弁当・おにぎり'}, model:'onigiri', expiresTonight:true, shelfLifeH:20},
  {id:'sandwich', no:7,  name:'たまごサンド',      short:'サンド', en:'Egg sandwich', cat:'デイリー', unit:'個', pack:4,  price:268, stock:5,  cap:30, usual:20, dry:17,   rain:14.4, cold:1,    safety:0,  sku:'JP-SND-0130', supplier:'デイリー便',    delivery:'06:00', shelf:{code:'C-01',zone:'冷蔵ケース',label:'弁当・おにぎり'}, model:'sandwich', expiresTonight:true, shelfLifeH:20},
  {id:'salad',    no:8,  name:'サラダ（チキン）',  short:'サラダ', en:'Chicken salad', cat:'デイリー', unit:'個', pack:3,  price:398, stock:4,  cap:24, usual:15, dry:12,   rain:8.6,  cold:.8,   safety:0,  sku:'JP-SLD-0142', supplier:'デイリー便',    delivery:'06:00', shelf:{code:'C-03',zone:'冷蔵ケース',label:'サラダ・デザート'}, model:'salad', expiresTonight:true, shelfLifeH:20},
  {id:'ice',      no:9,  name:'カップアイス',      short:'アイス', en:'Ice cream cup', cat:'冷凍', unit:'個', pack:6,  price:178, stock:0, cap:60, usual:24, dry:9,    rain:4.2,  cold:.55,  safety:0,  sku:'JP-ICE-0507', supplier:'冷凍便',        delivery:'10:00', shelf:{code:'F-01',zone:'冷凍ケース',label:'アイス'}, model:'ice'},
  {id:'raincoat', no:10, name:'使い捨てレインコート', short:'レインコート', en:'Disposable raincoat', cat:'日用品', unit:'枚', pack:4, price:330, stock:2, cap:16, usual:4, dry:.3, rain:4.2, cold:1, safety:6, sku:'JP-RNC-0066', supplier:'日用品卸 A',  delivery:'07:30', shelf:{code:'A-04',zone:'入口横',label:'レイングッズ'}, model:'raincoat'},
  {id:'tea',      no:11, name:'お茶（温）500ml',   short:'温かいお茶', en:'Hot tea 500ml', cat:'飲料', unit:'本', pack:6,  price:160, stock:0, cap:48, usual:24, dry:8,    rain:9.4,  cold:1.35, safety:8,  sku:'JP-TEA-0318', supplier:'飲料卸 C',    delivery:'09:00', shelf:{code:'D-01',zone:'レジ横',label:'ホットウォーマー'}, model:'bottle'},
  {id:'eggs',     no:12, name:'卵 6個入',          short:'卵', en:'Eggs ×6', cat:'チルド', unit:'パック', pack:4, price:248, stock:2, cap:30, usual:12, dry:6.2, rain:6.2, cold:1, safety:0, sku:'JP-EGG-0215', supplier:'乳業 B',       delivery:'07:00', shelf:{code:'C-02',zone:'冷蔵ケース',label:'乳製品'}, model:'eggs'},
];

/* ───── 14-day sales history (generated around dry/rain) ───── */
export function buildHistory(p){
  const rnd=mulberry32(p.no*7919+13);
  return rainDays.map((r,i)=>{
    const base=r?p.rain:p.dry;
    const cold=(temps[i]<13)?p.cold:1;
    const v=base*(r?1:cold)*(1+(rnd()-.5)*.16);
    return Math.max(0,Math.round(v*10)/10);
  });
}
products.forEach(p=>{
  p.history=buildHistory(p);
  const rainVals=p.history.filter((_,i)=>rainDays[i]);
  const dryVals=p.history.filter((_,i)=>!rainDays[i]);
  const avg=a=>a.reduce((x,y)=>x+y,0)/(a.length||1);
  p.rainAvg=avg(rainVals); p.dryAvg=avg(dryVals);
});
/* the two hero items are shaped by hand so the story's numbers read cleanly */
{
  const U=products[0];
  U.history=[1,2,19,16,1,0,2,18,1,1,17,18,2,1];
  const B=products[1];
  B.history=[27,25,23,22,26,28,26,22,27,25,23,22,26,25];
  const avg=a=>a.reduce((x,y)=>x+y,0)/(a.length||1);
  for(const p of [U,B]){
    p.rainAvg=avg(p.history.filter((_,i)=>rainDays[i]));
    p.dryAvg=avg(p.history.filter((_,i)=>!rainDays[i]));
  }
}

/* ───── forecast model (deterministic, runs in the browser) ─────
   demand over the horizon (2 days) from the dry / rain averages weighted by
   the precipitation probability; order = demand + safety − sellable stock,
   rounded UP to the pack size, then limited by the shelf cap.               */
export function demandFor(p,pops=[weather.pop,weather.pop2],lo=weather.lo){
  const coldF=lo<13?p.cold:1;
  return pops.reduce((sum,pop)=>sum+(p.dryAvg*coldF*(1-pop)+p.rainAvg*pop),0);
}
export function orderFor(p,pops,lo){
  const dem=demandFor(p,pops,lo);
  const sellable=p.expiresTonight?0:p.stock;
  const need=dem+p.safety-sellable;
  const packs=Math.ceil(Math.max(0,need)/p.pack);
  const raw=packs*p.pack;
  const room=Math.max(0,p.cap-(p.expiresTonight?0:p.stock));
  const qty=Math.min(raw,Math.floor(room/p.pack)*p.pack);
  return {demand:dem,need,raw,qty,capped:raw>qty,room};
}
/* bento / short-life items are ordered per day, not per 2-day horizon */
export function orderForProduct(p,pop=weather.pop,lo=weather.lo,pop2=weather.pop2){
  const pops=p.expiresTonight?[pop]:[pop,pop2];
  return orderFor(p,pops,lo);
}

/* ───── what the "LLM" drafted vs what code let through ───── */
const DRAFT={ // product id → { draft: what the model wrote first, why code touched it }
  umbrella:{draft:36,fix:'cap',      fixNote:'棚の上限は30本。在庫6本のため、追加は24本までです。'},
  milk:    {draft:5, fix:'sku',      fixNote:'SKU「牛乳 1L」は仕入先カタログにありません。「牛乳 200ml（24本入）」へ置き換えました。'},
};
products.forEach(p=>{
  const o=orderForProduct(p);
  p.order=o;
  p.proposed=o.qty;
  p.delta=p.proposed-p.usual;
  p.dir=p.delta>0?'up':p.delta<0?'down':'hold';
  const d=DRAFT[p.id];
  p.draft=d?d.draft:p.proposed;
  p.fix=d?d.fix:null;
  p.fixNote=d?d.fixNote:null;
  p.checks=[
    {id:'sku',  label:'SKUの整合',     detail:`${p.sku} は仕入先カタログにあります`,           state:p.fix==='sku'?'fixed':'ok'},
    {id:'unit', label:'発注単位',      detail:`${p.pack}${p.unit}単位で発注できます`,           state:'ok'},
    {id:'cap',  label:'数量の上限',    detail:`棚と保管の上限は${p.cap}${p.unit}です`,           state:p.fix==='cap'?'fixed':'ok'},
    {id:'life', label:'賞味・消費期限', detail:p.expiresTonight?'売れ残りは今夜で期限切れ。明日の販売には使いません':'販売期間内に使い切れる量です', state:'ok'},
  ];
});
/* the manager's chat revises #3 later; keep the revised value here so the scenes agree */
export const revision={productId:'milk',from:5,to:8,
  question:'3番の牛乳、先週は在庫が切れそうでした。もう少し必要ではないですか？',
  answer:'ご指摘のとおり、先週は2回、在庫が12本を下回りました。週末は需要が約18%増える傾向があり、配送も2日おきです。5ケースから8ケースに修正します。'};

/* ───── short reasons shown on the approval sheet (理由) ───── */
export function reasonShort(p){
  const r=p.rainAvg.toFixed(1), d=p.dryAvg.toFixed(1);
  switch(p.id){
    case 'umbrella': return `明日は雨（降水確率80%）。雨の日は1日平均${Math.round(p.rainAvg)}本売れ、在庫は${p.stock}本です。`;
    case 'bento':    return `在庫が${p.stock}個残り、期限は今夜です。雨の日は売れ行きが落ちるため、少なめにします。`;
    case 'milk':     return `毎日${Math.round(p.rainAvg*24)}本前後が動きます。配送は2日おきで、在庫は残り半ケースです。`;
    case 'coffee':   return `最低気温11℃。気温が低い日の販売は約${Math.round((p.cold-1)*100)}%増えています。`;
    case 'noodle':   return `雨と寒さが重なる日は、カップ麺が伸びています。`;
    case 'onigiri':  return `雨でも売れ行きは変わりません。前日と同じ量にします。`;
    case 'sandwich': return `雨の日は軽食の販売が約${Math.round((1-p.rainAvg/p.dryAvg)*100)}%減ります。期限も今夜です。`;
    case 'salad':    return `気温が低く、雨の日は販売が落ちます。廃棄を避けるため少なめにします。`;
    case 'ice':      return `最低気温11℃のため、アイスは平常の約${Math.round(p.cold*100)}%まで下がります。`;
    case 'raincoat': return `傘と合わせて、雨の日に動く商品です。在庫は${p.stock}枚しかありません。`;
    case 'tea':      return `寒い日は温かい飲み物が売れます。レジ横のウォーマーを補充します。`;
    case 'eggs':     return `天気の影響が小さい商品です。通常どおり発注します。`;
  }
  return `過去14日の販売（晴${d}／雨${r}）と天気予報から算出しました。`;
}

/* ───── long reasoning (the "thinking" the LLM shows) ───── */
export function reasonLong(p){
  const n1=v=>(Math.round(v*10)/10).toString();
  const o=p.order;
  const lines=[];
  lines.push(`過去14日のうち雨の日は5日。${p.short}は雨の日に1日平均${n1(p.rainAvg)}${p.unit}、それ以外は${n1(p.dryAvg)}${p.unit}でした。`);
  if(p.expiresTonight){
    lines.push(`明日の降水確率は80%。1日の需要は約${n1(o.demand)}${p.unit}と見込みます。`);
    lines.push(`今ある${p.stock}${p.unit}は今夜で期限切れのため、明日の販売には数えません。必要数は${p.proposed}${p.unit}です。`);
  }else{
    lines.push(`明日80%・明後日60%の雨予報から、2日分の需要を約${Math.round(o.demand)}${p.unit}と見込みます。`);
    lines.push(`在庫${p.stock}${p.unit}と安全在庫${p.safety}${p.unit}を踏まえて、${p.proposed}${p.unit}を提案します。`);
  }
  return lines;
}

/* ───── overnight run: the schedule the scene plays back ───── */
export const nightRun={
  startedAt:'22:00',
  steps:[
    {t:'22:04',id:'sync',   label:'在庫・販売データを同期',      detail:'在庫DB 1,284 SKU · 販売履歴 14日分'},
    {t:'23:30',id:'weather',label:'天気予報を取得',              detail:'降水確率 80% · 最低気温 11℃'},
    {t:'01:10',id:'supplier',label:'仕入先カタログを照合',       detail:'発注単位・上限・リードタイム'},
    {t:'02:30',id:'draft',  label:'LLMが補充案を下書き',          detail:'12品目 · 理由つき'},
    {t:'03:20',id:'verify', label:'コードで確認',                 detail:'SKU・数量・期限を検証'},
    {t:'04:12',id:'ready',  label:'下書き完成',                   detail:'管理者の承認待ち'},
  ],
  sources:[
    {id:'inv',  label:'在庫DB',          sub:'Inventory',  stat:'1,284 SKU'},
    {id:'sales',label:'販売履歴',        sub:'Sales',      stat:'14日分'},
    {id:'wx',   label:'天気予報',        sub:'Weather',    stat:'明日 雨 80%'},
    {id:'sup',  label:'サプライヤー',    sub:'Catalog',    stat:'発注単位・上限'},
  ],
  retry:{ // LLM self-repair after the code check
    wrong:'牛乳 1L（SKU JP-MLK-1000）',
    right:'牛乳 200ml（24本入）JP-MLK-2024',
  },
};

/* ───── deliveries (staff chat: 次の入荷) ───── */
export const deliveries=[
  {time:'06:00',name:'デイリー便（1便）',items:'弁当・おにぎり・サンドイッチ・サラダ',status:'done'},
  {time:'07:00',name:'チルド便',        items:'牛乳・卵',                              status:'done'},
  {time:'07:30',name:'日用品便',        items:'ビニール傘 24本・レインコート 12枚',     status:'next'},
  {time:'09:00',name:'常温・飲料便',    items:'缶コーヒー・お茶・カップ麺',            status:'todo'},
  {time:'15:00',name:'デイリー便（2便）',items:'弁当・おにぎり',                        status:'todo'},
];

export function productById(id){return products.find(p=>p.id===id)}
export function findProduct(q){
  q=(q||'').toLowerCase();
  return products.find(p=>q.includes(p.short.toLowerCase())||q.includes(p.name.slice(0,3))||q.includes(p.id)||q.includes(p.en.toLowerCase().split(' ')[0]));
}

/* summary used by the finale */
export function proposalStats(){
  return {
    total:products.length,
    up:products.filter(p=>p.dir==='up').length,
    down:products.filter(p=>p.dir==='down').length,
    hold:products.filter(p=>p.dir==='hold').length,
    fixed:products.filter(p=>p.fix).length,
  };
}
