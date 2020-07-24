export interface Tuple<T extends unknown, L extends number> extends Array<T> {
  0: T;
  length: L;
}

export function length(l: number): ArrayLike<null> {
  return { length: l };
}

export function range(from: number, to: number): Array<number> {
  const finalTo = from > to ? from : to;
  const finalFrom = from > to ? to : from;
  return Array.from(
    length(finalTo - finalFrom),
    (_: null, i: number) => i + finalFrom
  );
}

export function noop(): void {
  return;
}

export function log(...args: Array<string>): void {
  console.log(...args);
}
