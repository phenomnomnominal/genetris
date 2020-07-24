import { Cell } from '../grid';

export type ShapeLine = ReadonlyArray<Cell>;
export type Shape = ReadonlyArray<ShapeLine>;
export type Rotations = ReadonlyArray<Shape>;
