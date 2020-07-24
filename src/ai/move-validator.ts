import { Cell, Grid } from '../grid';
import { Move } from '../tetriminos';

export class MoveValidator {
  constructor(private _grid: Grid) {}

  public isValidMove(move: Move): boolean {
    const {
      colour,
      shape,
      lineStart,
      lineLength,
      cellStart,
      cellLength,
    } = move;

    const lineEnd = lineStart + lineLength;
    const cellEnd = cellStart + cellLength;

    // Make sure that the Tetrimino connects with a non-empty cell
    // below:
    const touchdown = shape.some((line, lineIndex) => {
      return line.some((cell, cellIndex) => {
        const nextLine = this._grid.lines[lineStart + lineIndex + 1];
        return (
          cell === colour && nextLine?.[cellStart + cellIndex] !== Cell.empty
        );
      });
    });

    if (!touchdown) {
      return false;
    }

    // Find the area that the Tetrmino would take up:
    const moveLines = this._grid.lines.slice(lineStart, lineEnd);
    const moveArea = moveLines.map((moveLine) =>
      moveLine.slice(cellStart, cellEnd)
    );

    // Check each cell in the Tetrimino and see the corresponding cell
    // in the move area is empty:
    const cellIsFilled = shape.some((line, lineIndex) => {
      return line.some((cell, cellIndex) => {
        return cell === colour && moveArea[lineIndex][cellIndex] !== Cell.empty;
      });
    });

    // If any of the cells area already filled, then the Tetrimino
    // can't fit, so the move is invalid:
    if (cellIsFilled) {
      return false;
    }

    // Check if there's a path to the move:
    const hasOpenPathToMove = shape.every((line, lineIndex) => {
      return line.every((cell, cellIndex) => {
        const cellsAbove = this._grid.lines
          .slice(1, lineStart + lineIndex + 1)
          .map((l) => l[cellStart + cellIndex]);
        return (
          cell === Cell.empty ||
          (cell === colour && cellsAbove.every((c) => c === Cell.empty))
        );
      });
    });

    return hasOpenPathToMove;
  }
}
