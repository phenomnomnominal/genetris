import { range } from '../utils';

export type WorkFunction = () => Promise<void>;
type Resolve = Parameters<ConstructorParameters<typeof Promise>[0]>[0];

export class WorkerQueue {
  private _deferreds: Array<Resolve> = [];
  private _index = 0;

  constructor(private _queueSize: number, private _workers: number) {}

  start(work: WorkFunction): Promise<void> {
    const promises = range(0, this._queueSize).map(() => {
      return new Promise<void>((resolve) => {
        this._deferreds.push(resolve as Resolve);
      });
    });
    range(0, this._workers).forEach(() => {
      void this._next(work);
    });
    return promises.reduce(async (p, n) => {
      await p;
      return n;
    }, Promise.resolve());
  }

  private async _next(work: WorkFunction) {
    const index = this._index;
    this._index += 1;
    if (index < this._deferreds.length) {
      await work();
      void this._next(work);
      this._deferreds[index]();
    }
  }
}
