import { Cell } from '../grid';
import { Shape } from './shape';

export type Move = {
  colour: Cell;
  shape: Shape;
  lineStart: number;
  lineLength: number;
  cellStart: number;
  cellLength: number;
};
