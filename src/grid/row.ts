import { Tuple, length } from '../utils';
import { Cell } from './cell';

const ROW_LENGTH = 10;
const ROW = length(ROW_LENGTH);
type RowLength = typeof ROW_LENGTH;
export type Row = Tuple<Cell, RowLength>;

export function row(): Row {
  return Array.from(ROW, () => Cell.empty) as Row;
}
