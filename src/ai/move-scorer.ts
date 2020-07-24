import { Grid, Cell, CELL_COLOURS, Lines, Rows } from '../grid';
import { Move } from '../tetriminos/move';
import { Tuple } from '../utils';

type MoveScores = {
  blockers: number;
  height: number;
  holes: number;
  lines: number;
  blocks: number;
  floors: number;
  walls: number;
};

const enum MoveWeight {
  blockers = 0,
  height = 1,
  hole = 2,
  block = 3,
  floor = 4,
  wall = 5,
  line1 = 6,
  line2 = 7,
  line3 = 8,
  line4 = 9,
}

export type MoveScorerWeights = Tuple<number, 6>;
export type MoveScorerLineWiehgts = Tuple<number, 5>;
export type MoveScorerWeightsSerialised = Tuple<number, 10>;

export class MoveScorer {
  private _weights: MoveScorerWeights;
  private _lineWeights: MoveScorerLineWiehgts;

  constructor(weights: MoveScorerWeightsSerialised) {
    const [blocker, height, hole, block, floor, wall] = weights;
    this._weights = [blocker, height, hole, block, floor, wall];
    const [, , , , , , line1, line2, line3, line4] = weights;
    this._lineWeights = [0, line1, line2, line3, line4];
  }

  public score(grid: Grid, move: Move, cleared: number): MoveScores {
    const { lines, rows } = grid;
    return {
      blockers: this._blockers(lines, move),
      blocks: this._blocks(lines, move),
      height: this._height(rows, move),
      holes: this._holes(lines, move),
      lines: this._lines(cleared),
      floors: this._floors(lines, move),
      walls: this._walls(lines, move),
    };
  }

  public serialise(): MoveScorerWeightsSerialised {
    return [
      ...this._weights,
      ...this._lineWeights.slice(1),
    ] as MoveScorerWeightsSerialised;
  }

  private _blockers(lines: Lines, move: Move): number {
    let blockers = 0;
    const { shape, lineStart, cellStart } = move;
    shape.forEach((shapeRow, rowIndex) => {
      shapeRow.forEach((shapeCell, cellIndex) => {
        if (shapeCell === Cell.empty) {
          return;
        }
        const lineIndex = lineStart + rowIndex;
        const columnIndex = cellStart + cellIndex;
        if (lines[lineIndex + 1][columnIndex] === Cell.empty) {
          blockers += 1;
        }
      });
    });
    return this._weights[MoveWeight.blockers] * blockers;
  }

  private _blocks(lines: Lines, move: Move): number {
    let blocks = 0;
    const { shape, lineStart, cellStart } = move;
    shape.forEach((shapeRow, rowIndex) => {
      shapeRow.forEach((shapeCell, cellIndex) => {
        if (shapeCell === Cell.empty) {
          return;
        }
        const lineIndex = lineStart + rowIndex;
        const columnIndex = cellStart + cellIndex;
        const prevColumn = columnIndex - 1;
        const nextColumn = columnIndex + 1;
        const prevCell = cellIndex - 1;
        const nextCell = cellIndex + 1;

        const line = lines[lineIndex];

        if (!shapeRow[prevCell] && CELL_COLOURS.includes(line[prevColumn])) {
          blocks += 1;
        }
        if (!shapeRow[nextCell] && CELL_COLOURS.includes(line[nextColumn])) {
          blocks += 1;
        }
      });
    });
    return this._weights[MoveWeight.block] * blocks;
  }

  private _height(rows: Rows, move: Move): number {
    const { shape, lineStart } = move;
    let height = 0;
    shape.forEach((row, rowIndex) => {
      row.forEach((cell) => {
        if (cell === Cell.empty) {
          return;
        }
        const realRow = lineStart + rowIndex - 1;
        height += rows.length - realRow;
      });
    });

    return this._weights[MoveWeight.height] * height;
  }

  private _holes(lines: Lines, move: Move): number {
    const { shape, lineStart, cellStart } = move;
    let hole = 0;
    shape.forEach((shapeRow, rowIndex) => {
      shapeRow.forEach((shapeCell, cellIndex) => {
        if (shapeCell === Cell.empty) {
          return;
        }
        const lineIndex = lineStart + rowIndex;
        const columnIndex = cellStart + cellIndex;
        const down = lines.slice(lineIndex).map((l) => l[columnIndex]);
        hole += down.filter((cell) => cell === Cell.empty).length;
      });
    });

    return this._weights[MoveWeight.hole] * hole;
  }

  private _lines(lines: number): number {
    return this._lineWeights[lines];
  }

  private _floors(lines: Lines, move: Move): number {
    const { shape, lineStart, cellStart } = move;
    let floor = 0;
    shape.forEach((shapeRow, rowIndex) => {
      shapeRow.forEach((shapeCell, cellIndex) => {
        if (shapeCell === Cell.empty) {
          return;
        }
        const lineIndex = lineStart + rowIndex;
        const columnIndex = cellStart + cellIndex;

        const nextLine = lines[lineIndex + 1];

        if (nextLine[columnIndex] === Cell.bottom) {
          floor += 1;
        }
      });
    });
    return this._weights[MoveWeight.floor] * floor;
  }

  private _walls(lines: Lines, move: Move): number {
    let wall = 0;
    const { shape, lineStart, cellStart } = move;
    shape.forEach((shapeRow, rowIndex) => {
      shapeRow.forEach((shapeCell, cellIndex) => {
        if (shapeCell === Cell.empty) {
          return;
        }
        const lineIndex = lineStart + rowIndex;
        const columnIndex = cellStart + cellIndex;
        const prevColumn = columnIndex - 1;
        const nextColumn = columnIndex + 1;

        const line = lines[lineIndex];
        if (line[prevColumn] === Cell.side || line[nextColumn] === Cell.side) {
          wall += 1;
        }
      });
    });
    return this._weights[MoveWeight.wall] * wall;
  }
}
