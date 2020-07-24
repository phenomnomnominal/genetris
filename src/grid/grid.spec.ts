import { I, J } from '../tetriminos';
import { Grid } from './grid';
import { gridTemplate } from './grid-template';

expect.addSnapshotSerializer({
  test(i) {
    return Array.isArray(i) && i.every((j) => typeof j === 'number');
  },
  print(i: unknown) {
    return (i as Array<number>).join(', ');
  },
});

describe('grid', () => {
  describe('grid: add', () => {
    it('should add a move to the grid', () => {
      const grid = new Grid();

      const tetrimino = new I();
      const [move] = tetrimino.domain;

      grid.add(move);

      expect(grid.lines).toMatchSnapshot();
    });
  });

  describe('grid: sub', () => {
    it('should remove a move from the grid', () => {
      const grid = new Grid();

      const tetrimino = new J();
      const [move] = tetrimino.domain;

      grid.add(move);
      grid.sub(move);

      expect(grid.lines).toMatchSnapshot();
    });
  });

  describe('grid: clearLines', () => {
    it('should clear a single line from the grid', () => {
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
1 1 1 1 2 2 3 3 7 7
    `);
      grid.clearLines();

      expect(grid.lines).toMatchSnapshot();
    });

    it('should clear multiple lines from the grid', () => {
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
0 6 0 4 4 2 3 2 2 2
6 6 6 4 4 2 3 7 7 2
1 1 1 1 2 2 3 3 7 7
    `);
      grid.clearLines();

      expect(grid.lines).toMatchSnapshot();
    });
  });

  describe('grid: replaceLines', () => {
    it('should restore a single line to the grid', () => {
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
1 1 1 1 2 2 3 3 7 7
    `);
      const lines = grid.clearLines();
      grid.replaceLines(lines);

      expect(grid.lines).toMatchSnapshot();
    });

    it('should restore multiple lines to the grid', () => {
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
0 6 0 4 4 2 3 2 2 2
6 6 6 4 4 2 3 7 7 2
1 1 1 1 2 2 3 3 7 7
    `);
      const lines = grid.clearLines();
      grid.replaceLines(lines);

      expect(grid.lines).toMatchSnapshot();
    });
  });

  describe('grid: serialised', () => {
    const grid = new Grid();

    expect(grid.serialise().rows).toBe(grid.rows);
  });
});
