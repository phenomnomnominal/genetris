import { expose } from 'comlink';

import { Chromosome } from './chromosome';

export type GeneticWorkerOnProgress<State> = (state: State) => void;

export interface GeneticWorker<NGenes extends number, State> {
  evaluateFitness(
    chromosome: Chromosome<NGenes>,
    onProgress: GeneticWorkerOnProgress<State>
  ): Promise<number>;

  resume(): void;
  pause(): void;

  setTimeout(timeout: number): void;
}

export function create<NGenes extends number, State>(worker: {
  new (): GeneticWorker<NGenes, State>;
}): void {
  expose(new worker());
}
