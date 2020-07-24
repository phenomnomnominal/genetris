import { Grid, Cell } from '../grid';

import { Move } from './move';
import { Shape, Rotations } from './shape';

export type Domain = Array<Move>;

type Shapes = Array<{
  shape: Shape;
  rowLength: number;
  cellLength: number;
}>;

export abstract class Tetrimino {
  public domain: Domain;
  public shapes: Shapes;

  constructor(public rotations: Rotations, colour: Cell) {
    const e = Cell.empty;
    this.shapes = this.rotations.map(rotation => {
      // Find the rows with non-empty cells:
      const occupiedRows = rotation.filter(row => row.some(cell => cell !== e));
      const [firstOccupiedRow] = occupiedRows;
      // Fix the indices of the columns with non-empty cells:
      const occupiedCells = firstOccupiedRow
        .map((_, cellIndex) => {
          return rotation.some(row => row[cellIndex] !== e) ? cellIndex : null;
        })
        .filter(cellIndex => cellIndex != null) as Array<number>;

      // Return the minimal shape of the rotation, and the mapping indices:
      return {
        shape: occupiedRows.map(row =>
          row.filter((_, cellIndex) => occupiedCells.includes(cellIndex))
        ),
        rowLength: occupiedRows.length,
        cellLength: occupiedCells.length
      };
    });

    this.domain = this._createDomain(colour);
  }

  private _createDomain(colour: Cell): Domain {
    const domain: Domain = [];
    const grid = new Grid();
    this.rotations.map((_, rotation) => {
      const { shape, rowLength, cellLength } = this.shapes[rotation];
      const [row] = grid.rows;
      row.forEach((_, columnIndex) => {
        const cellStart = columnIndex + 1;
        grid.rows.forEach((_, rowIndex) => {
          const lineStart = rowIndex + 1;
          const move = {
            colour,
            shape,
            lineStart,
            lineLength: rowLength,
            cellStart,
            cellLength
          };
          if (this._isWithinGrid(grid, move)) {
            domain.push(move);
          }
        });
      });
    });

    return domain;
  }

  private _isWithinGrid(grid: Grid, move: Move): boolean {
    const {
      colour,
      shape,
      lineStart,
      lineLength,
      cellStart,
      cellLength
    } = move;
    const lineEnd = lineStart + lineLength;
    const cellEnd = cellStart + cellLength;

    const surroundingLines = grid.lines.slice(lineStart, lineEnd);
    const surroundings = surroundingLines.map(surroundingLine => {
      return surroundingLine.slice(cellStart, cellEnd);
    });

    return !surroundings.some((surroundingLine, lineIndex) => {
      return surroundingLine.some((_, cellIndex) => {
        return (
          shape[lineIndex][cellIndex] === colour &&
          surroundings[lineIndex][cellIndex] !== Cell.empty
        );
      });
    });
  }
}
