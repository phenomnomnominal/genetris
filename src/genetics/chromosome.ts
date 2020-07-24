import { Tuple, range } from '../utils';

export class Chromosome<
  NGenes extends number = number,
  Genes extends Tuple<number, NGenes> = Tuple<number, NGenes>
> {
  private constructor(public genes: Genes) {}

  public procreate(
    partner: Chromosome<NGenes>,
    mutationRate: number
  ): Chromosome<NGenes> {
    const genes = this.genes.map((_, i) => {
      const random = Math.random();
      const gene = random < 0.5 ? this.genes[i] : partner.genes[i];
      if (random < mutationRate) {
        return randomNumber();
      }
      return gene;
    }) as Genes;

    return new Chromosome<NGenes>(genes);
  }

  static random<
    NGenes extends number,
    Genes extends Tuple<number, NGenes> = Tuple<number, NGenes>
  >(numberOfGenes: NGenes): Chromosome<NGenes> {
    const genes = range(0, numberOfGenes).map(() => randomNumber()) as Genes;
    return new Chromosome<NGenes>(genes);
  }
}

function randomNumber(): number {
  return Math.random() * 2 ** 32 - 2 ** 31;
}
