declare module 'tetris.worker' {
  class TetrisWorker extends Worker {
    constructor();
  }

  export = TetrisWorker;
}

declare module '*.scss' {
  export const styles: string;
}
