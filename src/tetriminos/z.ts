import { Cell } from '../grid';

import { Tetrimino } from './tetrimino';

const e = Cell.empty;
const z = Cell.z;

const Z_SHAPE = [
  [
    [z, z, e],
    [e, z, z],
    [e, e, e]
  ],
  [
    [e, e, z],
    [e, z, z],
    [e, z, e]
  ]
] as const;

export class Z extends Tetrimino {
  constructor() {
    super(Z_SHAPE, z);
  }
}
