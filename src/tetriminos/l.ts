import { Cell } from '../grid';

import { Tetrimino } from './tetrimino';

const e = Cell.empty;
const l = Cell.l;

const L_SHAPE = [
  [
    [e, e, e],
    [l, l, l],
    [l, e, e]
  ],
  [
    [l, l, e],
    [e, l, e],
    [e, l, e]
  ],
  [
    [e, e, l],
    [l, l, l],
    [e, e, e]
  ],
  [
    [e, l, e],
    [e, l, e],
    [e, l, l]
  ]
] as const;

export class L extends Tetrimino {
  constructor() {
    super(L_SHAPE, l);
  }
}
