import { ok } from 'assert';
import { Chromosome } from './chromosome';
import { PopulationOptionsFinal } from './options';
import { range } from '../utils';

export type PopulationSerialised<NGenes extends number> =
  | {
      bestChromosome: Chromosome<NGenes>;
      bestFitness: number;
      finished: true;
      nextGeneration: Population<NGenes>;
    }
  | { finished: false };

export type PopulationGetFitness<NGenes extends number> = (
  chromosome: Chromosome<NGenes>,
  index: number
) => Promise<number>;

export class Population<NGenes extends number> {
  private _finished = false;
  private _fitness = new Map<Chromosome<NGenes>, number>();

  private constructor(
    private _options: PopulationOptionsFinal<NGenes>,
    private _chromosomes: Array<Chromosome<NGenes>>
  ) {}

  public async getNextFitness(
    getFitness: PopulationGetFitness<NGenes>
  ): Promise<void> {
    const index = this._options.populationSize - this._chromosomes.length;
    const chromosome = this._chromosomes.shift();
    ok(chromosome);
    if (this._chromosomes.length === 0) {
      this._finished = true;
    }
    const fitness = await getFitness(chromosome, index);
    this._fitness.set(chromosome, fitness);
  }

  public state(): PopulationSerialised<NGenes> {
    if (this._finished) {
      const sortedPopulation = this._sortPopulationByFitness();
      const [bestChromosome] = sortedPopulation;
      const bestFitness = this._fitness.get(bestChromosome);
      ok(bestFitness);
      const nextGeneration = this._nextGeneration(sortedPopulation);
      return {
        bestChromosome,
        bestFitness,
        nextGeneration,
        finished: true,
      };
    }
    return {
      finished: false,
    };
  }

  private _sortPopulationByFitness(): Array<Chromosome<NGenes>> {
    return Array.from(this._fitness.keys()).sort((keyA, keyB) => {
      const a = this._fitness.get(keyA);
      const b = this._fitness.get(keyB);
      ok(a);
      ok(b);
      return b - a;
    });
  }

  private _nextGeneration(
    sortedPopulation: Array<Chromosome<NGenes>>
  ): Population<NGenes> {
    const { populationSize, mutationRate, survivalRate } = this._options;
    const thanos = Math.floor(sortedPopulation.length * survivalRate);
    const survivors = sortedPopulation.slice(0, thanos);
    const nextPopulation = survivors.slice(0);
    const populationWeights = survivors.map((_, i) => {
      const n = i + 1;
      return 1 / 2 ** n;
    });

    function getIndex(bag: Array<number>): number {
      const random = Math.random();
      const selected = bag.find((w) => populationWeights[w] < random) as number;
      const [selectedIndex] = bag.splice(selected, 1);
      return selectedIndex;
    }

    while (nextPopulation.length < populationSize) {
      const bag = range(0, survivors.length);
      const [p1, p2] = [getIndex(bag), getIndex(bag)];
      const parentOne = survivors[p1];
      const parentTwo = survivors[p2];
      const child = parentOne.procreate(parentTwo, mutationRate);
      nextPopulation.push(child);
    }

    return new Population(this._options, nextPopulation);
  }

  static random<NGenes extends number>(
    options: PopulationOptionsFinal<NGenes>
  ): Population<NGenes> {
    const chromosomes = range(0, options.populationSize).map(() =>
      Chromosome.random(options.numberOfGenes)
    );
    return new Population(options, chromosomes);
  }
}
