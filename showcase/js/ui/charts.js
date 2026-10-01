/* Small SVG charts in the deck's ink-on-paper voice. */
import {rainDays,weather} from '../mock/data.js';

const NAVY='#0E1D40',INK='#000',EDGE='#CFCAB2',MUTE='#4F4E4A';

/* 14 days of sales: rain days solid navy, dry days outlined */
export function salesChart(p,{w=560,h=150}={}){
  const hist=p.history,max=Math.max(...hist)*1.18||1;
  const bw=(w-20)/14-8,x0=10,base=h-26;
  const bars=hist.map((v,i)=>{
    const bh=Math.max(2,(v/max)*(base-12)),x=x0+i*(bw+8),y=base-bh,rain=rainDays[i];
    return `<g class="bar" data-i="${i}"><rect x="${x}" y="${y}" width="${bw}" height="${bh}" fill="${rain?NAVY:'#ECE9D6'}" stroke="${rain?NAVY:'#9a9680'}" stroke-width="${rain?0:1.6}" ${rain?'':'stroke-dasharray="4 3"'}/>
      ${rain?`<text x="${x+bw/2}" y="${base+16}" text-anchor="middle" font-size="12" font-weight="700" fill="${NAVY}">雨</text>`:''}</g>`;
  }).join('');
  const r=(p.rainAvg).toFixed(1),d=(p.dryAvg).toFixed(1);
  return `<svg viewBox="0 0 ${w} ${h}" class="chart sales" role="img" aria-label="${p.name}の過去14日の販売。雨の日の平均${r}、晴れの日の平均${d}">
    <line x1="0" y1="${base}" x2="${w}" y2="${base}" stroke="${INK}" stroke-width="2"/>${bars}
    <g font-size="13" font-weight="700" fill="${INK}"><rect x="${w-196}" y="2" width="12" height="12" fill="${NAVY}"/><text x="${w-178}" y="13">雨の日 平均 ${r}</text></g>
    <g font-size="13" font-weight="700" fill="${INK}"><rect x="${w-196}" y="22" width="12" height="12" fill="#ECE9D6" stroke="#9a9680" stroke-width="1.6" stroke-dasharray="3 2"/><text x="${w-178}" y="33">それ以外 平均 ${d}</text></g>
  </svg>`;
}

/* stock + order against the shelf limit */
export function stockBar(p,qty,{w=560,h=78}={}){
  const cap=p.cap,sellable=p.expiresTonight?0:p.stock,dead=p.expiresTonight?p.stock:0;
  const sx=v=>Math.min(1,v/cap)*w;
  const stockW=sx(sellable),orderW=sx(qty),deadW=sx(dead);
  return `<svg viewBox="0 0 ${w} ${h}" class="chart stock" role="img" aria-label="在庫${p.stock}、発注${qty}、上限${cap}">
    <defs><pattern id="hatch" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="7" stroke="${INK}" stroke-width="1.6"/></pattern></defs>
    <rect x="0" y="14" width="${w}" height="26" fill="#F4F2E4" stroke="${NAVY}" stroke-width="2"/>
    ${dead?`<rect x="0" y="14" width="${deadW}" height="26" fill="url(#hatch)" opacity=".55"/>`:''}
    ${sellable?`<rect x="0" y="14" width="${stockW}" height="26" fill="${NAVY}"/>`:''}
    <rect class="order" x="${(sellable?stockW:0)}" y="14" width="${orderW}" height="26" fill="${NAVY}" fill-opacity=".22" stroke="${NAVY}" stroke-width="2" stroke-dasharray="6 4"/>
    <line x1="${w-1}" y1="6" x2="${w-1}" y2="48" stroke="${INK}" stroke-width="3"/>
    <g font-size="13" font-weight="700" fill="${INK}">
      <text x="2" y="62">${dead?`在庫 ${p.stock}${p.unit}（今夜で期限切れ）`:`在庫 ${p.stock}${p.unit}`}</text>
      <text x="${w}" y="10" text-anchor="end">上限 ${cap}${p.unit}</text>
      <text x="${Math.min(w-6,(sellable?stockW:0)+orderW)}" y="62" text-anchor="end" fill="${NAVY}">発注 +${qty}${p.unit}</text>
    </g></svg>`;
}

/* 3-hour precipitation bars (tomorrow) */
export function popBars(hourly=weather.hourly,{w=300,h=70}={}){
  const bw=w/hourly.length-8;
  return `<svg viewBox="0 0 ${w} ${h}" class="chart pop" role="img" aria-label="明日の降水確率">${hourly.map((d,i)=>{
    const bh=d.p*(h-22),x=i*(bw+8);
    return `<rect x="${x}" y="${h-16-bh}" width="${bw}" height="${bh}" fill="${NAVY}"/><text x="${x+bw/2}" y="${h-3}" font-size="12" text-anchor="middle" fill="${MUTE}" font-weight="600">${d.h}</text>`;
  }).join('')}<line x1="0" y1="${h-16}" x2="${w}" y2="${h-16}" stroke="${INK}" stroke-width="1.6"/></svg>`;
}
