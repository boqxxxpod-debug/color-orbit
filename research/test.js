'use strict';
const assert=require('assert'),h=require('./orbit-lock-playtest.js');
const a=h.rng(123),b=h.rng(123);assert.deepEqual(Array.from({length:20},()=>a.next()),Array.from({length:20},()=>b.next()));
const pool=h.candidates(30,h.rng(99));assert.equal(pool.length,30);assert(new Set(pool.map(x=>x.id)).size===30);assert(pool.some(x=>x.colors===3));assert(pool.some(x=>x.colors>=4));
for(const name of ['random','greedy','human-like','2ply']){const result=h.episode(pool[0],name,h.rng(7),20);assert(result===null||Number.isInteger(result))}
console.log('research harness deterministic generation and all four agents validated');
