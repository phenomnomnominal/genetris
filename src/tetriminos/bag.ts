import { I, J, L, O, S, T, Z, Tetrimino } from '.';

let bag: Array<Tetrimino> = [];
let tetriminos: Array<Tetrimino> = [
  new I(),
  new J(),
  new L(),
  new O(),
  new S(),
  new T(),
  new Z()
];

export function getNextTetrimino(): Tetrimino {
  if (bag.length === 0) {
    bag = tetriminos;
    tetriminos = [];
  }
  const select = Math.floor(Math.random() * bag.length);
  const [selected] = bag.splice(select, 1);
  tetriminos.push(selected);
  return selected;
}
