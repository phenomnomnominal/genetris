import { Cell } from '../grid';

import { Tetrimino } from './tetrimino';

const o = Cell.o;

const O_SHAPE = [
  [
    [o, o],
    [o, o]
  ]
] as const;

export class O extends Tetrimino {
  constructor() {
    super(O_SHAPE, o);
  }
}
