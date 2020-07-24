import { ok } from 'assert';
import { wrap, releaseProxy, Remote, proxy } from 'comlink';

import { Chromosome } from './chromosome';
import { GeneticWorker } from './worker';
import { Population } from './population';
import {
  getOptions,
  GeneticOptions,
  GeneticOptionsRequired,
  GeneticOptionsFinal,
} from './options';
import { WorkerQueue } from './worker-queue';
import { log } from '../utils';

export class Genetic<NGenes extends number, State> {
  private _bestFitness: number | null = null;

  private _generation = 1;
  private _options: GeneticOptionsFinal<NGenes, State>;
  private _remotes: Array<Remote<GeneticWorker<NGenes, State>> | null> = [];
  private _timeout = 1000;
  private _workers: Array<Worker | null> = [];

  constructor(
    options: GeneticOptions<NGenes, State> & GeneticOptionsRequired<NGenes>
  ) {
    this._options = getOptions(options);
  }

  public async run(
    population: Population<NGenes> = Population.random(this._options)
  ): Promise<void> {
    const queue = new WorkerQueue(
      this._options.populationSize,
      this._options.workers
    );
    log(`Generation ${this._generation} starting`);
    await queue.start(async () => {
      return population.getNextFitness(async (chromosome, index) => {
        log(`Chromosome ${index} running...`);
        const fitness = await this._getFitness(chromosome, index);
        log(`Chromosome ${index} fitness: ${fitness}`);
        return fitness;
      });
    });
    const state = population.state();
    ok(state.finished);
    const { bestFitness, bestChromosome, nextGeneration } = state;
    log(`Generation ${this._generation} complete.`);
    if (!this._bestFitness || bestFitness > this._bestFitness) {
      this._bestFitness = bestFitness;
      log(`New best fitting chomosome found with fit = ${bestFitness}`);
    }

    this._generation += 1;
    this._options.onComplete(this._generation, bestFitness, bestChromosome);
    return this.run(nextGeneration);
  }

  public async resume(): Promise<void> {
    await Promise.all(this._remotes.map((remote) => remote?.resume()));
  }

  public async pause(): Promise<void> {
    await Promise.all(this._remotes.map((remote) => remote?.pause()));
  }

  public async setTimeout(timeout: number): Promise<void> {
    this._timeout = timeout;
    await Promise.all(
      this._remotes.map((remote) => remote?.setTimeout(this._timeout))
    );
  }

  private async _getFitness(
    chromosome: Chromosome<NGenes>,
    index: number
  ): Promise<number> {
    const remote = await this._createRemote();
    const fitness = await remote.evaluateFitness(
      chromosome,
      proxy((state: State) => this._options.onProgress(index, state))
    );
    this._destoryRemote(remote);
    return fitness;
  }

  private async _createRemote(): Promise<Remote<GeneticWorker<NGenes, State>>> {
    const worker = this._options.work();
    const remote = wrap<GeneticWorker<NGenes, State>>(worker);
    await remote.setTimeout(this._timeout);
    this._workers.push(worker);
    this._remotes.push(remote);
    return remote;
  }

  private _destoryRemote(remote: Remote<GeneticWorker<NGenes, State>>) {
    const index = this._remotes.indexOf(remote);
    const worker = this._workers[index] as Worker;
    remote[releaseProxy]();
    worker.terminate();
    this._workers[index] = null;
    this._remotes[index] = null;
  }
}
