(function(global){
  'use strict';
  const simple=n=>Array.from({length:n},(_,i)=>{const a=Array(n).fill(0);a[i]=1;return a});
  const coupled=(n,links)=>{const e=simple(n);links.forEach(([s,t,v])=>e[s][t]=v);return e};
  const raw=[
    [3,3,[0,1,0],simple(3),'まずはリングを揃えよう'],[3,3,[0,2,1],simple(3),'左右タップでも回せます'],[4,3,[0,1,3],simple(3),'スワイプにも挑戦'],
    [4,4,[0,1,2,0],simple(4),'4本のリング'],[4,4,[3,1,2,0],simple(4),'UNDOも活用しよう'],[5,4,[0,4,2,1],simple(4),'5色のオービット'],
    [4,3,[1,3,0],coupled(3,[[0,1,1]]),'↻ 同方向に連動'],[4,3,[0,2,1],coupled(3,[[1,2,1]]),'中央から外へ連動'],[4,4,[3,0,2,1],coupled(4,[[0,1,1],[2,3,1]]),'2組のリング'],[5,4,[0,3,4,1],coupled(4,[[1,2,1]]),'連動を見極めよう'],
    [4,3,[0,1,2],coupled(3,[[0,1,-1]]),'↺ 逆方向に連動'],[4,3,[3,1,0],coupled(3,[[1,2,-1]]),'逆回転を利用'],[5,4,[1,4,2,0],coupled(4,[[0,1,-1],[2,3,-1]]),'逆回転が2組'],[5,4,[0,3,1,4],coupled(4,[[1,0,-1],[1,2,-1]]),'1本から両隣へ'],[5,5,[4,1,3,0,2],coupled(5,[[1,2,-1],[3,4,-1]]),'5本を整列'],
    [4,4,[0,3,1,2],coupled(4,[[0,1,1],[0,2,-1]]),'2本が同時に動く'],[4,4,[2,0,3,1],coupled(4,[[1,0,-1],[1,2,1],[3,2,-1]]),'連動の連鎖を読む'],[5,4,[4,1,3,0],coupled(4,[[0,1,1],[0,2,-1],[2,3,1]]),'3リング連動'],[5,5,[0,3,1,4,2],coupled(5,[[1,0,-1],[1,2,1],[3,2,-1],[3,4,1]]),'2つの連動軸'],[5,5,[4,1,3,0,2],coupled(5,[[0,1,1],[0,2,-1],[2,3,1],[2,4,-1],[4,0,1]]),'最後のオービット']
  ];
  const levels=raw.map((x,i)=>({id:i+1,slots:x[0],rings:x[1],initial:x[2],effects:x[3],hint:x[4]}));
  global.COLOR_ORBIT_LEVELS=levels;
  const gateRaw=[
    [['Y','B','R','B'],['R','G','Y','G'],['R','B','Y','G']],
    [['Y','G','R','R'],['G','B','B','Y'],['R','B','Y','G']],
    [['R','R','Y','R'],['G','B','B','Y'],['Y','G','G','B']],
    [['G','B','B','G'],['B','R','Y','R'],['R','Y','Y','G']],
    [['R','B','Y','Y'],['G','R','R','Y'],['G','G','B','B']]
  ];
  global.COLOR_ORBIT_GATE_LEVELS=gateRaw.map((rings,i)=>({id:i+1,mode:'gate',rings:rings.map(r=>r.slice()),slots:4,hint:i?'色を3時へ運んでからGATEで交換':'3時のGATEをタップすると、隣のリングの色を交換できます'}));
  if(typeof module!=='undefined'){module.exports=levels;module.exports.gate=global.COLOR_ORBIT_GATE_LEVELS}
})(typeof window!=='undefined'?window:globalThis);
