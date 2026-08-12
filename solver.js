(function(global){'use strict';
  const mod=(n,m)=>((n%m)+m)%m;
  const solved=s=>s.every(v=>v===s[0]);
  function apply(state,effects,source,direction,slots){return state.map((v,i)=>mod(v+effects[source][i]*direction,slots))}
  function solve(level,start=level.initial){
    const first=start.slice(),queue=[first],seen=new Set([first.join(',')]),parent=new Map();let head=0,goal=null;
    while(head<queue.length){const state=queue[head++];if(solved(state)){goal=state;break}for(let ring=0;ring<level.rings;ring++)for(const direction of [1,-1]){const next=apply(state,level.effects,ring,direction,level.slots),key=next.join(',');if(!seen.has(key)){seen.add(key);parent.set(key,{prev:state.join(','),move:{ring,direction}});queue.push(next)}}}
    if(!goal)return null;const path=[];let key=goal.join(','),origin=first.join(',');while(key!==origin){const p=parent.get(key);path.push(p.move);key=p.prev}path.reverse();return{moves:path.length,path,final:goal,visited:seen.size};
  }
  global.OrbitSolver={mod,solved,apply,solve};if(typeof module!=='undefined')module.exports=global.OrbitSolver;
})(typeof window!=='undefined'?window:globalThis);
