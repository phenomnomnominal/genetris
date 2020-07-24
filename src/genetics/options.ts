import { noop } from '../utils';
import { Chromosome } from './chromosome';

type GeneticOnProgress<State> = (index: number, state: State) => void;

type GeneticOnComplete<NGenes extends number = number> = (
  generation: number,
  bestFitness: number,
  bestChromosome: Chromosome<NGenes>
) => void;

type PopulationOptionsRequired<NGenes extends number> = {
  numberOfGenes: NGenes;
};

type PopulationOptions = {
  mutationRate?: number;
  populationSize?: number;
  survivalRate?: number;
};

export type PopulationOptionsFinal<NGenes extends number> = {
  numberOfGenes: NGenes;
  mutationRate: number;
  populationSize: number;
  survivalRate: number;
};

export type GeneticOptionsRequired<NGenes extends number> = {
  work(): Worker;
} & PopulationOptionsRequired<NGenes>;

export type GeneticOptions<NGenes extends number, State> = {
  workers?: number;
  onProgress?: GeneticOnProgress<State>;
  onComplete?: GeneticOnComplete<NGenes>;
} & PopulationOptions;

export type GeneticOptionsFinal<NGenes extends number, State> = {
  workers: number;
  onProgress: GeneticOnProgress<State>;
  onComplete: GeneticOnComplete<NGenes>;
} & GeneticOptionsRequired<NGenes> &
  PopulationOptionsFinal<NGenes>;

const WORKERS = Math.max(
  typeof navigator !== 'undefined' && navigator.hardwareConcurrency
    ? navigator.hardwareConcurrency
    : 4
);

const DEFAULT_GENETICS_OPTIONS: GeneticOptions<number, unknown> = {
  workers: WORKERS,
  onProgress: noop,
  onComplete: noop,
};

const DEFAULT_POPULATION_OPTIONS: PopulationOptions = {
  populationSize: 32,
  mutationRate: 0.1,
  survivalRate: 0.33,
};

export function getOptions<NGenes extends number, State>(
  options: GeneticOptions<NGenes, State> & GeneticOptionsRequired<NGenes>
): GeneticOptionsFinal<NGenes, State> {
  if (typeof options.numberOfGenes === 'undefined') {
    throw new Error();
  }
  if (typeof options.work === 'undefined') {
    throw new Error();
  }

  return {
    ...DEFAULT_GENETICS_OPTIONS,
    ...DEFAULT_POPULATION_OPTIONS,
    ...options,
  } as GeneticOptionsFinal<NGenes, State>;
}
