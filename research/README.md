# ORBIT LOCK long-run playtest

This directory is independent of the shipped game UI. The harness calls the production
`solver.js` state transition, generates seeded candidates with 3–5 colors, rejects solved,
unsolvable, and trivial (<2 optimal moves) boards, then distributes episodes evenly among
**Random, Greedy, Human-like, and 2-ply** players.

```sh
node research/orbit-lock-playtest.js --episodes 1000000 --seed 281083886 \
  --candidates 600 --checkpoint-every 100000 --output research/output/run-1m.json
```

Every checkpoint is atomically replaced and contains the candidate boards, PRNG state,
per-agent/per-candidate counters, wall time, and completed episode count. Resume without
replaying completed work (the target is the new *total*, not an increment):

```sh
node research/orbit-lock-playtest.js --episodes 2000000 \
  --resume research/output/run-1m.json --output research/output/run-2m.json
```

Continue with 5,000,000 and 10,000,000 in the same way if runtime permits. `maxMoves`
defaults to 40. `randomEasy` identifies boards with at least 20 Random observations and a
90% solve rate within the move cap. `thinkingDoesNotHelp` requires
both less than five percentage points of 2-ply solve-rate improvement and less than one
move of solved-run improvement. `largestAgentSeparation` is the preferred shortlist.

Agent definitions are intentionally inspectable: Greedy maximizes current locks/alignment,
Human-like adds mild exploration and avoids immediately undoing its prior move, and 2-ply
maximizes the best heuristic position after one additional move. These are behavioral
baselines, not claims about real people.
