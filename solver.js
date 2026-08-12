(function(global){'use strict';
  const mod=(n,m)=>((n%m)+m)%m;
  const solved=s=>s.every(v=>v===s[0]);
  function apply(state,effects,source,direction,slots){return state.map((v,i)=>mod(v+effects[source][i]*direction,slots))}
  const GATE_SLOT=1;
  const gateSolved=rings=>rings.every(r=>r.every((color,i)=>color===rings[0][i]));
  const cloneRings=rings=>rings.map(r=>r.slice());
  function applyGate(rings,move){
    const next=cloneRings(rings);
    if(move.type==='rotate'){
      const ring=next[move.ring];
      next[move.ring]=move.direction===1?[ring[ring.length-1],...ring.slice(0,-1)]:[...ring.slice(1),ring[0]];
    }else if(move.type==='swap'){
      const a=move.gate,b=a+1;
      [next[a][GATE_SLOT],next[b][GATE_SLOT]]=[next[b][GATE_SLOT],next[a][GATE_SLOT]];
    }
    return next;
  }
  const encodeGate=rings=>rings.map(r=>r.join('')).join('|');
  function gateMoves(){const moves=[];for(let ring=0;ring<3;ring++)for(const direction of [1,-1])moves.push({type:'rotate',ring,direction});return moves.concat([{type:'swap',gate:0},{type:'swap',gate:1}])}
  function solveGate(level,start=level.rings,{allowSwaps=true}={}){
    const first=cloneRings(start),origin=encodeGate(first),queue=[first],seen=new Set([origin]),parent=new Map(),moves=gateMoves().filter(m=>allowSwaps||m.type!=='swap');let head=0,goal=null;
    while(head<queue.length){const state=queue[head++];if(gateSolved(state)){goal=state;break}for(const move of moves){const next=applyGate(state,move),key=encodeGate(next);if(!seen.has(key)){seen.add(key);parent.set(key,{prev:encodeGate(state),move});queue.push(next)}}}
    if(!goal)return null;const path=[];let key=encodeGate(goal);while(key!==origin){const p=parent.get(key);path.push(p.move);key=p.prev}path.reverse();return{moves:path.length,path,final:goal,visited:seen.size};
  }
  const cloneLock=state=>({rings:cloneRings(state.rings),lockedSlots:state.lockedSlots.slice()});
  function autoLock(state){
    const next=cloneLock(state),newLocks=[];
    for(let slot=0;slot<next.lockedSlots.length;slot++){
      if(!next.lockedSlots[slot]&&next.rings.every(r=>r[slot]===next.rings[0][slot])){next.lockedSlots[slot]=true;newLocks.push(next.rings[0][slot])}
    }
    return{state:next,newLocks};
  }
  function initialLock(rings){return autoLock({rings:cloneRings(rings),lockedSlots:Array(rings[0].length).fill(false)}).state}
  function applyLock(state,move){
    const next=cloneLock(state),open=next.lockedSlots.map((locked,i)=>locked?-1:i).filter(i=>i>=0);
    if(open.length>1){
      const values=open.map(i=>next.rings[move.ring][i]);
      open.forEach((slot,i)=>{const from=mod(i-move.direction,open.length);next.rings[move.ring][slot]=values[from]});
    }
    return autoLock(next);
  }
  const lockSolved=state=>state.lockedSlots.every(Boolean);
  const encodeLock=state=>`${state.rings.map(r=>r.join('')).join('|')}/${state.lockedSlots.map(Number).join('')}`;
  function solveLock(level,start){
    const first=start?autoLock(start).state:initialLock(level.rings),origin=encodeLock(first),queue=[first],seen=new Set([origin]),parent=new Map();let head=0,goal=null;
    while(head<queue.length){const state=queue[head++];if(lockSolved(state)){goal=state;break}for(let ring=0;ring<state.rings.length;ring++)for(const direction of [1,-1]){const result=applyLock(state,{ring,direction}),next=result.state,key=encodeLock(next);if(!seen.has(key)){seen.add(key);parent.set(key,{prev:encodeLock(state),move:{ring,direction},locks:result.newLocks});queue.push(next)}}}
    if(!goal)return null;const path=[],lockOrder=[];let key=encodeLock(goal);while(key!==origin){const p=parent.get(key);path.push(p.move);lockOrder.push(p.locks);key=p.prev}path.reverse();lockOrder.reverse();return{solved:true,moves:path.length,path,lockOrder,final:goal,visited:seen.size};
  }
  function auditLock(level){
    const first=initialLock(level.rings),queue=[first],seen=new Set([encodeLock(first)]);let head=0,deadEnds=0;
    while(head<queue.length){const state=queue[head++];if(!solveLock(level,state))deadEnds++;for(let ring=0;ring<state.rings.length;ring++)for(const direction of [1,-1]){const next=applyLock(state,{ring,direction}).state,key=encodeLock(next);if(!seen.has(key)){seen.add(key);queue.push(next)}}}
    return{reachable:seen.size,deadEnds};
  }
  function solve(level,start=level.initial){
    const first=start.slice(),queue=[first],seen=new Set([first.join(',')]),parent=new Map();let head=0,goal=null;
    while(head<queue.length){const state=queue[head++];if(solved(state)){goal=state;break}for(let ring=0;ring<level.rings;ring++)for(const direction of [1,-1]){const next=apply(state,level.effects,ring,direction,level.slots),key=next.join(',');if(!seen.has(key)){seen.add(key);parent.set(key,{prev:state.join(','),move:{ring,direction}});queue.push(next)}}}
    if(!goal)return null;const path=[];let key=goal.join(','),origin=first.join(',');while(key!==origin){const p=parent.get(key);path.push(p.move);key=p.prev}path.reverse();return{moves:path.length,path,final:goal,visited:seen.size};
  }
  global.OrbitSolver={mod,solved,apply,solve,GATE_SLOT,gateSolved,applyGate,encodeGate,solveGate,autoLock,initialLock,applyLock,lockSolved,encodeLock,solveLock,auditLock};if(typeof module!=='undefined')module.exports=global.OrbitSolver;
})(typeof window!=='undefined'?window:globalThis);
