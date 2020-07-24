import { AI, AISerialised } from './ai';
import {
  create,
  Chromosome,
  GeneticWorker,
  GeneticWorkerOnProgress,
} from './genetics';

const MIN_TIMEOUT = 10;

create(
  class TetrisWorker implements GeneticWorker<10, AISerialised> {
    private _paused: Promise<void> | null = null;
    private _timeoutMS = MIN_TIMEOUT;
    private _unpause: (() => void) | null = null;

    public async evaluateFitness(
      chromosome: Chromosome<10>,
      onProgress?: GeneticWorkerOnProgress<AISerialised>
    ): Promise<number> {
      const ai = new AI(chromosome);

      let fitness = 0;
      let finished = false;
      while (!finished) {
        if (this._paused) {
          await this._paused;
        }
        await this._timeout();
        const state = ai.makeMove();
        fitness = state.gameState.score;
        finished = state.finished;
        onProgress?.(state);
      }

      return fitness;
    }

    public resume(): void {
      if (!this._unpause) {
        return;
      }

      this._unpause();
      this._paused = null;
    }

    public pause(): void {
      if (this._paused) {
        return;
      }

      this._paused = new Promise((resolve) => {
        this._unpause = resolve;
      });
    }

    public setTimeout(timeoutMS: number): void {
      this._timeoutMS = Math.max(timeoutMS, MIN_TIMEOUT);
    }

    private _timeout(): Promise<void> {
      return new Promise((resolve) => {
        setTimeout(resolve, this._timeoutMS);
      });
    }
  }
);
