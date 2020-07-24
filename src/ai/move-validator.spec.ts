import { ok } from 'assert';

import { gridTemplate } from '../grid';
import { I, T } from '../tetriminos';
import { MoveValidator } from './move-validator';

describe('move-validator', () => {
  describe('move-validator: Chromosome', () => {
    it('should return true if there is a path to a move', () => {
      const grid = gridTemplate(`
0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 2 3 2 2 2
0 0 0 0 0 2 3 7 7 2
0 0 0 0 2 2 3 3 7 7
        `);
      const validator = new MoveValidator(grid);

      const i = new I();
      const move = i.domain.find(
        (m) => m.cellStart === 1 && m.lineStart === 20
      );
      ok(move);

      expect(validator.isValidMove(move)).toBe(true);
    });

    [
      {
        template: `
0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0
0 0 0 4 4 2 3 2 2 2
0 0 0 4 4 2 3 7 7 2
0 0 0 0 2 2 3 3 7 7
          `,
        move: () => {
          const i = new I();
          return i.domain.find((m) => m.cellStart === 1 && m.lineStart === 20);
        },
      },
      {
        template: `
0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0
0 0 0 7 7 0 0 0 0 0
0 0 0 0 7 7 0 0 0 0
      `,
        move: () => {
          const t = new T();
          return t.domain.find(
            (m) =>
              m.cellStart === 2 &&
              m.lineStart === 19 &&
              m.shape === t.shapes[2].shape
          );
        },
      },
    ].forEach((test) => {
      it('should return false if there is not a path to a move', () => {
        const validator = new MoveValidator(gridTemplate(test.template));
        const move = test.move();
        ok(move);
        expect(validator.isValidMove(move)).toBe(false);
      });
    });

    it('should return true if the move is touching at the bottom', () => {
      const grid = gridTemplate(`
  0 0 0 0 0 0 0 0 0 0
  0 0 0 0 0 0 0 0 0 0
  0 0 0 0 0 0 0 0 0 0
  0 0 0 0 0 0 0 0 0 0
  0 0 0 0 0 0 0 0 0 0
  0 0 0 0 0 0 0 0 0 0
  0 0 0 0 0 0 0 0 0 0
  0 0 0 0 0 0 0 0 0 0
  0 0 0 0 0 0 0 0 0 0
  0 0 0 0 0 0 0 0 0 0
  0 0 0 0 0 0 0 0 0 0
  0 0 0 0 0 0 0 0 0 0
  0 0 0 0 0 0 0 0 0 0
  0 0 0 0 0 0 0 0 0 0
  0 0 0 0 0 0 0 0 0 0
  0 0 0 0 0 0 0 0 0 0
  0 0 0 0 0 0 0 0 0 0
  0 0 0 4 4 2 3 2 2 2
  0 0 0 4 4 2 3 7 7 2
  0 0 0 0 2 2 3 3 7 7
          `);
      const validator = new MoveValidator(grid);

      const i = new I();
      const move = i.domain.find(
        (m) => m.cellStart === 1 && m.lineStart === 17
      );
      ok(move);

      expect(validator.isValidMove(move)).toBe(true);
    });

    it('should return false if the move is not touching at the bottom', () => {
      const grid = gridTemplate(`
  0 0 0 0 0 0 0 0 0 0
  0 0 0 0 0 0 0 0 0 0
  0 0 0 0 0 0 0 0 0 0
  0 0 0 0 0 0 0 0 0 0
  0 0 0 0 0 0 0 0 0 0
  0 0 0 0 0 0 0 0 0 0
  0 0 0 0 0 0 0 0 0 0
  0 0 0 0 0 0 0 0 0 0
  0 0 0 0 0 0 0 0 0 0
  0 0 0 0 0 0 0 0 0 0
  0 0 0 0 0 0 0 0 0 0
  0 0 0 0 0 0 0 0 0 0
  0 0 0 0 0 0 0 0 0 0
  0 0 0 0 0 0 0 0 0 0
  0 0 0 0 0 0 0 0 0 0
  0 0 0 0 0 0 0 0 0 0
  0 0 0 0 0 0 0 0 0 0
  0 0 0 4 4 2 3 2 2 2
  0 0 0 4 4 2 3 7 7 2
  0 0 0 0 2 2 3 3 7 7
          `);
      const validator = new MoveValidator(grid);

      const i = new I();
      const move = i.domain.find(
        (m) => m.cellStart === 1 && m.lineStart === 16
      );
      ok(move);

      expect(validator.isValidMove(move)).toBe(false);
    });

    it('should return false if the move would overlap an existing cell', () => {
      const grid = gridTemplate(`
  0 0 0 0 0 0 0 0 0 0
  0 0 0 0 0 0 0 0 0 0
  0 0 0 0 0 0 0 0 0 0
  0 0 0 0 0 0 0 0 0 0
  0 0 0 0 0 0 0 0 0 0
  0 0 0 0 0 0 0 0 0 0
  0 0 0 0 0 0 0 0 0 0
  0 0 0 0 0 0 0 0 0 0
  0 0 0 0 0 0 0 0 0 0
  0 0 0 0 0 0 0 0 0 0
  0 0 0 0 0 0 0 0 0 0
  0 0 0 0 0 0 0 0 0 0
  0 0 0 0 0 0 0 0 0 0
  0 0 0 0 0 0 0 0 0 0
  0 0 0 0 0 0 0 0 0 0
  0 0 0 0 0 0 0 0 0 0
  0 0 0 0 0 0 0 0 0 0
  0 0 0 4 4 2 3 2 2 2
  0 0 0 4 4 2 3 7 7 2
  0 0 0 0 2 2 3 3 7 7
          `);
      const validator = new MoveValidator(grid);

      const i = new I();
      const move = i.domain.find(
        (m) => m.cellStart === 1 && m.lineStart === 18
      );
      ok(move);

      expect(validator.isValidMove(move)).toBe(false);
    });
  });
});
