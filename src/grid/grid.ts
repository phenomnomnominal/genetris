import { Tuple, length } from '../utils';
import { Move } from '../tetriminos/move';

import { Action } from './actions';
import { Line, line, lineBottom, lineTop } from './line';
import { Row, row } from './row';
import { Cell } from './cell';

const ROWS_LENGTH = 20;
const ROWS = length(ROWS_LENGTH);
type RowsLength = typeof ROWS_LENGTH;
export type Rows = Tuple<Row, RowsLength>;

const LINES_LENGTH = 23;
type LinesLength = typeof LINES_LENGTH;
export type Lines = Tuple<Line, LinesLength>;

export type ClearedLine = {
  rowIndex: number;
  row: Row;
};

export type GridSerialised = {
  rows: Rows;
};

export class Grid {
  public rows: Rows;
  public lines: Lines;

  constructor() {
    this.rows = Array.from(ROWS, () => row()) as Rows;
    const lines = this.rows.map(row => line(row));
    this.lines = [lineTop(), ...lines, lineBottom(), lineBottom()] as Lines;
  }

  public add(move: Move): void {
    this._update(move, Action.ADD);
  }

  public sub(move: Move): void {
    this._update(move, Action.SUB);
  }

  public clearLines(): Array<ClearedLine> {
    const clearedLines: Array<ClearedLine> = [];
    this.rows.forEach((_, rowIndex) => {
      if (this.rows[rowIndex].every(cell => cell !== Cell.empty)) {
        const cleared = this.rows[rowIndex];
        clearedLines.push({ rowIndex, row: cleared });
      }
    });
    clearedLines.reverse().forEach(cleared => {
      this.rows.splice(cleared.rowIndex, 1);
      this.lines.splice(cleared.rowIndex + 1, 1);
    });
    clearedLines.forEach(() => {
      const newRow = row();
      const newLine = line(newRow);
      this.rows.splice(0, 0, newRow);
      this.lines.splice(1, 0, newLine);
    });
    return clearedLines;
  }

  public replaceLines(clearedLines: Array<ClearedLine>): void {
    clearedLines.forEach(clearedLine => {
      this.rows.splice(0, 1);
      this.lines.splice(1, 1);
      this.rows.splice(clearedLine.rowIndex, 0, clearedLine.row);
      this.lines.splice(clearedLine.rowIndex + 1, 0, line(clearedLine.row));
    });
  }

  public serialise(): GridSerialised {
    return {
      rows: this.rows
    };
  }

  private _update(move: Move, action: Action): void {
    const { shape, lineStart, cellStart } = move;

    shape.forEach((line, lineIndex) => {
      line.forEach((cell, cellIndex) => {
        const value = cell * action;
        if (value !== Cell.empty) {
          this.lines[lineStart + lineIndex][cellStart + cellIndex] += value;
          this.rows[lineStart + lineIndex - 1][
            cellStart + cellIndex - 1
          ] += value;
        }
      });
    });
  }
}
