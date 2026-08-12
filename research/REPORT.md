# ORBIT LOCK virtual-player report

## Run

- Seed: `281083886`
- Candidates: 600 (83 three-color, 252 four-color, 265 five-color)
- Episodes: **5,000,000**, evenly split across four agents
- Move cap: 40
- Measured cumulative runtime: **324.5 seconds**
- Full resumable checkpoint/result: `output/run-5m.json`

The initial one-million run completed in 64.1 seconds, so it was resumed to two million
and then five million. The five-million run was retained rather than spending another
roughly five minutes extending to ten million. It can be extended with the README command.

## Aggregate result

| Agent | Episodes | Solve rate | Mean moves among solves |
| --- | ---: | ---: | ---: |
| Random | 1,250,000 | 98.0352% | 12.1930 |
| Greedy | 1,250,000 | 99.2597% | 3.0568 |
| Human-like | 1,250,000 | 100.0000% | 3.0916 |
| 2-ply | 1,250,000 | 100.0000% | 2.9868 |

There is a strong Random-versus-deliberative difference in move efficiency (about nine
moves), and a smaller but repeatable ordering among the deliberate agents. Human-like's
exploration makes it slightly longer than Greedy, while 2-ply is best. Solve rate alone is
too saturated for most of this generated pool and should not be the sole selection metric.

## Candidate triage

- **586/600 Random-easy anti-patterns** reached at least 90% Random solves within 40 moves.
  They should not be promoted on solve rate alone.
- **0/600 thinking-does-not-help anti-patterns** met both tests (under five percentage
  points solve-rate gain *and* under one solved-move gain for 2-ply versus Random).
- The result file retains the top 25 separation candidates. The first five are C0217,
  C0061, C0082, C0507, and C0309; all are five-color boards. C0217 has the largest
  solve-rate gap (27.14 points), while the other leaders show roughly 15–16 saved moves.

Interpretation: the generator produces many boards that Random eventually solves under a
generous cap, but thinking still improves efficiency on every sampled board. Future level
selection should prefer the saved-move/separation shortlist, five-color coverage, and a
tighter par rather than equating eventual completion with puzzle quality.
