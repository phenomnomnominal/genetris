import { Chromosome } from '../genetics';
import { Grid, GridSerialised } from '../grid';
import { Tetrimino, getNextTetrimino } from '../tetriminos';
import { GameState, GameStateSerialised } from './game-state';
import { MoveScorer, MoveScorerWeightsSerialised } from './move-scorer';
import { MoveValidator } from './move-validator';
import { Move } from '../tetriminos/move';

export type AISerialised = {
  gameState: GameStateSerialised;
  grid: GridSerialised;
  finished: boolean;
  weights: MoveScorerWeightsSerialised;
};

export class AI {
  private _tetriminoes: [Tetrimino, Tetrimino];
  private _gameState = new GameState();
  private _grid = new Grid();
  private _scorer: MoveScorer;
  private _validator: MoveValidator;

  constructor(chromosome: Chromosome<10>) {
    this._tetriminoes = [getNextTetrimino(), getNextTetrimino()];
    this._scorer = new MoveScorer(chromosome.genes);
    this._validator = new MoveValidator(this._grid);
  }

  public makeMove(): AISerialised {
    const bestNextMove = this._getBestNextMove();
    if (bestNextMove) {
      const [, next] = this._tetriminoes;
      this._grid.add(bestNextMove);
      const clearedLines = this._grid.clearLines();
      this._gameState.update(clearedLines.length);

      this._tetriminoes = [next, getNextTetrimino()];
    }

    return this._state(!bestNextMove);
  }

  private _state(finished: boolean): AISerialised {
    return {
      gameState: this._gameState.serialise(),
      grid: this._grid.serialise(),
      finished,
      weights: this._scorer.serialise(),
    };
  }

  private _getPossibleMoves(tetrimino: Tetrimino): Array<Move> {
    return tetrimino.domain.filter((move) => {
      return this._validator.isValidMove(move);
    });
  }

  private _getBestNextMove(
    bestScore = -Infinity,
    bestMove: Move | null = null
  ): Move | null {
    const grid = this._grid;
    const scorer = this._scorer;
    const [current, next] = this._tetriminoes;

    this._getPossibleMoves(current).forEach((move) => {
      grid.add(move);

      const cleared = grid.clearLines();
      const scores = scorer.score(grid, move, cleared.length);
      const score = Object.values(scores).reduce((p, n) => p + n, 0);

      this._getPossibleMoves(next).forEach((nextMove) => {
        grid.add(nextMove);

        const nextCleared = grid.clearLines();
        const nextScores = scorer.score(grid, nextMove, nextCleared.length);
        const nextScore = Object.values(nextScores).reduce((p, n) => p + n, 0);

        const total = score + nextScore;

        if (total > bestScore) {
          bestScore = total;
          bestMove = move;
        }

        grid.replaceLines(nextCleared);
        grid.sub(nextMove);
      });

      grid.replaceLines(cleared);
      grid.sub(move);
    });
    return bestMove;
  }
}
