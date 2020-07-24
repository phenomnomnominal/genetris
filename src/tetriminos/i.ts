import { Cell } from '../grid/cell';

import { Tetrimino } from './tetrimino';

const e = Cell.empty;
const i = Cell.i;

const I_SHAPE = [
  [
    [e, e, e, e],
    [i, i, i, i],
    [e, e, e, e],
    [e, e, e, e]
  ],
  [
    [e, i, e, e],
    [e, i, e, e],
    [e, i, e, e],
    [e, i, e, e]
  ]
] as const;

export class I extends Tetrimino {
  constructor() {
    super(I_SHAPE, i);
  }
}
