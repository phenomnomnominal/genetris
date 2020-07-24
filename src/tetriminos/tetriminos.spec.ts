import { Grid } from '../grid';
import { MoveValidator } from '../ai';
import { I, J, L, O, S, T, Z, getNextTetrimino } from './index';

describe('tetriminos', () => {
  describe('tetriminos: bag', () => {
    it('should go through all the Tetriminos in the bag before starting again', () => {
      [1, 2, 3].forEach(() => {
        const tetriminos = [
          getNextTetrimino(),
          getNextTetrimino(),
          getNextTetrimino(),
          getNextTetrimino(),
          getNextTetrimino(),
          getNextTetrimino(),
          getNextTetrimino(),
        ];

        expect(tetriminos.filter((t) => t instanceof I)).toHaveLength(1);
        expect(tetriminos.filter((t) => t instanceof J)).toHaveLength(1);
        expect(tetriminos.filter((t) => t instanceof L)).toHaveLength(1);
        expect(tetriminos.filter((t) => t instanceof O)).toHaveLength(1);
        expect(tetriminos.filter((t) => t instanceof S)).toHaveLength(1);
        expect(tetriminos.filter((t) => t instanceof T)).toHaveLength(1);
        expect(tetriminos.filter((t) => t instanceof Z)).toHaveLength(1);
      });
    });
  });

  [
    [I, 310, 17] as const,
    [J, 628, 34] as const,
    [L, 628, 34] as const,
    [O, 171, 9] as const,
    [S, 314, 17] as const,
    [T, 628, 34] as const,
    [Z, 314, 17] as const,
  ].forEach(([Tetrimino, length, validFirstMoves]) => {
    const grid = new Grid();
    const validator = new MoveValidator(grid);

    describe(`tetriminos: ${Tetrimino.prototype.constructor.name}`, () => {
      describe(`tetriminos: ${Tetrimino.prototype.constructor.name}: domain`, () => {
        it('should have the right domain length', () => {
          const tetrimino = new Tetrimino();

          expect(tetrimino.domain).toHaveLength(length);
        });

        it('should have a set of valid first moves', () => {
          const tetrimino = new Tetrimino();

          expect(
            tetrimino.domain.filter((move) => validator.isValidMove(move))
          ).toHaveLength(validFirstMoves);
        });
      });
    });
  });
});
