import { Chromosome } from './chromosome';

describe('genetics', () => {
  describe('genetics: Chromosome', () => {
    it('create a random Chromosome', () => {
      const chromosome = Chromosome.random(4);

      expect(chromosome.genes.length).toBe(4);
    });

    it('can create a child Chromosome from two parents without mutation', () => {
      const parent1 = Chromosome.random(4);
      const parent2 = Chromosome.random(4);

      const genes = [...parent1.genes, ...parent2.genes];
      const chromosome = parent1.procreate(parent2, 0);

      expect(chromosome.genes.length).toBe(4);
      expect(chromosome.genes.every((g) => genes.includes(g))).toBe(true);
    });

    it('can create a child Chromosome from two parents with mutation', () => {
      const parent1 = Chromosome.random(4);
      const parent2 = Chromosome.random(4);

      const genes = [...parent1.genes, ...parent2.genes];
      const chromosome = parent1.procreate(parent2, 100);

      expect(chromosome.genes.length).toBe(4);
      expect(chromosome.genes.every((g) => !genes.includes(g))).toBe(true);
    });
  });
});
