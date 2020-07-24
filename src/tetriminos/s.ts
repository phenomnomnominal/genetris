import { Cell } from '../grid';

import { Tetrimino } from './tetrimino';

const e = Cell.empty;
const s = Cell.s;

const S_SHAPE = [
  [
    [e, s, s],
    [s, s, e],
    [e, e, e]
  ],
  [
    [e, s, e],
    [e, s, s],
    [e, e, s]
  ]
] as const;

export class S extends Tetrimino {
  constructor() {
    super(S_SHAPE, s);
  }
}
