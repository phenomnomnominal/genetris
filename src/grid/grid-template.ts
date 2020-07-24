import { equal } from 'assert';

import { Grid } from './grid';

export function gridTemplate(template: string): Grid {
  const grid = new Grid();
  const lines = template.trim().split('\n');
  equal(lines.length, 20);
  lines.forEach((l, i) => {
    const cells = l
      .trim()
      .split(' ')
      .map((c) => parseInt(c.trim()));
    equal(cells.length, 10);
    cells.forEach((c, j) => {
      grid.lines[i + 1][j + 1] += c;
      grid.rows[i][j] += c;
    });
  });
  return grid;
}
