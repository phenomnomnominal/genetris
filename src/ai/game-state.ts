const SCORES = [0, 40, 100, 300, 1200];

export type GameStateSerialised = {
  lines: number;
  level: number;
  score: number;
  moves: number;
};

export class GameState {
  public lines = 0;
  public level = 0;
  public score = 0;
  public moves = 0;

  public update(clearedLines: number): void {
    const currentLines = this.lines;
    const currentScore = this.score;
    const currentMoves = this.moves;
    this.lines = currentLines + clearedLines;
    this.level = this._calculateLevel(this.lines);
    this.score = currentScore + this._calculateScore(clearedLines, this.level);
    this.moves = currentMoves + 1;
  }

  public serialise(): GameStateSerialised {
    return {
      lines: this.lines,
      level: this.level,
      score: this.score,
      moves: this.moves
    };
  }

  private _calculateLevel(lines: number): number {
    return Math.floor(Math.min(lines, 100) / 10);
  }

  private _calculateScore(linesCleared: number, level: number): number {
    return SCORES[linesCleared] * (level + 1) + 1;
  }
}
