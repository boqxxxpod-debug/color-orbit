(function(global){'use strict';
  const KEY='color-orbit-progress-v1',defaults={unlocked:1,stars:{},bestMoves:{},gate:{unlocked:1,stars:{},bestMoves:{},tutorialCompleted:false},lock:{unlocked:1,stars:{},bestMoves:{}},settings:{sound:true,colorHelp:false}};
  const clone=o=>JSON.parse(JSON.stringify(o));
  function load(){try{const p=JSON.parse(global.localStorage.getItem(KEY));return p?{...clone(defaults),...p,gate:{...clone(defaults.gate),...p.gate},lock:{...clone(defaults.lock),...p.lock},settings:{...defaults.settings,...p.settings}}:clone(defaults)}catch(_){return clone(defaults)}}
  function save(data){try{global.localStorage.setItem(KEY,JSON.stringify(data));return true}catch(_){return false}}
  function recordClear(data,level,moves,stars){data.unlocked=Math.max(data.unlocked,Math.min(20,level+1));data.stars[level]=Math.max(data.stars[level]||0,stars);data.bestMoves[level]=Math.min(data.bestMoves[level]??Infinity,moves);save(data)}
  function recordGateClear(data,level,moves,stars){data.gate.unlocked=Math.max(data.gate.unlocked,Math.min(5,level+1));data.gate.stars[level]=Math.max(data.gate.stars[level]||0,stars);data.gate.bestMoves[level]=Math.min(data.gate.bestMoves[level]??Infinity,moves);save(data)}
  function recordLockClear(data,level,moves,stars){data.lock.unlocked=Math.max(data.lock.unlocked,Math.min(5,level+1));data.lock.stars[level]=Math.max(data.lock.stars[level]||0,stars);data.lock.bestMoves[level]=Math.min(data.lock.bestMoves[level]??Infinity,moves);save(data)}
  global.OrbitStorage={load,save,recordClear,recordGateClear,recordLockClear,KEY};if(typeof module!=='undefined')module.exports=global.OrbitStorage;
})(typeof window!=='undefined'?window:globalThis);
