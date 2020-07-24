import { Tuple, length } from '../utils';
import { Cell } from './cell';
import { Row } from './row';

const LINE_LENGTH = 13;
const LINE = length(LINE_LENGTH);
type LineLength = typeof LINE_LENGTH;
export type Line = Tuple<Cell, LineLength>;

export function line(row: Row): Line {
  return [Cell.side, ...row, Cell.side, Cell.side] as Line;
}

export function lineTop(): Line {
  return Array.from(LINE, () => Cell.top) as Line;
}

export function lineBottom(): Line {
  return Array.from(LINE, () => Cell.bottom) as Line;
}
