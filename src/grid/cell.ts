export const enum Cell {
  empty,
  side = -1,
  top = -2,
  bottom = -2,
  i = 1,
  j = 2,
  l = 3,
  o = 4,
  s = 5,
  t = 6,
  z = 7,
}

export const CELL_COLOURS = [
  Cell.i,
  Cell.j,
  Cell.l,
  Cell.o,
  Cell.s,
  Cell.t,
  Cell.z,
];
