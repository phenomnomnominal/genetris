import { Cell } from '../grid';

import { Tetrimino } from './tetrimino';

const e = Cell.empty;
const j = Cell.j;

const J_SHAPE = [
  [
    [e, e, e],
    [j, j, j],
    [e, e, j]
  ],
  [
    [e, j, e],
    [e, j, e],
    [j, j, e]
  ],
  [
    [j, e, e],
    [j, j, j],
    [e, e, e]
  ],
  [
    [e, j, j],
    [e, j, e],
    [e, j, e]
  ]
] as const;

export class J extends Tetrimino {
  constructor() {
    super(J_SHAPE, j);
  }
}
