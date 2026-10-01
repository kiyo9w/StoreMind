/* Result cards rendered inside the chat transcript. */
import {h} from '../util.js';
import {I} from './icons.js';

export function renderCard(ev){
  const {kind,data}=ev;
  switch(kind){
    case 'revision':{
      const {p,from,to}=data;
      return h(`<div class="rcard is-rev"><div class="rh"><span>数量の修正</span><span>${to===from?'変更なし':'コードの確認 ✓'}</span></div>
        <div class="rb"><span class="from">${from}</span><span class="ic ar">${I.arrowR}</span><span class="to">${to}</span><span class="nm">${p.name}<small>${p.unit} · 承認待ちに反映済み</small></span></div></div>`);
    }
    case 'stock':{
      const {p,now}=data,pct=Math.min(100,Math.round(now/p.cap*100));
      return h(`<div class="rcard is-stock"><div class="rh"><span>在庫</span><span>14:20 時点</span></div>
        <div class="rb"><div class="big">${now}<small>${p.unit}</small></div>
        <div class="kv"><span>${p.name}</span><span class="mute">${p.shelf.zone} · ${p.shelf.code}（${p.shelf.label}）</span>
        <span class="mute">棚の上限 ${p.cap}${p.unit} に対して ${pct}%</span></div></div></div>`);
    }
    case 'locate':{
      const {p}=data;
      return h(`<div class="rcard is-stock"><div class="rh"><span>棚の場所</span><span>店内の模型に表示中</span></div>
        <div class="rb"><div class="big" style="font-size:2.8rem">${p.shelf.code}</div><div class="kv"><span>${p.shelf.zone}</span><span class="mute">${p.shelf.label}</span></div></div></div>`);
    }
    case 'delivery':{
      return h(`<div class="rcard"><div class="rh"><span>本日の入荷予定</span><span>${data.rows.length}便</span></div><div class="rb"><table>${data.rows.map(r=>`<tr class="${r.status==='next'?'is-next':r.status==='done'?'is-done':''}"><td>${r.time}</td><td><b>${r.name}</b><br><span class="mute">${r.items}</span></td><td style="text-align:right;white-space:nowrap">${r.status==='done'?'入荷済み':r.status==='next'?'次の便':''}</td></tr>`).join('')}</table></div></div>`);
    }
    case 'expiry':{
      return h(`<div class="rcard"><div class="rh"><span>期限が近い商品</span><span>今夜 24:00</span></div><div class="rb"><table>${data.rows.map(r=>`<tr><td>${String(r.p.shelf.code)}</td><td><b>${r.p.name}</b></td><td style="text-align:right;white-space:nowrap">${r.now}${r.p.unit}</td></tr>`).join('')}</table></div></div>`);
    }
    case 'weather':{
      return h(`<div class="rcard"><div class="rh"><span>今日の降水確率</span><span>3時間ごと</span></div><div class="rb"><div class="bars" style="margin-bottom:1.5rem">${data.hourly.map(d=>`<i data-l="${d.h}時" style="height:${Math.round(d.p*100)}%"><b>${Math.round(d.p*100)}</b></i>`).join('')}</div></div></div>`);
    }
  }
  return null;
}
