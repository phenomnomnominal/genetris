import { Cell } from '../grid';

import { Tetrimino } from './tetrimino';

const e = Cell.empty;
const t = Cell.t;

const T_SHAPE = [
  [
    [e, e, e],
    [t, t, t],
    [e, t, e]
  ],
  [
    [e, t, e],
    [t, t, e],
    [e, t, e]
  ],
  [
    [e, t, e],
    [t, t, t],
    [e, e, e]
  ],
  [
    [e, t, e],
    [e, t, t],
    [e, t, e]
  ]
] as const;

export class T extends Tetrimino {
  constructor() {
    super(T_SHAPE, t);
  }
}
